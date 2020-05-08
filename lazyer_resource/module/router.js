var lazyer_router = {
    initPower:false,
    viewDivName:'lazyerJsRouterPageDiv',
    init:function(){
        let _this = this;
        _this.initPower = true;
        if(lazyerJs.$('#'+_this.viewDivName).length==0){
            lazyerJs.$('body').append(
                ` <div id="${_this.viewDivName}" style="background: #fff;height: 100vh;width: 100%;position: fixed;top: 0;z-index: 3;left: 0"></div> `
            );
        }
    },
    /**
     * @param typeStr  in [all,project,controller,view] default all
     * @returns {boolean}
     */
    getRouter:function (typeStr='all') {
        let _this = this;
        if(! _this.initPower){
            lazyerJs.log('need init')
            return false;
        }
        switch (lazyerJs.conf['router'].routerType) {
            case "hash":
                return _this.hashGet(typeStr);
        }
    },
    hashGet(typeName){
        let str = '';
        if(location.hash) str = location.hash
        let routerList = str.substr(1,str.length).split('/');
        let project = routerList[1]?routerList[1]:'project';
        let controller = routerList[2]?routerList[2]:'index';
        let view = routerList[3]?routerList[3]:'index';
        let routerStr = '/'+project+'/'+controller+'/'+view
        switch (typeName) {
            case 'all':
                return routerStr
            case 'project':
                return  project
            case 'controller':
                return  controller
            case 'view':
                return  view
            case 'project_controller':
                return  '/'+project+'/'+controller+'/';

        }
    },
    /**
     *
     * @param path
     * @param type   in [all,project,controller,view] default all
     * @returns {boolean|lazyer_router}
     */
    setRouter:function (path='',type='all') {
        let _this = this
        if(!_this.initPower){
            lazyerJs.log('need init')
            return false;
        }
        switch (lazyerJs.conf['router'].routerType) {
            case "hash":
                _this.hashSet(path,type);
                break;
        }
        if(lazyerJs.conf['router'].routerAutoRender){
            _this.render();
        }
    },

    hashSet(path,type){
        let _this = this;
        let tempPath = path;
        switch (type) {
            case 'all':
                if(path==''){
                    path = '/project/index/index'
                }
                let pathList = path.split('/');
                switch (pathList.length) {
                    case 1:
                        path = '/'+tempPath+'/index/index'
                        break;
                    case 2:
                        if(path.substr(0,1)=='/'){
                            path = '/'+tempPath+'/index/index'
                        }else{
                            path = '/'+pathList[0]+'/'+pathList[1]+'/index'
                        }
                        break;
                    case 3:
                        if(path.substr(0,1)=='/'){
                            path = '/'+pathList[1]+'/'+pathList[2]+'/index'
                        }else{
                            path = '/'+pathList[0]+'/'+pathList[1]+'/'+pathList[2]
                        }
                        break;
                    case 4:
                        if(path.substr(0,1)=='/'){
                            path = '/'+pathList[1]+'/'+pathList[2]+'/'+pathList[3]
                        }else{
                            path = '/'+pathList[0]+'/'+pathList[1]+'/'+pathList[2]
                        }
                        break;
                    default :
                        path = '/'+pathList[0]+'/'+pathList[1]+'/'+pathList[2]
                        break;
                }
                location.hash = path;
                break;
            case 'project':
                location.hash = '/'+path+'/'+_this.getRouter('controller')+'/'+_this.getRouter('view');
                break;
            case 'controller':
                location.hash = '/'+_this.getRouter('project')+'/'+path+'/'+_this.getRouter('view');
                break;
            case 'view':
                location.hash = '/'+_this.getRouter('project')+'/'+_this.getRouter('controller')+'/'+path;
            break;
        }
    },
    render:function () {
        let _this = this;
        if(typeof _this.loading === "undefined"){
            _this.loading = true;
            if(!_this.initPower){
                lazyerJs.log('need init')
                return false;
            }
            let viewBasePath = lazyerJs.conf['router'].viewPath;
            let divName = _this.viewDivName;
            let div =   lazyerJs.$('#'+divName);
            lazyerJs.$.get(viewBasePath+_this.getRouter()+'.html',{},function (e) {
                //load html
                div.html(e)
                //load page logic js
                lazyerJs.loadJS(viewBasePath+'/'+_this.getRouter()+'_logic.js',function () {
                    _this.loading = undefined;
                })
            })
        }else{
            setTimeout(function () {
                _this.render()
            },100)
        }
    }
}