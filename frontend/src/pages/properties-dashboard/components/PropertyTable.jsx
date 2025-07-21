import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Checkbox from '../../../components/ui/Checkbox';
import PropertyStatusBadge from './PropertyStatusBadge';

const PropertyTable = ({ 
  properties, 
  selectedProperties, 
  onSelectionChange, 
  onEdit, 
  onViewDetails, 
  onDelete,
  onSort,
  sortConfig 
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectionChange(properties.map(p => p.id));
    } else {
      onSelectionChange([]);
    }
  };

  const handleSelectProperty = (propertyId, checked) => {
    if (checked) {
      onSelectionChange([...selectedProperties, propertyId]);
    } else {
      onSelectionChange(selectedProperties.filter(id => id !== propertyId));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) {
      return 'ArrowUpDown';
    }
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const isAllSelected = properties.length > 0 && selectedProperties.length === properties.length;
  const isIndeterminate = selectedProperties.length > 0 && selectedProperties.length < properties.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Statut</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('type')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Type</span>
                  <Icon name={getSortIcon('type')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('address')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Adresse</span>
                  <Icon name={getSortIcon('address')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => onSort('rent')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-micro"
                >
                  <span>Loyer mensuel</span>
                  <Icon name={getSortIcon('rent')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {properties.map((property) => (
              <tr
                key={property.id}
                className={`hover:bg-muted/30 transition-micro ${
                  selectedProperties.includes(property.id) ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredRow(property.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-4">
                  <Checkbox
                    checked={selectedProperties.includes(property.id)}
                    onChange={(e) => handleSelectProperty(property.id, e.target.checked)}
                  />
                </td>
                <td className="px-4 py-4">
                  <PropertyStatusBadge status={property.status} />
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-foreground capitalize">
                    {property.type}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{property.address}</p>
                    <p className="text-xs text-muted-foreground">{property.city}, {property.postalCode}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-semibold text-foreground">
                    {formatCurrency(property.rent)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(property)}
                      iconName="Eye"
                      className="opacity-70 hover:opacity-100"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(property)}
                      iconName="Edit"
                      className="opacity-70 hover:opacity-100"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(property)}
                      iconName="Trash2"
                      className="opacity-70 hover:opacity-100 hover:text-error"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className={`border border-border rounded-lg p-4 ${
              selectedProperties.includes(property.id) ? 'bg-primary/5 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedProperties.includes(property.id)}
                  onChange={(e) => handleSelectProperty(property.id, e.target.checked)}
                />
                <PropertyStatusBadge status={property.status} />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(property)}
                  iconName="Eye"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(property)}
                  iconName="Edit"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(property)}
                  iconName="Trash2"
                  className="hover:text-error"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-foreground capitalize">{property.type}</p>
                <p className="text-sm text-muted-foreground">{property.address}</p>
                <p className="text-xs text-muted-foreground">{property.city}, {property.postalCode}</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">Loyer mensuel</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(property.rent)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Building2" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Aucune propriété trouvée</h3>
          <p className="text-muted-foreground mb-4">
            Commencez par ajouter votre première propriété à gérer.
          </p>
          <Button
            variant="default"
            onClick={() => onEdit(null)}
            iconName="Plus"
            iconPosition="left"
          >
            Ajouter une propriété
          </Button>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;