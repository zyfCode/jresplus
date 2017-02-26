$(function() {
	common_style.disable_style();
	dialog = common_operate.getDialog();
});
/**
 * 角色管理
 */
var role = {
	operationUrl : "/am/am/system/role/operation.json",
	// 删除
	del : function(type) {
		if (Horn.getComp('dataTable').getSelecteds().length != 1) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		rowData = Horn.getComp('dataTable').getSelecteds().length
				&& (Horn.getComp('dataTable').getSelecteds())[0];
		if(rowData.vc_role_code == 1){
			Horn.Tip.warn("系統管理员不能删除！");
			return;
		}

		var data = "vc_role_code=" + rowData.vc_role_code + "&l_function_no="
				+ functionIds.role.del + "&dotype=3";
		var url = "/am/am/system/role/" + type+"/operation.json";
		TDialog.Msg.confirm("确认", "请您确认是否删除？", function() {
			dialog.dialog("open");
			query_operate.doPost(url, data, query_operate
					.callbackWithDataGridRefresh());
		}, function() {
		});
	},
	// 新增、修改提交
	doUpdate : function(type) {
		var form = Horn.getComp(type + "Form");
		var url ="/am/am/system/role/" + type+"/operation.json" + "?l_function_no="
				+ functionIds.role[type];
		if (form.isValid()) {
			TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				var data = form.getValues();
				query_operate.doPost(url, data, query_operate
						.callbackWithDataGridRefresh(type + "Win"));
			}, function() {
			});
		}
	},// 权限页跳转
	auth : function() {
		if (Horn.getComp('dataTable').getSelecteds().length == 0) {
			Horn.Tip.warn("请选择一条记录！");
			return;
		}
		rowData = Horn.getComp('dataTable').getSelecteds().length
		&& (Horn.getComp('dataTable').getSelecteds())[0];
		//处理弹开界面已打开问题
		var iframelength=$('iframe[tabid=409012]', parent.document).length;
		if(iframelength!=0){
			TDialog.Msg.error("提示","角色权限操作界面已打开,请先完成操作!",function(){  
			    //ok 
				window.parent.Horn.Frame.openMenu('409012',
						"/am/am/system/role/authoritylist.htm?vc_role_code="+ rowData.vc_role_code
						+"&vc_role_name="+rowData.vc_role_name
						+ "&vc_organization_code="+ $("#vc_organization_code").val(), '权限管理', 'inbox');
			}); 
		}else{
			window.parent.Horn.Frame.openMenu('409012',
					"/am/am/system/role/authoritylist.htm?vc_role_code="+ rowData.vc_role_code
					+"&vc_role_name="+rowData.vc_role_name
					+ "&vc_organization_code="+ $("#vc_organization_code").val(), '权限管理', 'inbox');
		}		
	},// 菜单提交
	menuCommit : function() {
		var vc_role_code = $("#vc_role_code").val();
//		var vc_organization_code = $("#vc_organization_code").val();
		// 选中菜单
		var add_menus = [];
		var add_menus_str = [];
		// 未选中菜单
		var del_menus = [];
		var del_menus_str = [];
		var zTree = jQuery.fn.zTree.getZTreeObj("cityTree"), checked_nodes = zTree
				.getCheckedNodes();
		checked_nodes.sort(function compare(a, b) {
			return a.id - b.id;
		});
		for ( var i = 0, l = checked_nodes.length; i < l; i++) {
			var addObj = {};
			addObj.vc_role_code = vc_role_code;
//			addObj.vc_organization_code = vc_organization_code;
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
					addObj.vc_role_code = vc_role_code;
//					addObj.vc_organization_code = vc_organization_code;
					addObj.l_menu_id = citynodes[m].id;
					del_menus.push(addObj);
					del_menus_str.push(JSON.stringify(addObj));
				}
			}
		}

		// 提交
		var data = "vc_role_code=" + vc_role_code + "&l_function_add="
				+ functionIds["role"]["menuAdd"] + "&l_function_del="
				+ functionIds["role"]["menuDel"] + "&authAddStr="
				+ JSON.stringify(add_menus_str.join()) + "&authDelStr="
				+ JSON.stringify(del_menus_str.join());

		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			dialog.dialog("open");
			$.post("/am/am/system/role/menuAuthorityCommit.json?", data,
					function(result) {
				common_operate.endProgress();
				if (result == ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示", "菜单权限分配成功！", function() {
					});
				} 
