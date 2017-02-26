var FA = {
	formQuery : function(table, form) {

		var result = Horn.getComp(form).isValid();
		if (result) {
			Horn.getCompById(table).setBaseParams(
					Horn.getCompById(form).getValues());
			Horn.getCompById(table).load('', {
				"pageNo" : 1
			});
		}

	},
	exportDBF : function(url) {
		$.post("/am/am/init/list.json", null, function(data) {
			if (data != null) {
				if (data.l_operate_flag == 0) {
					TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {
					});
				} else {
					var result = Horn.getComp("dataForm").isValid();
					if (result) {
						var values = Horn.getCompById("dataForm").getValues();
						$.post(url, values, function(data) {
							if (data == "ok") {
								var s = Horn.getComp("prename").getValue();
								var y = Horn.getComp("l_date").getValue();
								s = s + "_" + y;
								Horn.getComp("dbfName").setValue(s);
								Horn.getComp("outForm").submit();
							}
						}, "text");
					}
				}
			}
		}, "json");
	},

	// 对手方type后缀转化
	typechange : function(type) {
		// 字段后缀
		var type2;
		if (type == 1) {
			type2 = "";
		} else if (type == 2) {
			type2 = "_edit";
		} else if (type == 3) {
			type2 = "_look";
		} else {
			type2 = "_" + type + "";
		}
		return type2;
	},
	// 根据选择的银行自动填充银行名称
	changebusinesstype : function(type) {
		var type2 = FA.typechange(type);
		var val = Horn.getCompById("c_business_type" + type2).getValue();
		if (val == 'F') {
			Horn.getCompById("c_product_type" + type2).show();
			Horn.getCompById("c_product_type" + type2).setDisabled(false);
		} else {
			Horn.getCompById("c_product_type" + type2).hide();
			Horn.getCompById("c_product_type" + type2).setDisabled(true);
		}

	},
	// 打开window的js
	// 参数说明：operate(操作：add,edit,del,look),form(操作的form),win(打开的弹窗名),table(使用的table名)
	openwindow : function(operate, form, win, table) {
		$
				.post(
						"/am/am/init/list.json",
						null,
						function(data) {
							if (data != null) {
								if (data.l_operate_flag == 0) {
									TDialog.Msg.alert("提示",
											"系统未初始化,请联系管理员初始化！", function() {
											});
								} else {
									if (operate == "add") { // 添加相关js
										// 新增window内容清空
										common_reg.Formreset(form);
										// window打开
										FA.changebusinesstype(1);
										Horn.getComp(win).show();
									} else if (operate == "edit") {
										if (Horn.getComp(table).getSelecteds().length == 0) {
											Horn.Tip.warn("请选择一条记录！");
											return;
										}
										// 获取选中记录的数据
										rowData = Horn.getComp(table)
												.getSelecteds().length
												&& (Horn.getComp(table)
														.getSelecteds())[0];
										// 单条查询url处理
										var url = "/am/am/system/FA/facontractinitlook.json?l_serial_no="
												+ rowData.l_serial_no;
										$.post(url, null, function(data) {
											if (data != null) {
												// 修改界面打开
												Horn.getComp(win).show();
												// 查询结果表单赋值
												Horn.getComp(form).setValues(
														data);
												FA.changebusinesstype(2);
											}
										}, "json");

									} else if (operate == "look") {
										Horn.getComp(win).show();
										Horn.getCompById(table).load('', {
											"pageNo" : 1
										});
									}
									/** *新的操作类型在此处加**** */
								}
							}
						}, "json");
	},
	// 表单提交
	commit : function(operate, form, win) {
		var result = Horn.getComp(form).isValid();
		if (result) {
			var values = Horn.getComp(form).getValues();
			dialog.dialog("open");
			var url;
			if (operate == "add") {
				url = "/am/am/system/FA/doAdd/facontractinitoperation.json?l_function_no=1001511";
			} else if (operate == "edit") {
				url = "/am/am/system/FA/doEdit/facontractinitoperation.json?l_function_no=1001512";
			} else {
				url = "";
			}
			$.post(url, values, function(data) {
				dialog.dialog("close");
				if (data == "ok") {
					TDialog.Msg.alert("提示", "操作成功！", function() {
						Horn.getComp(win).hide();
						Horn.getCompById("facontractinitTable").load('', {
							"pageNo" : 1
						});
					});
				}
			}, "text");
		}
	}

};