const fs = require('fs');
const path = require('path');
/**
 * 版本号
 * create by alan.wu
 * 2016-9-7
 */
let versionUtil = {
    /**
     * 提取版本
     */
   getVersion(){
        let vNo='';
        let versionFilePath = path.join(__dirname, '../template', 'version.json');
        try{
            vNo=fs.readFileSync(versionFilePath, 'utf8');
        }catch(e){
            console.log(`read the version file fail from path ${versionFilePath},please check it!`);
        }
        return JSON.parse(vNo).version;
   }
};
//导出类
module.exports = versionUtil;