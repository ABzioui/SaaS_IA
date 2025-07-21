import React from 'react';

const PropertyStatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status?.toLowerCase()) {
      case 'libre': case'available':
        return {
          label: 'Libre',
          className: 'bg-success/10 text-success border-success/20',
          dotColor: 'bg-success'
        };
      case 'occupé': case'occupied': case'rented':
        return {
          label: 'Occupé',
          className: 'bg-error/10 text-error border-error/20',
          dotColor: 'bg-error'
        };
      case 'maintenance':
        return {
          label: 'Maintenance',
          className: 'bg-warning/10 text-warning border-warning/20',
          dotColor: 'bg-warning'
        };
      default:
        return {
          label: 'Inconnu',
          className: 'bg-muted text-muted-foreground border-border',
          dotColor: 'bg-muted-foreground'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      <div className={`w-2 h-2 rounded-full ${config.dotColor} mr-2`} />
      {config.label}
    </div>
  );
};

export default PropertyStatusBadge;