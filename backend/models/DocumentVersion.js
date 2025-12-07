const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
  versionNumber: Number,
  filePath: String,
  fileType: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('DocumentVersion', versionSchema);
