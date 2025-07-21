const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images, PDFs, and common document formats
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and office documents are allowed.'), false);
  }
};

exports.upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Upload document
exports.uploadDocument = async (file) => {
  try {
    // In a real application, you might want to upload to a cloud storage service
    // For now, we'll just return the local file path
    const relativePath = path.relative(path.join(__dirname, '../uploads'), file.path);
    return {
      url: `/uploads/${relativePath}`,
      path: file.path
    };
  } catch (error) {
    throw new Error(`Error uploading document: ${error.message}`);
  }
};

// Delete document
exports.deleteDocument = async (fileUrl) => {
  try {
    if (!fileUrl) return;

    // Extract file path from URL
    const relativePath = fileUrl.replace('/uploads/', '');
    const filePath = path.join(__dirname, '../uploads', relativePath);

    // Check if file exists before attempting to delete
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
    }
  } catch (error) {
    throw new Error(`Error deleting document: ${error.message}`);
  }
}; 