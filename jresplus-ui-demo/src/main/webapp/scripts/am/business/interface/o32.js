/**
 * O32接口对象
 */
var o32Util = {
	// 节点转换关系对象
	tranferNode : {
		is_o32_application : "",
		is_o32_confirm : "",
		is_o32_risk : ""
	},
	businflagconfig : {},// 业务配置信息表
	confirmUrl : "/am/am/business/dictate/getConfirm.json",
	// 查询节点转换表:根据按钮名字
	queryTransferNode : function(vc_input_name1, value, c_business_class) {
		var url = "/am/am/business/getSpecityObject.json", data = "vc_input_name1="
				+ vc_input_name1
				+ "&vc_input_value1="
				+ value + "&vc_input_name2=c_business_class&vc_input_value2=" + c_business_class
				+ "&vc_input_table=workflow_node_transfer";
		query_operate.ajax(url, data, function(result) {
			if (result instanceof Object && result.query) {
				o32Util.tranferNode = result.query;
			} else {
				o32Util.tranferNode.is_o32_confirm = "";
				o32Util.tranferNode.is_o32_application = "";
				o32Util.tranferNode.is_o32_risk = "";
			}
		}, constants.ajaxDataType.JSON);
		return o32Util.tranferNode;
	},
	// 根据业务标识,查询业务配置信息表
	queryFlagconfig : function(value, c_business_class) {
		var url = "/am/am/business/getSpecityObject.json", data = "vc_input_name1=l_busin_flag"
				+ "&vc_input_value1="
				+ value + "&vc_input_name2=c_business_class&vc_input_value2=" + c_business_class
				+ "&vc_input_table=businflagconfig";
		query_operate.ajax(url, data, function(result) {
			if (result instanceof Object && result.query) {
				o32Util.businflagconfig = result.query;
			}
		});
		return o32Util.businflagconfig;
	},
	// 风控接口
	risk : function(url,submitParams,type) {
		var risk_url = "/am/am/business/dictate/risk.json";
		submitParams.c_deliver_status = constants.c_deliver_status.RISK;//交收状态：指令已风控
		submitParams.l_serial_no = "";//交收状态：指令已风控
		query_operate.doPost(risk_url, submitParams, function(result) {
			common_operate.endProgress();
			if (result && result.bean) {
				$("#h_l_serial_no").val(result.bean.busin_no);
				if (result.bean.error_no !== 0) {
					o32Util.riskMsgShow(result);
					return;
				}
				submitParams.l_serial_no = result.bean.busin_no;
				if(o32Util.tranferNode.is_o32_application == constants.strConstan.YES) {//申请接口
					o32Util.apply(url,submitParams,type);
					return;
				} 
				equity_investment.commitfb(url, submitParams, type);

			} else {
				TDialog.Msg.warning("提示",result.errorMsg + "!");
			}
		}, ajaxDataType.JSON);
	},
	// 申请接口
	apply : function(url,submitParams,type) {
		var apply_url = "/am/am/business/dictate/getApply.json";
		submitParams.c_deliver_status = constants.c_deliver_status.APPLY;//交收状态：指令已申请
		submitParams.business_type = type;
		query_operate.doPost(apply_url, submitParams, function(result) {
			common_operate.endProgress();
			if (result && result.bean) {
				$("#h_l_serial_no").val(result.bean.busin_no);	
				submitParams.l_serial_no = result.bean.busin_no;	
				if(result.bean.error_no !== 0){
					//申请失败，撤销申请单
					submitParams.cancel_frozen = constants.strConstan.NO;
					submitParams.oper_type = constants.operType.cx;//操作类型
					o32Util.confirm(submitParams, type);
					return;									
				}  
				submitParams.l_serial_no = result.bean.busin_no;	
				equity_investment.commitfb(url, submitParams, type);
			} else {
				TDialog.Msg.warning("提示",result.errorMsg + "!");
			}
		},ajaxDataType.JSON);
	},//确认接口
	confirm : function(submitParams,type){
		submitParams.l_busin_flag = constants.type2BusFlg[type];
		query_operate.doPost(o32Util.confirmUrl, submitParams, function(result) {
			if (result && result.bean) {
				TDialog.Msg.alert("提示","指令撤销成功！");  
				Horn.getCompById("msgWin").hide();
				Horn.getCompById(type + "Win").hide();
			} else {
				TDialog.Msg.warning("提示",result.errorMsg + "!");
				equity_investment.o32exception(submitParams);
			}
		},ajaxDataType.JSON);
	},//风控消息展示
	riskMsgShow : function(result){
		common_operate.exitButtonHiden("msgWin");
		$("#h_fk_type").val(result.bean.error_no);
		var data = {
			"total" : result.total,
			"rows" : result.rows
		};
		Horn.getCompById("msgTable").loadData(data);
		Horn.getCompById("msgWin").show();

		if (result.bean.error_no === 101) {// 预警
			$(":button[name=o32cancel]").show();
			$(":button[name=o32continue]").text("继续");
		} else if (result.bean.error_no === 102) {// 禁止
			$(":button[name=o32cancel]").hide();
			$(":button[name=o32continue]").text("关闭");
		}
	}
};