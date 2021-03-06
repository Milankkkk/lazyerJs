var lazyer_pageHelp = {
    nowPage:1,
    pageStr:'',
    rowSize:8,
    dataSize:0,
    setNowPage:function (page) {
        this.nowPage = page
    },
    getNowPage:function () {
        return this.nowPage
    },
    getPageStr:function () {
        return this.pageStr
    },
    setDataSize:function (size) {
        this.dataSize = size
    },
    setRowSize:function (size) {
        this.rowSize = size
    },
    doRender:function (hrefCallback=null,onclickCallbacl=null) {
        let _this = this;
        _this.pageStr = '';
        if (Math.floor(_this.dataSize / _this.rowSize) == 0) {
            _this.pageStr += '<p class="active-pages">1</p>';
        } else {
            let start = 1;
            let tempHref = '';
            let tempOnClick = '';
            let max = Math.round(_this.dataSize / _this.rowSize);
            if (_this.nowPage - 1 > 1) {
                start = _this.nowPage - 1;
            }
            function renderShowStr(page) {
                if(typeof hrefCallback== "function"){
                    tempHref = hrefCallback(page)
                }else{
                    tempHref ="?page=" + page;
                }
                if (typeof onclickCallbacl == "function") {
                    tempOnClick = onclickCallbacl(page);
                }
            }
            if (_this.nowPage > 1) {
                let pre = _this.nowPage - 1;
                renderShowStr(1)
                _this.pageStr += "<a class='pagePreClass' onclick='"+tempOnClick+"' href=\""+tempHref+"\" ><div>首页</div></a>";
                renderShowStr(pre)
                _this.pageStr += "<a class='pagePreClass' onclick='"+tempOnClick+"' href=\""+tempHref+"\" ><div>上一页</div></a>";
            }

            if (_this.nowPage > 2) {
                _this.pageStr += "<p class='moveClass'>...</p>";
            }

            let count = 0;
            for (let i = start; i <= max; i++) {
                let av = '';
                if (i == _this.nowPage) av = 'active-pages';
                count++;
                if (count > 3) {
                    _this.pageStr += "<p class='moveClass'>...</p>";
                    break;
                }
                renderShowStr(i)
                _this.pageStr += "<a  onclick='"+tempOnClick+"' href=\""+tempHref+"\"> <p class='pageList " + av + "'>" + i + "</p></a>";
            }
            if (max - start >= 3) {
                renderShowStr(max)
                _this.pageStr += "<a  onclick='"+tempOnClick+"' href=\""+tempHref+"\" ><p class='pageList'>" + max + "</p></a>";
            }
        }
        return '<div class="pages">'+_this.getPageStr()+'</div>'
    }
};