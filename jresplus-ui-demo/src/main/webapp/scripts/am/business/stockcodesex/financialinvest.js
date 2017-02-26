$(function() {
	common_style.disable_style();
	 dialog = common_operate.getDialog();
	 common_operate.getAuthorityList("jryw");
});

// 业务合同管理
var stockcodesex2 = {
		loadSuccess : function(){
			$("#data_dataTable").prepend("<ul class=\"tableoptli hor\"></ul>");
			var ul_show = $("#data_dataTable > ul");
			$("#body_dataTable > tr").each(function(){
				var $tr = $(this);
				$tr.find(".tableopt-btn").mouseover(function(){
					var top = $(this).position().top;
					var left = $(this).position().left;
					var ul_hide = $(this).find("ul").children("li");
					var _show_ul = ul_hide.clone(true);
					ul_show.children("li").remove();
					ul_show.css({"top":top + 30,"left":left + 10});
					ul_show.prepend(_show_ul);
					
					ul_show.show();
				});
				$tr.find(".tableopt-btn").mouseout(function(){
					ul_show.hide();
				});	
				
				ul_show.mouseover(function(){
					$(this).show();
				});
				
				ul_show.mouseout(function(){
					$(this).hide();
				});
			});
		},
	operationUrl : "/am/am/business/financialinvest/operation.json",
	formQuery : function(tableId, formId) {
		Horn.getCompById(tableId).setBaseParams(
				Horn.getCompById(formId).getValues());
		Horn.getCompById(tableId).load('', {
			"pageNo" : 1
		});
	},
	dataTablerowClick : function(rowData){
		if(rowData.c_stock_status != "待确认"){
			Horn.getComp("dataTable").hideButton("ctbutton2", false);
			Horn.getComp("dataTable").hideButton("ctbutton3", false);
			Horn.getComp("dataTable").hideButton("ctbutton4", false);
			Horn.getComp("dataTable").hideButton("ctbutton5", false);
			Horn.getComp("dataTable").hideButton("ctbutton6", false);
			Horn.getComp("dataTable").hideButton("ctbutton7", false);
			Horn.getComp("dataTable").hideButton("ctbutton8", false);
			Horn.getComp("dataTable").hideButton("ctbutton9", false);
		} else {
			Horn.getComp("dataTable").hideButton("ctbutton2", true);
			Horn.getComp("dataTable").hideButton("ctbutton3", true);
			Horn.getComp("dataTable").hideButton("ctbutton4", true);
			Horn.getComp("dataTable").hideButton("ctbutton5", true);
			Horn.getComp("dataTable").hideButton("ctbutton6", true);
			Horn.getComp("dataTable").hideButton("ctbutton7", true);
			Horn.getComp("dataTable").hideButton("ctbutton8", true);
			Horn.getComp("dataTable").hideButton("ctbutton9", true);
		}
	},
	//给查看绑定的字段加上超链接
	showView : function(data){
		return "<a class='stock_view' href='javascript:void(0);' onclick='stockcodesex2.viewDetail(\""+data.val+"\")'>"+data.val+"</a>";
	},//查看
	viewDetail : function(params){ 	
		var url = "/am/am/business/financialinvest/view.htm?vc_stock_code=" + params;
		//处理弹开界面已打开问题
		var titbefore="金融产品投资-";
		var iframelength=$('iframe[tabid=403015]', parent.parent.document).length;
		if(iframelength!=0){
			TDialog.Msg.error("提示","明细信息界面已打开,请先关闭!",function(){//ok 
				window.parent.parent.Horn.Frame.openMenu('403015', url, titbefore+"明细信息", 'inbox');
			}); 
		}else{
			window.parent.parent.Horn.Frame.openMenu('403015', url, titbefore+"明细信息", 'inbox');
		}
	},
	// 弹出新增窗口
	showTabWin : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402013');
	            	var titbefore="金融产品投资-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/business/financialinvest/add.htm";
	        		if (type == 1) {
	        			var c_invest_kind=Horn.getCompById("c_invest_kind_query").getValue();
	        			window.parent.parent.Horn.Frame.openMenu('403012', url+"?c_invest_kind="+c_invest_kind, title, 'inbox');
	        		}else{
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

	        			if (type == 2) {
	        				title = titbefore+"变更";
	        				url = "/am/am/business/financialinvest/edit.htm?vc_stock_code="
	        						+ grid[0].vc_stock_code + "&vc_product_id="
	        						+ grid[0].vc_product_id;
	        				window.parent.parent.Horn.Frame.openMenu('403013', url, title, 'inbox');
	        			} else if (type == 3) {
	        				title = titbefore+"撤销";
	        				url = "/am/am/business/financialinvest/revoke.htm?vc_stock_code="
	        						+ grid[0].vc_stock_code + "&vc_product_id="
	        						+ grid[0].vc_product_id;
	        				window.parent.parent.Horn.Frame.openMenu('403014', url, title, 'inbox');
	        			}else if (type == 4) {
							        title = titbefore+"还款计划";
        							url = "/am/am/business/stockcodesex/repayplanlist.htm?vc_stock_code="
        									+ grid[0].vc_stock_code+"&&l_rate_id=1";
        							//处理弹开界面已打开问题
        							var iframelength=$('iframe[tabid=403016]', parent.parent.document).length;
        							if(iframelength!=0){
        								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
        									window.parent.parent.Horn.Frame.openMenu('403016', url, title, 'inbox');
        								}); 
        							}else{
        								window.parent.parent.Horn.Frame.openMenu('403016', url, title, 'inbox');
        							}
						}

	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 新增
	doAdd : function() {
		var form = Horn.getComp("addForm");
		var url = "/am/am/business/financialinvest/doAdd/operation.json?l_function_no="
				+ functionIds.stockcodesex.add + "&workflow_step="
				+ workflowStep.launch + "&business_type=htxz";
		if (form.isValid()) {
			TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				var submitParams = form.getValues();
				query_operate.doPost(url, submitParams, function(result) {
					common_operate.endProgress();
					if (result == "ok") {
						TDialog.Msg.alert("提示", "操作成功！", function() {
							common_operate.refreshUrl("jrcp");
							window.parent.parent.Horn.Frame.screen.closeCurrent();
						});
					} else {
						//合同新增成功
						//分割错误信息用于获取返回的合同代码
						var s=result.split('|');
						if(s[0]=="OK"){
							Horn.getCompById("vc_stock_code").setValue(s[1]);
							//金融产品
							var _url = "/am/am/business/investproduct/queryInvestProduct.json";
							var _data = "vc_stock_code=" + s[1];
							query_operate.ajax(_url, _data, function(result){
								if(result && result.query.c_profit_type == "2"){
									TDialog.Msg.alert("提示","操作成功！",function(){
										//直接关闭当前页面，刷新grid
										common_operate.refreshUrl("ht");
									    window.parent.parent.Horn.Frame.screen.closeCurrent();
									});
								} else {
									submitParams = form.getValues();
									var nextmessage="利率新增";
									TDialog.Msg.confirmyorn("提示", "操作成功！投资明细代码为:"+s[1]+",是否继续下一步"+nextmessage+"？", function() {
										var u_div="#addli";
								       	   $("div[showdiv='true']").attr("class","me");
								       	   $("div[showdiv='true']").attr("showdiv","false");
								       	   $(u_div).attr("class","sh");
								       	   $(u_div).attr("showdiv","true");
								       	Horn.getCompById("rateTable").setBaseParams(submitParams);
						        		Horn.getCompById("rateTable").load();			        		
									}, function() {
										common_operate.refreshUrl("jrcp");
									    window.parent.parent.Horn.Frame.screen.closeCurrent();
									});
								}
							});							
							
						}else{
							Horn.Tip.warn(result);
						}	
					}
				});
			}, function() {
			});
		}
	},
	// 查询对手方
	query_l_rival_obj : function(element) {
		var value = Horn.getCompById(element).getValue();
		var url = "/am/am/business/loanrival/getLrival.json";
		var data = "vc_input_name1=l_rival_id&" + "vc_input_value1=" + value
				+ "&vc_input_table=loanrival" + "&vc_output_name1=l_rival_id"
				+ "&vc_output_name2=vc_name";
		query_operate.doPost(url, data, function(result) {
			if (result && result.query) {
				var obj = {};
				obj.label = result.query.l_rival_id;
				obj.value = result.query.vc_all_name;
				Horn.getCompById(element).addItems([ obj ], true);
				Horn.getCompById(element).selectFirst();
			} else {
				// Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},
	
	// 查询付款帐户
	query_l_account_id : function(grid, id) {
		var url = "/am/am/business/financialinvest/queryAccount.json";
		var data = "vc_input_name1=vc_product_id&" + "vc_input_value1="
				+ grid[0].vc_product_id + "&vc_input_table=bankaccountinfo"
				+ "&vc_output_name1=l_serial_no"
				+ "&vc_output_name2=vc_bank_name"
				+ "&vc_output_name3=vc_user_name"
				+ "&vc_output_name4=vc_bank_account";
		query_operate.doPost(url, data, function(result) {
			if (result) {
				Horn.getCompById(id).addItems(result, true);
				Horn.getCompById(id).selectFirst();
			} else {
				Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},
	//查询产品代码
	queryCpdm : function(type){
		Horn.getCompById("vc_branch_caption" + type).clearValue();
		Horn.getCompById("vc_project_type" + type).clearValue();
		Horn.getCompById("c_project_properties" + type).clearValue();
		Horn.getCompById("vc_project_manager" + type).clearValue();
		Horn.getCompById("en_project_money" + type).clearValue();
        var oldvc_project_code=Horn.getCompById("vc_project_code" + type).getValue();
		var url = "/am/am/business/stockcodesex/queryXmdm.json?l_function_no=" + functionIds.stockcodesex.query_xmdm_a;
		//获取项目类型
		var vc_project_type=Horn.getCompById("vc_project_typequery").getValue();
		//用来区分查询新增合同还是其他的查询
		if(type==""){
			url =url+"&&vc_project_type="+vc_project_type+"&&l_busin_flag=22216";
		}else{
			url=url+"&&vc_project_type="+vc_project_type+"&&l_busin_flag=22204";
		}
		query_operate.ajax(url, "", function(result) {
			if (result) {
				Horn.getCompById("vc_project_code" + type).addItems(result,true);
				if(type!=1){
					Horn.getCompById("vc_project_code" + type).setValue(oldvc_project_code,true);
				}
			} else {
				//Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
//		  }
//		else{
//			// 与o32不对接   产品代码
//				Horn.getCompById("vc_branch_caption" + type).clearValue();
//				Horn.getCompById("vc_trust_manager" + type).clearValue();
//				Horn.getCompById("l_product_begin_date" + type).clearValue();
//				Horn.getCompById("l_product_end_date" + type).clearValue();
//		       // Horn.getCompById("vc_contract_no" + type).clearValue();
//		        var oldvc_product_id=Horn.getCompById("vc_product_id" + type).getValue();
//				var url = "/am/am/business/stockcodesex/queryCpdm.json?l_function_no=" + functionIds.stockcodesex.query_cpdm_a;
//				//用来区分查询新增合同还是其他的查询
//				if(type==""){
//					url =url+"&&l_busin_flag=22216";
//				}else{
//					url=url+"&&l_busin_flag=22204";
//				}
//				query_operate.ajax(url, "", function(result) {
//					if (result) {
//						Horn.getCompById("vc_product_id" + type).addItems(result,true);
//						if(type!=1){
//							Horn.getCompById("vc_product_id" + type).setValue(oldvc_product_id,true);
//						}
//					} else {
//						//Horn.Tip.warn("操作失败！");
//					}
//				}, ajaxDataType.JSON);
//		  }
	},
	// 查询收款帐户
	query_l_rival_account_id : function(grid, id) {
		var url = "/am/am/business/financialinvest/queryRaccount.json";
		var data = "vc_input_name1=l_rival_id&" + "vc_input_value1="
				+ grid[0].l_rival_id + "&vc_input_table=rivalbankaccountinfo"
				+ "&vc_output_name1=l_serial_no"
				+ "&vc_output_name2=vc_branch_name"
				+ "&vc_output_name3=vc_user_name"
				+ "&vc_output_name4=vc_bank_account";
		query_operate.doPost(url, data, function(result) {
			if (result) {
				Horn.getCompById(id).addItems(result, true);
				//Horn.getCompById(id).selectFirst();
			} else {
				Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},
		
	// 根据产品代码查询合同相关信息
	cpdmChange : function(type) {
		 if (type == 1) {
				type = "";
			} else if (type == 2) {
				type = "_edit";
				Horn.getComp("vc_project_code").setReadonly(true);
			}
			var vc_project_code = Horn.getCompById("vc_project_code" + type).getValue();
			var url = "/am/am/business/stockcodesex/query_xm_detail.json";
			var data = "l_function_no=" + functionIds.stockcodesex.query_xm_detail
					+ "&vc_project_code=" + vc_project_code;
			query_operate.doPost(url, data, function(result) {
				if (result && result.project) {
					Horn.getComp("vc_branch_caption").setValue(result.project.vc_branch_name);
					Horn.getComp("vc_project_type").setValue(result.project.vc_project_type);
					Horn.getComp("c_project_properties").setValue(result.project.c_project_properties);
					Horn.getComp("vc_project_manager").setValue(result.project.vc_project_manager);
					Horn.getComp("en_project_money").setValue(result.project.en_project_money);
					Horn.getComp("en_project_money_x").setValue($("#en_project_money"+ type + "> nobr > div").text());
					Horn.getComp("vc_contract_no").setValue(vc_project_code);
				} else {
					Horn.getComp("vc_branch_caption").clearValue();
					Horn.getComp("vc_project_type").clearValue();
					Horn.getComp("c_project_properties").clearValue();
					Horn.getComp("vc_project_manager").clearValue();
					Horn.getComp("en_project_money").clearValue();
					Horn.getComp("vc_contract_no").clearValue();
					Horn.getComp("en_project_money_x").clearValue();
					//Horn.Tip.warn("操作失败！");
				}
			}, ajaxDataType.JSON);			
	},
	// 新增初始化
	updateInit : function(type) {
		common_operate.queryStockcodes("#vc_relative_code" + type
				+ " > input[name=vc_relative_code]");
		common_stockcodesex.checkCpdmDiv();

		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		/****理财计划隐藏投向行业****/
		var c_invest_kind_deal=Horn.getCompById("c_invest_kind" + type).getValue();
		if(c_invest_kind_deal=="5"){
    		//银行理财计划
    		Horn.getCompById("c_invest_industry" + type).hide();
    		Horn.getCompById("c_invest_industry" + type).setDisabled(true);
    		stockcodesex2.deposittermshow(type,1);
//    		//投资期限联动
//    		if(type == "_edit"){
//    			stockcodesex2.deposittermChange(2);
//    		}
    	}else{
    		stockcodesex2.deposittermshow(type,0);
    	}
    	
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > nobr > div").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_project_code").setReadonly(true);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.changefinancialinvest(2);
			stockcodesex2.contract_typeChange(2);
		} else {
			stockcodesex2.queryCpdm(type);
			stockcodesex2.changefinancialinvest(1);
			
		}

	},
	// 变更
	doEdit : function(type) {
		var form = Horn.getComp("editForm");
		var url = "/am/am/business/financialinvest/" + type +"/operation.json?l_function_no="
				+ functionIds.stockcodesex.dictate + "&workflow_step="
				+ workflowStep.launch + "&business_type=" + type;

		if (form.isValid()) {
			TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				var submitParams = form.getValues();
				query_operate.doPost(url, submitParams, function(result) {
					common_operate.endProgress();
					if (result == "ok") {
						TDialog.Msg.alert("提示", "操作成功！", function() {
							common_operate.refreshUrl("ht");
							window.parent.parent.Horn.Frame.screen.closeCurrent();
						});
					} else {
						Horn.Tip.warn(result);
					}
				});
			}, function() {
			});
		}
	},
	selectTab : function() {

	},
	// 弹出编辑窗口:到后台查询一条数据，塞入form
//	showEditWinByQuery : function(fcode, gridId, url, textfieldId) {
//		Horn.getComp(textfieldId).setReadonly(true);
//		var grid = Horn.getComp(gridId).getSelecteds();
//		var checkedLength = grid.length;
//		if (checkedLength !== 1) {
//			Horn.Tip.warn("请选择一条记录！");
//			return;
//		}
//
//		url = url + "?l_function_no=" + functionIds[fcode]["view"]
//				+ "&vc_op_code=" + grid[0].vc_op_code
//				+ "&vc_organization_code=1001";
//		$.post(url, "", function(data) {
//			if (data && data.operate) {
//				Horn.getComp("editForm").setValues(data.operate);
//				Horn.getComp("editWin").show();
//			} else {
//				Horn.Tip.warn("编辑失败！");
//			}
//		}, "json");
//	},
	
	// 利率种类下拉框监听事件
	lvzl : function() {
		var value = Horn.getCompById("c_rate_type_lvbg").getValue();
		// 固定
		if (value == "0") {
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>年利率%");
			Horn.getCompById("c_currency_kind_lvbg").hide();
			Horn.getCompById("c_base_kind_lvbg").hide();
			Horn.getCompById("c_float_kind_lvbg").hide();
			Horn.getCompById("c_change_kind_lvbg").hide();
			Horn.getCompById("c_calc_kind_lvbg").hide();
			Horn.getCompById("en_high_rate_lvbg").hide();
			Horn.getCompById("en_low_rate_lvbg").hide();
			Horn.getCompById("vc_sections_lvbg").hide();
			Horn.getCompById("en_rate2_lvbg").hide();
			Horn.getCompById("en_rate_lvbg").show();

			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_base_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_float_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_change_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_calc_kind_lvbg").setDisabled(true);
			Horn.getCompById("en_high_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_low_rate_lvbg").setDisabled(true);
			Horn.getCompById("vc_sections_lvbg").setDisabled(true);
			Horn.getCompById("en_rate2_lvbg").setDisabled(true);
			Horn.getCompById("en_rate_lvbg").setDisabled(false);
		} else if (value == "1") {// 按基准利率浮动
			Horn.getCompById("c_currency_kind_lvbg").show();
			Horn.getCompById("c_base_kind_lvbg").show();
			Horn.getCompById("c_float_kind_lvbg").show();
			Horn.getCompById("c_change_kind_lvbg").show();
			Horn.getCompById("c_calc_kind_lvbg").show();
			Horn.getCompById("en_high_rate_lvbg").show();
			Horn.getCompById("en_low_rate_lvbg").show();
			Horn.getCompById("en_rate_lvbg").hide();
			Horn.getCompById("vc_sections_lvbg").hide();

			Horn.getCompById("c_currency_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_base_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_float_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_change_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_calc_kind_lvbg").setDisabled(false);
			Horn.getCompById("en_high_rate_lvbg").setDisabled(false);
			Horn.getCompById("en_low_rate_lvbg").setDisabled(false);
			Horn.getCompById("en_rate_lvbg").setDisabled(true);
			Horn.getCompById("vc_sections_lvbg").setDisabled(true);
		} else {// 按日期区间浮动
			Horn.getCompById("c_currency_kind_lvbg").hide();
			Horn.getCompById("c_base_kind_lvbg").hide();
			Horn.getCompById("c_float_kind_lvbg").hide();
			Horn.getCompById("c_change_kind_lvbg").hide();
			Horn.getCompById("c_calc_kind_lvbg").hide();
			Horn.getCompById("en_high_rate_lvbg").hide();
			Horn.getCompById("en_low_rate_lvbg").hide();
			Horn.getCompById("en_rate_lvbg").hide();
			Horn.getCompById("en_rate2_lvbg").hide();
			Horn.getCompById("vc_sections_lvbg").show();

			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_base_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_float_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_change_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_calc_kind_lvbg").setDisabled(true);
			Horn.getCompById("en_high_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_low_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_rate2_lvbg").setDisabled(true);
			Horn.getCompById("vc_sections_lvbg").setDisabled(false);
		}
	},// 计算类别下拉框监听事件
	lvlb : function() {
		var value = Horn.getCompById("c_rate_kind_lvbg").getValue();
		if (value == 1) {// 利率/溢价回购率
//			Horn.getCompById("c_settle_kind_lvbg").show();
			Horn.getCompById("en_pay_inteval_lvbg").show();
			Horn.getCompById("l_first_pay_date_lvbg").show();
			Horn.getCompById("l_rate_begin_date_lvbg").show();
			
			Horn.getCompById("c_settle_kind_lvbg").setDisabled(false);
			Horn.getCompById("en_pay_inteval_lvbg").setDisabled(false);
			Horn.getCompById("l_first_pay_date_lvbg").setDisabled(false);
			Horn.getCompById("l_rate_begin_date_lvbg").setDisabled(false);
		} else {
//			Horn.getCompById("c_settle_kind_lvbg").hide();
			Horn.getCompById("en_pay_inteval_lvbg").hide();
			Horn.getCompById("l_first_pay_date_lvbg").hide();
			Horn.getCompById("l_rate_begin_date_lvbg").hide();
			
			Horn.getCompById("c_settle_kind_lvbg").setDisabled(true);
			Horn.getCompById("en_pay_inteval_lvbg").setDisabled(true);
			Horn.getCompById("l_first_pay_date_lvbg").setDisabled(true);
			Horn.getCompById("l_rate_begin_date_lvbg").setDisabled(true);
		}
	},// 根据结算周期，计算首次结算日
	jszq : function(){
		var en_pay_inteval = Horn.getCompById("en_pay_inteval_lvbg").getValue();		
		var l_begin_date = Horn.getCompById("l_rate_begin_date_lvbg").getValue();
	
		if(!l_begin_date){
			return;
		}
		if(!en_pay_inteval){
			Horn.getCompById("l_first_pay_date_lvbg").clearValue();
        }else if(en_pay_inteval=='0'){
        	Horn.getCompById("l_first_pay_date_lvbg").setValue(l_begin_date);
        }else{
        	l_begin_date = l_begin_date.substring(0,4) + "/" + l_begin_date.substring(4,6) + "/" + l_begin_date.substring(6,8);
            var date_begin=new Date(l_begin_date);
            if(parseInt(l_begin_date.substring(8,10)) < 20){
            	en_pay_inteval = en_pay_inteval - 1;
            }
            date_begin.setMonth(date_begin.getMonth() + parseInt(en_pay_inteval));
            Horn.getCompById("l_first_pay_date_lvbg").setValue(FormatDate(date_begin,"yyyyMMdd"));
        }
	},
	// 计算公式下拉框监听事件
	jsgs : function() {
		var value = Horn.getCompById("c_calc_formula_lvbg").getValue();
		if (value == "0") {// 存续天数
			Horn.getCompById("c_calc_cycle_lvbg").show();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(false);

			Horn.getCompById("vc_calc_formula_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
		} else if (value == "1") {
			Horn.getCompById("c_calc_cycle_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);

			Horn.getCompById("vc_calc_formula_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
		} else if (value == "2") {// 自定义公式
			Horn.getCompById("c_calc_cycle_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);

			Horn.getCompById("vc_calc_formula_lvbg").show();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(false);
		}
	},// 调整方式下拉框监听事件
	tzfs : function() {
		var value = Horn.getCompById("c_change_kind_lvbg").getValue();
		if (value == "3") {
			Horn.getCompById("c_deal_flag_lvbg").show();
			Horn.getCompById("c_deal_flag_lvbg").setDisabled(false);
			Horn.getCompById("l_change_date_lvbg").show();
			Horn.getCompById("l_change_date_lvbg").setDisabled(false);
		} else {
			Horn.getCompById("c_deal_flag_lvbg").hide();
			Horn.getCompById("c_deal_flag_lvbg").setDisabled(true);
			Horn.getCompById("l_change_date_lvbg").hide();
			Horn.getCompById("l_change_date_lvbg").setDisabled(true);
		}
	},// 浮动算法下拉框监听事件
	fdsf : function() {
		var value = Horn.getCompById("c_calc_kind_lvbg").getValue();
		var c_rate_type = Horn.getCompById("c_rate_type_lvbg").getValue();
		if (c_rate_type != "1") {
			return;
		}
		if (value == "1") {
			// if (c_rate_type == "1") {
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>等差浮动%");
			// }
			Horn.getCompById("en_rate_lvbg").show();
			Horn.getCompById("en_rate_lvbg").setDisabled(false);

			Horn.getCompById("en_rate2_lvbg").hide();
			Horn.getCompById("en_rate2_lvbg").setDisabled(true);
		} else if (value == "2") {
			Horn.getCompById("en_rate2_lvbg").show();
			Horn.getCompById("en_rate2_lvbg").setDisabled(false);

			Horn.getCompById("en_rate_lvbg").hide();
			Horn.getCompById("en_rate_lvbg").setDisabled(true);
		} else if (value == "4") {
			// if (c_rate_type == "1") {
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>等差浮动%");
			// }
			Horn.getCompById("en_rate_lvbg").show();
			Horn.getCompById("en_rate_lvbg").setDisabled(false);
			Horn.getCompById("en_rate2_lvbg").show();
			Horn.getCompById("en_rate2_lvbg").setDisabled(false);
		}
	},
	
	// 获取所有的利率类别
	getListData : function() {
		var arr1 = Horn.getCompById("c_rate_kind_lvbg").getListData().data;
		var arr2 = [];
		// var arr3 = [];
		$("#body_rateTable > tr").each(function() {
			var $tr = $(this);
			c_rate_kind = $tr.find("td:eq(27) > div").text();
			//当查询到的利率状态为作废时，我们对其不进行过滤，使其仍能添加
			c_rate_status = $tr.find("td:eq(2) > div").text();
			if(c_rate_status!="3"){
			for ( var i = 0, j = arr1.length; i < j; i++) {
				if (c_rate_kind == arr1[i].key) {
					arr2.push(c_rate_kind);
				}
			}
			}
		});
		//config_id:7105,是否启用复利利率,0否1是   add by jinpan 2015.11.03
		common_operate.getConfigById("7105");
		if (str_config_value == "0"){
			arr2.push("7");
		}
		
		Horn.getCompById("c_rate_kind_lvbg").filter(arr2, false, true);
	},
	
	// 股权性质-下拉框联动
	gqxzChange : function() {
		var c_ex_type = Horn.getComp("c_ex_type").getValue();
		if (c_ex_type == "a" || c_ex_type == "b") {
			Horn.getComp("l_invested_enterprise").hide();
			Horn.getComp("l_invested_enterprise").setDisabled(true);

			Horn.getComp("c_relative_exchange").show();
			Horn.getComp("vc_relative_code").show();

			Horn.getComp("c_relative_exchange").setDisabled(false);
			Horn.getComp("vc_relative_code").setDisabled(false);

			Horn.getComp("vc_relative_enterprise").setRequired(false);
		} else if (c_ex_type == "c" || c_ex_type == "d") {
			Horn.getComp("l_invested_enterprise").show();
			Horn.getComp("l_invested_enterprise").setDisabled(false);

			Horn.getComp("c_relative_exchange").hide();
			Horn.getComp("vc_relative_code").hide();

			Horn.getComp("c_relative_exchange").setDisabled(true);
			Horn.getComp("vc_relative_code").setDisabled(true);

			Horn.getComp("vc_relative_enterprise").setRequired(true);
		}
	},
	// 用金额大写控件时，处理金额大写
	dealCapital : function(name, id) {
		$("nobr > div").hide();
		$("input[name=" + name + "]").next().blur(function() {
			Horn.getCompById(id).setValue($("nobr > div").text());
		});
	},
	// 根据公式计算收益
	sumProfit : function($this) {
		var en_occur_invest_add = Horn.getCompById("en_occur_invest_add")
				.getValue();
		var c_calc_way = Horn.getCompById("c_calc_way_add").getValue();
		var en_rate = $this.val() / 100;
		var l_period = Horn.getCompById("l_period_add").getValue();
		if (c_calc_way == 1) {// 公式1，本金*利率/期数
			Horn.getCompById("en_profit_add").setValue(
					en_occur_invest_add * en_rate / l_period);
		}
	},
	//修改金融产品类型获取对应标的物编号
	changefinancialinvest: function(type) {
		var c_invest_kind=Horn.getComp("c_invest_kind").getValue();
		$.ajax({
			type : "post",
			url : "/am/am/business/investproduct/comboxlist.json?c_product_type="+c_invest_kind+"&&l_function_no="+functionIds['investproduct']['ipl'],
			data : "",
			async : false,
			dataType : ajaxDataType.JSON,
			success : function(data) {
				if (data !=null) {
					if(type!=1){
						var s=Horn.getComp("vc_stock_code1").getValue();
						Horn.getComp("vc_stock_code1").addItems(data,true);
						Horn.getComp("vc_stock_code1").setValue(s);
					}else{
						Horn.getComp("vc_stock_code1").addItems(data,true);
					}
				} else {
					//Horn.Tip.warn("操作失败");
					Horn.Tip.warn(data);
				}
			}
		});
	},
	//根据标的物获取对应对手序号（发行方）
	changefinancialloan: function(type) {
		var type2;
		if(type==1){
			type2="";
		}else if(type==2){
			type2="_edit";
		}else if(type==3){
			type2="_look";
		}else{
			type2="_"+type+"";
		}
		var vc_stock_code1=Horn.getComp("vc_stock_code1").getValue();
		$.post("/am/am/business/investproduct/look.json?vc_stock_code1="+vc_stock_code1, null, function(data) {
			if (data !=null) {
				Horn.getCompById("l_rival_id"+type2).setValue(data.l_publisher_id);
				Horn.getCompById("l_begin_date"+type2).setValue(data.l_begin_days);
				Horn.getCompById("l_end_date"+type2).setValue(data.l_end_days);
				if(Horn.getCompById("vc_stock_name"+type2).getValue()==""||Horn.getCompById("vc_stock_name"+type2).getValue()==null){
					Horn.getCompById("vc_stock_name"+type2).setValue(data.vc_stock_name1);
				}	
			} else {
				//Horn.Tip.warn("操作失败");
				Horn.Tip.warn(data);
			}
       }, "json");
	},
	//投资期限联动计算合同到期日期
	deposittermChange : function(type) {
        if (type == 1) {
			type = "";
		} else if (type == 2) {
			type = "_edit";
		}
        var l_begin_date=Horn.getCompById("l_begin_date"+type).getValue();
        var c_deposit_term=Horn.getCompById("c_deposit_term"+type).getValue();
       // var l_end_date=Horn.getComp("l_end_date"+type).getValue();
        if(c_deposit_term=="0"){
        	//jresui的bug日期控件调用setReadonly(false)方法之后会选中前一天 
        	//Horn.getCompById("l_end_date"+type).setReadonly(false);
        	if(l_begin_date==null||l_begin_date==""){
	        	Horn.getCompById("l_end_date"+type).clearValue();
	        }
        }else{
        	//Horn.getCompById("l_end_date"+type).setReadonly(true);
        	if(l_begin_date==null||l_begin_date==""){
	        	Horn.getCompById("l_end_date"+type).clearValue();
	        }else{
	            var  en_pay_inteval=0;
	            //月
	        	if(c_deposit_term=="1"){
	        		en_pay_inteval=3;
	        	}else if(c_deposit_term=="2"){
	        		en_pay_inteval=6;
	        	}else if(c_deposit_term=="3"){
	        		en_pay_inteval=12;
	        	}else if(c_deposit_term=="4"){
	        		en_pay_inteval=24;
	        	}else if(c_deposit_term=="5"){
	        		en_pay_inteval=36;
	        	}else if(c_deposit_term=="6"){
	        		en_pay_inteval=60;
	        	}
	        	l_begin_date=l_begin_date.substring(0,4)+"/"+l_begin_date.substring(4,6)+"/"+l_begin_date.substring(6,8);
 	            var date_begin=new Date(l_begin_date);		 	
 	            date_begin.setMonth(date_begin.getMonth() + en_pay_inteval);
 	            Horn.getCompById("l_end_date"+type).setValue(dataUtil.FormatDate(date_begin,"yyyyMMdd"));
	        }
        }
     },
 	//理财产品显示投资期限
 	deposittermshow : function(type,operate) {
         //显示投资期限
         if(operate==1){
        	 Horn.getCompById("c_deposit_term"+type).show();
        	 Horn.getCompById("c_deposit_term"+type).setDisabled(false);
         }else{
        	 Horn.getCompById("c_deposit_term"+type).hide();
        	 Horn.getCompById("c_deposit_term"+type).setDisabled(true);
         }
      },
    //投资性质联动
      contract_typeChange : function(type) {
   		    if (type == 1) {
   				type = "";
   			} else if (type == 2) {
   				type = "_edit";
   			}
   		    var c_contract_type=Horn.getCompById("c_contract_type"+type).getValue();
   		    if(c_contract_type=="2"){
   		    	$("span[ref='en_contract_balance']").html("<b class='hc_red'>*</b>资产金额(元)");
   		    }else{
   		    	$("span[ref='en_contract_balance']").html("<b class='hc_red'>*</b>投资金额(元)");
   		    }
   	},
	//项目代码绑定列表查询   vc_project_type项目类型
	queryxmdm : function(type2){
		     var type="_"+type2;
			  Horn.getCompById("vc_branch_caption" + type).clearValue();
				Horn.getCompById("vc_project_type" + type).clearValue();
				Horn.getCompById("c_project_properties" + type).clearValue();
				Horn.getCompById("vc_project_manager" + type).clearValue();
				Horn.getCompById("en_project_money" + type).clearValue();
		        var c_invest_kind_deal=Horn.getCompById("c_invest_kind_query").getValue();
		        if(c_invest_kind_deal=="2"){
		    		//股权计划
		        	vc_project_type2="1";	
		    	}else if(c_invest_kind_deal=="1"){
		    		//债权计划
		    		vc_project_type2="9";
		    	}else if(c_invest_kind_deal=="4"){
		    		//信托计划
		    		vc_project_type2="3";
		    	}else if(c_invest_kind_deal=="5"){
		    		//银行理财计划
		    		vc_project_type2="5";
		    	}else{
		    		//资产管理产品
		    		vc_project_type2="a";
		    	}
		        Horn.getCompById("vc_select_status"+type).setValue(vc_project_type2);
				var url = "/am/am/business/stockcodesex/queryXmdm.json?l_function_no=" + functionIds.stockcodesex.query_xmdm_a+"&&vc_project_type="+vc_project_type2+"&&l_busin_flag=22204";
				query_operate.ajax(url, "", function(result) {
					if (result) {
						Horn.getCompById("vc_project_code" + type).addItems(result,true);						
					} else {
						//Horn.Tip.warn("操作失败！");
					}
				}, ajaxDataType.JSON);
		},
		// 根据项目代码查询项目相关信息
		xmdmChange : function() {
			       var type="_xmbd";
			       var vc_project_code = Horn.getCompById("vc_project_code" + type).getValue();
					var url = "/am/am/business/stockcodesex/query_xm_detail.json";
					var data = "l_function_no=" + functionIds.stockcodesex.query_xm_detail
							+ "&vc_project_code=" + vc_project_code;
					query_operate.doPost(url, data, function(result) {
						if (result && result.project) {
							Horn.getCompById("vc_branch_caption"+ type).setValue(result.project.vc_branch_name);
							Horn.getCompById("vc_project_type"+ type).setValue(result.project.vc_project_type);
							Horn.getCompById("c_project_properties"+ type).setValue(result.project.c_project_properties);
							Horn.getCompById("vc_project_manager"+ type).setValue(result.project.vc_project_manager);
							Horn.getCompById("en_project_money"+ type).setValue(result.project.en_project_money);
							Horn.getCompById("en_project_money_x"+ type).setValue($("#en_project_money"+ type + "> nobr > div").text());
						} else {
						 	Horn.getCompById("vc_branch_caption"+ type).clearValue();
							Horn.getCompById("vc_project_type"+ type).clearValue();
							Horn.getCompById("c_project_properties"+ type).clearValue();
							Horn.getCompById("vc_project_manager"+ type).clearValue();
							Horn.getCompById("en_project_money"+ type).clearValue();
							Horn.getCompById("vc_contract_no"+ type).clearValue();
							Horn.getCompById("en_project_money_x"+ type).clearValue();
						}
					}, ajaxDataType.JSON);
			
		}
	
};
