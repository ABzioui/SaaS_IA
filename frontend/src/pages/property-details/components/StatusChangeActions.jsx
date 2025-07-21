import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const StatusChangeActions = ({ property, onStatusChange }) => {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStatusChange = (status) => {
    setNewStatus(status);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onStatusChange(newStatus);
      setShowStatusModal(false);
    } catch (error) {
      console.error('Error changing status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusChangeOptions = () => {
    if (property.status === 'Libre') {
      return [
        {
          status: 'Occupé',
          label: 'Marquer comme occupé',
          icon: 'UserCheck',
          variant: 'default',
          description: 'Cette propriété sera marquée comme occupée'
        }
      ];
    } else {
      return [
        {
          status: 'Libre',
          label: 'Marquer comme libre',
          icon: 'Home',
          variant: 'outline',
          description: 'Cette propriété sera marquée comme disponible'
        }
      ];
    }
  };

  const statusOptions = getStatusChangeOptions();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="ToggleLeft" size={20} className="mr-2" />
        Actions de statut
      </h2>
      
      <div className="space-y-3">
        {statusOptions.map((option) => (
          <Button
            key={option.status}
            variant={option.variant}
            fullWidth
            iconName={option.icon}
            iconPosition="left"
            onClick={() => handleStatusChange(option.status)}
            className="justify-start"
          >
            {option.label}
          </Button>
        ))}
        
        <div className="border-t border-border pt-4 mt-4">
          <h3 className="text-sm font-medium text-foreground mb-2">Actions rapides</h3>
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              className="justify-start"
            >
              Programmer une visite
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="Wrench"
              iconPosition="left"
              className="justify-start"
            >
              Signaler une maintenance
            </Button>
            <Button
              variant="ghost"
              size="sm"
              fullWidth
              iconName="FileText"
              iconPosition="left"
              className="justify-start"
            >
              Générer un rapport
            </Button>
          </div>
        </div>
      </div>
      
      {/* Status Change Confirmation Modal */}
      <ConfirmationModal
        isOpen={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        onConfirm={confirmStatusChange}
        title="Confirmer le changement de statut"
        message={`Êtes-vous sûr de vouloir changer le statut de cette propriété vers "${newStatus}" ?`}
        confirmText="Confirmer"
        cancelText="Annuler"
        type="default"
        loading={loading}
      />
    </div>
  );
};

export default StatusChangeActions;