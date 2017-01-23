"use strict";
let Deferred = require("../util/common").Deferred;
let request = require('request');
let config = require('../resources/config');// 引入config
let logger = require('../resources/logConf').getLogger("liveRoomAPIService");

const baseUrl = config.pmApiUrl;

let addCompanyIdToPath = path => {
    let companIdParam = "companyId=" + config.companyId;
    let params = path.split("?")[1];
    path += params ? "&" + companIdParam : "?" + companIdParam;
    return path;
};

let addCompanyIdToBody = body => {
    body.companyId = config.companyId;
    return body;
}

let doRequestSuccess = data => {
    let dataObj = {};
    try {
	dataObj = JSON.parse(data);
    }catch (e) {
	dataObj = data;
    }
    return (defer, callback) => {
	if(typeof dataObj == "object"){
	    if(dataObj["errcode"] && dataObj["errcode"] != 0){
		defer.reject(dataObj);
		if(callback){
		    callback(dataObj);
		    return;
		}
	    }
	}
	if(callback){
	    callback(dataObj.data || dataObj);
	}
	defer.resolve(dataObj.data || dataObj);
    }
};

let pmAPI = {
    get : (path, callback) => {
	path = addCompanyIdToPath(path);
	logger.info("Getting data from liveRoom API with path: " + path);
	let defer = new Deferred();
	request(baseUrl + path, (err, res, data) => {
	    if (err) {
		logger.error("Get "+ path.split("?")[0] +">>>error:" + err);
		if(callback){
		    callback(false);
		}
		defer.reject(err);
	    } else {
		doRequestSuccess(data)(defer, callback);
	    }
	});
	return defer.promise;
    },
    post : (path, data, callback) => {
	data = addCompanyIdToBody(data);
	logger.info("Posting data to liveRoom API with path: " + path);
	let defer = new Deferred();
	request.post({
	    url : baseUrl + path,
	    body: data,
	    headers: {"Connection": "close"},
	    json:true
	}, (err, res, data) => {
	    if (err) {
		logger.error("Post "+ path +">>>error:" + err);
		if(callback){
		    callback(false);
		}
		defer.reject(err);
	    } else {
		doRequestSuccess(data)(defer, callback);
	    }
	});
	return defer.promise;
    }
};

module.exports = pmAPI;
