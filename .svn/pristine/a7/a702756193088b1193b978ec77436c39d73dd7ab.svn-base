var lazyer_conf = {
    lazyer_app_debug:true,
    loading_show:true,
    lazyer_loading_time_out:15,//  1.5秒
    lazyer_load_default_theme:true,
    lazyer_app_base_path:'./',
    lazyer_resource_path:'/lazyer_resource',
    lazyer_conf_path:'/lazyer_resource/conf',
    lazyer_module_path:'/lazyer_resource/module',
    lazyer_core_path:'/lazyer_resource/core',
    lazyer_static_path:'/lazyer_resource/static_html_resources',
    setConfPath:function (path) {
        this.lazyer_conf_path = path;
    },
    setModulePath:function (path) {
        this.lazyer_module_path = path;
    },
    setBasePath:function (path) {
        this.lazyer_app_base_path = path
    },
    setCorePath:function (path) {
        this.lazyer_core_path = path
    },
    /**
     * 尽量传绝对路径 除非你搞得清楚相对路径的真实位置
     * @param basePath
     * @param confPath
     * @param modulePath
     * @param corePath
     */
    setConf:function(basePath,confPath,modulePath,corePath){
        this.lazyer_app_base_path = basePath;
        this.lazyer_conf_path = confPath;
        this.lazyer_module_path = modulePath;
        this.lazyer_core_path = corePath
    }
}