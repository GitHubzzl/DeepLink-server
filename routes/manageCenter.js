var express = require('express');
var JsonFile = require('../service/jsonFile');
var router = express.Router();
var jsonFile=new JsonFile();
router.get('/getViewData', function (req, res) {
            viewData(req,res);
});
function viewData(req, res) {
    var viewData = jsonFile.read(ROOT_PATH+'/public/data/view/viewData.json');
    res.json(viewData)
}
module.exports = router;
