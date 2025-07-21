import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';

const DocumentManager = ({ 
  documents = [], 
  onDocumentAdd, 
  onDocumentRemove, 
  onDocumentReplace,
  isLoading 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Le fichier est trop volumineux. Taille maximale : 10MB');
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/jpg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Type de fichier non supporté. Formats acceptés : PDF, JPG, PNG, DOC, DOCX');
        return;
      }
      
      onDocumentAdd(file);
    });
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleDeleteDocument = (document) => {
    setDocumentToDelete(document);
    setShowDeleteModal(true);
  };

  const confirmDeleteDocument = () => {
    if (documentToDelete) {
      onDocumentRemove(documentToDelete.id);
      setDocumentToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('image')) return 'Image';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Documents de la propriété
          </h3>
          <span className="text-sm text-muted-foreground">
            {documents.length} document{documents.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isLoading}
          />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-muted rounded-full">
                <Icon name="Upload" size={24} className="text-muted-foreground" />
              </div>
            </div>
            
            <div>
              <p className="text-foreground font-medium">
                Glissez-déposez vos fichiers ici
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                ou cliquez pour sélectionner
              </p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Formats acceptés : PDF, JPG, PNG, DOC, DOCX</p>
              <p>Taille maximale : 10MB par fichier</p>
            </div>
          </div>
        </div>

        {/* Documents List */}
        {documents.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-medium text-foreground">
              Documents existants
            </h4>
            
            <div className="space-y-2">
              {documents.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <Icon 
                        name={getFileIcon(document.type)} 
                        size={20} 
                        className="text-muted-foreground" 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {document.name}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(document.size)}</span>
                        <span>•</span>
                        <span>Ajouté le {formatDate(document.uploadDate)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      onClick={() => window.open(document.url, '_blank')}
                      disabled={isLoading}
                    >
                      Télécharger
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Trash2"
                      onClick={() => handleDeleteDocument(document)}
                      disabled={isLoading}
                    >
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Types Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">
            Types de documents recommandés
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>Diagnostic de performance énergétique (DPE)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>Certificat de conformité électrique</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>Diagnostic gaz</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span>État des risques et pollutions (ERP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteDocument}
        title="Supprimer le document"
        message={`Êtes-vous sûr de vouloir supprimer le document "${documentToDelete?.name}" ? Cette action est irréversible.`}
        confirmText="Supprimer"
        cancelText="Annuler"
        type="destructive"
        loading={isLoading}
      />
    </>
  );
};

export default DocumentManager;