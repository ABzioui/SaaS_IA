import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TenantInformation = ({ tenant, lease }) => {
  if (!tenant) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Users" size={20} className="mr-2" />
          Informations locataire
        </h2>
        <div className="text-center py-8">
          <Icon name="UserX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Propriété actuellement libre</p>
          <p className="text-sm text-muted-foreground mt-1">
            Aucun locataire assigné
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Users" size={20} className="mr-2" />
        Informations locataire
      </h2>
      
      <div className="space-y-6">
        {/* Tenant Details */}
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground">{tenant.name}</h3>
            <p className="text-sm text-muted-foreground">{tenant.email}</p>
            <p className="text-sm text-muted-foreground">{tenant.phone}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Contacter
          </Button>
        </div>
        
        {/* Lease Information */}
        <div className="border-t border-border pt-4">
          <h4 className="font-medium text-foreground mb-3">Détails du bail</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Icon name="Calendar" size={16} className="mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date de début</p>
                <p className="font-medium text-foreground">
                  {new Date(lease.startDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="CalendarX" size={16} className="mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date de fin</p>
                <p className="font-medium text-foreground">
                  {new Date(lease.endDate).toLocaleDateString('fr-FR')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="Euro" size={16} className="mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Dépôt de garantie</p>
                <p className="font-medium text-foreground">
                  {lease.deposit.toLocaleString('fr-FR')} €
                </p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Icon name="Clock" size={16} className="mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Durée du bail</p>
                <p className="font-medium text-foreground">{lease.duration}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Lease Status */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="FileCheck" size={16} className="mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Statut du bail</span>
            </div>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              lease.status === 'Actif' 
                ? 'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
            }`}>
              {lease.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantInformation;