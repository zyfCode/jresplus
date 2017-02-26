var flag;
$(function() {
	common_style.disable_style();

	var buttonId = Horn.getCompById("buttonId").getValue(),
	 	type = Horn.getCompById("htype").getValue(),
	 	l_busin_flag = Horn.getCompById("l_busin_flag").getValue(),
	// 指令状态,用于指令自动发起,获取工作流流程实例
	 	h_exec_status = $("#h_exec_status").val();
	// 根据按钮判断，是指令：调整or修改or确认
	if (buttonId == "zlxg" || buttonId == "zlcx" || buttonId == "zlqr" || (buttonId == "zlck" && h_exec_status != "9")) {
		Horn.getCompById("l_occur_date_" + type).hide();
		Horn.getCompById("en_occur_balance_" + type).hide();
		Horn.getCompById("l_occur_date_" + type).setDisabled(true);
		Horn.getCompById("en_occur_balance_" + type).setDisabled(true);
		
		if(l_busin_flag == "22036"){//股权分红送股
			Horn.getCompById("l_occur_amount_" + type).hide();
			Horn.getCompById("l_occur_amount_" + type).setDisabled(true);
		}
	} else if (buttonId == "zltz" || buttonId == "zlzf") {		
		if(l_busin_flag == "22036" || l_busin_flag == "22151"){//股权分红送股、主动支付，没有本金
			$("#h_en_occur_invest").val(0);
		} else {
			Horn.getCompById("en_occur_invest_" + type).setReadonly(true);	
		}
	}

	dictateinfoex.show_equity();
	
//	common_operate.addIcon("en_occur_profit_" + type, "stockcodesex2.showMonenyWin('sy')");
//	common_operate.addIcon("en_offset_balance_" + type, "stockcodesex2.showMonenyWin('dk')");

	if (type == "gqtz" || type == "jctz"|| type == "wqtz"|| type == "zqtz"|| type == "ck"|| type == "srgqsyq"|| type == "xyzmrfk"||type=='srqtsyq'||type=='wtdkff'||type=='srxdzc'||type=='pjmr') {
		common_stockcodesex.queryEnableBalance("dodicForm");
		equity_investment.queryProfit(type);
		$("#en_occur_invest_" + type + " > input:eq(1)").keyup(function() {
			equity_investment.queryProfit(type);
		});
	} else if (type == "gqhg" || type == "gqcr" || type == "jchg" || type == "jccr"|| type == "wqhg"||type == "zqhg" || type == "zqcr"||type == "ckhg" || type == "ckcr"|| type == "zczc"||type == "crgqsyq"||type == "gqsyqhg"||type == "qjzr" ||type == "dqdf"||type == "qtsyqhg"||type == "crqtsyq"||type == "wtdkfb"||type == "xdzcfbq"||type == "crxdzc"||type == "pjtx"||type == "pjhg") {
		$("#en_occur_invest_" + type + " > input:eq(1)").keyup(
				function() {
					var $this = $(this),
					 	en_occur_invest = $this.val(),
						en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue(),
						en_preoccur_balance = parseFloat(en_occur_invest)
							+ parseFloat(en_occur_profit);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
				});
	}

});

