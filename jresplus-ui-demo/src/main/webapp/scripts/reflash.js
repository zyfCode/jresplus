//获取浏览器页面可见高度和宽度
        var _PageHeight = document.documentElement.clientHeight,
            _PageWidth = document.documentElement.clientWidth;
        //计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
        var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
            _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
        //在页面未加载完毕之前显示的loading Html自定义内容
        var _LoadingHtml = "<div id='loadingDiv' style='position:absolute;left:0;width:100%;height:" + _PageHeight + "px;top:0;background:#f3f8ff;opacity:0.8;filter:alpha(opacity=80);z-index:10000;'><div class='sk-circle'> <div class='sk-circle1 sk-child'></div> <div class='sk-circle2 sk-child'></div> <div class='sk-circle3 sk-child'></div> <div class='sk-circle4 sk-child'></div><div class='sk-circle5 sk-child'></div><div class='sk-circle6 sk-child'></div><div class='sk-circle7 sk-child'></div><div class='sk-circle8 sk-child'></div><div class='sk-circle9 sk-child'></div> <div class='sk-circle10 sk-child'></div><div class='sk-circle11 sk-child'></div><div class='sk-circle12 sk-child'></div></div><div class='titfont'>页面加载中，请稍后...</div></div> ";
        //呈现loading效果
        document.write(_LoadingHtml);
        //监听加载状态改变
        document.onreadystatechange = completeLoading;
 
        //加载状态为complete时移除loading效果
        function completeLoading() {
            if (document.readyState == "complete") {
                var loadingMask = document.getElementById('loadingDiv');
                loadingMask.parentNode.removeChild(loadingMask);
            }
        }
        //手动载入loading效果
        function startLoading() {
        	var _PageHeight = document.documentElement.clientHeight,
            _PageWidth = document.documentElement.clientWidth;
            //计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
            var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
            _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
            var _LoadingHtml = "<div id='loadingDiv' style='position:absolute;left:0;width:100%;height:" + _PageHeight + "px;top:0;background:#f3f8ff;opacity:0.8;filter:alpha(opacity=80);z-index:10000;'><div class='sk-circle'> <div class='sk-circle1 sk-child'></div> <div class='sk-circle2 sk-child'></div> <div class='sk-circle3 sk-child'></div> <div class='sk-circle4 sk-child'></div><div class='sk-circle5 sk-child'></div><div class='sk-circle6 sk-child'></div><div class='sk-circle7 sk-child'></div><div class='sk-circle8 sk-child'></div><div class='sk-circle9 sk-child'></div> <div class='sk-circle10 sk-child'></div><div class='sk-circle11 sk-child'></div><div class='sk-circle12 sk-child'></div></div><div class='titfont'>页面加载中，请稍后...</div></div> ";
            $("body").append(_LoadingHtml);
        }