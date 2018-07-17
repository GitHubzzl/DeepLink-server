const express = require('express');
const JsonFileService = new require('../service/jsonFileService');
const ProjectService = require('../service/projectService');
const Page=require('../model/page');
const router = express.Router();
const jsonFileService=new JsonFileService();
const projectService= new ProjectService();
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
router.post('/updateProject', function (req, res) {
    projectService.updateProject(JSON.parse(req.body.info));
    res.json({message:"修改成功"});
});
router.post('/deleteProject', function (req, res) {
    projectService.deleteProject(JSON.parse(req.body.info));
    res.json({message:"删除成功"});
});
function viewData(req, res) {
    var viewData =  jsonFileService.jsonRead(ROOT_PATH+'/public/data/view/viewData.json');
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
    let viewData =  jsonFileService.jsonRead(ROOT_PATH+'/public/data/view/viewData.json');
    let pathStr=decodeURI(req.body.path);
    let pageInfo=JSON.parse(decodeURI(req.body.pageInfo));
    let resultJson={
        data:{}
    };
    let page=new Page('listView');
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
    let result={};
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

        if(result.length==0){
            resultJson.data=page;
            page.setListDescription('');
            page.setList([]);
            page.setTotal(0);
        }else {
            page.setListDescription(result.description);
            page.setList(result.children);
            page.setTotal(result.length);
            resultJson.data=page;
        }
        res.json(resultJson);
    }
}
module.exports = router;
