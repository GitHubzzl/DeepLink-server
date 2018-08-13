--模块类型列表初始化
CREATE TABLE `module_type_dic` (
  `id` bigint(50) NOT NULL COMMENT '主键id',
  `module_type_id` int(50) NOT NULL COMMENT '模块类型id',
  `module_type_name` varchar(100) NOT NULL COMMENT '模块类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;