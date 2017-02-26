var attachment={
		 WinCancle:function(win) {
				Horn.getComp(win).hide();
			},
		 //打开window的js   参数说明：type(对象),operate(操作：add,edit,del,look),form(操作的form),win(打开的弹窗名),table(使用的table名)
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
				         		//修改界面打开
	    						Horn.getComp(win).show();
	    						//股东信息修改//查询结果表单赋值
	    						Horn.getComp(form).setValues(rowData);	
		            	}else if(operate=="del"){
		                   if (Horn.getComp(table).getSelecteds().length==0){
			        	   		Horn.Tip.warn("请选择一条记录！");
			        	   		return;
			        	   }else{
			        		   var messageobject;
			        		   var url;
			        		   rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];   
			        		    //股东信息删除
			            		messageobject="附件上传配置信息";
			            		url="/am/am/system/sysconfig/del/operation2.json?vc_organization_code="+rowData.vc_organization_code+"&&l_function_no="+functionIds["attachment"]["del"];			           
			        		   TDialog.Msg.confirm("提示","您确定要删除"+messageobject+"吗",function(){
			        			   //ok
			        			   dialog.dialog("open");
			        			   $.post(url, null, function(data) {
			        				   dialog.dialog("close");
			        				    if (data == "ok") {
			        				    	common_operate.formQuery(table,form);
			     	        				Horn.Tip.success("操作成功");
			     	        			} 
//			        				    else {
//			     	        			    Horn.Tip.warn(data);
//			     	        			}
			     	        		}, "text");
			       	           },function(){  
			       		          //canel  
			       		       });
			        	   }
		            		/***删除在此处加**/
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
						url="/am/am/system/sysconfig/doAdd/operation2.json?l_function_no="+functionIds["attachment"]["add"];
				}else if(operate=="edit"){//修改
						url="/am/am/system/sysconfig/edit/operation2.json?l_function_no="+functionIds["attachment"]["edit"];
				}else{
						url="";
				}
				
				$.post(url, values, function(data) {
							dialog.dialog("close");
							if (data == "ok") {
								TDialog.Msg.alert("提示","操作成功",function(){
									Horn.getComp(win).hide();
									common_operate.formQuery('bankaccountTable','bankaccountForm');
						        });
							} 
//							else {
//								Horn.Tip.warn(data);
//							}
				}, "text");
		    }	
		}
	 	   
};