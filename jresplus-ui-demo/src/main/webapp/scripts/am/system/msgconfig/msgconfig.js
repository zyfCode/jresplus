$(function() {
	common_style.disable_style();
	dialog = common_operate.getDialog();
});
/**
 * 消息提醒配置
 */
var msgconfig = {
	operationUrl : "/am/am/system/msgconfig/operation.json?l_function_no=",
	operationSetUrl : "/am/am/system/operatorSet/operation.json?l_function_no="
			+ functionIds.msgconfig.setupdate,
	showAdd : function() {
		Horn.getComp("addForm").reset();
		Horn.getComp("addWin").show();
		msgconfig.xxzlChange("add");
	},
	del : function(type) {
		var grid = common_operate.checkSelectedLength();
		if (!grid) {
			return grid;
		}

		var url ="/am/am/system/msgconfig/"+type+"/operation.json?l_function_no=" 
				+ functionIds.msgconfig.edit + "&l_action_in="
				+ constants.l_action_in.del,
				c_business_class = $("#c_business_class").val(),data = "l_msgconfig_serial_no="
				+ grid[0].l_msgconfig_serial_no + "&c_business_class=" + c_business_class;
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			query_operate.doPost(url, data, query_operate
					.callbackWithDataGridRefresh());
		}, function() {
		});
	},//业务消息种类监听
	ywxxzlChange : function(type){
		var c_msg_kind = Horn.getCompById("c_msg_kind_" + type).getValue();
		var value = Horn.getCompById("c_businessmsg_kind_" + type).getValue();
		if(value == "0"){
			Horn.getCompById("vc_msg_content_" + type).setValue("投资明细代码为[合同代码]的合同[提醒天数]天后即将过期");
		} else if(value == "1") {
			Horn.getCompById("vc_msg_content_" + type).setValue("投资明细代码为[合同代码]的合同发生本金变动，请及时更新对应的还款计划");
		}
		if(c_msg_kind == "0"){
			Horn.getCompById("vc_msg_content_" + type).setValue("一条编号为[指令流水号]的【[业务标识名称]】指令[指令状态]");
		}
	},
	// 消息种类监听
	xxzlChange : function(type) {
		Horn.getCompById("vc_dictatestatus_" + type).filter(['9','a','b','c','d'],false);
		var value = Horn.getCompById("c_msg_kind_" + type).getValue();
		if (value == "0") {// 消息提醒

			Horn.getCompById("c_businessmsg_kind_" + type).hide();
			Horn.getCompById("c_businessmsg_kind_" + type).setDisabled(true);

			Horn.getCompById("l_busin_flag_" + type).show();
			Horn.getCompById("l_busin_flag_" + type).setDisabled(false);
			Horn.getCompById("vc_dictatestatus_" + type).show();
			Horn.getCompById("vc_dictatestatus_" + type).setDisabled(false);

//			Horn.getCompById("vc_msg_content_" + type).setValue(
//					"一条编号为[指令流水号]的【[业务标识名称]】指令[指令状态]");
		} else if (value == "1") {// 业务提醒
			Horn.getCompById("c_businessmsg_kind_" + type).show();
			Horn.getCompById("c_businessmsg_kind_" + type).setDisabled(false);

			Horn.getCompById("l_busin_flag_" + type).hide();
			Horn.getCompById("l_busin_flag_" + type).setDisabled(true);
			Horn.getCompById("vc_dictatestatus_" + type).hide();
			Horn.getCompById("vc_dictatestatus_" + type).setDisabled(true);
		}
		if(type == "edit"){//修改时，不调业务消息种类联动方法
			return;
		}
		msgconfig.ywxxzlChange(type);
	},
	// 新增、修改提交
	doUpdate : function(type) {
		var form = Horn.getComp(type + "Form"), 
			c_business_class = $("#c_business_class").val(),
		url = "/am/am/system/msgconfig/"+type+"/operation.json?l_function_no=" 
				+ functionIds.msgconfig[type] + "&l_action_in="
				+ constants.l_action_in[type];
		if (!form.isValid()) {
			return;
		}
		TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			var data = form.getValues();
			data.c_business_class = c_business_class;
			query_operate.doPost(url, data, query_operate
					.callbackWithDataGridRefresh(type + "Win"));
		}, function() {
		});
	},
	// 修改提醒间隔
	doSetIntevel : function(type) {
		var form = Horn.getComp(type + "Form"), 
		url = "/am/am/system/msgconfig/"+type+"/operation.json?l_function_no=" 
				+ functionIds.msgconfig[type] + "&l_action_in="
				+ constants.l_action_in[type];
		if (!form.isValid()) {
			return;
		}
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			var data = form.getValues();
			query_operate.doPost(url, data, function(result){
				if(result == constants.ajaxCallBackCode.OK){
					Horn.getComp("setWin").hide();
					Horn.getCompById("dataTable").load();
					TDialog.Msg.alert("提示","修改成功，用户需重新登录才可生效！");
				}			
			});
		}, function() {
		});
	},
	showEdit : function() {
		var grid = common_operate.checkSelectedLength();
		if (!grid) {
			return grid;
		}

		var url = "/am/am/business/getObject.json", data = "vc_input_name1=l_msgconfig_serial_no&vc_input_value1="
				+ grid[0].l_msgconfig_serial_no + "&vc_input_table=msgconfig";
		query_operate.doPost(url, data, function(result) {
			if (result && result.query) {
				var form = Horn.getComp("editForm");
				form.setValues(result.query);
				msgconfig.xxzlChange("edit");
				Horn.getComp("editWin").show();
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	// 用户消息设置 消息种类监听
	xxzlSetChange : function() {
		var value = Horn.getComp("c_msg_kind").getValue();
		if (value == "0") {// 消息提醒

			Horn.getComp("c_businessmsg_kind").hide();
			Horn.getComp("c_businessmsg_kind").setDisabled(true);

			Horn.getComp("l_busin_flag").show();
			Horn.getComp("l_busin_flag").setDisabled(false);
			Horn.getComp("vc_dictatestatus").show();
			Horn.getComp("vc_dictatestatus").setDisabled(false);

		} else if (value == "1") {// 业务提醒
			Horn.getComp("c_businessmsg_kind").show();
			Horn.getComp("c_businessmsg_kind").setDisabled(false);

			Horn.getComp("l_busin_flag").hide();
			Horn.getComp("l_busin_flag").setDisabled(true);
			Horn.getComp("vc_dictatestatus").hide();
			Horn.getComp("vc_dictatestatus").setDisabled(true);

		}
	},

	/**
	 * 用户消息提醒设置
	 * 
	 * @returns
	 */
	showMsgsetEdit : function() {
		var grid = common_operate.checkSelectedLength();
		if (!grid) {
			return grid;
		}

		var url = "/am/am/system/operatorSet/view.json", data = "l_msgconfig_serial_no="
				+ grid[0].l_msgconfig_serial_no;
		query_operate.doPost(url, data, function(result) {
			if (result && result.query) {
				var form = Horn.getComp("editForm");
				form.setValues(result.query);
				msgconfig.xxzlSetChange();
				Horn.getComp("editWin").show();
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},//提醒间隔设置
	showIntevelEdit : function(){
		var url = "/am/am/system/operatorSet/getLwarnIntel.json";
		query_operate.doPost(url, "", function(result) {
			if (result && result.query) {
				var form = Horn.getComp("setForm");
				form.setValues(result.query);
				Horn.getComp("setWin").show();
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	/**
	 * 用户消息提醒设置-修改
	 * 
	 * @returns
	 */
	doSetUpdate : function() {
		var form = Horn.getComp("editForm"), 
		url = msgconfig.operationSetUrl;
		if (!form.isValid()) {
			return;
		}
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			var data = form.getValues();
			query_operate.doPost(url, data, query_operate
					.callbackWithDataGridRefresh("editWin"));
		}, function() {
		});
	},//刷新
	refresh : function(){
		Horn.getCompById("dataTable").load('',{"pageNo":1});
	}
};