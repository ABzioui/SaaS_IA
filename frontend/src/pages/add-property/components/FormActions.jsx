import React from 'react';
import Button from '../../../components/ui/Button';

const FormActions = ({ 
  onSave, 
  onCancel, 
  isValid, 
  isSaving, 
  hasUnsavedChanges 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Status Info */}
        <div className="flex items-center space-x-4">
          {hasUnsavedChanges && (
            <div className="flex items-center text-sm text-warning">
              <div className="w-2 h-2 bg-warning rounded-full mr-2" />
              Modifications non sauvegardées
            </div>
          )}
          
          {isSaving && (
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse" />
              Sauvegarde automatique...
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isSaving}
          >
            Annuler
          </Button>
          
          <Button
            variant="default"
            onClick={onSave}
            disabled={!isValid || isSaving}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            {isSaving ? 'Enregistrement...' : 'Enregistrer la propriété'}
          </Button>
        </div>
      </div>
      
      {/* Form Validation Summary */}
      {!isValid && (
        <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">
            Veuillez remplir tous les champs obligatoires avant de sauvegarder.
          </p>
        </div>
      )}
    </div>
  );
};

export default FormActions;