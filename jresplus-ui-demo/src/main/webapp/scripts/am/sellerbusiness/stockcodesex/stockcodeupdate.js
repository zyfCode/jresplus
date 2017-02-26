var flag;
$(function() {
	common_style.disable_style();
	var l_busin_flag = Horn.getCompById("l_busin_flag").getValue(),
		type = Horn.getCompById("htype").getValue();
	if (l_busin_flag == "22216" || l_busin_flag == "22204"
			|| l_busin_flag == "22229") {
		var show_type=Horn.getCompById("c_business_type_edit").getValue();
		if(show_type=="I"){
			stockcodesex2.updateInit2('_edit');
		}else if(show_type=="5"){
			stockcodesex2.updateInit('_edit');
		}else if(show_type=="D"){
			stockcodesex2.updateInit3('_edit');
		}else if(show_type=="4"){
			stockcodesex2.updateInit4('_edit');
		}else if(show_type=="F"){
			stockcodesex2.updateInit5('_edit');
        }else if(show_type=="6"){
			stockcodesex2.updateInit6('_edit');
		}else if(show_type=="H"){
			stockcodesex2.updateInit_H('_edit');
		}else if(show_type=="C"){
			stockcodesex2.updateInit_c('_edit');
		}else if(show_type=="2"){
			stockcodesex2.updateInit_xdzc('_edit');
		}else if(show_type=="3"){
			stockcodesex2.updateInit_pjzc('_edit');
		}else if(show_type=="7"){
			stockcodesex2.updateInit_7('_edit');
		}

	} else if(l_busin_flag == "22201" || l_busin_flag == "22202" || l_busin_flag == "22214" || l_busin_flag == "22227") {
		stockcodesex2.beforeUpdate(type);
	}

});

// 业务合同管理
var stockcodesex2 = {
	// 查询保证资产
	queryCollecterals : function(element, type) {
		var vc_stock_code = Horn.getComp("vc_stock_code").getValue();
		// 查询关联资产
		var url = "/am/am/business/collateral/queryRCollecterals.json";
		var data = "vc_input_name1=vc_stock_code&" + "vc_input_value1="
				+ vc_stock_code + "&vc_input_table=stockcollateral"
				+ "&vc_output_name1=l_collateral_no"
				+ "&vc_output_name2=vc_stock_code";
		query_operate.doPost(url, data, function(result) {
			if (result) {
				var checks = [];
				for ( var i = 0, j = result.length; i < j; i++) {
					checks.push(result[i].code);
				}
				Horn.getCompById(element).setValue(checks.join(","));
			} 
		}, ajaxDataType.JSON);
	},// 根据产品代码查询合同相关信息
	cpdmChange : function(type,bussintype) {
				if (type == 1) {
					type = "";
				} else if (type == 2) {
					type = "_edit";
					Horn.getComp("vc_product_id").setReadonly(true);
				}
		        var vc_product_id = Horn.getCompById("vc_product_id" + type).getValue();
				var url = "/am/am/business/stockcodesex/query_cp_detail.json";
				var data = "l_function_no=" + functionIds.stockcodesex.query_cp_detail
						+ "&vc_product_id=" + vc_product_id;
				query_operate.doPost(url, data, function(result) {
					if (result && result.product) {
						Horn.getComp("vc_branch_caption").setValue(result.product.vc_branch_name);
						//Horn.getComp("vc_trust_manager").setValue(result.product.vc_trust_manager);
						Horn.getComp("l_product_begin_date").setValue(result.product.l_begin_date);
						Horn.getComp("l_product_end_date").setValue(result.product.l_end_date);
					} else {
						Horn.getComp("vc_branch_caption").clearValue();
						//Horn.getComp("vc_trust_manager").clearValue();
						Horn.getComp("l_product_begin_date").clearValue();
						Horn.getComp("l_product_end_date").clearValue();
						//Horn.Tip.warn("操作失败！");
					}
				}, ajaxDataType.JSON);
				if(bussintype==1){
					common_operate.queryCollecterals("vc_collateral_no" + type, type);
				}
	},
	//查询产品代码
	queryCpdm : function(type){
		        Horn.getCompById("vc_branch_caption" + type).clearValue();
				//Horn.getCompById("vc_trust_manager" + type).clearValue();
				Horn.getCompById("l_product_begin_date" + type).clearValue();
				Horn.getCompById("l_product_end_date" + type).clearValue();
		       // Horn.getCompById("vc_contract_no" + type).clearValue();
		        var oldvc_product_id=Horn.getCompById("vc_product_id" + type).getValue();
				var url = "/am/am/business/stockcodesex/queryCpdm.json?l_function_no=" + functionIds.stockcodesex.query_cpdm_q;
				//用来区分查询新增合同还是其他的查询
				if(type==""){
					url =url+"?l_busin_flag=22216";
				}else{
					url=url+"?l_busin_flag=22204";
				}
				query_operate.doPost(url, "", function(result) {
					if (result) {
						Horn.getCompById("vc_product_id" + type).addItems(result,true);
						if(type!=1){
							Horn.getCompById("vc_product_id" + type).setValue("");
							Horn.getCompById("vc_product_id" + type).setValue(oldvc_product_id,true);
						}
					} else {
						//Horn.Tip.warn("操作失败！");
					}
				}, ajaxDataType.JSON);
	},
	//市场类别监听，过滤证券代码
	sclb : function(type){
		if (type == 1) {
			type = "";
		} else if (type == 2) {
			type = "_edit";
		}
		value = Horn.getComp("c_relative_exchange").getValue();
		common_operate.queryStockcodes("#vc_relative_code"+type+" > input[name=vc_relative_code]", value,"vc_relative_code");
	},
	// 新增初始化
	updateInit : function(type) {
		common_stockcodesex.checkCpdmDiv();
		Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
        stockcodesex2.gqxzChange();
		if (type == "_edit") {
			stockcodesex2.sclb(2);
			common_operate.geteditlist("l_invested_enterprise"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
//			common_operate.queryCollecterals("vc_collateral_no" + type, type);
		}
	},
	// 物权投资合同初始化
	updateInit2 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
//          common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} 
	},
	// 债权投资合同初始化
	updateInit3 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
//			common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} 
	},

	// 存款合同初始化
	updateInit4 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			//common_operate.queryCollecterals("vc_collateral_no" + type, type);
			stockcodesex2.ck_typeChange(2);
			stockcodesex2.ck_iounoauto(2);
		}

	},
		
	// 金融产品初始化
	updateInit5 : function(type) {
//		common_operate.queryStockcodes("#vc_relative_code" + type
//				+ " > input[name=vc_relative_code]");
		common_stockcodesex.checkCpdmDiv();
		Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
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
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
			stockcodesex2.changefinancialinvest(2);
		}
	},
	// 股权收益权合同初始化
	updateInit6 : function(type) {
			common_stockcodesex.checkCpdmDiv();
			common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
			if (type == "_edit") {
				common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
				common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
				//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
				Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
				stockcodesex2.queryCpdm(type);
				Horn.getComp("vc_product_id").setReadonly(true);
				stockcodesex2.contract_typeChange(2);
//				common_operate.queryCollecterals("vc_collateral_no" + type, type);
			} 
	},
	// 信用证/福费廷合同初始化
	updateInit_H : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_service_id" + type, "loanrival","1000185");
