/*项目服务模块*/
const mysql = require('mysql');
const DateTimeUtil = require('../utils/dateTimeUtil');
const dbConfig = require('../db/DBConfig');
const projectSQL = require('../db/projectSQL');
const JsonFileService = require('./jsonFileService');
const Project = require('../model/project');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
let pool = mysql.createPool(dbConfig.mysql);
const dateTimeUtil = new DateTimeUtil();
const viewDataPath = "/public/data/view/viewData.json";

class ProjectService {
  // 构造
  constructor() {
  }

  /**
   * 新建项目
   * @param projectInfo
   */
  static addProject(projectInfo) {
    try {
      let newProject = new Project(projectInfo);
      let jsonArr = [
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
      pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        connection.query(projectSQL.insert, [
          newProject.id,
          newProject.name,
          newProject.description,
          newProject.createTime,
          newProject.modifyTime,
          newProject.path,
          newProject.pathId,
          JSON.stringify(jsonArr),
        ], function (err, result) {
          console.log("添加成功");
          // 释放连接
          connection.release();

        });
      });
      // jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
    } catch (err) {

    }
  }

  /**
   * 修改项目
   * @param projectInfo
   */
  static updateProject(projectInfo) {
    try {
      let modifyTime = new Date();
      pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        let query = connection.query(projectSQL.update, [
          projectInfo.projectName,
          projectInfo.projectDescription,
          modifyTime.format('yyyy-MM-dd hh:mm:ss'),
          projectInfo.projectId,
        ], function (err, result) {
          console.log(err);
          console.log("修改成功");
          // 释放连接
          connection.release();

        });
      });
      // jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
    } catch (err) {

    }
  }

  /**
   * 删除项目
   * @param projectInfo
   */
  static deleteProject(projectInfo) {
    try {
      pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        let sql = projectSQL.mutiDelFun(projectInfo.projectId)
        connection.query(sql, function (err, result) {
          console.log(err);
          console.log("删除成功");
          // 释放连接
          connection.release();

        });
      });
      // jsonFileService.write(viewData,ROOT_PATH+viewDataPath);
    } catch (err) {

    }
  }

  static getProjectList(name, order, index, size, callback) {
    try {
      pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        connection.query(projectSQL.getProjectList, [name, order, (index - 1) * size, size], function (err, results, fields) {
          let list = results[0].map(item => {
            let modifyDate = item.modify_time ? new Date(item.modify_time).format("yyyy-MM-dd") : "";
            return {
              name: item.project_name,
              description: item.project_description,
              id: item.project_id,
              type: "project",
              tag: "项目",
              path: item.path,
              pathId: item.path_id,
              modifyDate: modifyDate,
              children: JSON.parse(item.children)
            }
          });
          let total = results[1][0].total;
          // 释放连接
          connection.release();
          callback({
            list: list,
            total: total
          });
        });
      });
    } catch (err) {
    }
  }

  static getProjectInfoByPath(path, res) {
    try {
      pool.getConnection(function (err, connection) {
        console.log(err)
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        connection.query(projectSQL.getProjectInfoByPath, [path], function (err, results, fields) {
          let list = results.map(item => {
            let modifyDate = item.modify_time ? new Date(item.modify_time).format("yyyy-MM-dd") : "";
            return {
              name: item.project_name,
              description: item.project_description,
              id: item.project_id,
              type: "project",
              typeId: '0',
              tag: "项目",
              path: item.path,
              pathId: item.path_id,
              modifyDate: modifyDate,
              children: JSON.parse(item.children)
            }
          })[0];
          // 释放连接
          connection.release();
          res.json({message: "success", data: list});
        });
      });
    } catch (err) {
    }
  }

  /**
   * 根据路径id获取项目信息
   * @param projectInfo
   */
  static getProjectInfoByPathId(pathId, res) {
    try {
      pool.getConnection(function (err, connection) {
        console.log(err)
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        connection.query(projectSQL.getProjectInfoByPathId, [pathId], function (err, results, fields) {
          let list = results.map(item => {
            let modifyDate = item.modify_time ? new Date(item.modify_time).format("yyyy-MM-dd") : "";
            return {
              name: item.project_name,
              description: item.project_description,
              id: item.project_id,
              type: "project",
              typeId: '0',
              tag: "项目",
              path: item.path,
              pathId: item.path_id,
              modifyDate: modifyDate,
              children: JSON.parse(item.children)
            }
          })[0];
          // 释放连接
          connection.release();
          res.json({message: "success", data: list});
        });
      });
    } catch (err) {
    }
  }
}

module.exports = ProjectService;
