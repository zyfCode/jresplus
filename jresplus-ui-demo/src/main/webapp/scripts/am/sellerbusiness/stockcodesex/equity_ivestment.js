var flag;

$(function() {
	common_style.disable_style();
	dialog = common_operate.getDialog();
});

var equity_investment = {
	button_html : "",
	getButtonListHtml : function(data){
		var _html = "<div class=\"tableopt-btn\">操作" + "<ul class=\"tableopt-li\">";
		for(var i=0,j=targetButtonArr.length;i<j;i++){
			//根据投资性质来显示投资按钮（当投资性质为2的时候显示资产转入，隐藏投资按钮）
			var s=data.val;
			var type=targetButtonArr[i].buttonId;
			if(type=='gqtz'||type=='jctz'||type=='wqtz'||type=='zqtz'||type=='ck'||type=='srgqsyq'||type=='xyzmrfk'||type=='wtdk'||type=='xdzc'||type=='pjzc'||type=='srqtsyq'){
                if(s!='2'){
					_html += "<li><a href=\"javascript:void(0)\" onclick=\"equity_investment.show_equity('" 
						+ targetButtonArr[i].buttonId + "','" + data.rowidx +"')\">" +targetButtonArr[i].buttonName + "</a></li>";
				}
			}else if(type=='zczr'){
				if(s=='2'){
					_html += "<li><a href=\"javascript:void(0)\" onclick=\"equity_investment.show_equity('" 
						+ targetButtonArr[i].buttonId + "','" + data.rowidx +"')\">" +targetButtonArr[i].buttonName + "</a></li>";
				}
			}else{	
					_html += "<li><a href=\"javascript:void(0)\" onclick=\"equity_investment.show_equity('" 
						+ targetButtonArr[i].buttonId + "','" + data.rowidx +"')\">" +targetButtonArr[i].buttonName + "</a></li>";			
			}
		}
		_html += "</ul></div>";
		equity_investment.button_html = _html;
	},	
	//"操作"按钮绑定事件
	showOperates : function(data){		
		equity_investment.getButtonListHtml(data);
		return equity_investment.button_html;
	},
	//非冻结列的渲染
	loadSuccess : function(comp, resultData){
		//记录第一次查询的记录数，用于优化速度
		Horn.getCompById("datatotal").setValue(resultData.total);
		 Horn.getCompById("dataTable").setBaseParams(Horn.getCompById("queryForm").getValues());
		 $("#body_dataTable").prepend("<ul class=\"tableoptli hor\"></ul>");
			var ul_show = $("#body_dataTable > ul");
			$("#body_dataTable > tr").each(function(){
				$(this).find(".tableopt-btn").mouseover(function(){
					var top = $(this).position().top;
					var left = $(this).position().left;
					var ul_hide = $(this).find("ul").children("li");
					var _show_ul = ul_hide.clone(true);
					ul_show.children("li").remove();
					ul_show.css({"top":top,"left":left+60});
					ul_show.prepend(_show_ul);
					ul_show.show();
				});
				$(this).find(".tableopt-btn").mouseout(function(){
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
	 hideDiv:function(flag){
			var style = $("#freeze_data_dataTable").attr("style");
			if(flag){
				style = style.replace("visible","hidden");
			}else{
				style = style.replace("hidden","visible");
			}
			$("#freeze_data_dataTable").attr("style",style);
	},
	//渲染在冻结列的按钮
	frozen_loadSuccess : function(comp, resultData){
		//记录第一次查询的记录数，用于优化速度
		Horn.getCompById("datatotal").setValue(resultData.total);
		 Horn.getCompById("dataTable").setBaseParams(Horn.getCompById("queryForm").getValues());
		$("#freez_tbody_dataTable").prepend("<ul class=\"tableoptli hor\"></ul>");
		var ul_show = $("#freez_tbody_dataTable > ul");
		$("#freez_tbody_dataTable > tr").each(function(){
			$(this).find(".tableopt-btn").mouseover(function(){
				var top = $(this).position().top;
				var left = $(this).position().left;
				var ul_hide = $(this).find("ul").children("li");
				var _show_ul = ul_hide.clone(true);
				ul_show.children("li").remove();
				ul_show.css({"top":top,"left":left+60});
				ul_show.prepend(_show_ul);
				equity_investment.hideDiv(false);
				ul_show.show();
			});
			$(this).find(".tableopt-btn").mouseout(function(){
				equity_investment.hideDiv(true);
				ul_show.hide();
			});	
			
			ul_show.mouseover(function(){
				equity_investment.hideDiv(false);
				$(this).show();
			});
			
			ul_show.mouseout(function(){
				equity_investment.hideDiv(true);
				$(this).hide();
			});
		});
			
	},
//	confirmUrl : "/am/am/business/dictate/getConfirm.json",
	// 收益类别下拉框监听事件
	sylb : function() {
		var type = Horn.getCompById("htype").getValue();
		var value = Horn.getCompById("c_ext_flag_" + type).getValue();
		$("#en_occur_profit_"+ type +" > input[name=en_occur_profit]").attr("title", "");
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
		//调用收益计算
		equity_investment.queryProfit(type);
	},//截止日期
	jzrq : function(){
		//调用收益计算		
		var type = Horn.getCompById("htype").getValue();
		if(type == "zdzf"){
			
		} else {
			equity_investment.queryProfit(type);
		}	
		
	},//还款方式
	hkfs : function(){
		//调用收益计算		
		var type = Horn.getCompById("htype").getValue();
		equity_investment.queryProfit(type);
	},//根据投资对象联动收款帐户
	tzdx : function(){
		equity_investment.query_l_rival_account_id();
	},//结算起始,结算截止
	symx_rqjs : function(type){
		if(type == 1){
			type = "add";
		} else if(type == 2){
			type = "edit";
		}
		var en_occur_invest = common_operate.parseNaN(Horn.getCompById("en_occur_invest_" + type).getValue()),
		 	c_calc_way = Horn.getCompById("c_calc_way_" + type).getValue(),
		 	en_rate = common_operate.parseNaN(Horn.getCompById("en_rate_" + type).getValue() / 100),
		 	l_period = common_operate.parseNaN(Horn.getCompById("l_period_" + type).getValue()),
		 	l_begin_date = common_operate.parseNaN(Horn.getCompById("l_begin_date_" + type).getValue()),
		 	l_end_date = common_operate.parseNaN(Horn.getCompById("l_end_date_" + type).getValue()),
		 	days = common_operate.parseNaN(dataUtil.calculateDays(l_begin_date, l_end_date) + 1);
		//开始日期必须要<结束日期
		if(l_begin_date && l_end_date &&  (l_begin_date > l_end_date)){
			TDialog.Msg.warning("提示","结算起始不能大于结算截止"); 
			Horn.getCompById("l_end_date_" + type).setValue("");
			return ;
		}
		
		common_stockcodesex.calculateProfit(type, c_calc_way, en_occur_invest, en_rate, days, l_period);
	},//公式算法
	gssfChange : function(type){
		if(type == 1){
			type = "_add";
		} else {
			type = "_edit";
		}
		
		var value = Horn.getCompById("c_calc_way" + type).getValue();
		Horn.getCompById("l_period"+ type).setValue("1");
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
	//根据基金代码查询组合名称
	jjdmChange : function(){	
		var type = Horn.getCompById("htype").getValue(),
			vc_product_id = Horn.getCompById("vc_product_id_" + type).getValue(),
			vc_stock_code = Horn.getCompById("vc_stock_code_" + type).getValue(),		
			url = "/am/am/business/stockcodesex/queryFundInfos.json";
			data = "vc_input_name1=vc_stock_code&vc_input_value1=" + vc_stock_code
					+ "&vc_input_table=groupholderstock"
					+ "&vc_output_name1=combi_id";

		query_operate.ajax(url, data, function(result){
			if(constants.funds.invest[type] && result.length < 1){//放款
				url = "/am/am/business/stockcodesex/queryFundInfo.json?vc_product_id=" + vc_product_id;
				query_operate.ajax(url, "", function(_result){
					result = _result;
				});
				Horn.getCompById("combi_id_" + type).addItems(result, true);
				return;
			}
			Horn.getCompById("combi_id_" + type).addItems(result, true);
			Horn.getCompById("combi_id_" + type).selectFirst();
		}, ajaxDataType.JSON);	
	},
	//组合名称-监听事件
	zhmcChange : function(){
		var type = Horn.getCompById("htype").getValue(),
			combi_id = Horn.getCompById("combi_id_" + type).getValue(),
			vc_stock_code = Horn.getCompById("vc_stock_code_" + type).getValue(),
			url = "/am/am/business/stockcodesex/query_equity.json",
			data = "vc_input_table=stockcodesex&combi_id=" + combi_id
				+ "&vc_input_value1=" + vc_stock_code
				+ "&business_type=" + type + "&l_action_in=1";
		if(!combi_id){
			return;
		}
		if(constants.funds.invest[type]){
			//非资产转入时调用
			if(constants.funds.invest[type]!='22150'){
				//可用余额申请
				common_stockcodesex.queryEnableBalance(type + "Form");
			}	
		}
		query_operate.ajax(url, data,
			function(result) {
				if (result && result.query) {
					switch (type) {
					case "gqtz":// 股权投资
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "xyzmrfk":// 信用证买入付款
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "srgqsyq":// 受让股权收益权
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "srqtsyq":// 受让其他收益权
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "gqtzsy":// 股权投资收益		
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "qjzr":// 期间转让		
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
					    break;
					case "gqsyqsy":// 股权收益权收益		
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "qtsyqsy":// 其他收益权收益		
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "gqhg":// 股权回购
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "crgqsyq":// 出让股权收益权
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;	
					case "gqsyqhg":// 股权收益权回购
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "crqtsyq":// 出让其他收益权
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;	
					case "qtsyqhg":// 其他收益权回购
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "dqdf":// 到期兑付
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "gqcr":// 股权出让
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "jctz":// 金融产品投资
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "jctzsy":// 金融产品投资收益
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "jchg":// 金融产品投资回购
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "jccr":// 金融产品投资出让
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "gqfhsg":// 股权分红送股
						Horn.getCompById("vc_relative_code_" + type).setValue(result.query.vc_relative_code);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "zdzf" :// 主动支付
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "wqtz":// 物权投资
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "wqtzsy":// 物权投资收益
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "wqhg":// 物权投资到期
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "zqtz":// 债权投资
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "zqtzsy":// 债权投资收益		
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "zqhg":// 债权回购
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "zqcr":// 债权出让
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "ck":// 存款
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "cksy":// 存款收息		
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "ckhg":// 存款提取
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "ckcr":// 到期转存
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "zczr":// 资产转入
						//Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "zczc":// 资产转出
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						//Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "wtdkff"://委托贷款发放
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "wtdksx"://委托贷款收息	
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "wtdkfb"://委托贷款返本
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "srxdzc"://受让信贷资产
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "xdzcfb"://信贷资产返本	
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "xdzcsx"://信贷资产收息
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "crxdzc"://出让信贷资产
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "pjmr"://票据买入
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);					
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);							
						break;
					case "pjsx"://票据收息	
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "pjtx"://票据贴现
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "hjhg"://票据回购
						Horn.getCompById("en_occur_invest_" + type).setValue(result.query.en_occur_invest);
						Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
						Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
						Horn.getCompById("en_untransfered_invest_" + type).setValue(result.query.en_untransfered_invest);
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					case "pjcr" ://票据出让
						common_stockcodesex.queryL_rival_id(type, result.query.l_rival_id);	
						break;
					default:
					}	
					common_reg.formremdefzero(type + "Form");
					//调用收益计算
					equity_investment.queryProfit(type);	
				} 
//				else {
//					Horn.Tip.warn("查询合同信息失败！");
//				}
		});
	},
	//主动支付-对手编号事件监听
	zf_dsbhChange : function(){
		var type = Horn.getCompById("htype").getValue(),
			url = "/am/am/business/stockcodesex/queryRreocurrMoney.json",
			values = Horn.getComp(type + "Form").getValues();
		values.l_level = 2;
		query_operate.doPost(url, values, function(result){
			if(result && result.query){
				Horn.getCompById("en_preoccur_balance_" + type).setValue(result.query.en_preoccur_balance);
				Horn.getCompById("l_preoccur_date_" + type).setValue(result.query.l_preoccur_date);
				Horn.getCompById("l_end_date_" + type).setValue(result.query.l_end_date);
				common_reg.formremdefzero(type + "Form");
				// 获取截止日期,调用截止日期事件监听,获取预划金额
				equity_investment.zd_jzrqChange();
			}
		}, ajaxDataType.JSON);
	},//主动支付-截止日期事件监听
	zd_jzrqChange : function(){
		var type = Horn.getCompById("htype").getValue(),
			url = "/am/am/business/stockcodesex/queryRreocurrMoney.json",
			values = Horn.getComp(type + "Form").getValues();
		values.l_level = 2;
		query_operate.doPost(url, values, function(result){
			if(result && result.query){
				Horn.getCompById("en_preoccur_balance_" + type).setValue(result.query.en_preoccur_balance);
				Horn.getCompById("en_preoccur_balance_x_"+ type).setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital").text());
			}
		}, ajaxDataType.JSON);
	},
	// 查询收款帐户
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
	},// 查询付款帐户
	query_l_account_id : function(grid, id) {
		var url = "/am/am/business/stockcodesex/queryAccount.json";
		var data = "vc_input_name1=vc_product_id&vc_input_value1="
				+ grid[0].vc_product_id + "&vc_input_table=bankaccountinfo"
				+ "&vc_output_name1=l_serial_no"
				+ "&vc_output_name2=vc_bank_name"
				+ "&vc_output_name3=vc_user_name"
				+ "&vc_output_name4=vc_bank_account";
		query_operate.ajax(url, data, function(result) {
			if (result) {
				Horn.getCompById(id).addItems(result, true);
				Horn.getCompById(id).selectFirst();
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		});
	},
	// 股权类-窗口展示
	show_equity : function(type,rowId) {
		$.post("/am/am/init/list.json", null, function(data) {
			if (data != null) {
				if (data.l_operate_flag == 0) {
					TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {
					});
				} else {
					Horn.getComp("dataTable").select(rowId);
					var grid = Horn.getComp("dataTable").getSelecteds();
					//附件页模拟单击			
					$("a[href='#tab1_"+type+"']").click();

					var url = "/am/am/business/stockcodesex/query_equity.json";
					var data = "vc_input_table=stockcodesex&"
							+ "vc_input_value1=" + grid[0].vc_stock_code
							+ "&business_type=" + type + "&l_action_in=1";
					query_operate.doPost(url, data,
							function(result) {
								if (result && result.query) {
									Horn.getComp(type + "Form").setValues(
											result.query);
									Horn.getComp(type + "Win").show();
									
									equity_investment.doAfterShow(type, grid);
								} 
//								else {
//									Horn.Tip.warn("操作失败！");
//								}
							}, ajaxDataType.JSON);
				}
			}
		}, "json");
	},// 回调之后处理函数
	doAfterShow : function(type, grid) {
		Horn.getCompById("htype").setValue(type);
		
		// 合同代码、产品代码下拉框
		var obj = {};
		obj.code = grid[0].vc_stock_code;
		obj.text = grid[0].vc_stock_name;
		Horn.getCompById("vc_stock_code_" + type).addItems([ obj ], true);
		Horn.getCompById("vc_stock_code_" + type).selectFirst();		

		// 隐藏到账日期、到账金额字段
		Horn.getCompById("l_occur_date_" + type).hide();
		Horn.getCompById("en_occur_balance_" + type).hide();
		Horn.getCompById("l_occur_date_" + type).setDisabled(true);
		Horn.getCompById("en_occur_balance_" + type).setDisabled(true);
		
			Horn.getCompById("combi_id_" + type).show();
			Horn.getCompById("combi_id_" + type).setDisabled(false);
			Horn.getCompById("combi_id_" + type).setReadonly(false);
			$("#combi_id_" + type + " > input").removeClass("combox_disabled");
			
			$("#vc_product_id_" + type).parent().find("span:eq(0)").html("<b class=\"hc_red\">* </b>基金代码");
			$("#vc_product_id_" + type).parent().find("span:eq(0)").attr("title","基金代码");
			Horn.getCompById("vc_product_id_" + type).setReadonly(false);
			
			$("#vc_product_id_" + type + " > input").removeClass("combox_disabled");
			common_stockcodesex.queryCpdm(type);
					
			Horn.getCompById("l_account_id_" + type).hide();
			Horn.getCompById("l_account_id_" + type).setDisabled(true);			
		

		switch (type) {
		case "gqtz":// 股权投资
							
				Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
				Horn.getCompById("l_rival_account_id_" + type).hide();
			
				Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");						
			break;
		case "srgqsyq":// 受让股权收益权
			
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
		
			Horn.getCompById("l_preoccur_date_" + type).setValue(
				grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");						
			break;
        case "srqtsyq":// 受让其他收益权
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
		
			Horn.getCompById("l_preoccur_date_" + type).setValue(
				grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");						
			break;
		case "xyzmrfk":// 信用证买入付款
			
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
		
			Horn.getCompById("l_preoccur_date_" + type).setValue(
				grid[0].l_begin_date);
		Horn.getCompById("c_money_type_" + type).setValue("0");						
		break;
		case "gqsyqsy":// 股权收益权收益		
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "gqtzsy":// 股权投资收益		
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "qtsyqsy":// 其他收益权收益		
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "crqtsyq":// 出让其他收益权
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "qtsyqhg":// 其他收益权回购
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "qjzr":// 期间转让		
			//Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "gqfhsg":// 股权分红送股
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			common_operate.dealCapital("en_preoccur_balance_x_" + type,"en_preoccur_balance_"+ type);
			Horn.getCompById("l_occur_amount_" + type).hide();
			Horn.getCompById("l_occur_amount_" + type).setDisabled(true);
			
			var c_ex_type = $.trim(grid[0].c_ex_type);
			if(c_ex_type == "非上市公司" || c_ex_type == "有限合伙企业基金"){
				Horn.getCompById("vc_relative_code_" + type).hide();
				Horn.getCompById("vc_relative_code_" + type).setDisabled(true);
			} else {
				Horn.getCompById("vc_relative_code_" + type).show();
				Horn.getCompById("vc_relative_code_" + type).setDisabled(false);
			}
			break;
		case "gqhg":// 股权回购
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "dqdf":// 到期兑付
			//Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "crgqsyq":// 出让股权收益权
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "gqsyqhg":// 股权收益权回购
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "gqcr":// 股权出让
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "jctz":// 金融产品投资
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			Horn.getCompById("l_preoccur_date_" + type).setValue(grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");
			break;
		case "jctzsy":// 金融产品投资收益
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "jchg":// 金融产品投资回购
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "jccr":// 金融产品投资出让
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "zdzf" :// 主动支付
			Horn.getCompById("en_current_balance_" + type).hide();
			Horn.getCompById("en_current_balance_" + type).setDisabled(true);
			
			Horn.getCompById("l_end_date_" + type).setValue(grid[0].l_end_date);
			Horn.getCompById("l_preoccur_date_" + type).setValue(dataUtil.getCurrentDate2());
			common_operate.dealCapital("en_preoccur_balance_x_" + type,"en_preoccur_balance_" + type);
			break;
		case "wqtz":// 物权投资
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			
			Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");
			break;
		case "wqtzsy":// 物权投资收益
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "wqhg":// 物权投资到期
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "zqtz":// 债权投资
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			
			Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");						
			break;
		case "zqtzsy":// 债权投资收益		
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "zqhg":// 债权回购
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "zqcr":// 债权出让
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "ck":// 存款
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			
			Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");						
			break;
		case "cksy":// 存款收息		
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "ckhg":// 存款提取
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "ckcr":// 到期转存
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "zczr"://资产转入
			
			Horn.getCompById("en_preoccur_balance_" + type).setValue(grid[0].en_contract_balance);
			Horn.getCompById("en_preoccur_balance_x_"+ type).setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital").text());
			//本金=预收=合同金额
			Horn.getCompById("en_occur_invest_" + type).setValue(grid[0].en_contract_balance);
			Horn.getCompById("l_preoccur_date_" + type).setValue(grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");						
			break;
		case "zczc"://资产转出
			Horn.getCompById("c_repay_type_" + type).setValue("5");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "wtdkff"://委托贷款发放
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			
			Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");
			break;
		case "wtdksx"://委托贷款收息
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "wtdkfb"://委托贷款返本
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "srxdzc"://受让信贷资产
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			
			Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");
			break;
		case "xdzcsx"://信贷资产收息
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "xdzxfb"://信贷资产返本
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "crxdzc"://出让信贷资产
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "pjmr"://票据买入
			Horn.getCompById("l_rival_account_id_" + type).setDisabled(true);
			Horn.getCompById("l_rival_account_id_" + type).hide();
			
			Horn.getCompById("l_preoccur_date_" + type).setValue(
					grid[0].l_begin_date);
			Horn.getCompById("c_money_type_" + type).setValue("0");
			break;
		case "pjsx"://票据收息
			Horn.getCompById("c_ext_flag_" + type).setValue("1101");
			equity_investment.sylb();
			break;
		case "pjtx"://票据贴现
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "pjhg"://票据回购
			Horn.getCompById("c_repay_type_" + type).setValue("3");
			Horn.getCompById("c_ext_flag_" + type).selectFirst();
			break;
		case "pjcr" ://票据出让
			Horn.getCompById("en_current_balance_" + type).hide();
			Horn.getCompById("en_current_balance_" + type).setDisabled(true);
			
			Horn.getCompById("l_end_date_" + type).setValue(grid[0].l_end_date);
			Horn.getCompById("l_preoccur_date_" + type).setValue(dataUtil.getCurrentDate2());
			common_operate.dealCapital("en_preoccur_balance_x_" + type,"en_preoccur_balance_" + type);
			break;
		default:
		}

		//调用收益计算
		switch (type) {	
		case "gqfhsg":// 股权分红送股
			break;
		case "zczr":break;// 资产转入
		case "zdzf":// 主动支付
//			break;
		case "gqtz":// 股权投资	
			
		case "srgqsyq":// 受让股权收益权					
		case "gqsyqsy":// 股权收益权收益					
		case "crgqsyq":// 出让股权收益权
		case "gqsyqhg":// 股权收益权回购
		
		case "xyzmrfk":// 信用证买入付款					
		case "qjzr":// 期间转让					
		case "dqdf":// 到期兑付
		
		case "srqtsyq":// 受让其他收益权   
		case "qtsyqsy":// 其他收益权收益
		case "qtsyqhg":// 其他收益权回购
		case "crqtsyq":// 出让其他收益权
		
		case "gqtzsy":// 股权投资收益			
		case "gqhg":// 股权回购
		case "gqcr":// 股权出让		
		case "jctz":// 金融产品投资		
		case "jctzsy":// 金融产品投资收益
		case "jchg":// 金融产品投资回购
		case "jccr":// 金融产品投资出让	
		case "wqtz":// 物权投资	
		case "wqtzsy":// 物权投资收益
		case "wqhg":// 物权投资回购
		case "zqtz":// 债权投资					
		case "zqtzsy":// 债权投资收益			
		case "zqhg":// 债权回购
		case "zqcr":// 债权出让
		case "ck":// 存款					
		case "cksy":// 存款收息			
		case "ckhg":// 存款提取
		case "ckcr":// 到期转存
		case "zczc":// 资产转出
		case "wtdkff"://委托贷款发放					
		case "wtdksx"://委托贷款收息					
		case "wtdkfb"://委托贷款返本
		case "srxdzc"://受让信贷资产
		case "xdzcsx"://信贷资产收息					
		case "xdzcfb"://信贷资产返本					
		case "crxdzc"://出让信贷资产
		case "pjmr"://票据买入
		case "pjsx"://票据收息					
		case "pjtx"://票据贴现					
		case "pjhg"://票据回购
		case "pjcr"://票据出让
		default:
//			//表单的值
//			if(config_7186 != "1"){//与o32资金接口对接时，先不调用收益计算
//				common_stockcodesex.queryEnableBalance(type + "Form");
//				equity_investment.queryProfit(type);
//			} 				
			$("#en_occur_invest_" + type + " > input:eq(1)").keyup(function() {
				equity_investment.queryProfit(type);
			});
			
		
		}
	},
	
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
//		无抵扣金额的写法
		var balance = Horn.getCompById("en_occur_profit_" + sType).getValue();
		Horn.getCompById("en_preoccur_balance_" + sType).setValue(balance);
		Horn.getCompById("en_preoccur_balance_x_"+ sType).setValue($("#en_preoccur_balance_" + sType + " > .u-typefield-capital").text());
	},
	// 股权类-提交
	equity_Add : function(type) {
		var grid = Horn.getComp("dataTable").getSelecteds();
		var c_business_class = grid[0].c_business_class;
		var form = Horn.getComp(type + "Form");
		if(!form.isValid()){
			return;
		}
		var submitParams = form.getValues();
		submitParams.business_type = type;
		submitParams.c_business_class = c_business_class;
		var url = "/am/am/sellerbusiness/stockcodesex/" + type + "/operation_quity.json?l_function_no="
				+ functionIds.stockcodesex.equity;
		if(constants.c_repay_type[type]){
			url += "&c_repay_type=" + constants.c_repay_type[type];
		}

		if(type == "gqfhsg") {
			submitParams.en_occur_profit = submitParams.en_preoccur_balance;
		}
		//查询节点转换表：是否调用O32申请接口
		o32Util.queryTransferNode("vc_btn_name",type,c_business_class);
		o32Util.queryFlagconfig(constants.type2BusFlg[type],c_business_class);
		
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");	
			if(o32Util.tranferNode.is_o32_risk == constants.strConstan.YES){//风控接口
				//判断是否放款类:业务分类2并且业务细分1；或者主动支付
				if((o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "1") 
						|| type == "zdzf"){					
					o32Util.risk(url,submitParams,type);
				} else {
					TDialog.Msg.warning("提示","非放款类业务，不需要调用风控接口，请检查【节点转换表-workflow_node_transfer】或者【业务配置信息表-businflagconfig】等相关配置！");
				}
			} else if(o32Util.tranferNode.is_o32_application == constants.strConstan.YES) {//申请接口
					o32Util.apply(url,submitParams,type);
			} else {//非标后台
				equity_investment.commitfb(url, submitParams, type);
			}				
		}, function() {
		});
	},//非标指令下达提交
	commitfb : function(url, submitParams, type){
		query_operate.doPost(url, submitParams, function(result) {
			 common_operate.endProgress();
			 if (result == constants.ajaxCallBackCode.OK) {
				 TDialog.Msg.alert("提示", "操作成功！", function() {
					 Horn.getComp(type + "Win").hide();
				 });
				 Horn.getCompById("msgWin").hide();
			 } else {
				TDialog.Msg.warning("提示",result + "!",function(){
					var c_deliver_status = submitParams.c_deliver_status;
					if(!c_deliver_status) { 
						return;
					}
					
					submitParams.cancel_frozen = constants.c_deliver_status[c_deliver_status];
					submitParams.oper_type = constants.operType.cx;//操作类型
					o32Util.confirm(submitParams, type);
				});			
			 }
		 });
	},
	//o32确认接口：撤销申请指令
	o32Cancel : function(){		
		var h_fk_type = $("#h_fk_type").val();

		if(h_fk_type == 102){//禁止:不能下达指令，也不需要执行撤销
			Horn.getCompById("msgWin").hide();
			return false;
		}
		
		var h_l_serial_no = $("#h_l_serial_no").val(),
		 	type = $("#htype").val(),
			values = Horn.getComp(type + "Form").getValues();

		values.l_serial_no = h_l_serial_no;
		values.l_busin_flag = constants.type2BusFlg[type];
		values.en_occur_invest = 0;
		values.en_occur_balance = 0;
		values.oper_type = constants.operType.cx;//操作类型
		values.cancel_frozen = constants.strConstan.NO;
		
		o32Util.confirm(values, type);
		
	},
	//o32关闭提示信息,并且非标系统下达指令
	o32Continue : function(){
		var h_l_serial_no = $("#h_l_serial_no").val(),
		 	type = $("#htype").val(),
			form = Horn.getComp(type + "Form"),
			url = "/am/am/sellerbusiness/stockcodesex/" + type + "/operation_quity.json?l_function_no="
				+ functionIds.stockcodesex.equity,
			h_fk_type = $("#h_fk_type").val();
		if(h_fk_type == 102){//禁止:不能下达指令，也不需要执行撤销
			Horn.getCompById("msgWin").hide();
			return false;
		} 		

		if(constants.c_repay_type[type]){
			url += "&c_repay_type=" + constants.c_repay_type[type];
		}
		
		var grid = Horn.getComp("dataTable").getSelecteds();
		var c_business_class = grid[0].c_business_class;
		var submitParams = form.getValues();
		submitParams.l_serial_no = h_l_serial_no;
		submitParams.business_type = type;
		submitParams.c_business_class = c_business_class;
		submitParams.c_deliver_status = "5";//交收状态：指令已风控
		
		if(o32Util.tranferNode.is_o32_application == constants.strConstan.YES) {//申请接口
			o32Util.apply(url,submitParams,type);
		} else {
			equity_investment.commitfb(url, submitParams, type);
		}
	},
	//o32异常处理
	o32exception : function(values){
		var type = Horn.getCompById("htype").getValue();
		values.business_type = type;
		values.oper_type = constants.operType.cx;//操作类型
		values.l_dictate_serial_no = values.l_serial_no;
		values.en_occur_balance = values.en_preoccur_balance;
		var url = "/am/am/business/dictate/o32exception.json";
		query_operate.doPost(url, values, function(){
			
		},ajaxDataType.TEXT);
	},
	// 股权收益权-收益计算
	queryProfit : function(type) {
		// 不管存不存在flag这个延时执行函数，先清除
		clearTimeout(flag);
		//var values =  Horn.getComp(type + "Form").getValues();
		var url = "/am/am/business/stockcodesex/queryProfit.json?";
		
		if(constants.c_repay_type[type]){
			url += "&c_repay_type=" + constants.c_repay_type[type];
		}

		// 延时500ms执行请求事件，如果感觉时间长了，就用合适的时间
		// 只要有输入则不执行keyup事件
		flag = setTimeout(
				function() {
					// 这里面就是调用的请求，我这里用一个函数来测试
					var values =  Horn.getComp(type + "Form").getValues();
					query_operate.doPost(url,values,function(result) {
										if (result && result.query) {											
											switch (type) {
											case "gqtz":
											/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
													en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
												var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
												Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
												break;
											case "srgqsyq":
												/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
														en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
													var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
													Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
													break;
											case "xyzmrfk":
												/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
														en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
													var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
													Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
													break;
	
											case "gqtzsy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "qjzr":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "gqsyqsy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "gqhg":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "dqdf":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "gqsyqhg":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
//											case "fyzf":
//												Horn.getCompById("en_occur_profit_"+ type)
//														.setValue(result.query.en_occur_profit_out);
//												/*Horn.getCompById("en_offset_balance_"+ type)
//														.setValue(result.query.en_occur_offset_out);*/
//												Horn.getCompById("en_preoccur_balance_"+ type)
//														.setValue(result.query.en_occur_balance_out);
//												break;
											case "crgqsyq":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;												
											case "gqcr":												
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "jctz":
												/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
													en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
												var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest); 
													Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
												break;
											case "jctzsy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "jchg":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "jccr":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "zdzf":
												common_stockcodesex.queryEnableBalance(type + "Form");
												break;
											case "wqtz":
												/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
													en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance);*/
												var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
												en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
												Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
												break;
											case "wqtzsy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "wqhg":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "zqtz":
												/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
													en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
												var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest); 
												Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
												break;
											case "zqtzsy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
											/*	Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "zqhg":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
											/*	Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "zqcr":												
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
										/*		Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "ck":
											/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
													en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
													en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
												var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
												en_preoccur_balance = common_operate.parseNaN(en_occur_invest); 
												Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
												break;
											case "cksy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "ckhg":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "ckcr":												
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "zczr":
												/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
														en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
												//var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
												//	var en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
												//	Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
													break;
											case "zczc":												
													//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
													/*Horn.getCompById("en_offset_balance_"+ type)
															.setValue(result.query.en_occur_offset_out);*/
													Horn.getCompById("en_preoccur_balance_"+ type)
															.setValue(result.query.en_occur_balance_out);
													break;
											case "wtdkff":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "wtdksx":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "wtdkfb":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "srxdzc":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "xdzcfb":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "xdzcsx":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "crxdzc":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "pjmr":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "pjtx":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "pjsx":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "pjhg":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "pjcr":												
												//Horn.getCompById("en_occur_profit_"+ type).setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "srqtsyq":
												/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue(),
														en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest) - common_operate.parseNaN(en_offset_balance); */
													var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue(),
														en_preoccur_balance = common_operate.parseNaN(en_occur_invest);
													Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance);
													break;
											case "qtsyqsy":
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;																	
											case "qtsyqhg":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											case "crqtsyq":											
												Horn.getCompById("en_occur_profit_"+ type)
														.setValue(result.query.en_occur_profit_out);
												/*Horn.getCompById("en_offset_balance_"+ type)
														.setValue(result.query.en_occur_offset_out);*/
												Horn.getCompById("en_preoccur_balance_"+ type)
														.setValue(result.query.en_occur_balance_out);
												break;
											default:
											}
											// 根据业务type类型处理金额大写
											if(type !="gqfhsg"){
												Horn.getCompById("en_preoccur_balance_x_"+ type)
													.setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital")
															.text());
											}
											
										} 
//										else {
//											Horn.Tip.warn(result.errorMsg);
//										}
									}, ajaxDataType.JSON);
				}, 100);
	}
};


