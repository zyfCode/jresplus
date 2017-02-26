var product={
		//基金代码主键转换超链接
		 funlook:function(data){
			var s=(data.val).split(';');
	       return "<a href='javascript:void(0);' onclick='product.look(\""+s[1]+"\");' >"+s[0]+"</a>";
	    },
		//利率百分比转化 
		domrender:function(data){
		        var a=data.val;
		        //alert(parseFloat(a));
		        return parseFloat(a)*100;    
		 },
		//产品查看相关js
		 look:function(a){
		   $.post("/am/am/system/product/look.json?vc_product_id="+a, null, function(data) {
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
//							  //同步执行功能号字典重新加载
//				            	$.ajax({
//				            		type : "post",
//									url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+data.vc_branch_id,
//									data : "",
//									async : false,
//									dataType :"json",
//									success : function(result) {
//				            		       Horn.getCompById("vc_branch_id_look").addItems(result,true);
//									}
//								});
							    common_operate.geteditlist2('vc_branch_id_look','brach','1000043',data.vc_branch_id);
						        Horn.getComp("lookForm").setValues(data); 
						        Horn.getCompById("c_period_unit_look").setValue(data.vc_duration,true,true);
						        //默认值去零处理
						        product.updatezero(3,2);
						        product.updatezero(3,1);
						        common_operate.setFormReadOnly("lookForm"); 
							} 
			}, "json");   
		},
		//账户序号，资产单元序号  排除0判断    参数1：idtype区分是1新增2修改3查看   type区分（1：账户序号 ；2：资产单元序号）
		 updatezero:function(idtype,type){
			        if(idtype==1){
			        	idtype="";
			        }else if(idtype==2){
			        	idtype="_edit";
			        }else{
			        	idtype="_look";
			        }
			        if(type==1){
		        		var a=Horn.getCompById("fund_id"+idtype).getValue();
		        		if(a==0){
		        			Horn.getCompById("fund_id"+idtype).setValue("");	
		        		}
		        	}else{
		        		var a=Horn.getCompById("asset_id"+idtype).getValue();
		        		if(a==0){
		        			Horn.getCompById("asset_id"+idtype).setValue("");	
		        		}
		        	} 
			        	 	 
		 },
		  //公用   根据开始日期  期限计算结束日期
		      change:function(type2){
			 var type=constants.suffix[type2];
		     var  l_begin_date=Horn.getCompById("l_begin_date"+type).getValue();
		     var  vc_duration=Horn.getCompById("c_period_unit"+type).getValue(false,true);
		     var  c_period_unit=Horn.getCompById("c_period_unit"+type).getValue();
		     if(l_begin_date!=''){
			     $.post("/am/am/system/product/getenddate.json?l_begin_date="+l_begin_date+"&&vc_duration="+vc_duration+"&&c_period_unit="+c_period_unit, null, function(data) {
									if (data!=null) {
									     Horn.getCompById("l_end_date"+type).setValue(data.l_end_date);
									} 
									else {
										Horn.Tip.warn(data);
									}
				 }, "json");
		      }
		   },
		 //打开window的js   参数说明：type(对象),operate(操作：add,edit,start,end),form(操作的form),win(打开的弹窗名),table(使用的table名)
		openwindow:function(operate,form,win,table){
			$.post("/am/am/init/list.json", null, function(data) {
				if (data!=null) {					
		            if(data.l_operate_flag==0){	        		
			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {
			            	});	       
		            }else{
		            	if(operate=="add"){//产品添加相关
		            		   //新增window内容清空
			        			common_reg.Formreset(form);			     
			        			//window打开
			        			Horn.getComp(win).show(); 
		            	}else if(operate=="edit"){//产品修改相关js
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			        		$.post("/am/am/system/product/look.json?vc_product_id="+rowData.vc_product_id, null, function(data) {
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
		    						common_operate.geteditlist2('vc_branch_id_edit','brach','1000043',data.vc_branch_id);
					            	//查询结果表单赋值
		    						Horn.getComp(form).setValues(data);
		    						Horn.getCompById("c_period_unit_edit").setValue(data.vc_duration,true,true); 
					                Horn.getCompById("c_period_unit_edit").validate(); 
					              //默认值去零处理
							        product.updatezero(2,2);
							        product.updatezero(2,1);
								} else {
									Horn.Tip.warn("查询信息失败");
								}
				              }, "json");   		
		            	}else if(operate=="start"){//产品成立相关js
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		$.post("/am/am/system/product/look.json?vc_product_id="+rowData.vc_product_id, null, function(data) {
								if (data != null) {
									Horn.getComp(win).show(); 
//									//同步执行功能号字典重新加载
//					            	$.ajax({
//					            		type : "post",
//										url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+data.vc_branch_id,
//										data : "",
//										async : false,
//										dataType :"json",
//										success : function(result) {
//					            		       Horn.getCompById("vc_branch_id_4").addItems(result,true);
//										}
//									});
									common_operate.geteditlist2('vc_branch_id_4','brach','1000043',data.vc_branch_id);
					            	//查询结果表单赋值
		    						Horn.getComp(form).setValues(data);
		    						Horn.getCompById("l_begin_date2_4").setValue(rowData.l_begin_date); 
				    		        Horn.getCompById("c_period_unit_4").setValue(rowData.vc_duration,true,true);
				    		        Horn.getCompById("c_period_unit_4").validate(); 				      
								} else {
									Horn.Tip.warn("查询信息失败");
								} 
					         }, "json");  		
		            	}else if(operate=="end"){//产品不成立相关js
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		$.post("/am/am/system/product/look.json?vc_product_id="+rowData.vc_product_id, null, function(data) {
								if (data != null) {
									Horn.getComp(win).show(); 
//									//同步执行功能号字典重新加载
//					            	$.ajax({
//					            		type : "post",
//										url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+data.vc_branch_id,
//										data : "",
//										async : false,
//										dataType :"json",
//										success : function(result) {
//					            		       Horn.getCompById("vc_branch_id_5").addItems(result,true);
//										}
//									});
									common_operate.geteditlist2('vc_branch_id_5','brach','1000043',data.vc_branch_id);
									//查询结果表单赋值
		    						Horn.getComp(form).setValues(data);
				    		        Horn.getCompById("c_period_unit_5").setValue(rowData.vc_duration,true,true); 
				    		        Horn.getCompById("c_period_unit_5").validate();  				      
								} 
								else {
										Horn.Tip.warn("查询信息失败");
								}
					         }, "json");			  
		            	}else if(operate=="closedeal"){ //到期处理相关js
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		Horn.getComp(win).show();
			         		//查询结果表单赋值
    						Horn.getComp(form).setValues(rowData);
			                if(rowData.l_end_date2==0){
			                   Horn.getCompById("l_end_date2_6").setValue(dataUtil.getCurrentDate2());
			                }  			        
		            	}else if(operate=="addma"){ //根据产品编号获取管理人员信息
		            		if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		$.post("/am/am/system/product/manageinfo.json?l_function_no="+functionIds["product"]["getmainfo"]+"&vc_product_id="+rowData.vc_product_id, null, function(data) {
		        				Horn.getComp(win).show();
				         		//查询结果表单赋值
	    						Horn.getComp(form).setValues(data);
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
						url="/am/am/system/product/doAdd/operation.json?l_function_no="+functionIds["product"]["zl"]+"&&business_type=cpxz";
				}else if(operate=="edit"){//修改
						url="/am/am/system/product/doEdit/operation.json?l_function_no="+functionIds["product"]["zl"]+"&&business_type=cpxg";
				}else if(operate=="start"){//成立
						url="/am/am/system/product/operation.json?l_function_no="+functionIds["product"]["zl"]+"&&business_type=cpcl";
				}else if(operate=="end"){//不成立 
						url="/am/am/system/product/operation.json?l_function_no="+functionIds["product"]["zl"]+"&&business_type=cpsc&&l_end_date2="+dataUtil.getCurrentDate2();
				}else if(operate=="closedeal"){//到期
					url="/am/am/system/product/operation.json?l_function_no="+functionIds["product"]["zl"]+"&&business_type=cpdq";
				}else if(operate=="addma"){//管理人员任命
					url="/am/am/system/product/operation2.json?l_function_no="+functionIds["product"]["jlzl"]+"&&business_type=cpjlxz";
			    }else{
						url="";
				}
				
				$.post(url, values, function(data) {
							dialog.dialog("close");
							if (data == "ok") {
								TDialog.Msg.alert("提示","操作成功",function(){
									Horn.getComp(win).hide();
									common_operate.formQuery('productTable','productForm');
						        });
							} 
//							else {
//								Horn.Tip.warn(data);
//							}
				}, "text");
		    }	
		}
	 	   
};