const express = require('express');
const JsonFileService = new require('../service/jsonFileService');
const ProjectService = require('../service/projectService');
const ModuleService = require('../service/moduleService');
const Page=require('../model/page');
const router = express.Router();
router.post('/getViewDataByPath', function (req, res) {
    getViewDataByPath(req,res);
});
router.post('/addProject', function (req, res) {
    ProjectService.addProject(JSON.parse(req.body.info));
    res.json({message:"添加成功"});
});
router.post('/updateProject', function (req, res) {
    ProjectService.updateProject(JSON.parse(req.body.info));
    res.json({message:"修改成功"});
});
router.post('/deleteProject', function (req, res) {
    ProjectService.deleteProject(JSON.parse(req.body.info));
    res.json({message:"删除成功"});
});

function factorical(pathStr,list){
    let listItem=list.filter(item => pathStr.indexOf(item.path)>-1);
    if(listItem.length==0){
        return [];
    }
    if(listItem[0].path!=pathStr){
        return factorical(pathStr,listItem[0].children)
    }else {
        return listItem[0];
    }
}
function getViewDataByPath(req, res) {
    let viewData =  JsonFileService.jsonRead(ROOT_PATH+'/public/data/view/viewData.json'), pathStr=decodeURI(req.body.path),
        pageInfo=JSON.parse(decodeURI(req.body.pageInfo)),
        resultJson={
            data:{}
        },
        page=new Page('listView');
    page.setCurrentPage(pageInfo.currentPage);
    page.setPageSize(pageInfo.pageSize);
    let order=(pageInfo.order=="ascending")?"ASC":"DESC";
    let name="",
        index=pageInfo.currentPage,
        size=pageInfo.pageSize;
    switch (pageInfo.sortBy){
        case "modifyDate" :name="modify_time";break;
    }
    let result={};
    if(pathStr==""){
        //获取项目列表
        ProjectService.getProjectList(name,order,index,size,(result)=>{
            page.setList(result.list);
            page.setTotal(result.total);
            resultJson.data=page;
            res.json(resultJson);
        });
    }else {
        //获取项目详情列表
        //获取项目列表
        ModuleService.getModuleListByParentPath(pathStr,name,order,index,size,(result)=>{
            page.setList(result.list);
            page.setTotal(result.total);
            resultJson.data=page;
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
