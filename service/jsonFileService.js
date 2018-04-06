/*jsonFile json文件写入读取模块*/
var fs = require('fs');
var jsonfile = require('jsonfile');

function jsonFile() {
    var jsonWrite = function (json, filePath) {
        var file = filePath;
        var obj = json;
        console.log(ROOT_PATH);
        console.log("文件路径");
        console.log(filePath);
        fs.writeFileSync(filePath, JSON.stringify(json));
    };
    var jsonRead = function (filePath,callback) {
        try{
            var json=jsonfile.readFileSync(filePath);
            return json;
        }catch(err){
            return "";
        }

    };
    return {
        write: jsonWrite,
        read:jsonRead
    };
};
module.exports = jsonFile;