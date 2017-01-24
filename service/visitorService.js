let logger=require('../resources/logConf').getLogger('studioService');//引入log4js
let liveRoomAPIService = require('./liveRoomAPIService');
let Deferred = require("../util/common").Deferred;
/**
 * 课程安排服务类
 * 备注：查询各聊天室的课程安排
 * author Dick.guo
 */
var visitorService = {

    /**
     * 查询聊天室课程安排
     * 备注：如果groupId是逗号分隔的多个id,则返回多条记录，否则返回一条记录
     * @param groupType
     * @param groupId
     * @param callback
     */
    getVistiorByName : function(param){
		let deferred = new Deferred();
		let pathes = ["/visitor/getVistiorByName"];
		pathes.push(`?groupType=${param.groupType}`);
		pathes.push(`&groupId=${param.groupId}`);
		pathes.push(`&nickname=${param.nickname}`);

		liveRoomAPIService.get(pathes.join("")).then((result) => {
			deferred.resolve(result);
		}).catch((e) => {
			logger.error("getVistiorByName! >>getVistiorByName:", e);
			deferred.reject(e);
		});
		return deferred.promise;
		}
	};
//导出服务类
module.exports = visitorService;
