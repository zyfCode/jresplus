$(function() {
	common_style.disable_style();
});
/**
 * 业务流程管理
 */
var dictateinfoex = {
	operation_url : "/am/am/business/dictate/operation.json",
//	/***************************************************************************
//	 * 
//	 * @param type
//	 *            流程按钮操作类型：复核...、审批...、指令....
//	 * @param l_action_in
//	 *            指令操作类型2,3,4,5:变更、复核、执行、撤销
//	 * @param workflow_type
//	 *            流程类型
//	 * @returns
//	 */
//	workflow_operate : function(type, l_action_in, workflow_type) {
//		var vc_summary = "",
//		buttonId = type,
//		url = "/am/am/business/dictate/" + type +"/operation.json";
//		if (!workflow_type) {
//			workflow_type = "";
//		}
//		var grid = common_operate.checkSelectedLength();
//		if (!grid) {
//			return grid;
//		}
//		var vc_node_id = $("#vc_node_id").val();
//		
//		var data = "workflow_step=" + workflowStep.review + "&buttonId=" + type
//				+ "&l_function_no="
//				+ functionIds.l_busin_flags[grid[0].l_busin_flag]
//				+ "&l_serial_no=" + grid[0].l_serial_no + "&wf_instance_id="
//				+ grid[0].wf_instance_id + "&wf_node_id=" + grid[0].wf_node_id
//				+ "&l_busin_flag=" + grid[0].l_busin_flag + "&l_action_in="
//				+ l_action_in + "&workflow_type=" + workflow_type
//				+ "&vc_node_id=" + vc_node_id;
//		
//		var flagType = $("#flagType").val();
//		if (flagType) {
//			var form = Horn.getComp(flagType + "Form");
//			
//			/**
//			 * 查询下个节点是否有审批人员
//			 */
//			if(!dictateinfoex.hasNextNodeHuman(buttonId,data)){
//				return;
//			};
//			
//			vc_summary = form.getValues().vc_summary;
//			data += "&vc_summary=" + vc_summary;
//			if (flagType == "jdck" && l_action_in == "2") {// 解压出库,并且是指令修改
//				var obj = {};
//				$("#body_jdckTable > tr").each(
//						function() {
//							var $this = $(this);							
//									obj.l_collateral_no = common_operate.parseNaN($this.find("td:eq(2)").text());
//									obj.l_current_amount = common_operate.parseNaN($this.find("td:eq(7)").text());
//									obj.l_occur_amount = common_operate.parseNaN($this.find("td:eq(9) > div > input").val());
//									obj.en_occur_balance = common_operate.parseNaN($this.find("td:eq(10) > div > input").val());
//						});
//				data += "&l_occur_amount=" + obj.l_occur_amount
//						+ "&en_occur_balance=" + obj.en_occur_balance
//						+ "&l_collateral_no=" + obj.l_collateral_no;
//			} else if(flagType == "rate" && l_action_in == "2"){//利率变更,并且是指令修改				
//				var rate_data = dictateinfoex.doRateCommit();
//				data += "&" + rate_data;
//			}else if(flagType == "fareRate" && l_action_in == "2"){//费率变更，指令为修改
//				var fareRate_data = dictateinfoex.doFareRateCommit();
//				data += "&" + fareRate_data;
//				
//			}else if(flagType == "adjust" && l_action_in == "2"){//结息日调整，并且是指令修改
//				var paydate_data = dictateinfoex.doAdjustCommit();
//				data += "&" + paydate_data;
//			}
//		}
//		
//		var type = constants.undoauto_fun[grid[0].l_busin_flag],
//			_vc_dict_log = grid[0].vc_busin_caption + "——" + grid[0].c_node_status + constants.bussinessMap[buttonId];
//		data += "&vc_dict_log=" + _vc_dict_log;
//		if (type) {
//			//query_operate.doPost(url, data,query_operate.callbackWithDataGridRefresh(type + "Win"));
//			query_operate.doPost(url, data,query_operate.callbackWithDataGridRefresh());
//			autodicwin.afteruseWinclosenew();
//		} else {
//			query_operate.doPost(url, data,query_operate.callbackWithDataGridRefresh());
//		}
//	}
//     ,
//	workflow_operate_grid : function(vc_btn_name,vc_node_id) {
//		if(!vc_btn_name){//判断按钮是否是自动生成
//		} else {
//			$("#dbstepType").val(vc_btn_name);
//			$("#vc_node_id").val(vc_node_id);
//		}
//		var flagType = Horn.getCompById("flagType").getValue();
//		var form = Horn.getComp(flagType + "Form");
//		var dbstepType = Horn.getCompById("dbstepType").getValue();
//				
//		if (dbstepType.indexOf("btg") != -1) {//检验批注
//			if (!form.isValid()) {
//				TDialog.Msg.error("提示", "请输入指令批注!", function() {
//				});
//				return;
//			}
//		}
//		
//		if (dbstepType == "fhtg") {
//			dictateinfoex.workflow_operate(dbstepType, '3', 1);
//		} else if (dbstepType == "fhbtg") {
//			if (form.isValid()) {
//				dictateinfoex.workflow_operate(dbstepType, '3', 1);
//			}
//
//		} else if (dbstepType == "sptg") {
//			dictateinfoex.workflow_operate(dbstepType, '6');
//		} else if (dbstepType == "spbtg") {
//			if (form.isValid()) {
//				dictateinfoex.workflow_operate(dbstepType, '6');
//			}
//		} else if (dbstepType == "zxtg") {
//			dictateinfoex.workflow_operate(dbstepType, '4');
//		} else if (dbstepType == "zxbtg") {
//			if (form.isValid()) {
//				dictateinfoex.workflow_operate(dbstepType, '4');
//			}
//		} else if (dbstepType == "zlxg") {
//			if (form.isValid()) {
//				dictateinfoex.workflow_operate(dbstepType, '2', 2);
//			}
//		} else if (dbstepType == "zlcx") {
//			if (form.isValid()) {
//				dictateinfoex.workflow_operate(dbstepType, '5', 2);
//			}
//		}
//	}
//    ,
   
	/**
	 * 查询下个节点是否有审批人员
	 */
	hasNextNodeHuman : function(buttonId,data){
		var url = "/am/am/business/dictate/hasNextNodeHuman.json",
			flag = false;
		
		if (buttonId == 'zltz' || buttonId == 'zlzf') {// 指令调整、作废
			url = url + "?dotype=1";
		} else {
			url = url + "?dotype=0";
		} 
		query_operate.ajax(url, data, function(result){
			if(result == constants.ajaxCallBackCode.OK){
				flag = true;
			}	
		}, ajaxDataType.TEXT);
		return flag;
	},
	// 行单击事件
	rowClick : function(rowdata) {
		var grid = Horn.getComp("dataTable").getSelecteds();
		//固定按钮放在最后
		var buttqueryhtml="<li><a name=\"zlck\" href=\"JavaScript:void(0)\" class=\"hc-datagrid-a hc_datagrid-alink\" onclick=\"autodicwin.toautodic('','zlck')\"><i class=\"fa fa-eye\"></i>指令查看</a></li>";
		buttqueryhtml+="<li><a name=\"ctbutton5\" href=\"JavaScript:void(0)\" class=\"hc-datagrid-a hc_datagrid-alink\" onclick=\"low()\"><i class=\"fa fa-wrench\"></i>自定义列</a></li>";
		if (grid.length !== 1) {//未选中记录
			return;
		} else {//删除toolbar上存在的按钮
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").html('');
		}
		
		var c_process_type = common_operate.queryBusFlag(grid),
			c_business_class = grid[0].c_business_class,
			url = "/am/am/business/dictateinfoex/getButtons.json?l_function_no=" + functionIds.dicta.getDatagridButtons,
			data = "c_exec_status=" + rowdata.h_exec_status + "&c_node_status=" + rowdata.h_node_status + "&c_process_type="
				+ c_process_type + "&vc_dictate_type=db";
		if($.trim(c_business_class)){//如果c_business_class不为空，则拼作为参数
			data += "&c_business_class=" + c_business_class;
		}
		
		if(rowdata.c_deliver_status == "交收失败"){
			data = "vc_btn_name=zlzz";
		} else if(rowdata.c_deliver_status == "交收中"){
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").append(buttqueryhtml);
			return ;
		}
		query_operate.ajax(url, data, function(result){
			var btn_html = "";
			for(var i=0,j=result.length;i<j;i++){
				var btn = result[i],
				_html = "<li><a name=\"" + btn.vc_btn_name + "\" href=\"JavaScript:void(0)\" class=\"hc-datagrid-a hc_datagrid-alink\" onclick=\"" + btn.vc_btn_event + "\">" 
					+ "<i class=\"fa " +btn.vc_btn_class + "\">" 
					+ "</i>" + btn.vc_node_name + "</a></li>";
				btn_html += _html;
			}
			//添加toolbar上的按钮
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").append(btn_html+buttqueryhtml);
		});	
		
		$("#rightMain").attr("src", "main.htm");
		common_operate.getZlBusAuthority("dataTable");
	}
};

