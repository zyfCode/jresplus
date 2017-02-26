$(function(){
	  //进入页面查询
	   branch.formQuery(); 
	   //操作权限判断
	   common_operate.getButtonAuthority("branchTable", "branch");
	   //进度条变量初始化
	   dialog = common_operate.getDialog();
	 /***********分管领导移动js 开始******/
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
	   //已选列双击事件
	 	$("#bar").on("dblclick","li", function(event) {
	 		console.log(event.target.tagName);
	 		//处理子节点input单击事件向上冒泡做判断
	 		if(event.target.tagName!="INPUT"){
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

    			$(this).find("input:checkbox").removeAttr("checked");
    			$(this).removeClass("block__list-row-selected");
    			if(s==0){
    					$(this).remove();
    			}else{
    					$(this).appendTo('#foo');
    			}
	 		}
	 	 });
	 	//待选列双击事件
	 	$("#foo").on("dblclick","li", function(event) {
	 		console.log(event.target.tagName);
	 		//处理子节点input单击事件向上冒泡做判断
	 		if(event.target.tagName!="INPUT"){
	 			$(this).find("input:checkbox").removeAttr("checked");
 				$(this).removeClass("block__list-row-selected");
 				$(this).appendTo('#bar');	
	 		}
	 	 }); 

		  //分管领导新增选中值
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
		 
		  //分管领导删除选终值
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
		
		  /***********分管领导移动js  结束******/
		  
	
 });
/***业务操作js
 * **/  
