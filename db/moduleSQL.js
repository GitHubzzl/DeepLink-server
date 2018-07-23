let moduleSQL = {
    getModuleTypeDic:`SELECT  * FROM  module_type_dic`,
    getModuleListByParentPath:`SELECT SQL_CALC_FOUND_ROWS m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE m.parent_path =?  ORDER BY ? ? LIMIT ?,?;SELECT FOUND_ROWS() AS total`,
    getModuleInfoByPath:`SELECT m.*, a.module_type_name,b.module_type_name AS parent_type_name FROM module_list AS m LEFT JOIN module_type_dic a ON a.module_type_id = m.module_type_id LEFT JOIN module_type_dic b ON b.module_type_id = m.parent_type_id WHERE path=?`
};
module.exports = moduleSQL;
