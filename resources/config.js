var config = {
    companyId: "fx",
    defaultGroupType: "fxstudio",
    studioThirdUsed: { //第三方引用直播间默认房间
        platfrom: 'webui,app,pc',
        webui: 'webui', //直播间中studio.js中针对webui不跳转到mini版本
        roomId: {
            cfstudio: 'fxstudio_11'
        }
    },
    defTemplate: {
        fx: { usedNum: 4, pc: 'theme1', mb: 'theme2', mini: '', webui: 'theme4', routeKey: '', host: '' }
    }, //默认模板设置,//默认模板设置
    utm: {
        smsUrl: "http://192.168.35.222:8070/das_web/smsTemplate/send", //http://dmp.gwghk.com/smsTemplate/send
        emailUrl: "http://192.168.35.222:8070/das_web/emailTemplate/send", //http://dmp.gwghk.com/emailTemplate/send
        cstGroupUrl: "http://192.168.35.222:8070/das_web/customerGroup/updateCustomer", //http://dmp.gwghk.com/customerGroup/updateCustomer
        fxstudio: {
            sid: "fa573c78eaa8402cb6c84dabfcce7158",
            token: "8867af2616da47d7927ff0df7ea60668"
        }
    }, //UTM系统信息
    isDevTest: true, //是否开发或测试环境
    isRedPacket: false, //是否有红包活动
    isGuess: true, //是否有竞猜活动
    clusterWorkCount: 2, //开启多线程个数，如果该参数大于系统内核个数，默认是开启(cpu核数-1)个线程
    sessionConfig: { key: 'connect.sid', secret: 'fx@chat' }, //session 对应key,secret
    redisUrlObj: { host: '192.168.35.81', port: 6379 }, //链接redis缓存客户端连接
    isAllowCopyHomeUrl: true, //是否允许copy链接（针对微信进入聊天室）
    //    apiUrl:'http://192.168.35.91:3000/api',//pmApi地址
    apiUrl: 'http://192.168.35.81:3004/api', //pmApi地址
    //   apiUrl:'http://localhost:3000/api',//pmApi地址
    apiAuth: {
        appId: "fx_chat",
        appSecret: "df1a0002"
    },
    gwfxGTS2ApiUrl: 'http://192.168.35.100:8083/Goldoffice_gateway_uat/RESTful', //外汇GTS2 Api地址
    gwfxGTS2SmApiUrl: 'http://192.168.35.99:8080/Goldoffice_demo_api/RESTful', //外汇GTS2 模拟场 Api地址  真实地址:http://gts2apidemo.gwfx.com/Goldoffice_api
    gwfxMT4ApiUrl: 'http://192.168.75.40:8081/GwfxApi/RESTful', //外汇MT4 Api地址
    gwfxMT4SmApiUrl: 'http://192.168.75.40:8081/GwfxApi/RESTful', //外汇MT4 Api地址
    socketServerUrl: { webSocket: 'http://192.168.35.81:3007', socketIO: 'http://192.168.35.81:3007', apiSocket: 'http://192.168.35.81:3007/fxFinance' },
    chatSocketUrl: 'http://192.168.35.81:3007', //socket 服务api地址
    filesDomain: 'http://113.28.105.65:8090', //图片等文件访问域名
    fxOAPath: 'http://testweboa.gwfx.com',
    dasUrl: 'http://testweboa.gwfx.com:8088/GwUserTrackingManager_NEW/put/insertRoom', //das数据分析系统地址
    geetest: {
        fxstudio: {
            pc: {
                id: "ad7e1ded9aa772678fb7575ae4e9d333",
                key: "4bc42e68df96f4bab5c2d3a385705f34"
            },
            mobile: {
                id: "e47568937a6b192cc61c75cf09eb1b15",
                key: "58a25bc465920b3ca9aa7293ced0a0df"
            }
        }
    },
    appAutoLogin: {
        rgsUrl: 'http://192.168.35.17:8080/rgs/validate', //UAT //'http://sso.24k.hk:8080/rgs/validate',//真实场
        clientId: 'fxlivebroadcast',
        rgsKey: 'b09a9317x9f18x4f11xb27dx2388e3223afb'
    }, //app端自动登录直播间
    // gwAnalysisServer: "datac.gwghk.com" // 真实场用这个
    gwAnalysisServer: "192.168.35.231:81"

};
//导出配置类
module.exports = config;