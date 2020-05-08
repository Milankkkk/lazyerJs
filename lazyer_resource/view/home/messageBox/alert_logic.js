lazyerJs.init(function () {
    let app = lazyerJs;
    let $ = app.$;
    app.requseModule(['messageBox'],function () {
        let msg = app.messageBox;
        msg.init();
        msg.setTitle('这是一个测试test')
        msg.isShowMessageBox($('.showMessage'))
    })
})