//			common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
//			common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
//			common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} 
},
	//其他收益权合同初始化
	updateInit_7 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance" + type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id" + type, "loanrival","1000185");
			common_operate.geteditlist("l_original_rival_id" + type,"loanrival", "1000185");
			//common_operate.geteditlist("l_org_cust_id" + type, "loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance" + type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			// Horn.getComp("vc_project_code").setReadonly(true);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
			// common_operate.queryCollecterals("vc_collateral_no" + type,
			// type);
		} 
	},
	//委托贷款合同初始化
	updateInit_c : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			//common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} 
	},
	//信贷资产初始化
	updateInit_xdzc : function(type) {
//		common_operate.queryStockcodes("#vc_relative_code" + type
//				+ " > input[name=vc_relative_code]");
		common_stockcodesex.checkCpdmDiv();
		Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
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
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
			stockcodesex2.changefinancialinvest(2);
		}
	},
	//票据资产初始化
	updateInit_pjzc : function(type) {
//		common_operate.queryStockcodes("#vc_relative_code" + type
//				+ " > input[name=vc_relative_code]");
		common_stockcodesex.checkCpdmDiv();
		Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
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
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
			stockcodesex2.changefinancialinvest(2);
		}
	},
	//显示之后的一些处理
	beforeUpdate : function(type){
		//查询对手方
		common_operate.geteditlist("l_rival_id_"+ type,"loanrival","1000185");
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

			//Horn.getComp("vc_relative_enterprise").setRequired(false);
		} else if (c_ex_type == "c" || c_ex_type == "d") {
			Horn.getComp("l_invested_enterprise").show();
			Horn.getComp("l_invested_enterprise").setDisabled(false);

			Horn.getComp("c_relative_exchange").hide();
			Horn.getComp("vc_relative_code").hide();

			Horn.getComp("c_relative_exchange").setDisabled(true);
			Horn.getComp("vc_relative_code").setDisabled(true);

			//Horn.getComp("vc_relative_enterprise").setRequired(true);
		}
	},
	//存款类型联动
	ck_typeChange : function(type) {
		    if (type == 1) {
				type = "";
			} else if (type == 2) {
				type = "_edit";
			}
		    var c_ex_type=Horn.getCompById("c_ex_type"+type).getValue();
		    if(c_ex_type=="o"){
		    	Horn.getCompById("c_notice_term"+type).setDisabled(false);
		    	Horn.getCompById("c_notice_term"+type).show();
		    }else{
		    	Horn.getCompById("c_notice_term"+type).setDisabled(true);
		    	Horn.getCompById("c_notice_term"+type).hide();
		    }
	},
	ck_iounoauto : function(type) {
	    if (type == 1) {
			type = "";
		} else if (type == 2) {
			type = "_edit";
		}
	 // 同步执行功能号字典重新加载
    	$.ajax({
    		type : "post",
			url : "/am/am/business/deposit/getiouno.json",
			data : "",
			async : false,
			dataType :"json",
			success : function(result) {
				   if(result.query.vc_iou_no!=null&&result.query.vc_iou_no!=""){
					   if(type!= "_edit"){
						   Horn.getCompById("vc_iou_no"+type).setValue(result.query.vc_iou_no);
					   }
					   Horn.getCompById("vc_iou_no"+type).setReadonly(true);
				   }else{
					   Horn.getCompById("vc_iou_no"+type).setReadonly(false);
				   }
    		       
			}
		});
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
		    	$("#en_contract_balance"+type).parent().prev().html("<span class='m-verify-symbol'>*</span> 资产金额(元)");
		    }else{
		    	$("#en_contract_balance"+type).parent().prev().html("<span class='m-verify-symbol'>*</span> 投资金额(元)");
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
	//存款期限,投资期限联动计算合同到期日期
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
      }
};
