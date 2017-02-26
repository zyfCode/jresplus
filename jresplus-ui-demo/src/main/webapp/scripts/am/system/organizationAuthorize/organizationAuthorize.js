var organizationAuthorize={
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
						if (Horn.getComp(table).getSelecteds().length==0){
					   		Horn.Tip.warn("请选择一条记录！");
					   		return;
					    }
						rowData = Horn.getComp(table).getSelecteds().length && (Horn.getComp(table).getSelecteds())[0];
						
						if(operate=='edit'){
							$.post("/am/am/system/organizationAuthorize/look.json?vc_organization_code="+rowData.vc_organization_code,null,function(data) {
											if (data != null) {
											    Horn.getComp(win).show();    
					                            Horn.getComp(form).setValues(data); 
											} 
							}, "json");  
						}else if(operate=='look'){
							$.post("/am/am/system/organizationAuthorize/look.json?vc_organization_code="+rowData.vc_organization_code, null, function(data) {
											if (data != null) {
											    Horn.getComp(win).show();    
					                            Horn.getComp(form).setValues(data); 
					                            //设置readonly样式
					                            common_operate.setFormReadOnly(form);
											}
							}, "json");   
							
						}
		            }
				}
		      }, "json");   
		},
		commit:function(operate,win,form){
			if(operate=='edit'){
				url="/am/am/system/organizationAuthorize/doEdit/operation.json?l_function_no="+functionIds["orgAuthorize"]["edit"];
			}
			 var result = Horn.getComp(form).isValid();
				if(result)
				{
					var values = Horn.getComp(form).getValues();
					$.post(url, values, function(data) {
						if (data == "ok") {
							TDialog.Msg.alert("提示","操作成功",function(){
					           Horn.getComp(win).hide();
					           organizationAuthorize.formQuery();
					       }); 
						} 
					}, "text");
				}
			
			
		}
		
}