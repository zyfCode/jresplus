var dctionary={
		formQuery:function(table,form){
			var result = Horn.getComp("dctionaryForm").isValid();
			if(result){
				Horn.getCompById("dctionaryTable").setBaseParams(Horn.getCompById("dctionaryForm").getValues());
				Horn.getCompById("dctionaryTable").load('',{"pageNo":1});
			}
			
		},
		testRowClick:function(rowdata){
			    var  a=rowdata.l_key;
		        if(a=='1211'||a=='1241'){
			  		Horn.getCompById('dctionaryTable').hideButton("ctbutton2",false); 
			        Horn.getCompById('dctionaryTable').hideButton("ctbutton3",false); 
			 	 }else{
			 	   Horn.getCompById('dctionaryTable').hideButton("ctbutton2",true); 
			       Horn.getCompById('dctionaryTable').hideButton("ctbutton3",true);
			 	 }
			 
			  	common_operate.getButtonAuthority("dctionaryTable", "dctionary"); 
		},
		 domrender:function(data){
	        var a=data.val;
	        //alert(a);
	        if(a=="1"){
	           return "是";
	        }else if(a=="0"){
	           return "否";
	        }else{
	           return  "";
	        }
	    },
		 WinCancle:function(win) {
				Horn.getComp(win).hide();
			},
		 //打开window的js   参数说明：type(对象),operate(操作：add,edit,del,look,show,hide),form(操作的form),win(打开的弹窗名),table(使用的table名)
		openwindow:function(operate,form,win,table){
			$.post("/am/am/init/list.json", null, function(data) {
				if (data!=null) {					
		            if(data.l_operate_flag==0){	        		
			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {
			            	});	       
		            }else{
		            	if(operate=="add"){
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
				         		if(rowData.l_key=='1211'||rowData.l_key=='1241'){
				         			//修改界面打开
		    						Horn.getComp(win).show();
		    						//查询结果表单赋值
		    						Horn.getComp(form).setValues(rowData);	
				    			}else{
				    			   Horn.Tip.warn("所选记录不能修改！");
				    	   		   return;
				    			}
				         		
		            	}else if(operate=="del"){
		            	   if (Horn.getComp(table).getSelecteds().length==0){
			        	   		Horn.Tip.warn("请选择一条记录！");
			        	   		return;
			        	   }else{
			        		   var messageobject;
			        		   var url;
			        		   var length = Horn.getComp(table).getSelecteds().length;
		            			var values = (Horn.getComp(table).getSelecteds());
		            			var  i=0;
		            			var  idstring='';
		            			while(length>i){
		            			   if(values[i].l_key=='1211'||values[i].l_key=='1241'){
		            				   if(idstring==''){
		            				      idstring=values[i].l_key+"@"+values[i].c_value;
		            				   }else{
		            				       idstring=idstring+";"+values[i].l_key+"@"+values[i].c_value;
		            				   }
		            			   }
		            			   i++;
		            			}
			            		messageobject="数据字典信息";
			            		url="/am/am/system/dctionary/del/deal.json?l_function_no="+functionIds["dctionary"]["del"]+"&&idstring="+idstring+"&&dotype=3&&flag=0";			           
			        		   TDialog.Msg.confirm("提示","您确定要删除"+messageobject+"吗",function(){
			        			   //ok
			        			   dialog.dialog("open");
			        			   $.post(url, null, function(data) {
			        				   dialog.dialog("close");
			        				    if (data == "ok") {
			        				    	TDialog.Msg.alert("提示","操作成功",function(){
			        				    		dctionary.formQuery(table,form);
			        				    	});
			     	        			} 
//			        				    else {
//			     	        			    Horn.Tip.warn(data);
//			     	        			}
			     	        		}, "text");
			       	           },function(){  
			       		          //canel  
			       		       });
			        	   }		         
		            	}else if(operate=="show"){  //字典显示
		            		   if (Horn.getComp(table).getSelecteds().length==0){
				        	   		Horn.Tip.warn("请选择一条记录！");
				        	   		return;
				        	   }else{
				        		   var messageobject;
				        		   var url;
				        		   var length = Horn.getComp(table).getSelecteds().length;
				        		   var values = (Horn.getComp(table).getSelecteds());
			        				var  i=0;
			        				var  idstring='';
			        				while(length>i){
			        				   if(i==0){
			        				      idstring=values[i].l_key+"@"+values[i].c_value;
			        				   }else{
			        				       idstring=idstring+";"+values[i].l_key+"@"+values[i].c_value;
			        				   }
			        				   i++;
			        				}
				            		messageobject="显示数据字典";
				            		url="/am/am/system/dctionary/showdct/deal.json?l_function_no="+functionIds["dctionary"]["show"]+"&&idstring="+idstring+"&&dotype=2&&flag=0";			           
				        		   TDialog.Msg.confirm("提示","您确定要"+messageobject+"吗",function(){
				        			   //ok
				        			   dialog.dialog("open");
				        			   $.post(url, null, function(data) {
//				        				   dialog.dialog("close");
				        				    if (data == "ok") {
				        				    	dctionary.reflash(table,form,win);
//				        				    	dctionary.formQuery(table,form);
//				     	        				Horn.Tip.success("操作成功");
				     	        			} 
//				        				    else {
//				     	        			    Horn.Tip.warn(data);
//				     	        			}
				     	        		}, "text");
				       	           },function(){  
				       		          //canel  
				       		       });
				        	   }
			            }else if(operate=="hide"){  //字典隐藏
		            		   if (Horn.getComp(table).getSelecteds().length==0){
				        	   		Horn.Tip.warn("请选择一条记录！");
				        	   		return;
				        	   }else{
				        		   var messageobject;
				        		   var url;
				        		   var length = Horn.getComp(table).getSelecteds().length;
				        		   var values = (Horn.getComp(table).getSelecteds());
				        		   var  i=0;
									var  idstring='';
									while(length>i){
									   if(i==0){
									      idstring=values[i].l_key+"@"+values[i].c_value;
									   }else{
									       idstring=idstring+";"+values[i].l_key+"@"+values[i].c_value;
									   }
									   i++;
									}
				            		messageobject="隐藏数据字典";
				            		url="/am/am/system/dctionary/hidedct/deal.json?l_function_no="+functionIds["dctionary"]["show"]+"&&idstring="+idstring+"&&dotype=2&&flag=1";			           
				        		   TDialog.Msg.confirm("提示","您确定要"+messageobject+"吗",function(){
				        			   //ok
				        			   dialog.dialog("open");
				        			   $.post(url, null, function(data) {
				        				   //dialog.dialog("close");
				        				    if (data == "ok") {
				        				    	dctionary.reflash(table,form,win);
//				        				    	dctionary.formQuery(table,form);
//				     	        				Horn.Tip.success("操作成功");
				     	        			} 
				     	        		}, "text");
				       	           },function(){  
				       		          //canel  
				       		       });
				        	   }
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
						url="/am/am/system/dctionary/doAdd/operation.json?l_function_no="+functionIds["dctionary"]["add"]+"&&dotype=1";
				}else if(operate=="edit"){//修改
						url="/am/am/system/dctionary/doEdit/operation.json?l_function_no="+functionIds["dctionary"]["edit"]+"&&dotype=2";
				}else{
						url="";
				}
				
				$.post(url, values, function(data) {
							//dialog.dialog("close");
							if (data == "ok") {
								dctionary.reflash('dctionaryTable','dctionaryForm',win);
							} 
//							else {
//								Horn.Tip.warn(data);
//							}
				}, "text");
		    }	
		},
		reflash:function(table,form,win){
	 	           $.post("/am/am/system/sysconfig/reflash.json?key=SYSTEM_DICT", null, function(data) {
	 	            	dialog.dialog("close");
							if (data == "ok") {
	 							TDialog.Msg.alert("提示","操作成功",function(){
	 								if(win){
	 									Horn.getComp(win).hide();
	 								}
	 								dctionary.formQuery(table,form);
	 					        });
	 						}
							else {
								TDialog.Msg.alert("提示","非管理员无操作权限,请联系管理员刷新数据字典缓存"); 
	 						}
	 					}, "text");     
	 	 }
	 	   
};