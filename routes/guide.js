const express = require('express');
const JsonFileService = require('../service/jsonFileService');
const router = express.Router();
const jsonFileService=new JsonFileService();
// const jsonFile=new JsonFile();
router.get('/guideListData', function (req, res) {
    guideListData(req, res)
});
function guideListData(req, res) {
    let docData = jsonFileService.jsonRead(ROOT_PATH+'/public/data/guide/guideListData.json');
    res.json(docData)
}
module.exports = router;
