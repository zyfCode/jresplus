$(function() {
	common_style.disable_style();
	dialog = common_operate.getDialog();
	//$( "#addWin" ).draggable();
});
/**
 * 用户管理
 */
var operate = {
	funlook:function(data){
		       return "<a href='javascript:void(0);' onclick='operate.idlook(\""+data.val+"\")'>"+data.val+"</a>";
		   },
    idlook:function(d){ 	
		        $.post("/am/am/system/operators/view.json?l_function_no=" + functionIds.operators["view"]+"&vc_op_code="+d, null, function(data) {
								if (data != null) {
								    Horn.getComp("viewForm").setValues(data.operate);
									Horn.getComp("viewWin").show();
								} else {
									Horn.Tip.warn("查询信息失败");
								}
				}, "json");      
	},
	// 新增
	doAdd : function() {
		var result = Horn.getComp("addForm").isValid();
		if (result) {
			var data = Horn.getComp("addForm").getValues();
			var url = "/am/am/system/operators/doAdd/operation.json?l_function_no="
					+ functionIds.operators.add + "&dotype=1";
			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");				
				query_operate.doPost(url, data, query_operate.callbackWithDataGridRefresh("addWin"));
			});
		}
	},// 编辑
	doEdit : function() {
		var form = Horn.getComp("editForm");
		var url = "/am/am/system/operators/doEdit/operation.json?l_function_no="
				+ functionIds["operators"]["edit"];
		if (form.isValid()) {
			var data = form.getValues();
			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				query_operate.doPost(url, data, query_operate
						.callbackWithDataGridRefresh("editWin"));
			});
		}
	},
	// 弹出编辑窗口:到后台查询一条数据，塞入form
	showEditWinByQuery : function() {
		var url = "/am/am/system/operators/view.json";
		var grid = Horn.getComp("dataTable").getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}

		data = "l_function_no=" + functionIds.operators["view"]
				+ "&vc_op_code=" + grid[0].vc_op_code;

		query_operate.doPost(url, data, function(result) {
			if (result && result.operate) {
				//同步执行功能号字典重新加载
		    	$.ajax({
		    		type : "post",
					url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+result.operate.vc_branch_id,
					data : "",
					async : false,
					dataType :"json",
					success : function(result2) {
		    		       Horn.getCompById("vc_branch_id_edit").addItems(result2,true);
					}
				});
				Horn.getComp("editForm").setValues(result.operate);
				Horn.getComp("editWin").show();
				common_reg.Formremoverr('editForm');
				
			} else {
				Horn.Tip.warn("编辑失败！");
			}
		}, ajaxDataType.JSON);
	},
	// 查看
	view : function() {
		var url = "/am/am/system/operators/view.json";
		var grid = Horn.getComp("dataTable").getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		data = "l_function_no=" + functionIds.operators["view"]
				+ "&vc_op_code=" + grid[0].vc_op_code;

		query_operate.doPost(url, data, function(result) {
			if (result && result.operate) {
				Horn.getComp("viewForm").setValues(result.operate);
				Horn.getComp("viewWin").show();
			} 
//			else {
//				Horn.Tip.warn("查看失败！");
//			}
		}, ajaxDataType.JSON);
	},
	// 删除
	del : function() {
		var url = "/am/am/system/operators/operation.json";
		if (Horn.getComp("dataTable").getSelecteds().length == 0) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		rowData = Horn.getComp("dataTable").getSelecteds().length
				&& (Horn.getComp("dataTable").getSelecteds())[0];

		TDialog.Msg.confirm("确认", "请您确认是否删除？", function() {
			data = "vc_op_code=" + rowData.vc_op_code + "&l_function_no="
					+ functionIds.operators["del"];
			query_operate.doPost(url, data, query_operate
					.callbackWithDataGridRefresh());
		}, function() {
		});
	},
	// 重置密码
	resetPassword : function() {
		var url = "/am/am/system/operators/resetPassword/operation.json";
		var grid = Horn.getComp("dataTable").getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		TDialog.Msg.confirm("密码重置", "密码将重置为111111，是否继续?", function() {
			dialog.dialog("open");
			data = "l_function_no=" + functionIds.operators["resetPassword"]
					+ "&vc_op_code=" + grid[0].vc_op_code + "&dotype=1";
			query_operate.doPost(url, data, function(result) {
				common_operate.endProgress();
				if (result == ajaxCallBackCode.OK) {
					Horn.Tip.success("密码重置成功！");
				} 
//				else {
//					Horn.Tip.warn("密码重置失败！");
//				}
			});
		}, function() {
			// canel
		});
	},
	// 弹出冻结窗口
	showFreezeWin : function() {
		var grid = Horn.getComp("dataTable").getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp("freezeForm");
		var c_op_status = grid[0].c_op_status;
		if (c_op_status != 1) {
			Horn.Tip.warn("当前用户状态非正常，不允许冻结！");
			return;
		}
		form.setValues(grid[0]);
		common_reg.Formremoverr(form);
		Horn.getComp("freezeWin").show();
	},// 用户冻结
	freeze : function() {
		if (Horn.getComp('dataTable').getSelecteds().length != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp("freezeForm");
		var url = "/am/am/system/operators/freeze/operation.json?l_function_no="
				+ functionIds.operators.update_status;
		var data = form.getValues();
		data.c_op_status = 2;
		if (form.isValid()) {
			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				query_operate.doPost(url, data, query_operate
						.callbackWithDataGridRefresh("freezeWin"));
			}, function() {
			});
		}

	},// 弹出解冻窗口
	showunFreezeWin : function() {
		var grid = Horn.getComp("dataTable").getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp("unFreezeForm");
		var c_op_status = grid[0].c_op_status;
		if (c_op_status != 2) {
			Horn.Tip.warn("当前用户状态非冻结，不允许解冻！");
			return;
		}
		form.setValues(grid[0]);
		common_reg.Formremoverr(form);
		Horn.getComp("unFreezeWin").show();
	},// 用户解冻
	unFreeze : function() {
		if (Horn.getComp('dataTable').getSelecteds().length != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp("unFreezeForm");
		var url = "/am/am/system/operators/unFreeze/operation.json?l_function_no="
				+ functionIds.operators.update_status;
		var data = form.getValues();
		data.c_op_status = 1;
		if (form.isValid()) {
			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				query_operate.doPost(url, data, query_operate
						.callbackWithDataGridRefresh("unFreezeWin"));
			}, function() {
			});
		}
	},// 弹出注销窗口
	showLogoutWin : function() {
		var grid = Horn.getComp("dataTable").getSelecteds();
		var checkedLength = grid.length;
		if (checkedLength !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp("logoutForm");
		var c_op_status = grid[0].c_op_status;
		if (c_op_status == 3) {
			Horn.Tip.warn("已注销状态的用户，不允许重复注销！");
			return;
		}
		form.setValues(grid[0]);
		common_reg.Formremoverr(form);
		Horn.getComp("logoutWin").show();
	},// 用户注销
	logout : function() {
		if (Horn.getComp('dataTable').getSelecteds().length != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		var form = Horn.getComp("logoutForm");
		var url = "/am/am/system/operators/logout/operation.json?l_function_no="
				+ functionIds.operators.update_status;
		var data = form.getValues();
		data.c_op_status = 3;
		if (form.isValid()) {
			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				query_operate.doPost(url, data, query_operate
						.callbackWithDataGridRefresh("logoutWin"));
			}, function() {
			});
		}
	},// 角色分配-查询
	showRoleWin : function() {
		var grid = Horn.getComp("dataTable").getSelecteds();
		if (grid.length !== 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		Horn.getComp("rolesForm").clearValue();
		Horn.getComp("roleWin").show();
		Horn.getCompById("roleTable").setBaseParams(Horn.getComp("rolesForm").getValues());
		Horn.getCompById("roleTable").load('',{"pageNo":1});
		
	},// 角色分配-选中角色
	testloadSuccess : function() {
		var grid = Horn.getComp("dataTable").getSelecteds();
		var url = "/am/am/system/operators/queryRole.json";
		var data = "vc_input_name1=vc_op_code&" + "vc_input_value1="
				+ grid[0].vc_op_code + "&vc_input_name2=vc_organization_code&"
				+ "vc_input_value2=" + $("#vc_organization_code").val()
				+ "&vc_input_table=rolemember"
				+ "&vc_output_name1=vc_role_code"
				+ "&vc_output_name2=vc_op_code"
				+ "&vc_output_name3=vc_organization_code";

		// 显示所选用户到title上
		$("#wrap_roleTable > .hc-datagrid-toolbar").html(
				"<p class='stockcodesex_title'>部门全称："
						+ grid[0].vc_branch_caption + " &nbsp;&nbsp;用户名称："
						+ grid[0].vc_op_name + "<p/>");

		query_operate.doPost(url, data, function(result) {
			if (result && result.role) {
				var vc_role_code = result.role.vc_role_code;
				$("#body_roleTable > tr").each(function(index) {
					if (vc_role_code == $(this).find("td:eq(2) > div").text()) {
						Horn.getComp("roleTable").select(index);
						return;
					}
				});

			}
		}, ajaxDataType.JSON);
	},
	// 角色分配-提交
	roleAssign : function() {
		
		var grid = Horn.getComp("dataTable").getSelecteds();
		var role_grid = Horn.getComp("roleTable").getSelecteds();
		if (role_grid.length !== 1) {
			Horn.Tip.warn("请选择要分配的角色！");
			return;
		}
		var data = "vc_role_code=" + role_grid[0].vc_role_code + "&vc_op_code="
				+ grid[0].vc_op_code + "&vc_organization_code="
				+ grid[0].vc_organization_code;
		var url = "/am/am/system/operators/roleAssign/operation.json?l_function_no="
				+ functionIds["operators"]["role_assign"];
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			query_operate.doPost(url, data, query_operate
					.callbackWithDataGridRefresh("roleWin"));
		}, function() {
		});
	},// 菜单提交
	menuCommit : function() {
		var vc_op_code = $("#vc_op_code").val(),
		// 选中菜单
			add_menus = [],
			add_menus_str = [],
		// 未选中菜单
			 del_menus = [],
			 del_menus_str = [],
			 url = "/am/am/system/operators/menuAuthorityCommit.json";
		 zTree = jQuery.fn.zTree.getZTreeObj("cityTree"), checked_nodes = zTree
				.getCheckedNodes();
		checked_nodes.sort(function compare(a, b) {
			return a.id - b.id;
		});
		for ( var i = 0, l = checked_nodes.length; i < l; i++) {
			var addObj = {};
			addObj.vc_op_code = vc_op_code;
			addObj.l_menu_id = checked_nodes[i].id;
			add_menus.push(addObj);
			add_menus_str.push(JSON.stringify(addObj));
		}

		for ( var m = 0; m < citynodes.length; m++) {
			if (!citynodes[m].nocheck) {
				var flag = false;
				for ( var j = 0; j < add_menus.length; j++) {
					if (citynodes[m].id == add_menus[j].l_menu_id) {
						flag = true;
					}
				}
				if (!flag) {
					var addObj = {};
					addObj.vc_op_code = vc_op_code;
					addObj.l_menu_id = citynodes[m].id;
					del_menus.push(addObj);
					del_menus_str.push(JSON.stringify(addObj));
				}
			}
		}

		// 提交
		var data = "vc_op_code=" + vc_op_code
				+ "&l_function_add="
				+ functionIds["operators"]["menuAdd"] + "&l_function_del="
				+ functionIds["operators"]["menuDel"] + "&authAddStr="
				+ JSON.stringify(add_menus_str.join()) + "&authDelStr="
				+ JSON.stringify(del_menus_str.join());
		
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			$.post(url, data, function(result) {
				common_operate.endProgress();
				if (result == ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示", "菜单权限分配成功！");
				} 
//				else {
//					Horn.Tip.warn(result);
//				}
			}, "text");
		}, function() {
		});

	},// 业务权限更新
	authCommit : function() {
		var vc_op_code_h = $("#vc_op_code_h").val(),
		 	c_business_class = $("#c_business_class").val(),//买卖方标识
			url = "/am/am/system/operators/authorityCommit.json?c_business_class=" + c_business_class,
		// 循环取数据，拼接成josn格式数据，传到后台转换成对象
			arrAuth = [];
		$("tbody > tr").each(
				function() {
					var auth = "{'";
					var vc_operation_list_arr = [];

					var thiss = $(this);
					var l_busin_flag = thiss.find("td:eq(0)").text();
					var c_business_class = thiss.find("td").last().text();
					if(!c_business_class){
						c_business_class = "3";
					}

					thiss.find("input:checked").each(function() {
						console.log("dddd");
						var this2 = $(this);
						vc_operation_list_arr.push(this2.val());
					});

					auth = auth + "l_busin_flag':'" + l_busin_flag
							+ "','vc_op_code':'" + vc_op_code_h
							+ "','c_business_class':"
							+ c_business_class + ",'vc_operation_list':'"
							+ vc_operation_list_arr.join("") + "'}";
					arrAuth.push(auth);
				});
		// 提交
		var data = "l_function_no=" + functionIds["operators"]["authCommit"]
				+ "&auths=" + arrAuth.join("|");

		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			$.post(url, data, function(result) {
				common_operate.endProgress();
				if (result == ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示", "业务权限分配成功！", function() {
						// window.parent.Horn.Frame.screen.close('409011');
						//window.parent.Horn.Frame.screen.closeCurrent();
					});
				} 
//				else {
//					Horn.Tip.warn(result);
//				}
			}, "text");
		}, function() {
		});

	},
	 // 基金组合权限提交
	productrightCommit : function() {
		var vc_op_code = $("#vc_op_code").val();
		// 选中组合
		var sSql ="";
			 url = "/am/am/system/operators/productauthorityCommit.json";
		 zTree = jQuery.fn.zTree.getZTreeObj("cityTree"), checked_nodes = zTree
				.getCheckedNodes();
		checked_nodes.sort(function compare(a, b) {
			return a.id - b.id;
		});
		for ( var i = 0, l = checked_nodes.length; i < l; i++) {
			if(checked_nodes[i].pId!=0){
				if(i==0){
					sSql=sSql+checked_nodes[i].id;
				}else{
					sSql=sSql+","+checked_nodes[i].id;
				}
			}
		}

		// 提交
		var data = "vc_op_code=" + vc_op_code
				+ "&l_function_add="
				+ functionIds["operators"]["product_rightcommit"]  + "&vc_user_name_ex="
				+ sSql ;
		
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			$.post(url, data, function(result) {
				common_operate.endProgress();
				if (result == ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示", "基金组合权限分配成功！", function() {
						window.parent.Horn.Frame.screen.closeCurrent();
					});					
				} 
			}, "text");
		}, function() {
		});

	},
	bus_auth_init : function() {	
		$("div[name=btns]").attr("class","h_btndiv_hold");
		$("#b_submit_button").button().click(function(){
			operate.authCommit();
		});
		
		$("#operator_tr > td").each(function(){
			var $td = $(this),
			$checkbox = $td.find("input:checkbox"),
			id = $checkbox.attr("id");
			if(!id){
				return;
			}
			$checkbox.click(function(){
				$("input[name=" + id + "]:checkbox").attr("checked", this.checked);
			});
		});

		$("#checkAll").click(function() {
			$("tbody input:checkbox").attr("checked", this.checked);
		});
		
		var config_7513 = $("#config_7513").val();
		if(config_7513 != "3"){
			return;
		}
		$("tbody > tr").each(
				function() {
					var $this = $(this);
					var c_business_class = $this.find("td").last().text();
					if(!c_business_class){
						$this.css("color","blue");
						$this.css("font-weight","bold");
					}
		});
	},//菜单页面初始加载
	menuInit : function() {

	},
	//注册点击事件
	rowClick : function(rowdata){
		Horn.getComp("dataTable").hideButton("412", false);
		Horn.getComp("dataTable").hideButton("413", false);
		Horn.getComp("dataTable").hideButton("414", false);
		Horn.getComp("dataTable").hideButton("415", false);
		Horn.getComp("dataTable").hideButton("416", false);
		Horn.getComp("dataTable").hideButton("417", false);
		Horn.getComp("dataTable").hideButton("418", false);
		if(rowdata.c_op_status_show == "正常"){
			Horn.getComp("dataTable").hideButton("415", true);
		}
		if(rowdata.c_op_status_show == "冻结"){
			Horn.getComp("dataTable").hideButton("412", true);
			Horn.getComp("dataTable").hideButton("413", true);
			Horn.getComp("dataTable").hideButton("414", true);
			Horn.getComp("dataTable").hideButton("417", true);
			Horn.getComp("dataTable").hideButton("418", true);
		}
		if(rowdata.c_op_status_show == "注销"){
			Horn.getComp("dataTable").hideButton("412", true);
			Horn.getComp("dataTable").hideButton("413", true);
			Horn.getComp("dataTable").hideButton("414", true);
			Horn.getComp("dataTable").hideButton("415", true);
			Horn.getComp("dataTable").hideButton("416", true);
			Horn.getComp("dataTable").hideButton("417", true);
			Horn.getComp("dataTable").hideButton("418", true);
		}
		common_operate.getButtonAuthority("dataTable", "operator");
	},
	//菜单和业务权限
	 auth:function(){
		if (Horn.getComp('dataTable').getSelecteds().length==0){
	   		Horn.Tip.warn("请选择一条记录！");
	   		return;
	    }
		rowData = Horn.getComp('dataTable').getSelecteds().length && (Horn.getComp('dataTable').getSelecteds())[0]; 
		//处理弹开界面已打开问题
		var iframelength=$('iframe[tabid=409011]', parent.document).length;
		if(iframelength!=0){
			TDialog.Msg.error("提示","用户权限操作界面已打开,请先完成操作!",function(){  
			    //ok 
		   window.parent.Horn.Frame.openMenu('409011',"/am/am/system/operators/authoritylist.htm?vc_op_code="+rowData.vc_op_code +"&vc_op_name="+rowData.vc_op_name+ "&vc_organization_code=" + $("#vc_organization_code").val(),'权限管理','inbox');
			}); 
		}else{
		   window.parent.Horn.Frame.openMenu('409011',"/am/am/system/operators/authoritylist.htm?vc_op_code="+rowData.vc_op_code +"&vc_op_name="+rowData.vc_op_name+ "&vc_organization_code=" + $("#vc_organization_code").val(),'权限管理','inbox');
		}
	},
    //基金组合权限界面打开
	 productright:function(){
		if (Horn.getComp('dataTable').getSelecteds().length==0){
	   		Horn.Tip.warn("请选择一条记录！");
	   		return;
	    }
		rowData = Horn.getComp('dataTable').getSelecteds().length && (Horn.getComp('dataTable').getSelecteds())[0]; 
		//处理弹开界面已打开问题
		var iframelength=$('iframe[tabid=409012]', parent.document).length;
		if(iframelength!=0){
			TDialog.Msg.error("提示","基金组合权限操作界面已打开,请先完成操作!",function(){  
			    //ok 
				window.parent.Horn.Frame.openMenu('409012',"/am/am/system/operators/product_authoritylist.htm?vc_op_code="+rowData.vc_op_code +"&vc_organization_code=" + $("#vc_organization_code").val(),'基金组合权限管理','inbox');
			}); 
		}else{
			window.parent.Horn.Frame.openMenu('409012',"/am/am/system/operators/product_authoritylist.htm?vc_op_code="+rowData.vc_op_code +"&vc_organization_code=" + $("#vc_organization_code").val(),'基金组合权限管理','inbox');					
		}		
   }
	
};