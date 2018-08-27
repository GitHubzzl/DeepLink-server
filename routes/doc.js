const express = require('express');
const JsonFileService = require('../service/jsonFileService');
const router = express.Router();
// const jsonFile=new JsonFile();
router.get('/getDocData', function (req, res) {
  docData(req, res);
});
router.post('/docSubmit', function (req, res) {
  docSubmit(req, res);
});

function docData(req, res) {
  let query = req.query;
  let docId = query.docId ? query.docId : "";
  let docData = JsonFileService.jsonRead(ROOT_PATH + '/public/data/doc/' + docId + '.json');
  res.json(docData);
}

function docSubmit(req, res) {
  let json = req.body.form;
  let resultError = {
    code: 500,
    data: {},
    message: "服务器错误"
  };
  let result = {
    code: 200,
    data: {},
    message: "返回成功"
  };
  try {
    JsonFileService.jsonWrite(json, ROOT_PATH + '/public/data/doc/2018022001.json');
    result.data = json;
    res.json(result);
  } catch (err) {
    res.json(resultError);
  }
}

module.exports = router;
