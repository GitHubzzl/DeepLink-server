let moduleSQL = {
    getModuleTypeDic:`SELECT  * FROM  module_type_dic`,
    getModuleListByParentPathId:`SELECT SQL_CALC_FOUND_ROWS m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE m.parent_path_id =?  ORDER BY ? ? LIMIT ?,?;SELECT FOUND_ROWS() AS total`,
    getModuleInfoByPath:`SELECT m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE path=?`,
    getModuleInfoByPathId:`SELECT m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE path_id=?`,
    insert:`INSERT INTO module_list ( module_id, module_name, module_description, module_type_id, tag, create_time, modify_time, path, path_id, parent_path, parent_path_id, parent_id, parent_name, parent_type_id, children ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    update:'UPDATE module_list SET module_name =? ,module_description= ? ,module_type_id=?,modify_time =? WHERE module_id = ?',
    delete:'DELETE FROM module_list WHERE module_id IN (?)',
};
module.exports = moduleSQL;
