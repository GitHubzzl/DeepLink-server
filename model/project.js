const IdUtil = require('../utils/idUtil');
const idLength = 8;

class Project {
    // 构造
    constructor(projectInfo) {
        this.name = projectInfo.projectName;
        this.description = projectInfo.projectDescription;
        this.id = IdUtil.genNonDuplicateID(idLength);
        this.type="project";
        this.tag="项目";
        this.path=`/${projectInfo.projectName}`;
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

module.exports = Project;