lazyerJs.init(function () {
    let app = lazyerJs;
    let $ = app.$;
    app.requseModule(['renderTools'],function () {
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
    })
});