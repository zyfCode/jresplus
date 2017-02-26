$(function() {
	common_style.disable_style();
	$("nobr > div").hide();
	var l_busin_flag = Horn.getCompById("l_busin_flag").getValue();
	
	if (l_busin_flag == "22206" || l_busin_flag == "22219" || l_busin_flag == "22213" || l_busin_flag == "22388") {
		collateral.asset_invalid_init('_edit');
		common_operate.geteditlist("l_guarantor_edit","loanrival","1000185");
		//同步执行功能号字典重新加载   评估机构
		common_operate.geteditlist("l_evaluate_organization_edit","loanrival","1000185");
	} else if(l_busin_flag == "22209"){//红股红利到账
		common_operate.queryStockcodes("#vc_stock_code_1_edit" + " > input[name=vc_stock_code_1]");
		//复核界面,金额大写
		Horn.getCompById("en_preoccur_balance_x_edit").setValue($("#en_preoccur_balance_edit > .u-typefield-capital").text());
		common_operate.dealCapital("en_preoccur_balance_x_edit","en_preoccur_balance_edit");
		collateral.changepdtopj("_edit");
	} else if(l_busin_flag == "22211"){//评估价格调整
		$("#en_last_price_edit > input").keyup(
				function() {
					var en_last_price = $(this).val();
					var vc_amount_unit = Horn.getCompById(
							"vc_amount_unit_edit").getValue(false,
							true);
					Horn.getCompById("en_market_value_edit")
							.setValue(en_last_price * vc_amount_unit);
				});
		//同步执行功能号字典重新加载    产品代码
		common_operate.geteditlist("vc_product_id_edit","product","1000407");
    	//同步执行功能号字典重新加载   资产编号
		common_operate.geteditlist("l_collateral_no_edit","collateral","1000377");
    	//同步执行功能号字典重新加载   抵质押人
		common_operate.geteditlist("l_guarantor_edit","loanrival","1000185");
	}else if(l_busin_flag == "22228"){//借调归还窗口
		collateral.changepdtopj("_edit");
	}

});
/**
 * 保证资产信息
 */