//				else {
//					Horn.Tip.warn("操作失败！");
//				}
			}, "text");
		}, function() {
		});
	},// 业务权限提交
	authCommit : function(type) {
		var vc_role_code_h = $("#vc_role_code_h").val();
		// 循环取数据，拼接成josn格式数据，传到后台转换成对象
		var arrAuth = [];
		$("#data_table_dataTable_" + type + " > tbody > tr").each(
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
						var this2 = $(this);
						vc_operation_list_arr.push(this2.val());
					});
					auth = auth + "l_busin_flag':'" + l_busin_flag
							+ "','vc_role_code':'" + vc_role_code_h
							+ "','c_business_class':"
							+ c_business_class + ",'vc_operation_list':'"
							+ vc_operation_list_arr.join("") + "'}";
					arrAuth.push(auth);
				});

		// 提交
		var data = "l_function_no=" + functionIds["role"]["authCommit"]
				+ "&auths=" + arrAuth.join("|");
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			var dialog = common_operate.getDialog();
			dialog.dialog("open");
			$.post("/am/am/system/role/authorityCommit.json?", data, function(
					data) {
				common_operate.endProgress();
				if (data == ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示", "业务权限分配成功！", function() {
						//window.parent.Horn.Frame.screen.closeCurrent();
					});
				} 
