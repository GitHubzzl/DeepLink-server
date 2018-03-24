var express = require('express');
var JsonFile = require('../service/jsonFile');
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
        return listItem[0];
    }
}
function getViewDataByPath(req, res) {
    var viewData = jsonFile.read(ROOT_PATH+'/public/data/view/viewData.json');
    var pathStr=decodeURI(req.body.path);
    var resultJson={
        data:{}
    };
    var result={};
    if(pathStr==""){
        result=viewData;
    }else {
        result=factorical(pathStr,viewData);
    }
    if(result.length==0){
        resultJson.data=[];
    }else {
        resultJson.data=result;
    }
    res.json(resultJson);
}
module.exports = router;
