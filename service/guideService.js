/*项目服务模块*/

const JsonFileService = require('./jsonFileService');
const viewDataPath = "/public/data/view/viewData.json";

class GuideService {
  // 构造
  constructor() {
  }

  /**
   * 获取列表数据
   */
  static guideListData() {
    let docData = JsonFileService.jsonRead(ROOT_PATH + '/public/data/guide/guideListData.json');
    return docData;
  }
}

module.exports = GuideService;
