/**
 * 批量删除模块sql
 * @param idArr   {array} 模块id数组
 * @return {string}
 */
const mutiDelFun = function(idArr){
    let str = ``
    if(idArr.length>0) {
        for (let i = 0;i<idArr.length;i++){
            if(i !== 0){
                str += ` OR `
            }
            str += `path_id LIKE "%${idArr[i]}%"`
        }
    }
    return `DELETE FROM module_list WHERE `+str
}
/**
 * 修改模块sql
 * @param oldModuleName   {string} 模块旧名称
 * @param moduleName  {string} 模块新名称
 * @param moduleDescription    {string} 项目描述
 * @param moduleTypeId {string} 模块类别id
 * @param moduleId {string} 项目id
 * @return {string}
 */
const updateModuleSQL = function (...arg) {
  let sql1 = `UPDATE module_list SET module_name ="${arg[1]}" ,module_description= "${arg[2]}" ,module_type_id= "${arg[3]}",modify_time = now() WHERE module_id = "${arg[4]}";`
  let sql2 = `UPDATE module_list SET path=REPLACE(path, "${arg[0]}", "${arg[1]}"),parent_path=REPLACE(parent_path, "${arg[0]}", "${arg[1]}"), parent_name=REPLACE(parent_name,"${arg[0]}", "${arg[1]}") WHERE path_id LIKE CONCAT("%","${arg[4]}","%");`
  return sql1 + sql2;
};
let moduleSQL = {
    getFolderTypeDic:`SELECT  * FROM  folder_type_dic`,
    getModuleListByParentPathId:`SELECT SQL_CALC_FOUND_ROWS m.*, a.folder_type_name, b.folder_type_name AS parent_type_name FROM module_list AS m LEFT JOIN folder_type_dic a ON a.folder_type_id = m.module_type_id LEFT JOIN folder_type_dic b ON b.folder_type_id = m.parent_type_id WHERE m.parent_path_id =? ORDER BY ? ? LIMIT ?,?;SELECT FOUND_ROWS() AS total`,
    getModuleInfoByPath:`SELECT m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE path=?`,
    getModuleInfoByPathId:`SELECT m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE path_id=?`,
    insert:`INSERT INTO module_list ( module_id, module_name, module_description, module_type_id, module_type,tag, create_time, modify_time, path, path_id, parent_path, parent_path_id, parent_id, parent_name, parent_type_id, children ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    update:'UPDATE module_list SET module_name =? ,module_description= ? ,module_type_id=?,modify_time =? WHERE module_id = ?',
    delete:'DELETE FROM module_list WHERE module_id IN (?)',
    mutiDelFun,
  updateModuleSQL
};
module.exports = moduleSQL;
