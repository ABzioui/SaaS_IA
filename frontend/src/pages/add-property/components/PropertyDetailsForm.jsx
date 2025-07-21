import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PropertyDetailsForm = ({ formData, errors, onChange }) => {
  const propertyTypes = [
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'studio', label: 'Studio' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'loft', label: 'Loft' },
    { value: 'villa', label: 'Villa' },
    { value: 'commerce', label: 'Local commercial' },
    { value: 'bureau', label: 'Bureau' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Détails de la propriété</h2>
      
      <div className="space-y-6">
        {/* Address Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Adresse"
            type="text"
            placeholder="123 Rue de la Paix"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            error={errors.address}
            required
            className="col-span-2"
          />
          
          <Input
            label="Ville"
            type="text"
            placeholder="Paris"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={errors.city}
            required
          />
          
          <Input
            label="Code postal"
            type="text"
            placeholder="75001"
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            error={errors.postalCode}
            required
            pattern="[0-9]{5}"
            maxLength={5}
          />
        </div>

        {/* Property Type */}
        <Select
          label="Type de propriété"
          placeholder="Sélectionnez le type"
          options={propertyTypes}
          value={formData.propertyType}
          onChange={(value) => handleInputChange('propertyType', value)}
          error={errors.propertyType}
          required
        />

        {/* Surface Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Surface (m²)"
            type="number"
            placeholder="75"
            value={formData.surface}
            onChange={(e) => handleInputChange('surface', e.target.value)}
            error={errors.surface}
            required
            min="1"
            max="10000"
          />
          
          <Input
            label="Nombre de pièces"
            type="number"
            placeholder="3"
            value={formData.rooms}
            onChange={(e) => handleInputChange('rooms', e.target.value)}
            error={errors.rooms}
            min="1"
            max="20"
          />
        </div>

        {/* Rent Amount */}
        <Input
          label="Loyer mensuel (€)"
          type="number"
          placeholder="1200"
          value={formData.rent}
          onChange={(e) => handleInputChange('rent', e.target.value)}
          error={errors.rent}
          required
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
};

export default PropertyDetailsForm;