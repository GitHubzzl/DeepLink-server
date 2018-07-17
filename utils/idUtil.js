class IdUtil{
    // 构造
    constructor(){
    }
    static genNonDuplicateID(randomLength){
        return Number(Math.random().toString().substr(3,randomLength) + Date.now()).toString(36)
    }
}
module.exports=IdUtil;
