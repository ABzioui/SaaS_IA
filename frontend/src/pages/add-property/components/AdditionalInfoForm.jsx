import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AdditionalInfoForm = ({ formData, errors, onChange }) => {
  const availabilityOptions = [
    { value: 'immediate', label: 'Immédiatement disponible' },
    { value: 'date', label: 'À partir d\'une date' },
    { value: 'occupied', label: 'Actuellement occupé' }
  ];

  const handleInputChange = (field, value) => {
    onChange(field, value);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Informations complémentaires</h2>
      
      <div className="space-y-6">
        {/* Charges */}
        <Input
          label="Charges mensuelles (€)"
          type="number"
          placeholder="150"
          value={formData.charges}
          onChange={(e) => handleInputChange('charges', e.target.value)}
          error={errors.charges}
          min="0"
          step="0.01"
          description="Charges locatives (eau, électricité, chauffage, etc.)"
        />

        {/* Deposit */}
        <Input
          label="Dépôt de garantie (€)"
          type="number"
          placeholder="2400"
          value={formData.deposit}
          onChange={(e) => handleInputChange('deposit', e.target.value)}
          error={errors.deposit}
          min="0"
          step="0.01"
          description="Généralement équivalent à 1-2 mois de loyer"
        />

        {/* Availability */}
        <Select
          label="Disponibilité"
          placeholder="Sélectionnez la disponibilité"
          options={availabilityOptions}
          value={formData.availability}
          onChange={(value) => handleInputChange('availability', value)}
          error={errors.availability}
          required
        />

        {/* Availability Date - Show only if 'date' is selected */}
        {formData.availability === 'date' && (
          <Input
            label="Date de disponibilité"
            type="date"
            value={formData.availabilityDate}
            onChange={(e) => handleInputChange('availabilityDate', e.target.value)}
            error={errors.availabilityDate}
            required
          />
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            className="w-full min-h-[120px] px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
            placeholder="Décrivez les caractéristiques de la propriété, les équipements, l'environnement..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={5}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-error">{errors.description}</p>
          )}
        </div>

        {/* Furnished */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="furnished"
            checked={formData.furnished}
            onChange={(e) => handleInputChange('furnished', e.target.checked)}
            className="w-4 h-4 text-primary bg-input border-border rounded focus:ring-ring focus:ring-2"
          />
          <label htmlFor="furnished" className="text-sm font-medium text-foreground">
            Propriété meublée
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;