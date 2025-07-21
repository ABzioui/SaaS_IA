const Property = require('../models/Property');
const { validateProperty } = require('../services/validators');
const { uploadDocument, deleteDocument } = require('../services/documentService');

// Get all properties with filters and pagination
exports.getProperties = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      status, 
      type, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;

    const query = {};

    // Search filter
    if (search) {
      query.$or = [
        { address: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
        { reference: { $regex: search, $options: 'i' } }
      ];
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Type filter
    if (type) {
      query.propertyType = type;
    }

    // Add user role check
    if (req.user.role !== 'admin') {
      query.createdBy = req.user._id;
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const properties = await Property.find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('tenant', 'name email phone')
      .lean();

    const total = await Property.countDocuments(query);

    // Calculate metrics
    const metrics = {
      total,
      available: await Property.countDocuments({ ...query, status: 'libre' }),
      occupied: await Property.countDocuments({ ...query, status: 'occupé' }),
      maintenance: await Property.countDocuments({ ...query, status: 'maintenance' }),
      monthlyRevenue: await Property.aggregate([
        { $match: { ...query, status: 'occupé' } },
        { $group: { _id: null, total: { $sum: '$rent' } } }
      ]).then(result => result[0]?.total || 0)
    };

    res.json({
      properties,
      metrics,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};

// Get single property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('tenant', 'name email phone')
      .lean();

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check permission
    if (req.user.role !== 'admin' && property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this property' });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

// Create property
exports.createProperty = async (req, res) => {
  try {
    const { error } = validateProperty(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const property = new Property({
      ...req.body,
      createdBy: req.user._id,
      history: [{
        type: 'created',
        title: 'Propriété créée',
        description: 'Nouvelle propriété ajoutée au système'
      }]
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check permission
    if (req.user.role !== 'admin' && property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const { error } = validateProperty(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Add history entry for update
    const historyEntry = {
      type: 'updated',
      title: 'Propriété mise à jour',
      description: 'Informations de la propriété modifiées'
    };

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { 
        ...req.body,
        $push: { history: historyEntry }
      },
      { new: true, runValidators: true }
    ).populate('tenant', 'name email phone');

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check permission
    if (req.user.role !== 'admin' && property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    // Delete associated documents
    for (const doc of property.documents) {
      await deleteDocument(doc.url);
    }

    await property.remove();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

// Upload document
exports.uploadDocument = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check permission
    if (req.user.role !== 'admin' && property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to upload documents to this property' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const uploadResult = await uploadDocument(req.file);
    
    const document = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      url: uploadResult.url,
      uploadDate: new Date()
    };

    property.documents.push(document);
    property.history.push({
      type: 'document_added',
      title: 'Document ajouté',
      description: `Document "${req.file.originalname}" téléchargé`
    });

    await property.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading document', error: error.message });
  }
};

// Delete document
exports.deleteDocument = async (req, res) => {
  try {
    const { id, documentId } = req.params;
    
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check permission
    if (req.user.role !== 'admin' && property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete documents from this property' });
    }

    const document = property.documents.id(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    await deleteDocument(document.url);
    property.documents.pull(documentId);
    
    property.history.push({
      type: 'document_added',
      title: 'Document supprimé',
      description: `Document "${document.name}" supprimé`
    });

    await property.save();
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
};

// Update property status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['libre', 'occupé', 'maintenance'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check permission
    if (req.user.role !== 'admin' && property.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this property status' });
    }

    property.status = status;
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error updating property status', error: error.message });
  }
}; 