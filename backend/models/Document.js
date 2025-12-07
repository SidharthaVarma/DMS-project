const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  currentVersion: { type: Number, default: 1 },
  permissions: {
    view: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    edit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }
}, { timestamps: true });

documentSchema.index({ title: 'text', description: 'text', tags: 'text' });


module.exports = mongoose.model('Document', documentSchema);
