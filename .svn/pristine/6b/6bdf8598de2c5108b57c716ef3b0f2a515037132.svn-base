var lazyer_date = {
    newDate:new Date(),
    nYear:new Date().getFullYear(),
    nMon:new Date().getMonth(),
    yVal:'',
    mVal:'',
    dVal:'',
    mDay:'',
    inputV:false,

    init:function () {
        let _this = this;
        let $ = lazyerJs.$;
        var dateHtml="<div id='dateInputBox'><i class='fa fa-calendar'></i><input type='text' id='dateInput' placeholder='选择日期'></div>" +
            "<div id='dateBox'><div id='date-header'><div id='date-header-left'><div class='prevY'><i class='fa fa-angle-double-left' onclick='prevYBtn()'></i></div>" +
            "<div class='prevM'><i class='fa fa-angle-left'  onclick='prevMBtn()'></i></div></div><div id='date-centre'>" +
            "<div class='yearBox'><span class='date-year'></span>年</div><div class='monBox'><span class='date-mon'></span>月</div></div>" +
            "<div id='date-header-right'><div class='nextM'><i class='fa fa-angle-right' onclick='nextMBtn()'></i></div>" +
            "<div class='nextY'><i class='fa fa-angle-double-right' onclick='nextYBtn()'></i></div></div></div>" +
            "<table id='date-table'><thead><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></thead>" +
            "<tbody></tbody></table><i class='arrow'></i></div>"
        $('#date').html(dateHtml);
        let newDate = _this.newDate;
        let newYear = newDate.getFullYear();
        let newMon = newDate.getMonth();
        let newDay = newDate.getDate();
        let monArr = new Array("1","2","3","4","5","6","7","8","9","10","11","12");
        //获取每个月的第一天是周几
        let zhou = new  Date(newYear,newMon,1).getDay();
        //获取每个月的天数
        let days = new Date(newYear, newMon + 1, -1).getDate() + 1;
        $('.date-year').html(newYear);
        $('.date-mon').html(monArr[newMon])
        //上个月总天数
        let prevMCount = new Date(newYear, newMon , -1).getDate() + 1;
        //下个月总天数
        let nextMCount = new Date(newYear, newMon + 2 , -1).getDate() + 1;
        let numHtml = '<tr>';
        if(zhou ==0){
            for (let i = prevMCount-6; i <= prevMCount; i++) {
                numHtml += '<td class="date-grey">' + i +'</td>';
            }
            numHtml += '</tr><tr>';
            for (var i = 1 ; i <= 7;i++){
                if(i == newDay  && _this.nYear == newYear && _this.nMon == newMon){
                    numHtml += "<td class='date-hover date-active'>"+ i +"</td>";
                }else{
                    numHtml += "<td class='date-hover'>"+ i +"</td>";
                }
            }
            numHtml += '</tr>';
        }else{
            for (let i = prevMCount-zhou+1; i <= prevMCount; i++) {
                numHtml += '<td class="date-grey">'+i+'</td>';
            }
            for (var i = 1 ; i <= (7-zhou);i++){
                if(i == newDay && _this.nYear == newYear && _this.nMon == newMon){
                    numHtml += "<td class='date-hover date-active'>"+ i +"</td>";
                }else{
                    numHtml += "<td class='date-hover'>"+ i +"</td>";
                }
            }
        }
        numHtml += '</tr>';
        for(var k = 0; k < 5;k++){
            numHtml += '<tr>';
            for (var i = (8-zhou)+7*k;i <= (14-zhou)+7*k;i++ ){
                if(i<=days){
                    if(i == newDay && _this.nYear == newYear && _this.nMon == newMon){
                        numHtml += "<td class='date-hover date-active'>" + i+"</td>";
                    }else{
                        numHtml += "<td class='date-hover'>"+i+"</td>";
                    }
                }
            }
            numHtml += '</tr>';
        }
        $('tbody').html(numHtml);
        setTimeout(function () {
            var fiveCount = $('#date-table tbody tr:nth-of-type(5) td').length;
            var sixCount = $('#date-table tbody tr:nth-of-type(6) td').length;
            if(fiveCount <7){
                var fiveHtml = '';
                for (let i = 1; i <= 7-fiveCount; i++) {
                    fiveHtml += '<td class="date-grey">'+i+'</td>';
                }
                $('#date-table tbody tr:nth-of-type(5)').append(fiveHtml)
                var sixHtml = '';
                for (let i = 8-fiveCount; i <= 14-fiveCount; i++) {
                    sixHtml += '<td class="date-grey">'+i+'</td>';
                }
                $('#date-table tbody tr:nth-of-type(6)').append(sixHtml)
            }else if (fiveCount == 7 && sixCount==0){
                var sixHtml = '';
                for (let i = 1; i <= 7; i++) {
                    sixHtml += '<td class="date-grey">'+i+'</td>';
                }
                $('#date-table tbody tr:nth-of-type(6)').append(sixHtml)
            }else if(fiveCount ==7 && sixCount>0){
                var sixHtml = '';
                for (let i = 1; i <= 7-sixCount; i++) {
                    sixHtml += '<td class="date-grey">'+i+'</td>';
                }
                $('#date-table tbody tr:nth-of-type(6)').append(sixHtml)
            }
        },100)
        $('#dateBox').hide();
        $('.date-hover').click(function () {
            $('td').removeClass('date-active-cur');
            $(this).addClass('date-active-cur');
            _this.yVal = $('.date-year').text();
            _this.mVal = $('.date-mon').text();
            _this.dVal = $(this).text();
            if(_this.mVal < 10){
                _this.mVal = '0' + _this.mVal
            }
            if(_this.dVal < 10){
                _this.dVal = '0' + _this.dVal
            }
            var dateVal = _this.yVal+'-'+_this.mVal+'-'+_this.dVal
            $('#dateInput').val(dateVal)
            $('#dateBox').hide();
        })
        $('#dateInput').on('focus',function () {
            $('#dateInput').css('border','1px solid #409eff');
            $('#dateInput').unbind('mouseenter').unbind('mouseleave');
            $('#dateBox').show();
        })
        $('#dateInput').on('blur',function (event) {
            $('#dateInput').css('border','1px solid #E0DDE0');
            $('#dateInput').hover(function () {
                $('#dateInput').css('border','1px solid #c6c3c6');
            },function () {
                $('#dateInput').css('border','1px solid #E0DDE0');
            })
            if($('#dateInput').val().split('-').length == 3){
                var yVal = $('#dateInput').val().split('-')[0].replace(/\b(0+)/gi,"")
                var mVal = $('#dateInput').val().split('-')[1].replace(/\b(0+)/gi,"")
                var dVal = $('#dateInput').val().split('-')[2].replace(/\b(0+)/gi,"")
                if(yVal.length ==4){
                    if(yVal[0] ==0){
                        _this.clearInput()
                    }else{
                        _this.yVal = yVal
                        if(mVal>0 && mVal<=12){
                            if (mVal<10){
                                _this.mVal = '0' + mVal ;
                            }else{
                                _this.mVal =  mVal ;
                            }
                            if(_this.inputV){
                                if(dVal>0 && dVal<=_this.mDay){
                                    if(dVal < 10){
                                        _this.dVal = '0' + dVal;
                                    }else{
                                        _this.dVal =  dVal;
                                    }
                                    $('#dateInput').val(_this.yVal + '-' + _this.mVal + '-' + _this.dVal)
                                    _this.newDate.setFullYear(yVal);
                                    _this.newDate.setMonth(mVal-1);
                                    setTimeout(function () {
                                        _this.setPublic(event)
                                        $('.date-hover').each(function () {
                                            if($(this).text() == dVal){
                                                $('td').removeClass('date-active-cur');
                                                $(this).addClass('date-active-cur');
                                            }
                                        })
                                        $('#dateBox').hide();
                                    },100)
                                    _this.inputV = false
                                }else{
                                    _this.clearInput()
                                }
                            }else{
                                return
                            }
                        }else {
                            _this.clearInput()
                        }
                    }
                }else{
                    _this.clearInput()
                }
            }else{
                _this.clearInput()
            }
        })
        $('#dateInput').on('input',function () {
            var yVal = $('#dateInput').val().split('-')[0].replace(/\b(0+)/gi,"")
            var mVal = $('#dateInput').val().split('-')[1].replace(/\b(0+)/gi,"")
            _this.mDay = new Date(yVal, mVal, -1).getDate() + 1;
            _this.inputV = true
        })
        $(document).click(function () {
            $('#dateBox').hide();
        });
        $("#dateBox,#dateInput").on("click", function (event) {
            //取消事件冒泡
            var e = arguments.callee.caller.arguments[0] || event; //若省略此句，下面的e改为event，IE运行可以，但是其他浏览器就不兼容
            if (e && e.stopPropagation) {
                // this code is for Mozilla and Opera
                e.stopPropagation();
            } else if (window.event) {
                // this code is for IE
                window.event.cancelBubble = true;
            }
        });
    },
    setDate:function () {
        let _this = this;
        let $ = lazyerJs.$;
        prevMBtn=function (event) {
            _this.newDate.setMonth(_this.newDate.getMonth() - 1);
            _this.setPublic(event)
        };
        nextMBtn=function (event) {
            _this.newDate.setMonth(_this.newDate.getMonth() + 1);
            _this.setPublic(event)
        };
        prevYBtn=function (event) {
            _this.newDate.setFullYear(_this.newDate.getFullYear() - 1);
            _this.setPublic(event)
        };
        nextYBtn=function (event) {
            _this.newDate.setFullYear(_this.newDate.getFullYear() + 1);
           _this.setPublic(event)
        };
    },
    setPublic:function (event) {
        let _this = this;
        let $ = lazyerJs.$;
        _this.init();
        if(_this.yVal != ''){
            var dateVal = _this.yVal+'-'+_this.mVal+'-'+_this.dVal
            $('#dateInput').val(dateVal)
            var yHtml = $('.date-year').text()
            var mHtml = $('.date-mon').text()
            if(yHtml == _this.yVal && mHtml == _this.mVal.replace(/\b(0+)/gi,"")){
                $('.date-hover').each(function () {
                    if($(this).text() == _this.dVal.replace(/\b(0+)/gi,"")){
                        $('td').removeClass('date-active-cur');
                        $(this).addClass('date-active-cur');
                    }
                })
            }
        }
        $('#dateBox').show();
        var e = arguments.callee.caller.arguments[0] || event;
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else if (window.event) {
            window.event.cancelBubble = true;
        }
    },
    clearInput:function () {
        let _this = this;
        let $ = lazyerJs.$;
        $('#dateInput').val('');
        _this.yVal = '';
        _this.mVal = '';
        _this.dVal = '';
        $('.date-hover').each(function () {
            $(this).removeClass('date-active-cur');
        })
    }

}