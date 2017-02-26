/*******************************************************************************
 * 全局变量
 */
// 业务权限全局变量
var busArr = [],
	unfund_busArr = [],
	// 按钮权限全局变量
	buttonArr = [],
	// 有权限的按钮数组
	targetButtonArr = [],
	// 是否与o32资金接口对接:配置开关
	config_7186 = "",
	// 进度条
	dialog = {},
	// 进度条
	timeoutId = "";
	// 根据config_id获取str_config配置值 add by jinpan 2015.11.04
	str_config_value = "";

$(function() {
	common_style.disable_style();
	$(".h_floatdiv .h_btndiv").css('background','none');
	$("nobr > div").hide();
	common_operate.exitButtonHiden("p1Win");	
});

/**
 * 公共类的样式设置对象
 */
var common_style = {
	// 禁用按钮的样式
	disable_style : function() {
		// 针对下拉框:普通控件
		$("div .hc_combox[readonly=readonly]").find("input[readonly=readonly]")
				.addClass("combox_disabled");
		$("div .hc_combox").find("input[disabled=disabled]").addClass(
				"combox_disabled");
		
		// 针对下拉框:有手图标控件
		$("div .uv_comselect[readonly=readonly]").find("input[readonly=readonly]")
				.addClass("combox_disabled");
		$("div .uv_comselect").find("input[disabled=disabled]").addClass(
				"combox_disabled");
		
		// 针对下拉框:一行两列
		$("div .uv_combox[readonly=readonly]").find("input[readonly=readonly]")
				.addClass("combox_disabled");
		$("div .uv_combox").find("input[disabled=disabled]").addClass(
				"combox_disabled");
		// 文本框
		$("div.hc_textfield._text").find("input[readonly=readonly]").addClass(
				"text_disabled");
		$("div.hc_textfield._text").find("input[disabled=disabled]").addClass(
				"text_disabled");
		// 金额控件
		$("div.hc_textfield.typefield").find("input[readonly=readonly]").addClass(
				"text_disabled");
		$("div.hc_textfield.typefield").find("input[disabled=disabled]").addClass(
				"text_disabled");
		
		// 日历
		$("div.hc_calendar").find("input[readonly=readonly]").addClass(
				"calendar_disabled");
		$("div.hc_calendar").find("input[disabled=disabled]").addClass(
				"calendar_disabled");
		
		// 树形控件
		$("div.uv_textfield > div").find("input[readonly=readonly]").addClass(
				"calendar_disabled");
		$("div.uv_textfield > div").find("input[disabled=disabled]").addClass(
				"calendar_disabled");
		
		// 超大文本，textarea
		$("div.hc_textarea").find("textarea[readonly=readonly]").addClass(
				"text_disabled");
		$("div.hc_textarea").find("textarea[disabled=disabled]").addClass(
				"text_disabled");
	},
	/**
	 * 隐藏grid的title
	 * 
	 * @param element
	 */
	gridTitleHide : function(element){
		var _element = element || "dataTable";
		$("div[name=" + _element + "] > div.hc-datagrid-title").addClass("element_hide");
	}
};

