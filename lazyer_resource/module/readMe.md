# 编写模块须知
- 模块文件名无需带有xx字样 但内部全局参数变量命前缀必须添加lazyer字样
> 如pageHelp.js 内 注册全局变量命为lazyer_pageHelp
- 模块的配置文件等于模块名+ '_conf'后缀的js文件
> 如pageHelp_conf.js 内部的全局变量名一样为 
> 配置文件名+lazyer_前缀 ：lazyer_pageHelp_conf
> 模块的配置文件 如若需要加载 css 请填写cssPath
>- 静态资源文件
>静态资源文件存放于总配置文件的
>lazyer_static_path/模块名/目录
>自动加载 配置文件
>cssPath:
>lazyerJs.conf.lazyer_app_base_path+lazyerJs.conf.lazyer_static_path+'/模块名/css.css'