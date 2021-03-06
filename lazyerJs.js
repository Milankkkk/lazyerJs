var lazyerJs = {
    $:null,
    conf:null,
    systemIntervalId:0,
    systemFuncList:{},
    addSystemServiceDo:function(serviceName,func){
        let _this = this;

        let list = _this.tools.cache.get('lazyerJsSystemService');
        if(list == null) list = {};
        if(typeof _this.systemFuncList[serviceName] === "undefined"){
            _this.systemFuncList[serviceName] = func;
        }
        if(typeof list[serviceName] === "undefined"){
            list[serviceName] = "obj"
        }
        _this.tools.cache.set('lazyerJsSystemService',list);
    },
    delSystemServiceDo:function(serviceName){
        let _this = this;
        let list = _this.tools.cache.get('lazyerJsSystemService');
        if(list == null) list = {};
        if(typeof list[serviceName] === "undefined"){
            delete list[serviceName]
        }
        if(typeof _this.systemFuncList[serviceName] === "undefined"){
            delete _this.systemFuncList[serviceName];
        }
        _this.tools.cache.set('lazyerJsSystemService',list);
    },
    loadSysCore:function(callback,path){
        let _this = this;
        let conf = _this.conf
        function startService() {
             _this.tools.cache.init();
             if(_this.systemIntervalId == 0){
                 _this.systemIntervalId = _this.tools.cache.get('systemServiceIntUid');
             }
             clearInterval(_this.systemIntervalId );
            _this.systemIntervalId = setInterval(
                function () {
                   let list = _this.tools.cache.get('lazyerJsSystemService');
                   if(list){
                       _this.$.each(list,function (k,v) {
                           if(typeof k !== "null" && typeof _this.systemFuncList[k] === "function")
                               _this.systemFuncList[k]();

                           if(typeof k !== "null" && typeof _this.systemFuncList[k] === "undefined"){
                                _this.delSystemServiceDo(k)
                           }
                       })
                   }
                }
                ,1000);
            _this.tools.cache.set('systemServiceIntUid', _this.systemIntervalId);
        }
        if(typeof _this.requseModule !="function"){
            _this.loadJS(path+'/core.js',function () {
                if(conf.lazyer_load_default_theme){
                    _this.loadCss('default_theme',conf.lazyer_app_base_path+conf.lazyer_resource_path+'/theme/default/css.css')
                }
                startService();
                if(typeof callback == "function"){
                    callback();
                }
            })
        }else{
            if(conf.lazyer_load_default_theme){
                _this.loadCss('default_theme',conf.lazyer_app_base_path+conf.lazyer_resource_path+'/theme/default/css.css')
            }
            startService();
            callback();
        }
    },
    loadSysConf:function(loadCore,lazyer_resource_path){
        let _this = this;
        if(_this.conf == null){
            _this.loadJS(lazyer_resource_path+'/conf.js',function () {
                _this.conf = lazyer_conf;
                lazyer_conf = undefined;
                loadCore()
            })
        }else{
            loadCore()
        }
    },
    init:function (callback,lazyer_resource_path='./lazyer_resource') {
        let _this = this;
        function loadCore() {
            let conf = _this.conf;
            let path = conf.lazyer_app_base_path+''+conf.lazyer_core_path;
            if(typeof $ != "undefined"){
                _this.loadSysCore(callback,path)
                if(conf.lazyer_app_debug){
                    _this.log('lazyerJs core is complete')
                }
            } else{
                if(_this.$ == null){
                    _this.loadJS(path+'/jq.js',function () {
                        _this.$ = $;
                        _this.loadSysCore(callback,path)
                    })
                }else{
                    _this.loadSysCore(callback,path)
                }
            }
        }
        if(typeof lazyer_conf == 'undefined'){
            _this.loadSysConf(function () {
                loadCore()
            },lazyer_resource_path)
        }else{
            _this.conf = lazyer_conf;
            loadCore()
        }
    },loadJS: function ( url, callback ){
        try{
            let script = document.createElement('script'),
            fn = callback || function(){};
            script.type = 'text/javascript';
            if(script.readyState){
                script.onreadystatechange = function(){
                    if( script.readyState == 'loaded' || script.readyState == 'complete' ){
                        script.onreadystatechange = null;
                        fn();
                    }
                };
            }else{
                script.onload = function(){
                    fn();
                };
            }
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);
        }catch (e) {
            console.log(e);
        }
    }
    ,log(...info){
        if(info.length==1)
            console.log(info[0]);
        else{
            if(info[1]==='error'){
                console.error(info);
            }else{
                console.log(info);
            }
        }
    }
}