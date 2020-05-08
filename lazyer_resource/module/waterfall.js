var lazyer_waterfall = {
    colCount:0,   //列数
    imgMargin:10, //每列图片之间的距离
    imgWidth:100 + 10,  //图片宽度 + 每列图片之间的距离
    colHeightArray:[],  //列高度数组
    defaultDivId:'waterfall',
    interval:0,
    /**
     * 设置默认div
     * @param idStr
     */
    setDefaultDivId:function(idStr){
        this.defaultDivId = idStr;
    },
    /**
     * 实例化
     * @param divId
     */
    init:function(divId=null){
        let _this = this;
        if(divId==null){
            if(typeof lazyerJs.conf['waterfall'].defaultDivId !== "undefined"){
                _this.defaultDivId = lazyerJs.conf['waterfall'].defaultDivId;
            }
        }else{
            _this.defaultDivId = divId;
        }
    },
    /**
     * 获取div内img宽度
     * @param callback
     */
    runAutoWidthFunc:function(callback){
        let _this = this;
        let $ =  lazyerJs.$;
        $(document).ready(function () {
            $('#waterfall img').css('width',(_this.imgWidth - _this.imgMargin) + 'px');
            // _this.imgWidth = $(`#${_this.defaultDivId} img`).outerWidth(true);
            _this.colCount = parseInt($(`#${_this.defaultDivId}`).width() / _this.imgWidth);
            var windowWidth = $(window).width();
            $('#waterfall').css('margin-left',(windowWidth - _this.colCount*_this.imgWidth)/2 + 'px')
            for(let i = 0 ; i < _this.colCount; i ++){
                _this.colHeightArray[i] = 0
            }
            callback()
        })
    },
    runImgLoaddingLogic:function(){
        let _this = this;
        let $ =  lazyerJs.$;
        let imgList = $(`#${_this.defaultDivId} img`);
        imgList.attr('onload',function () {
            let minValue = _this.colHeightArray[0];  //定义最小的高度
            let minIndex = 0;  //定义最小高度的下标
            for(let i = 0 ; i < _this.colCount;i ++){
                if(_this.colHeightArray[i] < minValue){
                    minValue = _this.colHeightArray[i];
                    minIndex = i ;
                }
            }
            $(this).css({
                left: minIndex * _this.imgWidth,
                top: minValue
            });
            _this.colHeightArray[minIndex] += $(this).outerHeight(true)
        });
        if(typeof lazyerJs.conf['waterfall'].windowOnLoadImgReSet !== "undefined" &&lazyerJs.conf['waterfall'].windowOnLoadImgReSet === true) {
            lazyerJs.addSystemServiceDo('waterfallReset',function () {
                _this.reset();
            });
            clearInterval( _this.interval );
            _this.interval = setInterval(function () {
                _this.reset();
            },100)
        }
    },
    setWaterfall:function () {
        let _this = this;
        let $ = lazyerJs.$;
        _this.runAutoWidthFunc(function () {
            _this.runImgLoaddingLogic()
        });
        if(typeof lazyerJs.conf['waterfall'].windowOnChangeReSet !== "undefined" &&lazyerJs.conf['waterfall'].windowOnChangeReSet === true){
            window.onresize=function(){
                _this.reset();
                _this.start();
            };
            window.onscroll=function () {
                _this.start()
                _this.isOver()
            }
        }
        _this.start();
    },
    reset:function () {
        let _this = this;
        let $ =  lazyerJs.$;
        _this.colHeightArray= [];
        let mainDiv = $(`#${_this.defaultDivId}`);
        let img = $(`#${_this.defaultDivId} img`);
        // _this.imgWidth = img.outerWidth(true);
        let colCount = mainDiv.width() / _this.imgWidth;
        _this.colCount = parseInt(colCount*1);
        for(let i = 0 ; i < _this.colCount; i ++){
            _this.colHeightArray[i] = 0
        }
        img.each(function(){
            let minValue = _this.colHeightArray[0]
            let minIndex = 0;
            for(let i = 0 ; i < _this.colCount; i ++){
                if(_this.colHeightArray[i] < minValue){
                    minValue = _this.colHeightArray[i];
                    minIndex = i
                }
            }
            $(this).css({
                left: minIndex * _this.imgWidth,
                top: minValue
            });
            _this.colHeightArray[minIndex] += $(this).outerHeight(true)
        })
        var windowWidth = $(window).width();
        $('#waterfall').css('margin-left',(windowWidth - _this.colCount*_this.imgWidth)/2 + 'px')
    },
    start:function () {
        let _this = this;
        let $ =  lazyerJs.$;
        let img = $(`#${_this.defaultDivId} img`);
        img.each(function () {
            let imgSon = $(this);
            if(imgSon.not('[data-isLoaded]').length == 1){
                if( _this.isShow(imgSon) ){
                    _this.loadImg(imgSon)
                }
            }
        })

    },
    isOver:function(){
        let _this = this;
        let $ =  lazyerJs.$;
        let wind = $(window);
        let now = wind.height() + wind.scrollTop()
        if(now+400>_this.getPageSize().PageH){
            _this.isOverRun();
            _this.setWaterfall();
        }
    },
    isOverRun:function(){

    },
    setPageIsOver:function(func){
        if(typeof func === 'function') this.isOverRun = func
    },
    getPageSize:function () {
        let scrW, scrH;
        if(window.innerHeight && window.scrollMaxY) {
            // Mozilla
            scrW = window.innerWidth + window.scrollMaxX;
            scrH = window.innerHeight + window.scrollMaxY;
        } else if(document.body.scrollHeight > document.body.offsetHeight){
            // all but IE Mac
            scrW = document.body.scrollWidth;
            scrH = document.body.scrollHeight;
        } else if(document.body) { // IE Mac
            scrW = document.body.offsetWidth;
            scrH = document.body.offsetHeight;
        }
    
        let winW, winH;
        if(window.innerHeight) { // all except IE
            winW = window.innerWidth;
            winH = window.innerHeight;
        } else if (document.documentElement
            && document.documentElement.clientHeight) {
            // IE 6 Strict Mode
            winW = document.documentElement.clientWidth;
            winH = document.documentElement.clientHeight;
        } else if (document.body) { // other
            winW = document.body.clientWidth;
            winH = document.body.clientHeight;
        }
    
        // for small pages with total size less then the viewport
        let pageW = (scrW<winW) ? winW : scrW;
        let pageH = (scrH<winH) ? winH : scrH;

        return {PageW:pageW, PageH:pageH, WinW:winW, WinH:winH};
    },
    isShow:function (e) {
        let $ =  lazyerJs.$;
        let wind = $(window);
        return e.offset().top <= wind.height() + wind.scrollTop()
    },
    loadImg:function (img) {
        //setTimeout模拟延迟 测试效果用，实际环境不要加
        img.attr('src', img.attr('data-src'))
        img.attr('data-isLoaded',1)
    }

}