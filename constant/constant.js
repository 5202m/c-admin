/**
 * Created by Administrator on 2015/5/5.
 */
var constant={
    fromPlatform:{//来源平台,区分系统用户登录来源
        fxstudio:'fxstudio',//fx直播间
    },
    tempPlatform:{//模板对应的平台，与config文件对应defTemplate 对应
      pc:'pc',
      mb:'mb',
      webui:'webui'
    },
    clientGroup:{//客户类别
      vip:'vip',
      active : 'active', //真实客户-激活
      notActive : 'notActive', //真实客户-未激活
      real:'real',//真实用户
      simulate:'simulate',//模拟用户
      register:'register',//注册用户
      visitor:'visitor'//游客
    },
    clientGroupSeq:{//客户类别序列
        vip:7,
        active : 6, //真实客户-激活
        notActive : 5, //真实客户-未激活
        real:4,//真实用户
        simulate:3,//模拟用户
        register:2,//注册用户
        visitor:1//游客
    },
    pushInfoPosition:{//信息推送位置
        taskbar:0,//任务栏
        whBox:1,//私聊框
        talkBox:3,//公聊框
        videoBox:4//视频框
    },
    pwdKey:'pm_chat_pwd',//密码加密key
    systemUserPrefix:'sys_',//微信前台登录，系统用户默认前缀
    roleUserType:{ //角色与聊天室用户类别对应关系
        visitor:-1,
        member:0,//前台会员
        admin:1,//管理员
        analyst:2, //分析师
        cs:3, //客服
        navy:4//水军
    },
    chatPraiseType:{//点赞类型
        user:'user',//用户
        article:'article'//文章
    },
    gwApiInvoker:{//公司内存restful接口对应的invoker
        fx_website:{key:'fx_website',value:'2ac168bbb45d396a3315d95aa4215191'},//外汇
        fx_website_demo:{key:'fx_website_demo',value:'06639931e8e5f56c3572956f014882ba'},//外汇
    },
    chatGrout:{
        dict_chat_group_type: 'chat_group_type'//组类别
    },
    md5Key : "GOLDENWAY",
    emailKey : 'chat_email',//绑定邮箱加密key
    //积分折扣
    pointsRate : {
        studio : {
            vip:0.3,
            active : 0.3,
            notActive : 0.6,
            real:0.6,
            simulate:0.8
            //register:1,
            //visitor:1
        },
        hxstudio : {
            vip:0.3,
            active : 0.3,
            notActive : 0.6,
            real:0.6,
            simulate:0.8
            //register:1,
            //visitor:1
        }
    }
};
//导出常量类
module.exports =constant;