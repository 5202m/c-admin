/**
 * Created by Administrator on 2015/5/5.
 */
var constant={
    md5Key : "GOLDENWAY",
    clientGroup:{//客户类别
      vip:'vip',
      active : 'active', //真实客户-激活
      notActive : 'notActive', //真实客户-未激活
      real:'real',//真实用户
      simulate:'simulate',//模拟用户
      register:'register',//注册用户
      visitor:'visitor'//游客
    },
    fromPlatform:{//来源平台,区分系统用户登录来源
        pm_mis:'pm_mis',//后台
        wechat:'wechat',//黄金微解盘
        fxchat:'fxchat',//外汇微解盘
        studio:'studio',//pm直播间
        fxstudio:'fxstudio',//fx直播间
        hxstudio:'hxstudio'//hx直播间
    }
};
//导出常量类
module.exports =constant;