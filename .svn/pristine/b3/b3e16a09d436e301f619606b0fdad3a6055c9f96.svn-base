/**
 * @author cpx
 * @type {{count: number, pageStr: string, slideIndex: number, setCarousel: lazyer_carousel.setCarousel}}
 */
var lazyer_carousel = {
    count:0,    //轮播图数量
    pageStr:'',
    slideIndex:0,   //当前索引
    /**
     * 备注用这个形式
     * @param carouselWhite 轮播图宽度
     * @param carouselHeight  轮播图高度
     * @param pagSize   分页器大小
     * @param iconSize  左右按钮大小
     */
    setCarousel:function(carouselWhite=null,carouselHeight=300,pagSize=10,iconSize=50){
        let _this = this;
        let $ =  lazyerJs.$;
        let left = 0;
        let index = 0;
        //设置默认宽度
        if(carouselWhite==null){
            carouselWhite = document.body.clientWidth
        }

        //获取轮播图数量
        _this.count = $('.carousel-slide').siblings().length;


        //设置轮播图大小
        $('.carousel-container,.carousel-slide').css({width:carouselWhite + 'px',height:carouselHeight + 'px'});
        $('.carousel-wrapper').css("width",carouselWhite * ( _this.count) + "px");



        //添加分页器
        _this.pageStr = "<ul>";
        for (let i = 0; i < _this.count;i++){
            _this.pageStr += "<li class='pagination"+ i + "'  onclick='onPagination("+ i +")'></li>";
        }
        _this.pageStr += '</ul>';
        $('.carousel-pagination').html(_this.pageStr);
        $('.carousel-pagination ul li').css({width:pagSize,height: pagSize});
        $('.pagination0').attr('class','pagination0 pagination-cur');



        //分页器点击事件
         onPagination = function(i){
            console.log(i)
             $('.carousel-slide').each(function () {
                 $(this).css('transform', 'translateX(-'  + carouselWhite * i  + 'px)')
             })
             $('.carousel-pagination ul li').each(function (index) {
                 $(this).attr('class', 'pagination' + index)
             })
             $('.pagination' + i).attr('class', 'pagination' + i + ' pagination-cur')
             index = i
        }


        //获取配置文件    lazyerJs.conf['carousel']
        // 自动滚动    #Todo carouselTime 需要绑定到 lazyerJs 变量上 如 lazyerJs.carousel.interval 上 方便后期操作
        let carouselTime = setInterval(function () {
            if (left >= (carouselWhite * (_this.count - 1))){
                //old
                // clearInterval(carouselTime);
                //code by yzy
                left = -carouselWhite;
                index = 0;
                $('.carousel-slide').each(function () {
                    $(this).css('transform', 'translateX(-' + Number(left + carouselWhite)  + 'px)')
                })
                left = 0;
                $('.carousel-pagination ul li').each(function (index) {
                    $(this).attr('class','pagination'+index)
                })
                $('.pagination'+index).attr('class','pagination' + index + ' pagination-cur')
                //end
            }else{
                $('.carousel-slide').each(function () {
                    $(this).css('transform', 'translateX(-' + Number(left + carouselWhite)  + 'px)')
                })
                left += carouselWhite;
                index +=1;
                $('.carousel-pagination ul li').each(function (index) {
                    $(this).attr('class','pagination'+index)
                })
                $('.pagination'+index).attr('class','pagination' + index + ' pagination-cur')
            }
            _this.slideIndex = index
            }, lazyerJs.conf['carousel'].carouselTime)



        //判断鼠标左右滑动事件
        let carousel = document.getElementsByClassName("carousel-container")[0];
        carousel.onmousedown=function(e){
            _this.slideIndex = index
            clearInterval(carouselTime);
            let screenX1=e.screenX;
            carousel.onmouseup=function (e){
                let screenX2=e.screenX;
                if(screenX1>screenX2){
                    console.log("左滑啊")
                    if(index < _this.count - 1  ){
                        index +=1;
                        _this.slideIndex = index
                        $('.carousel-slide').each(function () {
                            $(this).css('transform', 'translateX(-'  + carouselWhite * index  + 'px)')
                        })
                        $('.carousel-pagination ul li').each(function (index) {
                            $(this).attr('class','pagination'+index)
                        })
                        $('.pagination'+index).attr('class','pagination' + index + ' pagination-cur')
                    }
                }
                if(screenX1<screenX2){
                    console.log("右滑啊")
                    if(index < _this.count  && index > 0){
                        index -=1;
                        _this.slideIndex = index
                        $('.carousel-slide').each(function () {
                            $(this).css({
                                'transform': 'translateX(-' + (carouselWhite * index)  + 'px)'})
                        })
                        if(index == -1){
                            $('.carousel-pagination ul li').each(function (index) {
                                $(this).attr('class','pagination'+index)
                            })
                            $('.pagination0').attr('class','pagination0 pagination-cur')
                        }else {
                            $('.carousel-pagination ul li').each(function (index) {
                                $(this).attr('class', 'pagination' + index)
                            })
                            $('.pagination' + index).attr('class', 'pagination' + index + ' pagination-cur')
                        }
                    }
                }
            }
        }


       //设置左右按钮大小
        $('.carousel-button-prev').append("<i class='fa fa-angle-left'></i>")
        $('.carousel-button-next').append("<i class='fa fa-angle-right'></i>")
        $('.fa').css('font-size',iconSize + 'px');
        $('.carousel-button-prev,.carousel-button-next').css('top','calc(50% - '+ iconSize/2  +'px)');


       //左右按钮点击事件
        $('.carousel-button-prev').attr('onclick','onPrev()')
        $('.carousel-button-next').attr('onclick','onNext()')
        onPrev=function () {
            if(index < _this.count  && index > 0){
                index -=1;
                _this.slideIndex = index
                $('.carousel-slide').each(function () {
                    $(this).css({
                        'transform': 'translateX(-' + (carouselWhite * index)  + 'px)'})
                })
                if(index == -1){
                    $('.carousel-pagination ul li').each(function (index) {
                        $(this).attr('class','pagination'+index)
                    })
                    $('.pagination0').attr('class','pagination0 pagination-cur')
                }else {
                    $('.carousel-pagination ul li').each(function (index) {
                        $(this).attr('class', 'pagination' + index)
                    })
                    $('.pagination' + index).attr('class', 'pagination' + index + ' pagination-cur')
                }
            }
        }
        onNext=function () {
            if(index < _this.count - 1  ){
                index +=1;
                _this.slideIndex = index
                $('.carousel-slide').each(function () {
                    $(this).css('transform', 'translateX(-'  + carouselWhite * index  + 'px)')
                })
                $('.carousel-pagination ul li').each(function (index) {
                    $(this).attr('class','pagination'+index)
                })
                $('.pagination'+index).attr('class','pagination' + index + ' pagination-cur')
            }
        }
    },

}