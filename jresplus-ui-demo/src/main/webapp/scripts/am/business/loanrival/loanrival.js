var loanrival={
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
		
	    //是否集团
		   changegroupflag:function(type){
			   var type2=loanrival.typechange(type);
		         var  val=Horn.getCompById("c_group_flag"+type2).getValue();
		         if(val=="2"){
		            Horn.getCompById("l_group_rival_id"+type2).clearList();
		         }else{
//		             $.post("/am/am/business/loanrival/comboxlist2.json?vc_input_name2=c_group_flag&&vc_input_value2=1&&vc_input_name3=c_status&&vc_input_value3=2&&vc_input_table=loanrival&&vc_output_name1=l_rival_id&&vc_output_name2=vc_name", null, function(data) {
//									if (data !=null) {
//										 Horn.getCompById("l_group_rival_id"+type2).addItems(data,true);
//										 //Horn.getCompById("l_group_rival_id"+type2).selectFirst();
//									} else {
//										Horn.Tip.warn(data);
//									}
//				    }, "json");
		         }
		         
		    },
            //是否上市
		   changelistedflag:function(type){
			   var type2=loanrival.typechange(type);
		         var  val=Horn.getCompById("c_listed_flag"+type2).getValue();
		         if(val=="2"){
		            Horn.getCompById("vc_exchange_type2"+type2).hide();
		            Horn.getCompById("vc_stock_code2"+type2).hide();
		         }else{
		            Horn.getCompById("vc_exchange_type2"+type2).show();
		            Horn.getCompById("vc_stock_code2"+type2).show();
		         }         
		    },
		    //所属集团初始化选中 
		      changeinit:function(s){
		         var  val=Horn.getComp("c_group_flag").getValue();
		         if(val=="2"){
		            Horn.getComp("l_group_rival_id").clearList();
		         }else{
		             $.post("/am/am/business/loanrival/comboxlist2.json?vc_input_name2=c_group_flag&&vc_input_value2=1&&vc_input_name3=c_status&&vc_input_value3=2&&vc_input_table=loanrival&&vc_output_name1=l_rival_id&&vc_output_name2=vc_name", null, function(data) {
									if (data !=null) {
										 Horn.getComp("l_group_rival_id").addItems(data,true);
										 if(s!=""){
									         Horn.getComp("l_group_rival_id").setValue(s,true);
									     }
									} 
//									else {
//										Horn.Tip.warn(data);
//									}
				    }, "json");
		         }
		         
		    },
		  //角色变换
			rolechange:function(type){
				var type2=loanrival.typechange(type);
				var  val=Horn.getCompById("vc_rival_roles"+type2).getValue();
				var  u=Horn.getCompById("c_rival_kind"+type2).getValue();      
				val=val.replace(/\,/g,""); 
				var s=val.substring(0,1);
				var s2=val.substring(1,2);
				if(s=='1'){
					if(u!=1){
						 Horn.getCompById("vc_organization_code2"+type2).setRequired(true);
						 Horn.getCompById("c_enterprise_kind"+type2).setRequired(true);
						 Horn.getCompById("c_industry_type"+type2).setRequired(true);
						 Horn.getCompById("vc_industry_detail"+type2).setRequired(true);
						 Horn.getCompById("c_internal_rating"+type2).setRequired(true);                          
						 Horn.getCompById("c_external_rating"+type2).setRequired(true); 
						 Horn.getCompById("l_rating_organ"+type2).setRequired(true);
					}else{
						Horn.getCompById("vc_organization_code2"+type2).setRequired(false);
						 Horn.getCompById("c_enterprise_kind"+type2).setRequired(false);
						 Horn.getCompById("c_industry_type"+type2).setRequired(false);
						 Horn.getCompById("vc_industry_detail"+type2).setRequired(false);
						 Horn.getCompById("c_internal_rating"+type2).setRequired(false);                          
						 Horn.getCompById("c_external_rating"+type2).setRequired(false); 
						 Horn.getCompById("l_rating_organ"+type2).setRequired(false);
					}
					 
				}else if(s=='2'){
					Horn.getCompById("vc_organization_code2"+type2).setRequired(false);
					 Horn.getCompById("c_enterprise_kind"+type2).setRequired(false);
					 Horn.getCompById("c_industry_type"+type2).setRequired(false);
					 Horn.getCompById("vc_industry_detail"+type2).setRequired(false);
					 Horn.getCompById("c_internal_rating"+type2).setRequired(false);                          
					 Horn.getCompById("c_external_rating"+type2).setRequired(false); 
					 Horn.getCompById("l_rating_organ"+type2).setRequired(false);
				    if(s2=='3'){
				    	Horn.getCompById("c_industry_type"+type2).setRequired(true);
				    	 Horn.getCompById("c_internal_rating"+type2).setRequired(true);                          
						 Horn.getCompById("c_external_rating"+type2).setRequired(true); 
						 Horn.getCompById("l_rating_organ"+type2).setRequired(true);
				    }
				}else if(s=='3'){
					if(u!=1){
						 Horn.getCompById("vc_organization_code2"+type2).setRequired(true);
						 Horn.getCompById("c_enterprise_kind"+type2).setRequired(false);
						 Horn.getCompById("c_industry_type"+type2).setRequired(true);
						 Horn.getCompById("vc_industry_detail"+type2).setRequired(false);
						 Horn.getCompById("c_internal_rating"+type2).setRequired(true);                          
						 Horn.getCompById("c_external_rating"+type2).setRequired(true); 
						 Horn.getCompById("l_rating_organ"+type2).setRequired(true);
					}else{
						Horn.getCompById("vc_organization_code2"+type2).setRequired(false);
						 Horn.getCompById("c_enterprise_kind"+type2).setRequired(false);
						 Horn.getCompById("c_industry_type"+type2).setRequired(false);
						 Horn.getCompById("vc_industry_detail"+type2).setRequired(false);
						 Horn.getCompById("c_internal_rating"+type2).setRequired(false);                          
						 Horn.getCompById("c_external_rating"+type2).setRequired(false); 
						 Horn.getCompById("l_rating_organ"+type2).setRequired(false);
					}
				}else{
					Horn.getCompById("vc_organization_code2"+type2).setRequired(false);
					 Horn.getCompById("c_enterprise_kind"+type2).setRequired(false);
					 Horn.getCompById("c_industry_type"+type2).setRequired(false);
					 Horn.getCompById("vc_industry_detail"+type2).setRequired(false);
					 Horn.getCompById("c_internal_rating"+type2).setRequired(false);                          
					 Horn.getCompById("c_external_rating"+type2).setRequired(false); 
					 Horn.getCompById("l_rating_organ"+type2).setRequired(false);
				}
			},
    //公用   根据对手方类型改变字段隐藏属性
      change:function(type){
    	  var type2=loanrival.typechange(type);
	     var a=Horn.getCompById("c_rival_kind"+type2).getValue();
	     if(a==1){
	        //个人显示
	        Horn.getCompById("c_sex"+type2).setDisabled(false);
		    Horn.getCompById("l_birthday"+type2).setDisabled(false);
		    Horn.getCompById("c_card_type"+type2).setDisabled(false);
		    Horn.getCompById("vc_card_id"+type2).setDisabled(false);
			Horn.getCompById("c_job_type"+type2).setDisabled(false);
		    Horn.getCompById("vc_industry_detail"+type2).hide();
		    Horn.getCompById("c_sex"+type2).show();
		    Horn.getCompById("l_birthday"+type2).show();
		    Horn.getCompById("c_card_type"+type2).show();
		    Horn.getCompById("vc_card_id"+type2).show();
			Horn.getCompById("c_job_type"+type2).show();
			//个人隐藏
	         Horn.getCompById("vc_exchange_type2"+type2).setDisabled(true);
	         Horn.getCompById("vc_stock_code2"+type2).setDisabled(true);
			Horn.getCompById("vc_organization_code2"+type2).setDisabled(true); 
			Horn.getCompById("vc_institutions_code"+type2).setDisabled(true);
			Horn.getCompById("vc_rival_code1"+type2).setDisabled(true);
			Horn.getCompById("c_enterprise_kind"+type2).setDisabled(true);
			Horn.getCompById("c_enterprise_type"+type2).setDisabled(true);
			Horn.getCompById("c_industry_type"+type2).setDisabled(true);
	         Horn.getCompById("2").disable();
	        Horn.getCompById("vc_state_tax_registration"+type2).setDisabled(true);           
			Horn.getCompById("vc_local_tax_registration"+type2).setDisabled(true);                                                   
			Horn.getCompById("c_listed_flag"+type2).setDisabled(true);                              
			Horn.getCompById("c_group_flag"+type2).setDisabled(true);                             
			Horn.getCompById("c_manage_type"+type2).setDisabled(true);                              
			Horn.getCompById("c_cooperate_type"+type2).setDisabled(true);                            
			Horn.getCompById("c_relation_type"+type2).setDisabled(true);                          
			Horn.getCompById("l_group_rival_id"+type2).setDisabled(true);                            
			Horn.getCompById("vc_cwphone"+type2).setDisabled(true);
			
			Horn.getCompById("c_internal_rating"+type2).setDisabled(true);                          
			Horn.getCompById("c_external_rating"+type2).setDisabled(true); 
			Horn.getCompById("l_rating_organ"+type2).setDisabled(true);
			Horn.getCompById("c_internal_rating"+type2).hide();                        
			Horn.getCompById("c_external_rating"+type2).hide();
			Horn.getCompById("l_rating_organ"+type2).hide();
			
	         Horn.getCompById("vc_exchange_type2"+type2).hide();
	         Horn.getCompById("vc_stock_code2"+type2).hide();
			
	        Horn.getCompById("vc_organization_code2"+type2).hide();
			Horn.getCompById("vc_institutions_code"+type2).hide();
			Horn.getCompById("c_enterprise_kind"+type2).hide();
			Horn.getCompById("vc_rival_code1"+type2).hide();
			Horn.getCompById("c_industry_type"+type2).hide();
			Horn.getCompById("c_enterprise_type"+type2).hide();
	        $("div[title='2'][class='stockcodesex_title']").hide();
	        //$("div[title='3'][class='stockcodesex_title']").hide();
	        Horn.getCompById("2").hide();
	        Horn.getCompById("vc_state_tax_registration"+type2).hide();            
			Horn.getCompById("vc_local_tax_registration"+type2).hide();                                              
			Horn.getCompById("c_listed_flag"+type2).hide();                              
			Horn.getCompById("c_group_flag"+type2).hide();                                
			Horn.getCompById("c_manage_type"+type2).hide();                               
			Horn.getCompById("c_cooperate_type"+type2).hide();                            
			Horn.getCompById("c_relation_type"+type2).hide();                                                 
			Horn.getCompById("l_group_rival_id"+type2).hide();                            
			Horn.getCompById("vc_cwphone"+type2).hide(); 
			 $("ul[id=2]").prev("div").hide();
			 //Horn.getCompById("3").disable();
		    // Horn.getCompById("3").hide();
		     //$("ul[id=3]").prev("div").hide();
	      }else{
	        //金融机构显示
	         Horn.getCompById("vc_exchange_type2"+type2).setDisabled(false);
	         Horn.getCompById("vc_stock_code2"+type2).setDisabled(false);
	        Horn.getCompById("vc_organization_code2"+type2).setDisabled(false); 
			Horn.getCompById("vc_institutions_code"+type2).setDisabled(false);
			Horn.getCompById("vc_rival_code1"+type2).setDisabled(false);
			Horn.getCompById("c_enterprise_kind"+type2).setDisabled(false);
			Horn.getCompById("c_enterprise_type"+type2).setDisabled(false);
			Horn.getCompById("c_industry_type"+type2).setDisabled(false);
	         Horn.getCompById("2").enable();
	       //  Horn.getCompById("3").enable();
	        Horn.getCompById("vc_state_tax_registration"+type2).setDisabled(false);           
			Horn.getCompById("vc_local_tax_registration"+type2).setDisabled(false);                                                 
			Horn.getCompById("c_listed_flag"+type2).setDisabled(false);                              
			Horn.getCompById("c_group_flag"+type2).setDisabled(false);                             
			Horn.getCompById("c_manage_type"+type2).setDisabled(false);                              
			Horn.getCompById("c_cooperate_type"+type2).setDisabled(false);                            
			Horn.getCompById("c_relation_type"+type2).setDisabled(false);                                               
			Horn.getCompById("l_group_rival_id"+type2).setDisabled(false);                            
			Horn.getCompById("vc_cwphone"+type2).setDisabled(false);
			Horn.getCompById("c_internal_rating"+type2).setDisabled(false);                          
			Horn.getCompById("c_external_rating"+type2).setDisabled(false); 
			Horn.getCompById("l_rating_organ"+type2).setDisabled(false);
			Horn.getCompById("c_internal_rating"+type2).show();                        
			Horn.getCompById("c_external_rating"+type2).show();
			Horn.getCompById("l_rating_organ"+type2).show();
	        Horn.getCompById("vc_organization_code2"+type2).show();
			Horn.getCompById("vc_rival_code1"+type2).show();
			Horn.getCompById("c_enterprise_kind"+type2).show();
			 Horn.getCompById("vc_industry_detail"+type2).show();
			Horn.getCompById("c_enterprise_type"+type2).show();
			Horn.getCompById("c_industry_type"+type2).show();
	        Horn.getCompById("vc_institutions_code"+type2).show();
	        $("div[title='2'][class='stockcodesex_title']").show();
	        //$("div[title='3'][class='stockcodesex_title']").show();
	        Horn.getCompById("2").show();
	       // Horn.getCompById("3").show();
	        Horn.getCompById("vc_state_tax_registration"+type2).show();            
			Horn.getCompById("vc_local_tax_registration"+type2).show();                                                  
			Horn.getCompById("c_listed_flag"+type2).show();                              
			Horn.getCompById("c_group_flag"+type2).show();                                
			Horn.getCompById("c_manage_type"+type2).show();                               
			Horn.getCompById("c_cooperate_type"+type2).show();                            
			Horn.getCompById("c_relation_type"+type2).show();                                                  
			Horn.getCompById("l_group_rival_id"+type2).show();                            
			Horn.getCompById("vc_cwphone"+type2).show(); 
	        //金融机构隐藏
	        Horn.getCompById("c_sex"+type2).setDisabled(true);
		    Horn.getCompById("l_birthday"+type2).setDisabled(true);
		    Horn.getCompById("c_card_type"+type2).setDisabled(true);
		    Horn.getCompById("vc_card_id"+type2).setDisabled(true);
			Horn.getCompById("c_job_type"+type2).setDisabled(true);
	        Horn.getCompById("c_sex"+type2).hide();
		    Horn.getCompById("l_birthday"+type2).hide();
		    Horn.getCompById("c_card_type"+type2).hide();
		    Horn.getCompById("vc_card_id"+type2).hide();
			Horn.getCompById("c_job_type"+type2).hide();
			loanrival.changegroupflag(type); 
			loanrival.changelistedflag(type);    
	      }
	     loanrival.rolechange(type); 
   },
 //重置表单内容
	reset:function(form){
		common_reg.Formreset(form);
		var type;
		if(form=="addForm"){
			type=1;
		}else{
			type=2;
		}
		loanrival.change(type);
		loanrival.rolechange(type); 
	},
   commit:function(operate,form){
	    var result = Horn.getComp(form).isValid();
		if(result)
		{
		          var values = Horn.getComp(form).getValues();
		         dialog.dialog("open");
		         var url;
		         if(operate=="dsfxz"){
		        	 url="/am/am/business/loanrival/doAdd/operation.json?l_function_no="+functionIds['loanrival']['zl']+"&&business_type="+operate;
		         }else if(operate=="dsfxg"){
		        	 url="/am/am/business/loanrival/doEdit/operation.json?l_function_no="+functionIds['loanrival']['zl']+"&&business_type="+operate;
		         }else{
		        	 url="";
		         }
		           $.post(url, values, function(data) {
		        	   dialog.dialog("close");
		        	   if (data == "ok") {
							TDialog.Msg.alert("提示", "操作成功！", function() {
								 common_operate.refreshUrl("dsf");
								window.parent.Horn.Frame.screen.closeCurrent();
							});
						} 
//		        	   else {
//							Horn.Tip.warn(data);
//						}
					}, "text");
	    }			
	},
	 //判断对手方简称是否存在
	checkname:function(value,type){
			var s="";
			var url;
			if(type=="1"){
				url="/am/am/business/loanrival/checkname.json?vc_name="+value;
			}else if(type=="2"){
				var  l_rival_id=Horn.getCompById("l_rival_id_edit").getValue();
				url="/am/am/business/loanrival/checkname.json?vc_name="+value+"&&l_rival_id="+l_rival_id;
			}else{
				url="";
			}
			$.ajax({
				type : "post",
				url : url,
				data : "",
				async : false,
				dataType : "text",
				success : function(result) {
					if (result != "ok") {
						s=result;
					} 
				}
			});
			if(s!=""){
				return  "已存在相同的对手方简称";
			}else{
				return true;
			}
			
		},
		//判断对手方全称是否存在
		checkallname:function(value,type){
				var s="";
				var url;
				if(type=="1"){
					url="/am/am/business/loanrival/checkname.json?vc_all_name="+value;
				}else if(type=="2"){
					var  l_rival_id=Horn.getCompById("l_rival_id_edit").getValue();
					url="/am/am/business/loanrival/checkname.json?vc_all_name="+value+"&&l_rival_id="+l_rival_id;
				}else{
					url="";
				}
				$.ajax({
					type : "post",
					url : url,
					data : "",
					async : false,
					dataType : "text",
					success : function(result) {
						if (result != "ok") {
							s=result;
						} 
					}
				});
				if(s!=""){
					return  "已存在相同的对手方全称";
				}else{
					return true;
				}
		},
		//判断是否是传真格式
			checkfax:function(value){
				//var  vc_fax=Horn.getCompById("vc_fax").getValue();
				var vc_fax=$.trim(value);
				var reg =/^((0\d{2,3}-)?\d{7,8})$/;
				if(!reg.test(vc_fax)){
					return "传真格式不正确";
				}else{
					return true;
				}	
			},
			/**证件类型为身份证号时做校验
			 * 参数：
			 * id：管理的控件id值
			 * */
			reg_idcard:function(value,name){
				var value2=Horn.getComp(name).getValue();
				if(value2=="10"||value2==10){
					if(!validate.idcard(value)){
					    return "身份证格式不正确";
					}else{
						return true;
					}
				}else{
					return true;
				}
			}
};