/*项目服务模块*/
var mysql = require('mysql');
var DateTimeUtil =require('../utils/dateTimeUtil');
var dbConfig = require('../db/DBConfig');
var projectSQL = require('../db/projectSQL');
var JsonFileService =  require('./jsonFileService');
var Project=require('../model/project');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
const pool = mysql.createPool( dbConfig.mysql );
const jsonFileService=new  JsonFileService();
const dateTimeUtil=new  DateTimeUtil();
const viewDataPath="/public/data/view/viewData.json";;
class ProjectService{
    // 构造
    constructor(){
    }
    addProject(projectInfo){
        try {
            var newProject= new Project(projectInfo);
            var jsonArr=[
                {
                    "id": "10",
                    "name": "模块1",
                    "type": "module-0",
                    "tag": "环境",
                    "path": "/项目1/模块1",
                    "modifyDate": "2018-02-25",
                    "description": "介绍1",
                    "children": [
                        {
                            "id": "100",
                            "name": "子模块1",
                            "type": "module-1",
                            "tag": "全局环境",
                            "path": "/项目1/模块1/子模块1",
                            "modifyDate": "2018-02-25",
                            "description": "介绍1",
                            "children": [
                                {
                                    "id": "1519187825477",
                                    "name": "微信「去中心化」电商怎么玩：首先要确立对流量的正确认知",
                                    "type": "doc",
                                    "tag": "场景",
                                    "path": "/项目1/模块1/子模块1/微信「去中心化」电商怎么玩：首先要确立对流量的正确认知",
                                    "modifyDate": "2018-02-25",
                                    "description": "介绍1",
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "11",
                    "name": "模块2",
                    "type": "project-0",
                    "tag": "环境",
                    "path": "/项目1/模块2",
                    "modifyDate": "2018-02-25",
                    "description": "介绍1",
                    "children": []
                }
            ];
            pool.getConnection(function(err, connection) {
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                connection.query(projectSQL.insert,[
                    newProject.id,
                    newProject.name,
                    newProject.description,
                    newProject.createTime,
                    newProject.modifyTime,
                    newProject.path,
                    JSON.stringify(jsonArr),
                ], function(err, result) {
                    console.log("添加成功");
                    // 释放连接
                    connection.release();

                });
            });
            // jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
        }catch (err){

        }
    }
    getProjectList(name,order,index,size,callback){
        try {
            pool.getConnection(function(err, connection) {
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                var query=connection.query(`SELECT SQL_CALC_FOUND_ROWS * FROM project_list ORDER BY ${name} ${order} LIMIT ${(index-1)*size},${size};SELECT FOUND_ROWS() as total`, function(err, results,fields) {
                    let list=results[0].map(item =>{
                        let modifyDate=item.modify_time?new Date(item.modify_time).format("yyyy-MM-dd"):"";
                        return {
                           name:item.project_name,
                            description :item.project_description,
                            id:item.project_id,
                            type:"project",
                            tag:"项目",
                            path:item.path,
                            modifyDate:modifyDate,
                            children:JSON.parse(item.children)
                        }
                    });
                    let total=results[1][0].total;
                    // 释放连接
                    connection.release();
                    callback({
                        list:list,
                        total:total
                    });
                });
            });
        }catch (err){
        }
    }
}
module.exports=ProjectService;