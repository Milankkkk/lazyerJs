var lazyer_infiniteLoading = {
    init:function (wrapEle, strDiv) {
        $(window).scroll(function () {
            let scrollTop = $(this).scrollTop();
            let windowHeight = $(this).height();
            let scrollHeight = $(document).height();
            if(scrollTop + windowHeight == scrollHeight){
                $(wrapEle).append(strDiv)
            }
        })

    },

}