// 业务合同管理
var stockcodesex2 = {
	// 查询付款帐户
	query_l_account_id : function(grid, id) {
		var url = "/am/am/business/stockcodesex/queryAccount.json";
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
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	//获取表单值用于计算
	getdetformvalues: function() {
		var values=Horn.getComp("dodicForm").getValues();
		return  values;
	},//获取type
	getdetformtype: function() {
		var type=Horn.getCompById("htype").getValue();
		return  type;
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
	},// 关闭收益明细
	closeProfitWin : function(dd,h_profit_type) {
		var type = Horn.getCompById("htype").getValue();
		if(h_profit_type == constants.profitType.SY){//收益
			if(type == "gqtzsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} 	else if(type == "gqsyqsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				
			}else if (type == "gqhg" || type == "gqcr") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}	else if (type == "crgqsyq" || type == "gqsyqhg") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				
			}	else if(type == "jctzsy") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} else if (type == "jchg" || type == "jccr") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "wqtzsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} else if (type == "wqhg") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "zqtzsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} else if (type == "zqhg" || type == "zqcr") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "cksy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} else if (type == "ckhg" || type == "ckcr") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}	else if (type == "qjzr"||type == "dqdf") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} else if(type == "qtsyqsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if (type == "qtsyqhg" || type == "crqtsyq") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "wtdkfb" || type == "wtdksx") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "xdzcfb") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "xdzcsx") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "crxdzc") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "pjhg") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "pjsx") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "pjtx") {//预收=收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}
		}else if(h_profit_type == constants.profitType.DK){//抵扣
			//将负数转为正数
			dd = -dd;
			//Horn.getCompById("en_offset_balance_" + type).setValue(dd);
			if(type == "gqtz"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}	else if(type == "srgqsyq"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
				
				
			}	else if(type == "xyzmrfk"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}
				else if(type == "gqtzsy") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} 	else if(type == "qjzr") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}
				else if(type == "gqsyqsy") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}	else if (type == "gqhg" || type == "gqcr") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
				
			}	else if (type == "dqdf" ) {//预收=本金+收益-抵扣
					var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
					var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(
							en_preoccur_balance.toFixed(2));
			}	else if (type == "crgqsyq" || type == "gqsyqhg") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}	else if(type == "jctz"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if(type == "jctzsy") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if (type == "jchg" || type == "jccr") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}else if(type == "wqtz"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if(type == "wqtzsy") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if (type == "wqhg") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}else if(type == "zqtz"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if(type == "zqtzsy") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if (type == "zqhg" || type == "zqcr") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}else if(type == "ck"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if(type == "cksy") {//预收=收益-抵扣
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if (type == "ckhg" || type == "ckcr") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}
		}
		Horn.getCompById("en_preoccur_balance_x_"+ type)
		.setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital").text());
	}
};

/**
 * 股权投资业务管理
 */
