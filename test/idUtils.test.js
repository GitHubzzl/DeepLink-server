const assert = require('assert');
const idUtils = require('../utils/idUtil');
describe('uuidV1',function(){
  it('should return',function(){
    let id = idUtils.getUuidV1();
    assert.notEqual('',id);
  });
  it('should not contain -',function(){
    let id = idUtils.getUuidV1();
    assert(!id.includes('-'));
  });
});
