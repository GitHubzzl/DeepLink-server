var IdUtil = require('../utils/idUtil');
const idUtil = new IdUtil();
const idLength = 8;

class Project {
    // 构造
    constructor(projectInfo) {
        this.name = projectInfo.projectName;
        this.description = projectInfo.projectDescription;
        this.id = idUtil.genNonDuplicateID(idLength);
        this.type="project";
        this.tag="项目";
        this.path=`\${projectInfo.projectName}`;
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