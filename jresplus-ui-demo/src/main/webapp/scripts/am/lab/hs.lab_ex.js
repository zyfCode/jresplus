/*******************************************************************************
 * 扩展的LAB加载器:基于LAB.js
 */
// "/am/plugins/bigpipe.mini.js",
// "/am/components/components-debug.js",
// "/am/plugins/datetimepicker/bootstrap-datetimepicker.js",
var base_queue = [ "/am/scripts/query/constants.js", 1,
		"/am/scripts/query/common.js", 2,
		"/am/scripts/query/common_operate.js",
		"/am/plugins/zTree/jquery.ztree.core-3.5.min.js",
		"/am/plugins/zTree/jquery.ztree.exhide-3.5.min.js",
		"/am/plugins/zTree/jquery.ztree.excheck-3.5.min.js",

		"/am/scripts/ztree.js?ver=$!{version}",
		"/am/scripts/comselect.js?ver=$!{version}",
		"/am/scripts/comtextfield.js?ver=$!{version}",
		"/am/scripts/combox2.js?ver=$!{version}",
		"/am/scripts/tree/tree.js?ver=$!{version}",
		"/am/scripts/query/common_reg.js?ver=$!{version}",
		"/am/scripts/query/common_util.js?ver=$!{version}",
		"/am/scripts/am/jquery_ui/jquery.autocomplete.js?ver=$!{version}",
		"/am/scripts/am/jquery_ui/tdialog/hs.dialog.js?ver=$!{version}",
		"/am/scripts/query/common_openloan.js?ver=$!{version}",
		"/am/scripts/sortable/Sortable.min.js?ver=$!{version}",
		"/am/scripts/am/jquery_ui/jquery-ui-1.8.16.custom.min.js?ver=$!{version}" ];

var TLab = {};
var $L = $LAB;
(function(L) {
	L.$L = $L;
	function load(_queue) {
		for ( var i = 0, len = _queue.length; i < len; i++) {
			if (typeof _queue[i] == "string") { // 脚本资源字符串被发现
				$L = $L.script(_queue[i]);
			} else if (typeof _queue[i] == "number") { // 没有发现任何东西
				$L = $L.wait();
			} else if (typeof _queue[i] == "function") { // 内联函数被发现
				$L = $L.wait(_queue[i]);
			}
		}
	}

	function contactArray(a, b) {
		a = a || base_queue;
		var _a = a.concat(b);
		base_queue = a = null;
		return _a;
	}
	L.load = load;
	L.contactArray = contactArray;
})(TLab);