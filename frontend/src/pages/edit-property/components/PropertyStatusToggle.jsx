import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const PropertyStatusToggle = ({ 
  currentStatus, 
  onStatusChange, 
  isLoading,
  hasActiveTenant = false 
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);

  const handleStatusToggle = (newStatus) => {
    if (newStatus === currentStatus) return;
    
    // Show confirmation for status changes that might affect tenants
    if (hasActiveTenant && newStatus === 'available') {
      setPendingStatus(newStatus);
      setShowConfirmModal(true);
    } else {
      onStatusChange(newStatus);
    }
  };

  const handleConfirmStatusChange = () => {
    onStatusChange(pendingStatus);
    setShowConfirmModal(false);
    setPendingStatus(null);
  };

  const handleCancelStatusChange = () => {
    setShowConfirmModal(false);
    setPendingStatus(null);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'available':
        return {
          label: 'Disponible',
          color: 'text-success',
          bgColor: 'bg-success/10',
          icon: 'CheckCircle'
        };
      case 'occupied':
        return {
          label: 'Occupé',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          icon: 'User'
        };
      default:
        return {
          label: 'Inconnu',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          icon: 'HelpCircle'
        };
    }
  };

  const currentStatusInfo = getStatusInfo(currentStatus);
  const availableStatusInfo = getStatusInfo('available');
  const occupiedStatusInfo = getStatusInfo('occupied');

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Statut de la propriété
        </h3>
        
        <div className="space-y-4">
          {/* Current Status Display */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${currentStatusInfo.bgColor}`}>
                <Icon 
                  name={currentStatusInfo.icon} 
                  size={20} 
                  className={currentStatusInfo.color}
                />
              </div>
              <div>
                <p className="font-medium text-foreground">Statut actuel</p>
                <p className={`text-sm ${currentStatusInfo.color}`}>
                  {currentStatusInfo.label}
                </p>
              </div>
            </div>
          </div>

          {/* Status Toggle Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleStatusToggle('available')}
              disabled={isLoading || currentStatus === 'available'}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                currentStatus === 'available' ?'border-success bg-success/10 cursor-default' :'border-border hover:border-success hover:bg-success/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name="CheckCircle" 
                  size={20} 
                  className={currentStatus === 'available' ? 'text-success' : 'text-muted-foreground'}
                />
                <div className="text-left">
                  <p className={`font-medium ${
                    currentStatus === 'available' ? 'text-success' : 'text-foreground'
                  }`}>
                    Disponible
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Prêt à louer
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleStatusToggle('occupied')}
              disabled={isLoading || currentStatus === 'occupied'}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                currentStatus === 'occupied' ?'border-warning bg-warning/10 cursor-default' :'border-border hover:border-warning hover:bg-warning/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name="User" 
                  size={20} 
                  className={currentStatus === 'occupied' ? 'text-warning' : 'text-muted-foreground'}
                />
                <div className="text-left">
                  <p className={`font-medium ${
                    currentStatus === 'occupied' ? 'text-warning' : 'text-foreground'
                  }`}>
                    Occupé
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Actuellement loué
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Warning for Active Tenant */}
          {hasActiveTenant && (
            <div className="flex items-start space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">
                  Locataire actif détecté
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Changer le statut vers "Disponible" peut affecter les contrats existants.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
        title="Confirmer le changement de statut"
        message={`Êtes-vous sûr de vouloir changer le statut vers "${availableStatusInfo.label}" ? Cette action peut affecter les contrats de location existants.`}
        confirmText="Confirmer le changement"
        cancelText="Annuler"
        type="warning"
        loading={isLoading}
      />
    </>
  );
};

export default PropertyStatusToggle;