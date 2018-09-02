/**
 * 批量删除项目sql
 * @param idArr   {array} 项目id数组
 * @return {string}
 */
const mutiDelFun = function (idArr) {
  let str = ``,
    deleteStr = ``;
  if (idArr.length > 0) {
    for (let i = 0; i < idArr.length; i++) {
      if (i !== 0) {
        str += ` OR `;
        deleteStr += `,`
      }
      str += `path_id LIKE "%${idArr[i]}%"`;
      deleteStr += `"${idArr[i]}"`
    }
  }
  return `DELETE FROM module_list WHERE ` + str + `;DELETE FROM project_list WHERE project_id IN(${deleteStr})`
};
/**
 * 修改项目sql
 * @param oldProjectName   {string} 项目旧名称
 * @param projectName  {string} 项目新名称
 * @param projectDescription    {string} 项目描述
 * @param path {string} 项目路径
 * @param projectId {string} 项目id
 * @return {string}
 */
const updateProject = function (...arg) {
  let sql1 = `UPDATE project_list SET project_name = "${arg[1]}" ,project_description= "${arg[2]}" ,path = "${arg[3]}",modify_time = now()  WHERE project_id = "${arg[4]}";`
  let sql2 = `UPDATE module_list SET path=REPLACE(path, "${arg[0]}", "${arg[1]}"),parent_path=REPLACE(parent_path, "${arg[0]}", "${arg[1]}"), parent_name=REPLACE(parent_name,"${arg[0]}", "${arg[1]}") WHERE path_id LIKE CONCAT("%","${arg[4]}","%");`
  return sql1 + sql2;
};
let projectSQL = {
  insert: 'INSERT INTO project_list(project_id,project_name,project_description,create_time,modify_time,path,path_id,children) VALUES(?,?,?,?,?,?,?,?)',
  delete: 'DELETE FROM project_list WHERE project_id IN (?)',
  getUserById: 'SELECT * FROM User WHERE uid = ? ',
  getProjectList: `SELECT SQL_CALC_FOUND_ROWS * FROM project_list ORDER BY ? ? LIMIT ?,?;SELECT FOUND_ROWS() as total`,
  getProjectInfoByPath: `SELECT * FROM project_list  WHERE path=?`,
  getProjectInfoByPathId: `SELECT * FROM project_list  WHERE path_id=?`,
  mutiDelFun,
  updateProject
};
module.exports = projectSQL;
