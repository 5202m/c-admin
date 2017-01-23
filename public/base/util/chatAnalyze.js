﻿/**
 *  数据统计通用方法
 * create by alan.wu
 * 2015-10-21
 */
var _gaq = _gaq || [];

/**百度统计*/
var _hmt = _hmt || [];
function UUID() {
    this.id = this.createUUID();
}
UUID.prototype.valueOf = function() {
    return this.id;
};
UUID.prototype.toString = function() {
    return this.id;
};
UUID.prototype.createUUID = function(prefix) {
    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
    var dc = new Date();
    var t = dc.getTime() - dg.getTime();
    var tl = UUID.getIntegerBits(t, 0, 31);
    var tm = UUID.getIntegerBits(t, 32, 47);
    var thv = UUID.getIntegerBits(t, 48, 59) + '1';
    var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
    var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7)
        + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
        + UUID.getIntegerBits(UUID.rand(8191), 0, 7)
        + UUID.getIntegerBits(UUID.rand(8191), 8, 15)
        + UUID.getIntegerBits(UUID.rand(8191), 0, 15);
    return (prefix||'')+tl + tm + thv + csar + csl + n;
};
UUID.getIntegerBits = function(val, start, end) {
    var base16 = UUID.returnBase(val, 16);
    var quadArray = new Array();
    var quadString = '';
    var i = 0;
    for (i = 0; i < base16.length; i++) {
        quadArray.push(base16.substring(i, i + 1));
    }
    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
        if (!quadArray[i] || quadArray[i] == '')
            quadString += '0';
        else
            quadString += quadArray[i];
    }
    return quadString;
};
UUID.returnBase = function(number, base) {
    return (number).toString(base).toUpperCase();
};
UUID.rand = function(max) {
    return Math.floor(Math.random() * (max + 1));
};
// 初始化
var chatAnalyze = {
    localHref:window.location.href,
    utmStore:{//utm 数据统计全局数据
        userIp:'',
        storeKey:'GWAFLGPHONECOOIKETRACK',//userId key
        userId:'',//用户id
        roomId:'',//房间编号
        userTel:'',
        userType:'',
        userName:'',
        roomName:'',
        userSource:'web',
        useEquipment:'',
        tradingAccount:'',
        tradingPlatform:'',
        platformType:0,
        businessPlatform:'',
        operateEntrance:'',
        operationType:2,
        touristId:'',
        sessionId:'',
        nickName:'',
        email:'',
        videoId:'',
        videoName:'',
        courseId:'',
        courseName:'',
        teacherId:'',
        teacherName:''
    },
    /**
     * 是否本地访问
     * @returns {boolean}
     */
    isLocalHref:function(){
       return /^https?:\/\/(\d{1,3}\.){3}\d{1,3}.+/.test(chatAnalyze.localHref);
    },
    /**
     * 初始化
     */
    init:function(){
        //引入GA分析
        if(!this.isLocalHref()){
            var type = "";
            if(chatAnalyze.localHref.indexOf("/studio")!=-1){
                type = "studio";
            }else if(chatAnalyze.localHref.indexOf("/fxstudio")!=-1){
                type = "fxstudio"
            }else if(chatAnalyze.localHref.indexOf("/hxstudio")!=-1){
                type = "hxstudio"
            }
            if(type!="") {
                this.initGA(type);
                this.setGA();
                this.setBaidu();
                //window.setTimeout('chatAnalyze.sendUTM()',1000*10);
            }
        }
    },
    //初始化GA
    initGA : function(type){
        if(type == "studio"){
            _gaq.push(['_setAccount', 'UA-31478987-1']);
            _gaq.push(['_setDomainName', '24k.hk']);
            _gaq.push(['_addIgnoredRef', '24k.hk']);
        }
        if(type == "fxstudio"){
            _gaq.push([ '_setAccount', 'UA-49389835-1' ]);
            _gaq.push([ '_setDomainName', 'gwfx.com' ]);
            _gaq.push([ '_addIgnoredRef', 'gwfx.com' ]);
        }
        if(type == "hxstudio"){
        	 _gaq.push(['_setAccount', '']);
             _gaq.push(['_setDomainName', 'handan.hx9999']);
             _gaq.push(['_addIgnoredRef', 'handan.hx9999']);
        }
        _gaq.push(['_setAllowLinker', true]);
        _gaq.push(['_addOrganic', 'soso', 'w']);
        _gaq.push(['_addOrganic', 'sogou', 'query']);
        _gaq.push(['_addOrganic', 'youdao', 'q']);
        _gaq.push(['_addOrganic', 'baidu', 'word']);
        _gaq.push(['_addOrganic', 'baidu', 'q1']);
        _gaq.push(['_addOrganic', 'ucweb', 'keyword']);
        _gaq.push(['_addOrganic', 'ucweb', 'word']);
        _gaq.push(['_addOrganic', '114so', 'kw']);
        _gaq.push(['_addOrganic', '360', 'q']);
        _gaq.push(['_addOrganic', 'so', 'q']);
        _gaq.push(['_trackPageview']);
    },
    /**
     * 设置GA
     */
    setGA:function(){
        try{
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        }catch(e){
            console.log("Set GA fail!"+e);
        }
    },
    setBaidu:function(){
        try{
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?52a2828b884f1a2ba8a3e25efe98eb65";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        }catch(e){
            console.log("Set GA fail!"+e);
        }
    },
    /**
     * 获取ip
     * @param callback
     */
    getIp:function(callback){
        if(chatAnalyze.utmStore.userIp){
            callback && callback();
        }else{
            $.getJSON('https://oa.24k.hk/ajax/getIp?callback=ip&_='+ Math.random(), function(datas) {
                chatAnalyze.utmStore.userIp=datas.Ip;
                callback && callback();
            });
        }
    },
    /**
     * 获取utm cookie
     * @param cval
     * @param type
     */
    getUTMCookie : function() {
        var strCookie = document.cookie;
        var arrCookie = strCookie.split(/[;&]/);
        for ( var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if ($.trim(arr[0]) == this.utmStore.storeKey) {
                return arr[1];
            }
        }
        var dm=document.domain;
        if($.inArray(dm,['pmchat.24k.hk','chat.gwfx.com','handan.hx9999.com'])>-1) {
            if (chatAnalyze.localHref.indexOf("/studio") != -1) {
                dm = '.24k.hk';
            } else if (chatAnalyze.localHref.indexOf("/fxstudio") != -1) {
                dm = '.gwfx.com';
            }
        }
        var cval=UUID.prototype.createUUID(dm.indexOf("gwfx")!=-1?'':'G');
        document.cookie = this.utmStore.storeKey+ '='+ escape(cval)+ '; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/;domain='+dm;
        return cval;
    },
    /**
     * 设置utm系统所需行为
     */
    setUTM:function(init,data){
        try{
            //this.getIp();
            if(init){
                this.utmStore.roomId=data.groupId;
                this.utmStore.userId=data.userId;
                this.utmStore.userTel=data.userTel;
                this.utmStore.clientGroup=data.clientGroup;
                this.utmStore.groupType=data.groupType;
                $(window).unload(function(){
                    chatAnalyze.utmStore.onlineETM=new Date().getTime();
                    //chatAnalyze.sendUTM(null);
                    window.event.returnValue=true;
                });
            }else{
                chatAnalyze.utmStore.userId = chatAnalyze.getUTMCookie();//用户id
                chatAnalyze.utmStore.userType = chatAnalyze.getClientGroup(data.clientGroup);
                chatAnalyze.utmStore.businessPlatform = chatAnalyze.getGroupType(data.groupType);
                chatAnalyze.utmStore.roomId = data.groupId;//房间编号
                chatAnalyze.utmStore.userTel = data.mobile;
                chatAnalyze.utmStore.userName = data.userName;
                chatAnalyze.utmStore.roomName = data.roomName;
                chatAnalyze.utmStore.platformType = common.isMobile(navigator.userAgent)?1:0;
                chatAnalyze.utmStore.touristId = data.visitorId;
                chatAnalyze.utmStore.sessionId = data.sid;
                chatAnalyze.utmStore.nickName = data.nickname;
                chatAnalyze.utmStore.email = data.email;
                chatAnalyze.utmStore.useEquipment = navigator.userAgent;
                chatAnalyze.utmStore.operateEntrance = common.isBlank(common.getUrlParam('platform'))?'web':common.getUrlParam('platform');
                chatAnalyze.utmStore.courseId = data.courseId||'';
                chatAnalyze.utmStore.courseName = data.courseName;
                chatAnalyze.utmStore.teacherId = data.lecturerId||'';
                chatAnalyze.utmStore.teacherName = data.lecturer||'';
                if(isLocal) {
                    chatAnalyze.utmStore.userIp = data.ip;
                }
                chatAnalyze.utmStore.operationType = data.operationType;
                chatAnalyze.utmStore.tradingAccount = data.accountNo||'';
                if(data) {
                    if(data.operationType==7) {
                        chatAnalyze.utmStore.videoId = data.videoId;
                        chatAnalyze.utmStore.videoName = data.videoName;
                    }
                }
                data = chatAnalyze.utmStore;
                if(common.isValid(data.sessionId) && common.isValid(data.userId) && (common.isValid(data.touristId) || common.isValid(data.userTel)) && /*(*/common.isValid(data.operationType) /*|| $.inArray(data.userType, [7,8,9])>-1)*/){
                    var isLocal = this.isLocalHref();
                    var sendUrl = isLocal ? "http://testweboa.gwfx.com:8088/GwUserTrackingManager_NEW/put/insertRoom" : "https://das.gwfx.com/put/insertRoom";
                    if(isLocal) {
                        chatAnalyze.getIp(function() {
                            chatAnalyze.utmAjax(sendUrl, data, true);
                        });
                    }else{
                        data = chatAnalyze.utmStore;
                        chatAnalyze.getIp(function(){
                            chatAnalyze.utmAjax(sendUrl, data, true)
                        });
                    }
                    /*if(data.speakCount){
                     this.utmStore.speakCount+=data.speakCount;
                     }else{
                     if(chatAnalyze.utmStore.ip){
                     chatAnalyze.sendUTM(data);
                     }else{
                     this.getIp(function(){
                     chatAnalyze.sendUTM(data);
                     });
                     }
                     }*/
                }
            }
        }catch(e){
            console.log("Set UTM fail!"+e);
        }
    },
    /**
     * utm AJAX
     * @param url
     */
    utmAjax:function(url,sendData,async){
        // $.ajaxSetup({contentType:'application/json; charset=UTF-8'});
        $.post(url,{data:JSON.stringify(sendData),callback:'?'},function(result){

        });
        /*$.ajax({
            type : 'POST',
            async : async,
            url : url,
            cache : false,
            dataType : (async?'jsonp':'json'),
            data : {data:JSON.stringify(sendData)},
            success : function(t) {}
        });*/
    },
    /**
     * 发送utm数据
     */
    sendUTM:function(data){
        return false;
        try{
            if (!store.enabled){
                console.log('Local storage is not supported by your browser.');
                return;
            }
            var tmpData=chatAnalyze.utmStore;
            if(!tmpData.roomId||!tmpData.groupType){
                return;
            }
            if(!tmpData.userTel && !tmpData.userId){
                var st=store.get('storeInfos_'+tmpData.groupType);
                if(!st){
                   return;
                }
                tmpData.userId=st.userId;
            }
            var bPlatform=tmpData.groupType.indexOf('fx')!=-1?1:2;
            var userId = this.getUTMCookie();
            var isLocal=this.isLocalHref();
            var sendData={
                userId:userId,
                customerType: tmpData.clientGroup,
                ip:tmpData.ip,
                businessPlatform:bPlatform,
                platformType:(common.isMobile()?1:0),
                roomId:tmpData.roomId
            };
            if(tmpData.userTel){
                sendData.operationTel=tmpData.userTel;
            }else{
                sendData.visitorId=tmpData.userId;
            }
            var sendUrl=isLocal?"http://testweboa.gwfx.com:8088/GwUserTrackingManager_NEW/put/insertRoom":"http://das.gwfx.com/put/insertRoom";
            if(data && data.courseId){
                sendData.courseId=data.courseId;
                this.utmAjax(sendUrl,sendData,true);
            }else{
                sendData.startDateTime=tmpData.onlineSTM;
                sendData.endDateTime=tmpData.onlineETM;
                sendData.speakCount=tmpData.speakCount;
                if(navigator.sendBeacon){
                    navigator.sendBeacon(sendUrl+"Close",JSON.stringify(sendData));
                }else{
                    this.utmAjax(sendUrl,sendData,false);
                }
            }
        }catch(e){
            console.log("send UTM fail!"+e);
        }
    },
    /**
     * 根据客户在类别返回对应数字
     * @param clientGroup
     * @returns {number}
     */
    getClientGroup: function(clientGroup){
        var userType = 1;
        switch (clientGroup){
            case 'visitor':
                userType = 1;
                break;
            case 'register':
                userType = 2;
                break;
            case 'simulate':
                userType = 3;
                break;
            case 'active':
                userType = 4;
                break;
            case 'notActive':
                userType = 5;
                break;
            case 'vip':
                userType = 6;
                break;
            case 'analyst':
                userType = 7;
                break;
            case 'admin':
                userType = 8;
                break;
            case 'cs':
                userType = 9;
                break;
            default :
                userType = 1;
                break;
        }
        return userType;
    },
    /**
     * 根据groupType返回对应数字
     * @param groupType
     * @returns {number}
     */
    getGroupType:function(groupType){
        var businessPlatform = 1;
        if(/^fx/.test(groupType)){
            businessPlatform = 1;
        }else if(/^hx/.test(groupType)){
            businessPlatform = 3;
        }else{
            businessPlatform = 2;
        }
        return businessPlatform;
    }
};
$(function() {
    chatAnalyze.init();
});
