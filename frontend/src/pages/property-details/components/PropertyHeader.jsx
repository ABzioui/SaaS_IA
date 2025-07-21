import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyHeader = ({ property, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const isAvailable = status === 'Libre';
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isAvailable 
          ? 'bg-green-100 text-green-800 border border-green-200' :'bg-red-100 text-red-800 border border-red-200'
      }`}>
        <Icon 
          name={isAvailable ? "CheckCircle" : "XCircle"} 
          size={16} 
          className="mr-1" 
        />
        {status}
      </span>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {property.address}
          </h1>
          <div className="flex items-center space-x-4">
            {getStatusBadge(property.status)}
            <span className="text-sm text-muted-foreground">
              Réf: {property.reference}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={onEdit}
          >
            Modifier
          </Button>
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            iconPosition="left"
            onClick={onDelete}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;