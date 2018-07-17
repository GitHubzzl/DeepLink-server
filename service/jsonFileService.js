/*jsonFile json文件写入读取模块*/
const fs = require('fs');
const jsonfile = require('jsonfile');
class  JsonFileService {
    constructor(){

    }
    /**
     * 读json
     * @param json json文件
     * @param filePath 文件路径
     */
    static jsonWrite(json, filePath){
        let file = filePath;
        let obj = json;
        console.log(ROOT_PATH);
        console.log("文件路径");
        console.log(filePath);
        fs.writeFileSync(filePath, JSON.stringify(json));
    }
    /**
     * 写json
     * @param filePath 文件路径
     * @param callback 回调函数
     */
    static jsonRead(filePath,callback){
        try{
            let json=jsonfile.readFileSync(filePath);
            return json;
        }catch(err){
            return "";
        }
    }
}
module.exports = JsonFileService;