const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  reference: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true,
    match: /^\d{5}$/
  },
  neighborhood: String,
  coordinates: {
    lat: Number,
    lng: Number
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['appartement', 'maison', 'studio', 'duplex', 'loft', 'villa', 'commerce', 'bureau']
  },
  surface: {
    type: Number,
    required: true,
    min: 0
  },
  rooms: {
    type: Number,
    required: true,
    min: 0
  },
  rent: {
    type: Number,
    required: true,
    min: 0
  },
  charges: {
    type: Number,
    default: 0,
    min: 0
  },
  deposit: {
    type: Number,
    min: 0
  },
  description: String,
  furnished: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    required: true,
    enum: ['libre', 'occupé', 'maintenance'],
    default: 'libre'
  },
  availability: {
    type: String,
    required: true,
    enum: ['immediate', 'date', 'occupied']
  },
  availabilityDate: Date,
  documents: [{
    name: String,
    type: String,
    size: Number,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  tenant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lease: {
    startDate: Date,
    endDate: Date,
    deposit: Number,
    status: {
      type: String,
      enum: ['actif', 'terminé', 'résilié']
    }
  },
  history: [{
    type: {
      type: String,
      required: true,
      enum: ['created', 'updated', 'rented', 'available', 'maintenance', 'document_added']
    },
    title: String,
    description: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Generate reference before saving
propertySchema.pre('save', async function(next) {
  if (!this.reference) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Property').countDocuments();
    this.reference = `PROP-${year}-${(count + 1).toString().padStart(3, '0')}`;
  }
  next();
});

// Add history entry on status change
propertySchema.pre('save', function(next) {
  if (this.isModified('status')) {
    this.history.push({
      type: this.status === 'libre' ? 'available' : this.status === 'maintenance' ? 'maintenance' : 'rented',
      title: `Statut changé en ${this.status}`,
      description: `La propriété est maintenant ${this.status}`
    });
  }
  next();
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 