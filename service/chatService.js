const liveRoomAPIService = require('./liveRoomAPIService');
const logger = require('../resources/logConf').getLogger("chatPointsService");
const Deferred = require("../util/common").Deferred;

class ChatService{
    constructor() {}
    getRoomOnlineTotalNum(groupId, callback){
        let defer = new Deferred();
        let path = "/chat/getRoomOnlineTotalNum";
        path += "?groupId=" + groupId;
        liveRoomAPIService.get(path).then(function(data){
                defer.resolve(data);
                if(callback){
                    callback(data);
                }
            }, function(err){
                logger.error("getRoomOnlineTotalNum! >>getRoomOnlineTotalNum:", e);
                if(callback){
                    callback(err);
                }
                defer.reject(err);
            });
        return defer.promise;
    }

    getRoomOnlineList(params) {
        let defer = new Deferred();
        let path = "/chat/getRoomOnlineList";
        path += "?groupId=" + params.groupId;
        path += "&groupType=" + params.groupType;
        liveRoomAPIService.get(path).then(function(data) {
            defer.resolve(data);
        }, function(err) {
            logger.error("getRoomOnlineList! >>getRoomOnlineList:", err);
            defer.reject(err);
        });
        return defer.promise;
    }
    
    acceptMsg(data) {
        let defer = new Deferred();
        let path = "/chat/acceptMsg";
        liveRoomAPIService.post(path, data).then(function(data){
                defer.resolve(data);
            }, function(err){
                logger.error("acceptMsg! >>acceptMsg:", err);
                defer.reject(err);
            });
        return defer.promise;
    }
    removeMsg(groupId,msgIds) {
        let defer = new Deferred();
        let path = "/chat/removeMsg";
        liveRoomAPIService.post(path, {groupId: groupId, msgIds: msgIds}).then(function(data){
                defer.resolve(data);
            }, function(err){
                logger.error("removeMsg! >>removeMsg:", err);
                defer.reject(err);
            });
        return defer.promise;
    }
    sendNoticeArticle(groupId, article) {
        let defer = new Deferred();
        let path = "/chat/sendNoticeArticle";
        liveRoomAPIService.post(path, {groupId: groupId, article: article}).then(data => {
                defer.resolve(data);
            }, function(err){
                logger.error("sendNoticeArticle! >>sendNoticeArticle:", err);
                defer.reject(err);
            });
        return defer.promise;
    }
}
module.exports = new ChatService();