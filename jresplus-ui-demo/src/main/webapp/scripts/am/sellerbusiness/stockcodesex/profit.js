/**
 * 收益模块
 */
var profit = {
	// 显示金额修改窗口
	showMonenyWin : function(element) {
		var h_profit_type = common_operate.checkProfitType(element);

		Horn.getCompById("h_profit_type").setValue(h_profit_type);
		var obj = {}, type = Horn.getCompById("htype").getValue();
		obj = Horn.getComp(type + "Form").getValues();
		obj.l_action_in = 1;
		obj.c_profit_kind = constants.cProfitKind[h_profit_type];
		Horn.getCompById("detailTable").setBaseParams(obj);
		Horn.getCompById("detailTable").load();
		Horn.getComp("detailWin").show();
		// 复位滚动条
		$("#detailWin div:eq(1)").scrollTop(0);
		// 隐藏新弹出窗口的关闭按钮
		common_operate.exitButtonHiden("detailWin");
	},//指令界面显示金额datagrid
	showMonenyWin2: function(h_profit_type,obj,dictype) {
		   Horn.getCompById("h_profit_type").setValue(h_profit_type);	
		   Horn.getCompById("dictype_det").setValue(dictype);
		    Horn.getCompById("detailTable").setBaseParams(obj);
			Horn.getCompById("detailTable").load();
			delete obj.l_dictate_serial_no;
			Horn.getComp("detailWin").show();
			$("#detailWin div:eq(1)").scrollTop(0);
			//复核执行隐藏操作按钮
			if(dictype=='3'){
				//隐藏操作按钮
				Horn.getComp("detailTable").hideButton("profitDdd", true);
				Horn.getComp("detailTable").hideButton("profitEdit", true);
				Horn.getComp("detailTable").hideButton("profitDel", true);
			}
			//隐藏新弹出窗口的关闭按钮
			common_operate.exitButtonHiden("detailWin");
	},
	// 收益明细增加
	showDivestAddWin : function() {
		var h_profit_type = Horn.getCompById("h_profit_type").getValue(), grid = Horn
				.getComp("dataTable").getSelecteds()[0], s_obj = {}, obj = {}, values, type, dictype = Horn
				.getCompById("dictype_det").getValue();
		// 合同代码
		s_obj.code = grid.vc_stock_code;
		s_obj.text = grid.vc_stock_name;
		Horn.getCompById("vc_stock_code_add").addItems([ s_obj ], true);
		// 判断是指令调用还是普通页面调用（指令为1）
		if (dictype == '1') {
			values = $("#rightMain")[0].contentWindow.stockcodesex2
					.getdetformvalues();
			type = $("#rightMain")[0].contentWindow.stockcodesex2
					.getdetformtype();
		} else {
			type = Horn.getCompById("htype").getValue();
			values = Horn.getComp(type + "Form").getValues();
		}

		common_stockcodesex.queryCombIdInfo(values.combi_id, "add");
		// 过滤明细类别
		if (constants.funds.invest[type]) {
			Horn.getCompById("c_ext_flag_add").filter(constants.mxArr1, true,
					true);
			obj.c_repay_type = "A";
		} else {    
			if (type == constants.funds.GQTZSY
					|| type == constants.funds.JCTZSY
					|| type == constants.funds.WQTZSY|| type == constants.funds.QTSYQSY
					|| type == constants.funds.ZQTZSY|| type == constants.funds.CKSY||type == constants.funds.GQSYQSY
					|| type == constants.funds.WTDKSX|| type == constants.funds.XDZCSX||type == constants.funds.PJSX) {
				obj.c_repay_type = "0";
			}else if(type == constants.funds.QJZR||type == constants.funds.DQDF){ //信用证到期兑付期间转让要隐藏还款方式
				Horn.getCompById("c_repay_type_add").setDisabled(true);
				Horn.getCompById("c_repay_type_add").hide();
			}else {
				obj.c_repay_type = values.c_repay_type;
			}
			if (h_profit_type == constants.profitType.SY) {
				Horn.getCompById("c_ext_flag_add").filter(constants.mxArr1,
						true, true);
			} else if (h_profit_type == constants.profitType.DK) {
				Horn.getCompById("c_ext_flag_add").filter(constants.mxArr2,
						true, true);
			}
		}

		obj.vc_stock_code = values.vc_stock_code;
		obj.combi_id = values.combi_id;
		obj.en_occur_invest = values.en_occur_invest;
		obj.l_period = 1;
		obj.l_end_date = values.l_end_date;
		obj.c_profit_kind = constants.cProfitKind[h_profit_type];
		obj.c_status = 1;
		Horn.getComp("symxAddForm").setValues(obj);

		Horn.getComp("symxAddWin").show();

		$("#en_rate_add > input:eq(0)")
				.keyup(
						function() {
							var $this = $(this);
							if ($this.val() > 100) {
								$this.val(100);
							}
							var en_occur_invest = common_operate.parseNaN(Horn
									.getCompById("en_occur_invest_add")
									.getValue()), c_calc_way = Horn
									.getCompById("c_calc_way_add").getValue(), en_rate = common_operate
									.parseNaN($this.val() / 100), l_period = common_operate
									.parseNaN(Horn.getCompById("l_period_add")
											.getValue()), l_begin_date = common_operate
									.parseNaN(Horn.getCompById(
											"l_begin_date_add").getValue()), l_end_date = common_operate
									.parseNaN(Horn
											.getCompById("l_end_date_add")
											.getValue()), days = common_operate
									.parseNaN(dataUtil.calculateDays(
											l_begin_date, l_end_date) + 1);
							common_stockcodesex.calculateProfit("add",
									c_calc_way, en_occur_invest, en_rate, days,
									l_period);
						});
		$("#en_occur_invest_add > input:eq(1)")
				.keyup(
						function() {
							var $this = $(this), en_occur_invest = $this.val(), c_calc_way = Horn
									.getCompById("c_calc_way_add").getValue(), en_rate = common_operate
									.parseNaN(Horn.getCompById("en_rate_add")
											.getValue() / 100), l_period = common_operate
									.parseNaN(Horn.getCompById("l_period_add")
											.getValue()), l_begin_date = common_operate
									.parseNaN(Horn.getCompById(
											"l_begin_date_add").getValue()), l_end_date = common_operate
									.parseNaN(Horn
											.getCompById("l_end_date_add")
											.getValue()), days = common_operate
									.parseNaN(dataUtil.calculateDays(
											l_begin_date, l_end_date) + 1);
							common_stockcodesex.calculateProfit("add",
									c_calc_way, en_occur_invest, en_rate, days,
									l_period);
						});
		$("#l_period_add > input:eq(1)")
				.keyup(
						function() {
							var $this = $(this), en_occur_invest = common_operate
									.parseNaN(Horn.getCompById(
											"en_occur_invest_add").getValue()), c_calc_way = Horn
									.getCompById("c_calc_way_add").getValue(), en_rate = Horn
									.getCompById("en_rate_add").getValue() / 100, l_period = $this
									.val(), l_begin_date = common_operate
									.parseNaN(Horn.getCompById(
											"l_begin_date_add").getValue()), l_end_date = common_operate
									.parseNaN(Horn
											.getCompById("l_end_date_add")
											.getValue()), days = common_operate
									.parseNaN(dataUtil.calculateDays(
											l_begin_date, l_end_date) + 1);
							common_stockcodesex.calculateProfit("add",
									c_calc_way, en_occur_invest, en_rate, days,
									l_period);
						});
		$("#c_calc_way_add > input:eq(1)")
				.change(
						function() {
							// var $this = $(this);
							var en_occur_invest = common_operate.parseNaN(Horn
									.getCompById("en_occur_invest_add")
									.getValue()), c_calc_way = Horn
									.getCompById("c_calc_way_add").getValue(), en_rate = Horn
									.getCompById("en_rate_add").getValue() / 100, l_period = common_operate
									.parseNaN(Horn.getCompById("l_period_add")
											.getValue()), l_begin_date = common_operate
									.parseNaN(Horn.getCompById(
											"l_begin_date_add").getValue()), l_end_date = common_operate
									.parseNaN(Horn
											.getCompById("l_end_date_add")
											.getValue()), days = common_operate
									.parseNaN(dataUtil.calculateDays(
											l_begin_date, l_end_date) + 1);
							common_stockcodesex.calculateProfit("add",
									c_calc_way, en_occur_invest, en_rate, days,
									l_period);
						});
		common_reg.formremdefzero("symxAddForm");
	},// 收益明细-删除
	doDelProfit : function() {

		var grid = Horn.getComp("detailTable").getSelecteds();
		if (grid.length != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		dialog.dialog("open");
		var url = "/am/am/business/stockcodesex/income_operation.json";
		var data = "l_function_no=" + functionIds.stockcodesex.symxDel
				+ "&l_serial_no=" + grid[0].l_serial_no;
		query_operate.doPost(url, data, function(result) {
			common_operate.endProgress();
			if (result == constants.ajaxCallBackCode.OK) {

				Horn.getCompById("detailTable").load();
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		});
	},
	// 股权收益类-窗口展示
	show_profit : function() {
		var obj = {},num = 0,values = {},type,
		//判断是指令调用还是普通页面调用（指令为1）
			dictype=Horn.getCompById("dictype_det").getValue(),
			h_profit_type = Horn.getCompById("h_profit_type").getValue(),
			grid = Horn.getComp("dataTable").getSelecteds()[0];
		if(dictype=='1'||dictype=='3'){
			values =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformvalues();
			type =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformtype();
		}else{
			type = Horn.getCompById("htype").getValue();
			values = Horn.getComp(type + "Form").getValues();
		}
		 if(type == constants.funds.QJZR||type == constants.funds.DQDF){ //信用证到期兑付期间转让要隐藏还款方式
				Horn.getCompById("c_repay_type_edit").setDisabled(true);
				Horn.getCompById("c_repay_type_edit").hide();
		 }
		$("#body_detailTable > tr").each(function(index) {
			var $tr = $(this);
			var radio = $tr.find("td:eq(1) > div > input");
			if (radio.is(":checked")) {
				// 完成状态 1未完成 2已完成
				var c_status = $tr.find("td:eq(2) > div").text();
				if (c_status != 0) {
					num++;
				}				
				//合同代码
				var s_obj = {};
				s_obj.label = grid.vc_stock_code;
				s_obj.value = grid.vc_stock_name;
				Horn.getCompById("vc_stock_code_edit").addItems([ s_obj ], true);			
				//组合名称
				common_stockcodesex.queryCombIdInfo(values.combi_id, "edit");
				
				obj.combi_id = values.combi_id;
				obj.vc_stock_code = $tr.find("td:eq(3) > div").text();
				obj.c_repay_type = $tr.find("td:eq(4) > div").text();
				obj.c_ext_flag = $tr.find("td:eq(5) > div").text();
				obj.c_calc_way = $tr.find("td:eq(6) > div").text();

				obj.l_period = $tr.find("td:eq(7) > div").text();
				obj.vc_remark = $tr.find("td:eq(8) > div").text();
				obj.l_serial_no = $tr.find("td:eq(9) > div").text();
				obj.en_occur_invest = $tr.find("td:eq(12) > div").text();
				obj.l_begin_date = $tr.find("td:eq(13) > div").text();
				obj.l_end_date = $tr.find("td:eq(14) > div").text();
				obj.en_rate = Number($tr.find("td:eq(15) > div").text() * 100).toFixed(6);
				obj.en_profit = Math.abs(Number($tr.find("td:eq(17) > div").text()).toFixed(2));
				obj.en_preoccur_balance = obj.en_profit;
				obj.c_modify_flag = 1;
			}
		});

		if (num != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		Horn.getComp("symxEditForm").setValues(obj);
		Horn.getComp("symxEditWin").show();
		equity_investment.gssfChange(2);
		
		//过滤明细类别
		if(constants.funds.invest[type]){
			Horn.getCompById("c_ext_flag_edit").filter(constants.mxArr1,true,false);
		} else {
			if(h_profit_type == constants.profitType.SY){
				Horn.getCompById("c_ext_flag_edit").filter(constants.mxArr1,true,false);
			} else if(h_profit_type == constants.profitType.DK){
				Horn.getCompById("c_ext_flag_edit").filter(constants.mxArr2,true,false);
			}
		}

		$("#en_rate_edit > input:eq(0)").keyup(
				function() {
					var $this = $(this);
					if ($this.val() > 100) {
						$this.val(100);
					}
					var en_occur_invest = common_operate.parseNaN(Horn.getCompById("en_occur_invest_edit").getValue()),
						c_calc_way = Horn.getCompById("c_calc_way_edit").getValue(),
					 	en_rate = common_operate.parseNaN($this.val() / 100),
					 	l_period = common_operate.parseNaN(Horn.getCompById("l_period_edit").getValue()),
					 	l_begin_date = common_operate.parseNaN(Horn.getCompById("l_begin_date_edit").getValue()),
					 	l_end_date = common_operate.parseNaN(Horn.getCompById("l_end_date_edit").getValue()),
					 	days = common_operate.parseNaN(dataUtil.calculateDays(l_begin_date, l_end_date) + 1);
					common_stockcodesex.calculateProfit("edit", c_calc_way, en_occur_invest, en_rate, days, l_period);
				});
		$("#en_occur_invest_edit > input:eq(1)")
				.keyup(function() {
							var $this = $(this),
								en_occur_invest = $this.val(),
								c_calc_way = Horn.getCompById("c_calc_way_edit").getValue(),
								en_rate = common_operate.parseNaN(Horn.getCompById("en_rate_edit").getValue() / 100),
								l_period = common_operate.parseNaN(Horn.getCompById("l_period_edit").getValue()),
								l_begin_date = common_operate.parseNaN(Horn.getCompById("l_begin_date_edit").getValue()),
								l_end_date = common_operate.parseNaN(Horn.getCompById("l_end_date_edit").getValue()),
								days = common_operate.parseNaN(dataUtil.calculateDays(l_begin_date, l_end_date) + 1);
							common_stockcodesex.calculateProfit("edit", c_calc_way, en_occur_invest, en_rate, days, l_period);
						});
		$("#l_period_edit > input:eq(1)")
				.keyup(
						function() {
							var $this = $(this),
								en_occur_invest = common_operate.parseNaN(Horn.getCompById("en_occur_invest_edit").getValue()),
								c_calc_way = Horn.getCompById("c_calc_way_edit").getValue(),
								en_rate = Horn.getCompById("en_rate_edit").getValue() / 100,
								l_period = $this.val(),
								l_begin_date = common_operate.parseNaN(Horn.getCompById("l_begin_date_edit").getValue()),
								l_end_date = common_operate.parseNaN(Horn.getCompById("l_end_date_edit").getValue()),
								days = common_operate.parseNaN(dataUtil.calculateDays(l_begin_date, l_end_date) + 1);
							common_stockcodesex.calculateProfit("edit", c_calc_way, en_occur_invest, en_rate, days, l_period);
						});
		$("#c_calc_way_edit > input:eq(1)").change(
				function() {
//					var $this = $(this);
					var en_occur_invest = common_operate.parseNaN(Horn.getCompById("en_occur_invest_edit").getValue()),
						c_calc_way = Horn.getCompById("c_calc_way_edit").getValue(),
						en_rate = Horn.getCompById("en_rate_edit").getValue() / 100,
						l_period = common_operate.parseNaN(Horn.getCompById("l_period_edit").getValue()),
						l_begin_date = common_operate.parseNaN(Horn.getCompById("l_begin_date_edit").getValue()),
						l_end_date = common_operate.parseNaN(Horn.getCompById("l_end_date_edit").getValue()),
						days = common_operate.parseNaN(dataUtil.calculateDays(l_begin_date, l_end_date) + 1);
					common_stockcodesex.calculateProfit("edit", c_calc_way, en_occur_invest, en_rate, days, l_period);
				});
		common_reg.formremdefzero("symxEditForm");
	},// 金额datagrid的load成功之后回调函数
	detaiLoadSuccess : function() {
		var num = 0;
		var en_profit = 0;
		var std1 = "<td><div style=\"TEXT-aLIGN: center; WIDTH: 20px; \">共</div></td>";
		var ntd = "<td style=\"display:{XDATAGRID_TD_HIDDEN};\"><div style=\"TEXT-ALIGN:center;WIDTH:60px;word-wrap:break-word;\" class=\"hc-datagrid-cell\"></div></td>";
		var html = "<tr>";
		//判断是指令调用还是普通页面调用（指令为1   复核执行为3）
		var dictype=Horn.getCompById("dictype_det").getValue();
		if(dictype=='3'){
			// 根据完成状态，勾选对应的记录
			$("#body_detailTable > tr").each(function(index) {
				var $tr = $(this);
				// 完成状态 1未完成 2已完成
				var c_status = $tr.find("td:eq(2) > div").text();
				if (!c_status)
					return;
				Horn.getCompById("detailTable").select(index);
				$tr.find("td:eq(1) > div > input").attr("disabled", true);
				$tr.unbind("click");
				$tr.css("background", "silver");
				// 只统计选中的记录 
				var checkbox = $tr.find("td:eq(1) > div > input");
				if (checkbox.is(":checked")) {
					en_profit += parseFloat($tr.find("td:eq(17) > div").text());
				}
				num++;
			});
			//隐藏收益明细表头的选框
			$("#head_detailTable >tbody > tr").each(function(index) {
				var $tr = $(this);
				 $tr.find("td:eq(1) > div > input").hide();
				
			});
		}else{
			// 根据完成状态，勾选对应的记录
			$("#body_detailTable > tr").each(function(index) {
				var $tr = $(this);
				// 完成状态 1未完成 2已完成
				var c_status = $tr.find("td:eq(2) > div").text();
				if (!c_status)
					return;
				if (c_status == 0) {
					Horn.getCompById("detailTable").select(index);
					$tr.find("td:eq(1) > div > input").attr("disabled", true);
					$tr.unbind("click");
					$tr.css("background", "gray");
				} else if (c_status == 1) {
					Horn.getCompById("detailTable").select(index);
				}
				// 只统计选中的记录
				var checkbox = $tr.find("td:eq(1) > div > input");
				if (checkbox.is(":checked")) {
					en_profit += parseFloat($tr.find("td:eq(17) > div").text());
				}
				num++;
			});
		}
		
		if (num < 1) {
			return;
		}
		var std2 = "<td><div style=\"TEXT-aLIGN: center; WIDTH: 20px; \">"
				+ num + "条</div></td>";

		var ntd2 = "<td style=\"display:{XDATAGRID_TD_HIDDEN};\"><div style=\"TEXT-ALIGN:center;WIDTH:160px;word-wrap:break-word;\" class=\"hc-datagrid-cell\">"
				+ en_profit.toFixed(2) + "</div></td>";
		html += std1 + std2 + ntd + ntd + ntd + ntd + ntd + ntd + ntd + ntd
				+ ntd2 + "</tr>";
		$("#body_detailTable").append(html);
	},// 收益明细行单击事件
	profitRowClick : function(rowData) {
		//选中记录的流水号
		var l_serial_no = rowData.l_serial_no;
		var num = 0;
		var en_profit = 0;
		$("#body_detailTable > tr").each(function(index) {
			var $tr = $(this);
			var _l_serial_no = $tr.find("td:eq(9) > div").text();
			var obj = {};
			
			// 只统计选中的记录
			var checkbox = $tr.find("td:eq(1) > div > input");
			if (checkbox.is(":checked")) {
				en_profit += parseFloat($tr.find("td:eq(17) > div").text());
				obj.c_status = 1;
			} else {
				obj.c_status = 2;
			}
			
			//更新状态
			if(l_serial_no == _l_serial_no){
				obj.l_serial_no = l_serial_no;
				$.ajax({
					type : ajaxRequestType.POST,
					url : "/am/am/business/stockcodesex/updateProfitStatus.json",
					data : obj,
					async : false,
					dataType : ajaxDataType.JSON,
					success : function(result) {
						if (result == "ok") {
							
						} 
//						else {
//							Horn.Tip.warn(result);
//						}
					}
				});
			}
			num++;
		});
		if (num < 1) {
			return;
		}
		$("#body_detailTable > tr:last").find("td:eq(10) > div")
				.text(en_profit.toFixed(2));
	},// 股权收益类-提交
	symxUpdate : function(type) {
		var htype;
		//判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_det").getValue();
		var _c_repay_type;
		if(dictype=='1'||dictype=='3'){
			htype =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformtype();
			_c_repay_type = c_repay_type[htype];
			if(!_c_repay_type){
				_c_repay_type = $("#rightMain")[0].contentWindow.stockcodesex2.getdetformvalues().c_repay_type;;
			}
		}else{
			htype = Horn.getCompById("htype").getValue();
			_c_repay_type = c_repay_type[htype];
			if(!_c_repay_type){
				_c_repay_type = Horn.getCompById("c_repay_type_" + htype).getValue();
			}
		}
		var form = Horn.getComp(type + "Form");
		var url = "/am/am/business/stockcodesex/income_operation.json?l_function_no="
				+ functionIds.stockcodesex[type];
		if (form.isValid()) {
			dialog.dialog("open");
			var values = form.getValues();
			//如果是收益，直接取值；抵扣，取负值
			var h_profit_type = Horn.getCompById("h_profit_type").getValue();
			values.c_profit_kind = constants.cProfitKind[h_profit_type];
			 
			values.c_repay_type = _c_repay_type;
			if(h_profit_type == constants.profitType.SY){//收益
				values.en_preoccur_balance = values.en_profit;
			} else if(h_profit_type == constants.profitType.DK){//抵扣
				values.en_preoccur_balance = -values.en_profit;
			}		
			values.en_rate = values.en_rate / 100;
			var dictype=Horn.getCompById("dictype_det").getValue();
			var grid = Horn.getComp("dataTable").getSelecteds();
			if(dictype=='1'||dictype=='3'){
				values.l_dictate_serial_no = grid[0].l_serial_no;
			}
			query_operate.doPost(url, values, function(result) {
				common_operate.endProgress();
				if (result == ajaxCallBackCode.OK) {
					Horn.getComp(type + "Win").hide();
					Horn.Tip.success("操作成功！");

					//var htype = Horn.getCompById("htype").getValue();
					var htype;
					var h_profit_type = Horn.getCompById("h_profit_type").getValue();
					var obj = {};
					//1是指令修改，3是复核执行
					if(dictype=='1'){
						obj =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformvalues();
						htype =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformtype();
						obj.l_action_in = 2;
						obj.l_dictate_serial_no = grid[0].l_serial_no;
					}else if(dictype=='3'){
						obj =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformvalues();
						htype =$("#rightMain")[0].contentWindow.stockcodesex2.getdetformtype();
						obj.l_action_in = 0;
						obj.l_dictate_serial_no = grid[0].l_serial_no;
					}else{
						htype = Horn.getCompById("htype").getValue();
						//values = Horn.getComp(type + "Form").getValues();
						obj = Horn.getComp(htype + "Form").getValues();
						obj.l_action_in = 1;
					}
					obj.c_profit_kind = constants.cProfitKind[h_profit_type];
                    Horn.getCompById("detailTable").setBaseParams(obj);
					Horn.getCompById("detailTable").load();
				} 
//				else {
//					Horn.Tip.warn(result + "!");
//				}
			});
		}
	},closeProfitWin : function(winId) {
		var dd = $("#body_detailTable > tr:last").find("td:eq(10)").text();
		dd = Number(dd).toFixed(2);
		//var type = Horn.getCompById("htype").getValue();
		var type;
		//判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_det").getValue();
		var h_profit_type = Horn.getCompById("h_profit_type").getValue();
		if(dictype=='1'||dictype=='3'){
			$("#rightMain")[0].contentWindow.stockcodesex2.closeProfitWin(dd,h_profit_type);
		}else{
			type = Horn.getCompById("htype").getValue();
			if(h_profit_type == constants.profitType.SY){//收益
				if(type == "gqtzsy") {//预收=收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
				/*	var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				} else if (type == "gqhg" || type == "gqcr") {//预收=本金+收益-抵扣
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
				}else if(type == "wqtzsy") {//预收=收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
					/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				} else if (type == "wqhg" ) {//预收=本金+收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
					var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
					var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
					/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				}else if(type == "zqtzsy") {//预收=收益-抵扣
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
				}else if(type == "cksy") {//预收=收益-抵扣
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
				}else if(type == "gqsyqsy") {//预收=收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
					/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				} else if (type == "crgqsyq" || type == "gqsyqhg") {//预收=本金+收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
					var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
					var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
					/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				} else if (type == "qjzr" || type == "dqdf") {//预收=本金+收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
					var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
					var en_occur_profit = Horn.getCompById("en_occur_profit_" + type).getValue();
					/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(en_occur_invest) + parseFloat(en_occur_profit);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				}else if(type == "qtsyqsy") {//预收=收益-抵扣
					Horn.getCompById("en_occur_profit_" + type).setValue(dd);				
					/*var en_offset_balance = Horn.getCompById("en_offset_balance_" + type).getValue();
					var en_preoccur_balance = parseFloat(dd) - parseFloat(en_offset_balance);*/
					var en_preoccur_balance = parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(en_preoccur_balance.toFixed(2));
				} else if (type == "qtsyqhg" || type == "crqtsyq") {//预收=本金+收益-抵扣
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
			} else if(h_profit_type == constants.profitType.DK){//抵扣
				//将负数转为正数
				dd = -dd;
				//Horn.getCompById("en_offset_balance_" + type).setValue(dd);
				if(type == "gqtz"){//预收=成本-抵扣
					var en_occur_invest = Horn.getCompById("en_occur_invest_" + type).getValue();
					var en_preoccur_balance = parseFloat(en_occur_invest) - parseFloat(dd);
					Horn.getCompById("en_preoccur_balance_" + type).setValue(
							en_preoccur_balance.toFixed(2));
				} else if(type == "gqtzsy") {//预收=收益-抵扣
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
			.setValue($("#en_preoccur_balance_" + type + " > .u-typefield-capital")
							.text());
		}
		query_operate.closeWin(winId);
	}
};