const IdUtil = require('../utils/idUtil');
const idLength = 8;

class Module {
  // 构造
  constructor(moduleInfo) {
    let id = IdUtil.genNonDuplicateID(idLength)
    this.name = moduleInfo.moduleName;
    this.description = moduleInfo.moduleDescription;
    this.id = id;
    this.typeId = moduleInfo.moduleTypeId;
    // this.typeName=moduleInfo.typeName;
    this.tag = "项目";
    this.parentId = moduleInfo.parentId;
    this.parentName = moduleInfo.parentName;
    this.parentPath = moduleInfo.parentPath;
    this.parentPathId = moduleInfo.parentPathId;
    this.parentTypeId = moduleInfo.parentTypeId;
    this.path = `${moduleInfo.parentPath}/${this.name}`;
    this.pathId = `${moduleInfo.parentPathId}/${id}`;
    // this.parentTypeName=moduleInfo.parentTypeName;
    this.createTime = new Date();
    this.modifyTime = new Date();
    this.children = [];
  }

  getName() {
    return (this.name);
  }

  setName(name) {
    this.name = name;
  }

  setDescription(description) {
    this.description = description;
  }

  getId() {
    return this.id;
  }

}

module.exports = Module;
