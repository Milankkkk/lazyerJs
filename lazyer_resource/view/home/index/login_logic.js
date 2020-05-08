lazyerJs.init(function () {
    let app = lazyerJs;
    let $ = app.$;
    app.requseModule(['renderTools','from','tools'],function () {
        let from = app.from;
        let tools = app.tools;
        app.msgbox.loaddingshow();
        app.loadCss('page',app.conf.lazyer_app_base_path+'/'+app.conf.lazyer_static_path+'/'+'pageHelpCss/css.css');
        app.loadJS('',function () {

        })
        //页面渲染器
        let renderTools = app.renderTools;
        renderTools.init();
        renderTools.setTitle('手机官网');
        renderTools.setKeywords('测试|渲染');
        renderTools.setDescription('测试渲染');
        renderTools.renderInfo({
            showTitle:'测试渲染单环境',
            haha:'测试渲染单环境1',
            xx:'测试渲染单环境2',
        });
        //end

        // from 控件 必须实现方法
        from.doSendLogic = function (data) {
            // app.msgbox.loaddingshow()
            lazyerJs.log(data);
            //保存发送数据源30秒
            tools.cache.set('postSendData',data,300)
            // 自定义提交
            // $.post('url',{data:data},function () {
            //     app.msgbox.loaddinghide()
            // })
            // lazyerJs.log(tools.cache.get('postSendData'))

            //自动发送
            //设置默认发送 数据
            let nowTime = tools.time.getIntTime();
            from.defaultSendData = {
                time:nowTime,
                sign:tools.math.md5(nowTime)
            };
            from.sendData('url',data,function (res) {
                console.log(res)
            })
        }
        app.msgbox.loaddinghide()
    })
});