const router = require('express').Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const Document = require('../models/Document');
const DocumentVersion = require('../models/DocumentVersion');
const path = require('path');

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

// 📌 Upload New Document (v1)
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const tagArray = tags ? tags.split(',').map(t => t.trim()) : [];

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const doc = await Document.create({
      title,
      description,
      tags: tagArray,
      owner: req.user.userId,
      currentVersion: 1,
      permissions: {
        view: [req.user.userId],
        edit: [req.user.userId]
      }
    });

    await DocumentVersion.create({
      documentId: doc._id,
      versionNumber: 1,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      uploadedBy: req.user.userId
    });

    res.status(201).json({ message: 'Document uploaded successfully', documentId: doc._id });

  } catch (err) {
    console.error("Upload failed:", err);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
});



// 📌 Get all documents of User
router.get('/', auth, async (req, res) => {
  try {
    const docs = await Document.find({ owner: req.user.userId })
      .sort({ updatedAt: -1 })
      .lean();

    for (let doc of docs) {
      const latest = await DocumentVersion.findOne({ documentId: doc._id })
        .sort({ versionNumber: -1 });

      if (latest) {
        doc.filePath = latest.filePath;
      }
    }

    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});


// 📌 Search documents
// Search documents by text (title / description / tags)
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;  // we will send ?q=...
    const userId = req.user.userId;

    // base filter: documents the user can access
    const accessFilter = {
      $or: [
        { owner: userId },
        { 'permissions.view': userId },
        { 'permissions.edit': userId }
      ]
    };

    let finalFilter = accessFilter;

    if (q && q.trim()) {
      const regex = new RegExp(q.trim(), 'i'); // case-insensitive
      finalFilter = {
        $and: [
          accessFilter,
          {
            $or: [
              { title: regex },
              { description: regex },
              { tags: regex }
            ]
          }
        ]
      };
    }

    const docs = await Document.find(finalFilter).sort({ updatedAt: -1 });
    res.json(docs);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed', details: err.message });
  }
});


// 📌 Delete document
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Document.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.userId
    });

    if (!deleted) {
      return res.status(403).json({ error: 'Not allowed to delete' });
    }

    await DocumentVersion.deleteMany({ documentId: req.params.id });

    res.json({ message: 'Document deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err.message });
  }
});

// 📌 Get versions of a document
router.get('/:id/versions', auth, async (req, res) => {
  const versions = await DocumentVersion.find({ documentId: req.params.id })
    .sort({ versionNumber: -1 });

  res.json(versions);
});
// Update Permissions
router.put('/:id/permissions', auth, async (req, res) => {
  try {
    const { view, edit } = req.body;

    const doc = await Document.findByIdAndUpdate(
      req.params.id,
      { permissions: { view, edit } },
      { new: true }
    );

    res.json({ message: 'Permissions updated', doc });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update permissions' });
  }
});

module.exports = router;
