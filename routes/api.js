var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var query = req.query;
    switch (query.method) {
        case 'docData':
            docData(req, res);
            break;
        case 'guideListData':
            guideListData(req, res);
            break;
    }
});
function docData(req, res) {
    var docData = require('../public/data/doc/2018011901.json')
    res.json(docData)
}

function guideListData(req, res) {
    var docData = require('../public/data/guilde/guideListData.json')
    res.json(docData)
}

module.exports = router;
