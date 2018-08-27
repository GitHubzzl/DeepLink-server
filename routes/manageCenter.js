const express = require('express');
const JsonFileService = new require('../service/jsonFileService');
const ProjectService = require('../service/projectService');
const ModuleService = require('../service/moduleService');
const Page = require('../model/page');
const router = express.Router();
router.post('/getViewDataByPathId', function (req, res) {
  getViewDataByPathId(req, res);
});
//添加项目
router.post('/addProject', function (req, res) {
  ProjectService.addProject(JSON.parse(req.body.info));
  res.json({message: "添加成功"});
});
//修改项目
router.post('/updateProject', function (req, res) {
  ProjectService.updateProject(JSON.parse(req.body.info));
  res.json({message: "修改成功"});
});
//删除项目
router.post('/deleteProject', function (req, res) {
  ProjectService.deleteProject(JSON.parse(req.body.info));
  res.json({message: "删除成功"});
});
//添加模块
router.post('/addModule', function (req, res) {
  ModuleService.addModule(JSON.parse(req.body.info), () => {
    res.json({message: "添加成功"});
  });
});
//修改模块
router.post('/updateModule', function (req, res) {
  ModuleService.updateModule(JSON.parse(req.body.info), () => {
    res.json({message: "修改成功"});
  });
});
//删除模块
router.post('/deleteModule', function (req, res) {
  ModuleService.deleteModule(JSON.parse(req.body.info), () => {
    res.json({message: "修改成功"});
  });
});
//根据路径获取模块信息
router.post('/getInfoByPath', function (req, res) {
  let path = req.body.path ? req.body.path : "";
  let length = path.split('/').length;
  if (length == 2) {
    ProjectService.getProjectInfoByPath(req.body.path, res);
  } else {
    ModuleService.getModuleInfoByPath(req.body.path, res);
  }
});
//根据路径Id获取模块信息
router.post('/getInfoByPathId', function (req, res) {
  let path = req.body.pathId || "";
  let length = path.split('/').length;
  if (length == 2) {
    ProjectService.getProjectInfoByPathId(req.body.pathId, res);
  } else {
    ModuleService.getModuleInfoByPath(req.body.path, res);
  }
});

function factorical(pathStr, list) {
  let listItem = list.filter(item => pathStr.indexOf(item.path) > -1);
  if (listItem.length == 0) {
    return [];
  }
  if (listItem[0].path != pathStr) {
    return factorical(pathStr, listItem[0].children)
  } else {
    return listItem[0];
  }
}

function getViewDataByPathId(req, res) {
  let pathId = req.body.pathId,
    pageInfo = JSON.parse(decodeURI(req.body.pageInfo)),
    resultJson = {
      data: {}
    },
    page = new Page('listView');
  page.setCurrentPage(pageInfo.currentPage);
  page.setPageSize(pageInfo.pageSize);
  let order = (pageInfo.order == "ascending") ? "ASC" : "DESC";
  let name = "",
    index = pageInfo.currentPage,
    size = pageInfo.pageSize;
  switch (pageInfo.sortBy) {
    case "modifyDate" :
      name = "modify_time";
      break;
  }
  let result = {};
  if (pathId == "") {
    //获取项目列表
    ProjectService.getProjectList(name, order, index, size, (result) => {
      page.setList(result.list);
      page.setTotal(result.total);
      resultJson.data = page;
      res.json(resultJson);
    });
  } else {
    //获取项目详情列表
    //获取项目列表
    ModuleService.getModuleListByParentPathId(pathId, name, order, index, size, (result) => {
      page.setList(result.list);
      page.setTotal(result.total);
      resultJson.data = page;
      res.json(resultJson);
    });
    // result=factorical(pathStr,viewData);
    // if(result.length==0){
    //     page.setListDescription('');
    //     page.setList([]);
    // }else {
    //     page.setListDescription(result.description);
    //     page.setList(result.children);
    // }
    // page.setTotal(result.length);
    // resultJson.data=page;
    // res.json(resultJson);
  }
}

module.exports = router;
