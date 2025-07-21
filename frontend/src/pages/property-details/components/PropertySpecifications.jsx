import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertySpecifications = ({ property }) => {
  const specifications = [
    {
      label: 'Type de propriété',
      value: property.type,
      icon: 'Building2'
    },
    {
      label: 'Surface',
      value: `${property.surface} m²`,
      icon: 'Square'
    },
    {
      label: 'Loyer mensuel',
      value: `${property.rent.toLocaleString('fr-FR')} €`,
      icon: 'Euro'
    },
    {
      label: 'Charges',
      value: `${property.charges.toLocaleString('fr-FR')} €`,
      icon: 'Receipt'
    },
    {
      label: 'Total mensuel',
      value: `${(property.rent + property.charges).toLocaleString('fr-FR')} €`,
      icon: 'Calculator'
    },
    {
      label: 'Nombre de pièces',
      value: `${property.rooms} pièces`,
      icon: 'Home'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Info" size={20} className="mr-2" />
        Spécifications de la propriété
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specifications.map((spec, index) => (
          <div key={index} className="flex items-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3">
              <Icon name={spec.icon} size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{spec.label}</p>
              <p className="font-medium text-foreground">{spec.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertySpecifications;