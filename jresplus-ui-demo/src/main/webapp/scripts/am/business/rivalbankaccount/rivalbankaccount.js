var rivalbankaccount={
		//对手方type后缀转化
		typechange:function(type){
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
			return type2;
		},
		 change:function(type,s){
			 var type2=rivalbankaccount.typechange(type);
		     var  val=Horn.getCompById("vc_province_no"+type2).getValue();
		   //处理特别行政区为非必填
		     if(val=='71'||val=='81'||val=='82'){
		      	  Horn.getCompById("vc_city_no"+type2).setRequired(false);
		      }else{
		      	  Horn.getCompById("vc_city_no"+type2).setRequired(true);
		      }
		      $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
								if (data !=null) {
									 Horn.getCompById("vc_city_no"+type2).addItems(data,true);
									 if(s!=0){
										   Horn.getCompById("vc_city_no"+type2).setValue(s,true);
										}
								} 
			 }, "json");
		      
		   },
		   //根据选择的银行自动填充银行名称
		     changebank:function(type){
		 	   var type2=rivalbankaccount.typechange(type);
		 	     var  val=Horn.getCompById("vc_bank_no"+type2).getValue();
		 	    var s=$("#vc_bank_no"+type2).nextAll(".hc_checkboxdiv:eq(0)").find("ul > li[key="+val+"]").attr("title");
		        Horn.getCompById("vc_bank_name"+type2).setValue(s);
		    },
		  //主键转换
			 funlook:function(data){
		       return "<a href='javascript:void(0);' onclick='rivalbankaccount.look(\""+data.val+"\");' >"+data.val+"</a>";
		   },
		 //查看
			  look:function(a){
			    $.post("/am/am/business/rivalbankaccount/look.json?l_serial_no="+a, null, function(data) {
								if (data != null) {
								    Horn.getComp("lookWin").show();    
		                            Horn.getComp("lookForm").setValues(data);
		                            rivalbankaccount.change(3,data.vc_city_no);
		                       	 common_operate.switchFormReadOnly("lookForm"); 
								} 
				}, "json");    
			},
		   //打开window的js   参数说明：operate(操作：add,edit,del,look),form(操作的form),win(打开的弹窗名),table(使用的table名)
			openwindow:function(operate,form,win,table){
				$.post("/am/am/init/list.json", null, function(data) {
					if (data!=null) {					
			            if(data.l_operate_flag==0){	        		
				            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {					 				           		
				            	});	       
			            }else{
			            	if(operate=="add"){  //添加相关js 
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
					         		//单条查询url处理
					         		var  url="/am/am/business/rivalbankaccount/look.json?l_serial_no="+rowData.l_serial_no;
					         		$.post(url, null, function(data) {
		    							if (data != null) {
		    								//修改界面打开
		    								Horn.getComp(win).show();
		    							    //查询结果表单赋值
		    							    Horn.getComp(form).setValues(data); 
		    							    rivalbankaccount.change(2,data.vc_city_no);
		    							}
		    			           }, "json");   
			            		
			            	}else if(operate=="del"){
			            		/***删除**/
			            		if (Horn.getComp(table).getSelecteds().length==0){
				        	   		Horn.Tip.warn("请选择一条记录！");
				        	   		return;
				        	   }else{
				        		   rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];   				        		   
				        		   var messageobject="对手方账户";
				        		   var url="/am/am/business/rivalbankaccount/operation.json?l_function_no="+functionIds["rivalbankaccount"]["zl"]+"&&business_type=dszhsc&&l_serial_no="+rowData.l_serial_no;	
				            	   TDialog.Msg.confirm("提示","您确定要删除"+messageobject+"吗",function(){
				        			   //ok
				        			   dialog.dialog("open");
				        			   $.post(url, null, function(data) {
				        				   dialog.dialog("close");
				        				    if (data == "ok") {
				        				    	common_operate.formQuery(table,form);
				     	        				Horn.Tip.success("操作成功");
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
		//表单提交	
	   commit:function(operate,form,win){
		    var result = Horn.getComp(form).isValid();
			if(result)
			{
			          var values = Horn.getComp(form).getValues();
			         dialog.dialog("open");
			         var url;
			         if(operate=="add"){
			        	 url="/am/am/business/rivalbankaccount/operation.json?l_function_no="+functionIds["rivalbankaccount"]["zl"]+"&&business_type=dszhxz";
			         }else if(operate=="edit"){
			        	 url="/am/am/business/rivalbankaccount/operation.json?l_function_no="+functionIds["rivalbankaccount"]["zl"]+"&&business_type=dszhxg";
			         }else{
			        	 url="";
			         }
			           $.post(url, values, function(data) {
			        	   dialog.dialog("close");
			        	   if (data == "ok") {
								TDialog.Msg.alert("提示", "操作成功！", function() {
									Horn.getComp(win).hide();
									common_operate.formQuery('bankaccountTable','bankaccountForm');
								});
							} 
						}, "text");
		    }			
		}
};