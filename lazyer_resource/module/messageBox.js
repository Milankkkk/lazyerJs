var lazyer_messageBox = {
    text:'',
    defaultDiv:'lazyerMessageBoxDiv',
    defaultCloseBtn:'lazyerCloseMessage',
    defaultOffBtn:'lazyerCancelMessage',
    defaultSureBtn:'lazyerSureMessage',
    showTitleDiv:'lazyerTipTitle',
    defaultLoadDiv: 'lazyerLoadingBox',
    defaultAlertDiv: 'lazyerAlertbox',
    alertTtpeList:{
        default:'default',// 灰色
        error:'error',// 错误红
        warning:'warning',// 警告橙
        success:'success' //成功绿
    },

    init:function(){
        let _this = this;
        let  msgStr =
            `<div id="${_this.defaultDiv}">
            <div class="lazyer_messageBox">
                <div class="lazyer_title">
                    <span>提示</span>
                    <strong id="${_this.defaultCloseBtn}">X</strong>
                </div>
                <div class="lazyer_content">
                    <p class="${_this.showTitleDiv}"></p>
                </div>
                <div class="lazyer_button">
                    <button id="${_this.defaultOffBtn}" class="cancelMessage">取消</button>
                    <button id="${_this.defaultSureBtn}" class="sureMessage">确认</button>
                </div>
            </div>
        </div>`;
        let loadingStr =
            ` <div id="${_this.defaultLoadDiv}">
                <canvas id="canvas" width="60" height="60"></canvas>
                <p>加载中...</p>
            </div>`
        let alertStr = `<div id="${_this.defaultAlertDiv}"></div>`


        if(lazyerJs.$('#'+_this.defaultDiv).length==0){
            lazyerJs.$('body').append(msgStr)
        }
        if(lazyerJs.$('#'+_this.defaultLoadDiv).length==0){
            lazyerJs.$('body').append(loadingStr)
        }
        if(lazyerJs.$('#'+ _this.defaultAlertDiv).length==0){
            lazyerJs.$('body').append(alertStr)
        }
    },

    /***
     *  开启弹窗
     * @param titleStr
     * @returns {lazyer_messageBox}
     */
    setTitle: function(titleStr) {
        let _this = this;
        lazyerJs.$('.'+_this.showTitleDiv).html(titleStr);
        return this;
    },
    isShowMessageBox: function(btn) {
        let _this = this;
        let $ =  lazyerJs.$;
        let btns = $(btn)
        btns.attr('onclick','showMessageFn()')
        $('#'+_this.defaultSureBtn).attr('onclick','closeMessageFn({msg: "true"})')
        $('#'+_this.defaultOffBtn).attr('onclick','closeMessageFn({msg: "false"})')
        $('#'+_this.defaultCloseBtn).attr('onclick','closeMessageFn()')
        showMessageFn = function() {
            $('#'+_this.defaultDiv).css('display', 'flex')
        }
        closeMessageFn = function(data) {
            $('#'+_this.defaultDiv).hide()
            if(data) {
                if(data.msg == 'true') {
                  _this.successBtnClick()
                }else if(data.msg == 'false') {
                   _this.closeBtnClick()
                }
            }else{
                console.log('仅关闭弹窗')
            }
        }
    },
    successBtnClick: function () {
    },
    closeBtnClick: function () {
    },
    setSuccessCallBack: function (f) {
        if(typeof f == "function"){
            this.successBtnClick = f;
            return this;
        }
        return this;
    },
    setCloseBtnCallBack: function (f) {
        if(typeof f == "function"){
            this.closeBtnClick = f;
            return this;
        }
        return this;
    },

    /***
     * 开启加载中
     * @param btn
     */
    isShowLoadingBox: function (btn) {
        let _this = this
        let $ =  lazyerJs.$;
        $(btn).attr('onclick', 'lazyer_messageBox.showLoadingFn()')
    },
    showLoadingFn: function () {
        let _this = this
        let $ =  lazyerJs.$;
        lazyer_messageBox.drawLoading(1.5)
        $('#'+ _this.defaultLoadDiv).css({'display': 'flex'})
    },
    hideLoadingFn: function() {
        let _this = this
        let $ =  lazyerJs.$;
        $('#'+ _this.defaultLoadDiv).css({'display': 'none'})
    },
    drawLoading: function(num) {
        let _this = this
        let $ =  lazyerJs.$;
        let testCanvas = $('#canvas')[0];
        console.log(testCanvas)
        let context = testCanvas.getContext("2d");
        context.beginPath();
        context.arc(30, 30, 25, 0, num * Math.PI, false);
        context.strokeStyle = '#409eff';
        context.lineCap="round";
        context.lineWidth = '4';
        context.stroke();
    },

    /**
     * 消息提示
     * @param type   default 灰色 error 错误红 warning 警告橙 success 成功绿
     * @returns {{default: *, warning警告橙: *}}
     */
    getTypeList: function(type='default') {
        let _this = this
        return _this.alertTtpeList[type]
    },
    setAlertText: function(obj) {
        let _this = this;
        let defaultAlertObj = {
            title: '这是一个警告的提示消息',
            type: 'default',  // default默认灰 error错误红 warning警告橙 success成功绿
        }
        for (x in arguments[0]) {
            console.log(x)
            defaultAlertObj[x] = arguments[0][x]
        }
        let divStr = `<p class="${defaultAlertObj.type}"><i>!</i>${defaultAlertObj.title}</p>`
        lazyerJs.$('#'+ _this.defaultAlertDiv).append(divStr)
        return this;
    },
    isShowAlertBox: function(btn) {
        let _this = this
        let $ =  lazyerJs.$;
        $(btn).attr('onclick', 'showAlertFn()')
        showAlertFn = function () {
            $("#lazyerAlertbox").animate({top:"0"},function () {
                lazyer_messageBox.showLoadingFn()
                let t = setTimeout(function () {
                    $("#lazyerAlertbox").animate({top:(-$("#lazyerAlertbox").height())});
                    lazyer_messageBox.hideLoadingFn()
                    clearTimeout(t);
                },3000);

            });
        }
    }
}
