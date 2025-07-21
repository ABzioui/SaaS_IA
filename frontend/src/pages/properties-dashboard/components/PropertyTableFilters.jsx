import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PropertyTableFilters = ({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onClearFilters,
  onAddProperty
}) => {
  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'libre', label: 'Libre' },
    { value: 'occupé', label: 'Occupé' },
    { value: 'maintenance', label: 'Maintenance' }
  ];

  const typeOptions = [
    { value: '', label: 'Tous les types' },
    { value: 'appartement', label: 'Appartement' },
    { value: 'maison', label: 'Maison' },
    { value: 'studio', label: 'Studio' },
    { value: 'bureau', label: 'Bureau' },
    { value: 'commerce', label: 'Commerce' }
  ];

  const hasActiveFilters = searchTerm || statusFilter || typeFilter;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Rechercher par adresse, type..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-[180px]">
            <Select
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusFilterChange}
              placeholder="Filtrer par statut"
            />
          </div>

          {/* Type Filter */}
          <div className="min-w-[180px]">
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={onTypeFilterChange}
              placeholder="Filtrer par type"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Effacer
            </Button>
          )}
        </div>

        {/* Add Property Button */}
        <div className="flex justify-end">
          <Button
            variant="default"
            onClick={onAddProperty}
            iconName="Plus"
            iconPosition="left"
          >
            Ajouter une propriété
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyTableFilters;