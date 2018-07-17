const IdUtil = require('../utils/idUtil');
const idLength = 8;

class Module {
    // 构造
    constructor(moduleInfo) {
        this.name = moduleInfo.moduleName;
        this.description = moduleInfo.moduleDescription;
        this.id = IdUtil.genNonDuplicateID(idLength);
        this.typeId=moduleInfo.typeId;
        this.typeName=moduleInfo.typeName;
        this.tag="项目";
        this.path=`/${moduleInfo.path}`;
        this.parentId=moduleInfo.parentId;
        this.parentName=moduleInfo.parentName;
        this.parentTypeId=moduleInfo.parentTypeId;
        this.parentTypeName=moduleInfo.parentTypeName;
        this.createTime=new Date();
        this.modifyTime=new Date();
        this.children=[];
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