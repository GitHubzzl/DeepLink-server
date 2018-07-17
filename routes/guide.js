const express = require('express');
const JsonFileService = require('../service/jsonFileService');
const GuideService = require('../service/guideService');
const router = express.Router();
// const jsonFile=new JsonFile();
router.get('/guideListData', function (req, res) {
    guideListData(req, res)
});
function guideListData(req, res) {
    let docData = GuideService.guideListData();
    res.json(docData)
}
module.exports = router;
