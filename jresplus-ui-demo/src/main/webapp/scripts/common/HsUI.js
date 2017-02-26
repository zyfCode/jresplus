/**
 * 提示文字自定义的数据加载遮盖层
 * 
 * @author 周智星
 *使用方法:打开遮盖 $("body").doMask('正在提交,请稍后...');//提示内容自定义  关闭遮盖 $("body").doUnMask();
 * 
 */
(function($, undefined) {


    var UTILS = window['$Utils'];

    /**
     *  生成遮罩的html机构
     * @param text
     * @param options
     */
    function generateMaskHtml(text, options) {
        var id = options && options.id || 'fui' ;
        var maskBGId = id + '-mask-bg';
        var maskImgId = id + '-mask-img';
        var maskMsgId = id + '-mask-msg';
        var maskArr = [];
        //遮罩背景层
        //遮罩层的提示图片以及提示信息
        maskArr.push('<div id="' + maskBGId + '"' + ' class="f-mask-bg"></div>');
        maskArr.push('<div id="' + maskImgId + '" class="f-mask-img"><div id="' + maskMsgId + '" >');
        maskArr.push('<div class="u-load"><div class="u-load-icon"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>');
        maskArr.push('<div class="u-load-con"><span>');
        maskArr.push(text || window["$i18n"].mask.defaultMsg);
        maskArr.push('</span></div></div>');
        maskArr.push('</div></div>');
        return maskArr.join('');
    }


    /**
     * 隐藏所有的原生select组件
     */
    function hiddenAllSelectEl() {
        if (window["hasHidden"] === true) {
            return;
        }
        var i = 0;
        var j = 0;
        var es;            //var es = vForm.elements;  //获取表单中所有的元素
        var hiddenArrayList = window['hiddenArrayList'] || [];
        window['hiddenArrayList'] = hiddenArrayList;
        window["hasHidden"] = true;
        var selectEls = $('select');
        var selectLen = selectEls.length;
        for (var i = 0; i < selectLen; i++) {
            var selectDom =selectEls.get(i);
            var selectStyle = selectDom.style ;
            if (selectStyle.display == "none" || selectStyle.display == "block") {
            } else {
                selectStyle.display = "none";
                hiddenArrayList.push(selectDom); //直接将对象的引用保存到链表中
            }
        }
    }

    //回复隐藏的select框
    function showAllSelectEl() {
        if (window["hasHidden"] === false) {
            return;
        }
        //todo 是否真的要隐藏select ，如果有多个遮罩层 处理需要谨慎
        var mask = $("#win-mask-overlay,#dialog-mask-overlay");
        if (mask.length > 0) {
            return;
        }
        window["hasHidden"] = false;
        var hiddenArrayList = window['hiddenArrayList'];

        var length = $.isArray(hiddenArrayList) && hiddenArrayList.length || 0;
        //将隐藏链表中的元素恢复显示
        if (hiddenArrayList != null && hiddenArrayList != false && length > 0) {
            for (var i = 0; i < length; i++) {
                hiddenArrayList[i].style.display = "";   //继续隐藏
            }
        }
        hiddenArrayList = null;
        window['hiddenArrayList'] = null;
    }

    /**
     * ie6下调用 hiddenAllSelectEl方法，隐藏所有原生的select组件
     */
    function hideAllSelect() {
        if ($.browser.msie && ($.browser.version == "6.0")) {
            hiddenAllSelectEl();
        }
    }

    /**
     * ie6下调用 showAllSelectEl方法，隐藏所有原生的select组件
     */
    function showAllSelect() {
        if ($.browser.msie && ($.browser.version == "6.0")) {
            showAllSelectEl();
        }
    }

    //展现body区域的遮罩
    function _showBodyMask(text, maskId, options) {
        var maskBG = $('#' + maskId + '-mask-bg');
        if (maskBG.length == 0) {
            //生成对应的dommask的dom结构。
        	options = options || {};
        	options.id = maskId;
            var maskHtml = generateMaskHtml(text, options);
            $('body').append(maskHtml);
        }
        _resizeBodyMask(text, maskId, options);
    }

    //展现div区域的遮罩
    function _showDivMask(text, maskId, options) {
        var maskBGId = maskId + '-mask-bg';

        var maskBG = $('#' + maskBGId);
        if (maskBG.length == 0) {
            //生成对应的dommask的dom结构。
            var options = {id :maskId};
            var maskHtml = generateMaskHtml(text, options);
            $('body').append(maskHtml);
        }
        _resizeDivMask(text, maskId, options);
    }

    //调整body区域的遮罩
    function _resizeBodyMask(text, maskId, options) {
        //查找遮罩相关的元素
        var maskBG = $('#' + maskId + '-mask-bg');
        var maskImg = $('#' + maskId + '-mask-img');
        var maskMsg = $('#' + maskId + '-mask-msg');

        var isBoxModel = jQuery.support.boxModel;
        var documentElement = document.documentElement;

        //可视区域的宽度
        var w = isBoxModel && documentElement.clientWidth ||document.body.clientWidth;
        //可是区域的高度
        var h = isBoxModel && documentElement.clientHeight ||document.body.clientHeight;
        //滚动条的水平偏移量
        var scrollLeft = isBoxModel && documentElement.scrollLeft || document.body.scrollLeft;
        //滚动条的垂直偏移量
        var scrollTop = isBoxModel && documentElement.scrollTop || document.body.scrollTop;


        //设置背景阴影的宽高
        var bw = (w + scrollLeft) + 'px';
        var bh = (h + scrollTop) + 'px';
        maskBG.css('width', bw);
        maskBG.css('height', bh);


        //设置消息提示信息内容
        //maskMsg.html(text);
        maskMsg.find('.u-load-con span').text(text);
        //遮罩图片的宽度
        var imgW = maskImg.outerWidth(true);
        //遮罩图片的高度
        var imgH = maskImg.outerHeight(true);

        //设置遮罩图片的相对位置
        var px = ((w - imgW) / 2 + scrollLeft) + 'px';
        var py = ((h - imgH) / 2 + scrollTop) + 'px';
        maskImg.css('left', px);
        maskImg.css('top', py);

        maskBG.css('display', '');
        //设置背景阴影和遮罩图片显现
        if ((options || {})["showImg"] === false) {
        	return;
        }
        maskImg.css('display', '');
    }

    //调整div区域的遮罩
    function _resizeDivMask(text, maskId, options) {

        var element = $('#' + maskId);
        //查找遮罩相关的元素
        var maskBG = $('#' + maskId + '-mask-bg');
        var maskImg = $('#' + maskId + '-mask-img');
        var maskMsg = $('#' + maskId + '-mask-msg');

        //计算所需遮罩的宽度
        var w = element.outerWidth(true);
        //计算所需遮罩的高度
        var h = element.outerHeight(true);
        //滚动条的水平偏移量
        var scrollLeft = element.scrollLeft();
        //滚动条的垂直偏移量
        var scrollTop = element.scrollTop();


        //计算遮罩阴影的宽高
        var bw = w + 'px';
        var bh = h + 'px';
        maskBG.css('width', bw);
        maskBG.css('height', bh);

        //计算并设置遮罩阴影的相对偏移量。
        var offset = element.offset();
        var left = offset.left;
        var top = offset.top;
        maskBG.css('left', left);
        maskBG.css('top', top);

        maskMsg.html(text);

        //计算遮罩图片的宽度
        var imgW = maskImg.outerWidth(true);
        //计算遮罩图片的高度
        var imgH = maskImg.outerHeight(true);

        //计算并设置遮罩图片的偏移量
        var px = (left + (w - imgW) / 2 ) + 'px';
        var py = (top + (h - imgH) / 2 ) + 'px';
        maskImg.css('left', px);
        maskImg.css('top', py);

        maskBG.css('display', '');
        if ((options || {})["showImg"] === false) {
        	return;
        }
        maskImg.css('display', '');
    }

    /**
     * 遮罩某个指定的div
     * @name FMask#doMask
     * @param  text  遮罩提示信息（类型：String）
     * @function
     * @return void
     * @example
     */
    $.fn.doMask = function(text, options) {
        var element = $(this);
        hideAllSelect();
        //遮罩整个页面
        if (element.is('body')) {
            _showBodyMask(text, 'fui', options);
        } else {
            var id = element.attr('id');
            _showDivMask(text, id, options);

        }
    };

    /**
     * 去除某个指定div的遮罩
     * @name FMask#doUnMask
     * @function
     * @return void
     * @exampl
     */
    $.fn.doUnMask = function() {
        var element = $(this);
        showAllSelect();
        //取消整个body区域的遮罩
        if (element.is('body')) {
            var maskBG = element.find('>#fui-mask-bg');
            if (maskBG.length > 0) {
                var maskImg = element.find('>#fui-mask-img');
                maskImg.css('display', 'none');
                maskBG.css('display', 'none');
            }
            showAllSelect();
        } else {
            //取消制定div区域的遮罩
            var id = element.attr('id');
            var maskBGId = id + '-mask-bg';
            var maskImgId = id + '-mask-img';
            var maskBG = $('#' + maskBGId);
            if (maskBG.length > 0) {
                var maskImg = $('#' + maskImgId);
                maskImg.css('display', 'none');
                maskBG.css('display', 'none');
            }
            showAllSelect();
        }
    };
})(jQuery);