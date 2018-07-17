/*jsonFile json文件写入读取模块*/
const fs = require('fs');
const jsonfile = require('jsonfile');
class  JsonFileService {
    constructor(){

    }

    jsonWrite(json, filePath){
        let file = filePath;
        let obj = json;
        console.log(ROOT_PATH);
        console.log("文件路径");
        console.log(filePath);
        fs.writeFileSync(filePath, JSON.stringify(json));
    }

    jsonRead(filePath,callback){
        try{
            let json=jsonfile.readFileSync(filePath);
            return json;
        }catch(err){
            return "";
        }
    }
}
module.exports = JsonFileService;