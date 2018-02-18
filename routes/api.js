var express = require('express');
var JsonFile = require('../service/jsonFile');
var router = express.Router();
var jsonFile=new JsonFile();
router.get('/', function (req, res) {
    var query = req.query;
    switch (query.method) {
        case 'docData':
            docData(req, res);
            break;
        case 'guideListData':
            guideListData(req, res);
            break;
        case 'docSubmit':
            docSubmit(req, res);
            break;
    }
});
router.post('/',function (req,res) {
    var query = req.query;
    switch (query.method) {
        case 'docSubmit':
            docSubmit(req, res);
            break;
    }
});
function docData(req, res) {
    var query=req.query;
    var docId=query.docId?query.docId:"";
    var docData = jsonFile.read(ROOT_PATH+'/public/data/doc/'+docId+'.json');
    res.json(docData);
}

function guideListData(req, res) {
    var docData = jsonFile.read(ROOT_PATH+'/public/data/guide/guideListData.json');
    res.json(docData)
}
function docSubmit(req,res) {
   var json=req.body.form;
   jsonFile.write(json,ROOT_PATH+'/public/data/doc/1.json');
   console.log(json);
    res.json(json);
}
module.exports = router;
