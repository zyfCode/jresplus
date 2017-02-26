/**
 * 基于jquery_ui封装一些常用组件
 */
var TDialog = TDialog || {};

/**
 * 信息交互提示对象
 */
TDialog.Msg = {
	okFn : "",
	cancelFn : "",
	// 完成提示对话框
	alert : function(ptitle, ptext, okFn) {
		TDialog.Msg.okFn = okFn;
		$("#dialog-message").dialog({
			modal : true,
			autoOpen : false,
			close : function() {
				$(this).dialog("destroy");
			},
			buttons : {
				"确定" : function() {
					// 执行回调函数
					if (typeof TDialog.Msg.okFn == "function") {
						TDialog.Msg.okFn();
					}
					$(this).dialog("close");
					$(this).dialog("destroy");
				}
			}
		});
		$("#dialog-message > p > span:eq(0)").attr("class",
				"ui-icon ui-icon-circle-check");
		$("#dialog-message > p > span:eq(1)").text(ptext);
		$("#ui-dialog-title-dialog-message").text(ptitle);
		$("#dialog-message").dialog("open");
	},
	// 错误提示对话框
	error : function(ptitle, ptext, okFn) {
		TDialog.Msg.okFn = okFn;
		$("#dialog-message").dialog({
			modal : true,
			autoOpen : false,
			close : function() {
				$(this).dialog("destroy");
			},
			buttons : {
				"确定" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.okFn == "function") {
						TDialog.Msg.okFn();
					}
				}
			}
		});
		$("#dialog-message > p > span:eq(0)").attr("class",
				"ui-icon ui-icon-circle-close");
		$("#dialog-message > p > span:eq(1)").text(ptext);
		$("#ui-dialog-title-dialog-message").text(ptitle);
		$("#dialog-message").dialog("open");
	},
	// 警告提示对话框
	warning : function(ptitle, ptext, okFn) {
		TDialog.Msg.okFn = okFn;
		$("#dialog-message").dialog({
			modal : true,
			autoOpen : false,
			close : function() {
				$(this).dialog("destroy");
			},
			buttons : {
				"确定" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.okFn == "function") {
						TDialog.Msg.okFn();
					}
				}
			}
		});
		$("#dialog-message > p > span:eq(0)").attr("class",
				"ui-icon ui-icon-alert");
		$("#dialog-message > p > span:eq(1)").text(ptext);
		$("#ui-dialog-title-dialog-message").text(ptitle);
		$("#dialog-message").dialog("open");
	},
	// 确认提示对话框
	confirm : function(ptitle, ptext, okFn, cancelFn) {
		TDialog.Msg.okFn = okFn;
		TDialog.Msg.cancelFn = cancelFn;
		$("#dialog_message_confirm").dialog({
			modal : true,
			autoOpen : false,
			close : function() {
				$(this).dialog("destroy");
			},
			buttons : {
				"确定" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.okFn == "function") {
						TDialog.Msg.okFn();
					}
				},
				"取消" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.cancelFn == "function") {
						TDialog.Msg.cancelFn();
					}
				}

			}
		});
		$("#dialog_message_confirm > p > span:eq(0)").attr("class",
				"ui-icon ui-icon-info");
		$("#dialog_message_confirm > p > span:eq(1)").text(ptext);
		$("#ui-dialog-title-dialog_message_confirm").text(ptitle);
		$("#dialog_message_confirm").dialog("open");
	},
	// 确认提示对话框
	confirmyorn : function(ptitle, ptext, okFn, cancelFn) {
		TDialog.Msg.okFn = okFn;
		TDialog.Msg.cancelFn = cancelFn;
		$("#dialog_message_confirm").dialog({
			modal : true,
			autoOpen : false,
			close : function() {
				$(this).dialog("destroy");
			},
			buttons : {
				"是" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.okFn == "function") {
						TDialog.Msg.okFn();
					}
				},
				"否" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.cancelFn == "function") {
						TDialog.Msg.cancelFn();
					}
				}

			}
		});
		$("#dialog_message_confirm > p > span:eq(0)").attr("class",
				"ui-icon ui-icon-info");
		$("#dialog_message_confirm > p > span:eq(1)").text(ptext);
		$("#ui-dialog-title-dialog_message_confirm").text(ptitle);
		$("#dialog_message_confirm").dialog("open");
	},
	// 确认提示对话框
	confirmnext : function(ptitle, ptext, okFn, cancelFn) {
		TDialog.Msg.okFn = okFn;
		TDialog.Msg.cancelFn = cancelFn;
		$("#dialog_message_confirmnext").dialog({
			modal : true,
			autoOpen : false,
			close : function(){
				$(this).dialog("destroy");
			},
			buttons : {
				"下一步" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.okFn == "function") {
						TDialog.Msg.okFn();
					}
				},
				"结束操作" : function() {
					$(this).dialog("close");
					$(this).dialog("destroy");
					// 执行回调函数
					if (typeof TDialog.Msg.cancelFn == "function") {
						TDialog.Msg.cancelFn();
					}
				}

			}
		});
		$("#dialog_message_confirmnext > p > span:eq(0)").attr("class",
				"ui-icon ui-icon-info");
		$("#dialog_message_confirmnext > p > span:eq(1)").text(ptext);
		$("#ui-dialog-title-dialog_message_confirmnext").text(ptitle);
		$("#dialog_message_confirmnext").dialog("open");
	},//显示进度条
	showProgressBar : function(buttonId) {
		$("#float_div").show();
	},//隐藏进度条
	hideProgressBar : function(buttonId) {
		$("#float_div").hide();	
	}
};