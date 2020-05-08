var lazyer_uploadImg = {
    imgLength: 1,   //图片最大1MB
    imgMaxCount: 4,  //最多选中图片张数
    upImgCount: 0,   //上传图片张数记录
    // imgAjaxPath: 'http://xxx.cn',  //异步传输服务端位置
    imgAjaxPath: 'http://zztdw.cn/abcd.php?yzy=1',  //异步传输服务端位置
    setImgAjaxUrl: function (url) {
        this.imgAjaxPath = url
    },
    setUploadImg: function () {
        let _this = this;
        let $ = lazyerJs.$;
        //打开文件选择对话框
        $('#imgFiles').attr('onclick', 'imgFiles()');
        imgFiles = function () {
            if ($(".lookimg").length > _this.imgMaxCount - 1) {
                alert("一次最多上传" + _this.imgMaxCount + "张图片");
                return;
            }
            let creFile = document.createElement("input");
            if ($(".imgfile").length <= $(".lookimg").length) {//个数不足则新创建对象
                creFile.setAttribute("type", "file");
                creFile.setAttribute("class", "imgfile");
                creFile.setAttribute("accept", ".png,.jpg,.jpeg");
                creFile.setAttribute("num", _this.upImgCount);//记录此对象对应的编号
                creFile.setAttribute("onchange", "imfileChange(this)");//记录此对象对应的编号
                $("#imgFiles").after(creFile);
            }
            else { //否则获取最后未使用对象
                creFile = $(".imgfile").eq(0).get(0);
            }
            return $(creFile).click();//打开对象选择框
        };

        imfileChange = function (e) {
            if ($(e).val().length > 0) {//判断是否有选中图片
                // 判断图片格式是否正确
                let format = $(e).val().substr($(e).val().length - 3, 3);
                if (format != "png" && format != "jpg" && format != "peg") {
                    alert("文件格式不正确！！！");
                    return;
                }
                //判断图片是否过大，当前设置1MB
                let file = e.files[0];//获取file文件对象
                if (file.size > (_this.imgLength * 1024 * 1024)) {
                    alert("图片大小不能超过" + _this.imgLength + "MB");
                    $(e).val("");
                    return;
                }
                //创建预览外层
                let prevdiv = document.createElement("div");
                prevdiv.setAttribute("class", "lookimg");
                //创建内层img对象
                let preview = document.createElement("img");
                $(prevdiv).append(preview);
                //创建删除按钮
                let imgDelbth = document.createElement("img");
                imgDelbth.setAttribute("class", "lookimgDelBtn");
                imgDelbth.setAttribute("onclick", "lookimgDelBtn(this)");
                imgDelbth.setAttribute("src", "./lazyer_resource/images/upLoadImg/close.jpg");
                $(prevdiv).append(imgDelbth);
                //记录此对象对应编号
                prevdiv.setAttribute("num", $(e).attr("num"));
                //对象注入界面
                $("#imgLook").children("div:last").before(prevdiv);
                _this.upImgCount++;//编号增长防重复
                //预览功能 start
                let reader = new FileReader();//创建读取对象
                reader.onloadend = function () {
                    preview.src = reader.result;//读取加载，将图片编码绑定到元素
                }
                if (file) {//如果对象正确
                    reader.readAsDataURL(file);//获取图片编码
                } else {
                    preview.src = "";//返回空值
                }
                //预览功能 end
            }
        };

        //删除选中图片
        lookimgDelBtn = function (e) {
            $(".imgfile[num=" + $(e).parent().attr("num") + "]").remove();//移除图片file
            $(e).parent().remove();//移除图片显示
        };

        //确定上传按钮
        $('#ImgUpStartBtn').attr('onclick', 'ImgUpStartBtn()');
        ImgUpStartBtn = function () {
            if ($(".lookimg").length <= 0) {
                alert("还未选择需要上传的图片");
                return;
            }
            if ($(".lookimg[ISUP=1]").length == $(".lookimg").length) {
                alert("图片已全部上传完毕！");
                return;
            }
            //循环所有已存在的图片对象，准备上传
            for (let i = 0; i < $(".lookimg").length; i++) {
                let nowlook = $(".lookimg").eq(i);//当前操作的图片预览对象
                nowlook.index = i;
                //如果当前图片已经上传，则不再重复上传
                if (nowlook.attr("ISUP") == "1") {
                    // alert("第"+(i+1)+"张图片已经上传!")
                } else {
                    //上传图片准备
                    let imgBase = nowlook.children("img").eq(0).attr("src"); //要上传的图片的base64编码
                    let imgInd = nowlook.attr("num");
                    let imgRoute = $(".imgfile[num=" + imgInd + "]").eq(0).val();//获取上传图片路径，为获取图片类型使用
                    let imgEndfour = imgRoute.substr(imgRoute.length - 4, 4);//截取路径后四位，判断图片类型
                    let imgFomate = "jpeg"; //图片类型***
                    if (imgEndfour.trim() == ".jpg") {
                        imgFomate = "jpg";
                    } else if (imgEndfour.trim() == ".png") {
                        imgFomate = "png";
                    }
                    //图片正式开始上传
                    $.ajax({
                        type: "POST",
                        url: _this.imgAjaxPath,
                        data: {'imgBase': imgBase, 'imgFormat': imgFomate, 'lookIndex': nowlook.index},//图片base64编码，图片格式（当前仅支持jpg,png,jpeg三种），图片对象索引
                        dataType: "json",
                        success: function (data) {
                            if(data.code == '200'){
                                $(".lookimg").eq(imgInd).attr("ISUP", "1");//记录此图片已经上传
                                alert("第"+(nowlook.index+1)+"张图片上传成功!")
                            }
                        },
                        error: function (err) {
                            //服务器连接失败报错处理
                            alert("error");
                        }
                    });
                }
            }
        }
    }
};