import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [];

    // Always start with dashboard
    breadcrumbs.push({
      label: 'Tableau de bord',
      path: '/properties-dashboard',
      isActive: false
    });

    switch (path) {
      case '/properties-dashboard':
        breadcrumbs[0].isActive = true;
        break;
      
      case '/add-property':
        breadcrumbs.push({
          label: 'Propriétés',
          path: '/properties-dashboard',
          isActive: false
        });
        breadcrumbs.push({
          label: 'Ajouter une propriété',
          path: '/add-property',
          isActive: true
        });
        break;
      
      case '/edit-property':
        breadcrumbs.push({
          label: 'Propriétés',
          path: '/properties-dashboard',
          isActive: false
        });
        breadcrumbs.push({
          label: 'Modifier la propriété',
          path: '/edit-property',
          isActive: true
        });
        break;
      
      case '/property-details':
        breadcrumbs.push({
          label: 'Propriétés',
          path: '/properties-dashboard',
          isActive: false
        });
        breadcrumbs.push({
          label: 'Détails de la propriété',
          path: '/property-details',
          isActive: true
        });
        break;
      
      default:
        breadcrumbs[0].isActive = true;
        break;
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  const handleBreadcrumbClick = (path, isActive) => {
    if (!isActive) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground" 
              />
            )}
            {breadcrumb.isActive ? (
              <span className="font-medium text-foreground">
                {breadcrumb.label}
              </span>
            ) : (
              <button
                onClick={() => handleBreadcrumbClick(breadcrumb.path, breadcrumb.isActive)}
                className="hover:text-foreground transition-micro focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm px-1 py-0.5"
              >
                {breadcrumb.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;