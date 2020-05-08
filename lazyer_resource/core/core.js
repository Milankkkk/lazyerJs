if(typeof lazyerJs != "undefined"){
    lazyerJs.loadingMoule = 0; //加载模块数量
    lazyerJs.loadingTime = 0; // 加载时间
    lazyerJs.loadCss=function(id,url){
        let _this = lazyerJs;
        if(_this.$('#lazyer_'+id+'_css').length==0){
            _this.$('head').append(
                '<link id="lazyer_'+id+'_css" ' +
                'rel="stylesheet" ' +
                'href="'+url+'"/>'
            );
        }
    };
    lazyerJs.loadThemeCss=function(path){
        let _this = lazyerJs;
        let url = lazyerJs.conf.lazyer_app_base_path+lazyerJs.conf.lazyer_resource_path+'/theme/'+path;
        let id = path.replace(/\//g,"_");
        if(_this.$('#lazyer_'+id).length==0){
            _this.$('head').append(
                '<link id="lazyer_'+id+'" ' +
                'rel="stylesheet" ' +
                'href="'+url+'"/>'
            );
        }
    };
    lazyerJs.setModuleConf = function(moduleName,param,val){
        if(typeof  lazyerJs.conf[moduleName] == "undefined"){
            lazyerJs.log('moduleName not find')
            return false;
        }
        lazyerJs.conf[moduleName][param] = val
    };
    lazyerJs.requseModule = function (modules,callback) {
        let _this = this;
        lazyerJs.loadingMoule = 0;
        lazyerJs.loadingTime = 0;
        let conf = _this.conf;
        let path = conf.lazyer_app_base_path+'/'+conf.lazyer_module_path+'/';
        function lazyer_main_load(str,callback) {
            if(typeof _this[str]!=="undefined") {
                if(typeof callback === "function"){
                    if(lazyerJs.loadingMoule >0){

                    }
                    callback()
                    if(lazyerJs.conf.loading_show){
                        lazyerJs.msgbox.loaddinghide();
                    }
                }
                lazyerJs.loadingMoule++;
                return true
            }
            if (_this.conf.lazyer_app_debug)  _this.log('loadding for '+str);
            _this.loadJS(path+str+'_conf.js',function () {
                try{
                    _this.conf[str]= eval('lazyer_'+str+'_conf')
                    if (_this.conf.lazyer_app_debug)  _this.log('complete conf for'+str);
                    _this.loadJS(path+str+'.js',function () {
                        try{
                            if (_this.conf.lazyer_app_debug)  _this.log('complete js for'+str);
                            //模块主体
                            _this[str] = eval('lazyer_'+str);
                            //加载模块资源
                            if(typeof _this.conf[str].cssPath !== 'undefined'){
                                _this.loadCss(str,_this.conf[str].cssPath)
                                if (_this.conf.lazyer_app_debug)    _this.log('complete css for'+str);
                            }
                            lazyerJs.loadingMoule++;
                            if (_this.conf.lazyer_app_debug)  _this.log('complete for '+str);
                            if(typeof callback === "function"){
                                callback()
                                if(lazyerJs.conf.loading_show){
                                    lazyerJs.msgbox.loaddinghide();
                                }
                            }
                        }catch (e) {
                            if (_this.conf.lazyer_app_debug)  _this.log(e)
                        }
                    })
                }catch (e) {
                    if (_this.conf.lazyer_app_debug)console.log(e)
                }
            });
        }
        if(typeof modules === 'object'){
            _this.$.each(modules,function (k,v) {
                if(k==modules.length-1){
                    lazyer_main_load(v)
                    let int = setInterval(function () {
                        lazyerJs.loadingTime ++
                        if(lazyerJs.loadingMoule == modules.length){
                            if(typeof callback === "function"){
                                try{
                                    callback()
                                }catch (e) {
                                    _this.log(e,'error');
                                }
                                clearInterval(int)
                                lazyerJs.loadingTime = 0
                            }
                        }
                        if(lazyerJs.conf.lazyer_loading_time_out <  lazyerJs.loadingTime){
                            clearInterval(int)
                            lazyerJs.loadingTime = 0
                             _this.log('加载失败')
                        }
                    },100)
                }else{
                    lazyer_main_load(v)
                }
            });
        }else if(typeof modules === 'string'){
            lazyer_main_load(modules,callback)
        }else{
            if (_this.conf.lazyer_app_debug)  _this.log('modules must be string or list')
        }
    }
    lazyerJs.msgbox = {
        conf: function () {
            return {
                "cssPath": lazyerJs.conf.lazyer_app_base_path + lazyerJs.conf.lazyer_static_path + '/msgboxCss/css.css',
                "opacity": '0.8',
                "bcolor_errot": 'red',
                "bcolor_success": '#000',
                "fontcolor": 'white',
                "size": '2em'
            };
        },
        loadCss: function () {
            let cssPath = this.conf().cssPath;
            lazyerJs.loadCss('msgbox',cssPath);
        },
        init: function (opacity, bcolor, fontcolor, size) {
            lazyerJs.msgbox.loadCss()
            let appendStr = '<div id="lazyer_isbox" style="' +
                'position: fixed;display: none;padding-top: 5%;padding-bottom:5%;font-size:' + size +
                ';background: ' + bcolor + ';color: ' + fontcolor + ';text-align: center;' +
                'border-radius: 5px;margin-left: -25%;width: 50%;left: 50%;top: 25%;' +
                'filter: alpha(opacity=' + opacity * 100 + ');-moz-opacity: ' + opacity + ';opacity: ' + opacity + ';"> </div>';

            let loaddingdiv = '<div class=\'buffer\' id=\'loadding\' style="display: none;z-index: 999999;position: absolute;left: 25%;top: 20%;height: 150px;" ><span class=\'buffer_tip\' id=\'buffer_tip\' >  Loadding</span><div class="spinner"><div class="cube1"></div><div class="cube2"></div></div></div>';
            let addInfo = loaddingdiv;
            let body = document.body;
            let temp = document.createElement('div');
            temp.innerHTML = appendStr;
            document.getElementById('lazyer_isbox') == null && body.appendChild(temp);
            if (document.getElementById('loadding') == null) {
                body.innerHTML += addInfo;
            }
        },
        show: function (_msg) {
            let _box = document.getElementById('lazyer_isbox');
            let conf = this.conf();
            if (_box == null) {
                this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
                _box = document.getElementById('lazyer_isbox');
            }
            _box.style.display = 'block';
            _box.style.background = conf['bcolor_success'];
            _box.textContent = _msg;
            _box.innerHTML = _msg;
            setTimeout("document.getElementById('lazyer_isbox').style.display='none'; ", 2000);//延时3秒
        }, error: function (_msg) {
            let _box = document.getElementById('lazyer_isbox');
            let conf = this.conf();
            if (_box == null) {
                this.init(conf['opacity'], conf['bcolor_errot'], conf['fontcolor'], conf['size']);
                _box = document.getElementById('lazyer_isbox');
            }
            _box.style.display = 'block';
            _box.style.background = conf['bcolor_errot'];
            _box.textContent = _msg;
            _box.innerHTML = _msg;
            setTimeout("document.getElementById('lazyer_isbox').style.display='none'; ", 2000);//延时3秒
        }, loaddingshow: function () {
            let _box = document.getElementById('loadding');
            let conf = this.conf();
            if (_box == null) {
                this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
                _box = document.getElementById('loadding');
            }
            _box = document.getElementById('loadding');
            _box.style.display = 'block';
        }, loaddinghide: function () {
            let _box = document.getElementById('loadding');
            let conf = this.conf();
            if (_box == null) {
                this.init(conf['opacity'], conf['bcolor_success'], conf['fontcolor'], conf['size']);
                _box = document.getElementById('loadding');
            }
            _box = document.getElementById('loadding');
            _box.style.display = 'none';
        }
    }
    lazyerJs.tools = {
        time:{
            getIntTime: function () {
                return parseInt((new Date()).getTime() / 1000);
            }
        },
        /**
         * 若要开启ttl机制 请先运行init
         */
        cache:{
            init:function(){
                let _this = lazyerJs.tools;
                if(!window.localStorage){
                    console.log('不支持localStorage')
                    return false;
                }else{
                    let int = _this.cache.get('IntervalUid')
                    clearInterval(int);
                    int = setInterval(function () {
                        let list = _this.cache.get('leyList')
                        if(list == null){
                            list = [];
                        }
                        lazyerJs.$.each(list,function (k,v) {
                            let key_ttl = _this.cache.get(v+'_ttl');
                            if(v&&key_ttl!= null&& _this.time.getIntTime()>key_ttl){
                                _this.cache.del(v);
                                delete list[k];
                            }
                        })
                        let newList = [];
                        lazyerJs.$.each(list,function (k,v) {
                            if(v)newList.push(v);
                        })
                        window.localStorage.setItem('leyList',JSON.stringify(newList));
                    },1000);
                    _this.cache.set('IntervalUid',int)
                }
            },
            set:function(key,val,ttl=0){
                let _this = lazyerJs.tools;
                try{
                    window.localStorage.setItem(key,JSON.stringify(val));
                    let list = _this.cache.get('leyList');
                    if(list == null){
                        list = [];
                    }
                    let pw = true;
                    lazyerJs.$.each(list,function (k,v) {
                        if(v==key) pw = false;
                    })
                    if(pw) list.push(key);
                    window.localStorage.setItem('leyList',JSON.stringify(list));
                    if(ttl!=0) {
                        ttl += _this.time.getIntTime();
                        window.localStorage.setItem(key + '_ttl', ttl);
                    }
                    return true
                }catch (e) {
                    console.log(e)
                    return false;
                }
            },
            get:function (key) {
                try{
                    return JSON.parse(localStorage.getItem(key));
                }catch (e) {
                    return null
                }
            },
            del:function(key){
                localStorage.removeItem(key);
                localStorage.removeItem(key+'_ttl');
            }
        },
        date: {
            intToDate: function (timestamp, type = 1) {
                var date = new Date(timestamp * 1000);
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                if (type == 1) {
                    return Y + M + D + h + m + s;
                } else {
                    return Y + M + D;
                }
            },
            intToTime: function (int) {
                var h = parseInt(int / 3600 % 24);
                var m = parseInt(int / 60 % 60);
                var s = parseInt(int % 60);
                return h + ':' + m + ':' + s;
            },
            getInt: function () {
                return parseInt((new Date()).getTime() / 1000);
            }
        },
        query:{
            Get: function (variable)
            {
                var query = window.location.search.substring(1);
                var vars = query.split("&");
                for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == variable){return pair[1];}
                }
                return(false);
            },
        },
        cookie: {
            set: function (key, val) {//设置cookie方法
                let date = new Date(); //获取当前时间
                let expiresDays = 1;  //将date设置为n天以后的时间
                date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
                document.cookie = key + "=" + val + ";expires=" + date.toGMTString() + ';path=/';
            },
            get: function (key) {
                let getCookie = document.cookie.replace(/[ ]/g, "");
                let arrCookie = getCookie.split(";")
                let tips;  //声明变量tips
                for (var i = 0; i < arrCookie.length; i++) {
                    let arr = arrCookie[i].split("=");
                    if (key == arr[0]) {
                        tips = arr[1];
                        break;
                    }
                }
                return tips;
            },
            delete: function (key) {
                let date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = key + "=v; expires =" + date.toGMTString();
            }
        },
        sign: {
            init: function () {
                let _this = this;
                let key = _this.cookie.get('signKey');
                if (!key) {
                    key = _this.Math.randomNum(0, 99999);
                    _this.cookie.set('signKey', key);
                }
                let time = tools.date.getInt()
                _this.cookie.set('signTime', time);
                _this.cookie.set('sign', _this.Math.md5(key + '' + time))
            }
        },
        math: {
            randomNum: function (minNum, maxNum) {
                switch (arguments.length) {
                    case 1:
                        return parseInt(Math.random() * minNum + 1, 10);
                        break;
                    case 2:
                        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
                        break;
                    default:
                        return 0;
                        break;
                }
            },
            md5: function (string, key, raw) {
                function safeAdd(x, y) {
                    var lsw = (x & 0xffff) + (y & 0xffff)
                    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
                    return (msw << 16) | (lsw & 0xffff)
                }
                function bitRotateLeft(num, cnt) {
                    return (num << cnt) | (num >>> (32 - cnt))
                }
                function md5cmn(q, a, b, x, s, t) {
                    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b)
                }
                function md5ff(a, b, c, d, x, s, t) {
                    return md5cmn((b & c) | (~b & d), a, b, x, s, t)
                }
                function md5gg(a, b, c, d, x, s, t) {
                    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
                }
                function md5hh(a, b, c, d, x, s, t) {
                    return md5cmn(b ^ c ^ d, a, b, x, s, t)
                }
                function md5ii(a, b, c, d, x, s, t) {
                    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
                }
                function binlMD5(x, len) {
                    x[len >> 5] |= 0x80 << (len % 32)
                    x[((len + 64) >>> 9 << 4) + 14] = len
                    var i
                    var olda
                    var oldb
                    var oldc
                    var oldd
                    var a = 1732584193
                    var b = -271733879
                    var c = -1732584194
                    var d = 271733878
                    for (i = 0; i < x.length; i += 16) {
                        olda = a
                        oldb = b
                        oldc = c
                        oldd = d
                        a = md5ff(a, b, c, d, x[i], 7, -680876936)
                        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
                        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
                        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
                        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
                        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
                        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
                        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
                        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
                        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
                        c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
                        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
                        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
                        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
                        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
                        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)
                        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
                        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
                        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
                        b = md5gg(b, c, d, a, x[i], 20, -373897302)
                        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
                        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
                        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
                        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
                        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
                        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
                        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
                        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
                        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
                        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
                        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
                        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)
                        a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
                        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
                        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
                        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
                        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
                        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
                        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
                        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
                        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
                        d = md5hh(d, a, b, c, x[i], 11, -358537222)
                        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
                        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
                        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
                        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
                        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
                        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)
                        a = md5ii(a, b, c, d, x[i], 6, -198630844)
                        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
                        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
                        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
                        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
                        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
                        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
                        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
                        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
                        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
                        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
                        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
                        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
                        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
                        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
                        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)
                        a = safeAdd(a, olda)
                        b = safeAdd(b, oldb)
                        c = safeAdd(c, oldc)
                        d = safeAdd(d, oldd)
                    }
                    return [a, b, c, d]
                }
                function binl2rstr(input) {
                    var i
                    var output = ''
                    var length32 = input.length * 32
                    for (i = 0; i < length32; i += 8) {
                        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xff)
                    }
                    return output
                }
                function rstr2binl(input) {
                    var i
                    var output = []
                    output[(input.length >> 2) - 1] = undefined
                    for (i = 0; i < output.length; i += 1) {
                        output[i] = 0
                    }
                    var length8 = input.length * 8
                    for (i = 0; i < length8; i += 8) {
                        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << (i % 32)
                    }
                    return output
                }
                function rstrMD5(s) {
                    return binl2rstr(binlMD5(rstr2binl(s), s.length * 8))
                }
                function rstrHMACMD5(key, data) {
                    var i
                    var bkey = rstr2binl(key)
                    var ipad = []
                    var opad = []
                    var hash
                    ipad[15] = opad[15] = undefined
                    if (bkey.length > 16) {
                        bkey = binlMD5(bkey, key.length * 8)
                    }
                    for (i = 0; i < 16; i += 1) {
                        ipad[i] = bkey[i] ^ 0x36363636
                        opad[i] = bkey[i] ^ 0x5c5c5c5c
                    }
                    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
                    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
                }
                function rstr2hex(input) {
                    var hexTab = '0123456789abcdef'
                    var output = ''
                    var x
                    var i
                    for (i = 0; i < input.length; i += 1) {
                        x = input.charCodeAt(i)
                        output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
                    }
                    return output
                }
                function str2rstrUTF8(input) {
                    return unescape(encodeURIComponent(input))
                }
                function rawMD5(s) {
                    return rstrMD5(str2rstrUTF8(s))
                }

                function hexMD5(s) {
                    return rstr2hex(rawMD5(s))
                }

                function rawHMACMD5(k, d) {
                    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
                }

                function hexHMACMD5(k, d) {
                    return rstr2hex(rawHMACMD5(k, d))
                }

                function md5(string, key, raw) {
                    if (!key) {
                        if (!raw) {
                            return hexMD5(string)
                        }
                        return rawMD5(string)
                    }
                    if (!raw) {
                        return hexHMACMD5(key, string)
                    }
                    return rawHMACMD5(key, string)
                }

                return md5(string, key, raw);
            }
        }
    }
}