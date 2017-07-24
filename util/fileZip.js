var fs = require('fs');
var cleanCSS = require('clean-css');
var ujs = require("uglify-js");
/**
 * 文件压缩
 * create by alan.wu
 * 2015-5-8
 */
var fileZip = {
    /**
     * 压缩css
     * @param flieInArr
     * @param fileOut
     */
    zipCss: function(flieInArr, fileOut) {
        var styles = "",
            origCode = '',
            obj = this.formatCurrPath(flieInArr);
        flieInArr = obj.filePath;
        for (var i = 0; i < flieInArr.length; i++) {
            origCode = fs.readFileSync(flieInArr[i], 'utf8');
            styles += new cleanCSS().minify(origCode).styles;
        }
        var fileOutArr = [];
        fileOutArr.push(fileOut);
        try {
            fs.writeFileSync(this.formatCurrPath(fileOutArr).filePath[0], styles, 'utf8');
        } catch (e) {
            console.log("zipCss【" + fileOut + "】 fail,no file!");
            return;
        }
        console.log("zipCss【" + obj.fileName.join(",") + "】 success!");
    },
    /**
     * 压缩js
     * @param flieInArr
     * @param fileOut
     */
    zipJs: function(flieInArr, fileOut, isMarge) {
        var obj = this.formatCurrPath(flieInArr);
        flieInArr = obj.filePath;
        var fileOutArr = [];
        fileOutArr.push(fileOut);
        try {
            if (isMarge) {
                var pfList = [];
                for (var i in flieInArr) {
                    pfList.push("/* " + obj.fileName[i] + " */\n" + fs.readFileSync(flieInArr[i], 'utf8'));
                }
                fs.writeFileSync(this.formatCurrPath(fileOutArr).filePath[0], pfList.join("\n"), 'utf8');
            } else {
                fs.writeFileSync(this.formatCurrPath(fileOutArr).filePath[0], ujs.minify(flieInArr).code, 'utf8');
            }
        } catch (e) {
            console.log("zipJs【" + fileOut + "】 fail,no file!");
            return;
        }
        console.log("zipJs【" + obj.fileName.join(",") + "】 success!");
    },
    /**
     * 格式路径
     * @param filePath
     */
    formatCurrPath: function(filePathArr) {
        var newPathArr = [],
            fileName = [],
            sysPath = process.cwd().replace("util", ""),
            currPath = '';
        for (var i in filePathArr) {
            currPath = filePathArr[i];
            fileName.push(currPath.substring(currPath.lastIndexOf("\\") + 1, currPath.length));
            newPathArr.push((sysPath + filePathArr[i]).replace(/\\/g, "\\\\"));
        }
        return { filePath: newPathArr, fileName: fileName };
    }
};

//直播间前端js/css压缩
var fileList = [
    
    // ADMIN
    { "out": "\\template\\admin\\static\\css\\index.min.css", "in": ["\\template\\admin\\static\\css\\index.css"] },
    { "out": "\\template\\admin\\static\\css\\room.min.css", "in": ["\\template\\admin\\static\\css\\room.css"] },
    { "out": "\\template\\admin\\static\\js\\index.min.js", "marge": false, "in": ["\\template\\admin\\static\\js\\index.js"] },
    { "out": "\\template\\admin\\static\\js\\room.min.js", "marge": false, "in": ["\\template\\admin\\static\\js\\room.js", "\\template\\admin\\static\\js\\notice.js", "\\template\\base\\util\\gwanalysis.js", "\\template\\base\\util\\chatAnalyze.js"] },

    // COMMON
    { "out": "\\template\\base\\util\\common.min.js", "marge": false, "in": ["\\template\\base\\util\\common.js"] }
];
//执行压缩
for (var i = 0, lenI = fileList.length; i < lenI; i++) {
    var fileTmp = fileList[i];
    if (fileTmp.hasOwnProperty("marge")) {
        fileZip.zipJs(fileTmp.in, fileTmp.out, fileTmp.marge);
    } else {
        fileZip.zipCss(fileTmp.in, fileTmp.out);
    }
}
//导出类
module.exports = fileZip;