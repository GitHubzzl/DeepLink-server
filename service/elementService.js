/*项目服务模块*/
const mysql = require('mysql');
const DateTimeUtil = require('../utils/dateTimeUtil');
const dbConfig = require('../db/DBConfig');
const  elementSQL= require('../db/elementSQL');
// 使用DBConfig.js的配置信息创建一个MySQL连接池
let pool = mysql.createPool(dbConfig.mysql);
const dateTimeUtil = new DateTimeUtil();
class ElementService {
  // 构造
  constructor() {
  }
  /**
   * 获取元素类别列表
   */
  static getElementTypeDic(res) {
    try {
      pool.getConnection(function (err, connection) {
        // 获取前台页面传过来的参数
        // 建立连接 增加一个用户信息
        connection.query(elementSQL.getElementTypeDic, function (err, results, fields) {
          let list = results.map(item => {
            return {
              label: item.element_type_name,
              value: item.element_type_id
            }
          });
          // 释放连接
          connection.release();
          res.json({message: "success", data: list});
        });
      });
    } catch (err) {
    }

  }
}

module.exports = ElementService;
