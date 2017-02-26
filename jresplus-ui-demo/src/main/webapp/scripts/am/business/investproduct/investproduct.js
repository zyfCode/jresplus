//金融产品信息
var investproduct = {
		
		//金融产品单击
	    testRowClick:function(rowdata){
		  var  a=rowdata.c_penetration_flag;
		  if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
			  Horn.getComp('bankaccountTable').hideButton("invest2",true); 
			  Horn.getComp('bankaccountTable').hideButton("invest3",true);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton",true);
		  }else{
			  Horn.getComp('bankaccountTable').hideButton("invest2",false); 
			  Horn.getComp('bankaccountTable').hideButton("invest3",false);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton",false); 
		  }
		  if(a=='1'){
		        Horn.getComp('bankaccountTable').hideButton("ctbutton",false); 
		  }else{
		       Horn.getComp('bankaccountTable').hideButton("ctbutton",true);
		  }
		  common_operate.getBusAuthority("bankaccountTable","investproduct",'0');
		},
		//穿透资产单击
	      testRowClick2:function(rowdata){
	    	if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
	    		  Horn.getComp('holderTable').hideButton("ct2",true); 
	    		  Horn.getComp('holderTable').hideButton("ct3",true); 
	    	}else{
	    		  Horn.getComp('holderTable').hideButton("ct2",false); 
	      	  Horn.getComp('holderTable').hideButton("ct3",false); 
	    	}
	  	  common_operate.getBusAuthority("holderTable","ctproduct",'0'); 
	  	},
	  //添加穿透资产类型
	      addtype:function(element2) {
			$("#element2").val(element2);
		    Horn.getComp("addtypeWin").show();
		},
	  	//小数转化百分比
	  	funratio:function(data){
	        return parseFloat(data.val)*100;
	    },
	  //主键转换
		 funlook:function(data){
	       return "<a href='javascript:void(0);' onclick='investproduct.look(\""+data.val+"\");' >"+data.val+"</a>";
	   },
	 //替换字符串  
	     Replace:function(str, from, to) {
	        return str.split(from).join(to);
	    },
	  //返回月份(两位数)  
	     GetFullMonth:function(date) {
	        var v = date.getMonth() + 1;
	        if (v > 9) return v.toString();
	        return "0" + v;
	    },
	    // 日期类型格式成指定的字符串
	     FormatDate:function(date, format) {
	        format = investproduct.Replace(format, "yyyy", date.getFullYear());
	        format = investproduct.Replace(format, "MM", investproduct.GetFullMonth(date));
	        format = investproduct.Replace(format, "dd", "20");
	        return format;
	    },
	  //计算首次结息日
		  caclenddate:function(type){
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
			var  l_begin_days=Horn.getCompById("l_begin_days"+type2).getValue();
			var  l_end_days=Horn.getCompById("l_end_days"+type2).getValue();
			if(Horn.getCompById("en_pay_inteval"+type2).getValue()!=null&&Horn.getCompById("en_pay_inteval"+type2).getValue()!=''&&Horn.getCompById("en_pay_inteval"+type2).getValue()!='0'){
				var  en_pay_inteval=parseInt(Horn.getCompById("en_pay_inteval"+type2).getValue());
			}else if(Horn.getCompById("en_pay_inteval"+type2).getValue()=='0'){
				var  en_pay_inteval="0";
			}else{
				var  en_pay_inteval="";
			}
			if(l_begin_days!=""){
				if(en_pay_inteval==""||en_pay_inteval==null){
					Horn.getCompById("l_first_pay_date"+type2).clearValue();
	 	        }else if(en_pay_inteval=='0'){
	 	        	Horn.getCompById("l_first_pay_date"+type2).setValue(l_end_days);
	 	        }else{
	 	        	l_begin_days=l_begin_days.substring(0,4)+"/"+l_begin_days.substring(4,6)+"/"+l_begin_days.substring(6,8);
	 	            var date_begin=new Date(l_begin_days);
	 	            if(parseInt(l_begin_days.substring(6,8))<20){
	 	            	en_pay_inteval=en_pay_inteval-1;
	 	            }
	 	            date_begin.setMonth(date_begin.getMonth() + en_pay_inteval);
	 	            Horn.getCompById("l_first_pay_date"+type2).setValue(investproduct.FormatDate(date_begin,"yyyyMMdd"));
	 	        }
	        }else{
	        	TDialog.Msg.error("提示","开始日期不能为空",function(){ 
	        		Horn.getCompById("en_pay_inteval"+type2).clearValue();
				});
	        } 
		},
	//收益联动
	cProfitTypeChange:function(type) {
		type = constants.suffix[type] || "";
		// var c_profit_type = $("#c_profit_type" + type + " >
		// input:eq(0)").val();
		var c_product_type = Horn.getCompById("c_product_type" + type).getValue();
		if (c_product_type == "3" || c_product_type == "4") {
			var c_profit_type = Horn.getCompById("c_profit_type" + type)
					.getValue();
			if (c_profit_type == "2") {// 隐藏利率
				Horn.getCompById("2"+type).disable();
				Horn.getCompById("2"+type).hide();
				$("div[title='2"+type+"'][class='stockcodesex_title']").hide();
				Horn.getCompById("c_calc_cycle" + type).setDisabled(true);
				Horn.getCompById("en_pay_inteval" + type).setDisabled(true);
				Horn.getCompById("l_first_pay_date" + type).setDisabled(true);
				Horn.getCompById("en_rate" + type).setDisabled(true);

				Horn.getCompById("c_calc_cycle" + type).hide();
				Horn.getCompById("en_pay_inteval" + type).hide();
				Horn.getCompById("l_first_pay_date" + type).hide();
				Horn.getCompById("en_rate" + type).hide();
				Horn.getCompById("en_publisher_scale" + type).hide();
			} else {
				Horn.getCompById("2"+type).enable();
				Horn.getCompById("2"+type).show();
				$("div[title='2"+type+"'][class='stockcodesex_title']").show();
				
				Horn.getCompById("c_calc_cycle" + type).setDisabled(false);
				Horn.getCompById("en_pay_inteval" + type).setDisabled(false);
				Horn.getCompById("l_first_pay_date" + type).setDisabled(false);
				Horn.getCompById("en_rate" + type).setDisabled(false);

				Horn.getCompById("c_calc_cycle" + type).show();
				Horn.getCompById("en_pay_inteval" + type).show();
				Horn.getCompById("l_first_pay_date" + type).show();
				Horn.getCompById("en_rate" + type).show();
//				$("#1" + type).next().show();
				Horn.getCompById("en_publisher_scale" + type).show();
			}
			//判断信托计划固定收益类必填评级
			if (c_product_type == "4"&&c_profit_type == "1") {
				Horn.getCompById("c_internal_rating" + type).setRequired(true);
				Horn.getCompById("c_external_rating" + type).setRequired(true);
			}else{
				Horn.getCompById("c_internal_rating" + type).setRequired(false);
				Horn.getCompById("c_external_rating" + type).setRequired(false);
			}
		} else {
			Horn.getCompById("2"+type).enable();
			Horn.getCompById("2"+type).show();
			$("div[title='2"+type+"'][class='stockcodesex_title']").show();
			Horn.getCompById("c_calc_cycle" + type).setDisabled(false);
			Horn.getCompById("en_pay_inteval" + type).setDisabled(false);
			Horn.getCompById("l_first_pay_date" + type).setDisabled(false);
			Horn.getCompById("en_rate" + type).setDisabled(false);

			Horn.getCompById("c_calc_cycle" + type).show();
			Horn.getCompById("en_pay_inteval" + type).show();
			Horn.getCompById("l_first_pay_date" + type).show();
			Horn.getCompById("en_rate" + type).show();
//			$("#1" + type).next().show();
			Horn.getCompById("en_publisher_scale" + type).show();
			//判断债权计划必填评级
			if (c_product_type == "1") {
				Horn.getCompById("c_internal_rating" + type).setRequired(true);
				Horn.getCompById("c_external_rating" + type).setRequired(true);
			}else{
				Horn.getCompById("c_internal_rating" + type).setRequired(false);
				Horn.getCompById("c_external_rating" + type).setRequired(false);
			}
		}
	},
	//产品种类改变事件
	 changeproduct:function(type2){
		 var type=constants.suffix[type2];
	     var  val=Horn.getCompById("c_product_type"+type).getValue();
	     var filter;
	     var filter2;
	     if(val==''||val==null){
	    	   Horn.getCompById("c_profit_type"+type).show(); 
	 	        Horn.getCompById("c_profit_type"+type).setDisabled(false);
	 	        Horn.getCompById("c_special_flag"+type).show(); 
	 	        Horn.getCompById("c_special_flag"+type).setDisabled(false);
	 	        Horn.getCompById("c_penetration_flag"+type).show(); 
	 	        Horn.getCompById("c_penetration_flag"+type).setDisabled(false);
	     }else{
	    	 if(val=='1'){
	 	        filter="1,2";
	 	        filter2="";
	 	     }else if(val=='2'){
	 	        filter="3,4,a";
	 	        filter2="";
	 	     }else if(val=='3'){
	 	        filter="5,6";
	 	        filter2="1,2,3,4,b,c";
	 	     }else if(val=='4'){
	 	        filter="7,8,9";
	 	        filter2="1,2";
	 	     }else if(val=='5'){
	 	        filter="A,B";
	 	        filter2="7,8,9,a";
	 	     }else{
	 	        filter="";
	 	        filter2="";
	 	     }
	 	     Horn.getCompById("c_product_ext_type"+type).filter(filter,true,false);
	 	     Horn.getCompById("c_profit_type"+type).filter(filter2,true,false);
	 	    if(val=='1'||val=='2'){
	 	        Horn.getCompById("c_profit_type"+type).hide(); 
	 	        Horn.getCompById("c_profit_type"+type).setDisabled(true);
	 	        Horn.getCompById("c_penetration_flag"+type).hide(); 
	 	        Horn.getCompById("c_penetration_flag"+type).setDisabled(true);
	 	     }else{
	 	        if(val=='3'||val=='4'){
	 	         Horn.getCompById("c_penetration_flag"+type).show(); 
	 	         Horn.getCompById("c_penetration_flag"+type).setDisabled(false);
	 	        }else{
	 	          Horn.getCompById("c_penetration_flag"+type).hide(); 
	 	          Horn.getCompById("c_penetration_flag"+type).setDisabled(true);
	 	        }
	 	        Horn.getCompById("c_profit_type"+type).show(); 
	 	        Horn.getCompById("c_profit_type"+type).setDisabled(false);
	 	     } 
	 		Horn.getCompById("c_special_flag"+type).hide(); 
	        Horn.getCompById("c_special_flag"+type).setDisabled(true);
	     }
	     investproduct.cProfitTypeChange(type2);
	},
	//产品细分改变事件
	 changedetail:function(type2){
		 var type=constants.suffix[type2];
	      var  val=Horn.getCompById("c_product_ext_type"+type).getValue();
	       if(val=='3'){
	         Horn.getCompById("c_special_flag"+type).show(); 
	         Horn.getCompById("c_special_flag"+type).setDisabled(false);
	         Horn.getCompById("c_penetration_flag"+type).hide(); 
	         Horn.getCompById("c_penetration_flag"+type).setDisabled(true);
	       }else{
	          if(val=='4'){
	            Horn.getCompById("c_penetration_flag"+type).show(); 
	            Horn.getCompById("c_penetration_flag"+type).setDisabled(false);
	          }
	         Horn.getCompById("c_special_flag"+type).hide(); 
	         Horn.getCompById("c_special_flag"+type).setDisabled(true);
	       }	 
	},
	//退出方式改变事件
	 changequitway:function(type){
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
		var a=Horn.getCompById("c_quit_way"+type2).getValue();
		if(a=="1"||a==""){
			Horn.getCompById("2"+type2).enable();
			 Horn.getCompById("2"+type2).show();
			 $("div[title='2"+type2+"'][class='stockcodesex_title']").show();
			 Horn.getCompById("c_calc_cycle"+type2).setDisabled(false);
			 Horn.getCompById("en_pay_inteval"+type2).setDisabled(false);
			 Horn.getCompById("l_first_pay_date"+type2).setDisabled(false);
			 Horn.getCompById("en_rate"+type2).setDisabled(false);
			 Horn.getCompById("vc_remark"+type2).setDisabled(false);
			 Horn.getCompById("c_calc_cycle"+type2).show();
			 Horn.getCompById("en_pay_inteval"+type2).show();
			 Horn.getCompById("l_first_pay_date"+type2).show();
			 Horn.getCompById("en_rate"+type2).show();
			 Horn.getCompById("vc_remark"+type2).show();
		}else{
			 Horn.getCompById("2"+type2).disable();
			 Horn.getCompById("2"+type2).hide();
			 $("div[title='2"+type2+"'][class='stockcodesex_title']").hide();
			 Horn.getCompById("c_calc_cycle"+type2).setDisabled(true);
			 Horn.getCompById("en_pay_inteval"+type2).setDisabled(true);
			 Horn.getCompById("l_first_pay_date"+type2).setDisabled(true);
			 Horn.getCompById("en_rate"+type2).setDisabled(true);
			 Horn.getCompById("vc_remark"+type2).setDisabled(true);
			 Horn.getCompById("c_calc_cycle"+type2).hide();
			 Horn.getCompById("en_pay_inteval"+type2).hide();
			 Horn.getCompById("l_first_pay_date"+type2).hide();
			 Horn.getCompById("en_rate"+type2).hide();
			 Horn.getCompById("vc_remark"+type2).hide();
		}
	},
	//查看相关js
	 look:function(a){
	    $.post("/am/am/business/investproduct/look.json?vc_stock_code1="+a, null, function(data) {
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
						    Horn.getComp("lookForm").setValues(data);
                           investproduct.changeproduct(3);
                           investproduct.changedetail(3);
 						 common_operate.setFormReadOnly("lookForm"); 
 						 //同步执行功能号字典重新加载   外部评级机构
 						 common_operate.geteditlist2("l_rating_organ_look","loanrival","1000185",data.l_rating_organ);
 						//同步执行功能号字典重新加载   发行人 
 						 common_operate.geteditlist2("l_publisher_id_look","loanrival","1000185",data.l_publisher_id);
 						//同步执行功能号字典重新加载   项目方 
 						 common_operate.geteditlist2("l_capital_id_look","loanrival","1000185",data.l_capital_id);
						 //同步执行功能号字典重新加载   担保方
						   common_operate.geteditlist2("l_guarantor_look","loanrival","1000185",data.l_guarantor);
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
	            	if(operate=="add"){//金融产品添加相关js 
	            			//隐藏金融产品代码
	            			Horn.getCompById("vc_stock_code1").hide();
	            		   //新增window内容清空
		        			common_reg.Formreset(form);			     
		        			//window打开
		        			Horn.getComp(win).show(); 
		        			investproduct.changeproduct(1);
	            	}else if(operate=="edit"){//金融产品修改
	            		if (Horn.getComp(table).getSelecteds().length==0){
		         	   		Horn.Tip.warn("请选择一条记录！");
		         	   		return;
		         	    }
            			//获取选中记录的数据 
		         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
		         		$.post("/am/am/business/investproduct/look.json?vc_stock_code1="+rowData.vc_stock_code1, null, function(data) {
		         						if (data != null) {
		         							//修改界面打开
		    	    						Horn.getComp(win).show();				         
		    				              //查询结果表单赋值
		    	    					  Horn.getComp(form).setValues(data);
		         					      investproduct.changeproduct(2);
		         					      investproduct.changedetail(2);
		         	  					//同步执行功能号字典重新加载   外部评级机构
		         					      common_operate.geteditlist2("l_rating_organ_edit","loanrival","1000185",data.l_rating_organ);
		         					   //同步执行功能号字典重新加载   发行人
		         					      common_operate.geteditlist2("l_publisher_id_edit","loanrival","1000185",data.l_publisher_id);
		         					   //同步执行功能号字典重新加载   项目方 
		         					      common_operate.geteditlist2("l_capital_id_edit","loanrival","1000185",data.l_capital_id);
		         						  //同步执行功能号字典重新加载   担保方
		         						   common_operate.geteditlist2("l_guarantor_edit","loanrival","1000185",data.l_guarantor);
		         						}else {
		    								Horn.Tip.warn("查询信息失败");
		    							} 

		         		}, "json"); 
		         	}else if(operate=="del"){//金融产品删除
		            	   if (Horn.getComp(table).getSelecteds().length==0){
			        	   		Horn.Tip.warn("请选择一条记录！");
			        	   		return;
			        	   }else{
			        		   var messageobject;
			        		   var url;
			            		messageobject="金融产品";
			            		url="/am/am/business/investproduct/del/operation.json?l_function_no="+functionIds['investproduct']['zl']+"&&business_type=jrcpsc&&vc_stock_code1="+rowData.vc_stock_code1;			           
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
		            }else if(operate=="ctlist"){ //穿透资产信息查询
	            		if (Horn.getComp(table).getSelecteds().length==0){
		         	   		Horn.Tip.warn("请选择一条记录！");
		         	   		return;
		         	    }
            			//获取选中记录的数据 
		         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			    		Horn.getCompById("holdervc_stock_code1").setValue(rowData.vc_stock_code1);
			    		Horn.getCompById("holdervc_stock_name1").setValue(rowData.vc_stock_name1);
			    		common_operate.formQuery('holderTable','holderForm');
			    		 Horn.getComp(win).show();         
	             }else if(operate=="ctadd"){//穿透资产添加相关js 
	            		   //新增window内容清空
	        			common_reg.Formreset(form);			     
	        			//Horn.getComp("addForm2").clearValue();
	        		    Horn.getCompById("vc_stock_code1_4").setValue(Horn.getCompById("holdervc_stock_code1").getValue());
	        			Horn.getCompById("vc_stock_name1_4").setValue(Horn.getCompById("holdervc_stock_name1").getValue());
	        			//window打开
	        			Horn.getComp(win).show(); 
            	}else if(operate=="ctedit"){//穿透资产修改
            		if (Horn.getComp(table).getSelecteds().length==0){
	         	   		Horn.Tip.warn("请选择一条记录！");
	         	   		return;
	         	    }
        			//获取选中记录的数据 
	         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
	         		$.post("/am/am/business/investproduct/look2.json?vc_stock_code1="+rowData.vc_stock_code1+"&&vc_asset_code="+rowData.vc_asset_code, null, function(data) {
						if (data != null) {
							//同步执行功能号字典重新加载
			            	$.ajax({
			            		type : "post",
								url : "/am/am/system/tree/dicmanagelist2.json?l_key=1422",
								data : "",
								async : false,
								dataType :"json",
								success : function(result) {
			            		       Horn.getCompById("vc_asset_type_5").addItems(result,true);
								}
							});
			            	//修改界面打开
    						Horn.getComp(win).show();	
    						//查询结果表单赋值
	    					Horn.getComp(form).setValues(data); 
						} 
						else {
							Horn.Tip.warn("查询信息失败");
						}
		           }, "json");
	         	}else if(operate=="ctdel"){//穿透资产删除
	            	   if (Horn.getComp(table).getSelecteds().length==0){
		        	   		Horn.Tip.warn("请选择一条记录！");
		        	   		return;
		        	   }else{
		        		   var messageobject;
		        		   var url;
		            		messageobject="穿透资产";
		            		url="/am/am/business/investproduct/operation2.json?l_function_no="+functionIds['investproduct']['ctzl']+"&&business_type=ctzcsc&&vc_asset_code="+rowData.vc_asset_code+"&&vc_stock_code1="+rowData.vc_stock_code1;			           
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
	            }
	            	/***新的操作类型在此处加*****/
	            	
	            } 
			}
       }, "json");
		
	},
	//穿透资产类型新增
	doAddtype:function() {
	    var result = Horn.getComp("addtypeForm").isValid();
		if(result)
		{
			var values = Horn.getComp("addtypeForm").getValues();
			var element = $("#element2").val();
			$.post("/am/am/system/dctionary/operation2.json?l_function_no="+functionIds["dctionary"]["add"]+"&&dotype=1", values, function(data) {				
				        if (data !=null&& data!="") {
				        	 Horn.getComp("c_value").clearValue(); 
				        	 Horn.getComp("vc_caption").clearValue();
							Horn.getComp("addtypeWin").hide();
							Horn.getCompById(element).addItems(data,true);
							Horn.getCompById(element).selectFirst();
							Horn.Tip.success("操作成功");
						} else {
							TDialog.Msg.alert("提示", "已存在该类型,不能重复添加！", function() {	
							});	
						}
			}, "json");
		}
	},
	//type 1-金融产品  2-穿透资产 
	commit:function(type,operate,form,win){
		var result = Horn.getComp(form).isValid();
		if(result)
		{
			var values = Horn.getComp(form).getValues();
			dialog.dialog("open");
			var url;
			if(type==1){
				if(operate=="add"){//添加
					url="/am/am/business/investproduct/doAdd/operation.json?l_function_no="+functionIds['investproduct']['zl']+"&&business_type=jrcpxz";
				}else if(operate=="edit"){//修改
					url="/am/am/business/investproduct/doEdit/operation.json?l_function_no="+functionIds['investproduct']['zl']+"&&business_type=jrcpxg";
				}else{
					url="";
				}
			}else if(type==2){
				if(operate=="add"){//添加
					url="/am/am/business/investproduct/operation2.json?l_function_no="+functionIds['investproduct']['ctzl']+"&&business_type=ctzcxz";
				}else if(operate=="edit"){//修改
					url="/am/am/business/investproduct/operation2.json?l_function_no="+functionIds['investproduct']['ctzl']+"&&business_type=ctzcxg";
				}else{
					url="";
				}
			}else{
				url="";
			}
			$.post(url, values, function(data) {
						dialog.dialog("close");
						if (data == "ok") {
							TDialog.Msg.alert("提示","操作成功",function(){
								Horn.getComp(win).hide();
								if(type==1){
								   common_operate.formQuery('bankaccountTable','bankaccountForm');
								}else if(type==2){
								   common_operate.formQuery('holderTable','holderForm');
								}
					        });
						}
			}, "text");
	    }	
	}
};