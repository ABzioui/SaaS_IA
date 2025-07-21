import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import PropertyMetricsCard from './components/PropertyMetricsCard';
import PropertyTableFilters from './components/PropertyTableFilters';
import PropertyTable from './components/PropertyTable';
import PropertyTablePagination from './components/PropertyTablePagination';

const PropertiesDashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for properties
  const mockProperties = [
    {
      id: 1,
      status: 'libre',
      type: 'appartement',
      address: '15 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      rent: 1200,
      surface: 45,
      rooms: 2,
      createdAt: '2024-01-15',
      lastUpdated: '2024-07-10'
    },
    {
      id: 2,
      status: 'occupé',
      type: 'maison',
      address: '8 Avenue des Champs',
      city: 'Lyon',
      postalCode: '69001',
      rent: 1800,
      surface: 120,
      rooms: 4,
      createdAt: '2024-02-20',
      lastUpdated: '2024-07-15'
    },
    {
      id: 3,
      status: 'libre',
      type: 'studio',
      address: '22 Boulevard Saint-Michel',
      city: 'Marseille',
      postalCode: '13001',
      rent: 650,
      surface: 25,
      rooms: 1,
      createdAt: '2024-03-10',
      lastUpdated: '2024-07-12'
    },
    {
      id: 4,
      status: 'occupé',
      type: 'appartement',
      address: '5 Place de la République',
      city: 'Toulouse',
      postalCode: '31000',
      rent: 950,
      surface: 65,
      rooms: 3,
      createdAt: '2024-04-05',
      lastUpdated: '2024-07-08'
    },
    {
      id: 5,
      status: 'maintenance',
      type: 'bureau',
      address: '12 Rue du Commerce',
      city: 'Nice',
      postalCode: '06000',
      rent: 2200,
      surface: 80,
      rooms: 5,
      createdAt: '2024-05-18',
      lastUpdated: '2024-07-16'
    },
    {
      id: 6,
      status: 'libre',
      type: 'appartement',
      address: '30 Rue Victor Hugo',
      city: 'Bordeaux',
      postalCode: '33000',
      rent: 1100,
      surface: 55,
      rooms: 2,
      createdAt: '2024-06-12',
      lastUpdated: '2024-07-14'
    },
    {
      id: 7,
      status: 'occupé',
      type: 'maison',
      address: '18 Allée des Roses',
      city: 'Nantes',
      postalCode: '44000',
      rent: 1600,
      surface: 110,
      rooms: 4,
      createdAt: '2024-07-01',
      lastUpdated: '2024-07-17'
    },
    {
      id: 8,
      status: 'libre',
      type: 'commerce',
      address: '7 Place du Marché',
      city: 'Strasbourg',
      postalCode: '67000',
      rent: 2800,
      surface: 150,
      rooms: 6,
      createdAt: '2024-07-05',
      lastUpdated: '2024-07-16'
    }
  ];

  // State management
  const [properties] = useState(mockProperties);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'address', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, property: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalProperties = properties.length;
    const availableProperties = properties.filter(p => p.status === 'libre').length;
    const occupiedProperties = properties.filter(p => p.status === 'occupé').length;
    const occupancyRate = totalProperties > 0 ? (occupiedProperties / totalProperties) * 100 : 0;
    const monthlyRevenue = properties
      .filter(p => p.status === 'occupé')
      .reduce((sum, p) => sum + p.rent, 0);

    return {
      total: totalProperties,
      available: availableProperties,
      occupied: occupiedProperties,
      occupancyRate: occupancyRate.toFixed(1),
      monthlyRevenue
    };
  }, [properties]);

  // Filter and sort properties
  const filteredAndSortedProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = !searchTerm || 
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || property.status === statusFilter;
      const matchesType = !typeFilter || property.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort properties
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      
      if (sortConfig.key === 'address') {
        aValue = `${a.address} ${a.city}`;
        bValue = `${b.address} ${b.city}`;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [properties, searchTerm, statusFilter, typeFilter, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProperties.length / itemsPerPage);
  const paginatedProperties = filteredAndSortedProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, typeFilter]);

  // Clear selected items when filters change
  useEffect(() => {
    setSelectedProperties([]);
  }, [searchTerm, statusFilter, typeFilter]);

  // Event handlers
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
    setSelectedProperties([]);
  };

  const handleAddProperty = () => {
    navigate('/add-property');
  };

  const handleEditProperty = (property) => {
    navigate('/edit-property', { state: { property } });
  };

  const handleViewDetails = (property) => {
    navigate('/property-details', { state: { property } });
  };

  const handleDeleteProperty = (property) => {
    setDeleteModal({ isOpen: true, property });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsDeleting(false);
    setDeleteModal({ isOpen: false, property: null });
    setSelectedProperties(prev => prev.filter(id => id !== deleteModal.property?.id));
  };

  const handleContextualAction = (action, items) => {
    switch (action) {
      case 'edit':
        if (items.length === 1) {
          const property = properties.find(p => p.id === items[0]);
          handleEditProperty(property);
        }
        break;
      case 'delete':
        if (items.length === 1) {
          const property = properties.find(p => p.id === items[0]);
          handleDeleteProperty(property);
        }
        break;
      default:
        break;
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tableau de bord des propriétés
            </h1>
            <p className="text-muted-foreground">
              Gérez vos propriétés locatives et suivez leur statut en temps réel
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <PropertyMetricsCard
              title="Total des propriétés"
              value={metrics.total}
              icon="Building2"
              color="primary"
            />
            <PropertyMetricsCard
              title="Propriétés libres"
              value={metrics.available}
              icon="Home"
              color="success"
            />
            <PropertyMetricsCard
              title="Taux d'occupation"
              value={`${metrics.occupancyRate}%`}
              icon="TrendingUp"
              color="warning"
              trend="up"
              trendValue="+2.5%"
            />
            <PropertyMetricsCard
              title="Revenus mensuels"
              value={formatCurrency(metrics.monthlyRevenue)}
              icon="Euro"
              color="primary"
              trend="up"
              trendValue="+8.2%"
            />
          </div>

          {/* Contextual Action Bar */}
          <ContextualActionBar
            selectedItems={selectedProperties}
            onAction={handleContextualAction}
          />

          {/* Filters */}
          <PropertyTableFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            onClearFilters={handleClearFilters}
            onAddProperty={handleAddProperty}
          />

          {/* Properties Table */}
          <PropertyTable
            properties={paginatedProperties}
            selectedProperties={selectedProperties}
            onSelectionChange={setSelectedProperties}
            onEdit={handleEditProperty}
            onViewDetails={handleViewDetails}
            onDelete={handleDeleteProperty}
            onSort={handleSort}
            sortConfig={sortConfig}
          />

          {/* Pagination */}
          <PropertyTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredAndSortedProperties.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, property: null })}
        onConfirm={handleConfirmDelete}
        title="Supprimer la propriété"
        message={`Êtes-vous sûr de vouloir supprimer la propriété "${deleteModal.property?.address}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="destructive"
        loading={isDeleting}
      />
    </div>
  );
};

export default PropertiesDashboard;