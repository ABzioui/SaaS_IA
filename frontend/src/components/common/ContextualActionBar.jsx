import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';

const ContextualActionBar = ({ selectedItems = [], onAction }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActionsForRoute = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/properties-dashboard':
        return {
          primary: [
            {
              label: 'Ajouter une propriété',
              action: 'add',
              variant: 'default',
              iconName: 'Plus',
              onClick: () => navigate('/add-property')
            }
          ],
          secondary: selectedItems.length > 0 ? [
            {
              label: 'Modifier',
              action: 'edit',
              variant: 'outline',
              iconName: 'Edit',
              onClick: () => handleEdit()
            },
            {
              label: 'Supprimer',
              action: 'delete',
              variant: 'destructive',
              iconName: 'Trash2',
              onClick: () => handleDelete()
            }
          ] : []
        };
      
      case '/add-property':
        return {
          primary: [
            {
              label: 'Enregistrer',
              action: 'save',
              variant: 'default',
              iconName: 'Save',
              onClick: () => handleSave()
            }
          ],
          secondary: [
            {
              label: 'Annuler',
              action: 'cancel',
              variant: 'outline',
              iconName: 'X',
              onClick: () => navigate('/properties-dashboard')
            }
          ]
        };
      
      case '/edit-property':
        return {
          primary: [
            {
              label: 'Mettre à jour',
              action: 'update',
              variant: 'default',
              iconName: 'Save',
              onClick: () => handleUpdate()
            }
          ],
          secondary: [
            {
              label: 'Annuler',
              action: 'cancel',
              variant: 'outline',
              iconName: 'X',
              onClick: () => navigate('/properties-dashboard')
            },
            {
              label: 'Supprimer',
              action: 'delete',
              variant: 'destructive',
              iconName: 'Trash2',
              onClick: () => handleDelete()
            }
          ]
        };
      
      case '/property-details':
        return {
          primary: [
            {
              label: 'Modifier',
              action: 'edit',
              variant: 'default',
              iconName: 'Edit',
              onClick: () => navigate('/edit-property')
            }
          ],
          secondary: [
            {
              label: 'Retour',
              action: 'back',
              variant: 'outline',
              iconName: 'ArrowLeft',
              onClick: () => navigate('/properties-dashboard')
            },
            {
              label: 'Supprimer',
              action: 'delete',
              variant: 'destructive',
              iconName: 'Trash2',
              onClick: () => handleDelete()
            }
          ]
        };
      
      default:
        return { primary: [], secondary: [] };
    }
  };

  const handleEdit = () => {
    if (selectedItems.length === 1) {
      navigate('/edit-property');
    }
    onAction?.('edit', selectedItems);
  };

  const handleDelete = () => {
    onAction?.('delete', selectedItems);
  };

  const handleSave = () => {
    onAction?.('save');
  };

  const handleUpdate = () => {
    onAction?.('update');
  };

  const actions = getActionsForRoute();

  if (actions.primary.length === 0 && actions.secondary.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        {/* Selection Info */}
        {selectedItems.length > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            <span className="font-medium text-foreground mr-1">
              {selectedItems.length}
            </span>
            élément{selectedItems.length > 1 ? 's' : ''} sélectionné{selectedItems.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {/* Secondary Actions */}
        {actions.secondary.map((action, index) => (
          <Button
            key={`secondary-${index}`}
            variant={action.variant}
            size="sm"
            iconName={action.iconName}
            iconPosition="left"
            onClick={action.onClick}
            className="transition-micro"
          >
            {action.label}
          </Button>
        ))}

        {/* Primary Actions */}
        {actions.primary.map((action, index) => (
          <Button
            key={`primary-${index}`}
            variant={action.variant}
            size="sm"
            iconName={action.iconName}
            iconPosition="left"
            onClick={action.onClick}
            className="transition-micro"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ContextualActionBar;