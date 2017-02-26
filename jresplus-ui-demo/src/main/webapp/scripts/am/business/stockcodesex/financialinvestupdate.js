var flag;
$(function() {
	common_style.disable_style();
	var l_busin_flag = Horn.getCompById("l_busin_flag").getValue();
	if (l_busin_flag == "22216" || l_busin_flag == "22204"
			|| l_busin_flag == "22229") {
		stockcodesex2.updateInit('_edit');
	}

});

// 业务合同管理
var stockcodesex2 = {
	// 查询保证资产
	queryCollecterals : function(element) {
		var vc_product_id = Horn.getCompById("vc_product_id").getValue();
		var vc_stock_code = Horn.getCompById("vc_stock_code").getValue();
		var url = "/am/am/business/collateral/queryCollecterals.json";
		var data = "vc_input_name1=vc_product_id&vc_input_value1="
				+ vc_product_id + "&vc_input_table=collateral"
				+ "&vc_output_name1=vc_collateral_id"
				+ "&vc_output_name2=vc_collateral_name";
		query_operate.doPost(url, data, function(result) {
			if (result) {
				collecterals = result;
				Horn.getCompById(element).addItems(result, true);
				// 查询关联资产
				var url = "/am/am/business/collateral/queryRCollecterals.json";
				var data = "vc_input_name1=vc_stock_code&" + "vc_input_value1="
						+ vc_stock_code + "&vc_input_table=stockcollateral"
						+ "&vc_output_name1=l_collateral_no"
						+ "&vc_output_name2=vc_stock_code";
				query_operate.doPost(url, data, function(result2) {
					if (result2) {
						var checks = [];
						for ( var i = 0, j = result.length; i < j; i++) {
							for ( var m = 0, n = result2.length; m < n; m++) {
								var a = result[i].code;
								var b = result2[m].text;
								console.log(a == b);
								if (result[i].code == result2[m].text) {
									checks.push(result[i].code);
								}
							}
						}
						Horn.getCompById(element).setValue(checks.join(","));
					} else {

					}

				}, ajaxDataType.JSON);
			} else {
				Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},// 根据产品代码查询合同相关信息
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
				} else {
					 Horn.getComp("vc_branch_caption").clearValue();
						Horn.getComp("vc_project_type").clearValue();
						Horn.getComp("c_project_properties").clearValue();
						Horn.getComp("vc_project_manager").clearValue();
						Horn.getComp("en_project_money").clearValue();
						Horn.getComp("en_project_money_x").clearValue();
					//Horn.Tip.warn("操作失败！");
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
			//用来区分查询新增合同还是其他的查询
			if(type==""){
				url =url+"?l_busin_flag=22216";
			}else{
				url=url+"?l_busin_flag=22204";
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
//		  }else{
//			// 与o32不对接   产品代码
//				Horn.getCompById("vc_branch_caption" + type).clearValue();
//				Horn.getCompById("vc_trust_manager" + type).clearValue();
//				Horn.getCompById("l_product_begin_date" + type).clearValue();
//				Horn.getCompById("l_product_end_date" + type).clearValue();
//		       // Horn.getCompById("vc_contract_no" + type).clearValue();
//		        var oldvc_product_id=Horn.getCompById("vc_product_id" + type).getValue();
//				var url = "/am/am/business/stockcodesex/queryCpdm.json";
//				//用来区分查询新增合同还是其他的查询
//				if(type==""){
//					url =url+"?l_busin_flag=22216";
//				}else{
//					url=url+"?l_busin_flag=22204";
//				}
//				query_operate.doPost(url, "", function(result) {
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
	// 新增初始化
	updateInit : function(type) {
		common_operate.queryStockcodes("#vc_relative_code" + type
				+ " > input[name=vc_relative_code]");
		common_stockcodesex.checkCpdmDiv();

		Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > nobr > div").text());
		/****理财计划隐藏投向行业****/
		var c_invest_kind_deal=Horn.getCompById("c_invest_kind" + type).getValue();
		if(c_invest_kind_deal=="5"){
    		//银行理财计划
    		Horn.getCompById("c_invest_industry" + type).hide();
    		Horn.getCompById("c_invest_industry" + type).setDisabled(true);
    		stockcodesex2.deposittermshow(type,1);
//    		if(type == "_edit"){
//    			stockcodesex2.deposittermChange(2);
//    		}
    	}else{
    		stockcodesex2.deposittermshow(type,0);
    	}
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);		
		if (type == "_edit") {
			//stockcodesex2.cpdmChange(type);
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_project_code").setReadonly(true);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
			stockcodesex2.changefinancialinvest(2);
		}
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
	//修改金融产品类型获取对应标的物编号
	changefinancialinvest: function(type) {
		var c_invest_kind=Horn.getComp("c_invest_kind").getValue();
		$.post("/am/am/business/investproduct/comboxlist.json?c_product_type="+c_invest_kind+"&&l_function_no="+functionIds['investproduct']['ipl'], null, function(data) {
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
       }, "json");
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
   	}
};
