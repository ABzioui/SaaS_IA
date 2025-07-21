import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirmer l\'action',
  message = 'Êtes-vous sûr de vouloir effectuer cette action ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  type = 'default', // 'default', 'destructive', 'warning'
  loading = false
}) => {
  if (!isOpen) return null;

  const getIconAndColors = () => {
    switch (type) {
      case 'destructive':
        return {
          icon: 'AlertTriangle',
          iconColor: 'var(--color-error)',
          confirmVariant: 'destructive'
        };
      case 'warning':
        return {
          icon: 'AlertCircle',
          iconColor: 'var(--color-warning)',
          confirmVariant: 'warning'
        };
      default:
        return {
          icon: 'HelpCircle',
          iconColor: 'var(--color-primary)',
          confirmVariant: 'default'
        };
    }
  };

  const { icon, iconColor, confirmVariant } = getIconAndColors();

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && !loading) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-2000 p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div 
        className="bg-card rounded-lg shadow-elevation-2 w-full max-w-md mx-auto transform transition-all duration-200 ease-out"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="flex items-center p-6 pb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mr-4">
            <Icon name={icon} size={24} color={iconColor} />
          </div>
          <div className="flex-1">
            <h3 
              id="modal-title"
              className="text-lg font-semibold text-foreground"
            >
              {title}
            </h3>
          </div>
          {!loading && (
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-muted transition-micro"
              aria-label="Fermer"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <p 
            id="modal-description"
            className="text-muted-foreground mb-6"
          >
            {message}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              onClick={handleConfirm}
              loading={loading}
              iconName={loading ? undefined : (type === 'destructive' ? 'Trash2' : 'Check')}
              iconPosition="left"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;