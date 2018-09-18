const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v3');
class IdUtil {
  // 构造
  constructor() {
  }

  static genNonDuplicateID(randomLength) {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
  }

  static getUuidV1(){
    let id = uuidv1();
    return id.replace(/-/g,'')
  }
}

module.exports = IdUtil;
