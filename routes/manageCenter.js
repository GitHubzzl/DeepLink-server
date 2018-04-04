var express = require('express');
var JsonFile = require('../service/jsonFile');
var Page=require('../model/page');
var router = express.Router();
var jsonFile=new JsonFile();
router.get('/getViewData', function (req, res) {
            viewData(req,res);
});
router.post('/getViewDataByPath', function (req, res) {
    getViewDataByPath(req,res);
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
        console.log(listItem);
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
    var result={};
    if(pathStr==""){
        result=viewData;
        page.setList(result);
    }else {
        result=factorical(pathStr,viewData);
        page.setListDescription(result.description);
        page.setList(result.children);
    }
    page.setTotal(result.length);

    if(result.length==0){
        resultJson.data=page;
    }else {
        resultJson.data=page;
    }
    res.json(resultJson);
}
module.exports = router;
