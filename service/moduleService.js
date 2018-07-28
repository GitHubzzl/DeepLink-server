/*项目服务模块*/
const mysql = require('mysql');
const DateTimeUtil =require('../utils/dateTimeUtil');
const dbConfig = require('../db/DBConfig');
const moduleSQL = require('../db/moduleSQL');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
let pool = mysql.createPool( dbConfig.mysql );
const dateTimeUtil=new  DateTimeUtil();
const viewDataPath="/public/data/view/viewData.json";
const Module=require('../model/module');
class ModuleService{
    // 构造
    constructor(){
    }
    /**
     * 根据父节点路径查找模块
     * @param parentPath 父节点路径
     * @param name 排序字段名称
     * @param order 排序顺训
     * @param index 当前页码
     * @param size 每页数据数
     * @param callback 回调函数
     */
    static getModuleListByParentPath(parentPath,name,order,index,size,callback){
        try {
            pool.getConnection(function(err, connection) {
                console.log(err)
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                    connection.query(moduleSQL.getModuleListByParentPath,[parentPath,name,order,(index-1)*size,size], function(err, results,fields) {
                    let list=results[0].map(item =>{
                        let modifyDate=item.modify_time?new Date(item.modify_time).format("yyyy-MM-dd"):"";
                        return {
                            name:item.module_name,
                            description :item.module_description,
                            id:item.module_id,
                            type:item.module_type,
                            typeId:item.module_type_id,
                            tag:item.tag?item.tag:'',
                            path:item.path,
                            modifyDate:modifyDate,
                            children:item.children
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
    /**
     * 新建模块
     * @param moduleInfo
     */
    static addModule(moduleInfo,callback){
        try {
            let newModule= new Module(moduleInfo);
            console.log("ok");
            pool.getConnection(function(err, connection) {
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                connection.query(moduleSQL.insert,[
                    newModule.id,
                    newModule.name,
                    newModule.description,
                    newModule.typeId,
                    newModule.tag,
                    newModule.createTime,
                    newModule.modifyTime,
                    newModule.path,
                    newModule.parentPath,
                    newModule.parentId,
                    newModule.parentName,
                    newModule.parentTypeId,
                    '',
                ], (err, result) =>{
                    console.log("添加成功");
                    // 释放连接
                    connection.release();
                    callback()
                });
            });
        }catch (err){

        }
    }
    /**
     * 修改模块
     * @param moduleInfo
     */
    static updateModule(moduleInfo,callback){
        try {
            let modifyTime=new Date();
            pool.getConnection(function(err, connection) {
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                let query=connection.query(moduleSQL.update,[
                    moduleInfo.moduleName,
                    moduleInfo.moduleDescription,
                    moduleInfo.moduleTypeId,
                    modifyTime.format('yyyy-MM-dd hh:mm:ss'),
                    moduleInfo.moduleId,
                ], function(err, result) {
                    console.log(err);
                    console.log("修改成功");
                    // 释放连接
                    connection.release();
                    callback()
                });
            });
            // jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
        }catch (err){

        }
    }
    /**
     * 删除模块
     * @param moduleInfo
     */
    static deleteModule(moduleInfo,callback){
        try {
            pool.getConnection(function(err, connection) {
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                connection.query(moduleSQL.delete,[
                    moduleInfo.moduleId
                ], function(err, result) {
                    console.log(err);
                    console.log("删除成功");
                    // 释放连接
                    connection.release();
                    callback()
                });
            });
            // jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
        }catch (err){

        }
    }
    /**
     * 获取模块类别列表
     */
    static getModuleTypeDic(res){
        try {
            pool.getConnection(function(err, connection) {
                console.log(err)
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                connection.query(moduleSQL.getModuleTypeDic, function(err, results,fields) {
                    let list=results.map(item =>{
                        return {
                           label:item.module_type_name,
                           value:item.module_type_id
                        }
                    });
                    // 释放连接
                    connection.release();
                    res.json({message:"success",data:list});
                });
            });
        }catch (err){
        }

    }
    /**
     * 根据路径获取模块详情
     */
    static getModuleInfoByPath(path,res){
        try {
            pool.getConnection(function(err, connection) {
                console.log(err)
                // 获取前台页面传过来的参数
                // 建立连接 增加一个用户信息
                connection.query(moduleSQL.getModuleInfoByPath,[path], function(err, results,fields) {
                    let list=results.map(item =>{
                        let modifyDate=item.modify_time?new Date(item.modify_time).format("yyyy-MM-dd"):"";
                        return {
                            name:item.module_name,
                            description :item.module_description,
                            id:item.module_id,
                            type:item.module_type_name,
                            typeId:item.module_type_id,
                            tag:"模块",
                            path:item.path,
                            parentId:item.parent_id,
                            parentName:item.parent_name,
                            parentType:item.parent_type_name,
                            parentTypeId:item.parent_type_id,
                            modifyDate:modifyDate,
                            children:JSON.parse(item.children)
                        }
                    })[0];
                    // 释放连接
                    connection.release();
                    res.json({message:"success",data:list});
                });
            });
        }catch (err){
        }
    }
}
module.exports=ModuleService;