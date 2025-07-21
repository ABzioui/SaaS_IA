import React from 'react';
import Icon from '../../../components/AppIcon';

const ChangeTracker = ({ changes = [], onRevertChange }) => {
  if (changes.length === 0) {
    return null;
  }

  const getFieldLabel = (field) => {
    const fieldLabels = {
      address: 'Adresse',
      type: 'Type de propriété',
      surface: 'Surface',
      rent: 'Loyer mensuel',
      charges: 'Charges mensuelles',
      description: 'Description',
      status: 'Statut'
    };
    return fieldLabels[field] || field;
  };

  const formatValue = (field, value) => {
    if (field === 'rent' || field === 'charges') {
      return `${value} €`;
    }
    if (field === 'surface') {
      return `${value} m²`;
    }
    if (field === 'status') {
      return value === 'available' ? 'Disponible' : 'Occupé';
    }
    return value;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Modifications en cours
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-warning" />
          <span className="text-sm text-warning font-medium">
            {changes.length} modification{changes.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {changes.map((change, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Icon name="Edit" size={14} className="text-warning" />
                <span className="text-sm font-medium text-foreground">
                  {getFieldLabel(change.field)}
                </span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span className="line-through">
                    {formatValue(change.field, change.oldValue)}
                  </span>
                  <Icon name="ArrowRight" size={12} />
                  <span className="font-medium text-warning">
                    {formatValue(change.field, change.newValue)}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onRevertChange(change.field)}
              className="p-1 rounded-md hover:bg-warning/10 transition-micro"
              title="Annuler cette modification"
            >
              <Icon name="Undo" size={16} className="text-warning" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p>Les modifications seront appliquées après avoir cliqué sur "Sauvegarder les modifications".</p>
            <p className="mt-1">Vous pouvez annuler individuellement chaque modification en cliquant sur l'icône d'annulation.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeTracker;