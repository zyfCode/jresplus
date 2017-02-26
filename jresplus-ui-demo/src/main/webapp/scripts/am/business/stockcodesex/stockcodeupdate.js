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
		}
	} else if(l_busin_flag == "22201" || l_busin_flag == "22202" || l_busin_flag == "22214" || l_busin_flag == "22227") {
		stockcodesex2.beforeUpdate(type);
	}else if(l_busin_flag == "22417"){
		var s=Horn.getCompById("vc_project_code_xmbd").getValue();
		stockcodesex2.queryxmdm('xmbd');
		Horn.getCompById("vc_project_code_xmbd").setValue(s);
		stockcodesex2.xmdmChange();
	}

});

// 业务合同管理
var stockcodesex2 = {
	// 查询保证资产
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
					Horn.getComp("en_project_money_x").setValue($("#en_project_money"+ type + "> .u-typefield-capital").text());
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
						Horn.getCompById("vc_project_code" + type).setValue("");
						Horn.getCompById("vc_project_code" + type).setValue(oldvc_project_code,true);
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
			stockcodesex2.cpdmChange(type);
			Horn.getComp("vc_project_code").setReadonly(true);
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
			stockcodesex2.cpdmChange(type);
			Horn.getComp("vc_project_code").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
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
			stockcodesex2.cpdmChange(type);
			Horn.getComp("vc_project_code").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
		} 

	},// 存款合同初始化
	updateInit4 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.cpdmChange(type,"4");
			Horn.getComp("vc_project_code").setReadonly(true);
			stockcodesex2.ck_typeChange(2);
			stockcodesex2.ck_iounoauto(2);
		}

	},
	// 金融产品新增初始化
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
			//stockcodesex2.cpdmChange(type);
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_project_code").setReadonly(true);
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
	//存款期限联动计算合同到期日期
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
		        	Horn.getComp("l_end_date"+type).setReadonly(false);
		        	if(l_begin_date==null||l_begin_date==""){
			        	Horn.getCompById("l_end_date"+type).clearValue();
			        }
		        }else{
		        	Horn.getCompById("l_end_date"+type).setReadonly(true);
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
	//项目代码绑定列表查询   vc_project_type项目类型
	queryxmdm : function(type2){
		     var type="_"+type2;
			  Horn.getCompById("vc_branch_caption" + type).clearValue();
				Horn.getCompById("vc_project_type" + type).clearValue();
				Horn.getCompById("c_project_properties" + type).clearValue();
				Horn.getCompById("vc_project_manager" + type).clearValue();
				Horn.getCompById("en_project_money" + type).clearValue();
		       // Horn.getCompById("vc_contract_no" + type).clearValue();
				var vc_project_type=Horn.getCompById("vc_select_status"+type).getValue();
				var url = "/am/am/business/stockcodesex/queryXmdm.json?l_function_no=" + functionIds.stockcodesex.query_xmdm_a+"&&vc_project_type="+vc_project_type+"&&l_busin_flag=22204";
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
						Horn.getCompById("en_project_money_x"+ type).setValue($("#en_project_money"+ type + "> .u-typefield-capital").text());
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