var common_operate = {
	treeUrl : "/am/am/system/tree/comboxlist.json?l_function_no="
			+ functionIds["tree"]["get"],
	// 校验授权是否过期
	checkIsexpire : function(modeName){
		var url = "/am/am/system/licence/isExire.json?vc_model_name=" + modeName;
		query_operate.ajax(url, "", function(result){
			if(result instanceof Object && result.ok == ajaxCallBackCode.OK){	
				
			} else if(result.errorMsg) {
				TDialog.Msg.warning("提示",result.errorMsg,function(){  
					window.parent.parent.Horn.Frame.screen.closeCurrent();
				});
			} else {
				TDialog.Msg.warning("提示","模块未授权，请与相关人员联系！",function(){  
					window.parent.parent.Horn.Frame.screen.closeCurrent();
				});
			}
		});
	},
	// datagrid查询
	formQuery : function(tableId, formId) {
		tableId = tableId || "dataTable";
		formId = formId || "queryForm";
		Horn.getCompById(tableId).setBaseParams(
				Horn.getCompById(formId).getValues());
		Horn.getCompById(tableId).load('', {
			"pageNo" : 1
		});
	},
	// datagrid查询校验
	formQuerybycheck : function(tableId, formId) {
		var result = Horn.getComp(formId).isValid();
		if(result){
			tableId = tableId || "dataTable";
			formId = formId || "queryForm";
			Horn.getCompById(tableId).setBaseParams(
					Horn.getCompById(formId).getValues());
			Horn.getCompById(tableId).load('', {
				"pageNo" : 1
			});
		}
	},
	// datagrid查询 项目其他人员查询
	formQueryoperby : function(tableId, formId) {
		tableId = tableId || "dataTable";
		formId = formId || "queryForm";
		var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
		if(vc_branch_id==""||vc_branch_id==null){
			Horn.Tip.warn("请选择至少一个部门！");
		}else{
			Horn.getCompById(tableId).setBaseParams(Horn.getCompById(formId).getValues());
			Horn.getCompById(tableId).load('', {
				"pageNo" : 1
			});
		}				
	},
	/***************************************************************************
	 * 查询保证资产
	 * 
	 * @param tableId
	 * @param formId
	 */
	formQueryColl : function(tableId, formId) {		
		var vc_product_id = Horn.getComp("vc_product_id_bz").getValue();
		var obj={
				vc_product_id:vc_product_id,
		        vc_collateral_status:"0,1,2,4"
		};
		Horn.getCompById(tableId).setBaseParams(obj);
		Horn.getCompById(tableId).load('', {
			"pageNo" : 1
		});
	},
	//判断收益/抵扣类型
	checkProfitType : function(element){
		var h_profit_type="";
		if(StringUtil.startWith(element,'en_occur_profit')){
			h_profit_type="sy";
		}else if(StringUtil.startWith(element,'en_offset_balance')){
			h_profit_type="dk";
		}
		return h_profit_type;
	},
	// 给查看绑定的字段加上超链接
	showView : function(data,fn){
		return "<a href='javascript:void(0);' onclick='" + fn + "(\""+data.val+"\")'>"+data.val+"</a>";
	},
	// 操作之前，检验选中条数
	checkSelectedLength : function(gridId) {
		gridId = gridId || "dataTable";
		var grid = Horn.getComp(gridId).getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return false;
		}
		return grid;
	},
	// 关闭窗口
	closeWin : function(id) {
		id = id || "updateWin";
		Horn.getComp(id).hide();
	},
	// 关闭sheet页窗口
	closesheetWin : function() {
		window.parent.Horn.Frame.screen.closeCurrent();
	},
	// 弹出新增窗口
	showWin : function(winId, formId) {
		if (formId) {
			Horn.getComp(formId).reset();
		}
		common_reg.Formremoverr(formId);
		Horn.getComp(winId).show();
	},
	// 弹出编辑窗口
	showEditWin : function(gridId, winId, formId) {
		var grid = Horn.getComp(gridId).getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp(formId);
		form.setValues(grid[0]);
		Horn.getComp(winId).show();
	},

	// 弹出编辑窗口之前，进行一些操作
	doEditBefroe : function() {

	},
	authAssign : function() {

	},// 创建树形
	tree_create : function(target, vc_key) {
		$("#" + target).focus(
				function(e) {
					s = target;
					$.post(common_operate.treeUrl + "&vc_key=" + vc_key, null,
							function(data) {
								if (data != null) {
									$.fn.zTree.init($("#treeDemo_" + s),
											setting, data);
									$("#tree_" + s).show();
								} 
//								else {
//									// Horn.Tip.warn("操作失败");
//									Horn.Tip.warn(data);
//								}
							}, "json");
				});

		$("#tree_" + target).hover(function() {
			clearTimeout(trigger); // 清除将要在1秒后执行的弹出框动作
		}, function() {

			trigger = setTimeout(function() {
				$("#tree_" + target).hide();
			}, 5000); // 这里1000就是间隔1秒
		});
	},// 为选中的树形赋值
	treeinit : function(target, vc_key) {
		$.post(common_operate.treeUrl + "&vc_key=" + vc_key, null, function(
				data) {
			if (data != null) {
				var u = $("#show_" + target).val();
				for ( var i = 0; i < data.length; i++) {
					var node = data[i];
					if (node.id == u) {
						$("#" + target).val(node.name);
					}
				}
			} 
//			else {
//				Horn.Tip.warn(data);
//			}
		}, "json");

	},
	// 取得dialog对象
	getDialog : function() {
		var progressbar = $("#divProgressbar");
		progressbar.progressbar({
			value : 0
		});
		return $("#dialog").dialog({
			dialogClass: "no-close",
			modal : true,
			autoOpen : false,
			closeOnEscape : false,
			height : 100,
			resizable : false,
			open : function() {
				progressbar.progressbar("option", "value", 10);
				common_operate.updateProgress();
			}
		});
	},// 进度条更新
	progress : function(progressbar) {
		var progressbar = $("#divProgressbar"), val = progressbar.progressbar(
				"option", "value") || 0;
		progressbar.progressbar("value", val + Math.floor(Math.random() * 3));
		if (val <= 99) {
			common_operate.updateProgress();
		} else {
			progressbar
					.progressbar("value", 10 + Math.floor(Math.random() * 3));
			common_operate.updateProgress();
		}
	},
	/***
	 * 更新进度条
	 */
	updateProgress : function(){	
		timeoutId = setTimeout(common_operate.progress, 10);
	},
	/**
	 * 结束进度条
	 */
	endProgress : function(){
		dialog.dialog("close");
		clearTimeout(timeoutId);
	},
	/**
	 * 添加手图标到下拉框
	 * 
	 * @param element
	 * @param type
	 */
	addIconToCombo : function(element, type) {
		var icon = "<a href='javascript:void(0)' onclick='common_operate.show"
				+ type + "(\"" + element
				+ "\")'><img src='/am/images/a.png' style='height:22px;'></a>";
		var width = $("#" + element).width();
		$("#" + element).css("width", width - 30);
		$("#" + element).after(icon);
	},// 在操作元素上加操作图标-添加保证资产
	addCollateralIcon : function(element) {
		common_operate.addIconToCombo(element, "Collateral");
	},
	// 弹出保证资产窗口
	showCollateral : function(element) {// 与o32对接时用项目代码 ，否则用产品代码
		var vc_product_id;
		var field_name;
		vc_product_id = Horn.getComp("vc_product_id").getValue();
		 field_name="vc_product_id";
		if (!vc_product_id) {
			TDialog.Msg.warning("提示", "请先选择需要的基金代码！");
			return;
		}else{
			Horn.getCompById("collateralTable").unSelectAll();
			Horn.getCompById("collateralWin").show();
			common_reg.formforqueryreset("collateralForm");
			Horn.getCompById("vc_product_id_bz").setValue(vc_product_id);
		}
		// 查询对应产品下的保证资产 或者对于项目下
		eval("var obj = {"+field_name+":vc_product_id};");
		obj.vc_collateral_status = "0,1,2,4";
		Horn.getCompById("collateralTable").setBaseParams(obj);
		Horn.getCompById("collateralTable").load();
		$(".hc-datagrid-toolbar").hide();
		$("#celement").val(element);
	},// 选择保证资产
	selectCollateral : function() {
		var grid = Horn.getComp("collateralTable").getSelecteds();
		if (grid.length < 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var element = $("#celement").val();
		var arr = [];

		for ( var i = 0, j = grid.length; i < j; i++) {
			arr.push(grid[i].l_collateral_no);			
		}
		
		Horn.getCompById(element).setValue(arr.join());
		Horn.getCompById("collateralWin").hide();
	},// 查询保证资产
	queryCollecterals : function(element, type) {
		var vc_product_id;
//		var field_name;
		vc_product_id = Horn.getCompById("vc_product_id" + type).getValue();
		field_name="vc_product_id";
	    var url = "/am/am/business/collateral/queryCollecterals.json";
		var obj = {};
		obj.vc_collateral_status = "0,1,2,4";
		obj.vc_product_id = vc_product_id;
		

		query_operate.doPost(url, obj, function(result) {
			if (result) {
				collecterals = result;
				Horn.getCompById(element).addItems(result, true);

				if (type == '_edit')
				{
					var vc_stock_code = Horn.getComp("vc_stock_code").getValue();
					var l_action_in;
					var l_busin_flag;
					var l_serial_no;
					try
					{
						l_action_in = Horn.getComp("l_action_in").getValue();
						l_busin_flag = Horn.getComp("l_busin_flag").getValue();
						l_serial_no = Horn.getComp("l_serial_no").getValue();						
					}
					catch (e)
					{}
					
					if (l_busin_flag == 22204 && l_action_in != 1)
					{
						var data = "vc_input_name1=l_dictate_serial_no&" + "vc_input_value1="
						+ l_serial_no + "&vc_input_name2=vc_field_name&" + "vc_input_value2=vc_collateral_no"
						+"&vc_input_table=changeinfodetail"
						+ "&vc_output_name1=vc_new_value";					
					}
					else
					{
						var data = "vc_input_name1=vc_stock_code&" + "vc_input_value1="
						+ vc_stock_code + "&vc_input_table=stockcollateral"
						+ "&vc_output_name1=l_collateral_no"
						+ "&vc_output_name2=vc_stock_code";
					}
					// 查询关联资产
					var url = "/am/am/business/collateral/queryRCollecterals.json";

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
				}
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	// 保证资产加载成功的回调函数
	testloadSuccess : function() {
		var selectIds = Horn.getComp("vc_collateral_no").getValue();
		var text = "";
		var arr = selectIds.split(",");
		if (arr.length < 1) {
			return;
		}
		$("#data_table_collateralTable tr").each(function(index) {
			text = $(this).find("td:eq(2) > div").text();
			for ( var i = 0, j = arr.length; i < j; i++) {
				if (text == arr[i]) {
					Horn.getCompById("collateralTable").select(index);
					continue;
				}
			}
		});
		Horn.getCompById("vc_product_id_query").setValue(
				Horn.getComp("vc_product_id").getValue());
	},
	// 用户（分部门）加载成功的回调函数
	testloadOperSuccess : function() {
		var selectIds = Horn.getCompById("selectval_opb").getValue();
		var text = "";
		var arr = selectIds.split(",");
		if (arr.length < 1) {
			return;
		}
		$("#data_table_OperatorbybranchTable tr").each(function(index) {
			text = $(this).find("td:eq(2) > div").text();
			for ( var i = 0, j = arr.length; i < j; i++) {
				if (text == arr[i]) {
					Horn.getCompById("OperatorbybranchTable").select(index);
					break;
				}
			}
		});
	},
	// 基金信息：弹出用户（分部门）窗口
	showOperatorbybranchJJ : function(element) {
		var vc_branch_id = Horn.getCompById("vc_branch_id_7").getValue();
		var selectId = Horn.getCompById(element).getValue();
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showOperatorbybranch2JJ(vc_branch_id,selectId,element);
    	}else{
			Horn.getCompById("OperatorbybranchWin").show();
			common_reg.formforqueryreset("OperatorbybranchForm");
			Horn.getCompById("selectval_opb").setValue(selectId);
//			Horn.getCompById("vc_project_manager_opb").setValue(vc_project_manager);
			Horn.getCompById("vc_branch_id_opbquery").setValue(vc_branch_id);
			$("#element_opb").val(element);
			 var url=Horn.getCompById("Operatorbybranch_url").getValue();
			 $.post("/am/am/system/project/operbybranchlist.json?vc_operators="+selectId, null, function(data) {
					$("#foo2").html("");
			        $("#bar2").html("");
			        var  idstring2='';
			        if (data.rows != null) {
			    			var arr=data.rows;
			    			var html="";
			    			for(var i=0;i<arr.length;i++){
			    	            html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
			    	            if(idstring2==''){
			 						idstring2=idstring2+arr[i].vc_op_code;
			 					}else{
			 							idstring2=idstring2+","+arr[i].vc_op_code;
			 					}
			    			}
			    			$("#bar2").html(html);
			    	}
			        //做判断弹开界面如果有选择查询条件才进行查询
			        var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
			      	 var vc_op_code_opbquery=Horn.getCompById("vc_op_code_opbquery").getValue();
			      	 var vc_op_name_opbquery=Horn.getCompById("vc_op_name_opbquery").getValue();
			   		if((vc_branch_id==""||vc_branch_id==null)&&(vc_op_code_opbquery==""||vc_op_code_opbquery==null)&&(vc_op_name_opbquery==""||vc_op_name_opbquery==null)){
			   				
			   		}else{
			   			$.post(url+"?vc_operators="+idstring2, Horn.getCompById("OperatorbybranchForm").getValues(), function(data2) {
				    		if (data2.rows != null) {
				    			var arr=data2.rows;
				    			var html="";
				    			for(var i=0;i<arr.length;i++){
				    				   html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";		
				    			}
				    			$("#foo2").html(html); 
				    		}
				    	});	
			   		}
	       }, "json"); 
    	}
	},
	// 弹出用户（分部门）窗口
	showOperatorbybranch : function(element) {
		var vc_branch_id = Horn.getCompById("vc_branch_id_4").getValue();
		var vc_project_manager= Horn.getCompById("vc_project_manager_4").getValue();
		var selectId = Horn.getCompById(element).getValue();
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showOperatorbybranch2(vc_project_manager,vc_branch_id,selectId,element);
    	}else{
			//Horn.getCompById("OperatorbybranchTable").unSelectAll();
			Horn.getCompById("OperatorbybranchWin").show();
			common_reg.formforqueryreset("OperatorbybranchForm");
			Horn.getCompById("selectval_opb").setValue(selectId);
			Horn.getCompById("vc_project_manager_opb").setValue(vc_project_manager);
			Horn.getCompById("vc_branch_id_opbquery").setValue(vc_branch_id);
			$("#element_opb").val(element);
			 var url=Horn.getCompById("Operatorbybranch_url").getValue();
			 $.post("/am/am/system/project/operbybranchlist.json?vc_operators="+selectId, null, function(data) {
					$("#foo2").html("");
			        $("#bar2").html("");
			        var  idstring2='';
			        if (data.rows != null) {
			    			var arr=data.rows;
			    			var html="";
			    			for(var i=0;i<arr.length;i++){
			    	            html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
			    	            if(idstring2==''){
			 						idstring2=idstring2+arr[i].vc_op_code;
			 					}else{
			 							idstring2=idstring2+","+arr[i].vc_op_code;
			 					}
			    			}
			    			$("#bar2").html(html);
			    	}
			        idstring2=idstring2+","+vc_project_manager;
			        //做判断弹开界面如果有选择查询条件才进行查询
			        var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
			      	 var vc_op_code_opbquery=Horn.getCompById("vc_op_code_opbquery").getValue();
			      	 var vc_op_name_opbquery=Horn.getCompById("vc_op_name_opbquery").getValue();
			   		if((vc_branch_id==""||vc_branch_id==null)&&(vc_op_code_opbquery==""||vc_op_code_opbquery==null)&&(vc_op_name_opbquery==""||vc_op_name_opbquery==null)){
			   				
			   		}else{
			   			$.post(url+"?vc_operators="+idstring2, Horn.getCompById("OperatorbybranchForm").getValues(), function(data2) {
				    		if (data2.rows != null) {
				    			var arr=data2.rows;
				    			var html="";
				    			for(var i=0;i<arr.length;i++){
				    				   html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";		
				    			}
				    			$("#foo2").html(html); 
				    		}
				    	});	
			   		}
	       }, "json"); 
			//common_operate.formQuery('OperatorbybranchTable','OperatorbybranchForm');
    	}
	},// 弹出用户（分部门）传参调用
	showOperatorbybranch2 : function(vc_project_manager,vc_branch_id,selectId,element) {
	    Horn.getCompById("dictype_opb").setValue("1");
        //Horn.getCompById("OperatorbybranchTable").unSelectAll();
		Horn.getCompById("OperatorbybranchWin").show();
		common_reg.formforqueryreset("OperatorbybranchForm");
		Horn.getCompById("selectval_opb").setValue(selectId);
		Horn.getCompById("vc_project_manager_opb").setValue(vc_project_manager);
		Horn.getCompById("vc_branch_id_opbquery").setValue(vc_branch_id);
		//$("#wrap_OperatorbybranchTable > div.hc-datagrid-toolbar").hide();
		$("#element_opb").val(element);
		 var url=Horn.getCompById("Operatorbybranch_url").getValue();
		 $.post("/am/am/system/project/operbybranchlist.json?vc_operators="+selectId, null, function(data) {
				$("#foo2").html("");
		        $("#bar2").html("");
		        var  idstring2='';
		        if (data.rows != null) {
		    			var arr=data.rows;
		    			var html="";
		    			for(var i=0;i<arr.length;i++){
		    	            html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
		    	            if(idstring2==''){
		 						idstring2=idstring2+arr[i].vc_op_code;
		 					}else{
		 							idstring2=idstring2+","+arr[i].vc_op_code;
		 					}
		    			}
		    			$("#bar2").html(html);
		    	}
		        idstring2=idstring2+","+vc_project_manager;
		      //做判断弹开界面如果有选择查询条件才进行查询
		        var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
		      	 var vc_op_code_opbquery=Horn.getCompById("vc_op_code_opbquery").getValue();
		      	 var vc_op_name_opbquery=Horn.getCompById("vc_op_name_opbquery").getValue();
		   		if((vc_branch_id==""||vc_branch_id==null)&&(vc_op_code_opbquery==""||vc_op_code_opbquery==null)&&(vc_op_name_opbquery==""||vc_op_name_opbquery==null)){
		   				
		   		}else{
			        $.post(url+"?vc_operators="+idstring2, Horn.getCompById("OperatorbybranchForm").getValues(), function(data2) {
			    		if (data2.rows != null) {
			    			var arr=data2.rows;
			    			var html="";
			    			for(var i=0;i<arr.length;i++){
			    				   html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";		
			    			}
			    			$("#foo2").html(html); 
			    		}
			    	});
		   		}
       }, "json"); 
    },
    showOperatorbybranch2JJ : function(vc_branch_id,selectId,element) {
	    Horn.getCompById("dictype_opb").setValue("1");
		Horn.getCompById("OperatorbybranchWin").show();
		common_reg.formforqueryreset("OperatorbybranchForm");
		Horn.getCompById("selectval_opb").setValue(selectId);
		Horn.getCompById("vc_branch_id_opbquery").setValue(vc_branch_id);
		//$("#wrap_OperatorbybranchTable > div.hc-datagrid-toolbar").hide();
		$("#element_opb").val(element);
		 var url=Horn.getCompById("Operatorbybranch_url").getValue();
		 $.post("/am/am/system/project/operbybranchlist.json?vc_operators="+selectId, null, function(data) {
				$("#foo2").html("");
		        $("#bar2").html("");
		        var  idstring2='';
		        if (data.rows != null) {
		    			var arr=data.rows;
		    			var html="";
		    			for(var i=0;i<arr.length;i++){
		    	            html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
		    	            if(idstring2==''){
		 						idstring2=idstring2+arr[i].vc_op_code;
		 					}else{
		 							idstring2=idstring2+","+arr[i].vc_op_code;
		 					}
		    			}
		    			$("#bar2").html(html);
		    	}
		      //做判断弹开界面如果有选择查询条件才进行查询
		        var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
		      	 var vc_op_code_opbquery=Horn.getCompById("vc_op_code_opbquery").getValue();
		      	 var vc_op_name_opbquery=Horn.getCompById("vc_op_name_opbquery").getValue();
		   		if((vc_branch_id==""||vc_branch_id==null)&&(vc_op_code_opbquery==""||vc_op_code_opbquery==null)&&(vc_op_name_opbquery==""||vc_op_name_opbquery==null)){
		   				
		   		}else{
			        $.post(url+"?vc_operators="+idstring2, Horn.getCompById("OperatorbybranchForm").getValues(), function(data2) {
			    		if (data2.rows != null) {
			    			var arr=data2.rows;
			    			var html="";
			    			for(var i=0;i<arr.length;i++){
			    				   html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";		
			    			}
			    			$("#foo2").html(html); 
			    		}
			    	});
		   		}
       }, "json"); 
    },
    //项目其他人员制定查询
    Operatorbybranchformquery: function(){
   	 var url=Horn.getCompById("Operatorbybranch_url").getValue();
   	 var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
   	 var vc_project_manager=Horn.getCompById("vc_project_manager_opb").getValue();
   	 var vc_op_code_opbquery=Horn.getCompById("vc_op_code_opbquery").getValue();
   	 var vc_op_name_opbquery=Horn.getCompById("vc_op_name_opbquery").getValue();
		if((vc_branch_id==""||vc_branch_id==null)&&(vc_op_code_opbquery==""||vc_op_code_opbquery==null)&&(vc_op_name_opbquery==""||vc_op_name_opbquery==null)){
				Horn.Tip.warn("请选择至少一个部门！");
		}else{
			var  idstring2='';
			$("#bar2").find("li").each(function(){
				var f=$(this).find("input:checkbox").attr("name");
				if(f){
					if(idstring2==''){
						idstring2=idstring2+f;
					}else{
							idstring2=idstring2+","+f;
					}
				}
			});
			if(idstring2==''){
				idstring2=idstring2+vc_project_manager;
			}else{
				idstring2=idstring2+","+vc_project_manager;
			}
			$.post(url+"?vc_operators="+idstring2, Horn.getCompById("OperatorbybranchForm").getValues(), function(data) {
	    		if (data.rows != null) {
	    			var arr=data.rows;
	    			var html="";
	    			for(var i=0;i<arr.length;i++){
	    			   html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
	    			}
	    			$("#foo2").html(html);
	    		}
	    	});
		}
   },
    // 选择用户（分部门）
	selectOperatorbybranch : function() {
		var  idstring2='';
		$("#bar2").find("li").each(function(){
			var f=$(this).find("input:checkbox").attr("name");
			if(f){
				if(idstring2==''){
					idstring2=idstring2+f;
				}else{
						idstring2=idstring2+","+f;
				}
			}
		});
		var element = $("#element_opb").val();
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_opb").getValue();
		if(dictype=='1'){
			common_operate.settextvalue(element,idstring2);
		}else{
			Horn.getCompById(element).setValue(idstring2);
		}
		Horn.getCompById("OperatorbybranchWin").hide();
	},// 查询用户（分部门）
	queryOperatorbybranch : function(element,vc_operators) {
		var url = "/am/am/system/project/operbybranchlist.json";
		var data = "vc_operators="+vc_operators;
		query_operate.ajax(url, data, function(result) {
			if (result) {
				collecterals = result;
				Horn.getCompById(element).addItems(result, true);
			}
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON,"",false);
	},
	// 在操作元素上加操作图标-添加对手方
	addRivalIcon : function(element) {
		common_operate.addIcon(element, "Rival");
	},// 弹出对手方帐户窗口
	showRivalAccount : function(element_ra) {
		 var type = Horn.getCompById("htype").getValue();
		var selectId = Horn.getCompById("l_rival_account_id_" + type).getValue();
		var l_rival_id = Horn.getCompById("l_rival_id_" + type).getValue();
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showRivalAccount2(l_rival_id,selectId,element_ra);
    	}else{
    		var text = "";
		   // var type = Horn.getCompById("htype").getValue();
			Horn.getCompById("l_rival_id_ra").setValue(l_rival_id);
			$("#wrap_rivalAccountTable > div.hc-datagrid-toolbar").hide();
			$("#element_ra").val(element_ra);
			Horn.getCompById("rivalAccountWin").show();
			// 查询对应产品下的保证资产
			Horn.getCompById("rivalAccountTable").setBaseParams({l_rival_id:l_rival_id,l_action_in:1});
			Horn.getCompById("rivalAccountTable").load();
			Horn.getCompById("rivalAccountTable").unSelectAll();
			$("#data_table_rivalAccountTable tr").each(function(index) {
				text = $(this).find("td:eq(2) > div").text();
				if (text == selectId) {
					Horn.getCompById("rivalAccountTable").select(index);
					return;
				}
			});
    	}
	},
	// //弹出对手方账户传参调用
	showRivalAccount2 : function(l_rival_id,selectId,element_ra) {
			var text = "";
		    Horn.getCompById("dictype_ra").setValue("1");
			Horn.getCompById("l_rival_id_ra").setValue(l_rival_id);
			$("#wrap_rivalAccountTable > div.hc-datagrid-toolbar").hide();
			$("#element_ra").val(element_ra);
			Horn.getCompById("rivalAccountWin").show();
			// 查询对应产品下的保证资产
			Horn.getCompById("rivalAccountTable").setBaseParams({l_rival_id:l_rival_id,l_action_in:1});
			Horn.getCompById("rivalAccountTable").load();
			Horn.getCompById("rivalAccountTable").unSelectAll();
			$("#data_table_rivalAccountTable tr").each(function(index) {
				text = $(this).find("td:eq(2) > div").text();
				if (text == selectId) {
					Horn.getCompById("rivalAccountTable").select(index);
					return;
				}
			});
	},

	// 选择对手方帐户
	selectRivalAccount : function() {
		var grid = Horn.getComp("rivalAccountTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		var element = $("#element_ra").val();
		var obj = {};
		obj.code = grid[0].l_serial_no;
		obj.text = grid[0].vc_branch_name + " " + grid[0].vc_user_name+" "+grid[0].vc_bank_account;
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_ra").getValue();
		if(dictype=='1'){
			// document.getElementById('rightMain').contentWindow.common_operate.selectRival2(element,obj);
			common_operate.selectRival2(element,obj);
		}else{
			Horn.getCompById(element).addItems([ obj ], true);
			Horn.getCompById(element).selectFirst();
		}
		Horn.getCompById("rivalAccountWin").hide();
	},
	// 弹出所属集团窗口
	showgroupRival : function(element2) {
		var selectId = Horn.getCompById(element2).getValue();
		var text = "";
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showgroupRival2(selectId,element2);
    	}else{
			// 对手方
			Horn.getCompById("rivalTable").unSelectAll();
			Horn.getCompById("rivalWin").show();
			Horn.getCompById("l_rival_id__query").setValue(selectId);
			Horn.getCompById("c_group_flag__query").setValue("1");
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_rivalTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("rivalTable").select(index);
						return;
					}
				});
			}
			$("#wrap_rivalTable > div.hc-datagrid-toolbar").hide();
			$("#element").val(element2);
			common_operate.formQuery('rivalTable','rivalForm');
    	}
	},// 弹出所属集团窗口
	showgroupRival2 : function(selectId,element2) {
		var text = "";
		Horn.getCompById("dictype").setValue("1");
		  // 对手方
			Horn.getCompById("rivalTable").unSelectAll();
			Horn.getCompById("rivalWin").show();
			Horn.getCompById("l_rival_id__query").setValue(selectId);
			Horn.getCompById("c_group_flag__query").setValue("1");
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_rivalTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("rivalTable").select(index);
						return;
					}
				});
			}
			$("#wrap_rivalTable > div.hc-datagrid-toolbar").hide();
			$("#element").val(element2);
			common_operate.formQuery('rivalTable','rivalForm');
    	
	},
	// 弹出对手方窗口
	showRival : function(element2) {
		var selectId = Horn.getCompById(element2).getValue();
		var text = "";
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showRival2(selectId,element2);
    	}else{
			// 对手方
			Horn.getCompById("rivalTable").unSelectAll();
			Horn.getCompById("rivalWin").show();
			common_reg.formforqueryreset("rivalForm");
			Horn.getCompById("l_rival_id__query").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_rivalTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("rivalTable").select(index);
						return;
					}
				});
			}
			$("#wrap_rivalTable > div.hc-datagrid-toolbar").hide();
			$("#element").val(element2);
			common_operate.formQuery('rivalTable','rivalForm');
    	}
	},// 弹出对手方传参调用
	showRival2 : function(selectId,element2) {
		var text = "";
		Horn.getCompById("dictype").setValue("1");
		  // 对手方
			Horn.getCompById("rivalTable").unSelectAll();
			Horn.getCompById("rivalWin").show();
			common_reg.formforqueryreset("rivalForm");
			Horn.getCompById("l_rival_id__query").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_rivalTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("rivalTable").select(index);
						return;
					}
				});
			}
			$("#wrap_rivalTable > div.hc-datagrid-toolbar").hide();
			$("#element").val(element2);
			common_operate.formQuery('rivalTable','rivalForm');
    	
	},
	// 选择对手方
	selectRival : function() {
		var grid = Horn.getComp("rivalTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		var element = $("#element").val();
		var obj = {};
		obj.code = grid[0].l_rival_id;
		obj.text = grid[0].vc_all_name;
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype").getValue();
		if(dictype=='1'){
			// document.getElementById('rightMain').contentWindow.common_operate.selectRival2(element,obj);
			common_operate.selectRival2(element,obj);
		}else{
			Horn.getCompById(element).addItems([ obj ], true);
			Horn.getCompById(element).selectFirst();
		}
		Horn.getCompById("rivalWin").hide();
	},
	// 弹出金融产品发行人评级窗口
	showinvestproductRival : function(element2) {
		var type2;
		if(element2=="l_publisher_id"){
		    type2="";
	    }else if(element2=="l_publisher_id_edit"){
		    type2="_edit";
	    }else{
	    	type2="_look";
	    }
		//银行理财产品时只显示有评级的对手方
		 var c_product_type = Horn.getCompById("c_product_type" + type2).getValue();
		var c_use_flag;
		if(c_product_type=="5"){
			c_use_flag=1;
		}else{
			c_use_flag=0;
		}
		var selectId = Horn.getCompById(element2).getValue();
		var text = "";
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showinvestproduct2(selectId,element2,c_use_flag);
    	}else{
    		//用于过滤是否有评级
    		Horn.getCompById("c_use_flag_query").setValue(c_use_flag);
			// 对手方
			Horn.getCompById("rivalTable").unSelectAll();
			Horn.getCompById("rivalWin").show();
			common_reg.formforqueryreset("rivalForm");
			Horn.getCompById("l_rival_id__query").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_rivalTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("rivalTable").select(index);
						return;
					}
				});
			}
			$("#wrap_rivalTable > div.hc-datagrid-toolbar").hide();
			$("#element").val(element2);
			common_operate.formQuery('rivalTable','rivalForm');
    	}
	},// 弹出金融产品发行人评级传参调用
	showinvestproduct2 : function(selectId,element2,c_use_flag) {
		var text = "";
		Horn.getCompById("c_use_flag_query").setValue(c_use_flag);
		Horn.getCompById("dictype").setValue("1");
		  // 对手方
			Horn.getCompById("rivalTable").unSelectAll();
			Horn.getCompById("rivalWin").show();
			common_reg.formforqueryreset("rivalForm");
			Horn.getCompById("l_rival_id__query").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_rivalTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("rivalTable").select(index);
						return;
					}
				});
			}
			$("#wrap_rivalTable > div.hc-datagrid-toolbar").hide();
			$("#element").val(element2);
			common_operate.formQuery('rivalTable','rivalForm');
    	
	},
	// 指令界面调用下拉框赋值
	selectRival2 : function(element,obj) {
		Horn.getCompById(element).addItems([ obj ], true);
		Horn.getCompById(element).selectFirst();
	},
	// 指令界面调用文本域赋值
	settextvalue : function(element,value) {
		Horn.getCompById(element).setValue(value);
	},
	// 弹出部门窗口
	showBranch : function(element2) {
		var selectId = Horn.getCompById(element2).getValue();
		var text = "";
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showBranch2(selectId,element2);
    	}else{
			// 部门
			Horn.getCompById("BranchTable").unSelectAll();
			Horn.getCompById("BranchWin").show();
			common_reg.formforqueryreset("BranchForm");
			Horn.getCompById("vc_branch_id_brquery").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_BranchTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("BranchTable").select(index);
						return;
					}
				});
			}
			$("#wrap_BranchTable > div.hc-datagrid-toolbar").hide();
			$("#element_br").val(element2);
			common_operate.formQuery('BranchTable','BranchForm');
    	}
	},// 弹出部门传参调用
	showBranch2 : function(selectId,element2) {
		var text = "";
		Horn.getCompById("dictype_br").setValue("1");
		  // 对手方
			Horn.getCompById("BranchTable").unSelectAll();
			Horn.getCompById("BranchWin").show();
			common_reg.formforqueryreset("BranchForm");
			Horn.getCompById("vc_branch_id_brquery").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_BranchTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("BranchTable").select(index);
						return;
					}
				});
			}
			$("#wrap_BranchTable > div.hc-datagrid-toolbar").hide();
			$("#element_br").val(element2);
			common_operate.formQuery('BranchTable','BranchForm');
    	
	},
	// 选择部门
	selectBranch : function() {
		var grid = Horn.getComp("BranchTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		var element = $("#element_br").val();
		var obj = {};
		obj.code = grid[0].vc_branch_id;
		obj.text = grid[0].vc_branch_caption;
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_br").getValue();
		if(dictype=='1'){
			// document.getElementById('rightMain').contentWindow.common_operate.selectRival2(element,obj);
			common_operate.selectBranch2(element,obj);
		}else{
			Horn.getCompById(element).addItems([ obj ], true);
			Horn.getCompById(element).selectFirst();
		}
		Horn.getCompById("BranchWin").hide();
	},// 指令界面调用赋值
	selectBranch2 : function(element,obj) {
		Horn.getCompById(element).addItems([ obj ], true);
		Horn.getCompById(element).selectFirst();
	},
	// 弹出用户窗口
	showOperator : function(element2) {
		var selectId = Horn.getCompById(element2).getValue();
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showOperator2(selectId,element2);
    	}else{
			// 用户
			Horn.getCompById("OperatorTable").unSelectAll();
			Horn.getCompById("OperatorWin").show();
			common_reg.formforqueryreset("OperatorForm");
			Horn.getCompById("vc_op_code_opquery").setValue(selectId);
			$("#wrap_OperatorTable > div.hc-datagrid-toolbar").hide();
			$("#element_op").val(element2);
			common_operate.formQuery('OperatorTable','OperatorForm');
    	}
	},// 弹出用户传参调用
	showOperator2 : function(selectId,element2) {
		    Horn.getCompById("dictype_op").setValue("1");
		    Horn.getCompById("OperatorTable").unSelectAll();
			Horn.getCompById("OperatorWin").show();
			common_reg.formforqueryreset("OperatorForm");
			Horn.getCompById("vc_op_code_opquery").setValue(selectId);
			$("#wrap_OperatorTable > div.hc-datagrid-toolbar").hide();
			$("#element_op").val(element2);
			common_operate.formQuery('OperatorTable','OperatorForm');
    	
	},
	// 用户加载成功的回调函数
	testloadOpSuccess : function() {
		var selectId = Horn.getCompById("vc_op_code_opquery").getValue();
		var text = "";
		if(selectId!=null&&selectId!=""){
			$("#data_table_OperatorTable tr").each(function(index) {
				text = $(this).find("td:eq(2) > div").text();
				if (text == selectId) {
					Horn.getCompById("OperatorTable").select(index);
					return;
				}
			});
		}
	},
	// 选择用户
	selectOperator : function() {
		var grid = Horn.getComp("OperatorTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		var element = $("#element_op").val();
		var obj = {};
		obj.code = grid[0].vc_op_code;
		obj.text = grid[0].vc_op_name;
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_op").getValue();
		if(dictype=='1'){
			// document.getElementById('rightMain').contentWindow.common_operate.selectRival2(element,obj);
			common_operate.selectOperator2(element,obj);
		}else{
			Horn.getCompById(element).addItems([ obj ], true);
			Horn.getCompById(element).selectFirst();
		}
		Horn.getCompById("OperatorWin").hide();
	},// 指令界面调用赋值
	selectOperator2 : function(element,obj) {
		Horn.getCompById(element).addItems([ obj ], true);
		Horn.getCompById(element).selectFirst();
	},
	// 合同信息选择窗口
	showStockCode : function(element2){
		var selectId = Horn.getCompById(element2).getValue();
		var text = "";
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showStockCode2(selectId,element2);
    	}else{
			// 合同
			Horn.getCompById("StockCodeTable").unSelectAll();
			Horn.getCompById("StockCodeWin").show();
			Horn.getCompById("vc_stock_code_brquery").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_StockCodeTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("StockCodeTable").select(index);
						return;
					}
				});
			}
			$("#wrap_StockCodeTable > div.hc-datagrid-toolbar").hide();
			$("#element_br").val(element2);
			common_operate.formQuery('StockCodeTable','StockCodeForm');
    	}
		
	},
	// 弹出合同传参
	showStockCode2 : function(selectId,element2) {
		var text = "";
		Horn.getCompById("dictype_br").setValue("1");
		  
			Horn.getCompById("StockCodeTable").unSelectAll();
			Horn.getCompById("StockCodeWin").show();
			Horn.getCompById("vc_stock_code_brquery").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_StockCodeTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("StockCodeTable").select(index);
						return;
					}
				});
			}
			$("#wrap_StockCodeTable > div.hc-datagrid-toolbar").hide();
			$("#element_br").val(element2);
			common_operate.formQuery('StockCodeTable','StockCodeForm');
    	
	},
	// 选择合同
	selectStockCode : function() {
		var grid = Horn.getComp("StockCodeTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		var element = $("#element_br").val();
		var obj = {};
		obj.code = grid[0].vc_stock_code;
		obj.text = grid[0].vc_stock_name;
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_br").getValue();
		if(dictype=='1'){
			// document.getElementById('rightMain').contentWindow.common_operate.selectRival2(element,obj);
			common_operate.selectStockCode2(element,obj);
		}else{
			Horn.getCompById(element).addItems([ obj ], true);
			Horn.getCompById(element).selectFirst();
		}
		Horn.getCompById("StockCodeWin").hide();
	},// 指令界面调用赋值
	selectStockCode2 : function(element,obj) {
		Horn.getCompById(element).addItems([ obj ], true);
		Horn.getCompById(element).selectFirst();
	},
	
	// 弹出产品窗口
	showProduct: function(element2) {
		var selectId = Horn.getCompById(element2).getValue();
		var text = "";
		var s=$("#buttonId").val();
    	if(s){
    		common_operate.showProduct2(selectId,element2);
    	}else{
			// 产品
			Horn.getCompById("ProductTable").unSelectAll();
			Horn.getCompById("ProductWin").show();
			Horn.getCompById("vc_product_id_prquery").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId){
				$("#data_table_ProductTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("ProductTable").select(index);
						return;
					}
				});
			}
			$("#wrap_ProductTable > div.hc-datagrid-toolbar").hide();
			$("#element_pr").val(element2);
			common_operate.formQuery('ProductTable','ProductForm');
    	}
	},// 弹出产品传参调用
	showProduct2 : function(selectId,element2) {
		var text = "";
		Horn.getCompById("dictype_pr").setValue("1");
		  // 产品
			Horn.getCompById("ProductTable").unSelectAll();
			Horn.getCompById("ProductWin").show();
			Horn.getCompById("vc_product_id_prquery").setValue(selectId);
			// 传入参数不为空时选中值
			if(selectId!=null&&selectId!=""){
				$("#data_table_ProductTable tr").each(function(index) {
					text = $(this).find("td:eq(2) > div").text();
					if (text == selectId) {
						Horn.getCompById("ProductTable").select(index);
						return;
					}
				});
			}
			$("#wrap_ProductTable > div.hc-datagrid-toolbar").hide();
			$("#element_pr").val(element2);
			common_operate.formQuery('ProductTable','ProductForm');
    	
	},
	// 选择产品
	selectProduct : function() {
		var grid = Horn.getComp("ProductTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		var element = $("#element_pr").val();
		var obj = {};
		obj.code = grid[0].vc_product_id;
		obj.text = grid[0].vc_fund_code_hidden + "-" + grid[0].vc_product_name;
		// 判断是指令调用还是普通页面调用（指令为1）
		var dictype=Horn.getCompById("dictype_pr").getValue();
		if(dictype=='1'){
			// document.getElementById('rightMain').contentWindow.common_operate.selectRival2(element,obj);
			common_operate.selectProduct2(element,obj);
		}else{
			Horn.getCompById(element).addItems([ obj ], true);
			Horn.getCompById(element).selectFirst();
		}
		Horn.getCompById("ProductWin").hide();
	},// 指令界面调用赋值
	selectProduct2 : function(element,obj) {
		Horn.getCompById(element).addItems([ obj ], true);
		Horn.getCompById(element).selectFirst();
	},
	// 查询对手方
	query_l_rival_obj : function(element, value) {
		if (!value) {
			value = Horn.getCompById(element).getValue();
		}
		// var value = Horn.getCompById(element).getValue();
		var url = "/am/am/business/loanrival/getLrival.json";
		var data = "vc_input_name1=l_rival_id&" + "vc_input_value1=" + value
				+ "&vc_input_table=loanrival" + "&vc_output_name1=l_rival_id"
				+ "&vc_output_name2=vc_name";
		query_operate.doPost(url, data, function(result) {
			if (result && result.query) {
				var obj = {};
				obj.code = result.query.l_rival_id;
				obj.text = result.query.vc_all_name;
				Horn.getCompById(element).addItems([ obj ], true);
				Horn.getCompById(element).selectFirst();
			} else {
				// Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},
	// 查询证券代码-智能输入
	queryStockcodes : function(target, sclbValue,targetid) {
		var url = "/am/am/system/dctionary/queryStockcodes.json";
		var data;
		// 查询全部证券代码
		if(!sclbValue){
			data = "vc_input_table=stockcodes";
		}
		else{// 根据市场类别，查询证券代码
			data = "vc_input_table=stockcodes&" + "business_type=" + sclbValue;
		}
		query_operate.doPost(url, data, function(result) {
			if (result) {
				common_operate.autoMatch(target, result, true,targetid);
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	/***************************************************************************
	 * 对指定元素进行智能输入绑定
	 * 
	 * @param target要绑定的元素
	 * @param sourceArr给元素绑定的值
	 * @param isReload是否进行重新绑定
	 */
	autoMatch : function(target,sourceArr,isReload,targetid){
		if(typeof isReload == "boolean" && isReload){
			$(target).unautocomplete();
		}
		$(target).autocomplete(sourceArr, {
			max : 1000, // 列表里的条目数
			minChars : 1, // 自动完成激活之前填入的最小字符
			width : 180, // 提示的宽度，溢出隐藏
			scrollHeight : 240, // 提示的高度，溢出显示滚动条
			matchContains : true, // 包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
			autoFill : false, // 自动填充
			mustMatch : false,// 只会允许匹配的结果出现在输入框,
			formatItem : function(row, i, max) {
				return row.code + " " + row.text;
			},
			formatMatch : function(row, i, max) {
				return row.code + row.text;
			},
			formatResult : function(row) {
				return row.code;
			}
		}).result(function(event, row, formatted) {// 此事件会在用户选中某一项后触发
			if(targetid){
			 Horn.getComp(targetid).validate();
			}
		});
	},
	// 查询产品代码--用于查询
	addQueryCpdm : function(target){
		var url = "/am/am/business/stockcodesex/queryCpdm.json?l_function_no=" + functionIds.stockcodesex.query_cpdm_q;
		query_operate.ajax(url, "", function(result) {
			if (result) {
				common_operate.autoMatch(target, result);
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	// 处理对象里面的"undefined"或undefined
	getNotNullObj : function(obj) {
		for ( var key in obj) {
			console.log(key + obj[key]);
			console.log(obj[key] == "undefined");
			if (obj[key] == "undefined" || obj[key] == ""
					|| obj[key] == undefined) {
				obj[key] = " ";
			}
		}
	},
	// 处理对象里面的"undefined"或undefined或""或null
	trimObj : function(obj) {
		for ( var key in obj) {
			if (obj[key] == "undefined" || obj[key] == " "
					|| obj[key] == undefined || obj[key] == null) {
				obj[key] = "";
			}
		}
	},
	// 处理利率金额类
	parseFloats : function(value) {
		if (value && value != " ") {
			return value / 100;
		} else {
			return value;
		}
	},// 刷新打开的tab页面
	refreshUrl : function(type) {
		var frames = window.parent.document.getElementsByTagName('iframe');
		for ( var i = 0; i < frames.length; i++) {
			var f = frames[i].contentWindow;
			var location = f.location;
			if (location) {
				var href = location.href;
				if (href.indexOf(urls[type]) != -1) {
// f.location.reload();
					f.formQuery();
				}
			}
		}		
	},

	/**
	 * 判断用户的业务操作权限:发起操作
	 * @param gridId
	 * @param buttonType：按钮模块ID
	 * @param busType：买/卖方标识，1-买方，2-卖方，0-公用
	 */
	judgeAuthority : function(gridId, buttonType) {
		var grid = gridId || "dataTable";
		//需要检验的业务权限按钮列表 
		var busObjs = buttonsObj[buttonType];
		for(var key in busObjs){
			var buttonObj  = busObjs[key];
			var flag = false;
			//循环权限列表，隐藏没有权限的按钮
			for ( var i = 0,j = unfund_busArr.length; i < j; i++) {
				var _busObj = unfund_busArr[i];
				
				if(key != _busObj.l_busin_flag){
					continue;
				}
				if (_busObj.vc_operation_list.indexOf(buttonObj["buttonType"]) == -1) {
					break;
				}
				flag = true;
			}
			//1.如果权限列表中找不到该按钮，隐藏
			if(!flag){
				Horn.getComp(grid).hideButton(buttonObj["buttonName"], true);
				continue;
			}
		}
	},
	/***
	 * 判断用户的业务操作权限--资金类
	 * @param buttonType
	 * @param busType:买/卖方标识，1-买方，2-卖方，0-公用
	 */
	getAuthorityList : function(buttonType,busType) {
		busType = busType || "0";
		// 如果busArr这个全局变量已存在，则不再发送请求，直接进行权限判断
		var url = "/am/am/system/operators/getBusList.json?c_business_class=" + busType;
		query_operate.ajax(url, "", function(result) {
			if (result && result.busList) {
				busArr = result.busList;
			}
		});	
		var _buttonsObj = buttonsObj[buttonType];
		if(!_buttonsObj){
			return;
		}
		for ( var i = 0; i < busArr.length; i++) {
			var _busObj = busArr[i];
			var l_busin_flag = _buttonsObj[_busObj.l_busin_flag];
			if (!l_busin_flag) {
				continue;
			}
			if (!l_busin_flag["buttonName"]) {
				continue;
			}
			if (_busObj.vc_operation_list
					.indexOf(l_busin_flag["buttonType"]) != -1) {
				targetButtonArr.push(l_busin_flag);
			}
		}//对权限进行排序
		targetButtonArr.sort(function(a,b){
			return a.sortId - b.sortId;
		});
	},
	/***
	 * 获取用户的非资金类的业务操作权限
	 * @param gridId
	 * @param buttonType
	 * @param busType:买/卖方标识，1-买方，2-卖方，0-公用
	 */
	getBusAuthority : function(gridId, buttonType,busType) {
		// 如果unfund_busArr这个全局变量已存在，则不再发送请求，直接进行权限判断
		busType = busType || "0";
		if (unfund_busArr.length != 0) {
			common_operate.judgeAuthority(gridId, buttonType);
		} else {
			var url = "/am/am/system/operators/getBusList.json?c_business_class=" + busType;
			query_operate.ajax(url, "", function(result) {
				if (result && result.busList) {
					unfund_busArr = result.busList;
					common_operate.judgeAuthority(gridId, buttonType);
				} else {
				}
			});			
		}

	},
	// 特殊处理指令管理界面的流程权限
	judgeZLXGAuthority : function(gridId) {
		var _gridId = gridId || "dataTable";
		var grid = Horn.getComp(_gridId).getSelecteds();
		if( !grid || grid.length !==1 ){
			return;
		}
		var l_busin_flag = grid[0].l_busin_flag;
		for ( var i = 0, j = busArr.length; i < j; i++) {
			if (busArr[i].l_busin_flag == l_busin_flag) {
				// 如果有发起的权限，则默认有指令修改、指令撤销的权限
				if (busArr[i].vc_operation_list.indexOf("1") == -1) {
					Horn.getComp(_gridId).hideButton("zlxg", true);
					Horn.getComp(_gridId).hideButton("zlcx", true);
				}
				break;
			}
		}
	},
	// 获取用户指令流程权限
	getZlXGBusAuthority : function(gridId) {
		// 如果busArr这个全局变量已存在，则不再发送请求，直接进行权限判断
//		if (busArr.length != 0) {
//			common_operate.judgeZLXGAuthority(gridId);
//		} else {
		var url = "/am/am/system/operators/getBusList.json",
			_gridId = gridId || "dataTable",
			grid = Horn.getComp(_gridId).getSelecteds()[0],
			data = "c_business_class=" + grid.c_business_class;
		query_operate.ajax(url, data, function(result) {
			if (result && result.busList) {
				busArr = result.busList;
				common_operate.judgeZLXGAuthority(gridId);
			} else {
			}
		});
//		}
	},
	// 判断指令流程权限
	judgeZLAuthority : function(gridId) {
		var _gridId = gridId || "dataTable";
		var grid = Horn.getComp(_gridId).getSelecteds();
		if( !grid || grid.length !==1 ){
			return;
		}
		var l_busin_flag = grid[0].l_busin_flag,
			c_node_status = grid[0].h_node_status,
			h_exec_status = grid[0].h_exec_status;
		for ( var i = 0, j = busArr.length; i < j; i++) {
			if (busArr[i].l_busin_flag == l_busin_flag) {
				// 复核
				if (busArr[i].vc_operation_list.indexOf("2") == -1) {
					Horn.getComp(_gridId).hideButton("fhdb", true);
				}
				// 节点状态为审批，指令状态不为-已审批(放款)
				if("5,6,7,8".indexOf(c_node_status) != -1 && h_exec_status !="7"){
					//字典1236与1002数据审批项key差2,所以取c_node_status-2判断
					if (busArr[i].vc_operation_list.indexOf(c_node_status-2) == -1) {						
						Horn.getComp(_gridId).hideButton("spdb", true);
					}
					break;
				}
				
				// 投后管理岗审批
				if (c_node_status == "a" && busArr[i].vc_operation_list.indexOf("c") == -1) {
					Horn.getComp(_gridId).hideButton("spdb", true);
					break;
				}
				
				// 审批(收款)
				if (c_node_status == "3" && busArr[i].vc_operation_list.indexOf("d") == -1) {
					Horn.getComp(_gridId).hideButton("spdb", true);
					break;
				}
				
				// 执行
				if (busArr[i].vc_operation_list.indexOf("8") == -1) {
					Horn.getComp(_gridId).hideButton("zxtg", true);
					Horn.getComp(_gridId).hideButton("zxbtg", true);
				}
				// o32发起确认
				if (busArr[i].vc_operation_list.indexOf("a") == -1) {
					Horn.getComp(_gridId).hideButton("fqqr", true);
				}
				// 指令终止
				if (busArr[i].vc_operation_list.indexOf("b") == -1) {
					Horn.getComp(_gridId).hideButton("zlzz", true);
				}
				break;
			}
		}
	},
	// 获取用户指令流程权限
	getZlBusAuthority : function(gridId) {
		// 如果busArr这个全局变量已存在，则不再发送请求，直接进行权限判断
//		if (busArr.length != 0) {
//			common_operate.judgeZLAuthority(gridId);
//		} else {
		var url = "/am/am/system/operators/getBusList.json",
			_gridId = gridId || "dataTable",
			grid = Horn.getComp(_gridId).getSelecteds()[0],
			data = "c_business_class=" + grid.c_business_class;
		query_operate.ajax(url, data, function(result) {
			if (result && result.busList) {
				busArr = result.busList;
				common_operate.judgeZLAuthority(gridId);
			} else {
			}
		});
//		}
	},
	// 获取用户按钮权限
	getButtonAuthority : function(gridId, busType) {
		// 如果busArr这个全局变量已存在，则不再发送请求，直接进行权限判断
		if (buttonArr.length != 0) {
			common_operate.judgeButtonAuthority(gridId, busType);
		} else {
			var url = "/am/am/system/operators/getButtonList.json";
			
			query_operate.ajax(url, "", function(result) {
				if (result && result.buttonList) {
					buttonArr = result.buttonList;
					common_operate.judgeButtonAuthority(gridId, busType);
				} else {
				}
			});
		}
	},// 判断用户按钮权限
	judgeButtonAuthority : function(gridId, busType) {
		// 判断用户的业务操作权限
		var grid = gridId || "dataTable";
//		var test = buttonsObj[busType];
		if (!buttonsObj[busType]) {
			return;
		}
		var obj = buttonsObj[busType];

		// 根据权限列表，找出可以有操作权限的按钮并显示
		var flag = false;
		for ( var key in obj) {
			flag = false;
			for ( var i = 0; i < buttonArr.length; i++) {
				if (key == buttonArr[i].l_menu_id) {
					flag = true;
					break;
				}
			}
			if(!flag){// 没有权限，则隐藏按钮
				if(Horn.getComp(grid)){
					Horn.getComp(grid).hideButton(obj[key]["buttonName"], true);
				}else{
					//对于不在datagrid中的按钮通过jquery来隐藏
					$("#"+busType).hide();
				}
			
			}
		}
	},// 转化NaN函数，如果是，则设为0
	parseNaN : function(num) {
		if (isNaN(num)) {
			return 0;
		} else {
			return num;
		}
	},// 取配置开关
	getConfig_7186 : function() {
		var url = "/am/am/business/dictate/getStrConfig.json";
		$.ajax({
			type : "post",
			url : url,
			data : "",
			async : false,
			dataType : ajaxDataType.JSON,
			success : function(result) {
				config_7186 = result.config_7186;
				if(config_7186 != constants.o32Switch.ON){
					TDialog.Msg.warning("提示","请到【系统管理-->系统开关配置】界面中开启与O32对接的7186配置开关！");
				}			
			}
		});
	},
	// 根据config_id获取str_config配置值
	getConfigById : function(configId) {
		var data = "configId=" + configId,
			url = "/am/am/system/sysconfig/getStrConfigById.json",
			configValue = "";
		$.ajax({
			type : "post",
			url : url,
			data : data,
			async : false,
			dataType : ajaxDataType.JSON,
			success : function(result) {
				str_config_value = result.configId;
				configValue = result.configId;
			}
		});
		return configValue;
	},
	/**
	 * 为分红送股添加单位
	 * 
	 * @param element:字段
	 */
	addSmallInput : function(element){
		var input = "&nbsp;<input type=\"text\" style=\"width:45px;color:red;\" value=\"每10股\" readonly=\"true\">";
		var $target = $("#" + element + " > input:eq(1)");
		$target.css("width", $target.width() - 50);
		$target.after(input);
	
	},
	/**
	 * 弹出收益/抵扣明细界面
	 * 
	 * @param element:字段
	 * @param fn:字段绑定的函数
	 * @param h_profit_type:收益类型
	 */
	addIcon : function(element, fn) {
		var icon = "<a href='javascript:void(0)' onclick=\""
				+ fn
				+ "\"><img src='/am/images/a.png' style='height:22px;vertical-align:top;'></a>";
		var $target = $("#" + element + " > input");
		$target.css("width", $target.width() - 30);
		$target.after(icon);
	},
	// 用金额大写控件时，处理金额大写
	dealCapital : function(targetId, sourceId) {
		//$("nobr > div").hide();
		$("#" + sourceId + " > input:eq(1)").keyup(function() {
			Horn.getCompById(targetId).setValue($("#" + sourceId + " > .u-typefield-capital")
					.text());
		});
	},
	/**
	 * 根据buttoonId筛选设置为readonly的form
	 */
	switchFormReadOnly : function(formName){
		var values = Horn.getComp(formName).getValues();
		var buttonId = values.buttonId;
		var l_busin_flag = values.l_busin_flag;
		var htype = values.htype;
		switch (buttonId){
				// 执行通过
			case "zxtg" :
				common_operate.setFormReadOnly(formName);	
				common_style.disable_style();
				// 指令批注不处理
				Horn.getCompById("vc_summary_dic").setReadonly(false);
				$("#vc_summary_dic > input").removeClass("text_disabled");
				
				Horn.getCompById("l_occur_date_" + htype).setReadonly(false);
				$("#l_occur_date_" + htype + " > input").removeClass("text_disabled");
				Horn.getCompById("en_occur_balance_" + htype).setReadonly(false);
				$("#en_occur_balance_" + htype + " > input").removeClass("text_disabled");
				
				if(l_busin_flag == "22036"){// 股权分红送股
					Horn.getCompById("l_occur_amount_" + htype).setReadonly(false);
					$("#l_occur_amount_" + htype + " > input").removeClass("text_disabled");
				} 
				break;
				// 执行不通过
			case "zxbtg" :
				common_operate.setFormReadOnly(formName);	
				common_style.disable_style();
				// 指令批注不处理
				Horn.getCompById("vc_summary_dic").setReadonly(false);
				$("#vc_summary_dic > input").removeClass("text_disabled");
				
				Horn.getCompById("l_occur_date_" + htype).hide();
				Horn.getCompById("en_occur_balance_" + htype).hide();

				break;	
			case "zlxg" : 
				break;
			case "zltz" : 
				break;
			default:// 复核、审批、撤销
				common_operate.setFormReadOnly(formName);	
				common_style.disable_style();
				// 指令批注不处理
				Horn.getCompById("vc_summary_dic").setReadonly(false);
				$("#vc_summary_dic > input").removeClass("text_disabled");
				
				// 特殊处理
				if( l_busin_flag == "22209" ){// 红股红利到账
					Horn.getCompById("c_ext_flag_edit").setReadonly(false);
					$("#c_ext_flag_edit > input").removeClass("combox_disabled");
				}
		}	
	},
	/***************************************************************************
	 * 设置form里面的所有元素为只读
	 * 
	 * @param formName
	 */
	setFormReadOnly:function(formName){	
// Horn.getComp(formName).getFieldComps().each(function(){
// this.setReadonly(true);
// });
		var form = $("[name='"+formName+"']");
		Horn.Field.findFieldCompsIn(form).each(function(){
			this.setReadonly(true);
			this.removeError();
	    });
		 common_style.disable_style();
	},
	// 隐藏新弹出窗口的关闭按钮
	exitButtonHiden : function (winName){
		$("#" + winName +" > div:eq(0)").find("a").hide();
	},
	// 用于查询条件的模糊查询
	addQueryitem: function(target,tableName,l_function_no){
		var url = "/am/am/system/tree/dicmanagelist.json?l_function_no=" + l_function_no+"&tableName="+tableName;
		query_operate.ajax(url, "", function(result) {
			if (result) {
				common_operate.autoMatch(target, result);
			} 
//			else {
//				Horn.Tip.warn("操作失败！");
//			}
		}, ajaxDataType.JSON);
	},
	// 通过c_business_type(合同类别)和vc_dictate_type(业务分类)来得到业务标识(String)
	getBusin_flag : function(c_business_type,vc_dictate_type){
		var url = "/am/am/system/bussinessConfig/getBusin_flag.json?" +
				"c_business_type="+c_business_type+"&vc_dictate_type="+vc_dictate_type;
		query_operate.ajax(url, "", function(result){
			if(result){	
				return result;
			}else {
				
			}
		});
		
	},
	// 修改时加载单条对手方下拉框值
	geteditlist:function(id,tableName,l_function_no,data){
		var val= Horn.getCompById(id).getValue();
		if(val==""||val==null){
			if(data!=""&&data!=null){
				val=data;
			}
		}
		// 同步执行功能号字典重新加载
    	$.ajax({
    		type : "post",
			url : "/am/am/system/tree/dicmanagelist.json?tableName="+tableName+"&&l_function_no="+l_function_no+"&&filterString="+val,
			data : "",
			async : false,
			dataType :"json",
			success : function(result) {
    		       Horn.getCompById(id).addItems(result,true);
    		       Horn.getCompById(id).setValue(val);
			}
		});
	},// 修改时加载单条对手方下拉框值(传入值)
	geteditlist2:function(id,tableName,l_function_no,val){
		// 同步执行功能号字典重新加载
    	$.ajax({
    		type : "post",
			url : "/am/am/system/tree/dicmanagelist.json?tableName="+tableName+"&&l_function_no="+l_function_no+"&&filterString="+val,
			data : "",
			async : false,
			dataType :"json",
			success : function(result) {
    		       Horn.getCompById(id).addItems(result,true);
    		       Horn.getCompById(id).setValue(val);
			}
		});
	},// 查询业务流程配置
	queryBusFlag : function(grid){
		var _c_process_type = "",
			c_business_class = grid[0].c_business_class,
			url = "/am/am/business/getSpecityObject.json", data = "vc_input_name1=l_busin_flag&vc_input_value1="
			+ grid[0].l_busin_flag + "&vc_input_table=businflagconfig";
		if($.trim(c_business_class)){//如果c_business_class不为空，则拼作为参数
			data += "&vc_input_name2=c_business_class&vc_input_value2="  + c_business_class;
		}
		query_operate.ajax(url, data, function(result) {
			if (result instanceof Object && result.query) {
				_c_process_type = result.query.c_process_type;
			}
		}, ajaxDataType.JSON);
		return _c_process_type;
	}
};



/**
 * 比较两个数组，是否存在相同值
 * 
 * @param a
 * @param b
 * @returns {Boolean}
 */
function indexOfArray(a, b) {
	for ( var j = 0; j < b.length; j++) {
		if (a.id == b[j].id) {
			return true;
		}
	}
	return false;
}
/**
 * *几位小数的数字格式校验
 */
function reg_double(value,data_len,dec_len){
	var len=parseInt(data_len)-1-parseInt(dec_len);
	eval("var reg = /^([+-]?)\\d{1,"+len+"}\\.\\d{1,"+dec_len+"}$/;");
	eval("var reg2=/^([+-]?)\\d{1,"+parseInt(data_len)+"}$/;");
	// var value=Horn.getCompById(name).getValue();
	if(!reg.test(value)&&!reg2.test(value)){
		return "请输入保留"+dec_len+"位小数的数字格式";
	}else{
		return true;
	}	
}
// js浮点型计算乘法
function accMul(arg1,arg2)
{
var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{
   	 m+=s1.split(".")[1].length;
    }catch(e){}
    try{
   	 m+=s2.split(".")[1].length;
    }catch(e){}
return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}

function  filter_vcexecstatus(vc_exec_status,type) {
	var unfilter;
	if (type) {
		 unfilter="1,2,4,5,6,7,8"; // 待办业务状态
	}else {
		unfilter="0,b,c,d"; // 指令管理状态
	}	
	var s_unfilter=unfilter.split(",");
	var  outresult="";
	if (vc_exec_status!=null&&vc_exec_status!="") {
		var s=vc_exec_status.split(",");
		for (var i = 0; i < s.length; i++) {
			for (var j = 0; j < s_unfilter.length; j++) {
				if(s_unfilter[j]==s[i]){
					if(outresult==""){
						outresult=s[i];
					}else{
						outresult=outresult+","+s[i];
					}
				}
			}
		}
		if(outresult==""){
			return unfilter;
		}else {
			return outresult;
		}
	}else {
		return unfilter;
	}
}
  

var common_operate_initsheet={
		attachclickinit:function(winclose){
		 var arrwin=winclose.split(',');
	        for(var i=0;i<arrwin.length;i++){
	        	//sheet页初始化事件
	        	var s2="#myTab_"+arrwin[i]+" a[href=#tab2_"+arrwin[i]+"]";
	        	$(s2).click(function (e) {
	         		  e.preventDefault();  
	         		  var type=Horn.getCompById("htype").getValue();
		    		  //type="#tab2_iframe_"+type;
	         		  var vc_query_value=Horn.getCompById("vc_stock_code_"+type).getValue();
	         		  var url="/am/am/business/stockcodesex/upload.htm?l_busin_flag="+type+"&&vc_stock_code="+vc_query_value+"&&l_dictate_serial_no=0";
	         		  $("#tab2_iframe_"+type).attr("src",url);
	         		  $(this).tab('show');
	         	    });
	        	//带附件窗口关闭事件
	            var s="#"+arrwin[i]+"Win .h_floatdiv-title a";
	        	$(s).click(function () {
	    			var param = {};
	    			var type=Horn.getCompById("htype").getValue();
	    			type="#tab2_iframe_"+type;
 	                var uploadvc_stock_code=$(type).contents().find("#uploadvc_stock_code").val();
 	        		var uploadl_busin_flag=$(type).contents().find("#uploadl_busin_flag").val();
 	        		var uploadl_dictate_serial_no=$(type).contents().find("#uploadl_dictate_serial_no").val();
 	        		if(uploadl_dictate_serial_no==""||uploadl_dictate_serial_no==null){
 	        			uploadl_dictate_serial_no="0";
 	        		}
 	                param.vc_stock_code =uploadvc_stock_code;
 	                param.l_busin_flag =uploadl_busin_flag;
 	                param.l_dictate_serial_no=uploadl_dictate_serial_no;
 	                var url = "/am/am/business/stockcodesex/winclosedelall.json";
	    				query_operate.doPost(url, param, function(result1) {
	    					if(result1=="ok"){
	    						//操作成功
	    						//alert("成功");
	    					}
	    				});
	        	});
	        }
	}
};
 //收益类型对象
//var profitType = {
//		SY : "sy",// 收益
//		DK : "dk"// 抵扣
//};

//function startWith(s,str){     
//	  var reg=new RegExp("^"+str);     
//	  return reg.test(s);        
//}