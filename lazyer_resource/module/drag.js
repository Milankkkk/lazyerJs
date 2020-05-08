var lazyer_drag = {
    isMove:false,
    isOK:false,

    init:function(){
        let _this = this;
        let $ = lazyerJs.$;
        var strHtml = "<div class='drag_bg'></div>" +
            "<div class='drag_text slidetounlock' onselectstart='return false;' unselectable='on'>" +
            "请按住滑块，拖动到最右边</div><div class='handler handler_bg'><i class='fa fa-angle-double-right'></i></div>";
        $("#drag").html(strHtml);
    },

    setDrag:function(){
        let _this = this;
        let $ = lazyerJs.$;
        var x;
        var maxWidth = $('#drag').width() - $('.handler').width();  //能滑动的最大间距
        document.querySelector('.handler').onmousedown=function (e) {
           _this.isMove = true;
           x =  e.pageX - parseInt($('.handler').css('left'), 10);
        }
        document.onmousemove=function (e) {
            var _x = e.pageX - x;
            if(_this.isOK==false){
                if(_this.isMove){
                    if(_x > 0 && _x <= maxWidth){
                        $('.handler').css('left',_x);
                        $('.drag_bg').css('width',_x);
                    }else if(_x>maxWidth){
                        $('.handler').css('left',maxWidth);
                        $('.drag_bg').css('width',maxWidth);
                    }
                }
            }
        }
        document.onmouseup = function (e) {
            _this.isMove = false;
            var _x = e.pageX - x;
            if(_this.isOK==false){
                if(_x < maxWidth){
                    $('.handler').css('left',0);
                    $('.drag_bg').css('width',0);
                }else  if(_x >= maxWidth ){
                    _this.dragOK()
                }
            }
        }
    },

    dragOK:function () {
        let _this = this;
        let $ = lazyerJs.$;
        _this.isOK = true
        $('.handler_bg i').attr('class','fa fa-check-circle').css({'color':'#7ac23c','font-size':'24px'});
        $('.drag_text').removeClass('slidetounlock').text('验证通过').css('color','#fff');
    }

}