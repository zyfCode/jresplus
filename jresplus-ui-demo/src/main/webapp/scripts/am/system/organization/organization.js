var organization={
		formQuery:function(){
			var result = Horn.getComp("dataForm").isValid();
			if(result){
				Horn.getCompById("dataTable").setBaseParams(Horn.getCompById("dataForm").getValues());
				Horn.getCompById("dataTable").load('',{"pageNo":1});
			}
		},
		 WinCancle:function(win) {
			Horn.getComp(win).hide();
		},
		openwindow:function(operate,table,win,form){
			$.post("/am/am/init/list.json", null, function(data) {
				if (data!=null) {					
		            if(data.l_operate_flag==0){	        		
			            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {					 				           		
			            	});	       
		            }else{
		            	if(operate=="edit"){
		            		if (Horn.getComp(table).getSelecteds().length==0){
		            			Horn.Tip.warn("请选择一条记录！");
		            			return;
		            		}
						rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp('dataTable').getSelecteds())[0];
						$.post("/am/am/system/organization/look.json", rowData, function(data) {
										if (data != null) {
										    Horn.getComp(win).show();    
				                            Horn.getComp(form).setValues(data); 
										} 
							}, "json");  
		            	}
		            }
				}
		      }, "json");   	
		},
		commit:function(operate,form,win){
			if(operate=="edit"){
				url="/am/am/system/organization/doEdit/operation.json?l_function_no="+functionIds["organization"]["edit"];
			}
			 var result = Horn.getComp(form).isValid();
				if(result)
				{
					var values = Horn.getComp(form).getValues();
					 dialog.dialog("open");
					$.post(url, values, function(data) {
						dialog.dialog("close");
						if (data == constants.ajaxCallBackCode.OK) {
							TDialog.Msg.alert("提示","操作成功",function(){
					           Horn.getComp(win).hide();
					           organization.formQuery();
					       }); 
						} 
					}, "text");
				}
		}
		
}