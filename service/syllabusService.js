let logger=require('../resources/logConf').getLogger('studioService');//引入log4js
let liveRoomAPIService = require('./liveRoomAPIService');
let Deferred = require("../util/common").Deferred;
/**
 * 课程安排服务类
 * 备注：查询各聊天室的课程安排
 * author Dick.guo
 */
var syllabusService = {

    /**
     * 查询聊天室课程安排
     * 备注：如果groupId是逗号分隔的多个id,则返回多条记录，否则返回一条记录
     * @param groupType
     * @param groupId
     * @param callback
     */
    getSyllabus : function(groupType, groupId, callback){
        let loc_dateNow = new Date();
        let deferred = new Deferred();
	 let path = "/syllabus/getSyllabus";
	 path += "?groupType=" + groupType;
	 path += "&groupId=" + groupId;
	 path += "&today=" + loc_dateNow.getTime();
	 
	 liveRoomAPIService.get(path).then((result) => {
	     if(callback){
		 callback(result);
	     }
	     deferred.resolve(result);
	 }).catch((e) => {
	     logger.error("getSyllabus! >>getSyllabus:", e);
	     if(callback){
		 callback(null);
	     }
	     deferred.reject(e);
	 });
	 return deferred.promise;
    }
};
//导出服务类
module.exports =syllabusService;

