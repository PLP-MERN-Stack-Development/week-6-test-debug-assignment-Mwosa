const validateBug = (bug) => {
  if (!bug.title || typeof bug.title !== 'string') return false;
  if (bug.status && !['open', 'in-progress', 'resolved'].includes(bug.status)) return false;
  return true;
};

module.exports = { validateBug }; 