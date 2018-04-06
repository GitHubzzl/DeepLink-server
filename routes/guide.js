var express = require('express');
var JsonFile = require('../service/jsonFileService');
var router = express.Router();
var jsonFile=new JsonFile();
router.get('/guideListData', function (req, res) {
    guideListData(req, res)
});
function guideListData(req, res) {
    var docData = jsonFile.read(ROOT_PATH+'/public/data/guide/guideListData.json');
    res.json(docData)
}
module.exports = router;
