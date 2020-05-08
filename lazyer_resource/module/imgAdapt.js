var lazyer_imgAdapt = {
    imgAdaptType: [{
             name: 'fill',
             descript: '被替换的内容正好填充元素的内容框。整个对象将完全填充此框。如果对象的宽高比与内容框不相匹配，那么该对象将被拉伸以适应内容框。'
         }, {
             name: 'contain',
             descript: '被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。'
         }, {
             name: 'cover',
             descript: '被替换的内容在保持其宽高比的同时填充元素的整个内容框。如果对象的宽高比与内容框不相匹配，该对象将被剪裁以适应内容框。'
         }, {
             name: 'none',
             descript: '被替换的内容将保持其原有的尺寸。'
         }, {
             name: 'scale-down',
             descript: '内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些。'
         }],
    init: function () {
        for (item of lazyer_imgAdapt.imgAdaptType) {
            $('.imgAdaptList').append(`<span>${item.name}</span>`)
        }
    },
    setTypeImgAdapt: function () {
        let _this = this
        let $ = lazyerJs.$
        $('.imgAdaptList').on('click','span', function () {
            let className = $(this).text()
            let tip = $('.imgAdaptTip')
            lazyer_imgAdapt.imgAdaptType.filter(function (item) {
                if(item.name == className) {
                    tip.text(`${className}: ${item.descript}`)
                }
            })
            $('.imgAdaptCon img').removeClass().addClass(className)
        })
    }
}