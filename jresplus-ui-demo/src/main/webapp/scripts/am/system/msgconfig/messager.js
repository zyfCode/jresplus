/**
 * 消息提醒
 */
var messager = {
	// 更新消息时间
	updateMsg : function(l_msg_serial_no) {
		var url = "/am/am/system/msgconfig/updateMsg.json?", data = "l_msg_serial_no="
				+ l_msg_serial_no + "&l_action_in=2";
		query_operate.doPost(url, data, function(result) {
			if (result == constants.ajaxCallBackCode.OK) {

			} else {
				Horn.Tip.warn("操作失败！");
			}
		});
	},
	onPageLoad : function(vc_op_code) {
		MessagePush.onPageLoad(vc_op_code);
	},
	/**
	 * 取消息
	 */
	pullMessage : function() {
		$("#message").empty();
		MessagePush.getList(function(list) {
			if(list.length > 0){//取到消息，则播放提示音
				messager.play();
			} 		
			for ( var i = 0; i < list.length; i++) {
				var o = JSON.parse(list[i]);
				var pop = new Pop(o.vc_msg_title, o.vc_msg_link, o.vc_msg,
						o.l_msg_serial_no, o.menu_title, o.c_msg_kind,
						o.l_menu_id, o.vc_relative_id, o.vc_stock_code);
			}
		});
	},
	/**
	 * 消息音乐播放
	 */
	play : function() {
		var str = "<embed src='/am/mp3/msg1.mp3' panel=0 autostart=true loop='true' hidden='true'></embed>";
		//document.all.music.innerHTML = str;
		$("#music").html(str);
	}
};