var assert = require('assert');

describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe('Math', function () {
  it('3*3 is 9', function () {
    assert.equal(3 * 3, 9);
  });
  it('(3-4)*8 is -8', function () {
    assert.equal((3 - 4) * 8, -8);
  });
});