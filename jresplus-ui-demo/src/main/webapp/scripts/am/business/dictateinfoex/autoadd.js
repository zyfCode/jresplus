//$(function(){
//	autoadd.createButtons();
//});

var autoadd = {
	//动态生成按钮
	createButtons : function(){
		var vc_node_id = $("#vc_node_id").val(),
			h_node_status = $("#h_node_status").val(),
			c_business_class = $("#c_business_class").val(),
			url = "/am/am/business/dictateinfoex/getButtons.json?l_function_no=" + functionIds.dicta.getFormButtons,
			data = "vc_parent_node_id=" + vc_node_id + "&c_node_status=" + h_node_status + "&c_business_class=" + c_business_class;
		query_operate.ajax(url, data, function(result){
			var buttonsLen = result.length;
			if(buttonsLen < 1){
				return;
			}
			var button_html = "";
			for(var i=0;i<buttonsLen;i++){
				var btn = result[i],
				_html = "<button type='button' class='u-btn " + btn.vc_btn_class + "' name='autoSubmitBtn' onclick=\"" + btn.vc_btn_event + "\">" + btn.vc_node_name + "</button>";
//				<button type="button" name="" class="u-btn  u-btn-default" onclick="autoadd.doAdd()">确定</button>
				button_html += _html;
			}
			$("div[name=btns]").empty();
			$("div[name=btns]").append(button_html);
		});
	},
	//动态生成按钮
	createButtons_grid : function(flag){
		var vc_node_id = $("#vc_node_id").val(),
			c_business_class = $("#c_business_class").val(),
			url = "/am/am/business/dictateinfoex/getButtons.json?l_function_no=" + functionIds.dicta.getFormButtons,
			data = "vc_parent_node_id=" + vc_node_id + "&c_business_class=" + c_business_class;;
		query_operate.ajax(url, data, function(result){
			var buttonsLen = result.length;
			if(buttonsLen < 1){
				return;
			}
			var button_html = "";
			for(var i=0;i<buttonsLen;i++){
				var btn = result[i],
				_html = "<button type='button' class='u-btn " + btn.vc_btn_class + "' onclick='autoadd.workflow_operate_grid(\"" 
					+ btn.vc_btn_name + "\",\"" + btn.vc_node_id + "\")'>" + btn.vc_node_name + "</button>";
				button_html += _html;
			}
			$("div[name=" + flag +"Btn]").empty();
			$("div[name=" + flag +"Btn]").append(button_html);
		});
	},
	// 为指令批注加上超链接
	renderVcsummary : function() {
		var span = $("#vc_summary_dic").parent().prev(), b_html = span.html().replace(
				"处理意见", ""), a = "<a id='viewSummary' class='viewSummary'>处理意见</a>";
		span.empty();
		span.append(b_html).append(a);
		
		$("#viewSummary").click(function(){
			window.parent.autodicwin.showSummarys();
		});
	},//为指令批注加上超链接
	renderVcsummary2 : function(flag){
		var id = "viewSummary" + flag,
			span = $("#vc_summary_" + flag).parent().prev(), 
			b_html = span.html().replace("处理意见", ""), 
			a = "<a id='" + id + "' class='viewSummary'>处理意见</a>",
			class_value = $("#" + id).attr("class");
		if(!class_value){
			span.empty();
			span.append(b_html).append(a);
			
			$("#" + id).click(function(){
				window.parent.autodicwin.showSummarys();
			});
		}			
		
	},
	
	/**
	 * 查询下个节点是否有审批人员
	 */
	hasNextNodeHuman : function(vc_node_id){
		vc_node_id = vc_node_id || $("#vc_node_id").val();
		var form = Horn.getComp("dodicForm");
		if (!form.isValid()) {
			return;
		}	
		var buttonId = Horn.getCompById("buttonId").getValue();

		var values = form.getValues(),flag = false,
			url = "/am/am/business/dictate/hasNextNodeHuman.json";
		values.vc_node_id = vc_node_id;
		
		if (buttonId == 'zltz' || buttonId == 'zlzf') {// 指令调整、作废
			url = url + "?dotype=1";
		} else {
			url = url + "?dotype=0";
		} 
		query_operate.ajax(url, values, function(result){
			if(result == constants.ajaxCallBackCode.OK){
				flag = true;
			}			
		}, ajaxDataType.TEXT);
		return flag;
	},
	check : function() {
		var buttonId = Horn.getCompById("buttonId").getValue();
		if (buttonId.indexOf("btg") != -1) {
			Horn.getCompById("vc_summary_dic").setRequired(true);
		} else {
			Horn.getCompById("vc_summary_dic").setRequired(false);
		}
	},
	check_grid : function() {
		var l_busin_flag = Horn.getComp("l_busin_flag").getValue();
		var flag = constants.undoauto_fun[l_busin_flag];
		var buttonId = Horn.getCompById("buttonId").getValue();
		if (buttonId.indexOf("btg") != -1) {
			Horn.getCompById("vc_summary_"+flag).setRequired(true);
		} else {
			Horn.getCompById("vc_summary_"+flag).setRequired(false);
		}
	},
	doAdd : function(vc_node_id,vc_btn_name) {
		
		var form = Horn.getComp("dodicForm");
		if (!form.isValid()) {
			return;
		}
		
		var s = "";	
		if(!vc_btn_name){//判断按钮是否是自动生成
			s = Horn.getCompById("buttonId").getValue();
		} else {
			s = vc_btn_name;
			$("#buttonId").val(s);
			$("#vc_node_id").val(vc_node_id);
		}
		var values = form.getValues(),
			u = false,
			url = "/am/am/business/dictate/" + s + "/operation.json",
			dictType = Horn.getCompById("dictType_zl").getValue();
		// 指令状态,用于指令自动发起,获取工作流流程实例
		var h_exec_status = $("#h_exec_status").val();
		
		//待确认的指令先不检验下个节点是否有审批人员
		if ((s == 'zlqr' || s == 'zlxg' || s == 'zlcx')
				&& h_exec_status == '0') {	
			
		} else {
			if(!autoadd.hasNextNodeHuman(vc_node_id)){
				return;
			};
		}
		
		if (s == 'fhbtg' || s == 'spbtg' || s == 'zxbtg') {
			u = Horn.getCompById("vc_summary_dic").isValid();
			if (u) {
				var hu = Horn.getCompById("vc_summary_dic").getValue();
				var reg = /^\s*$/;
				if (reg.exec(hu)) {
					u = false;
				}
			}
		} else if (s == 'zltz' || s == 'zlzf') {// 指令调整、作废
			url = "/am/am/business/dictate/" + s + "/lauchOperation.json";
			u = true;
		} else if ((s == 'zlqr' || s == 'zlxg' || s == 'zlcx')
				&& h_exec_status == '0') {
			url = "/am/am/business/dictate/" + s + "/lauchAutoOperation.json";
			u = true;
		} else {
			u = true;
		}

		if (u) {
			var flag = window.parent.constants.o32_process[values.l_busin_flag];
			if (flag) {
				// 指令调整时，要记录下原先的本金、总金额，用于后续计算
				var h_en_occur_invest = $("#h_en_occur_invest").val();
				var h_en_occur_balance = $("#h_en_occur_balance").val();
				values.h_en_occur_invest = h_en_occur_invest;
				values.h_en_occur_balance = h_en_occur_balance;
				window.parent.o32Obj.doConfirm(s, url, values);
			} else {
				// 指令调整、指令作废要传对应的l_busin_flag:22310,22311
				if (s == "fhtg" || s == "fhbtg") {
					if(dictType){
						values.l_busin_flag = window.parent.constants.type2BusFlg[dictType];
					}
				}
				window.parent.comm_autodict.autodictCallBack(url, values);
			}
		} else {
			TDialog.Msg.error("提示", "请输入处理意见!", function() {
			});
		}
	},
	workflow_operate_grid : function(vc_btn_name,vc_node_id) {
		if(!vc_btn_name){//判断按钮是否是自动生成
			s = Horn.getCompById("buttonId").getValue();
		} else {
			s = vc_btn_name;
			$("#buttonId").val(s);
			$("#vc_node_id").val(vc_node_id);
		}
		var l_busin_flag = Horn.getComp("l_busin_flag").getValue();
		var flagType = constants.undoauto_fun[l_busin_flag];		
		var dbstepType = s;
		//判断是否输入处理意见
		var u=true;			
		if (dbstepType.indexOf("btg") != -1) {//检验批注
			u = Horn.getCompById("vc_summary_"+flagType).isValid();
			if (u) {
				var hu = Horn.getCompById("vc_summary_"+flagType).getValue();
				var reg = /^\s*$/;
				if (reg.exec(hu)) {
					u = false;
				}
			}
		}
	    if (u) {
	    	if (dbstepType == "fhtg"||dbstepType == "fhbtg") {
				autoadd.workflow_operate(dbstepType, '3', 1);
			} else if (dbstepType == "sptg"||dbstepType == "spbtg") {
				autoadd.workflow_operate(dbstepType, '6');
			}else if (dbstepType == "zxtg"||dbstepType == "zxbtg") {
				autoadd.workflow_operate(dbstepType, '4');
			}else if (dbstepType == "zlxg") {
				autoadd.workflow_operate(dbstepType, '2', 2);
			} else if (dbstepType == "zlcx") {
				autoadd.workflow_operate(dbstepType, '5', 2);
			}
		} else {
			TDialog.Msg.error("提示", "请输入处理意见!", function() {
			});
		}
	},
	/***************************************************************************
	 * 
	 * @param type
	 *            流程按钮操作类型：复核...、审批...、指令....
	 * @param l_action_in
	 *            指令操作类型2,3,4,5:变更、复核、执行、撤销
	 * @param workflow_type
	 *            流程类型
	 * @returns
	 */
	workflow_operate : function(type, l_action_in, workflow_type) {
		var vc_summary = "",
		buttonId = type,
//		vc_product_id = window.parent.Horn.get().getSelected
		grid=window.parent.autodicwin.getSelectgriddata(),
		url = "/am/am/business/dictate/" + type +"/operation.json";
		if (!workflow_type) {
			workflow_type = "";
		}
		var form = Horn.getComp("dodicForm");
		if (!form.isValid()) {
			return;
		}
		var values = form.getValues();
		var data = "workflow_step=" + workflowStep.review + "&buttonId=" + type
				+ "&l_function_no="
				+ functionIds.l_busin_flags[values.l_busin_flag]
				+ "&l_serial_no=" + values.l_serial_no + "&wf_instance_id="
				+ values.wf_instance_id + "&wf_node_id=" + values.wf_node_id
				+ "&l_busin_flag=" + values.l_busin_flag + "&l_action_in="
				+ l_action_in + "&workflow_type=" + workflow_type
				+ "&vc_node_id=" + values.vc_node_id + "&c_business_class=" + $.trim(grid.c_business_class)
				+ "&vc_product_id=" + $.trim(grid.vc_product_id);
		var l_busin_flag = Horn.getComp("l_busin_flag").getValue();
		var flagType = constants.undoauto_fun[l_busin_flag];
		if (flagType) {
			var form = Horn.getComp(flagType + "Form");
			
			/**
			 * 查询下个节点是否有审批人员
			 */
			if(!window.parent.dictateinfoex.hasNextNodeHuman(buttonId,data)){
				return;
			};
			
			vc_summary = form.getValues().vc_summary;
			data += "&vc_summary=" + vc_summary;
			if (flagType == "jdck" && l_action_in == "2") {// 解压出库,并且是指令修改
				var obj = {};
				var _grid = Horn.getComp("jdckTable").getSelecteds();
				if(_grid.length != 1){
	        			Horn.Tip.warn("请您选择要出库的资产！");
					return;
				}
				$("#body_jdckTable > tr").each(
						function() {
							var $this = $(this);	
							var business_type = $this.find("td:eq(2)").text();
							obj.l_collateral_no = common_operate.parseNaN($this.find("td:eq(3)").text());
							obj.l_current_amount = common_operate.parseNaN($this.find("td:eq(8)").text());
							if( business_type == "jyck"){
								obj.l_occur_amount = common_operate.parseNaN($this.find("td:eq(10) > div > input").val());
								obj.en_occur_balance = common_operate.parseNaN($this.find("td:eq(11) > div > input").val());
							} else {
								obj.l_occur_amount = common_operate.parseNaN($this.find("td:eq(10)").text());
								obj.en_occur_balance = common_operate.parseNaN($this.find("td:eq(11)").text());
							}
							
						});
				data += "&l_occur_amount=" + obj.l_occur_amount
						+ "&en_occur_balance=" + obj.en_occur_balance
						+ "&l_collateral_no=" + obj.l_collateral_no;
			} else if(flagType == "rate" && l_action_in == "2"){//利率变更,并且是指令修改				
				var rate_data = dictateinfoex.doRateCommit();
				data += "&" + rate_data;
			}else if(flagType == "fareRate" && l_action_in == "2"){//费率变更，指令为修改
				var fareRate_data = dictateinfoex.doFareRateCommit();
				data += "&" + fareRate_data;
				
			}else if(flagType == "adjust" && l_action_in == "2"){//结息日调整，并且是指令修改
				var paydate_data = dictateinfoex.doAdjustCommit();
				data += "&" + paydate_data;
			}
		}
		
		var type = constants.undoauto_fun[values.l_busin_flag],
			_vc_dict_log =values.vc_busin_caption + "——" + values.c_node_status + constants.bussinessMap[buttonId];
		data += "&vc_dict_log=" + _vc_dict_log;
		if (type) {
			  $.post(url, data, function(result){
						if (result == "ok") {
						  TDialog.Msg.alert("提示","操作成功",function(){
							  window.parent.autodicwin.afteruseWincommit();
					      }); 
						}
			}, "text");
		} else {
			//query_operate.doPost(url, data,query_operate.callbackWithDataGridRefresh());
			$.post(url, data, function(result){
				if (result == "ok") {
				  TDialog.Msg.alert("提示","操作成功",function(){
					  window.parent.autodicwin.afteruseWincommit();
			      }); 
				}
	        }, "text");
		}
	},
	initwin:function(){
		 /***显示界面初始化信息**/
	        var winheigh=Horn.getComp("l_winheigh").getValue();
	        var winwidth=Horn.getComp("l_winwidth").getValue();
	        var title=Horn.getComp("win_title").getValue();
	        Horn.getComp("autoshowWin").resetSizeWin(winwidth,winheigh);
			Horn.getComp("autoshowWin").setTitle(title);
			 autoadd.createButtons();
			Horn.getComp("autoshowWin").show();   
	 },
	 initgrid:function(){
		    var winheigh=Horn.getComp("l_winheigh").getValue();
	        var winwidth=Horn.getComp("l_winwidth").getValue();
	        var title=Horn.getComp("win_title").getValue();
	        Horn.getComp("autoshowWin").resetSizeWin(winwidth,winheigh);
			Horn.getComp("autoshowWin").setTitle(title);
			
			var l_serial_no=Horn.getComp("l_serial_no").getValue();
			var l_busin_flag = Horn.getComp("l_busin_flag").getValue();
			var flag = constants.undoauto_fun[l_busin_flag];
			var type= Horn.getComp("buttonId").getValue();
			//Horn.getCompById("flagType").setValue(flag);
			
			var obj = {};
			obj.l_serial_no = Horn.getComp("l_serial_no").getValue();
			obj.l_busin_flag = Horn.getComp("l_busin_flag").getValue();
			//还款计划调用
			if(flag=="repayplan"){
				var grid=window.parent.autodicwin.getSelectgriddata();
				Horn.getCompById("repayplanl_dictate_serial_no").setValue(l_serial_no);
			    Horn.getCompById("repayplanvc_stock_code").setValue(grid.vc_stock_code);
			    //处理显示按钮标识为显示按钮
                if(type == "zlxg"){
                	Horn.getCompById("repayplanButtype").setValue("1");
				}
			    equity_ivestment_repayplan.del('');
				equity_ivestment_repayplan.formQuery(flag + "Table");
			}else{
			  Horn.getCompById(flag + "Table").setBaseParams(obj);
			  Horn.getCompById(flag + "Table").load();
		    }
			if(type == "fhdb" || type == "spdb"){//待办处理的指令需要动态生成按钮
				autoadd.createButtons_grid(flag);
			}
			Horn.getComp("autoshowWin").show(); 
			//清空批注
			var form = Horn.getComp(flag + "Form");
			form.reset();
			
			
			autoadd.renderVcsummary2(flag);
			//指令撤销
//			if(type == "zlcx" || type == "zlck"){
//				$("div[name=" + flag + "Table").find(".u-datagrid-toolbar").hide();
//			} else {
//				$("div[name=" + flag + "Table").find(".u-datagrid-toolbar").show();
//			}
			 //处理显示按钮标识为显示按钮
            if(type == "zlxg"){
            	$("div[name=" + flag + "Table").find(".u-datagrid-toolbar").show();
			}else{
				$("div[name=" + flag + "Table").find(".u-datagrid-toolbar").hide();
			}
			if(type == "zlck"){
				$("div[name=" + flag +"Btn]").hide();	
			}else{
				$("div[name=" + flag +"Btn]").show();
			}
	 },
	//弹框关闭调用
	 afteruseWinclose:function(){
		 window.parent.autodicwin.afteruseWinclosenew();
		 //跳转界面，且隐藏包裹iframe的div
//		 $("#dodicForm").submit();
	}
};



