/**
 *
 * Created by Alan.wu on 2015/4/18.
 */
var config = {
    utm : {
        smsUrl : "http://testweboa.gwfx.com:8070/das_web/smsTemplate/send", //http://dmp.gwghk.com/smsTemplate/send
        emailUrl : "http://testweboa.gwfx.com:8070/das_web/emailTemplate/send", //http://dmp.gwghk.com/emailTemplate/send
        cstGroupUrl : "http://testweboa.gwfx.com:8070/das_web/customerGroup/updateCustomer", //http://dmp.gwghk.com/customerGroup/updateCustomer
        fxstudio : {
            sid : "fa573c78eaa8402cb6c84dabfcce7158",
            token : "8867af2616da47d7927ff0df7ea60668"
        },
        studio : {
            sid : "fa573c78eaa8402cb6c84dabfcce7159",
            token : "8867af2616da47d7927ff0df7ea60669"
        },
        hxstudio : {
            sid : "fa573c78eaa8402cb6c84dabfcce7160",
            token : "8867af2616da47d7927ff0df7ea60670"
        }
    },//UTM系统信息
    isDevTest:true,//是否开发或测试环境
    sessionConfig:{key:'connect.sid',secret:'pm@chat'},//session 对应key,secret
    redisUrlObj:{ host: '192.168.35.236', port: 6379 },	//链接redis缓存客户端连接
    pmApiUrl:'http://localhost:3000/api',//pmApi地址
    socketServerUrl:{webSocket:'http://192.168.35.81:3007',socketIO:'http://192.168.35.81:3007',apiSocket:'http://192.168.35.91:3007'},
    chatSocketUrl:'http://192.168.35.81:3007',  //socket 服务api地址
    goldApiUrl: 'http://192.168.35.160/goldoffice_api/RESTful',//gwapi地址
    gwfxGTS2ApiUrl:'http://192.168.35.100:8083/Goldoffice_gateway_uat/RESTful',//外汇GTS2 Api地址
    gwfxGTS2SmApiUrl:'http://192.168.35.99:8080/Goldoffice_demo_api/RESTful',//外汇GTS2 模拟场 Api地址  真实地址:http://gts2apidemo.gwfx.com/Goldoffice_api
    gwfxMT4ApiUrl:'http://192.168.75.40:8081/GwfxApi/RESTful',//外汇MT4 Api地址
    gwfxMT4SmApiUrl:'http://192.168.75.40:8081/GwfxApi/RESTful',//外汇MT4 Api地址
    simulateApiUrl:'http://192.168.35.160/goldoffice_api_demo/RESTful',//模拟账户api地址  真实地址:http://gts2apidemo.24k.hk/Goldoffice_api/RESTful
    hxGTS2ApiUrl:'http://192.168.35.100:8083/Goldoffice_gateway_uat/RESTful',//恒信GTS2 Api地址 真实地址http://gts2api.hx9999.com/Goldoffice_api/RESTful gts2api.hx9999.com -> 192.168.42.164
    hxGTS2SmApiUrl:'http://192.168.35.99:8080/Goldoffice_demo_api/RESTful',//恒信GTS2 真实地址 http://gts2apidemo.hx9999.com/Goldoffice_api/RESTful
    hxMT4ApiUrl:'http://hxapi.hx9999.com',//恒信MT4 Api地址 http://hxapi.hx9999.com
    hxApiLoginSid:{apiLogin:'handan',apiPassword:'abc123'},
    filesDomain: 'http://192.168.35.91:8090',//图片等文件访问域名
    web24kPath:'http://testweb1.24k.hk:8090',//24k信息地址
    pmOAPath:'http://testweb1.24k.hk:81',//http://www.24k.hk
    packetAcUrl:'http://testweb1.24k.hk/activity20160105/getActivityUrl',//红包活动连接
    mobile24kPath:'http://testweb1.24k.hk:8092',//24k信息地址 http://m.24k.hk
};
//导出配置类
module.exports =config;