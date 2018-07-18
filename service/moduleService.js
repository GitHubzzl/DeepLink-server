/*项目服务模块*/
const mysql = require('mysql');
const DateTimeUtil =require('../utils/dateTimeUtil');
const dbConfig = require('../db/DBConfig');
const moduleSQL = require('../db/moduleSQL');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
let pool = mysql.createPool( dbConfig.mysql );
const dateTimeUtil=new  DateTimeUtil();
const viewDataPath="/public/data/view/viewData.json";
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
                connection.query(`SELECT SQL_CALC_FOUND_ROWS * FROM module_list WHERE parent_path='${parentPath}' ORDER BY ${name} ${order} LIMIT ${(index-1)*size},${size};SELECT FOUND_ROWS() as total`, function(err, results,fields) {
                    let list=results[0].map(item =>{
                        let modifyDate=item.modify_time?new Date(item.modify_time).format("yyyy-MM-dd"):"";
                        return {
                            name:item.module_name,
                            description :item.module_description,
                            id:item.module_id,
                            type:"module",
                            tag:item.tag?item.tag:'',
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
}
module.exports=ModuleService;