var collateral = {
		//切换产品代码为项目代码
		changepdtopj : function(type){
				var oldvc_product_id=Horn.getCompById("vc_product_id" + type).getValue();
				common_operate.geteditlist2("vc_product_id" +type,"product","1000407",oldvc_product_id);
		},
		operatUrl : function(type) {
			return "/am/am/business/collateral/operation.json?l_function_no="
					+ functionIds["collateral"][type];
		},
		//担保人类型-监听事件
		dbrlx : function(){
			var c_collateral_type = Horn.getComp("c_collateral_type").getValue();
			if(c_collateral_type == "4"){//担保才校验
				var l_guarantor = Horn.getComp("l_guarantor").getValue();
				var c_guarantor_type = Horn.getComp("c_guarantor_type").getValue();
				if(!l_guarantor || !c_guarantor_type){
					return ;
				}
				var url = "/am/am/business/loanrival/view.json?l_rival_id=" + l_guarantor;
				query_operate.doPost(url, "", function(result) {
					if (result instanceof Object && result.op) {
						var c_rival_kind = result.op.c_rival_kind;
						if(c_rival_kind == "1"){//个人
							if(c_guarantor_type !="0"){
								TDialog.Msg.warning("提示","担保人类型与担保人对手方类型不匹配！");
								Horn.getComp("c_guarantor_type").setValue("");
							}
						} else {
							if(c_guarantor_type == "0"){
								TDialog.Msg.warning("提示","担保人类型与担保人对手方类型不匹配！");
								Horn.getComp("c_guarantor_type").setValue("");
							}
						}
					} 
				},ajaxDataType.JSON);		
			}		
		},
		// 资产性质-下拉框联动
		zcxzChange : function() {			
			value = Horn.getComp("c_collateral_type").getValue();
			Horn.getComp("l_unlock_date").hide();
			Horn.getComp("l_unlock_date").setDisabled(true);
			//  资产性质为为质押物时
			if (value == "3") {
				// 设置联动下拉框的值
				Horn.getComp("c_asset_type").filter([ '3', '4', '6' ], false, true);
				// 字段更名
				$("span[ref=vc_collateral_id]").html(
						"<b class=\"hc_red\">*</b>质押凭证编号");
				$("span[ref=vc_contract_no]")
						.html("<b class=\"hc_red\">*</b>质押合同号");
				$("span[ref=vc_remark]").html("<b class=\"hc_red\"></b>质押说明");
				$("span[ref=l_guarantor]").html("<b class=\"hc_red\">*</b>质押人");

				Horn.getComp("en_market_value").hide();
				Horn.getComp("en_market_value").setDisabled(true);
				Horn.getComp("c_evaluate_currency").hide();
				Horn.getComp("c_evaluate_currency").setDisabled(true);
				Horn.getComp("vc_evaluate_way").hide();
				Horn.getComp("vc_evaluate_way").setDisabled(true);
				Horn.getComp("l_evaluate_organization").hide();
				Horn.getComp("l_evaluate_organization").setDisabled(true);
				Horn.getComp("l_evaluate_date").hide();
				Horn.getComp("l_evaluate_date").setDisabled(true);
				Horn.getComp("en_last_price").hide();
				Horn.getComp("en_last_price").setDisabled(true);
				Horn.getComp("c_evaluate_way").hide();
				Horn.getComp("c_evaluate_way").setDisabled(true);

				Horn.getComp("vc_construction_area_unit").hide();
				Horn.getComp("vc_construction_area_unit").setDisabled(true);
				Horn.getComp("vc_land_area_unit").hide();
				Horn.getComp("vc_land_area_unit").setDisabled(true);

				Horn.getComp("vc_house_position").hide();
				Horn.getComp("vc_house_position").setDisabled(true);

				Horn.getComp("c_exchange_type_1").show();
				Horn.getComp("c_exchange_type_1").setDisabled(false);

				Horn.getComp("vc_stock_code_1").show();
				Horn.getComp("vc_stock_code_1").setDisabled(false);

			} else if (value == "1") {//  资产性质为为标的物时
				Horn.getComp("c_asset_type").filter([ '6' ], false, true);
			} else if(value == "2"){//  资产性质为为抵押物时
				// 设置联动下拉框的值
				Horn.getComp("c_asset_type").filter([ '1', '2', '6', '7' ], false,
						true);
				$("span[ref=vc_collateral_id]").html(
						"<b class=\"hc_red\">*</b>他项权证编号");
				$("span[ref=vc_contract_no]")
						.html("<b class=\"hc_red\">*</b>抵押合同号");
				$("span[ref=vc_remark]").html("<b class=\"hc_red\"></b>抵押说明");
				$("span[ref=l_guarantor]").html("<b class=\"hc_red\">*</b>抵押人");

				Horn.getComp("en_market_value").show();
				Horn.getComp("en_market_value").setDisabled(false);
				Horn.getComp("c_evaluate_currency").show();
				Horn.getComp("c_evaluate_currency").setDisabled(false);
				Horn.getComp("vc_evaluate_way").show();
				Horn.getComp("vc_evaluate_way").setDisabled(false);
				Horn.getComp("l_evaluate_organization").show();
				Horn.getComp("l_evaluate_organization").setDisabled(false);

				Horn.getComp("l_evaluate_date").show();
				Horn.getComp("l_evaluate_date").setDisabled(false);
				Horn.getComp("en_last_price").show();
				Horn.getComp("en_last_price").setDisabled(false);
				Horn.getComp("c_evaluate_way").show();
				Horn.getComp("c_evaluate_way").setDisabled(false);

				Horn.getComp("vc_construction_area_unit").show();
				Horn.getComp("vc_construction_area_unit").setDisabled(false);

				Horn.getComp("vc_land_area_unit").show();
				Horn.getComp("vc_land_area_unit").setDisabled(false);
				Horn.getComp("vc_house_position").show();
				Horn.getComp("vc_house_position").setDisabled(false);

				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("vc_stock_code_1").hide();

				Horn.getComp("c_exchange_type_1").setDisabled(true);
				Horn.getComp("vc_stock_code_1").setDisabled(true);
			}else if(value == "4"){
				Horn.getComp("c_asset_type").filter([ '6' ], true,
						true);
				$("span[ref=vc_contract_no]")
				.html("<b class=\"hc_red\">*</b>担保合同号");
					$("span[ref=l_guarantor]").html("<b class=\"hc_red\">*</b>担保人");
					$("span[ref=vc_remark]").html("<b class=\"hc_red\"></b>担保说明");
					$("span[ref=en_market_value]")
							.html("<b class=\"hc_red\">*</b>担保价值");
				
					Horn.getComp("c_asset_type_ex").hide();
					Horn.getComp("vc_collateral_name").hide();
					Horn.getComp("c_exchange_type_1").hide();
					Horn.getComp("vc_stock_code_1").hide();
					Horn.getComp("c_houseproperty_type").hide();
					Horn.getComp("vc_construction_area_unit").hide();
					Horn.getComp("vc_land_area_unit").hide();
					Horn.getComp("vc_house_position").hide();
					Horn.getComp("l_start_date").hide();
					Horn.getComp("vc_amount_unit").hide();
					Horn.getComp("en_collected_rate").hide();
					Horn.getComp("en_fill_balance").hide();
					Horn.getComp("l_right_sequence").hide();
					Horn.getComp("c_storage_mode").hide();
					Horn.getComp("vc_collateral_inner_id").hide();
					Horn.getComp("vc_registration_authority").hide();
					Horn.getComp("vc_collateral_code").hide();
					Horn.getComp("l_registration_date").hide();
					Horn.getComp("l_voucher_end_date").hide();
					Horn.getComp("l_evaluate_date").hide();
					Horn.getComp("en_last_price").hide();
					Horn.getComp("en_collateral_balance").hide();
					Horn.getComp("c_evaluate_currency").hide();
					Horn.getComp("vc_evaluate_way").hide();
					Horn.getComp("c_evaluate_way").hide();
					Horn.getComp("l_evaluate_organization").hide();
					Horn.getComp("vc_collateral_id").hide();
					Horn.getComp("l_unlock_date").hide();
					Horn.getComp("vc_enterprise_name").hide();
				
					Horn.getComp("c_asset_type_ex").setDisabled(true);
				//	Horn.getComp("vc_collateral_name").setDisabled(true);
					Horn.getComp("c_exchange_type_1").setDisabled(true);
					Horn.getComp("vc_stock_code_1").setDisabled(true);
					Horn.getComp("c_houseproperty_type").setDisabled(true);
					Horn.getComp("vc_construction_area_unit").setDisabled(true);
					Horn.getComp("vc_land_area_unit").setDisabled(true);
					Horn.getComp("vc_house_position").setDisabled(true);
					Horn.getComp("l_start_date").setDisabled(true);
					Horn.getComp("vc_amount_unit").setDisabled(true);
					Horn.getComp("en_collected_rate").setDisabled(true);
					Horn.getComp("en_fill_balance").setDisabled(true);
					Horn.getComp("l_right_sequence").setDisabled(true);
					Horn.getComp("c_storage_mode").setDisabled(true);
					Horn.getComp("vc_collateral_inner_id").setDisabled(true);
					Horn.getComp("vc_registration_authority").setDisabled(true);
					Horn.getComp("vc_collateral_code").setDisabled(true);
					Horn.getComp("l_registration_date").setDisabled(true);
					Horn.getComp("l_voucher_end_date").setDisabled(true);
					Horn.getComp("l_evaluate_date").setDisabled(true);
					Horn.getComp("en_last_price").setDisabled(true);
					Horn.getComp("en_collateral_balance").setDisabled(true);
					Horn.getComp("c_evaluate_currency").setDisabled(true);
					Horn.getComp("vc_evaluate_way").setDisabled(true);
					Horn.getComp("c_evaluate_way").setDisabled(true);
					Horn.getComp("l_evaluate_organization").setDisabled(true);
					Horn.getComp("vc_collateral_id").setDisabled(true);
					Horn.getComp("l_unlock_date").setDisabled(true);
					Horn.getComp("vc_enterprise_name").setDisabled(true);
					
					Horn.getComp("c_asset_type").setValue("6");
					Horn.getComp("c_asset_type").setReadonly(true);
					Horn.getComp("c_collateral_type").setReadonly(true);
					
					// 担保品录入,不需要 解禁日期、企业名称 要素
					Horn.getComp("l_unlock_date").hide();
					Horn.getComp("l_unlock_date").setDisabled(true);
					
					Horn.getComp("vc_enterprise_name").hide();
					Horn.getComp("vc_enterprise_name").setDisabled(true);
				}
		},
		// 资产类型-下拉框联动
		zclxChange : function() {
			
			value = Horn.getComp("c_asset_type").getValue();
			Horn.getComp("l_start_date").show();
			Horn.getComp("vc_amount_unit").show();

			Horn.getComp("l_start_date").setDisabled(false);
			Horn.getComp("vc_amount_unit").setDisabled(false);

			Horn.getComp("en_market_value").show();
			Horn.getComp("en_market_value").setDisabled(false);
			Horn.getComp("c_evaluate_currency").show();
			Horn.getComp("c_evaluate_currency").setDisabled(false);
			Horn.getComp("vc_evaluate_way").show();
			Horn.getComp("vc_evaluate_way").setDisabled(false);
			Horn.getComp("l_evaluate_organization").show();
			Horn.getComp("l_evaluate_organization").setDisabled(false);
			Horn.getComp("l_evaluate_date").show();
			Horn.getComp("l_evaluate_date").setDisabled(false);
			Horn.getComp("en_last_price").show();
			Horn.getComp("en_last_price").setDisabled(false);
			Horn.getComp("c_evaluate_way").show();
			Horn.getComp("c_evaluate_way").setDisabled(false);

			Horn.getComp("l_unlock_date").hide();
			Horn.getComp("l_unlock_date").setDisabled(true);
			
			if (value == "3") {
				// 设置联动下拉框的值
				Horn.getComp("c_asset_type_ex").filter(
						[ '0', '2', '3', '4', 'q', '1', 'p', 'r', 'o' ], false,
						true);

				Horn.getComp("c_asset_type_ex").show();
				Horn.getComp("c_asset_type_ex").setDisabled(false);

				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("vc_construction_area_unit").hide();
				Horn.getComp("vc_land_area_unit").hide();
				Horn.getComp("vc_house_position").hide();

				Horn.getComp("c_houseproperty_type").setDisabled(true);
				Horn.getComp("vc_construction_area_unit").setDisabled(true);
				Horn.getComp("vc_land_area_unit").setDisabled(true);
				Horn.getComp("vc_house_position").setDisabled(true);
			} else if (value == "4") {

				// 设置联动下拉框的值
				Horn.getComp("c_asset_type_ex").filter(
						[ '0', '1', '2', 'a', 'b', 'c', 'n', 'o', 'p', 'q', 'r' ],
						false, true);

				Horn.getComp("c_asset_type_ex").show();
				Horn.getComp("c_houseproperty_type").show();
				Horn.getComp("vc_construction_area_unit").show();
				Horn.getComp("vc_land_area_unit").show();
				Horn.getComp("vc_house_position").show();

				Horn.getComp("c_asset_type_ex").setDisabled(false);
				Horn.getComp("c_houseproperty_type").setDisabled(false);
				Horn.getComp("vc_construction_area_unit").setDisabled(false);
				Horn.getComp("vc_land_area_unit").setDisabled(false);
				Horn.getComp("vc_house_position").setDisabled(false);
			} else if (value == "9") {
				Horn.getComp("c_asset_type_ex").hide();
				Horn.getComp("c_asset_type_ex").setDisabled(true);

				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("vc_construction_area_unit").hide();
				Horn.getComp("vc_land_area_unit").hide();
				Horn.getComp("vc_house_position").hide();
				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("vc_stock_code_1").hide();

				Horn.getComp("c_houseproperty_type").setDisabled(true);
				Horn.getComp("vc_construction_area_unit").setDisabled(true);
				Horn.getComp("vc_land_area_unit").setDisabled(true);
				Horn.getComp("vc_house_position").setDisabled(true);
				Horn.getComp("c_exchange_type_1").setDisabled(true);
				Horn.getComp("vc_stock_code_1").setDisabled(true);
			
				Horn.getComp("vc_enterprise_name").hide();
				Horn.getComp("vc_enterprise_name").setDisabled(true);
			} else if (value == "1") {
				// 设置联动下拉框的值
				Horn.getComp("c_asset_type_ex").filter([ '0', '1', '2' ], true,
						true);

				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("c_houseproperty_type").setDisabled(true);

				Horn.getComp("c_asset_type_ex").show();
				Horn.getComp("c_exchange_type_1").show();
				Horn.getComp("vc_stock_code_1").show();

				Horn.getComp("c_asset_type_ex").setDisabled(false);
				Horn.getComp("c_exchange_type_1").setDisabled(false);
				Horn.getComp("vc_stock_code_1").setDisabled(false);

				Horn.getComp("en_market_value").hide();
				Horn.getComp("en_market_value").setDisabled(true);
				Horn.getComp("c_evaluate_currency").hide();
				Horn.getComp("c_evaluate_currency").setDisabled(true);
				Horn.getComp("vc_evaluate_way").hide();
				Horn.getComp("vc_evaluate_way").setDisabled(true);
				Horn.getComp("l_evaluate_organization").hide();
				Horn.getComp("l_evaluate_organization").setDisabled(true);
				Horn.getComp("l_evaluate_date").hide();
				Horn.getComp("l_evaluate_date").setDisabled(true);
				Horn.getComp("en_last_price").hide();
				Horn.getComp("en_last_price").setDisabled(true);
				Horn.getComp("c_evaluate_way").hide();
				Horn.getComp("c_evaluate_way").setDisabled(true);
			} else if (value == "2") {
				Horn.getComp("vc_enterprise_name").hide();
				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("c_asset_type_ex").hide();
				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("vc_stock_code_1").hide();

				Horn.getComp("vc_enterprise_name").setDisabled(true);
				Horn.getComp("c_houseproperty_type").setDisabled(true);
				Horn.getComp("c_asset_type_ex").setDisabled(true);
				Horn.getComp("c_exchange_type_1").setDisabled(true);
				Horn.getComp("vc_stock_code_1").setDisabled(true);
			} else if (value == "7") {
				// 设置联动下拉框的值
				Horn.getComp("c_asset_type_ex").filter([ 'o', 'p', 'q', 'r', 'z' ],
						true, true);
				Horn.getComp("c_asset_type_ex").show();
				Horn.getComp("c_asset_type_ex").setDisabled(false);

				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("vc_stock_code_1").hide();
				Horn.getComp("c_exchange_type_1").setDisabled(true);
				Horn.getComp("vc_stock_code_1").setDisabled(true);
			
				Horn.getComp("en_market_value").show();
				Horn.getComp("en_market_value").setDisabled(false);
				Horn.getComp("c_evaluate_currency").show();
				Horn.getComp("c_evaluate_currency").setDisabled(false);
				Horn.getComp("vc_evaluate_way").show();
				Horn.getComp("vc_evaluate_way").setDisabled(false);
				Horn.getComp("l_evaluate_organization").show();
				Horn.getComp("l_evaluate_organization").setDisabled(false);
				Horn.getComp("l_evaluate_date").show();
				Horn.getComp("l_evaluate_date").setDisabled(false);
				Horn.getComp("en_last_price").show();
				Horn.getComp("en_last_price").setDisabled(false);
				Horn.getComp("c_evaluate_way").show();
				Horn.getComp("c_evaluate_way").setDisabled(false);
				Horn.getComp("l_unlock_date").hide();
				Horn.getComp("l_unlock_date").setDisabled(true);
			
				Horn.getComp("vc_enterprise_name").hide();
				Horn.getComp("vc_enterprise_name").setDisabled(true);
				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("c_houseproperty_type").setDisabled(true);
			} else if(value == "6"){//担保
				Horn.getComp("l_evaluate_date").hide();
				Horn.getComp("en_last_price").hide();
				Horn.getComp("c_evaluate_currency").hide();
				Horn.getComp("vc_evaluate_way").hide();
				Horn.getComp("c_evaluate_way").hide();
				Horn.getComp("l_evaluate_organization").hide();			
				Horn.getComp("vc_stock_code_1").hide();
				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("l_start_date").hide();
				Horn.getComp("vc_amount_unit").hide();
				
				Horn.getComp("l_evaluate_date").setDisabled(true);
				Horn.getComp("en_last_price").setDisabled(true);
				Horn.getComp("c_evaluate_currency").setDisabled(true);
				Horn.getComp("vc_evaluate_way").setDisabled(true);
				Horn.getComp("c_evaluate_way").setDisabled(true);
				Horn.getComp("l_evaluate_organization").setDisabled(true);			
				Horn.getComp("vc_stock_code_1").setDisabled(true);
				Horn.getComp("c_exchange_type_1").setDisabled(true);
				Horn.getComp("l_start_date").setDisabled(true);
				Horn.getComp("vc_amount_unit").setDisabled(true);
			}
		},// 明细类别-下拉框联动
		mxlbChange : function() {
			
			Horn.getComp("vc_enterprise_name").hide();
			Horn.getComp("vc_enterprise_name").setDisabled(true);
			
			Horn.getComp("en_market_value").show();
			Horn.getComp("en_market_value").setDisabled(false);
			Horn.getComp("c_evaluate_currency").show();
			Horn.getComp("c_evaluate_currency").setDisabled(false);
			Horn.getComp("vc_evaluate_way").show();
			Horn.getComp("vc_evaluate_way").setDisabled(false);
			Horn.getComp("l_evaluate_organization").show();
			Horn.getComp("l_evaluate_organization").setDisabled(false);
			Horn.getComp("l_evaluate_date").show();
			Horn.getComp("l_evaluate_date").setDisabled(false);
			Horn.getComp("en_last_price").show();
			Horn.getComp("en_last_price").setDisabled(false);
			Horn.getComp("c_evaluate_way").show();
			Horn.getComp("c_evaluate_way").setDisabled(false);
			Horn.getComp("l_unlock_date").hide();
			Horn.getComp("l_unlock_date").setDisabled(true);

			value = Horn.getComp("c_asset_type_ex").getValue();
			if (value == "3") {
				// 房产
				Horn.getComp("c_houseproperty_type").show();
				Horn.getComp("vc_construction_area_unit").show();
				Horn.getComp("vc_land_area_unit").show();
				Horn.getComp("vc_house_position").show();

				Horn.getComp("c_houseproperty_type").setDisabled(false);
				Horn.getComp("vc_construction_area_unit").setDisabled(false);
				Horn.getComp("vc_land_area_unit").setDisabled(false);
				Horn.getComp("vc_house_position").setDisabled(false);

				Horn.getComp("vc_land_area_unit").setRequired(false);
			} else if (value == "4") {
				// 地产
				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("vc_construction_area_unit").hide();

				Horn.getComp("c_houseproperty_type").setDisabled(true);
				Horn.getComp("vc_construction_area_unit").setDisabled(true);

				Horn.getComp("vc_land_area_unit").setRequired(true);

			} else if (value == "0") {// 流通股
				Horn.getComp("vc_enterprise_name").hide();
				Horn.getComp("vc_enterprise_name").setDisabled(true);

				Horn.getComp("vc_stock_code_1").show();
				Horn.getComp("vc_stock_code_1").setDisabled(false);
				Horn.getComp("c_exchange_type_1").show();
				Horn.getComp("c_exchange_type_1").setRequired(false);

			Horn.getComp("en_market_value").hide();
			Horn.getComp("en_market_value").setDisabled(true);
			Horn.getComp("c_evaluate_currency").hide();
			Horn.getComp("c_evaluate_currency").setDisabled(true);
			Horn.getComp("vc_evaluate_way").hide();
			Horn.getComp("vc_evaluate_way").setDisabled(true);
			Horn.getComp("l_evaluate_organization").hide();
			Horn.getComp("l_evaluate_organization").setDisabled(true);
			Horn.getComp("l_evaluate_date").hide();
			Horn.getComp("l_evaluate_date").setDisabled(true);
			Horn.getComp("en_last_price").hide();
			Horn.getComp("en_last_price").setDisabled(true);
			Horn.getComp("c_evaluate_way").hide();
			Horn.getComp("c_evaluate_way").setDisabled(true);
		}
		else if(value=="1"){//限售流通股
			Horn.getComp("vc_enterprise_name").hide();
			Horn.getComp("vc_enterprise_name").setDisabled(true);
			Horn.getComp("vc_stock_code_1").show();
			Horn.getComp("vc_stock_code_1").setDisabled(false);
			Horn.getComp("c_exchange_type_1").show();
			Horn.getComp("c_exchange_type_1").setRequired(false);
			
			//解禁日期
			Horn.getComp("l_unlock_date").show();
			Horn.getComp("l_unlock_date").setDisabled(false);
			//Horn.getComp("l_begin_amount").show();
			//Horn.getComp("l_begin_amount").setDisabled(false);
			
			Horn.getComp("en_market_value").hide();
			Horn.getComp("en_market_value").setDisabled(true);
			Horn.getComp("c_evaluate_currency").hide();
			Horn.getComp("c_evaluate_currency").setDisabled(true);
			Horn.getComp("vc_evaluate_way").hide();
			Horn.getComp("vc_evaluate_way").setDisabled(true);
			Horn.getComp("l_evaluate_organization").hide();
			Horn.getComp("l_evaluate_organization").setDisabled(true);
			Horn.getComp("l_evaluate_date").hide();
			Horn.getComp("l_evaluate_date").setDisabled(true);
			Horn.getComp("en_last_price").hide();
			Horn.getComp("en_last_price").setDisabled(true);
			Horn.getComp("c_evaluate_way").hide();
			Horn.getComp("c_evaluate_way").setDisabled(true);
			
		}
		else if (value == "2") {// 非上市公司
			Horn.getComp("vc_enterprise_name").show();
			Horn.getComp("vc_enterprise_name").setDisabled(false);

				Horn.getComp("vc_stock_code_1").hide();
				Horn.getComp("vc_stock_code_1").setDisabled(true);
				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("c_exchange_type_1").setRequired(true);
			} else if (value == "z") { 
				// 其它
				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("vc_construction_area_unit").hide();
				Horn.getComp("vc_land_area_unit").hide();
				Horn.getComp("vc_house_position").hide();

				Horn.getComp("c_houseproperty_type").setDisabled(true);
				Horn.getComp("vc_construction_area_unit").setDisabled(true);
				Horn.getComp("vc_land_area_unit").setDisabled(true);
				Horn.getComp("vc_house_position").setDisabled(true);
			} else { // 初始状态
				Horn.getComp("en_market_value").show();
				Horn.getComp("en_market_value").setDisabled(false);
				Horn.getComp("c_evaluate_currency").show();
				Horn.getComp("c_evaluate_currency").setDisabled(false);
				Horn.getComp("vc_evaluate_way").show();
				Horn.getComp("vc_evaluate_way").setDisabled(false);
				Horn.getComp("l_evaluate_organization").show();
				Horn.getComp("l_evaluate_organization").setDisabled(false);
				Horn.getComp("l_evaluate_date").show();
				Horn.getComp("l_evaluate_date").setDisabled(false);
				Horn.getComp("en_last_price").show();
				Horn.getComp("en_last_price").setDisabled(false);
				Horn.getComp("c_evaluate_way").show();
				Horn.getComp("c_evaluate_way").setDisabled(false);
				Horn.getComp("l_unlock_date").hide();
				Horn.getComp("l_unlock_date").setDisabled(true);
			}
		},// 评估方法
		pgffChange : function() {
			var value = Horn.getComp("c_evaluate_way").getValue();
			if(value == "2"){
				Horn.getComp("l_evaluate_organization").setRequired(true);
			} else {
				Horn.getComp("l_evaluate_organization").setRequired(false);
			}
		},
		// 是否入保
		sfrbChange : function() {
			var value = Horn.getComp("c_is_insuranced").getValue();
			if (value == 1) {
				Horn.getComp("l_insurance_end_date").show();
				Horn.getComp("vc_insurance_company").show();
				Horn.getComp("vc_insurance_no").show();
				Horn.getComp("en_insurance_balance").show();
				Horn.getComp("vc_insurance_situation").show();

				Horn.getComp("l_insurance_end_date").setDisabled(false);
				Horn.getComp("vc_insurance_company").setDisabled(false);
				Horn.getComp("vc_insurance_no").setDisabled(false);
				Horn.getComp("en_insurance_balance").setDisabled(false);
				Horn.getComp("vc_insurance_situation").setDisabled(false);
			} else {
				Horn.getComp("l_insurance_end_date").hide();
				Horn.getComp("vc_insurance_company").hide();
				Horn.getComp("vc_insurance_no").hide();
				Horn.getComp("en_insurance_balance").hide();
				Horn.getComp("vc_insurance_situation").hide();

				Horn.getComp("l_insurance_end_date").setDisabled(true);
				Horn.getComp("vc_insurance_company").setDisabled(true);
				Horn.getComp("vc_insurance_no").setDisabled(true);
				Horn.getComp("en_insurance_balance").setDisabled(true);
				Horn.getComp("vc_insurance_situation").setDisabled(true);
			}
		},
		//市场类别监听，过滤证券代码
		sclb : function(){
			value = Horn.getComp("c_exchange_type_1").getValue();
			common_operate.queryStockcodes("#vc_stock_code_1 > input[name=vc_stock_code_1]", value);
			Horn.getComp("vc_stock_code_1").setValue("");
		},
		
		// 入库数量监听事件
		rksl : function($this) {
			var $this = $(this);

			var l_current_amount = parseFloat($this.val());
			l_current_amount = common_operate.parseNaN();
			var en_last_price = common_operate.parseNaN(parseFloat(Horn.getComp(
					"en_last_price").getValue()));
			Horn.getComp("en_market_value").setValue(
					l_current_amount * en_last_price);
		},
		// 借调归还
//		showReturnWin : function() {
//			var grid = Horn.getComp("dataTable").getSelecteds();
//			if (grid.length !== 1) {
//				Horn.Tip.warn("请您选择要借调归还的资产！");
//				return;
//			}
//
//			var url = "/am/am/business/collateral/return_view.json";
//			var data = "l_function_no=" + functionIds["collateral"]["view"]
//					+ "&l_collateral_no=" + grid[0].l_collateral_no;
//			query_operate.doPost(url, data, function(result) {
//				if (result && result.collateral) {
//					Horn.getComp("jdghForm").setValues(result.collateral);
//					Horn.getCompById("vc_amount_unit_jdgh").setValue(
//							result.collateral.l_current_amount, true, true);
//					Horn.getComp("jdghWin").show();
//				} 
////				else {
////					Horn.Tip.warn("操作失败！");
////				}
//			}, ajaxDataType.JSON);
//		},

		// 借调出库-窗口显示
//		showLendWin : function(type) {
//			var grid = Horn.getComp("dataTable").getSelecteds();
//			var obj = {};
//			obj.vc_product_id = grid[0].vc_product_id;
//			obj.l_action_in = "2";
//			obj.l_serial_no = "0";
//			obj.business_type = type;
//			Horn.getCompById("jdckTable").setBaseParams(obj);
//			Horn.getCompById("jdckTable").load();
//			Horn.getCompById("jdckWin").show();
//		},
		// 借调出库--提交
//		lendCommit : function() {
//
//			var grid = Horn.getComp("jdckTable").getSelecteds();
//			if (grid.length < 1) {
//				Horn.Tip.warn("请您选择要借调出库的资产！");
//				return;
//			}
//			var type = grid[0].business_type;
//			var extractArrStr = [];
//			$("#body_jdckTable > tr")
//					.each(
//							function() {
//								var $this = $(this);
//								if ($this.find("input:checkbox").is(":checked")) {
//									if (type == "jdck") {
//										var obj = {};
//										obj.l_collateral_no = $this
//												.find("td:eq(2)").text();
//										obj.l_occur_amount = $this.find("td:eq(7)")
//												.text();
//										obj.l_occur_date = dataUtil
//												.getCurrentDate2();
//										extractArrStr.push(JSON.stringify(obj));
//									} else if (type == "jyck") {
//										var obj = {};
//										obj.l_collateral_no = $this
//												.find("td:eq(2)").text();
//										obj.l_occur_date = dataUtil
//												.getCurrentDate2();
//										obj.l_current_amount = $this.find(
//												"td:eq(7)").text();
//										obj.l_occur_amount = $this.find(
//												"td:eq(9) > div > input").val();
//										obj.en_occur_balance = $this.find(
//												"td:eq(10) > div > input").val();
//										extractArrStr.push(JSON.stringify(obj));
//									}
//								}
//							});
//
//			var url = "/am/am/business/collateral/extract_commit.json?l_function_no="
//					+ functionIds["collateral"]["dictate"]
//					+ "&workflow_step="
//					+ workflowStep.launch + "&business_type=" + type;
//			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
//				var data = "extractArrStr=" + extractArrStr.join();
//				query_operate.doPost(url, data, function(result) {
//					if (result == "ok") {
//						TDialog.Msg.alert("提示", "操作成功！", function() {
//							Horn.getComp("jdckWin").hide();
//						});
//					} 
////					else {
////						Horn.Tip.warn(result);
////					}
//				});
//			}, function() {
//			});
//		},

	// 评估价格调整-窗口显示
//	showPriceWin : function() {
//		var grid = Horn.getComp("dataTable").getSelecteds();
//		var url = "/am/am/business/collateral/return_view.json";
//		var data = "l_function_no=" + functionIds["collateral"]["view"]
//				+ "&l_collateral_no=" + grid[0].l_collateral_no;
//		query_operate.doPost(url, data, function(result) {
//			if (result && result.collateral) {
//				Horn.getComp("pgjgtzForm").setValues(result.collateral);
//				Horn.getCompById("vc_amount_unit_pgjgtz").setValue(
//						result.collateral.l_current_amount, true, true);
//				Horn.getCompById("l_evaluate_date_pgjgtz").setValue(
//						dataUtil.getCurrentDate2());
//				Horn.getComp("pgjgtzWin").show();
//				var obj = {};
//				obj.code = grid[0].l_collateral_no;
//				obj.text = grid[0].vc_collateral_name;
//				Horn.getCompById("l_collateral_no_pgjgtz").addItems([ obj ],
//						true);
//				Horn.getCompById("l_collateral_no_pgjgtz").selectFirst();
//				$("#en_last_price_pgjgtz > input").keyup(
//						function() {
//							var en_last_price = $(this).val();
//							var vc_amount_unit = Horn.getCompById(
//									"vc_amount_unit_pgjgtz").getValue(false,
//									true);
//							Horn.getCompById("en_market_value_pgjgtz")
//									.setValue(en_last_price * vc_amount_unit);
//						});
//			} 
//		}, ajaxDataType.JSON);
//	},// 分红送股-窗口
//	showPresent : function() {
//		var grid = Horn.getComp("dataTable").getSelecteds();
//		var url = "/am/am/business/collateral/return_view.json";
//		var data = "l_function_no=" + functionIds["collateral"]["view"]
//				+ "&l_collateral_no=" + grid[0].l_collateral_no;
//		query_operate.doPost(url, data, function(result) {
//			if (result && result.collateral) {
//				//发起界面,置空备注信息
//				result.collateral.vc_remark = "";
//				Horn.getComp("fhsgForm").setValues(result.collateral);
//				Horn.getCompById("l_occur_date_fhsg").setValue(
//						dataUtil.getCurrentDate2());
//				Horn.getComp("fhsgWin").show();
//			}
//		}, ajaxDataType.JSON);
//	},
	//查询产品代码
	queryCpdm : function(type){
		// 与o32不对接   产品代码
		var url = "/am/am/business/stockcodesex/queryCpdm.json?l_function_no=" + functionIds.stockcodesex.query_cpdm_a;
		var oldvc_product_id=Horn.getCompById("vc_product_id" + type).getValue();
		query_operate.ajax(url, "", function(result) {
			if (result) {
				Horn.getCompById("vc_product_id" + type).addItems(result,true);
				if(type){
					Horn.getCompById("vc_product_id" + type).setValue("");
					Horn.getCompById("vc_product_id" + type).setValue(oldvc_product_id,true);
				}
			} 
		}, ajaxDataType.JSON);
	},
	// 抵质押入库页面初始加载
//	add_init : function() {
//		Horn.getComp("c_collateral_type")
//				.filter([ '1', '4', '5' ], false, true);
////		collateral.cpdmChange();
//		collateral.queryCpdm("");
//		collateral.zcxzChange();
//		collateral.pgffChange();
//		collateral.sclb();
//		Horn.getComp("c_guarantee_form").hide();
//		Horn.getComp("c_guarantee_type").hide();
//		Horn.getComp("c_guarantor_type").hide();
//		Horn.getComp("c_rival_relation").hide();
//		Horn.getComp("l_unlock_date").hide();
//
//		Horn.getComp("c_guarantee_form").setDisabled(true);
//		Horn.getComp("c_guarantee_type").setDisabled(true);
//		Horn.getComp("c_guarantor_type").setDisabled(true);
//		Horn.getComp("c_rival_relation").setDisabled(true);
//		Horn.getComp("l_unlock_date").setDisabled(true);
//
//			// 入库数量监听
//			$("#l_current_amount").keyup(
//					function() {
//						var l_current_amount = common_operate
//								.parseNaN(parseFloat($(this).val()));
//						var en_last_price = common_operate.parseNaN(parseFloat(Horn
//								.getComp("en_last_price").getValue()));
//						Horn.getComp("en_market_value").setValue(
//								l_current_amount * en_last_price);
//					});// 评估价格
//			$("#en_last_price > input:eq(1)").keyup(
//					function() {
//						var l_current_amount = common_operate.parseNaN($(
//								"#l_current_amount").val());
//						var en_last_price = common_operate.parseNaN(parseFloat($(
//								this).val()));
//						Horn.getComp("en_market_value").setValue(
//								l_current_amount * en_last_price);
//					});
//
//		},
		// 资产作废-页面初始加载
		asset_invalid_init : function(type) {
			Horn.getCompById("vc_product_id" + type).seta_clickdisable(true);
			common_operate.geteditlist("vc_product_id" +type,"product","1000407");
			//获取抵质押人下拉值
			common_operate.geteditlist("l_guarantor"+ type,"loanrival","1000185");
			//获取评估机构下拉值
			common_operate.geteditlist("l_evaluate_organization"+ type,"loanrival","1000185");
//			collateral.sfrbChange();
//			collateral.pgffChange();
//			collateral.sclb();

			// 根据资产性质页面做调整
			var value = Horn.getComp("c_collateral_type").getValue();
			if (value == "2") {// 抵押
				Horn.getComp("c_collateral_type").filter([ '1', '4', '5' ], false,
						true);
				Horn.getComp("c_asset_type").filter([ '1', '2', '6', '7' ], false,
						true);
				$("span[ref=vc_collateral_id]").html(
						"<b class=\"hc_red\">*</b>他项权证编号");
				$("span[ref=vc_contract_no]")
						.html("<b class=\"hc_red\">*</b>抵押合同号");
				$("span[ref=vc_remark]").html("<b class=\"hc_red\"></b>抵押说明");
				$("span[ref=l_guarantor]").html("<b class=\"hc_red\">*</b>抵押人");

			Horn.getComp("c_guarantee_form").hide();
			Horn.getComp("c_guarantee_type").hide();
			Horn.getComp("c_guarantor_type").hide();
			Horn.getComp("c_rival_relation").hide();
			Horn.getComp("vc_stock_code_1").hide();
			Horn.getComp("c_exchange_type_1").hide();
			Horn.getComp("vc_enterprise_name").hide();

			Horn.getComp("c_guarantee_form").setDisabled(true);
			Horn.getComp("c_guarantee_type").setDisabled(true);
			Horn.getComp("c_guarantor_type").setDisabled(true);
			Horn.getComp("c_rival_relation").setDisabled(true);
			Horn.getComp("vc_stock_code_1").setDisabled(true);
			Horn.getComp("c_exchange_type_1").setDisabled(true);
			Horn.getComp("vc_enterprise_name").setDisabled(true);

				Horn.getComp("vc_land_area_unit").setRequired(false);
			} else if (value == "3") {// 质押
				Horn.getComp("c_collateral_type").filter([ '1', '4', '5' ], false,
						true);
				// 字段更名
				$("span[ref=vc_collateral_id]").html(
						"<b class=\"hc_red\">*</b>质押凭证编号");
				$("span[ref=vc_contract_no]")
						.html("<b class=\"hc_red\">*</b>质押合同号");
				$("span[ref=vc_remark]").html("<b class=\"hc_red\"></b>质押说明");
				$("span[ref=l_guarantor]").html("<b class=\"hc_red\">*</b>质押人");

				Horn.getComp("en_market_value").hide();
				Horn.getComp("c_evaluate_currency").hide();
				Horn.getComp("vc_evaluate_way").hide();
				Horn.getComp("l_evaluate_organization").hide();
				Horn.getComp("vc_construction_area_unit").hide();
				Horn.getComp("vc_land_area_unit").hide();
				Horn.getComp("vc_house_position").hide();

				Horn.getComp("c_guarantee_form").hide();
				Horn.getComp("c_guarantee_type").hide();
				Horn.getComp("c_guarantor_type").hide();
				Horn.getComp("c_rival_relation").hide();

				Horn.getComp("c_guarantee_form").setDisabled(true);
				Horn.getComp("c_guarantee_type").setDisabled(true);
				Horn.getComp("c_guarantor_type").setDisabled(true);
				Horn.getComp("c_rival_relation").setDisabled(true);

				Horn.getComp("en_market_value").setDisabled(true);
				Horn.getComp("c_evaluate_currency").setDisabled(true);
				Horn.getComp("vc_evaluate_way").setDisabled(true);
				Horn.getComp("l_evaluate_organization").setDisabled(true);
				Horn.getComp("vc_construction_area_unit").setDisabled(true);
				Horn.getComp("vc_land_area_unit").setDisabled(true);
				Horn.getComp("vc_house_position").setDisabled(true);

				Horn.getComp("c_exchange_type_1").show();
				Horn.getComp("vc_stock_code_1").show();

				Horn.getComp("c_exchange_type_1").setDisabled(false);
				Horn.getComp("vc_stock_code_1").setDisabled(false);
			} else if (value == "4") {// 担保
				$("span[ref=vc_contract_no]")
						.html("<b class=\"hc_red\">*</b>担保合同号");
				$("span[ref=l_guarantor]").html("<b class=\"hc_red\">*</b>担保人");
				$("span[ref=vc_remark]").html("<b class=\"hc_red\"></b>担保说明");
				$("span[ref=en_market_value]")
						.html("<b class=\"hc_red\">*</b>担保价值");

				Horn.getComp("c_asset_type_ex").hide();
				Horn.getComp("vc_collateral_name").hide();
				Horn.getComp("c_exchange_type_1").hide();
				Horn.getComp("vc_stock_code_1").hide();
				Horn.getComp("c_houseproperty_type").hide();
				Horn.getComp("vc_construction_area_unit").hide();
				Horn.getComp("vc_land_area_unit").hide();
				Horn.getComp("vc_house_position").hide();
				Horn.getComp("l_start_date").hide();
				Horn.getComp("vc_amount_unit").hide();
				Horn.getComp("en_collected_rate").hide();
				Horn.getComp("en_fill_balance").hide();
				Horn.getComp("l_right_sequence").hide();
				Horn.getComp("c_storage_mode").hide();
				Horn.getComp("vc_collateral_inner_id").hide();
				Horn.getComp("vc_registration_authority").hide();
				Horn.getComp("vc_collateral_code").hide();
				Horn.getComp("l_registration_date").hide();
				Horn.getComp("l_voucher_end_date").hide();
				Horn.getComp("l_evaluate_date").hide();
				Horn.getComp("en_last_price").hide();
				Horn.getComp("en_collateral_balance").hide();
				Horn.getComp("c_evaluate_currency").hide();
				Horn.getComp("vc_evaluate_way").hide();
				Horn.getComp("c_evaluate_way").hide();
				Horn.getComp("l_evaluate_organization").hide();
				Horn.getComp("vc_collateral_id").hide();
				Horn.getComp("l_unlock_date").hide();
				Horn.getComp("vc_enterprise_name").hide();

				Horn.getComp("c_asset_type_ex").setDisabled(true);
				Horn.getComp("vc_collateral_name").setDisabled(true);
				Horn.getComp("c_exchange_type_1").setDisabled(true);
				Horn.getComp("vc_stock_code_1").setDisabled(true);
				Horn.getComp("c_houseproperty_type").setDisabled(true);
				Horn.getComp("vc_construction_area_unit").setDisabled(true);
				Horn.getComp("vc_land_area_unit").setDisabled(true);
				Horn.getComp("vc_house_position").setDisabled(true);
				Horn.getComp("l_start_date").setDisabled(true);
				Horn.getComp("vc_amount_unit").setDisabled(true);
				Horn.getComp("en_collected_rate").setDisabled(true);
				Horn.getComp("en_fill_balance").setDisabled(true);
				Horn.getComp("l_right_sequence").setDisabled(true);
				Horn.getComp("c_storage_mode").setDisabled(true);
				Horn.getComp("vc_collateral_inner_id").setDisabled(true);
				Horn.getComp("vc_registration_authority").setDisabled(true);
				Horn.getComp("vc_collateral_code").setDisabled(true);
				Horn.getComp("l_registration_date").setDisabled(true);
				Horn.getComp("l_voucher_end_date").setDisabled(true);
				Horn.getComp("l_evaluate_date").setDisabled(true);
				Horn.getComp("en_last_price").setDisabled(true);
				Horn.getComp("en_collateral_balance").setDisabled(true);
				Horn.getComp("c_evaluate_currency").setDisabled(true);
				Horn.getComp("vc_evaluate_way").setDisabled(true);
				Horn.getComp("c_evaluate_way").setDisabled(true);
				Horn.getComp("l_evaluate_organization").setDisabled(true);
				Horn.getComp("vc_collateral_id").setDisabled(true);
				Horn.getComp("l_unlock_date").setDisabled(true);
				Horn.getComp("vc_enterprise_name").setDisabled(true);

				Horn.getComp("c_asset_type").setValue("6");
				Horn.getComp("c_asset_type").setReadonly(true);
				Horn.getComp("c_collateral_type").setReadonly(true);
			
				// 担保品录入,不需要 解禁日期、企业名称 要素
				Horn.getComp("l_unlock_date").hide();
				Horn.getComp("l_unlock_date").setDisabled(true);
				
				Horn.getComp("vc_enterprise_name").hide();
				Horn.getComp("vc_enterprise_name").setDisabled(true);
			}
			
			// 入库数量监听
			$("#l_current_amount").keyup(
					function() {
						var l_current_amount = common_operate
								.parseNaN(parseFloat($(this).val()));
						var en_last_price = common_operate.parseNaN(parseFloat(Horn
								.getComp("en_last_price").getValue()));
						Horn.getComp("en_market_value").setValue(
								l_current_amount * en_last_price);
					});
			// 评估价格
			$("#en_last_price_edit").keyup(
					function() {
						var l_current_amount = common_operate.parseNaN($(
								"#l_current_amount").val());
						var en_last_price = common_operate.parseNaN(parseFloat(Horn
								.getComp("en_last_price").getValue()));
						Horn.getComp("en_market_value").setValue(
								l_current_amount * en_last_price);
					});
			
			
			var c_asset_type = Horn.getComp("c_asset_type").getValue();//资产类型
			var c_asset_type_ex = Horn.getComp("c_asset_type_ex").getValue();//明细类别
			var c_collateral_type = Horn.getComp("c_collateral_type").getValue();//资产性质
			var vc_stock_code_1 = Horn.getComp("vc_stock_code_1").getValue();//证券代码
			
			collateral.zcxzChange();
			collateral.zclxChange();
//			var c_asset_type_ex_value = Horn.getComp("c_asset_type_ex").getValue();
			// 明细类别有值且不为默认值0时，调用明细类别联动
			if (c_asset_type_ex && c_asset_type_ex != 0){
				collateral.mxlbChange();
				Horn.getComp("c_asset_type_ex").setValue(c_asset_type_ex,true);
			}
//			collateral.mxlbChange();
			
			collateral.sfrbChange();
			collateral.pgffChange();
			collateral.sclb();

			Horn.getComp("c_collateral_type").setValue(c_collateral_type,true);
			Horn.getComp("c_asset_type").setValue(c_asset_type,true);
			
			Horn.getComp("vc_stock_code_1").setValue(vc_stock_code_1,true);
			
			
			
		},// 根据产品代码查询合同代码
		cpdmChange : function() {
			var vc_product_id= Horn.getComp("vc_product_id").getValue();
			var url = "/am/am/business/collateral/queryVcStockCodes.json";
			var data = "vc_input_name1=vc_product_id&" + "vc_input_value1="
					+ vc_product_id + "&vc_input_table=stockcodesex"
					+ "&vc_input_name3=c_stock_status" + "&vc_input_value3=1"
					+ "&vc_output_name1=vc_stock_code"
					+ "&vc_output_name2=vc_stock_name";
			query_operate.doPost(url, data, function(result) {
				if (result) {
					var vc_stock_codes = Horn.getComp("vc_stock_codes").getValue();
					Horn.getComp("vc_stock_codes").addItems(result, true);
					Horn.getComp("vc_stock_codes").setValue(vc_stock_codes);
				} 
			}, ajaxDataType.JSON);
		},// 行单击事件
//		rowClick : function(rowdata) {
//			var c_collateral_status = $.trim(rowdata.c_collateral_status);
//			var c_asset_type = $.trim(rowdata.c_asset_type);
//			var c_collateral_type = $.trim(rowdata.c_collateral_type);
//			// 评估价格调整
//			if (c_collateral_status == "已入库" && c_asset_type != "股权") {
//				Horn.getComp("dataTable").hideButton("pgjgtzButton", false);
//				Horn.getComp("dataTable").hideButton("fhsgButton", true);
//			} else {
//				Horn.getComp("dataTable").hideButton("pgjgtzButton", true);
//			}
//
//			// 分红送股
//			if (c_collateral_status == "已入库" && c_asset_type == "股权") {
//				Horn.getComp("dataTable").hideButton("fhsgButton", false);
//				Horn.getComp("dataTable").hideButton("pgjgtzButton", true);
//			} else {
//				Horn.getComp("dataTable").hideButton("fhsgButton", true);
//			}
//			// 借调出库
//			if (c_collateral_status == "已入库"
//					&& (c_collateral_type == "质押物" || c_collateral_type == "抵押物")) {
//				Horn.getComp("dataTable").hideButton("jdckButton", false);
//			} else {
//				Horn.getComp("dataTable").hideButton("jdckButton", true);
//			}
//
//			// 借调归还
//			if (c_collateral_status == "借调出库"
//					&& (c_collateral_type == "质押物" || c_collateral_type == "抵押物")) {
//				Horn.getComp("dataTable").hideButton("jdghButton", false);
//			} else {
//				Horn.getComp("dataTable").hideButton("jdghButton", true);
//			}
//
//			// 资产作废
//			if (c_collateral_status != "作废") {
//				Horn.getComp("dataTable").hideButton("zczfButton", false);
//			} else {
//				Horn.getComp("dataTable").hideButton("zczfButton", true);
//			}
//			common_operate.getBusAuthority("dataTable", "bzzc");
//		},
		rowClick2 : function(rowdata) {
			var buttonId = $("#buttonId").val();
			if(buttonId != "zlxg"){
				return;
			}
			$("#body_jdckTable > tr").each(function() {
								var $this = $(this);
								
								// 解押出库，做指令修改时，保留原值
								var l_occur_amount_begin = rowdata.l_occur_amount;
								var en_occur_balance_begin = rowdata.en_occur_balance;
								if(!l_occur_amount_begin){
									l_occur_amount_begin = "";
									en_occur_balance_begin ="";
								}
								
								var checkbox = $this.find("input:checkbox");
								var l_collateral_no = $this.find("td:eq(3) > div").text();
								
								if (l_collateral_no == rowdata.l_collateral_no) {
									
									// 取消选中时，恢复原值
									if(l_occur_amount_begin){
										l_current_amount = l_occur_amount_begin;
									} else {
										l_current_amount = $this.find("td:eq(8) > div").text();
									}
									
									if(en_occur_balance_begin){
										en_occur_balance = en_occur_balance_begin;
									} else {
										en_occur_balance = $this.find("td:eq(9) > div").text();
									}

									if (checkbox.is(":checked")) {
										
										if (rowdata.business_type == "jyck") {
											$this.find("td:eq(10) > div > input").show();
											$this.find("td:eq(11) > div > input").show();
											$this.find("td:eq(10) > div > input").val(l_current_amount);
											$this.find("td:eq(11) > div > input").val(en_occur_balance);
										} else {// 借调出库不用修改字段值
											$this.find("td:eq(10) > div").text(l_current_amount);
											$this.find("td:eq(11) > div").text(en_occur_balance);
										}
									} else {
										if (rowdata.business_type == "jyck") {
											$this.find("td:eq(10) > div > input").hide();
											$this.find("td:eq(11) > div > input").hide();
										} else {
											$this.find("td:eq(10) > div").text("");
											$this.find("td:eq(11) > div").text("");
										}
								
									}
								}
							});
		},

		// grid加载成功回调函数
		loadSuccess : function() {
			$("#body_jdckTable > tr").each(function() {
				var $this = $(this);
				var $l_occur_amount = $this.find("td:eq(10) > div > input");
				var $en_market_value = $this.find("td:eq(11) > div > input");
				//阻止事件冒泡
				$l_occur_amount.click(function(e){
					  e.stopPropagation();
				});
				
				$l_occur_amount.keyup(function() {
						var l_occur_amount = $l_occur_amount.val();
						var en_market_value = $this.find("td:eq(9) > div").text();
						var l_current_amount = $this.find("td:eq(8) > div").text();
						//校验数值合法性
						validate.reg_double(l_occur_amount, 10, 0);
						if(validate.errorMessage){
							l_occur_amount = "";
							$l_occur_amount.val(l_occur_amount);
						}
						if (eval(l_occur_amount) > eval(l_current_amount)) {
							$l_occur_amount.val(l_current_amount);
							$en_market_value.val(en_market_value);
						} else {
							var en_occur_balance = l_occur_amount
									/ l_current_amount * en_market_value;
							$en_market_value.val(en_occur_balance);
						}
				});

				$en_market_value.keyup(function(e) {
					e.stopPropagation();
					var en_market_value = $this.find("td:eq(9) > div").text();
					var en_occur_balance = $en_market_value.val();
					//校验数值合法性
					validate.reg_double(en_occur_balance, 10, 0);
					if(validate.errorMessage){
						en_occur_balance = "";
						$en_market_value.val(en_occur_balance);
					}
					if (eval(en_occur_balance) > eval(en_market_value)) {
						$en_market_value.val(en_market_value);
					}
				});

			});		
		},
		testRender : function(data){
			var buttonId = $("#buttonId").val();
			if(buttonId != "zlxg"){
				return;
			}
			var business_type = data.rowdata.business_type;
			if(business_type == "jyck"){
				return '<input type="text" value="' + data.val +  '" style="width:70px;height:30px;">';
			}			
		}
};