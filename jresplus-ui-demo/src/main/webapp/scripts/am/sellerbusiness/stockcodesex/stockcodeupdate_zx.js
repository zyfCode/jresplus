$(function() {
	common_style.disable_style();

	var l_busin_flag = Horn.getCompById("l_busin_flag").getValue(),
	 	type = Horn.getCompById("htype").getValue(),
	 	dictType = Horn.getCompById("dictType_zl").getValue(),
	 	buttonId = $("#buttonId").val();

	dictateinfoex.show_equity();
	
//	common_operate.addIcon("en_occur_profit_" + type, "stockcodesex2.showMonenyWin('sy')");
//	common_operate.addIcon("en_offset_balance_" + type, "stockcodesex2.showMonenyWin('dk')");
	
//	if (buttonId == "fhtg" || buttonId == "fhbtg" || buttonId == "sptg"
//			|| buttonId == "spbtg" || buttonId == "zlck") {
	if (buttonId == "fhdb" || buttonId == "spdb" || buttonId == "zlck") {
		if (!dictType) {
			Horn.getCompById("l_occur_date_" + type).hide();
			Horn.getCompById("en_occur_balance_" + type).hide();
			
			Horn.getCompById("l_occur_date_" + type).setDisabled(true);
//			Horn.getCompById("en_occur_balance_" + type).setDisabled(true);
			
			if(l_busin_flag == "22036"){//股权分红送股
				Horn.getCompById("l_occur_amount_" + type).hide();
				Horn.getCompById("l_occur_amount_" + type).setDisabled(true);
			}
		}
	}
});

