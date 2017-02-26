var holder={
    formQuery:function(form,table){
    	Horn.getCompById(table).setBaseParams(Horn.getCompById(form).getValues());
 		Horn.getCompById(table).load('',{"pageNo":1});	   
	},
	domrender:function(data){
        //var a=data.val;
        if(data==0){
           return "";
        }else{
           return  data;
        }
        
    },
	testRowClick:function(rowdata){
		var  a=rowdata.c_rival_kind;
		 if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
			  Horn.getComp('bankaccountTable').hideButton("ctbutton2",true); 
			  Horn.getComp('bankaccountTable').hideButton("ctbutton3",true); 
			  Horn.getComp('bankaccountTable').hideButton("ctbutton4",true);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton5",true);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton6",true);
		  }else{
			  Horn.getComp('bankaccountTable').hideButton("ctbutton2",false); 
			  Horn.getComp('bankaccountTable').hideButton("ctbutton3",false); 
			  Horn.getComp('bankaccountTable').hideButton("ctbutton4",false);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton5",false);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton6",false);
		  }
		  if(a=='个人'){
			  Horn.getComp('bankaccountTable').hideButton("ctbutton4",true);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton5",true);
			  Horn.getComp('bankaccountTable').hideButton("ctbutton6",true);
		  }else{
		       
		       Horn.getComp('bankaccountTable').hideButton("ctbutton4",false);
		        Horn.getComp('bankaccountTable').hideButton("ctbutton5",false); 
		        Horn.getComp('bankaccountTable').hideButton("ctbutton6",false); 
		  }
		  common_operate.getBusAuthority("bankaccountTable","loanrival",'0');
	},
	testRowClick2:function(rowdata){
		 if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
			  Horn.getComp('holderTable').hideButton("holder2",true); 
			  Horn.getComp('holderTable').hideButton("holder3",true);
		  }else{
			  Horn.getComp('holderTable').hideButton("holder2",false); 
			  Horn.getComp('holderTable').hideButton("holder3",false); 
			 
		  }
		 common_operate.getBusAuthority("holderTable","holder",'0');
	},
	testRowClick3:function(rowdata){
		 if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
			  Horn.getComp('officersTable').hideButton("officers2",true); 
			  Horn.getComp('officersTable').hideButton("officers3",true);
		  }else{
			  Horn.getComp('officersTable').hideButton("officers2",false); 
			  Horn.getComp('officersTable').hideButton("officers3",false); 
			 
		  }
		 common_operate.getBusAuthority("officersTable","officers",'0');  
	},
	testRowClick4:function(rowdata){
		 if(rowdata.c_data_status!="正常"&&rowdata.c_data_status!='1'){
			  Horn.getComp('familyTable').hideButton("family2",true); 
			  Horn.getComp('familyTable').hideButton("family3",true);
		  }else{
			  Horn.getComp('familyTable').hideButton("family2",false); 
			  Horn.getComp('familyTable').hideButton("family3",false); 
			 
		  }
		 common_operate.getBusAuthority("familyTable","family",'0');
	},
	reset:function(){
	   Horn.getComp("bankaccountForm").clearValue();
	},
    //对手方状态转换
	funstate:function(data){
	   var d=data.val;
	   if(d=='1'){
	      return "未完成";
	   }else{
	      return "完成";
	   }
   },
   //对手方主键转换
	funlook:function(data){
      return "<a href='javascript:void(0);' onclick='holder.look(\""+data.val+"\");' >"+data.val+"</a>";
   },
   //对手方查看相关js
	look:function(a){
		window.parent.look(a);			
	},   
  //查看对手方详情js
	lookloan:function(a){
		var s=Horn.getCompById(a).getValue();
	    window.parent.look(s);	
	},
	//新增界面重置
	addWinCancle:function(type,form) {
		if(type=="holder"){
			common_reg.Formreset("addForm");
			common_operate.geteditlist2("l_rival_id","loanrival","1000185",Horn.getCompById("holderl_rival_id").getValue());
		}else if(type=="officers"){
			common_reg.Formreset("addofficersForm");
			common_operate.geteditlist2("l_rival_id_4","loanrival","1000185",Horn.getCompById("officersl_rival_id").getValue());
		}else if(type=="family"){
		 common_reg.Formreset("addfamilyForm");
		 common_operate.geteditlist2("l_rival_id_7","loanrival","1000185",Horn.getCompById("familyl_rival_id").getValue());
		}
	},
	/******家族成员信息联动-start*****/
	//改变对手方时获取对应高管列表
	 changeloanfam:function(type){
	     var  val=Horn.getCompById("l_rival_id_"+type).getValue();
	  // 同步执行功能号字典重新加载
	    	$.ajax({
	    		type : "post",
				url : "/am/am/business/loanrival/officerslist.json?l_rival_id="+val,
				data : "",
				async : false,
				dataType :"json",
				success : function(result) {
					if (result !=null) {
						   Horn.getCompById("l_officer_id_"+type).addItems(result,true);
						} 
//					    else {
//							Horn.Tip.warn(data);
//						}
				}
			});
	},
	//根据高管编号查询高管详细信息
	 changefamily:function(type){
      var  val=Horn.getCompById("l_officer_id_"+type).getValue();
      $.post("/am/am/business/loanrival/look4.json?l_serial_no="+val, null, function(data) {
						if (data !=null) {
							Horn.getCompById("c_card_type1_"+type).setValue(data.c_card_type,true);
							Horn.getCompById("vc_card_code1_"+type).setValue(data.vc_card_code);
						} 
//						else {
//							Horn.Tip.warn(data);
//						}
	 }, "json");
   },
   /****家族成员信息联动-end***/

	/**证件类型为身份证号时做校验
	 * 参数：
	 * id：管理的控件id值
	 * */
	reg_idcard:function(value,id,type){
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
		var value2=Horn.getCompById(id+type2).getValue();
		if(value2=="10"||value2==10){
			if(!validate.idcard(value)){
			    return "身份证格式不正确";
			}else{
				return true;
			}
		}else{
			return true;
		}
	},
	 //打开window的js   参数说明：type(对象),operate(操作：add,edit,del,look),form(操作的form),win(打开的弹窗名),table(使用的table名)
	openwindow:function(type,operate,form,win,table){
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	if(operate=="add"){
	            		if(type=="loan"){//对手方新增
		        			window.parent.add();
		        		}else{
		        			//新增window内容清空
		        			common_reg.Formreset(form);
		        			if(type=="holder"){//股东新增
			        			common_operate.geteditlist2("l_rival_id","loanrival","1000185",Horn.getCompById("holderl_rival_id").getValue());
			        		}else if(type=="officers"){//高管新增
			        			common_operate.geteditlist2("l_rival_id_4","loanrival","1000185",Horn.getCompById("officersl_rival_id").getValue());
			        		}else if(type=="family"){//家族成员新增
			        			 common_operate.geteditlist2("l_rival_id_7","loanrival","1000185",Horn.getCompById("familyl_rival_id").getValue());
	                             //对手方联动带出家族成员
			        			  var a=Horn.getCompById("l_rival_id_7").getValue();
			        			  var b=Horn.getCompById("familyl_rival_id").getValue();
			        			   if(a!=b){
			        			       Horn.getCompById("l_rival_id_7").setValue(b,true);
			        			   }else{
			        			       holder.changeloanfam(7);
			        			   }
			        		}
		        			//window打开
		        			Horn.getComp(win).show(); 
		        		}
	            	}else if(operate=="look"){
	            		if (Horn.getComp(table).getSelecteds().length==0){
		    		   		Horn.Tip.warn("请选择一条记录！");
		    		   		return;
		    		    }
	            		//获取选中记录的数据 
			    		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0]; 	            	
	            	    if(type=="holder"){//查看股东信息
		        			 Horn.getCompById("holderl_rival_id").setValue(rowData.l_rival_id);
				    		 holder.formQuery("holderForm","holderTable");
		        		}else if(type=="officers"){  //查看高管信息 
			            	Horn.getCompById("officersl_rival_id").setValue(rowData.l_rival_id);
				    		 holder.formQuery("officersForm","officersTable");
			            }else if(type=="family"){  //查看家族成员信息
			            	 Horn.getCompById("familyl_rival_id").setValue(rowData.l_rival_id);
				    		 holder.formQuery("familyForm","familyTable");
			            }
	            	    //window打开
	            	    Horn.getComp(win).show(); 
	            	}else if(operate=="edit"){
	            		if(type=="loan"){ //对手方修改
	            			if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		var url="/am/am/business/loanrival/edit2.htm?l_rival_id="+rowData.l_rival_id;
			         		//处理弹开界面已打开问题
			        		var iframelength=$('iframe[tabid=404110]', parent.document).length;
			        		if(iframelength!=0){
			        			TDialog.Msg.error("提示","对手方修改界面已打开,请先完成操作!",function(){  
			        			    //ok 
			        				window.parent.edit(url);
			        			}); 
			        		}else{
			        			window.parent.edit(url);	
			        		}
	            		}else {
	            			/*****除了对手方之外的对象修改操作***/
	            			if (Horn.getComp(table).getSelecteds().length==0){
			         	   		Horn.Tip.warn("请选择一条记录！");
			         	   		return;
			         	    }
	            			//获取选中记录的数据 
			         		rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
			         		//单条查询url处理
			         		var  url;
			         		if(type=="holder"){ //股东信息修改
			         			url="/am/am/business/loanrival/look3.json?l_serial_no="+rowData.l_serial_no;
		            		}else if(type=="officers"){//高管修改
		            			url="/am/am/business/loanrival/look4.json?l_serial_no="+rowData.l_serial_no;
		            		}else if(type=="family"){//家族成员修改
		            			url="/am/am/business/loanrival/look5.json?l_serial_no="+rowData.l_serial_no;	 
		            		}else{
		            			url="";
		            		}
			         		$.post(url, null, function(data) {
    							if (data != null) {
    								//修改界面打开
    								Horn.getComp(win).show();
    								//界面打开之后数据特殊赋值
    							    if(type=="holder"){ //股东信息修改
    							    	//查询结果表单赋值
    							    	 Horn.getComp(form).setValues(data);
    							    	 common_operate.geteditlist2("l_rival_id_edit","loanrival","1000185",""+data.l_rival_id+"");
    			            		}else if(type=="officers"){//高管修改
    			            			//查询结果表单赋值
        	                            Horn.getComp(form).setValues(data);
    			            			    common_operate.geteditlist2("l_rival_id_5","loanrival","1000185",""+data.l_rival_id+"");   		   
    			            		}else if(type=="family"){//家族成员修改
    			            			//查询结果表单赋值
        	                                common_operate.geteditlist2("l_rival_id_8","loanrival","1000185",""+data.a.l_rival_id+"");   
    			            				Horn.getCompById("l_officer_id_8").addItems(data.b,true);	
    			            				Horn.getComp(form).setValues(data.a);    			            	           
    			            	            holder.changefamily(8);
    			            		}
    							                              
    							} else {
    								Horn.Tip.warn("查询信息失败");
    							}
    			           }, "json");   
	            		}
	            	}else if(operate=="del"){
	            		if (Horn.getComp(table).getSelecteds().length==0){
		        	   		Horn.Tip.warn("请选择一条记录！");
		        	   		return;
		        	   }else{
		        		   var messageobject;
		        		   var url;
		        		   rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];   
		        		   if(type=="loan"){ //对手方删除
		            			messageobject="对手方";
		            			url="/am/am/business/loanrival/del/operation.json?l_function_no="+functionIds['loanrival']['zl']+"&&business_type=dsfsc&&l_rival_id="+rowData.l_rival_id;			       
		            		}else if(type=="holder"){ //股东信息删除
		            			messageobject="股东";
		            			url="/am/am/business/loanrival/operation2.json?l_function_no="+functionIds['loanrival']['gdzl']+"&&business_type=gdsc&&l_serial_no="+rowData.l_serial_no;
		            		}else if(type=="officers"){//高管删除
		            			messageobject="高管";
		            			url="/am/am/business/loanrival/operation3.json?l_function_no="+functionIds['loanrival']['ggzl']+"&&business_type=ggsc&&l_serial_no="+rowData.l_serial_no; 
		            		}else if(type=="family"){//家族成员删除
		            			messageobject="家族成员";
		            			url="/am/am/business/loanrival/operation4.json?l_function_no="+functionIds['loanrival']['jzcyzl']+"&&business_type=jzcysc&&l_serial_no="+rowData.l_serial_no;
		            		}else{
		            			messageobject="";
		            			url="";
		            		}
		        		   TDialog.Msg.confirm("提示","您确定要删除"+messageobject+"吗",function(){
		        			   //ok
		        			   dialog.dialog("open");
		        			   $.post(url, null, function(data) {
		        				   dialog.dialog("close");
		        				    if (data == "ok") {
		        				    	holder.formQuery(form,table);
		     	        				Horn.Tip.success("操作成功");
		     	        			} 
//		        				    else {
//		     	        			    Horn.Tip.warn(data);
//		     	        			}
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
	commit:function(type,operate,form,win){
		var result = Horn.getComp(form).isValid();
		if(result)
		{
			var values = Horn.getComp(form).getValues();
			dialog.dialog("open");
			var url;
			if(type=="holder"){
				if(operate=="add"){//股东添加
					url="/am/am/business/loanrival/operation2.json?l_function_no="+functionIds['loanrival']['gdzl']+"&&business_type=gdxz";
				}else if(operate=="edit"){//股东修改
					url="/am/am/business/loanrival/operation2.json?l_function_no="+functionIds['loanrival']['gdzl']+"&&business_type=gdxg";
				}else{
					url="";
				}
			}else if(type=="officers"){
				if(operate=="add"){//高管信息添加
					url="/am/am/business/loanrival/operation3.json?l_function_no="+functionIds['loanrival']['ggzl']+"&&business_type=ggxz";
				}else if(operate=="edit"){//高管信息修改
					url="/am/am/business/loanrival/operation3.json?l_function_no="+functionIds['loanrival']['ggzl']+"&&business_type=ggxg";
				}else{
					url="";
				}
			}else if(type=="family"){
				if(operate=="add"){//家族成员添加
					url="/am/am/business/loanrival/operation4.json?l_function_no="+functionIds['loanrival']['jzcyzl']+"&&business_type=jzcyxz";
				}else if(operate=="edit"){//家族成员修改
					url="/am/am/business/loanrival/operation4.json?l_function_no="+functionIds['loanrival']['jzcyzl']+"&&business_type=jzcyxg";
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
								holder.formQuery(type+"Form",type+"Table");
					        });
						} 
//						else {
//							Horn.Tip.warn(data);
//						}
			}, "text");
	    }	
	}

};