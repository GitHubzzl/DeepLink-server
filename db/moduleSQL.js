let moduleSQL = {
    getModuleTypeDic:`SELECT  * FROM  module_type_dic`,
    getModuleListByParentPath:`SELECT SQL_CALC_FOUND_ROWS m.*,mt.module_type_name FROM module_list as m,module_type_dic as mt WHERE m.module_type_id=mt.module_type_id AND m.parent_path=?  ORDER BY ? ? LIMIT ?,?;SELECT FOUND_ROWS() as total`
};
module.exports = moduleSQL;
