var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (req.query && req.query.callback) {
        //console.log(params.query.callback);
        res.jsonp({status: 200, message: "这是一个JSONP接口", data:[]});
    } else {
        res.json({status: 200, message: "这是一个JSON接口", data:[]});
    }
});
router.get("/docData", function (req,res) {
    var docData = require('../public/data/doc/2018011901.json')
    res.json(docData)
})
module.exports = router;
