import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyMetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success/10',
          icon: 'text-success',
          text: 'text-success'
        };
      case 'warning':
        return {
          bg: 'bg-warning/10',
          icon: 'text-warning',
          text: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          icon: 'text-error',
          text: 'text-error'
        };
      default:
        return {
          bg: 'bg-primary/10',
          icon: 'text-primary',
          text: 'text-primary'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center`}>
              <Icon name={icon} size={24} className={colorClasses.icon} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        
        {trend && (
          <div className="flex items-center space-x-1">
            <Icon 
              name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
              size={16} 
              className={trend === 'up' ? 'text-success' : 'text-error'} 
            />
            <span className={`text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-error'}`}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMetricsCard;