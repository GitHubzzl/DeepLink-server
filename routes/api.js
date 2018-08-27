const express = require('express');
const JsonFileService = require('../service/jsonFileService');
const ModuleService = require('../service/moduleService');
const router = express.Router();
router.get('/', function (req, res) {
  let query = req.query;
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
    case 'viewData':
      viewData(req, res);
      break;
  }
});
router.post('/', function (req, res) {
  let query = req.query;
  switch (query.method) {
    case 'docSubmit':
      docSubmit(req, res);
      break;
  }
});
router.get('/getModuleTypeDic', function (req, res) {
  ModuleService.getModuleTypeDic(res);
});

function docData(req, res) {
  let query = req.query;
  let docId = query.docId ? query.docId : "";
  let docData = JsonFileService.jsonRead(ROOT_PATH + '/public/data/doc/' + docId + '.json');
  res.json(docData);
}

function guideListData(req, res) {
  let docData = JsonFileService.jsonRead(ROOT_PATH + '/public/data/guide/guideListData.json');
  res.json(docData)
}

function viewData(req, res) {
  let viewData = JsonFileService.jsonRead(ROOT_PATH + '/public/data/view/viewData.json');
  res.json(viewData)
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
