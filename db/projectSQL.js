const mutiDelFun = function(idArr){
    let str = ``,
    deleteStr =``
    if(idArr.length>0) {
        for (let i = 0;i<idArr.length;i++){
            if(i !== 0){
                str += ` OR `
                deleteStr += `,`
            }
            str += `path_id LIKE "%${idArr[i]}%"`
            deleteStr += `"${idArr[i]}"`
        }
    }
    return `DELETE FROM module_list WHERE `+ str +`;DELETE FROM project_list WHERE project_id IN(${deleteStr})`
}
let projectSQL = {
    insert:'INSERT INTO project_list(project_id,project_name,project_description,create_time,modify_time,path,path_id,children) VALUES(?,?,?,?,?,?,?,?)',
    update:'UPDATE project_list SET project_name =? ,project_description= ? ,modify_time =? WHERE project_id = ?',
    delete:'DELETE FROM project_list WHERE project_id IN (?)',
    getUserById:'SELECT * FROM User WHERE uid = ? ',
    getProjectList:`SELECT SQL_CALC_FOUND_ROWS * FROM project_list ORDER BY ? ? LIMIT ?,?;SELECT FOUND_ROWS() as total`,
    getProjectInfoByPath:`SELECT * FROM project_list  WHERE path=?`,
    getProjectInfoByPathId:`SELECT * FROM project_list  WHERE path_id=?`,
    mutiDelFun
};
module.exports = projectSQL;
