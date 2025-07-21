import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import PropertyHeader from './components/PropertyHeader';
import PropertySpecifications from './components/PropertySpecifications';
import LocationDetails from './components/LocationDetails';
import DocumentsSection from './components/DocumentsSection';
import TenantInformation from './components/TenantInformation';
import PropertyHistory from './components/PropertyHistory';
import StatusChangeActions from './components/StatusChangeActions';

const PropertyDetails = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [property, setProperty] = useState(null);

  // Mock property data
  const mockProperty = {
    id: 1,
    reference: 'PROP-2024-001',
    address: '15 Rue de la Paix',
    fullAddress: '15 Rue de la Paix, 75001 Paris, France',
    neighborhood: 'Opéra',
    postalCode: '75001',
    city: 'Paris',
    type: 'Appartement',
    surface: 85,
    rooms: 3,
    rent: 2500,
    charges: 200,
    status: 'Occupé',
    coordinates: {
      lat: 48.8566,
      lng: 2.3522
    },
    createdDate: '2024-01-15',
    lastUpdated: '2024-07-10'
  };

  const mockDocuments = [
    {
      id: 1,
      name: 'Diagnostic énergétique.pdf',
      type: 'diagnostic',
      size: '2.4 MB',
      uploadDate: '2024-01-20'
    },
    {
      id: 2,
      name: 'Certificat de conformité.pdf',
      type: 'certificate',
      size: '1.8 MB',
      uploadDate: '2024-01-22'
    },
    {
      id: 3,
      name: 'Photos appartement.zip',
      type: 'photo',
      size: '15.2 MB',
      uploadDate: '2024-01-25'
    },
    {
      id: 4,
      name: 'Contrat de bail.pdf',
      type: 'contract',
      size: '3.1 MB',
      uploadDate: '2024-02-01'
    }
  ];

  const mockTenant = {
    id: 1,
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '+33 1 23 45 67 89'
  };

  const mockLease = {
    id: 1,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    duration: '12 mois',
    deposit: 2500,
    status: 'Actif'
  };

  const mockHistory = [
    {
      id: 1,
      type: 'rented',
      title: 'Propriété louée',
      description: 'Bail signé avec Marie Dubois',
      date: '2024-02-01T10:00:00Z'
    },
    {
      id: 2,
      type: 'document_added',
      title: 'Document ajouté',
      description: 'Contrat de bail téléchargé',
      date: '2024-02-01T09:30:00Z'
    },
    {
      id: 3,
      type: 'updated',
      title: 'Propriété mise à jour',
      description: 'Informations de surface modifiées',
      date: '2024-01-28T14:20:00Z'
    },
    {
      id: 4,
      type: 'document_added',
      title: 'Documents ajoutés',
      description: 'Photos et diagnostics téléchargés',
      date: '2024-01-25T11:15:00Z'
    },
    {
      id: 5,
      type: 'available',
      title: 'Propriété disponible',
      description: 'Propriété marquée comme disponible à la location',
      date: '2024-01-20T16:45:00Z'
    },
    {
      id: 6,
      type: 'created',
      title: 'Propriété créée',
      description: 'Nouvelle propriété ajoutée au système',
      date: '2024-01-15T09:00:00Z'
    }
  ];

  useEffect(() => {
    // Simulate loading property data
    setProperty(mockProperty);
  }, []);

  const handleEdit = () => {
    navigate('/edit-property');
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/properties-dashboard');
    } catch (error) {
      console.error('Error deleting property:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleStatusChange = (newStatus) => {
    setProperty(prev => ({
      ...prev,
      status: newStatus
    }));
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <NavigationHeader />
        <div className="pt-16">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Chargement des détails de la propriété...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          <PropertyHeader
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <PropertySpecifications property={property} />
              <LocationDetails property={property} />
              <DocumentsSection documents={mockDocuments} />
              <TenantInformation 
                tenant={property.status === 'Occupé' ? mockTenant : null}
                lease={property.status === 'Occupé' ? mockLease : null}
              />
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <StatusChangeActions
                property={property}
                onStatusChange={handleStatusChange}
              />
              <PropertyHistory history={mockHistory} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Supprimer la propriété"
        message={`Êtes-vous sûr de vouloir supprimer définitivement la propriété "${property.address}" ?\n\nCette action est irréversible et supprimera également tous les documents et historiques associés.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="destructive"
        loading={deleteLoading}
      />
    </div>
  );
};

export default PropertyDetails;