//				else {
//					Horn.Tip.warn("操作失败！");
//				}
			}, "text");
		}, function() {
		});

	},
		
	bussiness_authority_init : function(type) {		
		$("div[name=btns]").attr("class","h_btndiv_hold");
		$("#b_submit_button_" + type).button().click(function(){
			role.authCommit(type);
		});

		$("#checkAll_" + type).click(function() {
			$("#data_table_dataTable_" + type + " > tbody input:checkbox").attr("checked", this.checked);
		});

		$("#operator_tr_" + type + " > td").each(function(){
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
		$("tbody > tr").each(
				function() {
					var $this = $(this);
					var c_business_class = $this.find("td").last().text();
					if(!c_business_class){
						$this.css("color","blue");
						$this.css("font-weight","bold");
					}
		});
	},
	showAssignRolesWin : function(){
		
    	if (Horn.getComp('dataTable').getSelecteds().length==0){
	   		Horn.Tip.warn("请选择一条记录！");
	   		return;
		}
		rowData = Horn.getComp('dataTable').getSelecteds().length && (Horn.getComp('dataTable').getSelecteds())[0]; 
		Horn.getComp("assignRolesWin").show(); 
		$("#assignRolesWin > .h_floatdiv-title > span").text("批量分配角色(角色代码："+ rowData.vc_role_code + ")");
		
	},//用户批量分配角色
	
    //条件查询
    addmaformquery : function(){
    	 var url=Horn.getCompById("tjzd_url1").getValue();
    	 var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
 		if(vc_branch_id==""||vc_branch_id==null){
 			Horn.Tip.warn("请选择至少一个部门！");
 		}else{
 			var  idstring2='';
 			$("#bar").find("li").each(function(){
 				var f=$(this).find("input:checkbox").attr("name");
 				if(f){
 					if(idstring2==''){
 						idstring2=idstring2+f;
 					}else{
 							idstring2=idstring2+","+f;
 					}
 				}
 			});
 			
 			$.post(url+"&&sSql="+idstring2, Horn.getCompById("OperRoleForm").getValues(), function(data) {
 	    		if (data.rows != null) {
 	    			var arr=data.rows;
 	    			var html="";
 	    			for(var i=0;i<arr.length;i++){
                      html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
	 	    		}
 	    			$("#foo").html(html);
 	    		}
 	    	});
 		}
    },
    
    //关闭自定义条件界面 
    assignRolesWinCancle : function(){
		Horn.getComp("assignRolesWin").hide();
	},
    //提交自定义条件修改 
	doAssignRoles : function(queryform){
	 	var  idstring2='';
		$("#bar").find("li").each(function(){
			var f=$(this).find("input:checkbox").attr("name");
			if(f){
				if(idstring2==''){
					idstring2=idstring2+f;
				}else{
						idstring2=idstring2+";"+f;
				}
			}
		});
		if(idstring2!=''){
			rowData = Horn.getComp('dataTable').getSelecteds().length && (Horn.getComp('dataTable').getSelecteds())[0]; 
			var vc_role_code = rowData.vc_role_code;
			dialog.dialog("open");
			//+"&&idstring="+idstring2+"&&vc_role_code="+vc_role_code
			$.post("/am/am/system/role/assignRoles/assignRoles.json?l_function_no="+ functionIds["operators"]["role_assign"]+"&idstring="+idstring2+"&vc_role_code="+vc_role_code, null, function(data) 
			{
				dialog.dialog("close");
				  if (data == "ok") {
				  TDialog.Msg.alert("提示","操作成功",function(){
			            Horn.getComp("assignRolesWin").hide();
			            formQuery();
			      }); 
				} 
//				  else {
//					Horn.Tip.warn(data);
//				}
			}, "text");
		}else{
			   Horn.Tip.warn("请选择一条记录！");
		   		return;
		}
		
			
    }
};


$(function(){
/***********自定义条件——可移动列单击特殊事件  开始******/
	 //新增选中值
	$("#add").click(
	    function() {
	        	  var num=0;
				    	$("#foo").find("li").each(function(){
				    			var f=$(this).find("input:checkbox").is(":checked");
				    			if(f){
				    				$(this).find("input:checkbox").removeAttr("checked");
				    				$(this).removeClass("block__list-row-selected");
				    				$(this).appendTo('#bar');
				    				num=num+1;
				    			}
				    	});
				    	if(num==0){	
				    		Horn.Tip.warn("请至少选中一条记录");
				    	}else{
				    		$(".block__titleabove input[name=allcheck]").removeAttr("checked");
				    	} 
				}
	);
	
	 //删除选终值
	 $("#del").click(
	    function() {
	        	  var num=0;
				    	$("#bar").find("li").each(function(){
				    			var f=$(this).find("input:checkbox").is(":checked");
				    			var branch=$(this).find("input:hidden ").val();
				    			var branchselect=Horn.getCompById("vc_branch_id_opbquery").getValue();
				    			var arrbra=branchselect.split(',');
				    			var s=0;
				    			for(var i=0;i<arrbra.length;i++){
				    				if(arrbra[i]==branch){
				    					s=1;
				    					break;
				    				}
				    			}
				    			if(f){
				    				$(this).find("input:checkbox").removeAttr("checked");
				    				$(this).removeClass("block__list-row-selected");
				    				if(s==0){
				    					$(this).remove();
				    				}else{
				    					$(this).appendTo('#foo');
				    				}
				    				num=num+1;
				    			}
				    	});
				    	if(num==0){	
				    		Horn.Tip.warn("请至少选中一条记录");
				    	}else{
				    		$(".block__titleabove input[name=allcheck]").removeAttr("checked");
				    	}  
				}
	);
	 /***********可移动列单击必须配置  开始******/
	   //单击列选择框全选
		$(".block__titleabove input[name=allcheck]").click(
		   function(){
		   	  if($(this).is(":checked")){ 
		   	  	$(this).parent().next("ul").find("li").each(function() {
			          $(this).find("input:checkbox").attr("checked", "checked");
			          $(this).addClass("block__list-row-selected");
			      });
		   	  }else{
		   	  	$(this).parent().next("ul").find("li").each(function() {
			          $(this).find("input:checkbox").removeAttr("checked");
			          $(this).removeClass("block__list-row-selected");
			      });
		   	  }  
			 }    
		);
		//单击行选中
		$(".block__titleabove").next("ul").on("click","li", function(event) {
			console.log(event.target.tagName);
			//处理子节点input单击事件向上冒泡做判断
			if(event.target.tagName!="INPUT"){
				if($(this).find("input:checkbox").is(":checked")){ 
				     $(this).find("input:checkbox").removeAttr("checked");
					 $(this).removeClass("block__list-row-selected");
			    }else{
			    	$(this).addClass("block__list-row-selected");
			        $(this).find("input:checkbox").attr("checked", "checked");
			    }
			}
		 });
		 
		//单checkbox选中		
	    $(".block__titleabove").next("ul").on("click","li input:checkbox",
		         function(event) {
	    	                   console.log(event.target.tagName);  	    	                
		         	           if($(this).is(":checked")){ 
		         	        	  $(this).attr("checked", "checked");
		         	        	   $(this).parent().addClass("block__list-row-selected"); 
							   }else{
								   $(this).parent().removeClass("block__list-row-selected");
								   $(this).removeAttr("checked");
							   }
		         	           //on在绑定统一元素之后可以用return false防止向上层冒泡            但是checkbox用该方法会取消选中
		         	          //return false; 
				}
		 ); 
		 //操作图标鼠标移入移出变化
		 $(".block_image").mouseover(
		  function(){
		  	   var name= $(this).attr("name"); 
		  	   $(this).attr("src","/am/images/sortable/"+name+"_on.png"); 
		 	}
		 );
	     $(".block_image").mouseout(
	      function(){
			  	   var name= $(this).attr("name");
			 	     $(this).attr("src","/am/images/sortable/"+name+".png");
			 	}
			 );
	     /***********可移动列单击必须配置  结束******/ 
});
 /***********自定义条件——可移动列单击特殊事件  结束******/