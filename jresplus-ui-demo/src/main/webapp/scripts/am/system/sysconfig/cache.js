var cache={
		formQuery:function(){
			Horn.getCompById("cacheTable").load();
		},
		reflash:function(){
	    	var length = Horn.getComp('cacheTable').getSelecteds().length; 
	 	   if (length==0){
	 	   		Horn.Tip.warn("请选择一条记录！");
	 	   		return;
	 	   }else{
	 	      TDialog.Msg.confirm("刷新缓存信息吗","您确定要刷新缓存信息吗",function(){
	 	           var values =Horn.getComp('cacheTable').getSelecteds();   
	 	           dialog.dialog("open");
	 	           var  i=0;
	 				var  idstring='';
	 				while(length>i){
	 				   if(i==0){
	 				      idstring=values[i].key;
	 				   }else{
	 				       idstring=idstring+";"+values[i].key;
	 				   }
	 				   i++;
	 				}
	 	            $.post("/am/am/system/sysconfig/reflash.json?key="+idstring, null, function(data) {
	 	            	dialog.dialog("close");
							if (data == "ok") {
	 							TDialog.Msg.alert("提示","操作成功",function(){
	 								cache.formQuery();
	 					        });
	 						}
							else {
								TDialog.Msg.alert("提示","非管理员无操作权限"); 
	 						}
	 					}, "text");
	 	      },function(){  
	 		          //canel  
	 		       });
	 	   
	 	   }
	 	 }
};