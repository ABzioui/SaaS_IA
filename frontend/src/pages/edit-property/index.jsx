import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import PropertyBasicInfo from './components/PropertyBasicInfo';
import PropertyStatusToggle from './components/PropertyStatusToggle';
import DocumentManager from './components/DocumentManager';
import ChangeTracker from './components/ChangeTracker';
import PropertyActions from './components/PropertyActions';

const EditProperty = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('id') || '1';
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [changes, setChanges] = useState([]);

  // Mock property data - in real app, this would come from API
  const [originalData] = useState({
    id: propertyId,
    address: "123 Avenue des Champs-Élysées, 75008 Paris",
    type: "apartment",
    surface: "85",
    rent: "2500",
    charges: "200",
    description: `Magnifique appartement de 3 pièces situé dans le 8ème arrondissement de Paris, à proximité des Champs-Élysées.\n\nCaractéristiques :\n- 2 chambres spacieuses\n- Salon lumineux avec balcon\n- Cuisine équipée moderne\n- Salle de bain avec baignoire\n- Parquet au sol\n- Chauffage individuel au gaz\n\nEnvironnement :\n- Métro ligne 1 et 9 à 5 minutes\n- Commerces et restaurants à proximité\n- Quartier calme et sécurisé`,
    status: "occupied",
    hasActiveTenant: true,
    hasActiveContracts: true,
    createdAt: "2024-01-15",
    updatedAt: "2024-07-10"
  });

  const [formData, setFormData] = useState(originalData);

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "DPE_Champs_Elysees_123.pdf",
      type: "application/pdf",
      size: 2456789,
      url: "https://example.com/documents/dpe.pdf",
      uploadDate: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Certificat_Electricite.pdf",
      type: "application/pdf",
      size: 1234567,
      url: "https://example.com/documents/electricite.pdf",
      uploadDate: "2024-01-15T11:00:00Z"
    },
    {
      id: 3,
      name: "Photos_Appartement.jpg",
      type: "image/jpeg",
      size: 3456789,
      url: "https://example.com/documents/photos.jpg",
      uploadDate: "2024-01-20T14:15:00Z"
    }
  ]);

  const propertyTypes = [
    { value: "apartment", label: "Appartement" },
    { value: "house", label: "Maison" },
    { value: "studio", label: "Studio" },
    { value: "loft", label: "Loft" },
    { value: "duplex", label: "Duplex" },
    { value: "commercial", label: "Local commercial" }
  ];

  const [errors, setErrors] = useState({});

  // Track changes
  useEffect(() => {
    const newChanges = [];
    Object.keys(formData).forEach(key => {
      if (formData[key] !== originalData[key] && key !== 'updatedAt') {
        newChanges.push({
          field: key,
          oldValue: originalData[key],
          newValue: formData[key]
        });
      }
    });
    setChanges(newChanges);
  }, [formData, originalData]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleStatusChange = (newStatus) => {
    setFormData(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  const handleRevertChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: originalData[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.address.trim()) {
      newErrors.address = "L'adresse est obligatoire";
    }

    if (!formData.type) {
      newErrors.type = "Le type de propriété est obligatoire";
    }

    if (!formData.surface || parseFloat(formData.surface) <= 0) {
      newErrors.surface = "La surface doit être supérieure à 0";
    }

    if (!formData.rent || parseFloat(formData.rent) <= 0) {
      newErrors.rent = "Le loyer doit être supérieur à 0";
    }

    if (formData.charges && parseFloat(formData.charges) < 0) {
      newErrors.charges = "Les charges ne peuvent pas être négatives";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, make API call to update property
      console.log('Updating property:', formData);
      
      // Update original data to reflect saved changes
      Object.assign(originalData, formData);
      originalData.updatedAt = new Date().toISOString();
      
      // Show success message (in real app, use toast notification)
      alert('Propriété mise à jour avec succès !');
      
      // Navigate back to dashboard
      navigate('/properties-dashboard');
      
    } catch (error) {
      console.error('Error updating property:', error);
      alert('Erreur lors de la mise à jour de la propriété');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, make API call to delete property
      console.log('Deleting property:', propertyId);
      
      // Show success message
      alert('Propriété supprimée avec succès !');
      
      // Navigate back to dashboard
      navigate('/properties-dashboard');
      
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Erreur lors de la suppression de la propriété');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDocumentAdd = (file) => {
    const newDocument = {
      id: Date.now(),
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadDate: new Date().toISOString()
    };
    
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleDocumentRemove = (documentId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
  };

  const handleContextualAction = (action, items) => {
    switch (action) {
      case 'save':
        handleSave();
        break;
      case 'update':
        handleSave();
        break;
      case 'delete':
        handleDelete();
        break;
      default:
        console.log('Action not handled:', action);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Modifier la propriété
            </h1>
            <p className="text-muted-foreground">
              Modifiez les informations de votre propriété et gérez ses documents
            </p>
          </div>

          <ContextualActionBar 
            onAction={handleContextualAction}
          />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-8">
              <PropertyBasicInfo
                formData={formData}
                onChange={handleFormChange}
                errors={errors}
                propertyTypes={propertyTypes}
                isLoading={isSaving}
              />

              <DocumentManager
                documents={documents}
                onDocumentAdd={handleDocumentAdd}
                onDocumentRemove={handleDocumentRemove}
                isLoading={isSaving}
              />
            </div>

            {/* Right Column - Status & Actions */}
            <div className="space-y-8">
              <PropertyStatusToggle
                currentStatus={formData.status}
                onStatusChange={handleStatusChange}
                isLoading={isSaving}
                hasActiveTenant={formData.hasActiveTenant}
              />

              {changes.length > 0 && (
                <ChangeTracker
                  changes={changes}
                  onRevertChange={handleRevertChange}
                />
              )}

              <PropertyActions
                onSave={handleSave}
                onDelete={handleDelete}
                hasChanges={changes.length > 0}
                isLoading={isSaving}
                hasActiveTenant={formData.hasActiveTenant}
                hasActiveContracts={formData.hasActiveContracts}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditProperty;