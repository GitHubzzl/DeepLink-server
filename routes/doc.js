var express = require('express');
var JsonFile = require('../service/jsonFile');
var router = express.Router();
var jsonFile=new JsonFile();
router.get('/getDocData', function (req, res) {
     docData(req, res);
});
router.post('/docSubmit', function (req, res) {
    docSubmit(req, res);
});
function docData(req, res) {
    var query=req.query;
    var docId=query.docId?query.docId:"";
    var docData = jsonFile.read(ROOT_PATH+'/public/data/doc/'+docId+'.json');
    res.json(docData);
}
function docSubmit(req,res) {
   var json=req.body.form;
   var resultError={
       code:500,
       data:{

       },
       message:"服务器错误"
   };
   var result={
       code:200,
       data:{},
       message:"返回成功"
   };
   try{
       jsonFile.write(json,ROOT_PATH+'/public/data/doc/2018022001.json');
       result.data=json;
       res.json(result);
   }catch (err){
       res.json(resultError);
   }
}
module.exports = router;
