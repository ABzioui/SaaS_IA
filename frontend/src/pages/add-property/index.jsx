import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import AdditionalInfoForm from './components/AdditionalInfoForm';
import DocumentUpload from './components/DocumentUpload';
import FormActions from './components/FormActions';

const AddProperty = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    propertyType: '',
    surface: '',
    rooms: '',
    rent: '',
    charges: '',
    deposit: '',
    availability: '',
    availabilityDate: '',
    description: '',
    furnished: false
  });

  const [documents, setDocuments] = useState([]);
  const [errors, setErrors] = useState({});

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && !isSaving) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      
      const timeout = setTimeout(() => {
        handleAutoSave();
      }, 3000); // Auto-save after 3 seconds of inactivity
      
      setAutoSaveTimeout(timeout);
    }
    
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [formData, hasUnsavedChanges]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setHasUnsavedChanges(true);
    
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleDocumentsChange = (newDocuments) => {
    setDocuments(newDocuments);
    setHasUnsavedChanges(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est obligatoire';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'La ville est obligatoire';
    }
    
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Le code postal est obligatoire';
    } else if (!/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Le code postal doit contenir 5 chiffres';
    }
    
    if (!formData.propertyType) {
      newErrors.propertyType = 'Le type de propriété est obligatoire';
    }
    
    if (!formData.surface || formData.surface <= 0) {
      newErrors.surface = 'La surface doit être supérieure à 0';
    }
    
    if (!formData.rent || formData.rent <= 0) {
      newErrors.rent = 'Le loyer doit être supérieur à 0';
    }
    
    if (!formData.availability) {
      newErrors.availability = 'La disponibilité est obligatoire';
    }
    
    if (formData.availability === 'date' && !formData.availabilityDate) {
      newErrors.availabilityDate = 'La date de disponibilité est obligatoire';
    }
    
    // Validate charges and deposit if provided
    if (formData.charges && formData.charges < 0) {
      newErrors.charges = 'Les charges ne peuvent pas être négatives';
    }
    
    if (formData.deposit && formData.deposit < 0) {
      newErrors.deposit = 'Le dépôt de garantie ne peut pas être négatif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAutoSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API call for auto-save
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage as draft
      const draftData = {
        ...formData,
        documents: documents,
        lastSaved: new Date().toISOString()
      };
      
      localStorage.setItem('property-draft', JSON.stringify(draftData));
      setHasUnsavedChanges(false);
      
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newProperty = {
        id: Date.now(),
        ...formData,
        documents: documents,
        createdAt: new Date().toISOString(),
        status: formData.availability === 'immediate' ? 'available' : 
                formData.availability === 'occupied' ? 'rented' : 'pending'
      };
      
      // Save to localStorage (in real app, this would be an API call)
      const existingProperties = JSON.parse(localStorage.getItem('properties') || '[]');
      existingProperties.push(newProperty);
      localStorage.setItem('properties', JSON.stringify(existingProperties));
      
      // Clear draft
      localStorage.removeItem('property-draft');
      
      // Navigate back to dashboard
      navigate('/properties-dashboard');
      
    } catch (error) {
      console.error('Save failed:', error);
      setErrors({ submit: 'Erreur lors de la sauvegarde. Veuillez réessayer.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowCancelModal(true);
    } else {
      navigate('/properties-dashboard');
    }
  };

  const handleConfirmCancel = () => {
    localStorage.removeItem('property-draft');
    navigate('/properties-dashboard');
  };

  const handleContextualAction = (action) => {
    switch (action) {
      case 'save':
        handleSave();
        break;
      case 'cancel':
        handleCancel();
        break;
      default:
        break;
    }
  };

  const isFormValid = () => {
    return formData.address.trim() && 
           formData.city.trim() && 
           formData.postalCode.trim() && 
           formData.propertyType && 
           formData.surface > 0 && 
           formData.rent > 0 && 
           formData.availability &&
           (formData.availability !== 'date' || formData.availabilityDate);
  };

  // Load draft on component mount
  useEffect(() => {
    const draft = localStorage.getItem('property-draft');
    if (draft) {
      try {
        const draftData = JSON.parse(draft);
        setFormData(draftData);
        setDocuments(draftData.documents || []);
        setHasUnsavedChanges(true);
      } catch (error) {
        console.error('Failed to load draft:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ajouter une propriété
            </h1>
            <p className="text-muted-foreground">
              Créez une nouvelle annonce de location en remplissant les informations ci-dessous.
            </p>
          </div>

          <ContextualActionBar onAction={handleContextualAction} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column - Property Details */}
            <div className="space-y-8">
              <PropertyDetailsForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
            </div>

            {/* Right Column - Additional Info */}
            <div className="space-y-8">
              <AdditionalInfoForm
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Document Upload - Full Width */}
          <div className="mb-8">
            <DocumentUpload
              documents={documents}
              onDocumentsChange={handleDocumentsChange}
              errors={errors}
            />
          </div>

          {/* Form Actions */}
          <FormActions
            onSave={handleSave}
            onCancel={handleCancel}
            isValid={isFormValid()}
            isSaving={isSaving}
            hasUnsavedChanges={hasUnsavedChanges}
          />

          {/* Global form error */}
          {errors.submit && (
            <div className="mt-4 p-4 bg-error/10 border border-error/20 rounded-md">
              <p className="text-sm text-error">{errors.submit}</p>
            </div>
          )}
        </div>
      </main>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Annuler la création"
        message="Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter sans sauvegarder ?"
        confirmText="Quitter sans sauvegarder"
        cancelText="Continuer l'édition"
        type="warning"
      />
    </div>
  );
};

export default AddProperty;