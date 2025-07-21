import React from 'react';
import Icon from '../../../components/AppIcon';

const LocationDetails = ({ property }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2" />
        Détails de localisation
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <Icon name="Home" size={18} className="mr-3 mt-1 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Adresse complète</p>
            <p className="font-medium text-foreground">{property.fullAddress}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Icon name="Building" size={18} className="mr-3 mt-1 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Quartier</p>
            <p className="font-medium text-foreground">{property.neighborhood}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Icon name="MapPin" size={18} className="mr-3 mt-1 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Code postal</p>
            <p className="font-medium text-foreground">{property.postalCode}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <Icon name="Navigation" size={18} className="mr-3 mt-1 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Ville</p>
            <p className="font-medium text-foreground">{property.city}</p>
          </div>
        </div>
        
        {/* Google Maps Integration */}
        <div className="mt-6">
          <p className="text-sm text-muted-foreground mb-2">Localisation sur la carte</p>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={property.address}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=14&output=embed`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;