// 业务合同管理
var stockcodesex2 = {
	// 查询付款帐户
//	query_l_account_id : function(grid, id) {
//		var url = "/am/am/business/stockcodesex/queryAccount.json";
//		var data = "vc_input_name1=vc_product_id&" + "vc_input_value1="
//				+ grid[0].vc_product_id + "&vc_input_table=bankaccountinfo"
//				+ "&vc_output_name1=l_serial_no"
//				+ "&vc_output_name2=vc_bank_name"
//				+ "&vc_output_name3=vc_user_name"
//				+ "&vc_output_name4=vc_bank_account";
//		query_operate.doPost(url, data, function(result) {
//			if (result) {
//				Horn.getCompById(id).addItems(result, true);
//				Horn.getCompById(id).selectFirst();
//			} else {
//				Horn.Tip.warn("操作失败！");
//			}
//		}, ajaxDataType.JSON);
//	},
	//获取表单值用于计算
	getdetformvalues: function() {
		var values=Horn.getComp("dodicForm").getValues();
		return  values;
	},//获取type
	getdetformtype: function() {
		var type=Horn.getCompById("htype").getValue();
		return  type;
	},
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
	},// 关闭收益明细
	closeProfitWin : function(dd,h_profit_type) {
		var type = Horn.getCompById("htype").getValue();
		if(h_profit_type == constants.profitType.SY){//收益
			if(type == "gqtzsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
			/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			} 	else if(type == "gqsyqsy") {				
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
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
			}else if (type == "dqdf"||type == "qjzr") {//预收=本金+收益-抵扣
				Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
			}else if(type == "jctzsy") {//预收=收益-抵扣
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
			}else if(type == "qtsyqsy") {				
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
			} 	else if(type == "srgqsyq"){//预收=成本-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} 	else if(type == "xyzmrfk"){//预收=成本-抵扣
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
			}
				else if(type == "qjzr") {//预收=收益-抵扣
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
			} else if (type == "gqhg" || type == "gqcr") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if (type == "dqdf" ) {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			} else if (type == "crgqsyq" || type == "gqsyqhg") {//预收=本金+收益-抵扣
				var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
				var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
				var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(dd);
				Horn.getCompById("en_preoccur_balance_" + type).setValue(
						en_preoccur_balance.toFixed(2));
			}else if(type == "jctz"){//预收=成本-抵扣
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
				Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
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
//		Horn.getCompById("en_preoccur_balance_x_"+ type)
//			.setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital").text());
		common_operate.dealCapital("en_preoccur_balance_x_" + type,"en_preoccur_balance_"+ type);
	}
};

/**
 * 股权投资业务管理
 */
var equity_investment = {
	// 收益类别下拉框监听事件
	sylb : function() {
		var type = Horn.getCompById("htype").getValue();
		var value = Horn.getCompById("c_ext_flag_" + type).getValue();
		if (value == "1101" || value == "1111" || value == "1112") {
			Horn.getCompById("en_occur_invest_" + type).show();
			Horn.getCompById("l_end_date_" + type).show();

			Horn.getCompById("en_occur_invest_" + type).setDisabled(false);
			Horn.getCompById("l_end_date_" + type).setDisabled(false);
		} else {
			Horn.getCompById("en_occur_invest_" + type).hide();
			Horn.getCompById("l_end_date_" + type).hide();

			Horn.getCompById("en_occur_invest_" + type).setDisabled(true);
			Horn.getCompById("l_end_date_" + type).setDisabled(true);
		}
	}
};

/**
 * 还款方式对象：根据业务类型得到对应的还款方式
 */
var c_repay_type = {
	"gqtz" : "A",
	"gqtzsy" : "0",
	"gqfhsg" : "0",
	"jctz":"A",
	"jctzsy":"0",
	"wqtz":"A",
	"wqtzsy":"0",
	"zqtz":"A",
	"zqtzsy":"0",
	"ck":"A",
	"cksy":"0",
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
	show_equity : function() {
		var grid = window.parent.Horn.getComp("dataTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var l_serial_no = grid[0].l_serial_no;
		var l_busin_flag = grid[0].l_busin_flag;
		// 指令调整、作废
		if (l_busin_flag == "22310" || l_busin_flag == "22311") {
			var url = "/am/am/business/dictate/query_l_busin_flag.json";
			var data = "l_serial_no=" + l_serial_no;
			$.ajax({
				type : "post",
				url : url,
				data : data,
				async : false,
				dataType : ajaxDataType.JSON,
				success : function(result) {
					l_busin_flag = result.query.l_busin_flag;
				}
			});
		}
		var type = constants.o32_process[l_busin_flag];
		dictateinfoex.doAfterShow(grid ,type);

	},// 回调之后处理函数
	doAfterShow : function(grid,type) {
		var obj = {};

		obj.code = grid[0].vc_stock_code;
		obj.text = grid[0].vc_stock_name;
		Horn.getCompById("vc_stock_code_" + type).addItems([ obj ], true);
		Horn.getCompById("vc_stock_code_" + type).selectFirst();
		
		obj.code = grid[0].vc_product_id;
		obj.text = grid[0].vc_product_name;
		Horn.getCompById("vc_product_id_" + type).addItems([ obj ], true);
		Horn.getCompById("vc_product_id_" + type).selectFirst();
		//指令界面：查询对手方
		common_stockcodesex.queryL_rival_id(type);

		var dictType = Horn.getCompById("dictType_zl").getValue();
		if (!dictType) {
			Horn.getCompById("l_occur_date_" + type).setValue(
					grid[0].l_preoccur_date);
			Horn.getCompById("en_occur_balance_" + type).setValue(
					grid[0].en_preoccur_balance);
		}
		
		common_operate.getConfig_7186();
		if(config_7186 == "1"){//与o32资金接口对接	
			//查询组合id	
			common_stockcodesex.queryCombId(type);
			
			$("#vc_product_id_" + type).parent().find("span").html("<b class=\"hc_red\">* </b>基金代码");
			$("#vc_product_id_" + type).parent().find("span").attr("title","基金代码");
			
			Horn.getCompById("l_account_id_" + type).hide();
			Horn.getCompById("l_account_id_" + type).setDisabled(true);
			
		} else {			
			Horn.getCompById("combi_id_" + type).hide();
			Horn.getCompById("combi_id_" + type).setDisabled(true);		
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
			Horn.getCompById("l_occur_amount_" + type).setValue(
					grid[0].l_preoccur_amount);
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
		case "dqdf"://到期兑付
            common_stockcodesex.queryStockInfo(grid,type);
			break;
			// 期间转让
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
		case "gqsyqhg":// 股权收益权回购
            common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "crgqsyq"://出让股权收益权
            common_stockcodesex.queryStockInfo(grid,type);
			break;
		case "jctz":// 金融产品投资
			if(config_7186 == "1"){//与o32资金接口对接				
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			} else {
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(false);
				Horn.getCompById("l_rival_account_id_" + type).show();				
			}
			common_stockcodesex.queryEnableBalance("dodicForm");
			break;
		case "jctzsy":// 金融产品投资收益
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
		case "wqhg":// 物权回购
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
		// 存款收益
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
		default:
		}
		// 根据业务type类型处理金额大写
//		$("nobr > div").hide();
//		common_operate.dealCapital("en_preoccur_balance_x_" + type,"en_preoccur_balance_"+ type);
		Horn.getCompById("en_preoccur_balance_x_"+ type)
		.setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital")
						.text());
	}
};

/**
 * 收益模块
 */
var profit = {
		// 显示金额修改窗口
		showMonenyWin : function(h_profit_type) {
			//Horn.getCompById("h_profit_type").setValue(h_profit_type);	
			var obj = {};

			var grid = window.parent.Horn.getComp("dataTable").getSelecteds();
			obj = Horn.getComp("dodicForm").getValues();
			obj.l_dictate_serial_no = grid[0].l_serial_no;
			obj.c_profit_kind = constants.cProfitKind[h_profit_type];
			var dictype="3";
			var s=$("#buttonId").val();
	    	if(s){
	    		window.parent.profit.showMonenyWin2(h_profit_type,obj,dictype);
	    	}else{
	    		alert("当前js只使用在指令界面");
	    	}
		}
};