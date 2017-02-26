$(function() {
	common_style.disable_style();
	dialog = common_operate.getDialog();
});
var common_stockcodesex = {
	// 执行标识
	flag : "",
	/**
	 * 根据业务标识找到对应的业务类型
	 */
	formObj : {
		"22033" : "gqtz",
		"22035" : "gqtzsy",
		"22036" : "gqfhsg",
		"22101" : "gqhg",
		"22034" : "gqcr",
		"22410" : "jctz",
		"22411" : "jctzsy",
		"22409" : "jchg",
		"22412" : "jccr",
		"22078" : "wqtz",
		"22079" : "wqtzsy",
		"22080" : "wqhg",
		"22069":"zqtz", 
		"22071":"zqtzsy", 
		"22072":"zqhg",
		"22070":"zqcr",
		"22029" : "ck",
		"22031" : "cksy",
		"22030" : "ckhg",
		"22032" : "ckcr",
		"22151" : "zdzf",
		"22150" : "zczr",
        "22052" : "zczc",
			
//		"22151" : "fyzf",
		"22037" : "srgqsyq",
		"22038" : "crgqsyq",
		"22039" : "gqsyqsy",
		"22040" : "gqsyqhg",
		
		"22382": "xyzmrfk",
		"22383":"qjzr",
		"22384": "dqdf",
        
		"22065" : "wtdkff",
		"22067" : "wtdksx",
		"22066" : "wtdkfb",
		"22025" : "srxdzc",
		"22026" : "xdzcfb",
		"22027" : "xdzcsx",
		"22028" : "crxdzc",	
		"22041" : "pjmr",
		"22042" : "pjtx",
		"22043" : "pjsx",
		"22044" : "pjhg",
		"22103" : "pjcr",
		"22045" : "srqtsyq",// 受让其他收益权   
		"22047" : "qtsyqsy",// 其他收益权收益
		"22048" : "qtsyqhg",// 其他收益权回购
		"22046" : "crqtsyq"// 出让其他收益权
	},
	//收益明细：收益计算
	calculateProfit : function(type,c_calc_way,en_occur_invest,en_rate,days,l_period){
		var en_profit = 0;
		if(c_calc_way == "0"){
			en_profit = common_operate.parseNaN(Horn.getCompById("en_profit_" + type).getValue());
		} else if (c_calc_way == "1") {// 公式1，本金*利率/期数
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / l_period);
		} else if(c_calc_way == "2"){// 公式1，本金*利率/360*存续天数/期数					
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / 360 * days /l_period);
		} else if(c_calc_way == "3"){// 公式1，本金*利率/365*存续天数/期数
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / 365 * days /l_period);
		}else if(c_calc_way == "4"){// 公式1，本金*利率/366*存续天数/期数
			en_profit = common_operate.parseNaN(en_occur_invest * en_rate / 366 * days /l_period);
		}					
		Horn.getCompById("en_profit_" + type).setValue(Number(en_profit).toFixed(2));
	},
	// 可用余额计算
	queryEnableBalance : function(formName) {
		var type = $("#htype").val();
			url = "/am/am/business/dictate/getEnabelBalance.json";
			var submitParams = Horn.getComp(formName).getValues();
			query_operate.doPost(url, submitParams, function(result) {
				if (result && result.bean) {
					Horn.getCompById("en_enable_balance_" + type).setValue(
							result.bean.t0_balance);
				} 
//				else {
//					Horn.Tip.warn("查询可用余额失败:" + result.errorMsg);//  + result.errorMsg
//				}
			}, ajaxDataType.JSON);

	},// 是否隐藏产品代码信息块
	checkCpdmDiv : function(){
//		    Horn.getComp("vc_project_code").setDisabled(true);
//			Horn.getComp("vc_project_type").setDisabled(true);
//			Horn.getComp("c_project_properties").setDisabled(true);
//			Horn.getComp("vc_project_manager").setDisabled(true);
//			Horn.getComp("en_project_money").setDisabled(true);
//			Horn.getComp("vc_project_code").hide();
//			Horn.getComp("vc_project_type").hide();
//			Horn.getComp("c_project_properties").hide();
//			Horn.getComp("vc_project_manager").hide();
//			Horn.getComp("en_project_money").hide();
			Horn.getComp("vc_product_id").setDisabled(false);
			Horn.getComp("l_product_begin_date").setDisabled(false);
			Horn.getComp("l_product_end_date").setDisabled(false);
			//Horn.getComp("vc_trust_manager").setDisabled(false);
	},
	//*****************************节息日调整********************
	// 节息日调整-修改
	doAdjustView : function() {
		var grid = Horn.getComp("adjustTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		Horn.getComp("adjustUForm").setValues(grid[0]);
		Horn.getComp("adjustUWin").show();

		var grid1 = Horn.getComp("dataTable").getSelecteds();
		var obj = {};
		obj.code = grid1[0].vc_stock_code;
		obj.text = grid1[0].vc_stock_name;
		Horn.getCompById("vc_stock_code_jxrtz").addItems([ obj ], true);
		Horn.getCompById("vc_stock_code_jxrtz").selectFirst();
	},// 节息日调整-修改确认
	doAdjustAdd : function() {
		var values = Horn.getComp("adjustUForm").getValues();
		$("#body_adjustTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				$tr.find("td:eq(5) > div").text(values.l_first_pay_date);
				$tr.find("td:eq(6) > div").text(values.l_next_begin_date);
				$tr.find("td:eq(7) > div").text(values.l_next_end_date);
				$tr.find("td:eq(8) > div").text(values.l_next_pay_date);
			}
		});
		Horn.getComp("adjustUWin").hide();
	},// 节息日调整-提交
	doAdjustCommit : function(type) {
		var grid = Horn.getComp("adjustTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		
		var url = "/am/am/sellerbusiness/stockcodesex/" + type + "/adjust_commit.json?l_function_no="
				+ functionIds.stockcodesex.dictate
				+ "&workflow_step="
				+ workflowStep.launch + "&business_type=jxrtz";
		TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			var submitParams = {};
			$("#body_adjustTable > tr").each(
					function() {
						var $tr = $(this);
						submitParams.vc_stock_code = $tr.find("td:eq(2) > div")
								.text();
						submitParams.l_rate_id = $tr.find("td:eq(3) > div")
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
			query_operate.doPost(url, submitParams, function(result) {
				common_operate.endProgress();
				if (result == constants.ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示", "操作成功！", function() {
						Horn.getComp("adjustWin").hide();
					});
				} 
//				else {
//					Horn.Tip.warn(result);
//				}
			});
		}, function() {
		});
	},
	// 节息日调整-查询
	adjustQuery : function() {
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	var grid = Horn.getComp("dataTable").getSelecteds();
	        		if (grid.length !== 1) {
	        			Horn.Tip.warn("请选择一条记录！");
	        			return;
	        		}
	        		var obj = grid[0];
	        		// 只查利率类别为1的数据
	        		obj.c_rate_kind = 1;
	        		Horn.getCompById("adjustTable").setBaseParams(obj);
	        		Horn.getCompById("adjustTable").load();
	        		delete obj.c_rate_kind;
	        		Horn.getComp("adjustWin").show();
	            } 
			}
       }, "json");
	},
	//*****************************合同展期、五级分类变更、结清、不良资产核销********************
	// 合同展期、五级分类、结清-展示
	doViewWin : function(type,vc_project_type) {		
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	var grid = common_operate.checkSelectedLength();
	        		if (!grid) {
	        			return grid;
	        		}
	        		//判断是否为项目绑定，是
	        		if(type=="xmbd"){
	        			//表单重置
	        			common_reg.Formreset(type + "Form");
	        			Horn.getCompById("vc_stock_code_"+type).setValue(grid[0].vc_stock_code);
	        			Horn.getCompById("vc_select_status_"+type).setValue(vc_project_type);
	        			stockcodesex2.queryxmdm(type);
	        			Horn.getComp(type + "Win").show();
	        		}else{
		        		var url = "/am/am/business/stockcodesex/doView.json";
		        		var data = "l_function_no=" +functionIds["stockcodesex"]["view"]
		        				+ "&vc_stock_code=" + grid[0].vc_stock_code + "&vc_product_id="
		        				+ grid[0].vc_product_id + "&business_type=" + type;
		        		$.post(url, data, function(result) {
		        			if (result && result.stockcodesex) {
		        				Horn.getComp(type + "Form").setValues(result.stockcodesex);
		        				//日期控件默认值为0去除
		        		    	common_reg.formremdefzero(type + "Form");
		        				Horn.getComp(type + "Win").show();
		        				//查询对手方
		        				common_stockcodesex.queryL_rival_id(type,result.stockcodesex.l_rival_id);
		        				common_stockcodesex.doAfterViewWin(type);
		        			} else {
		        				Horn.Tip.warn("操作失败！");
		        			}
		        		}, "json");
	        		}
	            } 
			}
       }, "json");
	},
	// 弹出窗口之后的处理函数
	doAfterViewWin : function(type) {
		switch (type) {
		case "htzq":
			Horn.getCompById("l_end_date_htzq").setValue("");
			break;
		default:
		}
		common_reg.Formremoverr(type + "Form");
	},// 合同展期、五级分类、合同结清-更新
	doEditForm : function(type,urlType) {
		var form = Horn.getComp(type + "Form");

		var url = "/am/am/sellerbusiness/stockcodesex/" + type + urlType + "/operation.json?l_function_no="
				+ functionIds.stockcodesex.dictate + "&workflow_step="
				+ workflowStep.launch + "&business_type=" + type;
		if (form.isValid()) {
			TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				var submitParams = form.getValues();
				query_operate.doPost(url, submitParams, function(result) {
					common_operate.endProgress();
					if (result == constants.ajaxCallBackCode.OK) {
						TDialog.Msg.alert("提示", "操作成功！", function() {
							Horn.getComp(type + "Win").hide();
						});
					} else {
						TDialog.Msg.warning("提示", result);
					}
				});
			}, function() {
			});
		}
	},
	// ****************************利率变更*******************************************
	// 利率变更-查询窗口
	rateQuery : function() {
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	var grid = Horn.getComp("dataTable").getSelecteds();
	        		if (grid.length !== 1) {
	        			Horn.Tip.warn("请选择一条记录！");
	        			return;
	        		}
	        		Horn.getCompById("rateTable").setBaseParams(grid[0]);
	        		Horn.getCompById("rateTable").load();
	        		Horn.getComp("rateWin").show();
	        		//复位滚动条
	        		$("#rateWin div:eq(1)").scrollTop(0);
	            } 
			}
       }, "json");
	},
	// 利率删除的行单击函数
	rowClick : function(rowdata) {
		// // 绑定单击事件
		$("#body_rateTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			
			if(!$tr.hasClass("u-table-selected")){
				radio.removeAttr("checked");
			}					
			if (radio.is(":checked")) {
				var c_rate_status = $tr.find("td:eq(2) > div").text();
				if (c_rate_status == "3") {
					Horn.getComp("rateTable").hideButton("lvbg_xg", true);
					Horn.getComp("rateTable").hideButton("lvbg_sc", true);
				} else {
					Horn.getComp("rateTable").hideButton("lvbg_xg", false);
					Horn.getComp("rateTable").hideButton("lvbg_sc", false);
				}
			}
			
		});
	},
	// 利率变更-新增窗口
	showStockrate : function(committype) {
		Horn.getComp("addRateForm").reset();
		var show_type="";
		var url2;
		if(committype=="htadd"){
			var vc_stock_code=Horn.getCompById("vc_stock_code").getValue();
			Horn.getCompById("vc_stock_code_lvbg").setValue(vc_stock_code);
			show_type=Horn.getCompById("vc_project_typequery").getValue();
			//处理用于金融产品投资的类型判断
			if(show_type=="1"||show_type=="3"||show_type=="5"||show_type=="9"||show_type=="a"||show_type=="6"||show_type=="H"){
				show_type="F";
			}
			var l_begin_date=Horn.getCompById("l_begin_date").getValue();
			Horn.getCompById("l_rate_begin_date_lvbg").setValue(l_begin_date);
			url2="/am/am/business/financialinvest/manageinfo.json?vc_stock_code="+vc_stock_code;
		}else{
			var grid = Horn.getComp("dataTable").getSelecteds();
			Horn.getCompById("vc_stock_code_lvbg").setValue(grid[0].vc_stock_code);
			if(grid[0].c_business_type=="4"||grid[0].c_business_type=="存款"){
				show_type="4";
			}else if(grid[0].c_business_type=="F"||grid[0].c_business_type=="金融产品投资"){
				show_type="F";
			}
			url2="/am/am/business/financialinvest/manageinfo.json?vc_stock_code="+grid[0].vc_stock_code;
//			Horn.getCompById("l_rate_begin_date_lvbg").setValue(grid[0].l_begin_date);
			if(committype !="htadd"){
				var grid = Horn.getComp("dataTable").getSelecteds();
				var url = "/am/am/business/getSpecityObject.json", data = "vc_input_name1="
					+ "vc_stock_code"
					+ "&vc_input_value1="
					+ grid[0].vc_stock_code
					+ "&vc_input_table=stockcodesex";
				query_operate.ajax(url, data, function(result) {
					if (result instanceof Object && result.query) {
						Horn.getCompById("l_rate_begin_date_lvbg").setValue(result.query.l_begin_date);
					}
				}, constants.ajaxDataType.JSON);
			}
		}
		Horn.getCompById("hxh_lvbg").setValue(0);
		Horn.getCompById("lvbgType").setValue("0");
		Horn.getCompById("c_rate_kind_lvbg").setReadonly(false);
		Horn.getCompById("hsection").setValue("");
		Horn.getComp("addRateWin").show();
		var tr_length = $("#body_rateTable > tr").length;
		var rateTable_height = $("#data_rateTable").height();
		if (tr_length == 1) {
			var tr_no_data = $("#body_rateTable > tr > td > p").text();
			if (tr_no_data == "暂时无数据") {
				$("#data_rateTable").height(rateTable_height + 30);
			}
		}
		stockcodesex2.lvzl();
		stockcodesex2.lvlb();
		stockcodesex2.tzfs();
		stockcodesex2.fdsf();
		stockcodesex2.jszq();
		//存款利率进行特殊处理，只能添加溢价利率
		if(show_type=="4"){
			stockcodesex2.getListData(show_type);
			stockcodesex2.getRatetypeList(show_type);
		}else if(show_type=="F"){
			//金融产品投资利率新增默认值为该合同选择的标的物值
			$.ajax({
				type : "post",
				url : url2,
				data : "",
				async : false,
				dataType : ajaxDataType.JSON,
				success : function(result) {
					if(result.l_first_pay_date!=0&&result.en_pay_inteval!='0'&&result.en_rate!=0){
			            Horn.getCompById("c_calc_cycle_lvbg").setValue(result.c_calc_cycle); 
			            Horn.getCompById("en_rate_lvbg").setValue(result.en_rate); 
			            Horn.getCompById("en_pay_inteval_lvbg").setValue(result.en_pay_inteval); 
			            Horn.getCompById("l_first_pay_date_lvbg").setValue(result.l_first_pay_date); 
					}			
				}
			});
			stockcodesex2.getListData();
		}else{
			stockcodesex2.getListData();
		}
		common_reg.Formremoverr("addRateForm");
	},
	// 利率变更-修改
	showEditTemp : function(committype) {
		var  vc_stock_code; 
		var show_type="";
		if(committype=="htadd"){
			vc_stock_code=Horn.getCompById("vc_stock_code").getValue();
			show_type=Horn.getCompById("vc_project_typequery").getValue();
		}else{
			var grid = Horn.getComp("dataTable").getSelecteds();
			vc_stock_code=grid[0].vc_stock_code;
			if(grid[0].c_business_type=="4"||grid[0].c_business_type=="存款"){
				show_type="4";
			}
		}
		Horn.getCompById("vc_stock_code_lvbg").setValue(vc_stock_code);
		Horn.getCompById("lvbgType").setValue("2");
		var form = Horn.getComp("addRateForm");

		var num = 0;
		var obj = {};
		$("#body_rateTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				num++;
				obj.c_rate_status = $tr.find("td:eq(2) > div").text();
				obj.vc_organization_code = $tr.find("td:eq(3) > div").text();
				obj.vc_stock_code = vc_stock_code;
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
				common_operate.trimObj(obj);

				xh = $tr.find("td:eq(0) > div").text();
				Horn.getCompById("hxh_lvbg").setValue(xh);
				Horn.getCompById("hsection").setValue(obj.vc_sections);
			}
		});

		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		// form.setValues(grid[0]);
		// 手动取grid列里面的值塞入form里面
		form.setValues(obj);
		// 处理利率分段
		if ($.trim(obj.vc_sections) != "") {
			Horn.getCompById("vc_sections_lvbg").setValue("已维护");
		}

		Horn.getComp("addRateWin").show();
		// stockcodesex2.getListData();
		Horn.getCompById("c_rate_kind_lvbg").setReadonly(true);

		stockcodesex2.lvzl();
		stockcodesex2.lvlb();
		stockcodesex2.tzfs();
		stockcodesex2.fdsf();
		//存款利率进行特殊处理，只能添加溢价利率
		if(show_type=="4"){
			stockcodesex2.getRatetypeList(show_type);	
		}
	},
	// 利率变更-删除
	doDelTemp : function() {
		var num = 0;
		var obj = {};
		$("#body_rateTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				num++;
				obj.xh = $tr.find("td:eq(0) > div").text();
				obj.c_rate_status = $tr.find("td:eq(2) > div").text();
			}
		});
		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		} else {
			TDialog.Msg.confirmyorn("确认", "请您确认是否删除？", function() {
				// 如果是0新增的，这时没有存在数据库，删除时，直接从页面删除
//				if (obj.c_rate_status == "0") {
//					$("tr[id=tr_rateTable_" + obj.xh + "]").remove();
//				} else if (obj.c_rate_status == "1") {
					// (如果是1正常的，这时存在数据库，删除时，状态置为3作废)
					// 新增或正常的数据，做删除，统一改成状态3作废
					var $tr = $("tr[id=tr_rateTable_" + obj.xh + "]");
					$tr.css("background", "gray");
					$tr.find("td:eq(32) > div").text(
							constants.c_rate_status["3"]);
					$tr.find("td:eq(2) > div").text("3");
					$tr.find("td:eq(1) > div > input").removeAttr("checked");
//				}
			}, function() {
			});
		}
	},// 利率变更-确认
	doRateCommit : function(type,committype) {
		var vc_stock_code;
		if(committype!=null&&committype!=''){
			vc_stock_code=Horn.getCompById("vc_stock_code").getValue();
			if(vc_stock_code==""){
				TDialog.Msg.alert("提示", "请先完成投资明细新增操作", function() {
					return;
				});
				return;
			}
		}else{
			var grid = Horn.getComp("dataTable").getSelecteds();
			vc_stock_code=grid[0].vc_stock_code;
		}
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
					obj.vc_organization_code = $tr.find("td:eq(3) > div")
							.text();
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
		dialog.dialog("open");
		var url = "/am/am/sellerbusiness/stockcodesex/" + type + "/rate_commit.json?l_function_no="
				+ functionIds.stockcodesex.add + "&business_type=lvbg";
		var data = "vc_fields=" + arr_fileds.join("]") + "&vc_values="
				+ arr_values.join("]") + "&vc_stock_code=" + vc_stock_code;
		query_operate.doPost(url, data, function(result) {
			common_operate.endProgress();
			if (result == constants.ajaxCallBackCode.OK) {
				if(committype!=null&&committype!=''){
					TDialog.Msg.alert("提示", "操作成功！", function() {
						common_operate.refreshUrl(committype);
						window.parent.parent.Horn.Frame.screen.closeCurrent();
					});
				}else{
					TDialog.Msg.alert("提示", "操作成功！", function() {
						Horn.getComp("rateWin").hide();
					});
				}
			} 
//			else {
//				Horn.Tip.warn(result);
//			}
		});
	},
	// 利率变更-新增、修改
	doAddTemp : function() {
		var lvbgType = $("#lvbgType").val();
		var form = Horn.getComp("addRateForm");
		if (form.isValid()) {

			var tr_length = $("#body_rateTable > tr").length;
			var values = form.getValues();
			// 处理对象里面的"undefined"或undefined
			common_operate.getNotNullObj(values);
			var rateTable_height = $("#data_rateTable").height();
			var xh = $("#hxh_lvbg").val();

			c_rate_status = $("tr[id=tr_rateTable_" + xh + "]").find(
					"td:eq(2) > div").text();
			if ($.trim(c_rate_status) == "") {// 新增
				c_rate_status = "0";
			} else if ($.trim(c_rate_status) == "1") {// 修改
				c_rate_status = "2";
			}

			// 处理没有数据时，datagrid的提示
			if (tr_length == 1) {
				var tr_no_data = $("#body_rateTable > tr > td > p").text();
				if (tr_no_data == "暂时无数据") {
					$("#body_rateTable").empty();
					xh = 1;
				}

			}

			if (lvbgType == "0") {// 新增时
				if (xh != 1) {
					xh = $("#body_rateTable > tr:last").find("td:eq(0) > div")
							.text();
					xh++;
				}
				// xh = tr_length + 1;
				$("#data_rateTable").height(rateTable_height + 30);
			} else if (lvbgType == "2") {// 修改时，先移除节点，后面再添加
				xh = $("#hxh_lvbg").val();
				$("tr[id=tr_rateTable_" + xh + "]").remove();
				// $("#data_rateTable").height(rateTable_height - 30);
			}
			var html = "<tr id='tr_rateTable_" + (xh)
					+ "' style='HEIGHT:22px'>";
			// 利率类别
			var c_rate_kind_str = Horn.getCompById("c_rate_kind_lvbg").tempCheckedValue;
			var c_rate_type_str = Horn.getCompById("c_rate_type_lvbg").tempCheckedValue;
			var c_calc_type_str = Horn.getCompById("c_calc_type_lvbg").tempCheckedValue;
			// 机构编号
			var vc_organization_code = Horn.getCompById("vc_organization_code")
					.getValue();
			//结算方式
			var c_calc_cycle_str = Horn.getCompById("c_calc_cycle_lvbg").tempCheckedValue; 
			//结算周期
			var en_pay_inteval_str;
			if(Horn.getCompById("en_pay_inteval_lvbg").getValue()==''||Horn.getCompById("en_pay_inteval_lvbg").getValue()==null){
				en_pay_inteval_str ='';
			}else{
				 en_pay_inteval_str = Horn.getCompById("en_pay_inteval_lvbg").tempCheckedValue;
			}
			
			var ltd = "<td style='display:{XDATAGRID_TD_HIDDEN};'><div style='TEXT-ALIGN:center;WIDTH:100px;word-wrap:break-word;' class='hc-datagrid-cell'>";
			var htd = "<td style='display:none;'><div style='TEXT-ALIGN:left;WIDTH:48px;word-wrap:break-word;' class='hc-datagrid-cell' title=''>";
			var rtd = "</div></td>";

			// 拼接序号及单选按钮
			html += "<td><div style='TEXT-aLIGN: center; WIDTH: 20px; '>"
					+ (xh) + "</div></td>";
			html += "<td><div class='hc-datagrid-cell-check' style='TEXT-aLIGN: left' title=''><input type='radio' id='cb_rateTable_"
					+ (xh) + "'></div></td>";
			// 拼接隐藏域
			html += htd + c_rate_status + rtd;
			html += htd + vc_organization_code + rtd;
			html += htd + values.vc_stock_code + rtd;
			html += htd + values.c_rate_type + rtd;// 利率类型
			html += htd + values.c_currency_kind + rtd;
			html += htd + values.c_base_kind + rtd;
			html += htd + values.c_float_kind + rtd;
			html += htd + values.c_change_kind + rtd;
			html += htd + values.l_change_date + rtd;
			html += htd + values.c_calc_kind + rtd;
			html += htd + values.l_begin_date + rtd;
			html += htd + values.l_end_date + rtd;
			html += htd + values.en_begin_scale + rtd;
			html += htd + values.en_end_scale + rtd;
			html += htd + values.c_deal_flag + rtd;// 利率调整方式
			html += htd + values.en_high_rate + rtd;
			html += htd + values.en_low_rate + rtd;
			html += htd + values.l_begin_days + rtd;
			html += htd + values.l_end_days + rtd;
			html += htd + values.l_rate_begin_date + rtd;//开始日期
			html += htd + values.l_first_pay_date + rtd;			
			html += htd + values.c_settle_kind + rtd;
			// 处理利率分段
			var vc_sections = Horn.getCompById("hsection").getValue();
			html += htd + vc_sections + rtd;
			html += htd + values.vc_remark + rtd;
			html += htd + values.en_rate2 + rtd;
			html += htd + values.c_rate_kind + rtd;
			html += htd + values.c_calc_type + rtd;// 计息种类
			html += htd + values.l_rate_id + rtd;// 利率编号
			
			html += htd + values.c_calc_cycle + rtd;// 计息方式
			html += htd + values.en_pay_inteval + rtd;// 结算周期

			html += ltd + constants.c_rate_status[lvbgType] + "</td>";
			html += ltd
					+ c_rate_kind_str
							.substring(c_rate_kind_str.indexOf(":") + 1)
					+ "</td>";
			html += ltd + values.vc_rate_alias + "</td>";
			html += ltd
					+ c_rate_type_str
							.substring(c_rate_type_str.indexOf(":") + 1)
					+ "</td>";
			if (values.en_rate == undefined) {
				values.en_rate = "";
			}
			html += ltd + Number(values.en_rate).toFixed(5) + "</td>";
			html += ltd
					+ c_calc_type_str
							.substring(c_calc_type_str.indexOf(":") + 1)
					+ "</td>";
			html += ltd + c_calc_cycle_str.substring(c_calc_cycle_str.indexOf(":")+1)+ "</td>";
			html += ltd + en_pay_inteval_str.substring(en_pay_inteval_str.indexOf(":")+1)+ "</td>";

			html += "</tr>";
			// $("#body_rateTable").append(html);
			// 修改第一个节点
			// $("tr[id=tr_rateTable_" + (xh+1) + "]").before(html);
			if (xh == 1) {
				$("#body_rateTable").prepend(html);
			} else {
				$("tr[id=tr_rateTable_" + (xh - 1) + "]").after(html);
			}

			// 绑定单击等事件
			$("tr[id=tr_rateTable_" + (xh) + "]").click(
					function() {					
						if($(this).hasClass("u-table-selected")){
							$("input[id=cb_rateTable_" + (xh) + "]").removeAttr("checked");
							$(this).removeClass("u-table-selected");
						} else {
							$(this).addClass("u-table-selected");
							$(this).siblings().removeAttr("checked");
							$(this).siblings().removeClass(
									"u-table-selected");
							$("input[id=cb_rateTable_" + (xh) + "]").attr(
									"checked", "checked");
						}
						common_stockcodesex.rowClick(values);
					});
			
			$("tr[id=tr_rateTable_" + (xh) + "]").mouseover(function() {
				$(this).addClass("hc-datagrid-row-over");
				$(this).siblings().removeClass("hc-datagrid-row-over");
			});

			$("tr[id=tr_rateTable_" + (xh) + "]").mouseout(function() {
				$(this).removeClass("hc-datagrid-row-over");
			});
			Horn.getComp("addRateWin").hide();
		}

	},
	// 弹出利率分段查询grid窗口
	showVcSection : function() {
		var vc_sections = Horn.getCompById("hsection").getValue();
		var arr = [];
		if ($.trim(vc_sections) != "") {
			var vs = vc_sections.split("B");
			for ( var i = 0, j = vs.length; i < j; i++) {
				var obj = {};
				var columns = vs[i].split("A");
				obj.l_begin_date_fdlv = columns[0];
				obj.l_end_date_fdlv = columns[1];
				obj.en_rate_fdlv = Number(columns[2] * 100).toFixed(5);
				arr.push(obj);
			}
		}

		var data = {
			"total" : arr.length,
			"rows" : arr
		};
		Horn.getCompById("lvsectionTable").loadData(data);
		Horn.getComp("lvSectionWin").show();
	},// 利率分段-新增窗口
	showSectionAdd : function() {
		Horn.getComp("addLvSectionWin").show();
		Horn.getCompById("lvfdlvType").setValue("0");
		Horn.getComp("addLvSectionForm").reset();
		common_reg.Formremoverr("addLvSectionForm");
	},// 利率分段-修改窗口
	showSectionEdit : function() {
		Horn.getCompById("lvfdlvType").setValue("2");
		var form = Horn.getComp("addLvSectionForm");
		var num = 0;
		var obj = {};
		$("#body_lvsectionTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				num++;
				obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
				obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
				obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
				xh = $tr.find("td:eq(0) > div").text();
				Horn.getCompById("hxh_lvfdlv").setValue(xh);
			}
		});

		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		// 手动取grid列里面的值塞入form里面
		form.setValues(obj);
		Horn.getComp("addLvSectionWin").show();
	},// 利率分段-删除
	doSectionDel : function() {
		var num = 0;
		var obj = {};
		$("#body_lvsectionTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				num++;
				obj.xh = $tr.find("td:eq(0) > div").text();
			}
		});
		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		} else {
			TDialog.Msg.confirmyorn("确认", "请您确认是否删除？", function() {
				// 直接从页面删除
				$("tr[id=tr_lvsectionTable_" + obj.xh + "]").remove();
			}, function() {
			});
		}
	},// 利率分段-添加、修改
	doSectionAdd : function() {
		var lvfdlvType = $("#lvfdlvType").val();
		var form = Horn.getComp("addLvSectionForm");
		if (form.isValid()) {
			var tr_length = $("#body_lvsectionTable > tr").length;
			var values = form.getValues();
			var sectionTable_height = $("#data_lvsectionTable").height();
			var xh = 0;

			// 处理没有数据时，datagrid的提示
			if (tr_length == 1) {
				var tr_no_data = $("#body_lvsectionTable > tr > td > p").text();
				if (tr_no_data == "暂时无数据") {
					$("#body_lvsectionTable").empty();
					xh = 1;
				}
			}
			
			
			//********************************test
			//检验分段区间不能重复
			var unSelectArr = [];
			$("#body_lvsectionTable > tr").each(function() {
				var obj = {};
				var $tr = $(this);
				var radio = $tr.find("td:eq(1) > div > input");
				if(radio.is(":checked")){
					return true;
				}
				obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
				obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
				obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
				// 处理对象里面的"undefined"或undefined
				common_operate.getNotNullObj(obj);
				unSelectArr.push(obj);
			});
			var fd_flag = false;
			//检验利率分段区间
			for(var i=0,j=unSelectArr.length;i<j;i++){
				if(values.l_begin_date_fdlv == unSelectArr[i].l_begin_date_fdlv){
					TDialog.Msg.warning("提示","利率分段区间不可重叠，请重新维护！");
					fd_flag = true;
					break;
				}
			}
			if(fd_flag){
				return;
			}
			//********************************test

			if (lvfdlvType == "0") {// 新增时
				if (xh != 1) {
					xh = $("#body_lvsectionTable > tr:last").find(
							"td:eq(0) > div").text();
					xh++;
				}
				$("#body_lvsectionTable").height(sectionTable_height + 30);
			} else if (lvfdlvType == "2") {// 修改时，先移除节点，后面再添加
				xh = $("#lvfdlvType").val();
				$("tr[id=tr_lvsectionTable_" + xh + "]").remove();
			}		
			
			var html = "<tr id='tr_lvsectionTable_" + (xh)
					+ "' style='HEIGHT:22px'>";
			var ltd = "<td style='display:{XDATAGRID_TD_HIDDEN};'><div style='TEXT-ALIGN:center;WIDTH:100px;word-wrap:break-word;' class='hc-datagrid-cell'>";

			// 拼接序号及单选按钮
			html += "<td><div style='TEXT-aLIGN: center; WIDTH: 20px; '>"
					+ (xh) + "</div></td>";
			html += "<td><div class='hc-datagrid-cell-check' style='TEXT-aLIGN: left' title=''><input type='radio' id='cb_sectionTable_"
					+ (xh) + "'></div></td>";

			html += ltd + values.l_begin_date_fdlv + "</td>";
			html += ltd + "</td>";
			html += ltd + values.en_rate_fdlv + "</td>";

			html += "</tr>";
			if (xh == 1) {
				$("#body_lvsectionTable").prepend(html);
			} else {
				$("tr[id=tr_lvsectionTable_" + (xh - 1) + "]").after(html);
			}

			// 绑定单击事件
			$("tr[id=tr_lvsectionTable_" + (xh) + "]").toggle(
					function() {
						$(this).addClass("u-table-selected");
						$(this).siblings().removeAttr("checked");
						$(this).siblings().removeClass(
								"u-table-selected");
						$("input[id=cb_lvsectionTable_" + (xh) + "]").attr(
								"checked", "checked");
					},
					function() {
						$("input[id=cb_lvsectionTable_" + (xh) + "]").removeAttr(
								"checked");
						$(this).removeClass("u-table-selected");
					});

			$("tr[id=tr_lvsectionTable_" + (xh) + "]").mouseover(function() {
				$(this).addClass("hc-datagrid-row-over");
				$(this).siblings().removeClass("hc-datagrid-row-over");
			});

			$("tr[id=tr_lvsectionTable_" + (xh) + "]").mouseout(function() {
				$(this).removeClass("hc-datagrid-row-over");
			});

			// 循环遍历分段datagrid，取出所有记录,对日期进行排序
			var arr = [];
			$("#body_lvsectionTable > tr").each(function() {
				var obj = {};
				var $tr = $(this);
				obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
				obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
				obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
				// 处理对象里面的"undefined"或undefined
				common_operate.getNotNullObj(obj);
				arr.push(obj);
			});
			// 对日期进行升序排序，并处理结束日期
			arr = arr.sort(function(a, b) {
				return a.l_begin_date_fdlv - b.l_begin_date_fdlv;
			});
			for ( var i = 0, j = arr.length - 1; i < j; i++) {
				arr[i].l_end_date_fdlv = dataUtil.addDate(
						arr[i + 1].l_begin_date_fdlv, -1);
			}
			var data = {
				"total" : arr.length,
				"rows" : arr
			};
			Horn.getCompById("lvsectionTable").loadData(data);
			Horn.getComp("addLvSectionWin").hide();

		}
	},// 利率分段-提交
	doSectionCommit : function() {
		var arrStr = [];
		var obj = {};
		// 循环遍历datagrid，取出所有记录
		$("#body_lvsectionTable > tr").each(
				function() {
					var $tr = $(this);
					obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
					obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
					obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
					// 处理对象里面的"undefined"或undefined
					common_operate.getNotNullObj(obj);
					arrStr.push(obj.l_begin_date_fdlv + "A"
							+ obj.l_end_date_fdlv + "A" + Number(obj.en_rate_fdlv / 100).toFixed(5));
				});
		Horn.getCompById("hsection").setValue(arrStr.join("B"));
		if ($.trim(arrStr.join("B")) != "") {
			Horn.getCompById("vc_sections_lvbg").setValue("已维护");
		} else {
			Horn.getCompById("vc_sections_lvbg").setValue(
					$.trim(arrStr.join("B")));
		}
		Horn.getComp("lvSectionWin").hide();

	},
	// ****************************费率变更,主动支付*******************************************
	fareRateQuery : function(type){
		$.post("/am/am/init/list.json", null, function(data) {
		if (data!=null) {					
	       if(data.l_operate_flag==0){	        		
		        TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
		        });	       
	       }else{
	            var grid = common_operate.checkSelectedLength();
	            if (!grid) {
	            	return grid;
	            }
	            
	            var show_type=Horn.getCompById("show_type").getValue(),
            		titbefore = constants.stockcode.preTitle[show_type],
            		tabid = constants.stockcode.ft_menu_id[show_type];
	            
	            var title = titbefore + "-费率设置";
	            url = "/am/am/sellerbusiness/stockcodesex/fareRate.htm?vc_stock_code="+ grid[0].vc_stock_code
	            + "&l_begin_date=" + grid[0].l_begin_date + "&htype=" + type;
	            
	            
	            var iframelength=$("iframe[tabid=" + tabid + "]", parent.parent.document).length;
	    		if(iframelength!=0){
	    			TDialog.Msg.warning("提示",title + "已打开,请先关闭!",function(){//ok 
	    				window.parent.parent.Horn.Frame.openMenu(tabid, url, title + "-明细信息", 'inbox');
	    			}); 
	    		} else {
	    			window.parent.parent.Horn.Frame.openMenu(tabid, url, title, 'inbox');
	    		}
	       }
			} 
		}, "json");
	},
	// 弹出费率分段查询grid窗口
	showFareVcSection : function() {
		var vc_sections = Horn.getCompById("vc_sections_flbg").getValue();
		var arr = [];
		if ($.trim(vc_sections) != "") {
			var vs = vc_sections.split("B");
			for ( var i = 0, j = vs.length; i < j; i++) {
				var obj = {};
				var columns = vs[i].split("A");
				obj.l_begin_date_fdlv = columns[0];
				obj.l_end_date_fdlv = columns[1];
				obj.en_rate_fdlv = (columns[2] * 100).toFixed(5);
				arr.push(obj);
			}
		}

		var data = {
			"total" : arr.length,
			"rows" : arr
		};
		Horn.getCompById("sectionTable").loadData(data);
		Horn.getComp("sectionWin").show();

	},// 费率分段-新增窗口
	showFareSectionAdd : function() {
		Horn.getComp("addSectionWin").show();
		Horn.getCompById("fdlvType").setValue("0");
		Horn.getComp("addSectionForm").reset();
	},// 费率分段-修改窗口
	showFareSectionEdit : function() {
		Horn.getCompById("fdlvType").setValue("2");
		var form = Horn.getComp("addSectionForm");
		var num = 0;
		var obj = {};
		$("#body_sectionTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				num++;
				obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
				obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
				obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
				xh = $tr.find("td:eq(0) > div").text();
				Horn.getCompById("hxh_fdlv").setValue(xh);
			}
		});

		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		// 手动取grid列里面的值塞入form里面
		form.setValues(obj);
		Horn.getComp("addSectionWin").show();
	},// 费率分段-删除
	delFareSection : function() {
		var num = 0;
		var obj = {};
		$("#body_sectionTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				num++;
				obj.xh = $tr.find("td:eq(0) > div").text();
			}
		});
		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		} else {
			TDialog.Msg.confirmyorn("确认", "请您确认是否删除？", function() {
				// 直接从页面删除
				$("tr[id=tr_sectionTable_" + obj.xh + "]").remove();
			}, function() {
			});
		}
	},// 费率分段-添加、修改
	doFareSectionAdd : function() {
		var fdlvType = $("#fdlvType").val();
		var form = Horn.getComp("addSectionForm");
		if (form.isValid()) {
			var tr_length = $("#body_sectionTable > tr").length;
			var values = form.getValues();
			var sectionTable_height = $("#data_sectionTable").height();
			var xh = 0;

			// 处理没有数据时，datagrid的提示
			if (tr_length == 1) {
				var tr_no_data = $("#body_sectionTable > tr > td > p").text();
				if (tr_no_data == "暂时无数据") {
					$("#body_sectionTable").empty();
					xh = 1;
				}
			}

			if (fdlvType == "0") {// 新增时
				if (xh != 1) {
					xh = $("#body_sectionTable > tr:last").find(
							"td:eq(0) > div").text();
					xh++;
				}
				$("#data_sectionTable").height(sectionTable_height + 30);
			} else if (fdlvType == "2") {// 修改时，先移除节点，后面再添加
				xh = $("#hxh_fdlv").val();
				$("tr[id=tr_sectionTable_" + xh + "]").remove();
			}
			var html = "<tr id='tr_sectionTable_" + (xh)
					+ "' style='HEIGHT:22px'>";
			var ltd = "<td style='display:{XDATAGRID_TD_HIDDEN};'><div style='TEXT-ALIGN:center;WIDTH:100px;word-wrap:break-word;' class='hc-datagrid-cell'>";

			// 拼接序号及单选按钮
			html += "<td><div style='TEXT-aLIGN: center; WIDTH: 20px; '>"
					+ (xh) + "</div></td>";
			html += "<td><div class='hc-datagrid-cell-check' style='TEXT-aLIGN: left' title=''><input type='radio' id='cb_sectionTable_"
					+ (xh) + "'></div></td>";

			html += ltd + values.l_begin_date_fdlv + "</td>";
			html += ltd + "</td>";
			html += ltd + values.en_rate_fdlv + "</td>";

			html += "</tr>";
			if (xh == 1) {
				$("#body_sectionTable").prepend(html);
			} else {
				$("tr[id=tr_sectionTable_" + (xh - 1) + "]").after(html);
			}

			// 绑定单击事件
			$("tr[id=tr_sectionTable_" + (xh) + "]").toggle(
					function() {
						$(this).addClass("u-table-selected");
						$(this).siblings().removeAttr("checked");
						$(this).siblings().removeClass(
								"u-table-selected");
						$("input[id=cb_sectionTable_" + (xh) + "]").attr(
								"checked", "checked");
					},
					function() {
						$("input[id=cb_sectionTable_" + (xh) + "]").removeAttr(
								"checked");
						$(this).removeClass("u-table-selected");
					});

			$("tr[id=tr_sectionTable_" + (xh) + "]").mouseover(function() {
				$(this).addClass("hc-datagrid-row-over");
				$(this).siblings().removeClass("hc-datagrid-row-over");
			});

			$("tr[id=tr_sectionTable_" + (xh) + "]").mouseout(function() {
				$(this).removeClass("hc-datagrid-row-over");
			});

			// 循环遍历分段datagrid，取出所有记录,对日期进行排序
			var arr = [];
			$("#body_sectionTable > tr").each(function() {
				var obj = {};
				var $tr = $(this);
				obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
				obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
				obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
				// 处理对象里面的"undefined"或undefined
				common_operate.getNotNullObj(obj);
				arr.push(obj);
			});
			// 对日期进行升序排序，并处理结束日期
			arr = arr.sort(function(a, b) {
				return a.l_begin_date_fdlv - b.l_begin_date_fdlv;
			});
			for ( var i = 0, j = arr.length - 1; i < j; i++) {
				arr[i].l_end_date_fdlv = dataUtil.addDate(
						arr[i + 1].l_begin_date_fdlv, -1);
			}
			var data = {
				"total" : arr.length,
				"rows" : arr
			};
			Horn.getCompById("sectionTable").loadData(data);
			Horn.getComp("addSectionWin").hide();

		}
	},// 费率分段-提交
	doFareSectionCommit : function() {
		var arrStr = [];
		var obj = {};
		// 循环遍历datagrid，取出所有记录
		$("#body_sectionTable > tr").each(
				function() {
					var $tr = $(this);
					obj.l_begin_date_fdlv = $tr.find("td:eq(2) > div").text();
					obj.l_end_date_fdlv = $tr.find("td:eq(3) > div").text();
					obj.en_rate_fdlv = $tr.find("td:eq(4) > div").text();
					// 处理对象里面的"undefined"或undefined
					common_operate.getNotNullObj(obj);
					arrStr.push(obj.l_begin_date_fdlv + "A"
							+ obj.l_end_date_fdlv + "A" + Number(obj.en_rate_fdlv / 100).toFixed(5));
				});
		Horn.getCompById("vc_sections_flbg").setValue(arrStr.join("B"));
		if ($.trim(arrStr.join("B")) != "") {
			Horn.getCompById("vc_sections_show_flbg").setValue("已维护");
		} else {
			Horn.getCompById("vc_sections_show_flbg").setValue(
					$.trim(arrStr.join("B")));
		}
		Horn.getComp("sectionWin").hide();

	},
	// 费率变更——新增窗口
	showFareStockrate : function(){
		Horn.getComp("addFareRateForm").reset();
		//两种方式塞值,因为是单独打开页面，所以从影藏域中获取值
		var vc_stock_code = Horn.getCompById("vc_stock_code").getValue();
		var l_begin_date = Horn.getCompById("l_begin_date").getValue();
		//这个主要用于投资管理中窗口显示获取值
		
		if(vc_stock_code){
			Horn.getCompById("vc_stock_code_flbg").setValue(vc_stock_code);
		}else{
			var grid = Horn.getComp("dataTable").getSelecteds();
			Horn.getCompById("vc_stock_code_flbg").setValue(grid[0].vc_stock_code);
		}
		
		if(l_begin_date){
			Horn.getCompById("l_last_pay_date_flbg").setValue(l_begin_date);
		}
		
		Horn.getCompById("hxh").setValue(0);
		Horn.getCompById("flbgType").setValue("0");
		Horn.getComp("addFareRateWin").show();
		var tr_length = $("#body_fareRateTable > tr").length;
		var rateTable_height = $("#data_fareRateTable").height();
		if (tr_length == 1) {
			var tr_no_data = $("#body_fareRateTable > tr > td > p").text();
			if (tr_no_data == "暂时无数据") {
				$("#data_fareRateTable").height(rateTable_height + 30);
			}
		}

		common_stockcodesex.flzl();
		common_stockcodesex.ffzq();
		common_reg.Formremoverr("addFareRateForm");
		},
	// 费率种类下拉框监听事件
	flzl : function() {
		var value = Horn.getCompById("c_rate_type_flbg").getValue();
		// 固定
		if (value == "0") {// 固定
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>费率(%)");
			Horn.getCompById("en_rate_flbg").show();
			Horn.getCompById("en_rate_flbg").setDisabled(false);
			
			Horn.getCompById("vc_sections_show_flbg").hide();
			Horn.getCompById("vc_sections_show_flbg").setDisabled(true);
			
		
		} else if (value == "2") {// 按日期区间浮动
			Horn.getCompById("vc_sections_show_flbg").show();
			Horn.getCompById("vc_sections_show_flbg").setDisabled(false);
			
			Horn.getCompById("en_rate_flbg").hide();
			// Horn.getCompById("en_rate_flbg").setDisabled(true);
			Horn.getCompById("en_rate_flbg").setValue("0.00000");
		} 
	},
	// 根据付费周期，计算首次结算日
	ffzq : function(){
		var en_pay_inteval = Horn.getCompById("en_pay_inteval_flbg").getValue();
		var l_begin_date = Horn.getCompById("l_last_pay_date_flbg").getValue();
	
		if(!l_begin_date){
			return;
		}
		if(!en_pay_inteval){
			Horn.getCompById("l_first_pay_date_flbg").clearValue();
        }else if(en_pay_inteval=='0'){
        	Horn.getCompById("l_first_pay_date_flbg").setValue(l_begin_date);
        }else{
        	l_begin_date = l_begin_date.substring(0,4) + "/" + l_begin_date.substring(4,6) + "/" + l_begin_date.substring(6,8);
            var date_begin=new Date(l_begin_date);
            if(parseInt(l_begin_date.substring(8,10)) < 20){
            	en_pay_inteval = en_pay_inteval - 1;
            }
            date_begin.setMonth(date_begin.getMonth() + parseInt(en_pay_inteval));
            Horn.getCompById("l_first_pay_date_flbg").setValue(FormatDate(date_begin,"yyyyMMdd"));
        }
	},
	// 此方法用于将数据字典转化为以值表示的字段
	dic2Str : function(dicId,showId){
		
		var temp = Horn.getCompById(dicId).tempCheckedValue;
		if(temp){
			if(temp.indexOf(":")!=-1){
				
				var temp_str=temp.substring(temp.indexOf(":")+1);
				Horn.getCompById(showId).setValue(temp_str);
			}
			else if(temp!="请选择"){
				Horn.getCompById(showId).setValue(temp);
			}
			
		}else{
			Horn.getCompById(showId).setValue(temp);
		}	
	},
	
	// 费率变更-新增、修改
	doFareAddTemp : function() {
		var flag=0;	
		var c_rate_status = Horn.getCompById("c_rate_status_flbg").getValue();		
		var flbgType = $("#flbgType").val();						
		var form = Horn.getComp("addFareRateForm");			
		if (form.isValid()) {
		
		// 为隐藏字段_show塞值
		// 费率状态
		if (c_rate_status != "0") {
			Horn.getCompById("c_rate_status_flbg").setValue(flbgType);
			Horn.getCompById("c_rate_status_show_flbg").setValue(constants.c_rate_status[flbgType]);
		}
		// 费用类别
		common_stockcodesex.dic2Str("c_ext_flag_flbg","c_ext_flag_show_flbg");
		// 费率种类
		common_stockcodesex.dic2Str("c_rate_type_flbg","c_rate_type_show_flbg");
		// 计算天数
		common_stockcodesex.dic2Str("c_calc_cycle_flbg","c_calc_cycle_show_flbg");
		// 计算方式
		common_stockcodesex.dic2Str("c_calc_type_flbg","c_calc_type_show_flbg");
		// 结算方式
		common_stockcodesex.dic2Str("c_settle_kind_flbg","c_settle_kind_show_flbg");
		// 包干费用
		common_stockcodesex.dic2Str("vc_children_ext_flbg","vc_children_ext_show_flbg");
		// 付费周期
		common_stockcodesex.dic2Str("en_pay_inteval_flbg","en_pay_inteval_show_flbg");
		// 交易对手编号
		common_stockcodesex.dic2Str("l_rival_id_flbg","l_rival_id_show_flbg");
		// 分段利率（真实值在隐藏域hsection中）
		var array=[];
		// 0位新增,2为修改
		if(flbgType=="0"){
		// 将标志设置为添加待确认
			
			// common_stockcodesex.dic2Str("c_rate_status_flbg","c_rate_status_show_flbg");
			// 获取datatable数据tr长度
			var tr_length = $("#body_fareRateTable > tr").length;
			// 判断是否有数据
			var tr_no_data = $("#body_fareRateTable > tr > td > p").text();	
//			var array=[];
			var formData = form.getValues();
			if (tr_no_data != "暂时无数据") {
				for(var i=0;i<tr_length;i++){				
					 Horn.getCompById("fareRateTable").select(String(i));
					 var tempArr = Horn.getCompById("fareRateTable").getSelecteds()[0];						
					 array.push(tempArr);
				}
				for(var m=0,n=array.length;m<n;m++){
					 var tempArr = array[m];					
					 var c_ext_flag= formData.c_ext_flag;
					 var l_rival_id = formData.l_rival_id;					
					 if((c_ext_flag==tempArr.c_ext_flag)&&((l_rival_id==tempArr.l_rival_id)||(!l_rival_id || tempArr.l_rival_id=="0" || !tempArr.l_rival_id))){
							flag=1;
							TDialog.Msg.warning("提示","已经存在相同的费率信息"); 
							return;
					 }
				}
				// 函数停止执行标志位
				if(flag){
					return;
				}
				
			}
			array.push(formData);	
		}else if(flbgType=="2"){
			var hindex = Horn.getCompById("hindex").getValue();
			// 记录选中的位置数
			var num = 1;
			// 遍历找到选中的那个radio
			$("#body_fareRateTable > tr").each(function() {
				var $tr = $(this);
				var radio = $tr.find("td:eq(1) > div > input");
				if(!radio.is(":checked")){
					num++;
				}else{	//break----用return false;continue --用return true;﻿
					return false;
				}
			});
			
			// 获取datatable数据tr长度
			var tr_length = $("#body_fareRateTable > tr").length;
			// 判断是否有数据
			var tr_no_data = $("#body_fareRateTable > tr > td > p").text();	
			var unselectArr = [];
			if (tr_no_data != "暂时无数据") {
				var formData = form.getValues();
				for(var i=0;i<tr_length;i++){
					if((num-1)==i){// 找到改的那行再重新塞回去
						array.push(formData);						
					}else{
						 Horn.getCompById("fareRateTable").select(String(i));
						 var tempArr = Horn.getCompById("fareRateTable").getSelecteds()[0];
						 unselectArr.push(tempArr);
						 array.push(tempArr);
					}				
				}
				for(var m=0,n=unselectArr.length;m<n;m++){
					 var tempArr = unselectArr[m];					
					 var c_ext_flag= formData.c_ext_flag;
					 var l_rival_id = formData.l_rival_id;					
					 if((c_ext_flag==tempArr.c_ext_flag)&&((l_rival_id==tempArr.l_rival_id)||(!l_rival_id || !tempArr.l_rival_id || tempArr.l_rival_id=="0"))){
							flag=1;
							TDialog.Msg.warning("提示","已经存在相同的信息"); 
							Horn.getCompById("fareRateTable").select(hindex-1);
							return;
					 }
				}
				// 函数停止执行标志位
				if(flag){
					return;
					Horn.getCompById("fareRateTable").select(hindex-1);
				}
			}		
		}
		
		var data = {
				"total" : array.length,
				"rows" : array
			};
		// 让datagrid重新load
		Horn.getCompById("fareRateTable").loadData(data);
		Horn.getComp("addFareRateWin").hide();
		
	}

	},// 费率变更-修改
	showFareEditTemp : function(type) {
		var grid = Horn.getComp("fareRateTable").getSelecteds();
		if(grid.length!=1){
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
//		var l_begin_date = grid[0].l_begin_date;
//		Horn.getCompById("l_begin_date").setValue(grid[0].l_begin_date);
		Horn.getCompById("vc_stock_code_flbg").setValue(grid[0].vc_stock_code);
		Horn.getCompById("flbgType").setValue("2");
		Horn.getCompById("l_rival_id_flbg").setValue("");
		var form = Horn.getComp("addFareRateForm");
		
		form.setValues(grid[0]);		
		// 取对手方
		var val= grid[0].l_rival_id;
		
		common_operate.geteditlist("l_rival_id_flbg","loanrival","1000185",val);
		
		if ($.trim(grid[0].vc_sections) != "") {
			Horn.getCompById("vc_sections_show_flbg").setValue("已维护");
		}

		Horn.getComp("addFareRateWin").show();
		common_stockcodesex.flzl();
		common_stockcodesex.ffzq();
		common_reg.Formremoverr("addFareRateForm");
	},
	// 费率变更-删除
	delFareTemp : function() {
		
		// 记录选中的位置数
		var num = 0;
		var obj = {};
		
		// 将标志设置为修改后待确认
		// 遍历找到选中的那个radio
		$("#body_fareRateTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if(radio.is(":checked")){
				obj.xh = $tr.find("td:eq(0) > div").text();
				obj.c_rate_status = $tr.find("td:eq(3) > div").text();
				num++;
			}
				
		});
		if(num!=1){
			Horn.Tip.warn("请选择一条记录！");
			return;
		}else{
			TDialog.Msg.confirmyorn("确认", "请您确认是否删除？", function() {
				// 如果是0新增的，这时没有存在数据库，删除时，直接从页面删除
				if (obj.c_rate_status == "0") {
					// 获取datatable数据tr长度
					var tr_length = $("#body_fareRateTable > tr").length;
					// 判断是否有数据
					var tr_no_data = $("#body_fareRateTable > tr > td > p").text();	
					var array=[];
					if (tr_no_data != "暂时无数据") {
						// $("#body_rateTable").empty();
						for(var i=0;i<tr_length;i++){
							if((parseInt(obj.xh)-1)==i){// 找到要删除的那行
								
								
							}else{
								 Horn.getCompById("fareRateTable").select(String(i));
								 var tempArr = Horn.getCompById("fareRateTable").getSelecteds()[0];
								 array.push(tempArr);
							}
							
						}
						
					}

					var data = {
							"total" : array.length,
							"rows" : array
						};
					// 让datagrid重新load
					Horn.getCompById("fareRateTable").loadData(data);
					
				} else if (obj.c_rate_status == "1") {
					// 如果是1正常的，这时存在数据库，删除时，状态置为3作废
					var $tr = $("tr[id=tr_fareRateTable_" + obj.xh + "]");
					$tr.css("background", "gray");
					$tr.find("td:eq(4) > div").text(
							constants.c_rate_status["3"]);
					$tr.find("td:eq(3) > div").text("3");
					$tr.find("td:eq(1) > div > input").removeAttr("checked");
				}
			}, function() {
			});
		}
	},// 费率变更-确认
	doFareRateCommit : function() {
		// 机构编号
		var vc_organization_code = Horn.getCompById("vc_organization_code").getValue();
		var vc_stock_code = Horn.getCompById("vc_stock_code").getValue();
		var htype = $("#htype").val();
		
		// var grid = Horn.getComp("dataTable").getSelecteds();
		// var vc_stock_code = grid[0].vc_stock_code;
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

					var values = obj.l_rate_id + "|"
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
		dialog.dialog("open");
		var url = "/am/am/sellerbusiness/stockcodesex/" + htype +"/fareRate_commit.json?l_function_no="
				+ functionIds.stockcodesex.add + "&business_type=flbg";
		var data = "vc_fields=" + arr_fileds.join("]") + "&vc_values="
				+ arr_values.join("]") + "&vc_stock_code=" + vc_stock_code;
		query_operate.doPost(url, data, function(result) {
			common_operate.endProgress();
			if (result == "ok") {
				TDialog.Msg.alert("提示", "操作成功！", function() {
			  // Horn.getComp("rateWin").hide();
				window.parent.parent.Horn.Frame.screen.closeCurrent();
				});

			} 
//			else {
//				Horn.Tip.warn(result);
//			}
		});
	},// 费率删除的行单击函数
	fareRateRowClick : function(rowdata) {
		// // 绑定单击事件
		$("#body_fareRateTable > tr").each(function() {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			
			if(!$tr.hasClass("u-table-selected")){
				radio.removeAttr("checked");
			}				
			if (radio.is(":checked")) {
				var c_rate_status = $tr.find("td:eq(3) > div").text();
				if (c_rate_status == "3") {
					Horn.getComp("fareRateTable").hideButton("flbg_xg", true);
					Horn.getComp("fareRateTable").hideButton("flbg_sc", true);
				} else {
					Horn.getComp("fareRateTable").hideButton("flbg_xg", false);
					Horn.getComp("fareRateTable").hideButton("flbg_sc", false);
				}
			}
			
		});
	},
	
	// ***************************************************************************************
	// 指令界面：查询对手方
	queryL_rival_id : function(type,l_rival_id){
		var temp = l_rival_id || Horn.getCompById("l_rival_id_"+type).getValue(),
			url = "/am/am/system/tree/dicmanagelist.json?tableName=loanrival&l_function_no=1000185&filterString="+temp;
		query_operate.ajax(url, "", function(result) {
	         Horn.getCompById("l_rival_id_" + type).addItems(result,true);
	         Horn.getCompById("l_rival_id_" + type).setValue(temp,true);
		});
	},
	// 查询产品代码(基金代码)
	queryCpdm : function(type){
		 var type = Horn.getCompById("htype").getValue(),
			vc_stock_code = Horn.getCompById("vc_stock_code_" + type).getValue();
			url = "/am/am/business/stockcodesex/queryJjdm.json";
			data = "vc_input_name1=vc_stock_code&vc_input_value1=" + vc_stock_code
					+ "&vc_input_table=groupholderstock"
					+ "&vc_output_name1=vc_product_id";
		query_operate.ajax(url, data, function(result) {
			if (result instanceof Array && result) {
				if(!constants.funds.invest[type] && result.length < 1){//收款
					TDialog.Msg.warning("提示","要进行该操作请先放款！"); 
					return;
				} else if(constants.funds.invest[type] && result.length < 1){//放款
					url = "/am/am/business/stockcodesex/querysellerCpdm.json?l_function_no=" + functionIds.stockcodesex.view+"&vc_stock_code="+vc_stock_code;
					query_operate.ajax(url, "", function(_result){
						result = _result;
					});
					Horn.getCompById("vc_product_id_" + type).addItems(result,true);
					Horn.getCompById("vc_product_id_" + type).selectFirst();
					Horn.getCompById("vc_product_id_" + type).setReadonly(true);
					return;
				}
				Horn.getCompById("vc_product_id_" + type).addItems(result,true);
				Horn.getCompById("vc_product_id_" + type).selectFirst();
			} 
//			else {
//				Horn.Tip.warn("查询基金代码失败！");
//			}
		});
	},
	// 查询合同信息,调用1000901功能号
	queryStockInfo : function(grid,type,fn){
		var url = "/am/am/business/stockcodesex/query_equity.json",
			_fn = fn || function(result) {
							if (result && result.query) {
								Horn.getCompById("en_untransfered_invest_" + type)
										.setValue(result.query.en_untransfered_invest);
							} else {
								Horn.Tip.warn(result);
							}
						},
			data = "vc_input_table=stockcodesex&" + "vc_input_value1="
				+ grid[0].vc_stock_code + "&combi_id=" + grid[0].combi_id +  "&business_type=" + type
				+ "&l_action_in=1";
		query_operate.doPost(url, data, _fn, ajaxDataType.JSON);
	},
	// 获得组合名称的详细信息
	queryCombIdInfo : function(value,type){
		var url = "/am/am/business/getSpecityObject.json",
			data = "vc_input_name1=combi_id&vc_input_value1=" + value
				+ "&vc_input_table=fundassetcombi";
		query_operate.ajax(url, data, function(result){
			if(result instanceof Object && result.query ){
				var s_obj = {};
				s_obj.code = result.query.combi_id;
				s_obj.text = result.query.combi_name;
				Horn.getCompById("combi_id_" + type).addItems([s_obj], true);
				Horn.getCompById("combi_id_" + type).selectFirst();
			}
		}, ajaxDataType.JSON);
	},
	// 查询组合名称
	queryCombId : function(type){
		// 查询组合id
		var _combi_id = Horn.getCompById("combi_id_" + type).getValue(),		
			vc_product_id = Horn.getCompById("vc_product_id_" + type).getValue(),
		url = "/am/am/business/stockcodesex/queryFundInfo.json?vc_product_id=" + vc_product_id;
		query_operate.ajax(url, "", function(result){
			if(!result || result.length < 1){
				TDialog.Msg.warning("提示","该用户没有相应的组合权限，请联系管理员设置!");
			} else {
				Horn.getCompById("combi_id_" + type).addItems(result, true);
				Horn.getCompById("combi_id_" + type).setValue(_combi_id);
				Horn.getCompById("combi_id_" + type).setReadonly(true);
			}
		});
	},
	// 费用类别-监听事件
	fylbChange : function(){
		var type = Horn.getCompById("htype").getValue(),
			c_ext_flag = Horn.getCompById("c_ext_flag_" + type).getValue(),
			vc_stock_code = Horn.getCompById("vc_stock_code_" + type).getValue(),
			url = "/am/am/business/stockcodesex/queryLrivaIds.json",
			data = "c_ext_flag=" + c_ext_flag + "&vc_stock_code=" + vc_stock_code + "&l_level=1";
		query_operate.doPost(url, data, function(result){
			if(result instanceof Array){	
				if(result.length==1&&result[0].code=="0"){
					Horn.getCompById("l_rival_id_" + type).clearList();
					Horn.getCompById("en_preoccur_balance_" + type).setValue("0");
					equity_investment.zf_dsbhChange();
				}
				else if (result.length==0)
				{
					Horn.getCompById("l_rival_id_" + type).clearList();
					Horn.getCompById("en_preoccur_balance_" + type).setValue("0");
					equity_investment.zf_dsbhChange();					
				}
				else{
					Horn.getCompById("l_rival_id_" + type).addItems(result, true);
					Horn.getCompById("l_rival_id_" + type).selectFirst();
				}				
			} else {
				Horn.Tip.warn("查询对手方编号失败!");
			}
		}, ajaxDataType.JSON);
	},
	// 合同金额是否超过项目总金额
	querymoneymax : function(value,type){
		var s="";
		var type2;
		if(type==1){
			type2="";
		}else if(type==2){
			type2="_edit";
		}else{
			type2="_"+type+"";
		}
		var vc_project_code = Horn.getCompById("vc_project_code" + type2).getValue();
		if(vc_project_code==""){
			return "项目未选择,无法判断投资总额是否超过项目总额";
		}else{	
			var vc_stock_code = Horn.getCompById("vc_stock_code" + type2).getValue();
			url = "/am/am/business/stockcodesex/checkMoneymax.json?en_contract_balance="+value+"&&vc_project_code=" + vc_project_code+"&&vc_stock_code="+vc_stock_code;
			$.ajax({
				type : "post",
				url : url,
				data : "",
				async : false,
				dataType : "text",
				success : function(result) {
					if (result != "ok") {
						s=result;
					} 
				}
			});
			if(s!=""){
				return  s;
			}else{
				return true;
			}
		}
	},
	// 信用证金额大于等于合同金额
	checkmoneymore : function(value,type){
		var s;
		var type2;
		if(type==1){
			type2="";
		}else if(type==2){
			type2="_edit";
		}else{
			type2="_"+type+"";
		}
		var en_contract_balance = Horn.getCompById("en_contract_balance" + type2).getValue();
		if(en_contract_balance==""){
			return "请输入投资金额,信用证金额大于等于投资金额";
		}else{	
			 s=value-en_contract_balance;
			if(s>=0){
				return true;
			}else{
				return  "信用证金额需大于等于投资金额";
			}
		}
	}
};

	//替换字符串  
	function Replace(str, from, to) {
	    return str.split(from).join(to);
	}
	// 日期类型格式成指定的字符串
	function FormatDate(date, format) {
	    format = Replace(format, "yyyy", date.getFullYear());
	    format = Replace(format, "MM", GetFullMonth(date));
	    format = Replace(format, "dd", "20");
	    return format;
	}
	//返回月份(两位数)  
	function GetFullMonth(date) {
	    var v = date.getMonth() + 1;
	    if (v > 9) return v.toString();
	    return "0" + v;
	}
