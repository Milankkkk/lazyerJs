var lazyer_tailorImg = {
    tailorSise:100, //裁剪框大小
    imgShow:100,  //展示图片大小
    mouseStartX:0,  // 鼠标初始x坐标数值
    mouseStartY:0,  // 鼠标初始y坐标数值
    primitiveLength:{  // 图片原始尺寸记录
        width: 0,
        height: 0
    },
    init:function () {
        let _this = this;
        let $ =  lazyerJs.$;
        var strHtml =" <div id='workAreaBox'><div id='workArea'><div id='overlay'><img id='avatorImg' onload='avatorImgChanged()' alt=''>" +
            "<div id='overlayInnerBg'></div><div id='showBox'  onmousedown='startDrag(event)'><div id='overlayInnerBox'>" +
            "<img id='overlayInnerImg' onload='avatorImgChanged()' alt=''></div><div id='zoom' onmousedown='startZoom(event)'></div>" +
            "</div></div></div><div class='imageInputBox'><input id='imageInput' type='file' hidden onchange='ImageInputChanged(event)'>" +
            "<label class='btn' for='imageInput'>选择图片</label></div></div><div class='showImgBox'><div class='showImgTitle'>预览</div>" +
            "<div class='showImgList'><div class='imgBox1'><img id='imageShow' src='' alt=''><div class='text'></div></div></div></div>"
        $('#tailorImgContainer').html(strHtml);
        $('#showBox').css({
            'width': _this.tailorSise + 'px',
            'height':_this.tailorSise + 'px',
            'top':' calc(50% - ' + _this.tailorSise / 2 + 'px)',
            'left': 'calc(50% - ' + _this.tailorSise / 2 + 'px)'
        })
    },
    setTailor:function () {
        let _this = this;
        let $ =  lazyerJs.$;
        var avatorImg = document.querySelector('#avatorImg');
        var overlay = document.querySelector('#overlay');
        var overlayInnerImg = document.querySelector('#overlayInnerImg');
        var showBox = document.querySelector('#showBox');
        //获取图片数据，并展示
        ImageInputChanged=function (e) {
            _this.tailorSise=100;
            var file = e.target.files[0];
            if(file.size > 1024 * 1024 *3) {
                alert('图片大小不能超过3M!')
                return false;
            }else{
                var reader = new FileReader();
                reader.onload = function(event) {
                    // 赋值给图片展示元素
                    avatorImg.src = event.target.result;
                    overlayInnerImg.src = event.target.result;
                    // 重置样式
                    avatorImg.style.width = 'auto';
                    avatorImg.style.height = 'auto';
                    avatorImg.style.top = 'auto';
                    avatorImg.style.left = 'auto';
                    avatorImg.style.opacity = 0;
                }
                reader.readAsDataURL(file);
            }
        };
        //图片展示区的数据发生变化
        avatorImgChanged=function () {
            $('#showBox').css({
                'width': _this.tailorSise + 'px',
                'height':_this.tailorSise + 'px',
                'top':' calc(50% - ' + _this.tailorSise / 2 + 'px)',
                'left': 'calc(50% - ' + _this.tailorSise / 2 + 'px)'
            })
            // 保存新的图片原始像素值
            _this.primitiveLength = {
                width: avatorImg.offsetWidth,
                height: avatorImg.offsetHeight
            };
            setTimeout(function () {
                if (avatorImg.offsetWidth >= avatorImg.offsetHeight) {
                    overlay.style.width = '100%';
                    overlay.style.height = 'auto';
                    avatorImg.style.width = '100%';
                }
                else {
                    overlay.style.height = '100%';
                    overlay.style.width = 'auto';
                    avatorImg.style.height = '100%';
                }
                avatorImg.style.opacity = 1;
                showBox.style.display='block'
                overlayInnerImg.style.width =  avatorImg.offsetWidth + 'px';
                overlayInnerImg.style.height = avatorImg.offsetHeight + 'px';
                overlayInnerImg.style.top = -showBox.offsetTop +  'px';
                overlayInnerImg.style.left = -showBox.offsetLeft +  'px';
                $('.imgBox1 .text').text(_this.imgShow + 'px x ' + _this.imgShow + 'px');
                _this.tailor()
            },100)
        };
        //监测鼠标点击，开始缩放
        startZoom=function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (avatorImg.src) {
                // 记录鼠标初始位置
                _this.mouseStartX = e.clientX;
                _this.mouseStartY = e.clientY;
                // 添加鼠标移动以及鼠标点击松开事件监听
                $(document).mousemove(function (event) {
                    _this.zooming(event)
                }).mouseup(function () {
                    $(document).unbind('mousemove');
                })
            }
        };
        //监测鼠标点击，开始拖拽
        startDrag=function (e) {
            e.preventDefault();
            // 记录鼠标初始位置
            _this.mouseStartX = e.clientX;
            _this.mouseStartY = e.clientY;
            // 添加鼠标移动以及鼠标点击松开事件监听
            $("#overlay").mousemove(function (event) {
                _this.dragging(event)
            }).mouseup(function () {
                $("#overlay").unbind('mousemove');
            })
        };
    },
    zooming:function (e) {
        //放大缩小裁剪框
        let _this = this;
        let $ =  lazyerJs.$;
        var showBox = document.querySelector('#showBox');
        var avatorImg = document.querySelector('#avatorImg');
        var avatorImgWidth = avatorImg.offsetWidth;
        var avatorImgHeight = avatorImg.offsetHeight;
        if(e.clientX <= _this.mouseStartX){
            if(_this.tailorSise <= 20) return
            _this.tailorSise = _this.tailorSise - 2;
            _this.mouseStartX = e.clientX;
            _this.resize();
        }else {
            if (avatorImgWidth >= avatorImgHeight) {
                if((showBox.offsetTop + showBox.offsetHeight) >= avatorImgHeight){
                    return;
                }else if(showBox.offsetLeft + showBox.offsetHeight >= avatorImgWidth){
                    return;
                }else{
                    _this.tailorSise = _this.tailorSise + 2;
                    _this.mouseStartX = e.clientX;
                    _this.resize();
                }
            } else {
                if(showBox.offsetLeft + showBox.offsetHeight >= avatorImgWidth){
                    return;
                }else if(showBox.offsetTop + showBox.offsetHeight >= avatorImgHeight) {
                    return;
                }else{
                    _this.tailorSise = _this.tailorSise + 2;
                    _this.mouseStartX = e.clientX;
                    _this.resize();
                }
            }
        }
    },
    resize:function () {
        if(this.tailorSise < 20) return
        //修改裁剪框大小
        let _this = this;
        let $ =  lazyerJs.$;
        $('#showBox').css({
            'width': _this.tailorSise + 'px',
            'height':_this.tailorSise + 'px',
        })
        _this.tailor()
    },
    dragging:function (e) {
        //拖拽裁剪框
        let _this = this;
        let $ =  lazyerJs.$;
        var avatorImg = document.querySelector('#avatorImg');
        var showBox = document.querySelector('#showBox');
        var overlayInnerImg = document.querySelector('#overlayInnerImg');
        // X轴
        let _moveX = showBox.offsetLeft + e.clientX - _this.mouseStartX;
        if (_moveX >= 0 && _moveX <= avatorImg.offsetWidth - showBox.offsetWidth) {
            showBox.style.left = _moveX + 'px';
            overlayInnerImg.style.left = -_moveX + 'px';
        } else if(_moveX < 0){
            showBox.style.left = '0';
            overlayInnerImg.style.left = '0';
        }else{
            showBox.style.left = (avatorImg.offsetWidth - showBox.offsetWidth) + 'px';
            overlayInnerImg.style.left = -(avatorImg.offsetWidth - showBox.offsetWidth) + 'px';
        }
        _this.mouseStartX = e.clientX;
        // Y轴
        let _moveY = showBox.offsetTop + e.clientY - _this.mouseStartY;
        if (_moveY >= 0 && _moveY <= avatorImg.offsetHeight - showBox.offsetHeight) {
            showBox.style.top = _moveY + 'px';
            overlayInnerImg.style.top = -_moveY + 'px';
        } else if(_moveY < 0){
            showBox.style.top = '0';
            overlayInnerImg.style.top = '0';
        }else{
            showBox.style.top = (avatorImg.offsetHeight - showBox.offsetHeight) + 'px';
            overlayInnerImg.style.top = -(avatorImg.offsetHeight - showBox.offsetHeight) + 'px';
        }
        _this.mouseStartY = e.clientY;
        _this.tailor()
    },
    tailor:function () {
        let _this = this;
        let $ =  lazyerJs.$;
        var avatorImg = document.querySelector('#avatorImg');
        var showBox = document.querySelector('#showBox');
        var imageShow = document.querySelector('#imageShow');
        //裁剪
        let _tailorCanvas = document.createElement('canvas');
        // 计算边长
        let _side = (_this.tailorSise / avatorImg.offsetWidth) * _this.primitiveLength.width;
        _tailorCanvas.width = _side;
        _tailorCanvas.height = _side;
        let _sy = showBox.offsetTop / avatorImg.offsetHeight * _this.primitiveLength.height;
        let _sx = showBox.offsetLeft / avatorImg.offsetWidth * _this.primitiveLength.width;
        // 绘制图片
        _tailorCanvas.getContext('2d').drawImage(avatorImg, _sx, _sy, _side, _side, 0, 0, _side, _side);
        // 保存图片信息
        let _lastImageData = _tailorCanvas.toDataURL(_this.tailorImgType);
        // 将裁剪出来的信息展示
        imageShow.src = _lastImageData;
        imageShow.style.width = _this.imgShow  + 'px';
        imageShow.style.height = _this.imgShow  + 'px';
    }

}