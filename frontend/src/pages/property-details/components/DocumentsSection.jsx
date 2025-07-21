import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsSection = ({ documents }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'diagnostic':
        return 'FileText';
      case 'certificate':
        return 'Award';
      case 'photo':
        return 'Image';
      case 'contract':
        return 'FileSignature';
      default:
        return 'File';
    }
  };

  const getDocumentTypeLabel = (type) => {
    const labels = {
      diagnostic: 'Diagnostic',
      certificate: 'Certificat',
      photo: 'Photo',
      contract: 'Contrat'
    };
    return labels[type] || 'Document';
  };

  const handleDownload = (document) => {
    // Mock download functionality
    console.log('Downloading document:', document.name);
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
  };

  const closePreview = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="FolderOpen" size={20} className="mr-2" />
        Documents de la propriété
      </h2>
      
      {documents.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="FileX" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Aucun document disponible</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((document) => (
            <div key={document.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-micro">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mr-3">
                    <Icon 
                      name={getDocumentIcon(document.type)} 
                      size={18} 
                      color="var(--color-primary)" 
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{document.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {getDocumentTypeLabel(document.type)} • {document.size}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Ajouté le {new Date(document.uploadDate).toLocaleDateString('fr-FR')}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Eye"
                    onClick={() => handlePreview(document)}
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Download"
                    onClick={() => handleDownload(document)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-2000 p-4">
          <div className="bg-card rounded-lg shadow-elevation-2 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {selectedDocument.name}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={closePreview}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center h-64 bg-muted rounded-lg">
                <div className="text-center">
                  <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Aperçu du document</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedDocument.name}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="default"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleDownload(selectedDocument)}
                >
                  Télécharger
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;