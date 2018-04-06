/*项目服务模块*/
var JsonFileService =  require('./jsonFileService');
var Project=require('../model/project');
const jsonFileService=new  JsonFileService();
const viewDataPath="/public/data/view/viewData.json";;
class ProjectService{
    // 构造
    constructor(){
    }
    addProject(projectInfo){
        try {
            var newProject= new Project(projectInfo);
            var viewData = jsonFileService.read(ROOT_PATH+viewDataPath);
            viewData.push(newProject);
            jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
        }catch (err){

        }
    }
}
module.exports=ProjectService;