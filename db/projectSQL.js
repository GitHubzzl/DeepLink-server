var projectSQL = {
    insert:'INSERT INTO project_list(project_id,project_name,project_description,create_time,modify_time,path,children) VALUES(?,?,?,?,?,?,?)',
    getUserById:'SELECT * FROM User WHERE uid = ? ',
};
module.exports = projectSQL;
