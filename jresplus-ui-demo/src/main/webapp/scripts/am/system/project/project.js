$(function(){
	//已选列双击事件
	$("#bar2").on("dblclick","li", function(event) {
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
			//移除操作
			$(this).find("input:checkbox").removeAttr("checked");
			$(this).removeClass("block__list-row-selected");
			if(s==0){
				$(this).remove();
			}else{
				$(this).appendTo('#foo2');
			}
		}
	 });
	//待选列双击事件
	$("#foo2").on("dblclick","li", function(event) {
		console.log(event.target.tagName);
		//处理子节点input单击事件向上冒泡做判断
		if(event.target.tagName!="INPUT"){
			$(this).find("input:checkbox").removeAttr("checked");
			$(this).removeClass("block__list-row-selected");
			$(this).appendTo('#bar2');	
		}
	 });
	
		  //新增选中值
		 $("#add2").click(
		     function() {
		         	  var num=0;
					    	$("#foo2").find("li").each(function(){
					    			var f=$(this).find("input:checkbox").is(":checked");
					    			if(f){
					    				$(this).find("input:checkbox").removeAttr("checked");
					    				$(this).removeClass("block__list-row-selected");
					    				$(this).appendTo('#bar2');
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
		  $("#del2").click(
		     function() {
		         	  var num=0;
					    	$("#bar2").find("li").each(function(){
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
					    					$(this).appendTo('#foo2');
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
				  
	
 });
var  project={
		//项目总金额大写绑定
		lockmoneydx : function(type) {
			//字段后缀
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
			common_operate.dealCapital("en_project_money_x" + type2,"en_project_money"+ type2);
		},//项目总金额大写赋值
		editmoneydxsetvalue : function(type) {
			//字段后缀
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
			Horn.getCompById("en_project_money_x" + type2).setValue($("#en_project_money"+ type2 + " > .u-typefield-capital").text());
		},
		 //主键转换
		funlook:function(data){
	       return "<a href='javascript:void(0);' onclick='project.look(\""+data.val+"\");' >"+data.val+"</a>";
	   },
	   //单击函数
	   testRowClick:function(rowdata){
			 if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
				  Horn.getComp('projectTable').hideButton("ctbutton2",true); 
				  Horn.getComp('projectTable').hideButton("ctbutton3",true); 
				  Horn.getComp('projectTable').hideButton("ctbutton4",true); 
			  }else{
				  Horn.getComp('projectTable').hideButton("ctbutton2",false); 
				  Horn.getComp('projectTable').hideButton("ctbutton3",false);
				  Horn.getComp('projectTable').hideButton("ctbutton4",false);
			  }
			  common_operate.getBusAuthority("projectTable","project","1");
		},
		//项目查看相关js
		 look:function(a){
		   $.post("/am/am/system/project/look.json?vc_project_code="+a, null, function(data) {
							if (data != null) {
							    Horn.getComp("lookWin").show(); 
							  //回退到最初打开界面状态选中第一个panel
							    if($("#myTab li:eq(0)").attr("class")!="active"){
									$("#myTab li:eq(0)").attr("class","active");
									$("#myTab li:eq(1)").removeClass("active");
									$("#myTab li:eq(2)").removeClass("active");
									$("#tab1").addClass("active");
									$("#tab2").removeClass("active");
									$("#tab3").removeClass("active");
								}
							  //同步执行功能号字典重新加载
				            	$.ajax({
				            		type : "post",
									url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+data.vc_branch_id,
									data : "",
									async : false,
									dataType :"json",
									success : function(result) {
				            		       Horn.getCompById("vc_branch_id_look").addItems(result,true);
									}
								});
						        Horn.getComp("lookForm").setValues(data); 
						        common_operate.setFormReadOnly("lookForm"); 
						        project.editmoneydxsetvalue(3);
							} 
			}, "json");   
		},
		 //打开window的js   参数说明：type(对象),operate(操作：add,edit,del),form(操作的form),win(打开的弹窗名),table(使用的table名)
		openwindow:function(operate,form,win,table){
			$.post("/am/am/init/list.json", null, function(data) {
				if (data!=null) {					
		            if(data.l_operate_flag==0){	        		
			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {
			            	});	       
		            }else{
		            	if(operate=="add"){//项目添加相关js 
		            		   //新增window内容清空
			        			common_reg.Formreset(form);			     
			        			//window打开
			        			Horn.getComp(win).show(); 
		            	}else if(operate=="edit"){
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		$.post("/am/am/system/project/look.json?vc_project_code="+rowData.vc_project_code, null, function(data) {
								if (data != null) {
									//修改界面打开
		    						Horn.getComp(win).show();
//									//同步执行功能号字典重新加载
//					            	$.ajax({
//					            		type : "post",
//										url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+data.vc_branch_id,
//										data : "",
//										async : false,
//										dataType :"json",
//										success : function(result) {
//					            		       Horn.getCompById("vc_branch_id_edit").addItems(result,true);
//										}
//									});					         
					              //查询结果表单赋值
		    						Horn.getComp(form).setValues(data);
		    						common_operate.geteditlist2('vc_branch_id_edit','brach','1000043',data.vc_branch_id);
					                project.editmoneydxsetvalue(2);
								}
								else {
									Horn.Tip.warn("查询信息失败");
								}
				           }, "json");  			         					               
		            	}else if(operate=="del"){//项目删除
			            	   if (Horn.getComp(table).getSelecteds().length==0){
				        	   		Horn.Tip.warn("请选择一条记录！");
				        	   		return;
				        	   }else{
				        		   var messageobject;
				        		   var url;
				            		messageobject="项目信息";
				            		//获取选中记录的数据 
					         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
					               url="/am/am/system/project/del/operation.json?l_function_no="+functionIds["project"]["zl"]+"&&business_type=xmsc&&vc_project_code="+rowData.vc_project_code;			           
				        		   TDialog.Msg.confirm("提示","您确定要删除"+messageobject+"吗",function(){
				        			   //ok
				        			   dialog.dialog("open");
				        			   $.post(url, null, function(data) {
				        				   dialog.dialog("close");
				        				    if (data == "ok") {
				        				    	TDialog.Msg.alert("提示","操作成功",function(){
				        				    		common_operate.formQuery(table,form);
				        				    	});
				     	        			} 
				     	        		}, "text");
				       	           },function(){  
				       		          //canel  
				       		       });
				        	   }		         
			            }else if(operate=="addma"){ //根据项目代码获取管理人员信息
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			        		$.post("/am/am/system/project/manageinfo.json?vc_project_code="+rowData.vc_project_code+"&&vc_project_name="+rowData.vc_project_name, null, function(data) {
			        			    common_reg.Formreset(form);
			        			    Horn.getComp(win).show();
			        				/**jresui不支持下拉多选框初始为空进行value的直接赋值（复核有问题）**/
			        				//common_operate.queryOperatorbybranch("vc_operators_4",data.vc_operators);
			        			  //查询结果表单赋值
		    						Horn.getComp(form).setValues(data);
			                        if(data.vc_project_manager!=null&&data.vc_project_manager!=""){
			                        common_operate.geteditlist("vc_project_manager_4","operator","1001429",data.vc_project_manager);
			                        }
			                        Horn.getCompById("vc_project_name_4").setValue(rowData.vc_project_name);
			        		}, "json");         
		            	}
		            	/***新的操作类型在此处加*****/
		            	
		            } 
				}
	       }, "json");
			
		},
		commit:function(operate,form,win){
			var result = Horn.getComp(form).isValid();
			if(result)
			{
				var values = Horn.getComp(form).getValues();
				dialog.dialog("open");
				var url;
				if(operate=="add"){//添加
						url="/am/am/system/project/doAdd/operation.json?l_function_no="+functionIds["project"]["zl"]+"&&business_type=xmxz";
				}else if(operate=="edit"){//修改
						url="/am/am/system/project/doEdit/operation.json?l_function_no="+functionIds["project"]["zl"]+"&&business_type=xmxg";
				}else if(operate=="addma"){//管理人员任命
					    url="/am/am/system/project/operation2.json?l_function_no="+functionIds["project"]["jlzl"]+"&&business_type=xmjlxz";
			    }else{
						url="";
				}
				
				$.post(url, values, function(data) {
							dialog.dialog("close");
							if (data == "ok") {
								TDialog.Msg.alert("提示","操作成功",function(){
									Horn.getComp(win).hide();
									common_operate.formQuery('projectTable','projectForm'); 
						        });
							} 
//							else {
//								Horn.Tip.warn(data);
//							}
				}, "text");
		    }	
		}
		
};

