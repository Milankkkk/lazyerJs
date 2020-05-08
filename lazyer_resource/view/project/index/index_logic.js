lazyerJs.init(function () {
    let app = lazyerJs;
    let $ = app.$;
    app.requseModule(['renderTools'],function () {
        app.msgbox.loaddingshow();
        app.loadCss('page',app.conf.lazyer_app_base_path+'/'+app.conf.lazyer_static_path+'/'+'pageHelpCss/css.css');

        //页面渲染器
        let renderTools = app.renderTools;
        renderTools.init();
        renderTools.setTitle('测试渲染页面');
        renderTools.setKeywords('测试|渲染');
        renderTools.setDescription('测试渲染');
        renderTools.renderInfo({
            showTitle:'测试渲染单环境',
            haha:'测试渲染单环境1',
            xx:'测试渲染单环境2',
        });
        //end
        app.msgbox.loaddinghide()
    })
});