var dictateinfoex = {
	// 利率变更-确认
	doRateCommit: function(){
		var grid = window.parent.autodicwin.getSelectgriddata();
		var vc_stock_code = grid.vc_stock_code;
		var arr_fileds = [];
		var arr_values = [];
		var obj = {};
	
		var colums = "c_rate_status|vc_organization_code|vc_stock_code|c_rate_type|c_currency_kind|"
			+ "c_base_kind|c_float_kind|c_change_kind|l_change_date|c_calc_kind|l_begin_date"
			+ "|l_end_date|en_begin_scale|en_end_scale|c_deal_flag|en_high_rate|en_low_rate"
			+ "|l_begin_days|l_end_days|l_rate_begin_date|l_first_pay_date|c_settle_kind|vc_sections|vc_remark"
			+ "|en_rate2|c_rate_kind|c_calc_type|l_rate_id|c_calc_cycle|en_pay_inteval|vc_rate_alias|en_rate";
		// 循环遍历datagrid，取出所有记录
		$("#body_rateTable > tr").each(
				function() {
					var $tr = $(this);
	
					obj.c_rate_status = $tr.find("td:eq(2) > div").text();
					obj.vc_organization_code = $tr.find("td:eq(3) > div").text();
					obj.vc_stock_code = $tr.find("td:eq(4) > div").text();
					obj.c_rate_type = $tr.find("td:eq(5) > div").text();
					obj.c_currency_kind = $tr.find("td:eq(6) > div").text();
					obj.c_base_kind = $tr.find("td:eq(7) > div").text();
					obj.c_float_kind = $tr.find("td:eq(8) > div").text();
					obj.c_change_kind = $tr.find("td:eq(9) > div").text();
					obj.l_change_date = $tr.find("td:eq(10) > div").text();
	
					obj.c_calc_kind = $tr.find("td:eq(11) > div").text();
					obj.l_begin_date = $tr.find("td:eq(12) > div").text();
					obj.l_end_date = $tr.find("td:eq(13) > div").text();
					obj.en_begin_scale = $tr.find("td:eq(14) > div").text();
					obj.en_end_scale = $tr.find("td:eq(15) > div").text();
					obj.c_deal_flag = $tr.find("td:eq(16) > div").text();
					obj.en_high_rate = $tr.find("td:eq(17) > div").text();
					obj.en_low_rate = $tr.find("td:eq(18) > div").text();
					obj.l_begin_days = $tr.find("td:eq(19) > div").text();
	
					obj.l_end_days = $tr.find("td:eq(20) > div").text();
					obj.l_rate_begin_date = $tr.find("td:eq(21) > div").text();
					obj.l_first_pay_date = $tr.find("td:eq(22) > div").text();
					obj.c_settle_kind = $tr.find("td:eq(23) > div").text();
					obj.vc_sections = $tr.find("td:eq(24) > div").text();
					obj.vc_remark = $tr.find("td:eq(25) > div").text();
					obj.en_rate2 = $tr.find("td:eq(26) > div").text();
					obj.c_rate_kind = $tr.find("td:eq(27) > div").text();
					obj.c_calc_type = $tr.find("td:eq(28) > div").text();
					obj.l_rate_id = $tr.find("td:eq(29) > div").text();
					obj.c_calc_cycle = $tr.find("td:eq(30) > div").text();
					obj.en_pay_inteval = $tr.find("td:eq(31) > div").text();
					
					obj.vc_rate_alias = $tr.find("td:eq(34) > div").text();
					obj.en_rate = $tr.find("td:eq(36) > div").text();
					// 处理对象里面的"undefined"或undefined
					common_operate.getNotNullObj(obj);
	
					var values = obj.c_rate_status + "|"
							+ obj.vc_organization_code + "|"
							+ obj.vc_stock_code + "|" + obj.c_rate_type + "|"
							+ obj.c_currency_kind + "|" + obj.c_base_kind + "|"
							+ obj.c_float_kind + "|" + obj.c_change_kind + "|"
							+ obj.l_change_date + "|" + obj.c_calc_kind + "|"
							+ obj.l_begin_date + "|" + obj.l_end_date + "|"
							+ obj.en_begin_scale + "|" + obj.en_end_scale + "|"
							+ obj.c_deal_flag + "|"
							+ common_operate.parseFloats(obj.en_high_rate)
							+ "|" + common_operate.parseFloats(obj.en_low_rate)
							+ "|" + obj.l_begin_days + "|" + obj.l_end_days
							+ "|" + obj.l_rate_begin_date + "|"
							+ obj.l_first_pay_date + "|"
							+ obj.c_settle_kind + "|" + obj.vc_sections + "|"
							+ obj.vc_remark + "|"
							+ common_operate.parseFloats(obj.en_rate2) + "|"
							+ obj.c_rate_kind + "|" + obj.c_calc_type + "|"
							+ obj.l_rate_id + "|"+ obj.c_calc_cycle + "|" 
							+ obj.en_pay_inteval+ "|" + obj.vc_rate_alias + "|"
							+ common_operate.parseFloats(obj.en_rate) ;
							arr_values.push(values);
							arr_fileds.push(colums);
				});
		var data = "vc_fields=" + arr_fileds.join("]") + "&vc_values="
				+ arr_values.join("]") + "&vc_stock_code=" + vc_stock_code;
		return data;
	},
	//费率变更确认
	doFareRateCommit : function(){
		// 机构编号
		var vc_organization_code = Horn.getCompById("vc_organization_code").getValue();
		var grid = window.parent.autodicwin.getSelectgriddata();
		var vc_stock_code = grid.vc_stock_code;
		//var vc_stock_code = Horn.getCompById("vc_stock_code").getValue();
		var arr_fileds = [];
		var arr_values = [];
		var obj = {};
	
		var colums = "l_rate_id|c_rate_status|vc_organization_code|vc_stock_code|c_ext_flag|c_rate_type|"
				+ "c_calc_cycle|c_calc_type|en_rate|vc_sections|c_settle_kind|vc_children_ext"
				+ "|en_pay_inteval|l_last_pay_date|l_first_pay_date|l_next_pay_date|l_rival_id|vc_remark";
		// 循环遍历datagrid，取出所有记录
		$("#body_fareRateTable > tr").each(
				function() {
					var $tr = $(this);
					obj.l_rate_id = $tr.find("td:eq(2) > div").text();
					obj.c_rate_status = $tr.find("td:eq(3) > div").text();
					obj.vc_organization_code = vc_organization_code;
					obj.vc_stock_code = $tr.find("td:eq(5) > div").text();
					obj.c_ext_flag = $tr.find("td:eq(6) > div").text();
					obj.c_rate_type = $tr.find("td:eq(8) > div").text();
					obj.c_calc_cycle = $tr.find("td:eq(10) > div").text();
					obj.c_calc_type = $tr.find("td:eq(12) > div").text();
					obj.en_rate = $tr.find("td:eq(14) > div").text();
					obj.vc_sections = $tr.find("td:eq(15) > div").text();
					obj.c_settle_kind = $tr.find("td:eq(17) > div").text();
					obj.vc_children_ext = $tr.find("td:eq(19) > div").text();
					obj.en_pay_inteval = $tr.find("td:eq(21) > div").text();
					obj.l_last_pay_date = $tr.find("td:eq(23) > div").text();
					obj.l_first_pay_date = $tr.find("td:eq(24) > div").text();
					obj.l_next_pay_date = $tr.find("td:eq(25) > div").text();
					obj.l_rival_id = $tr.find("td:eq(26) > div").text();
					//obj.vc_rival_name = $tr.find("td:eq(28) > div").text();
					obj.vc_remark = $tr.find("td:eq(28) > div").text();
					
	
					// 处理对象里面的"undefined"或undefined
					common_operate.getNotNullObj(obj);
	
					var values =obj.l_rate_id + "|" 
							+ obj.c_rate_status + "|"
							+ obj.vc_organization_code + "|"
							+ obj.vc_stock_code + "|" 
							+ obj.c_ext_flag + "|"
							+ obj.c_rate_type + "|" 
							+ obj.c_calc_cycle + "|"
							+ obj.c_calc_type + "|" 
							+ common_operate.parseFloats(obj.en_rate)  + "|"
							+ obj.vc_sections + "|" 
							+ obj.c_settle_kind + "|"
							+ obj.vc_children_ext + "|"
							+ obj.en_pay_inteval + "|"
							+ obj.l_last_pay_date + "|" 
							+ obj.l_first_pay_date + "|"
							+ obj.l_next_pay_date + "|"
							+obj.l_rival_id + "|"
							//+ obj.vc_rival_name + "|"
							+ obj.vc_remark  ;
							arr_values.push(values);
							arr_fileds.push(colums);
				});
		
		var data = "vc_fields=" + arr_fileds.join("]") + "&vc_values="
		+ arr_values.join("]") + "&vc_stock_code=" + vc_stock_code;
		return data;
	},
	// 结息日调整-提交
	doAdjustCommit : function() {
		var submitParams = {};
		$("#body_adjustTable > tr").each(
					function() {
						var $tr = $(this);
						submitParams.vc_stock_code = $tr.find("td:eq(2) > div")
								.text();
						submitParams.l_rate_id = $tr.find("td:eq(3) > div")
								.text();
						submitParams.vc_rate_alias = $tr.find("td:eq(4) > div")
								.text();
						submitParams.l_first_pay_date = $tr.find(
								"td:eq(5) > div").text();
						submitParams.l_next_begin_date = $tr.find(
								"td:eq(6) > div").text();
						submitParams.l_next_end_date = $tr.find(
								"td:eq(7) > div").text();
						submitParams.l_next_pay_date = $tr.find(
								"td:eq(8) > div").text();
					});
		var data = "vc_stock_code=" + submitParams.vc_stock_code +
					"&l_rate_id=" + submitParams.l_rate_id +
					"&vc_rate_alias=" + submitParams.vc_rate_alias +
					"&l_first_pay_date=" + submitParams.l_first_pay_date +
					"&l_next_begin_date=" + submitParams.l_next_begin_date +
					"&l_next_end_date=" + submitParams.l_next_end_date +
					"&l_next_pay_date=" + submitParams.l_next_pay_date;
		return data;
	}
};