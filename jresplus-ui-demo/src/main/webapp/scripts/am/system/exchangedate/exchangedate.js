var exchangedate={
	formQuery:function(){
	    Horn.getCompById("exchangedateTable").setBaseParams(Horn.getCompById("exchangedateForm").getValues());
		Horn.getCompById("exchangedateTable").load('',{"pageNo":1});
		
	},
	
	reset:function(){
	Horn.getComp("exchangedateForm").clearValue();
	},
	WinCancle:function(win) {
		Horn.getComp(win).hide();
	},
	openwindow:function(operate,form,win,table){
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function(){});	       
	            }else{
	            	if(operate=="init"){
	            		//新增window内容清空
	        			common_reg.Formreset(form);			     
	        			//window打开
	        			Horn.getComp(win).show(); 
	            	}else if(operate=="add"){
	            		//新增window内容清空
	        			common_reg.Formreset(form);			     
	        			//window打开
	        			Horn.getComp(win).show(); 
	            	}else if(operate=="del"){
	            		if (Horn.getComp(table).getSelecteds().length==0){
	            	   		Horn.Tip.warn("请选择一条记录！");
	            	   		return;
	            	   }else{            	  		
	            	            rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];   
	            			      $.post("/am/am/system/exchangedate/del/operation.json?l_function_no="+functionIds["exchangedate"]["del"]+"&l_date="+rowData.l_date, null, function(data) {
	            						if (data == constants.ajaxCallBackCode.OK) {
	            							exchangedate.formQuery();
	            							Horn.Tip.success("操作成功");
	            						} 
	            					}, "text");
	            	     }   
	            	}else if(operate=="holidaySet"){
	            		window.parent.Horn.Frame.openMenu('10001081','/am/am/system/holiday/add.htm','节假日信息查看','inbox');
	            	}
	            	
	            }
	      }
		}, "json");
	            
	},
	commit:function(operate,form,win){
		if(operate=="init"){
			url="/am/am/system/exchangedate/doInit/operation.json?l_function_no="+functionIds["exchangedate"]["init"]+"&dotype=2";
		}else if(operate=="add"){
			url="/am/am/system/exchangedate/doAdd/operation.json?l_function_no="+functionIds["exchangedate"]["add"]+"&dotype=1";
		}
		  var result = Horn.getComp(form).isValid();
			if(result)
			{
				var values = Horn.getComp(form).getValues();
				
						$.post(url, values, function(data) {
							if (data == constants.ajaxCallBackCode.OK) {
								Horn.getComp(win).hide();
								exchangedate.formQuery();
								Horn.Tip.success("操作成功");
							} 
						}, "text");
		    }	
	}
};