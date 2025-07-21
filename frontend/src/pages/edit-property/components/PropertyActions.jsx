import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const PropertyActions = ({ 
  onSave, 
  onDelete, 
  hasChanges = false,
  isLoading = false,
  hasActiveTenant = false,
  hasActiveContracts = false
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancel = () => {
    if (hasChanges) {
      setShowCancelModal(true);
    } else {
      navigate('/properties-dashboard');
    }
  };

  const handleConfirmCancel = () => {
    setShowCancelModal(false);
    navigate('/properties-dashboard');
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  const getDeleteWarningMessage = () => {
    if (hasActiveTenant && hasActiveContracts) {
      return `Cette propriété a un locataire actif et des contrats en cours. La suppression annulera tous les contrats associés et pourrait affecter les relations avec les locataires. Cette action est irréversible.`;
    } else if (hasActiveTenant) {
      return `Cette propriété a un locataire actif. La suppression pourrait affecter les relations avec le locataire. Cette action est irréversible.`;
    } else if (hasActiveContracts) {
      return `Cette propriété a des contrats associés. La suppression annulera tous les contrats. Cette action est irréversible.`;
    }
    return `Êtes-vous sûr de vouloir supprimer cette propriété ? Cette action est irréversible.`;
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">
          Actions
        </h3>

        <div className="space-y-4">
          {/* Save Changes */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              size="lg"
              iconName="Save"
              iconPosition="left"
              onClick={onSave}
              loading={isLoading}
              disabled={!hasChanges}
              className="flex-1"
            >
              Sauvegarder les modifications
            </Button>

            <Button
              variant="outline"
              size="lg"
              iconName="X"
              iconPosition="left"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 sm:flex-none"
            >
              Annuler
            </Button>
          </div>

          {/* Changes Status */}
          {hasChanges && (
            <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
              <span className="text-sm text-warning font-medium">
                Modifications non sauvegardées
              </span>
            </div>
          )}

          {!hasChanges && (
            <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-success font-medium">
                Toutes les modifications sont sauvegardées
              </span>
            </div>
          )}

          {/* Danger Zone */}
          <div className="pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">
              Zone de danger
            </h4>
            
            <Button
              variant="destructive"
              size="default"
              iconName="Trash2"
              iconPosition="left"
              onClick={handleDelete}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              Supprimer la propriété
            </Button>

            {(hasActiveTenant || hasActiveContracts) && (
              <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="w-4 h-4 bg-error rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-xs text-error">
                    <p className="font-medium">Attention :</p>
                    <p className="mt-1">
                      {hasActiveTenant && "Cette propriété a un locataire actif. "}
                      {hasActiveContracts && "Des contrats sont associés à cette propriété. "}
                      La suppression aura des conséquences importantes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Annuler les modifications"
        message="Vous avez des modifications non sauvegardées. Êtes-vous sûr de vouloir quitter sans sauvegarder ?"
        confirmText="Quitter sans sauvegarder"
        cancelText="Continuer l'édition"
        type="warning"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Supprimer la propriété"
        message={getDeleteWarningMessage()}
        confirmText="Supprimer définitivement"
        cancelText="Annuler"
        type="destructive"
        loading={isLoading}
      />
    </>
  );
};

export default PropertyActions;