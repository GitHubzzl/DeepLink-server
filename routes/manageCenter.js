var express = require('express');
var JsonFileService = require('../service/jsonFileService');
var ProjectService = require('../service/projectService');
var Page=require('../model/page');
var router = express.Router();
var jsonFile=new JsonFileService();
var projectService= new ProjectService();
router.get('/getViewData', function (req, res) {
            viewData(req,res);
});
router.post('/getViewDataByPath', function (req, res) {
    getViewDataByPath(req,res);
});
router.post('/addProject', function (req, res) {
    projectService.addProject(JSON.parse(req.body.info));
    res.json({message:"添加成功"});
});
function viewData(req, res) {
    var viewData = jsonFile.read(ROOT_PATH+'/public/data/view/viewData.json');
    res.json(viewData)
}
function factorical(pathStr,list){
    var listItem=list.filter(item => pathStr.indexOf(item.path)>-1);
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
    var viewData = jsonFile.read(ROOT_PATH+'/public/data/view/viewData.json');
    var pathStr=decodeURI(req.body.path);
    var pageInfo=JSON.parse(decodeURI(req.body.pageInfo));
    var resultJson={
        data:{}
    };
    var page=new Page('listView');
    page.setCurrentPage(pageInfo.currentPage);
    page.setPageSize(pageInfo.pageSize);
    let order=(pageInfo.order=="ascending")?"ASC":"DESC";
    let name="";
    let index=0,size=10;
    index=pageInfo.currentPage;
    size=pageInfo.pageSize;
    switch (pageInfo.sortBy){
        case "modifyDate" :name="modify_time";break;
    }
    var result={};
    if(pathStr==""){
        result=projectService.getProjectList(name,order,index,size,(result)=>{
            page.setList(result.list);
            page.setTotal(result.total);
            if(result.list.length==0){
                resultJson.data=page;
            }else {
                resultJson.data=page;
            }
            res.json(resultJson);
        });
    }else {
        result=factorical(pathStr,viewData);
        page.setListDescription(result.description);
        page.setList(result.children);
        page.setTotal(result.length);
        if(result.length==0){
            resultJson.data=page;
        }else {
            resultJson.data=page;
        }
        res.json(resultJson);
    }
}
module.exports = router;
