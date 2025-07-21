import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PropertyBasicInfo = ({ 
  formData, 
  onChange, 
  errors, 
  propertyTypes, 
  isLoading 
}) => {
  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Informations de base
      </h3>
      
      <div className="space-y-6">
        <Input
          label="Adresse complète"
          type="text"
          placeholder="123 Rue de la République, 75001 Paris"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={errors.address}
          required
          disabled={isLoading}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Type de propriété"
            placeholder="Sélectionner le type"
            options={propertyTypes}
            value={formData.type}
            onChange={(value) => handleInputChange('type', value)}
            error={errors.type}
            required
            disabled={isLoading}
          />

          <Input
            label="Surface (m²)"
            type="number"
            placeholder="75"
            value={formData.surface}
            onChange={(e) => handleInputChange('surface', e.target.value)}
            error={errors.surface}
            required
            min="1"
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            disabled={isLoading}
          />

          <Input
            label="Charges mensuelles (€)"
            type="number"
            placeholder="150"
            value={formData.charges}
            onChange={(e) => handleInputChange('charges', e.target.value)}
            error={errors.charges}
            min="0"
            step="0.01"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Description détaillée de la propriété..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyBasicInfo;