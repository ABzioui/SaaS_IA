import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyHistory = ({ history }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return 'Plus';
      case 'updated':
        return 'Edit';
      case 'rented':
        return 'UserCheck';
      case 'available':
        return 'Home';
      case 'document_added':
        return 'FileText';
      case 'maintenance':
        return 'Wrench';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'created':
        return 'text-blue-600';
      case 'updated':
        return 'text-yellow-600';
      case 'rented':
        return 'text-green-600';
      case 'available':
        return 'text-purple-600';
      case 'document_added':
        return 'text-indigo-600';
      case 'maintenance':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="History" size={20} className="mr-2" />
        Historique de la propriété
      </h2>
      
      <div className="space-y-4">
        {history.map((activity, index) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
              <Icon 
                name={getActivityIcon(activity.type)} 
                size={14} 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(activity.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            {index < history.length - 1 && (
              <div className="absolute left-4 mt-8 w-px h-4 bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyHistory;