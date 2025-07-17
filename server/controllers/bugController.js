const Bug = require('../models/Bug');

// Create a new bug
exports.createBug = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const bug = new Bug({ title, description, status });
    await bug.save();
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

// Get all bugs
exports.getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    next(err);
  }
};

// Update a bug
exports.updateBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const bug = await Bug.findByIdAndUpdate(id, updates, { new: true });
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json(bug);
  } catch (err) {
    next(err);
  }
};

// Delete a bug
exports.deleteBug = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bug = await Bug.findByIdAndDelete(id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
}; 