/****还款计划
 * */
var  equity_ivestment_repayplan={
		 //绑定查询条件查询      tablename表名
		 formQuery:function(tablename){
		    var queryForm;
		    //根据表名获取绑定的查询条件
		    if(tablename=="repayplanTable"){
		        queryForm=Horn.getCompById("repayplanqueryForm").getValues();
		    }else if(tablename=="repayplandetailTable"){
		        queryForm=Horn.getCompById("repayplandetailqueryForm").getValues();
		    }
			Horn.getCompById(tablename).setBaseParams(queryForm);
			Horn.getCompById(tablename).load();
		},
		//主键转换用作查看
		 funlook:function(data){
	       return "<a href='javascript:void(0);' onclick='equity_ivestment_repayplan.look(\""+data.val+"\");' >"+data.val+"</a>";
	   },
	   
		//查看还款计划
		  look:function(a){
			  var prefix="repayplanck";
			  var vc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
      		url="/am/am/business/stockcodesex/repayplanlook.json?l_function_no="+functionIds["repayplan"]["look"];
      		url=url+"&&l_order_no="+a+"&&vc_stock_code="+vc_stock_code;
      		$.post(url, null, function(data) {
      						if (data != null) {
      						    Horn.getComp(prefix+"Win").show();   
      						  //同步执行功能号字典重新加载
      			            	$.ajax({
      			            		type : "post",
      								url : "/am/am/system/tree/dicmanagelist.json?tableName=stockcodesex&&l_function_no=1000468&&filterString="+vc_stock_code,
      								data : "",
      								async : false,
      								dataType :"json",
      								success : function(result) {
      			            		       Horn.getCompById("vc_stock_code_repayplanck").addItems(result,true);
      								}
      							});
      					        Horn.getComp(prefix+"Form").setValues(data);
      					      //日期控件默认值为0去除
      					    	common_reg.formremdefzero(prefix+"Form");
      					    	//返还种类变化
      					    	equity_ivestment_repayplan.c_plan_typechange(3);
      					    	//明细类别变化
      					    	equity_ivestment_repayplan.c_ext_flagchange(3);
      					    	if(data.c_plan_type=='1'){
      					    		//还款方式变化
	        					    	equity_ivestment_repayplan.c_repay_typechange(3);
      					    	}
      					    	//公式算法变化
      					    	equity_ivestment_repayplan.c_calc_waychange(3);
      					    	common_operate.setFormReadOnly(prefix+"Form"); 
      						} 
//      						else {
//      							Horn.Tip.warn("查询信息失败");
//      						}
      		}, "json");  
		},
		//清空新增窗口
		clearWin:function(win){
			common_reg.Formreset(win);
			if(win=="repayplanxzForm"){
				var repayplanvc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
            	Horn.getCompById("vc_stock_code_repayplanxz").setValue(repayplanvc_stock_code);
            	Horn.getCompById("c_plan_type_repayplanxz").setValue("1",true);
			}
		},
		//打开新增     prefix参数为form和window名的前缀
		showaddwin:function(prefix){
			$.post("/am/am/init/list.json", null, function(data) {
				if (data!=null) {					
		            if(data.l_operate_flag==0){	        		
			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
							});	       
		            }else{
		            	Horn.getComp(prefix+"Win").show(); 
		            	common_reg.Formreset(prefix+"Form");
		            	/*******处理不同功能的新增请求********/
		            	//还款计划新增窗口
		            	if(prefix=="repayplanxz"){
		            		Horn.getCompById("closeflag2").setValue("0");
		            		var vc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
		            		var l_dictate_serial_no=Horn.getCompById("repayplanl_dictate_serial_no").getValue();
		            		url="/am/am/business/stockcodesex/repayplanlook.json?l_function_no="+functionIds["repayplan"]["getorderno"];
			        		url=url+"&&l_dictate_serial_no="+l_dictate_serial_no+"&&vc_stock_code="+vc_stock_code;
			        		$.post(url, null, function(data) {
			        						if (data != null) {
			        							Horn.getCompById("l_order_no_repayplanxz").setValue(data.l_order_no);
			        						} 
//			        						else {
//			        							Horn.Tip.warn("查询信息失败");
//			        						}
			        		}, "json"); 
			        		//同步执行功能号字典重新加载
			                	$.ajax({
			        			       type : "post",
			        					url : "/am/am/system/tree/dicmanagelist.json?tableName=stockcodesex&&l_function_no=1000468&&filterString="+Horn.getCompById("repayplanvc_stock_code").getValue(),
			        					data : "",
			        					async : false,
			        					dataType :"json",
			        					success : function(result) {
			        			          Horn.getCompById("vc_stock_code_repayplanxz").addItems(result,true);
			        					}
			        	    	});	
			                	var repayplanvc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
			                	Horn.getCompById("vc_stock_code_repayplanxz").setValue(repayplanvc_stock_code);
			                	Horn.getCompById("c_plan_type_repayplanxz").setValue("1",true);
		            	}
		            	//收益新增窗口
		            	else if(prefix=="repaydetailxz"){
		            		//Horn.getCompById("repaydetailAddWin").show();   
			        		var l_end_date=Horn.getCompById("repayplanl_end_date").getValue();
			        		var l_begin_date=Horn.getCompById("repayplanl_begin_date").getValue();
			                Horn.getCompById("l_begin_date_repaydetail_add").setValue(l_begin_date);
			        		Horn.getCompById("l_end_date_repaydetail_add").setValue(l_end_date);
			        		Horn.getCompById("l_rate_days_repaydetail_add").setValue("360");
			        		equity_ivestment_repayplan.accountdate(1,1);
		            	}
		           } 
				}
	       }, "json");
		},
		//打开修改        prefix参数为form和window名的前缀     tablename参数为关联table名称
		showeditwin:function(prefix,tablename){
			var url;
			var rowData;
			$.post("/am/am/init/list.json", null, function(data) {
				if (data!=null) {					
		            if(data.l_operate_flag==0){	        		
			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
							});	       
		            }else{
		            	if (Horn.getCompById(tablename).getSelecteds().length==0){
		        	   		Horn.Tip.warn("请选择一条记录！");
		        	   		return;
		        	    }
		            	rowData = Horn.getCompById(tablename).getSelecteds().length && (Horn.getComp(tablename).getSelecteds())[0];
		        		/*******处理不同功能的修改请求********/
		            	//还款计划修改
		            	if(prefix=="repayplanxg"){
		            		Horn.getCompById("closeflag3").setValue("0");
		            		var vc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
		            		url="/am/am/business/stockcodesex/repayplanlook.json?l_function_no="+functionIds["repayplan"]["look"];
			        		url=url+"&&l_order_no="+rowData.l_order_no+"&&vc_stock_code="+vc_stock_code + "&l_dictate_serial_no=" + rowData.l_dictate_serial_no;
			        		$.post(url, null, function(data) {
			        						if (data != null) {			        			    
			        						    Horn.getComp(prefix+"Win").show();   
			        						  //同步执行功能号字典重新加载
			        			            	$.ajax({
			        			            		type : "post",
			        								url : "/am/am/system/tree/dicmanagelist.json?tableName=stockcodesex&&l_function_no=1000468&&filterString="+Horn.getCompById("repayplanvc_stock_code").getValue(),
			        								data : "",
			        								async : false,
			        								dataType :"json",
			        								success : function(result) {
			        			            		       Horn.getCompById("vc_stock_code_repayplanxg").addItems(result,true);
			        								}
			        							});
			        			            	common_reg.Formreset(prefix+"Form");
			        					        Horn.getComp(prefix+"Form").setValues(data);
			        					      //日期控件默认值为0去除
			        					    	common_reg.formremdefzero(prefix+"Form");
			        					    	//返还种类变化
			        					    	equity_ivestment_repayplan.c_plan_typechange(2);
			        					    	//明细类别变化
			        					    	equity_ivestment_repayplan.c_ext_flagchange(2);
			        					    	if(data.c_plan_type=='1'){
			        					    		//还款方式变化
				        					    	equity_ivestment_repayplan.c_repay_typechange(2);
			        					    	}
			        					    	//公式算法变化
			        					    	equity_ivestment_repayplan.c_calc_waychange(2);
			        						} 
//			        						else {
//			        							Horn.Tip.warn("查询信息失败");
//			        						}
			        		}, "json");  
		        		}//收益修改
		            	else if(prefix=="repaydetailxg"){
//		        			url="/am/am/business/stockcodesex/repayplanlook.json?l_function_no="+functionIds["repayplan"]["detaillook"];
//		        			url+="&&l_order_no="+Horn.getCompById("repayplanl_order_no").getValue()+"&&vc_stock_code="+Horn.getCompById("repayplandetailvc_stock_code").getValue()+"&&l_serial_no="+rowData.l_serial_no;
//			        		$.post(url, null, function(data) {
//			        						if (data != null) {
		            		                    
			        						    Horn.getComp(prefix+"Win").show();  
			        						    common_reg.Formreset(prefix+"Form");
			        					        Horn.getComp(prefix+"Form").setValues(rowData);			        			
			        							Horn.getCompById("en_profit_repaydetail_edit").setValue(rowData.en_profit.toFixed(2));			        					   
			        					      //日期控件默认值为0去除
			        					    	common_reg.formremdefzero(prefix+"Form");
//			        						} else {
//			        							Horn.Tip.warn("查询信息失败");
//			        						}
//			        		}, "json");   
		        		}	
		        		
		            } 
				}
	       }, "json");
		},
		//删除         tablename参数为关联table名称
		del:function(tablename){
			var url;
			var rowData;
			//删除自动生成的还款计划
        	if(tablename==''){
        		var vc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
        		url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["operdeal"];
    		         url=url+"&&vc_info_name=REPAYPLAN&&l_action_in=6&&l_dictate_serial_no=0&&vc_stock_code="+vc_stock_code;
    			      dialog.dialog("open");
    			    //同步执行功能号字典重新加载
		            	$.ajax({
		            		type : "post",
							url : url,
							data : "",
							async : false,
							dataType :"text",
							success : function(result) {
								common_operate.endProgress();
//	  						    if (result!= "ok") {
//	  						      Horn.Tip.warn(result);
//		    					}
							}
						});
    			      		 
        	}else{
        		$.post("/am/am/init/list.json", null, function(data) {
    				if (data!=null) {					
    		            if(data.l_operate_flag==0){	        		
    			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
    							});	       
    		            }else{
    		            	if (Horn.getCompById(tablename).getSelecteds().length==0){
    		            		Horn.Tip.warn("请选择一条记录！");
    			    		   	return;
    		    		   }else{
    		    			     if(tablename=="repayplanTable"){
    	    		    			   var length = Horn.getComp(tablename).getSelecteds().length;
    				        		   var values = (Horn.getComp(tablename).getSelecteds());
    				        		   var  i=0;
    									var  idstring='';
    									var  idstring2='';
    									while(length>i){
    									   if(i==0){
    									      idstring=values[i].l_order_no;
    									      idstring2=values[i].l_serial_no;
    									   }else{
    									       idstring=idstring+";"+values[i].l_order_no;
    									       idstring2=idstring2+";"+values[i].l_serial_no;
    									   }
    									   i++;
    									}
    	    		    			  url="/am/am/sellerbusiness/stockcodesex/repayplandel.json?l_function_no="+functionIds["repayplan"]["operdeal"];
    				    		      TDialog.Msg.confirm("提示","您确定要删除还款计划记录吗",function(){
    				    			      //alert(rowData.vc_product_id+" && "+rowData.l_workgroup_id); 
    				    			      url=url+"&&l_action_in=3&&vc_info_name=REPAYPLAN&&idstring2="+idstring2+"&&vc_stock_code="+values[0].vc_stock_code+"&&idstring="+idstring;
    				    			      dialog.dialog("open");
    				    			      $.post(url, null, function(data) {
    				    			    	  common_operate.endProgress();
    			  							  if (data == "ok") {
    			  								equity_ivestment_repayplan.formQuery(tablename);
    				    							Horn.Tip.success("操作成功");
    				    						} 
//    			  							   else {
//    				    						    Horn.Tip.warn(data);
//    				    						}
    				    					}, "text");
    				    				},function(){  
    				    		          //canel  
    				    		       });
    		    			     }else if(tablename=="repayplandetailTable"){
    	    		    			 rowData = Horn.getCompById(tablename).getSelecteds().length && (Horn.getComp(tablename).getSelecteds())[0];  
    		    			    	 url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["detaildeal"];
    				    		         //删除单条收益明细		    			    
    				    		    		  url=url+"&&l_action_in=7&&l_serial_no="+rowData.l_serial_no;	
    				    		    		  TDialog.Msg.confirm("提示","您确定要删除收益明细吗",function(){
    						    			      dialog.dialog("open");
    						    			      $.post(url, null, function(data) {
    						    			    	  common_operate.endProgress();
    					  							  if (data == "ok") {
    					  								equity_ivestment_repayplan.formQuery(tablename);
    						    							Horn.Tip.success("操作成功");
    						    						} 
//    					  							  else {
//    						    						    Horn.Tip.warn(data);
//    						    						}
    						    					}, "text");
    						    				},function(){  
    						    		          //canel  
    						    		       });
    		    			     }  
    		    		   } 
    		            	
    		            } 
    				}
    	       }, "json");  
        	}
		},
		delalldetail:function(){
				//判断是否是点关闭叉叉  触发
				var closeflag=Horn.getCompById("closeflag").getValue();
				var	l_order_no=Horn.getCompById("repayplanl_order_no").getValue();
				var   vc_stock_code=Horn.getCompById("repayplandetailvc_stock_code").getValue();
				var	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["detaildeal"];  
				if(closeflag=='0'){
					//删除本次操作的收益明细
					 url+="&&l_order_no="+l_order_no+"&&l_action_in=9&&vc_stock_code="+vc_stock_code;
					//处理状态
					 dialog.dialog("open");
						//同步执行功能号字典重新加载
			        	$.ajax({
			        		type : "post",
							url : url,
							data : "",
							async : false,
							dataType :"text",
							success : function(data) {
								common_operate.endProgress();
								   if (data == "ok") {
										//Horn.Tip.success("操作成功");
									}
//								   else {
//									    Horn.Tip.warn(data);
//									}
							}
						});
			  	}else{
			  	     //点击确定触发          处理本次操作的收益明细
					 url+="&&l_order_no="+l_order_no+"&&l_action_in=8&&vc_stock_code="+vc_stock_code;
					 
				}
			
		},
		delalldetail2:function(){  //还款计划新增关闭
			    //判断是否是点关闭叉叉  触发
				var closeflag=Horn.getCompById("closeflag2").getValue();
				var l_order_no=Horn.getCompById("l_order_no_repayplanxz").getValue();
				var vc_stock_code=Horn.getCompById("vc_stock_code_repayplanxz").getValue();
				var	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["detaildeal"];  
				if(closeflag=='0'){
					//删除本次操作的收益明细
					 url+="&&l_order_no="+l_order_no+"&&l_action_in=9&&vc_stock_code="+vc_stock_code;
			  	}else{
			  	     //点击确定触发          处理本次操作的收益明细
					 url+="&&l_order_no="+l_order_no+"&&l_action_in=8&&vc_stock_code="+vc_stock_code; 
				}
				//处理状态
				 dialog.dialog("open");
					//同步执行功能号字典重新加载
		        	$.ajax({
		        		type : "post",
						url : url,
						data : "",
						async : false,
						dataType :"text",
						success : function(data) {
						   common_operate.endProgress();
						   if (data == "ok") {
								//Horn.Tip.success("操作成功");
							} 
//						    else {
//							    Horn.Tip.warn(data);
//							}
						}
					});
		},
		delalldetail3:function(){     //还款计划修改关闭
			//判断是否是点关闭叉叉  触发
			var closeflag=Horn.getCompById("closeflag3").getValue();
			var l_order_no=Horn.getCompById("l_order_no_repayplanxg").getValue();
			var vc_stock_code=Horn.getCompById("vc_stock_code_repayplanxg").getValue();
			
			var	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["detaildeal"];  
			if(closeflag=='0'){
				//删除本次操作的收益明细
				 url+="&&l_order_no="+l_order_no+"&&l_action_in=9&&vc_stock_code="+vc_stock_code;
		  	}else{
		  	     //点击确定触发          处理本次操作的收益明细
				 url+="&&l_order_no="+l_order_no+"&&l_action_in=8&&vc_stock_code="+vc_stock_code; 
			}
			//处理状态
			 dialog.dialog("open");
				//同步执行功能号字典重新加载
	        	$.ajax({
	        		type : "post",
					url : url,
					data : "",
					async : false,
					dataType :"text",
					success : function(data) {
					   common_operate.endProgress();
					   if (data == "ok") {
							//Horn.Tip.success("操作成功");
						} 
//					   else {
//						    Horn.Tip.warn(data);
//						}
					}
				});
	},
		//添加修改操作
		repayplanoperate:function(prefix,tablename){
			var result = Horn.getComp(prefix+"Form").isValid();
			var url;
			if(result)
			{
				dialog.dialog("open");
			    //还款计划新增或者修改
			    if(prefix=="repayplanxz"){
			    	var l_dictate_serial_no=Horn.getCompById("repayplanl_dictate_serial_no").getValue();
			    	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["operdeal"];
			    	url+="&&l_dictate_serial_no="+l_dictate_serial_no+"&&l_action_in=1&&vc_info_name=REPAYPLAN";
			    	//阻止关闭窗口事件
			    	Horn.getCompById("closeflag2").setValue("1");
			    }else if(prefix=="repayplanxg"){
			    	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["operdeal"];
			    	url+="&&l_action_in=2&&vc_info_name=REPAYPLAN";
			    	if(Horn.getCompById("c_status_repayplanxg").getValue()=='1'){
			    		Horn.getCompById("c_status_repayplanxg").setValue('0');
			    	}
			    	//阻止关闭窗口事件
			    	Horn.getCompById("closeflag3").setValue("1");
			    }
			    //收益新增
			    else if(prefix=="repaydetailxz"){
			    	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["detaildeal"];
			    	url+="&&l_order_no="+Horn.getCompById("repayplanl_order_no").getValue()+"&&l_action_in=1&&vc_stock_code="+Horn.getCompById("repayplandetailvc_stock_code").getValue();
			    }
			    //收益修改
			    else if(prefix=="repaydetailxg"){
			    	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["detaildeal"];
			    	url+="&&l_order_no="+Horn.getCompById("repayplanl_order_no").getValue()+"&&l_action_in=2&&vc_stock_code="+Horn.getCompById("repayplandetailvc_stock_code").getValue();
			    }
			    var values = Horn.getComp(prefix+"Form").getValues();
						$.post(url, values, function(data) {
							common_operate.endProgress();
						    if (data == "ok") {
							    Horn.getComp(prefix+"Win").hide();
							    equity_ivestment_repayplan.formQuery(tablename);
								Horn.Tip.success("操作成功");
							} 
//						    else {
//								//Horn.Tip.warn("操作失败");
//								Horn.Tip.warn(data);
//							}
						}, "text");
		    }			
		},
		//还款计划自动生成
		automake:function(){
			TDialog.Msg.confirm("提示","自动生成还款计划功能会覆盖现有数据并重新生成,确定继续操作？",function(){
		        var vc_stock_code=Horn.getCompById("repayplanvc_stock_code").getValue();
	            dialog.dialog("open");
				$.post("/am/am/sellerbusiness/stockcodesex/repayplanoperation.json?l_function_no="+functionIds["repayplan"]["automake"]+"&&l_action_in=1&&vc_stock_code="+vc_stock_code, null, function(data) {
					common_operate.endProgress();
				    if (data == "ok") {
				    	equity_ivestment_repayplan.formQuery('repayplanTable');
						Horn.Tip.success("操作成功");
					} 
				}, "text");
			},function(){});
		},
		//还款计划 type后缀转化
		repaytypechange:function(type){
			//字段后缀
			var type2;
			if(type==1){
				type2="_repayplanxz";
			}else if(type==2){
				type2="_repayplanxg";
			}else if(type==3){
				type2="_repayplanck";
			}else{
				type2="_"+type+"";
			}
			return type2;
		},
		//返还种类变化
		c_plan_typechange:function(type){
			//字段后缀
			var type2=equity_ivestment_repayplan.repaytypechange(type);
			//值过滤
			var  c_ext_flag_filter;
			 var  val=Horn.getCompById("c_plan_type"+type2).getValue();
			 if(val=='1'){
				 c_ext_flag_filter="9011,9012,9013";
				 if(type!=2){
					 Horn.getCompById("c_ext_flag"+type2).setValue("9011",true);
				 }
				 Horn.getCompById("c_ext_flag"+type2).filter(c_ext_flag_filter,true,false);
			 }else if(val=='2'){
				 c_ext_flag_filter="1101,1102,1103";
				 if(type!=2){
					 Horn.getCompById("c_ext_flag"+type2).setValue("1101",true);
				 }
				 Horn.getCompById("c_ext_flag"+type2).filter(c_ext_flag_filter,true,false);
				 //还款方式为5的隐藏按钮,不修改无法显示出按钮,需要联动回来
				 Horn.getCompById("c_repay_type"+type2).setValue("3");
			 }else{
				 c_ext_flag_filter="";
				 Horn.getCompById("c_ext_flag"+type2).filter(c_ext_flag_filter,true,false);
			 }
			 Horn.getCompById("en_plan_profit"+type2).setReadonly(true);
			 //期数
			 Horn.getCompById("l_period"+type2).hide();
			 Horn.getCompById("l_period"+type2).setDisabled(true);
			 Horn.getCompById("en_plan_invest"+type2).setRequired(true); 
			 //返还本金
			 Horn.getCompById("en_return_invest"+type2).hide();
			 Horn.getCompById("en_plan_invest"+type2).setDisabled(true);
			 //计划本金
			 Horn.getCompById("en_plan_invest"+type2).show();
			 Horn.getCompById("en_plan_invest"+type2).setDisabled(false);
		},
		//明细类别变化
		c_ext_flagchange:function(type){
			//字段后缀
			var type2=equity_ivestment_repayplan.repaytypechange(type);
			 var  val=Horn.getCompById("c_ext_flag"+type2).getValue();
			 var  c_plan_type=Horn.getCompById("c_plan_type"+type2).getValue();
			 if(c_plan_type=='1'){
				     //公式算法
			         Horn.getCompById("c_calc_way"+type2).hide();
					 Horn.getCompById("c_calc_way"+type2).setDisabled(true);
					 //还款方式
					 Horn.getCompById("c_repay_type"+type2).show();
					 Horn.getCompById("c_repay_type"+type2).setDisabled(false);
					 if(type!=2){
						 Horn.getCompById("c_repay_type"+type2).setValue("3",true);
					 }					
			 }else if(c_plan_type=='2'){
				 if(val=='1101'){
					 Horn.getCompById("en_plan_profit"+type2).setReadonly(true);
					 Horn.getCompById("c_calc_way"+type2).hide();
					 Horn.getCompById("c_calc_way"+type2).setDisabled(true);
					 Horn.getCompById("c_repay_type"+type2).hide();
					 Horn.getCompById("c_repay_type"+type2).setDisabled(true);
				 }else{
					 Horn.getCompById("en_plan_profit"+type2).setReadonly(false);
					 Horn.getCompById("c_calc_way"+type2).show();
					 Horn.getCompById("c_calc_way"+type2).setDisabled(false);
					 if(type!=2){
						 Horn.getCompById("c_calc_way"+type2).setValue("0");
						 equity_ivestment_repayplan.c_calc_waychange(type);
					 }				 
					 Horn.getCompById("c_repay_type"+type2).hide();
					 Horn.getCompById("c_repay_type"+type2).setDisabled(true);
				 }
			 }else{
				 //不选择时处理
				 Horn.getCompById("c_calc_way"+type2).hide();
				 Horn.getCompById("c_calc_way"+type2).setDisabled(true);
				 Horn.getCompById("c_repay_type"+type2).hide();
				 Horn.getCompById("c_repay_type"+type2).setDisabled(true);
			 }
			 //期数
			 Horn.getCompById("l_period"+type2).hide();
			 Horn.getCompById("l_period"+type2).setDisabled(true);
			 if(type==2){
				 Horn.getCompById("en_plan_invest"+type2).setRequired(true); 
			 }
			
		},
		//还款方式变化
		c_repay_typechange:function(type){
			//字段后缀
			var type2=equity_ivestment_repayplan.repaytypechange(type);
			 var  val=Horn.getCompById("c_repay_type"+type2).getValue();
			 if(val=='3'){
				 //返还本金
				 Horn.getCompById("en_return_invest"+type2).hide();
				 Horn.getCompById("en_plan_invest"+type2).setDisabled(true);
				 //新增把返还本金置空
				 if(type=='1'){
					 Horn.getCompById("en_return_invest"+type2).setValue("");
				 }
				 //计划本金
				 Horn.getCompById("en_plan_invest"+type2).show();
				 Horn.getCompById("en_plan_invest"+type2).setDisabled(false);
			 }else if(val=='4'){
				 //返还本金
				 Horn.getCompById("en_return_invest"+type2).show();
				 Horn.getCompById("en_plan_invest"+type2).setDisabled(false);
				 //计划本金
				 Horn.getCompById("en_plan_invest"+type2).show();
				 Horn.getCompById("en_plan_invest"+type2).setDisabled(false);
			 }else{
				 //返还本金
				 Horn.getCompById("en_return_invest"+type2).show();
				 Horn.getCompById("en_plan_invest"+type2).setDisabled(false);
				 //设置计划收益变为0
				 Horn.getCompById("en_plan_profit"+type2).setValue("0",true);
				 //计划本金
				 Horn.getCompById("en_plan_invest"+type2).hide();
				 Horn.getCompById("en_plan_invest"+type2).setDisabled(true);
			 }
		},
		//公式算法变化
		c_calc_waychange:function(type){
			//字段后缀
			var type2=equity_ivestment_repayplan.repaytypechange(type);
			 var  val=Horn.getCompById("c_calc_way"+type2).getValue();
			 if(val=='1'||val=='2'||val=='3'||val=='4'){
				//期数
				 Horn.getCompById("l_period"+type2).show();
				 Horn.getCompById("l_period"+type2).setDisabled(false);
				 Horn.getCompById("en_plan_invest"+type2).setRequired(true); 
			 }else{
				 if(val=='0'){
				   Horn.getCompById("en_plan_invest"+type2).setRequired(false); 
				 }else{
					 Horn.getCompById("en_plan_invest"+type2).setRequired(true); 
				 }
				 Horn.getCompById("l_period"+type2).hide();
				 Horn.getCompById("l_period"+type2).setDisabled(true);
			 } 
		},
		//返还本金输入判断是否   把值同步给计划本金
		inputreturn_invest:function(type){
			//字段后缀
			var type2=equity_ivestment_repayplan.repaytypechange(type);
			 var c_plan_type=Horn.getCompById("c_plan_type"+type2).getValue();
			 var c_repay_type=Horn.getCompById("c_repay_type"+type2).getValue();
			 if(c_plan_type=='1'&&c_repay_type=='5'){
				 Horn.getCompById("en_plan_invest"+type2).setValue(Horn.getCompById("en_return_invest"+type2).getValue());
			 }
			
		},
		//还款计划提交,还款计划收益提交
		repayplanCommit:function(tablename){
			var url;
		    dialog.dialog("open");
		    //还款计划收益提交
		    if(tablename=="repayplandetailTable"){		  
		    	common_operate.endProgress();
    	       Horn.getCompById("closeflag").setValue("1");
		       Horn.getComp("repayplandetailWin").hide();
			    //获取统计值回填给计划收益值
			    var dd = $("#body_repayplandetailTable > tr:last").find("td:eq(8)").text();
				dd = Number(dd).toFixed(2);
				var en_plan_profit=Horn.getCompById("repayplan_element").getValue();
				Horn.getCompById(en_plan_profit).setValue(dd);
				Horn.Tip.success("操作成功");					
		    }
		    //还款计划提交
		    else if(tablename=="repayplanTable"){
		    	url="/am/am/sellerbusiness/stockcodesex/repayplanoperation2.json?l_function_no="+functionIds["repayplan"]["detailconfirm"];
		    	url+="&&l_action_in=1&&l_dictate_flag=0&&business_type=hkjh&&vc_stock_code="+Horn.getCompById("repayplanvc_stock_code").getValue();
		    	$.post(url, null, function(data) {
		    		common_operate.endProgress();
				    if (data == "ok") {			
						//Horn.Tip.success("操作成功");
						TDialog.Msg.alert("提示", "操作成功！", function() {
							common_operate.refreshUrl("ht");
							window.parent.Horn.Frame.screen.closeCurrent();
						});
					} 
//				    else {
//						//Horn.Tip.warn("操作失败");
//						Horn.Tip.warn(data);
//					}
				}, "text");
		    }else{
		    	common_operate.endProgress();
		    }        
	
		},
		/**********暂时不处理*/
		//添加修改还款计划     计算收益方法
		caldetail:function(type){
			//字段后缀
			var type2=equity_ivestment_repayplan.repaytypechange(type);
		},
		//显示计划收益明细
		showplandetail:function(element2){
			var type2;
			if(element2=="en_plan_profit_repayplanxz"){
			    type2="_repayplanxz";
		    }else if(element2=="en_plan_profit_repayplanxg"){
			    type2="_repayplanxg";
		    }else{
		    	type2="_repayplanck";
		    }
			//var selectId = Horn.getCompById(element2).getValue();
			
			Horn.getCompById("repayplanen_plan_invest").setValue(Horn.getCompById("en_plan_invest"+type2).getValue());
			Horn.getCompById("repayplandetailvc_stock_code").setValue(Horn.getCompById("vc_stock_code"+type2).getValue());
			Horn.getCompById("repayplanl_end_date").setValue(Horn.getCompById("l_end_date"+type2).getValue());
			Horn.getCompById("repayplanl_begin_date").setValue(Horn.getCompById("l_begin_date"+type2).getValue());
			Horn.getCompById("repayplanc_repay_type").setValue(Horn.getCompById("c_repay_type"+type2).getValue());
			Horn.getCompById("repayplanl_order_no").setValue(Horn.getCompById("l_order_no"+type2).getValue());
			Horn.getCompById("repayplanl_rate_id").setValue(Horn.getCompById("l_rate_id"+type2).getValue());
			Horn.getCompById("repayplan_element").setValue(element2);
			Horn.getCompById("repayplandetailWin").show();
			//设置关闭状态为为默认值0
			Horn.getCompById("closeflag").setValue("0");
			//当还款方式为5返还本金的时候隐藏收益操作按钮
			if(Horn.getCompById("repayplanc_repay_type").getValue()=='5'||element2=="en_plan_profit_repayplanck"){
				Horn.getComp("repayplandetailTable").hideButton("repayplan_profitDdd", true);
				Horn.getComp("repayplandetailTable").hideButton("repayplan_profitEdit", true);
				Horn.getComp("repayplandetailTable").hideButton("repayplan_profitDel", true);
				Horn.getComp("repayplandetailbutton").setEnable("confirm",false);
			}else{
				Horn.getComp("repayplandetailTable").hideButton("repayplan_profitDdd", false);
				Horn.getComp("repayplandetailTable").hideButton("repayplan_profitEdit", false);
				Horn.getComp("repayplandetailTable").hideButton("repayplan_profitDel", false);
				Horn.getComp("repayplandetailbutton").setEnable("confirm",true);
			}
			//收益查询
			equity_ivestment_repayplan.formQuery('repayplandetailTable');
		},
		//还款计划收益 type后缀转化
		profittypechange:function(type){
			//字段后缀
			var type2;
			if(type==1){
				type2="_repaydetail_add";
			}else if(type==2){
				type2="_repaydetail_edit";
			}else{
				type2="_"+type+"";
			}
			return type2;
		},
		//收益开始日期， 截止日期变化计算       dateflag参数值0表示开始日期，1表示截止日期
		accountdate:function(type,dateflag){
			var type2=equity_ivestment_repayplan.profittypechange(type);
			var l_end_date=Horn.getCompById("l_end_date"+type2).getValue();
    		var l_begin_date=Horn.getCompById("l_begin_date"+type2).getValue();
    		var beginflag=Datereg.reg_datecal(l_begin_date);
    		var endflag=Datereg.reg_datecal(l_end_date);
			if(dateflag==0){
				if(l_end_date!=null){
					if(l_begin_date!=null&&beginflag&&endflag){
						var days=dataUtil.calculateDays(l_begin_date,l_end_date);
						days=parseInt(days)+1;
						Horn.getCompById("l_days"+type2).setValue(days);
						//触发计算收益方法
						equity_ivestment_repayplan.calculateprofit(type);
					}
				}
			}else{
				if(l_begin_date!=null){
					if(l_end_date!=null&&beginflag&&endflag){
						var days=dataUtil.calculateDays(l_begin_date,l_end_date);
						days=parseInt(days)+1;
						Horn.getCompById("l_days"+type2).setValue(days);
						//触发计算收益方法
						equity_ivestment_repayplan.calculateprofit(type);
					}
				}
			}
		},
		//计算收益
		calculateprofit:function(type){
			var type2=equity_ivestment_repayplan.profittypechange(type);
			//触发计算收益方法
			var en_plan_balance=common_operate.parseNaN(Horn.getCompById("en_plan_balance"+type2).getValue());
			var l_rate_days=common_operate.parseNaN(Horn.getCompById("l_rate_days"+type2).getValue());
			var en_rate=common_operate.parseNaN(Horn.getCompById("en_rate"+type2).getValue());
			var days=common_operate.parseNaN(Horn.getCompById("l_days"+type2).getValue());
			var f=common_operate.parseNaN(0.01);
			// 公式=本金*天数*利率/利率计算周期天数
			var profit=common_operate.parseNaN(en_plan_balance * days * en_rate * f /l_rate_days);
			Horn.getCompById("en_profit"+type2).setValue(profit.toFixed(2));					     	
		},
		// 收益datagrid的load成功之后回调函数
		detaiLoadSuccess : function() {
			var num = 0;
			var en_profit = 0;
			var std1 = "<td><div style=\"TEXT-aLIGN: center; WIDTH: 20px; \"></div></td>";
			var ntd = "<td style=\"display:{XDATAGRID_TD_HIDDEN};\"><div style=\"TEXT-ALIGN:center;WIDTH:100px;word-wrap:break-word;\" class=\"hc-datagrid-cell\"></div></td>";
			var html = "<tr>";
				// 根据完成状态，勾选对应的记录
				$("#body_repayplandetailTable > tr").each(function(index) {
					var $tr = $(this);
					en_profit += common_operate.parseNaN(numUtil.rmoney($tr.find("td:eq(8) > div").text()));
					num++;
				});	
			
			if (num < 1) {
				return;
			}
			var std2 = "<td><div style=\"TEXT-aLIGN: center; WIDTH: 20px; \"></div></td>";
            var std3="<td style=\"display:none;\"><div style=\"TEXT-ALIGN:left;WIDTH:36px;word-wrap:break-word;\" class=\"hc-datagrid-cell\" ></div></td>";
			var ntd2 = "<td style=\"display:{XDATAGRID_TD_HIDDEN};\"><div style=\"TEXT-ALIGN:center;WIDTH:160px;word-wrap:break-word;\" class=\"hc-datagrid-cell\">"
					+ en_profit.toFixed(2) + "</div></td>";
			html += std1 + std2 +std3+std3+ ntd + ntd + ntd + ntd + ntd2+ ntd +   "</tr>";
			$("#body_repayplandetailTable").append(html);
		},
		// 还款计划datagrid的load成功之后回调函数
		repayplanLoadSuccess : function() {
			//是否显示操作按钮判断
			var repayplanButtype=Horn.getCompById("repayplanButtype").getValue();
			if(repayplanButtype=="1"){
				 Horn.getComp('repayplanTable').hideButton("repay_xz",false); 
				 Horn.getComp('repayplanTable').hideButton("repay_xg",false); 
				 Horn.getComp('repayplanTable').hideButton("repay_sc",false); 
				 Horn.getComp('repayplanTable').hideButton("repay_zd",false); 
			}else{
				 Horn.getComp('repayplanTable').hideButton("repay_xz",true); 
				 Horn.getComp('repayplanTable').hideButton("repay_xg",true);
				 Horn.getComp('repayplanTable').hideButton("repay_sc",true);
				 Horn.getComp('repayplanTable').hideButton("repay_zd",true);
			}
		}
		
};

/**
 * 还款方式对象：根据业务类型得到对应的还款方式
 */
var c_repay_type = {
	"gqtz" : "A",
	"xyzmrfk" : "A",
	"srgqsyq" : "A",
	"gqtzsy" : "0",
	"gqsyqsy" : "0",
	"qjzr" : "0",
	"gqfhsg" : "0",
	"jctz" : "A",
	"jctzsy" : "0",
	"wqtz" : "A",
	"wqtzsy" : "0",
	"zqtz" : "A",
	"zqtzsy" : "0",
	"ck" : "A",
	"cksy" : "0",
	"srqtsyq" : "A",
	"qtsyqsy" : "0",
	"wtdkff" : "A",
	"wtdksx" : "0",
	"srxdzc" : "A",
	"xdzcsx" : "0",
	"pjmr" : "A",
	"pjsx" : "0"	
};