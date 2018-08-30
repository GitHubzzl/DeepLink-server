CREATE TABLE `element_list` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT COMMENT '主键id',
`element_id` varchar(50) NOT NULL COMMENT '元素id',
`element_name` varchar(100) NOT NULL COMMENT '元素名称',
`element_description` varchar(500) DEFAULT NULL COMMENT '元素描述',
`element_type_id` int(50) NOT NULL COMMENT '元素类型id',
`tag` varchar(500) DEFAULT NULL COMMENT '标签',
`create_time` datetime NOT NULL COMMENT '创建时间',
`modify_time` datetime NOT NULL COMMENT '修改时间',
`path` varchar(1000) NOT NULL COMMENT '路径',
`path_id` varchar(1000) NOT NULL COMMENT '路径id',
`parent_path` varchar(1000) NOT NULL COMMENT '父节点路径',
`parent_path_id` varchar(1000) NOT NULL COMMENT '父节点路径id',
`parent_id` varchar(50) NOT NULL COMMENT '父节点id',
`parent_name` varchar(100) NOT NULL COMMENT '父节点名称',
`parent_type_id` int(50) NOT NULL COMMENT '父节点类型id',
`children` varchar(10000) DEFAULT NULL COMMENT '子节点',
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

