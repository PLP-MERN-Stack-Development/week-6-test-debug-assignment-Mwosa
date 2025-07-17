const { validateBug } = require('../../helpers/bugHelpers');

describe('validateBug', () => {
  it('returns true for valid bug', () => {
    expect(validateBug({ title: 'Bug', status: 'open' })).toBe(true);
  });
  it('returns false for missing title', () => {
    expect(validateBug({ status: 'open' })).toBe(false);
  });
  it('returns false for invalid status', () => {
    expect(validateBug({ title: 'Bug', status: 'invalid' })).toBe(false);
  });
}); 