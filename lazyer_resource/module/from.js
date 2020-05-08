/**
 * @author yzy
 * @type {{doSendLogic: null, doSend: lazyer_from.doSend, defaultSendData: null, sendData: lazyer_from.sendData}}
 */
var lazyer_from = {
    doSendLogic:null,
    doSend:function () {
        let _this = this;
        if (_this.doSendLogic==null){
            lazyerJs.log('请实现 doSendLogic 方法');
            return false
        }
        if(lazyerJs.$('.lazyer_from').length==0){
            lazyerJs.log(' 找不到 class 为lazyer_from 的 from表单');
            return false
        }
        try{
            let dataList = lazyerJs.$(lazyerJs.$('.lazyer_from').get(0)).serializeArray();
            let sendData = {};
            lazyerJs.$.each(dataList,function (k,v) {
                sendData[v.name] = v.value;
            });
            _this.doSendLogic(sendData);
        }catch (e) {
            lazyerJs.log(e,'error')
        }
    },
    defaultSendData:null,
    sendData:function (url,data,callback,type='post') {
        let _this = this;
        if (_this.defaultSendData != null) {
            lazyerJs.$.each(_this.defaultSendData, function (k, v) {
                data[k] = v;
            });
        }
        switch (type) {
            case 'post':
                lazyerJs.$.ajax({
                    url: url,
                    type: 'post',
                    data: data,
                    dataType: 'json',
                    success: function (res) {
                        if (typeof callback === "function") callback(res)
                    },
                    error: function (res) {
                        if (typeof callback === "function") callback(res)
                    }
                });
                break;
            case 'get':
                lazyerJs.$.ajax({
                    url: url,
                    type: 'get',
                    data: data,
                    dataType: 'json',
                    success: function (res) {
                        if (typeof callback === "function") callback(res)
                    },
                    error: function (res) {
                        if (typeof callback === "function") callback(res)
                    }
                });
                break;

        }
    }
};