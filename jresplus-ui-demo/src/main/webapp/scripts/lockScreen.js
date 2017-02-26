(function(dom) {
	var lastActionTime = new Date().getTime(),// 活动最新的时间梭
		lockScreenInterval = 15;

	// 屏幕检查，检查最近活动时间的间隔长
	var screenCheck = function() {
		var currentActionTime = new Date().getTime();
		// 活动时间间隔大于最大允许间隔lockScreenInterval*60*1000
		if ((currentActionTime - lastActionTime) >= lockScreenInterval * 60 * 1000) {
			// 锁屏状态
			var $locked = $.cookie('locked');
			if ($locked != "true") {
				index.lockWin();
				Horn.getComp("lock").setTitle("用户" + lockScreenInterval + "分钟未操作,屏幕已锁定,请激活!");
			}
		}
	};

	var mouseMove = function(ev) {
		try {
			ev = ev || window.event;
			if (screenCheck != undefined) {
				screenCheck();
			}
			lastActionTime = new Date().getTime();// 设置活动最新的时间梭
		} catch (e) {
		}
	};

	dom.onmousemove = mouseMove;
	
})(document);

$(function(){
	setInterval("document.onmousemove()",16 * 60 * 1000);
});
