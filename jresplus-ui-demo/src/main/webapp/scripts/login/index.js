$(function() {
	index.checkLocked();
	//监听锁屏输入框
	$("#lock_vc_op_password").keydown(function(e){
		if(e.which == 13){//如果是回车，阻止提交
			index.lockSubmit();
			return false;
		}
	});	

	//setInterval("messager.pullMessage()",c_warn_inteval);
});

/**
 * 全局函数，处理ajax请求，超时处理
 */
//$(document).ajaxComplete(function(event, xhr, settings) {
//	if (xhr.getResponseHeader("sessionstatus") == "timeOut") {
//		if (xhr.getResponseHeader("loginPath")) {
//			alert("会话过期，请重新登陆!");
//			window.location.replace(xhr.getResponseHeader("loginPath"));
//		} else {
//			alert("请求超时请重新登陆 !");
//		}
//	}
//});
var index = {
	// 退出功能
	exit : function() {
		Horn.Msg.confirm("确认", "是否退出?", function() {
			window.location.href = "login.htm";
		}, function() {
			// canel
		});
	},//校验锁屏状态
	checkLocked : function(){
		//锁屏状态
		var $locked = $.cookie('locked');
		if($locked == "true"){
			index.lockWin();
		}	
	},
	// 用户锁屏
	lockWin : function(){
		Horn.Frame.lock();
		$.cookie('locked',Horn.Frame.locked);
	},
	// 用户解屏
	lockSubmit : function() {
		var tipMsg = "<font color=\"red\" id=\"lockMsg\"><center><span>请输入密码！</span></center></font>";
		var $msg = $("#lockMsg");
		var form = Horn.getComp("lockForm");
		if (!form.isValid()) {
			return;
		} else {
			$msg.remove();
			Horn.getComp("lock").hide();
			Horn.Frame.unlock();
			$.cookie('locked',Horn.Frame.locked);
			Horn.getComp("lock").setTitle("输入解锁密码");
		}
	},
	// 密码修改
	updatePassword : function() {
		var form = Horn.getComp("updatePaForm");
		if (form.isValid()) {
			var vc_op_password_old = jQuery.trim(Horn.getComp(
					"vc_op_password_old").getValue());
			var vc_op_password_new = jQuery.trim(Horn.getComp(
					"vc_op_password_new").getValue());
			var c_password_confirm = jQuery.trim(Horn.getComp(
					"c_password_confirm").getValue());

			if (vc_op_password_new != c_password_confirm) {
				Horn.Msg.warning("提示", "新密码两次输入不一致！");
				return false;
			}

			if (vc_op_password_new == vc_op_password_old) {
				Horn.Msg.warning("提示", "新密码不能和旧密码相同！");
				return false;
			}

			Horn.Msg.alert("提示", "密码修改成功！", function() {
				window.location.href = "home.htm";
			});

		}

	},

	editInfo : function() {
		Horn.getComp("editWin").show();
		//var url = "/am/am/system/operatorSet/view2.json";
		//data = "l_function_no=" + functionIds.operators["view"];

		/*$.post(url, data, function(result) {
			if (result && result.operate) {
				Horn.getComp("editForm").setValues(result.operate);
				//单条查询
				common_operate.geteditlist("vc_branch_id","brach","1000043",result.operate.vc_branch_id);
				Horn.getComp("editWin").show();
				common_style.disable_style();
				common_reg.Formremoverr('editForm');

			} 
//			else {
//				Horn.Tip.warn("编辑失败！");
//			}
		}, ajaxDataType.JSON);*/
		
	},

	doEdit : function() {
		Horn.Msg.confirm("确认", "请您确认是否提交？", function() {
			Horn.getComp("editWin").hide();
			Horn.Tip.success("操作成功！");

		}, function() {
		});
		
	}

};