var  branch={
		//查询
		formQuery:function(){
			var result = Horn.getComp("branchForm").isValid();
			if(result){
				Horn.getCompById("branchTable").setBaseParams(Horn.getCompById("branchForm").getValues());
				Horn.getCompById("branchTable").load('',{"pageNo":1});
			}
			
		},
		//内置的reset方法会保留表单默认值
	    MyReset:function(){
		   Horn.getComp("branchForm").clearValue();
		},
		//新增
		add:function(){
			//表单重置
			common_reg.Formreset("addForm");
			Horn.getComp("addWin").show();
		},
		//查看超链接转化
		funlook:function(data){
	       return "<a href='javascript:void(0);' onclick='branch.idlook(\""+data.val+"\")'>"+data.val+"</a>";
	   },
	   //新增提交
		 doAdd:function(){
		    var result = Horn.getComp("addForm").isValid();
			if(result)
			{
				var values = Horn.getComp("addForm").getValues();
				 dialog.dialog("open");
						$.post("/am/am/system/branch/doAdd/operation.json?l_function_no="+functionIds["branch"]["add"]+"&&dotype=1", values, function(data) {
							dialog.dialog("close");
							   if (data == "ok") {
								TDialog.Msg.alert("提示","操作成功",function(){						  
									Horn.getComp("addWin").hide();
									branch.formQuery();
						        });
							} 
//							 else {
//								Horn.Tip.warn(data);
//							}
						}, "text");
		    }			
		},
        //状态转化
	    domrender:function(data){
	        var a=data.val;
	        if(a=="1"){
	           return "正常";
	        }else if(a=="2"){
	           return "注销";
	        }else{
	           return  "";
	        }
	    },
	    
		//通过部门编号查询
	    idlook:function(d){
	        $.post("/am/am/system/branch/look.json?vc_branch_id="+d, null, function(data) {
							if (data != null) {
							    Horn.getComp("lookWin").show();    
	                            Horn.getComp("lookForm").setValues(data);
	                            common_operate.setFormReadOnly("lookForm"); 
							} 
//							else {
//								Horn.Tip.warn("查询信息失败");
//							}
			}, "json");      
		},
		//新增窗口关闭
		addWinCancle:function() {
			Horn.getComp("addWin").hide();
		},
		//修改窗口关闭
		editWinCancle:function(){
			Horn.getComp("editWin").hide();
		},
		//修改窗口打开
		edit:function(){
			if (Horn.getComp('branchTable').getSelecteds().length==0){
		   		Horn.Tip.warn("请选择一条记录！");
		   		return;
		    }
			rowData = Horn.getComp('branchTable').getSelecteds().length && (Horn.getComp('branchTable').getSelecteds())[0];
			$.post("/am/am/system/branch/look.json?vc_branch_id="+rowData.vc_branch_id, null, function(data) {
							if (data != null) {
							    Horn.getComp("editWin").show();    
	                            Horn.getComp("editForm").setValues(data); 
							} 
//							else {
//								Horn.Tip.warn("查询信息失败");
//							}
			}, "json");      
			     
		},
        //修改提交
		doEdit:function(){
		   var result = Horn.getComp("editForm").isValid();
			if(result)
			{
				var values = Horn.getComp("editForm").getValues();
				console.log(values);
				 dialog.dialog("open");
				$.post("/am/am/system/branch/doEdit/operation.json?l_function_no="+functionIds["branch"]["edit"]+"&&dotype=2", values, function(data) {
					dialog.dialog("close");
					if (data == "ok") {
						TDialog.Msg.alert("提示","操作成功",function(){
				           Horn.getComp("editWin").hide();
				           branch.formQuery();
				       }); 
					} 
//					else {
//					     Horn.Tip.warn(data);
//					}
				}, "text");
			}
		},
		//打开部门经理指定窗口
		addma:function(){
			if (Horn.getComp('branchTable').getSelecteds().length==0){
			   		Horn.Tip.warn("请选择一条记录！");
			   		return;
			}
			rowData = Horn.getComp('branchTable').getSelecteds().length && (Horn.getComp('branchTable').getSelecteds())[0]; 
			var  s='{"vc_branch_id":"'+rowData.vc_branch_id+'"}';
			 Horn.getComp("opbranchsTable").setBaseParams(eval('(' + s + ')'));
			 Horn.getComp("opbranchsTable").load();
			 Horn.getComp("addmaWin").show(); 
		},
		//部门经理成功回调判断
		 testloadSuccess2:function(comp, resultData) {
		      var length =resultData["rows"].length;
		      var values=resultData["rows"];
		      var i=0;
		      while(length>i){
				   idstring=values[i].ismanager;
				   if(idstring=='1'){
				       Horn.getComp("opbranchsTable").select(i);
				   }
				   i++;
			 }
	    },  
       //部门经理指定
		doAddma:function(){
		 	var length = Horn.getComp('opbranchsTable').getSelecteds().length;
		    if(length>0)
		 	{
				var values = (Horn.getComp('opbranchsTable').getSelecteds());
				var  i=0;
				var  idstring='';
				while(length>i){
				   if(i==0){
				      idstring=values[i].vc_op_code;
				   }else{
				       idstring=idstring+";"+values[i].vc_op_code;
				   }
				   i++;
				}
				var vc_branch_id=values[0].vc_branch_id;
				dialog.dialog("open");
				$.post("/am/am/system/branchmanager/doAddma/operation.json?l_function_no="+functionIds["branch"]["addma"]+"&&idstring="+idstring+"&&dotype=1&&c_branchrole_kind=0&&vc_branch_id="+vc_branch_id, null, function(data) 
				{
					dialog.dialog("close");
					  if (data == "ok") {
					  TDialog.Msg.alert("提示","操作成功",function(){
				            Horn.getComp("addmaWin").hide();
				            branch.formQuery();
				      }); 
					} 
//					  else {
//						Horn.Tip.warn(data);
//					}
				}, "text");
			}else{
			   Horn.Tip.warn("请选择一条记录！");
			   		return;
			}
		},			
        //关闭部门经理 指定窗口
		addmaWinCancle:function(){
			Horn.getComp("addmaWin").hide();
		},		
       //查看部门经理
		lookma:function(){
				if (Horn.getComp('branchTable').getSelecteds().length==0){
		   		Horn.Tip.warn("请选择一条记录！");
		   		return;
		    }
			rowData = Horn.getComp('branchTable').getSelecteds().length && (Horn.getComp('branchTable').getSelecteds())[0];
			var  s='{"vc_branch_id":"'+rowData.vc_branch_id+'"}';
			 Horn.getComp("opbranchmanTable").setBaseParams(eval('(' + s + ')'));
			 Horn.getComp("opbranchmanTable").load();
	        Horn.getComp("lookmaWin").show(); 
		},
		testRowClick:function(rowdata){
			 if(rowdata.c_branch_status2!="正常"&&rowdata.c_branch_status2!='1'){
				 	Horn.getComp('branchTable').hideButton("ctbutton3",true); 
		    	    Horn.getComp('branchTable').hideButton("ctbutton4",true); 
			        Horn.getComp('branchTable').hideButton("ctbutton5",true); 		     
		       }else{
		    	    Horn.getComp('branchTable').hideButton("ctbutton3",false); 
		    	   	Horn.getComp('branchTable').hideButton("ctbutton4",false); 
			        Horn.getComp('branchTable').hideButton("ctbutton5",false); 
		       }
			},
		//部门删除
		del:function(){
		   if (Horn.getComp('branchTable').getSelecteds().length==0){
		   		Horn.Tip.warn("请选择一条记录！");
		   		return;
		   }else{
		      TDialog.Msg.confirm("提示","您确定要注销部门吗",function(){
		            rowData = Horn.getComp('branchTable').getSelecteds().length && (Horn.getComp('branchTable').getSelecteds())[0];   
		            dialog.dialog("open");
		            $.post("/am/am/system/branch/del/operation.json?l_function_no="+functionIds["branch"]["del"]+"&&dotype=3", rowData, function(data) {
		            	 dialog.dialog("close");
							if (data == "ok") {
								TDialog.Msg.alert("提示","操作成功",function(){
						           branch.formQuery();
						        });
							} 
//							else {
//							    Horn.Tip.warn(data);
//							}
						}, "text");
		      },function(){  
			          //canel  
			       });
		   
		   }
		   

		},
		/***********分管领导  页面事件 开始******/
		   //打开分管领导界面 
		      addma2:function(){
		    	if (Horn.getComp('branchTable').getSelecteds().length==0){
			   		Horn.Tip.warn("请选择一条记录！");
			   		return;
				}
				rowData = Horn.getComp('branchTable').getSelecteds().length && (Horn.getComp('branchTable').getSelecteds())[0]; 
				Horn.getCompById("vc_branch_id2query").setValue(rowData.vc_branch_id);
		    	Horn.getComp("addma2Win").show(); 
		        var url=Horn.getCompById("tjzd_url").getValue();
		        var branch_id=rowData.vc_branch_id;
		        Horn.getCompById("vc_branch_id_opbquery").setValue(branch_id);	
				$.post("/am/am/system/branchmanager/look.json?vc_branch_id="+rowData.vc_branch_id, null, function(data) {
						$("#foo").html("");
				        $("#bar").html("");
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
				    			$("#bar").html(html);
				    	}
				    	
				        $.post(url+"&&sSql="+idstring2, Horn.getCompById("OperbranchForm").getValues(), function(data2) {
				    		if (data2.rows != null) {
				    			var arr=data2.rows;
				    			var html="";
				    			for(var i=0;i<arr.length;i++){
                                   html=html+"<li><input type='checkbox' name='"+arr[i].vc_op_code+"'><span class='block__list_span' title='"+arr[i].vc_op_code+"'>"+arr[i].vc_op_name+"</span><input type='hidden' value='"+arr[i].vc_branch_id+"'/></li>";
				    			}
				    			$("#foo").html(html); 
				    		}
				    	});	
		       }, "json"); 
		        
		    },
		    //分管领导查询
		     addmaformquery:function(){
		    	 var url=Horn.getCompById("tjzd_url").getValue();
		    	 var vc_branch_id = Horn.getCompById("vc_branch_id_opbquery").getValue();
		    	 var vc_op_namesquery = Horn.getCompById("vc_op_namesquery").getValue();
		    	 var vc_op_codesquery = Horn.getCompById("vc_op_codesquery").getValue();
		 		if((vc_branch_id==""||vc_branch_id==null)&&(vc_op_namesquery==""||vc_op_namesquery==null)&&(vc_op_codesquery==""||vc_op_codesquery==null)){
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
		 			
		 			$.post(url+"&&sSql="+idstring2, Horn.getCompById("OperbranchForm").getValues(), function(data) {
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
		  //关闭分管领导界面 
		     addmaWinCancle2:function() {
				Horn.getComp("addma2Win").hide();
			},
		    //提交分管领导修改 
		      doAddma2:function(queryform){
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
					var vc_branch_id=Horn.getCompById("vc_branch_id2query").getValue();
					dialog.dialog("open");
					$.post("/am/am/system/branchmanager/doAddma2/operation.json?l_function_no="+functionIds["branch"]["addma"]+"&&idstring="+idstring2+"&&dotype=1&&c_branchrole_kind=1&&vc_branch_id="+vc_branch_id, null, function(data) 
					{
						dialog.dialog("close");
						  if (data == "ok") {
						  TDialog.Msg.alert("提示","操作成功",function(){
					            Horn.getComp("addma2Win").hide();
					            branch.formQuery();
					      }); 
						} 
//						  else {
//							Horn.Tip.warn(data);
//						}
					}, "text");
				}else{
					   Horn.Tip.warn("请选择一条记录！");
				   		return;
				}
				
					
		    }
		    /***********分管领导  页面事件  结束******/
		
};