var equity_investment = {
		//公式算法
		gssfChange : function(type){
			if(type == 1){
				type = "_add";
			} else {
				type = "_edit";
			}
			
			var value = Horn.getCompById("c_calc_way" + type).getValue();
			if(value == "0"){//无
				Horn.getCompById("l_period" + type).hide();
				Horn.getCompById("l_period" + type).setDisabled(true);
				
				Horn.getCompById("en_occur_invest" + type).setRequired(false);
				Horn.getCompById("l_begin_date" + type).setRequired(false);
				Horn.getCompById("l_end_date" + type).setRequired(false);
				Horn.getCompById("en_rate" + type).setRequired(false);
			} else if(value == "1"){//
				Horn.getCompById("l_period" + type).show();
				Horn.getCompById("l_period"+ type).setDisabled(false);
				
				Horn.getCompById("en_occur_invest" + type).setRequired(true);
				Horn.getCompById("en_rate" + type).setRequired(true);
				Horn.getCompById("l_begin_date" + type).setRequired(false);
				Horn.getCompById("l_end_date" + type).setRequired(false);
			} else {
				Horn.getCompById("l_period" + type).show();
				Horn.getCompById("l_period"+ type).setDisabled(false);
				
				Horn.getCompById("en_occur_invest" + type).setRequired(true);
				Horn.getCompById("l_begin_date" + type).setRequired(true);
				Horn.getCompById("l_end_date" + type).setRequired(true);
				Horn.getCompById("en_rate" + type).setRequired(true);
			}
		},
	//收益类别下拉框监听事件
	sylb : function() {
		var type = Horn.getCompById("htype").getValue(),
			value = Horn.getCompById("c_ext_flag_" + type).getValue();
		if (value == "1101" || value == "1111" || value == "1112") {
			Horn.getCompById("en_occur_invest_" + type).show();
			Horn.getCompById("l_end_date_" + type).show();

			Horn.getCompById("en_occur_profit_" + type).setReadonly(true);
			$("input[name=en_occur_profit]").addClass("text_disabled");
			Horn.getCompById("en_occur_invest_" + type).setDisabled(false);
			Horn.getCompById("l_end_date_" + type).setDisabled(false);
		} else if  (value == "1102" || value == "1103" )  {
			Horn.getCompById("en_occur_invest_" + type).hide();
			Horn.getCompById("l_end_date_" + type).hide();
			
			Horn.getCompById("en_occur_profit_" + type).setReadonly(false);
			$("input[name=en_occur_profit]").removeClass("text_disabled");
			
			Horn.getCompById("en_occur_invest_" + type).setDisabled(true);
			Horn.getCompById("l_end_date_" + type).setDisabled(true);
		}
		else {
			Horn.getCompById("en_occur_invest_" + type).hide();
			Horn.getCompById("l_end_date_" + type).hide();

			Horn.getCompById("en_occur_profit_" + type).setReadonly(true);
			$("input[name=en_occur_profit]").addClass("text_disabled");
			Horn.getCompById("en_occur_invest_" + type).setDisabled(true);
			Horn.getCompById("l_end_date_" + type).setDisabled(true);
		}
	},//结算起始,结算截止
	//收益类的指令发起时，如果是暂收收益或者定额收益，修改预收收益则自动计算预收金额
	balance_calculate : function(type) {
		var sType = "";
		switch (type) {
		case 1:
			sType = "gqtzsy";
			break;
		case 2:
			sType = "jctzsy";
			break;			
		case 3:
			sType = "wqtzsy";
			break;
		case 4:
			sType = "zqtzsy";
			break;
		case 5:
			sType = "cksy";
			break;
		case 6:
			sType = "gqsyqsy";
			break;
		case 7:
			sType = "qtsyqsy";
			break;
		case 8:
			sType = "xdzcsx";
			break;
		case 9:
			sType = "pjsx";
			break;
		case 10:
			sType = "wtdksx";
			break;
		default:
		}
//		Horn.getCompById("en_occur_profit_" + sType).setValue(Number(Horn.getCompById("en_occur_profit_" + sType).getValue()));
//		var balance = Horn.getCompById("en_occur_profit_" + sType).getValue() - Horn.getCompById("en_offset_balance_" + sType).getValue();
		var balance = Horn.getCompById("en_occur_profit_" + sType).getValue();
		Horn.getCompById("en_preoccur_balance_" + sType).setValue(balance);
		Horn.getCompById("en_preoccur_balance_x_"+ sType).setValue($("#en_preoccur_balance_" + sType + " > .u-typefield-capital").text());

		
	},
	symx_rqjs : function(type){
		if(type == 1){
			type = "_add";
		} else if(type == 2){
			type = "_edit";
		}
		var en_occur_invest = common_operate.parseNaN(Horn.getCompById("en_occur_invest" + type).getValue());
		var c_calc_way = Horn.getCompById("c_calc_way" + type).getValue();
		var en_rate = common_operate.parseNaN(Horn.getCompById("en_rate" + type).getValue() / 100);
		var l_period = common_operate.parseNaN(Horn.getCompById("l_period" + type).getValue());
		var l_begin_date = common_operate.parseNaN(Horn.getCompById("l_begin_date" + type).getValue());
		var l_end_date = common_operate.parseNaN(Horn.getCompById("l_end_date" + type).getValue());
		var days = common_operate.parseNaN(dataUtil.calculateDays(l_begin_date, l_end_date) + 1);
		var en_profit = 0;
		if (c_calc_way == 1) {// 公式1，本金*利率/期数
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / l_period);
		}else if(c_calc_way == 2){// 公式1，本金*利率/360*存续天数/期数					
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / 360 * days /l_period);
		} else if(c_calc_way == 3){// 公式1，本金*利率/365*存续天数/期数
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / 365 * days /l_period);
		}else if(c_calc_way == 4){// 公式1，本金*利率/366*存续天数/期数
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / 366 * days /l_period);
		}
		Horn.getCompById("en_profit" + type).setValue(en_profit.toFixed(2));
	},
	// 股权投资-收益计算
	queryProfit : function(type) {
		// 不管存不存在flag这个延时执行函数，先清除
		clearTimeout(flag);
		var url = "/am/am/business/stockcodesex/queryProfit.json?c_repay_type=" + c_repay_type[type],
			form = Horn.getComp("dodicForm"),
			data = form.getValues();
			data.l_dictate_serial_no = data.l_serial_no;

		// 延时500ms执行请求事件，如果感觉时间长了，就用合适的时间, 只要有输入则不执行keyup事件
		flag = setTimeout(
				function() {
					// 这里面就是调用的请求
					query_operate.doPost(url,data,function(result) {
										if (result && result.query) {											
//											var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
											var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
//											en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); 
											en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
											Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
										} 
//										else {
//											Horn.Tip.warn(result.errorMsg);
//										}
									}, ajaxDataType.JSON);
				}, 100);	
	},//根据投资对象联动收款帐户
	tzdx : function(){
		equity_investment.query_l_rival_account_id();
	},// 查询收款帐户
	query_l_rival_account_id : function() {
		var type = Horn.getCompById("htype").getValue();
		var l_rival_id = Horn.getCompById("l_rival_id_" + type).getValue();
		var url = "/am/am/business/stockcodesex/queryRaccount.json";
		var data = "vc_input_name1=l_rival_id&" + "vc_input_value1="
				+ l_rival_id + "&vc_input_table=rivalbankaccountinfo&vc_input_name2=c_data_status&vc_input_value2=1" 
				+ "&vc_output_name1=l_serial_no"
				+ "&vc_output_name2=vc_branch_name"
				+ "&vc_output_name3=vc_user_name"
				+ "&vc_output_name4=vc_bank_account";
		query_operate.doPost(url, data, function(result) {
			if (result) {
				Horn.getCompById("l_rival_account_id_" + type).addItems(result, true);
				Horn.getCompById("l_rival_account_id_" + type).selectFirst();
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	}
};



/**
 * 还款方式对象：根据业务类型得到对应的还款方式
 */
var c_repay_type = {
	"gqtz" : "A",
	"jctz":"A",
	"gqtzsy" : "0",
	"gqfhsg" : "0",
	"wqtz" : "A",
	"wqtzsy" : "0",
	"zqtz" : "A",
	"zqtzsy" : "0",
	"ck" : "A",
	"cksy" : "0",
	"srgqsyq" : "A",
	"gqsyqsy" : "0",
	"xyzmrfk" : "A",
	"srqtsyq" : "A",
	"qtsyqsy" : "0",
	"wtdkff" : "A",
	"wtdksx" : "0",
	"srxdzc" : "A",
	"xdzcsx" : "0",
	"pjmr" : "A",
	"pjsx" : "0"	
};

/**
 * 业务流程管理
 */
var dictateinfoex = {
	operation_url : "/am/am/business/dictate/operation.json",
	show_equity : function() {
		var grid = window.parent.Horn.getComp("dataTable").getSelecteds(),
		l_busin_flag = Horn.getCompById("l_busin_flag").getValue();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var type = common_stockcodesex.formObj[l_busin_flag];
		dictateinfoex.doAfterShow(type, grid);
	},// 回调之后处理函数
	doAfterShow : function(type, grid) {
		var obj = {};

		obj.code = grid[0].vc_stock_code;
		obj.text = grid[0].vc_stock_name;
		Horn.getCompById("vc_stock_code_" + type).addItems([ obj ], true);
		Horn.getCompById("vc_stock_code_" + type).selectFirst();
		
		obj.code = grid[0].vc_product_id;
		obj.text = grid[0].vc_product_name;
		Horn.getCompById("vc_product_id_" + type).addItems([ obj ], true);
		Horn.getCompById("vc_product_id_" + type).selectFirst();

		Horn.getCompById("htype").setValue(type);
		
		//指令界面：查询对手方
		common_stockcodesex.queryL_rival_id(type);
		
		common_operate.getConfig_7186();
		if(config_7186 == "1"){//与o32资金接口对接
			//查询组合id
			common_stockcodesex.queryCombId(type);
			
			Horn.getCompById("l_account_id_" + type).hide();
			Horn.getCompById("l_account_id_" + type).setDisabled(true);		
		} else {			
			Horn.getCompById("combi_id_" + type).hide();
			Horn.getCompById("combi_id_" + type).setDisabled(true);	
			stockcodesex2.query_l_account_id(grid, "l_account_id_" + type);
		}
		switch (type) {
		// 股权投资
		case "gqtz":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		// 股权投资收益
		case "gqtzsy":
			equity_investment.sylb();
			break;
		case "gqfhsg":// 股权分红送股
			// 查询合同信息，获取证券代码及当前数量
			url = "/am/am/business/stockcodesex/view.json?vc_stock_code="
					+ grid[0].vc_stock_code + "&vc_product_id="
					+ grid[0].vc_product_id;
			query_operate.doPost(url, null, function(result) {
				if (result && result.query) {
					Horn.getCompById("l_stock_amount_" + type).setValue(
							result.query.l_stock_amount);
					var c_ex_type = result.query.c_ex_type;
					if(c_ex_type == "c" || c_ex_type == "d"){
						Horn.getCompById("vc_relative_code_" + type).hide();
						Horn.getCompById("vc_relative_code_" + type).setDisabled(true);
					} else {
						Horn.getCompById("vc_relative_code_" + type).setValue(
								result.query.vc_relative_code);
					}
				} 
//				else {
//					Horn.Tip.warn("操作失败！");
//				}
			}, ajaxDataType.JSON);
			
			break;
		case "gqhg":// 股权回购
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "gqcr":// 股权出让
			common_stockcodesex.queryStockInfo(grid,type);
			break;
			// 信用证买入付款
		case "xyzmrfk":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		case "dqdf":// 到期兑付
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		//期间转让
		case "qjzr":
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		// 受让股权收益权
		case "srgqsyq":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		// 股权收益权收益
		case "gqsyqsy":
			equity_investment.sylb();
			break;
		case "crgqsyq":// 出让股权收益权
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "gqsyqhg":// 股权收益权回购
			common_stockcodesex.queryStockInfo(grid,type);
			break;		
			// 金融产品投资
		case "jctz":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		case "jctzsy":// 金融产品收益
			equity_investment.sylb();
			break;
		case "jchg":// 金融产品回购
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "jccr":// 金融产品出让
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "zdzf":// 主动支付
			if(config_7186 == "1"){//与o32资金接口对接
				Horn.getCompById("en_current_balance_" + type).hide();
				Horn.getCompById("en_current_balance_" + type).setDisabled(true);
			}
			
			common_stockcodesex.queryCombId(type);
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
			// 物权投资
		case "wqtz":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		// 物权投资收益
		case "wqtzsy":
			equity_investment.sylb();
			break;
		case "wqhg":// 物权到期
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		// 债权投资
		case "zqtz":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		// 债权投资收益
		case "zqtzsy":
			equity_investment.sylb();
			break;
		case "zqhg":// 债权回购
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "zqcr":// 债权出让
			common_stockcodesex.queryStockInfo(grid,type);
			break;
			// 存款
		case "ck":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		// 存款收息
		case "cksy":
			equity_investment.sylb();
			break;
		case "ckhg":// 存款提取
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "ckcr":// 到期转存
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "zczr":// 资产转入
			Horn.getCompById("en_occur_balance_" + type).setValue(0);
			break;
		case "zczc":// 资产转出
			common_stockcodesex.queryStockInfo(grid,type);
			break;
			// 受让其他收益权
		case "srqtsyq":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		//其他收益权收益
		case "qtsyqsy":
			equity_investment.sylb();
			break;
		case "crqtsyq":// 出让其他收益权
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "qtsyqhg":// 其他收益权回购
			common_stockcodesex.queryStockInfo(grid,type);
			break;		
		default:
			// 委托贷款发放
		case "wtkdff":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		//委托贷款收息
		case "wtdksx":
			equity_investment.sylb();
			break;
		case "wtdkfb"://委托贷款返本
			common_stockcodesex.queryStockInfo(grid,type);
			break;
			//受让信贷资产
		case "srxdzc":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		//信贷资产收息
		case "xdzcsx":
			equity_investment.sylb();
			break;
		case "xdzcfb"://信贷资产返本
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "crxdzc"://出让信贷资产
			common_stockcodesex.queryStockInfo(grid,type);
			break;
			//票据买入
		case "pjmr":
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		//票据收息
		case "pjsx":
			equity_investment.sylb();
			break;
		case "pjtx"://票据贴现
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "pjhg"://票据回购
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "pjcr"://票据出让
			common_stockcodesex.queryStockInfo(grid,type);
			break;
		}
		// 根据业务type类型处理金额大写
		$("nobr > div").hide();
		Horn.getCompById("en_preoccur_balance_x_"+ type)
			.setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital").text());
		common_operate.dealCapital("en_preoccur_balance_x_"+ type, "en_preoccur_balance_" + type);
	}
};
/**
 * 收益模块
 */
var profit = {
		// 显示金额修改窗口
		showMonenyWin : function(h_profit_type) {
			var obj = {};
			var grid = window.parent.Horn.getComp("dataTable").getSelecteds();
			obj = Horn.getComp("dodicForm").getValues();
			obj.l_dictate_serial_no = grid[0].l_serial_no;
			obj.c_profit_kind = constants.cProfitKind[h_profit_type];
			var dictype="1";
			var s=$("#buttonId").val();
	    	if(s){
	    		window.parent.profit.showMonenyWin2(h_profit_type,obj,dictype);
	    	}else{
	    		alert("当前js只使用在指令界面");
	    	}
		}	
};