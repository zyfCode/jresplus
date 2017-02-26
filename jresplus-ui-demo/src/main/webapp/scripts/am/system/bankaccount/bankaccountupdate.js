$(function(){  
        var s="";
        common_operate.geteditlist("vc_product_id_edit","product","1000407");
//        var s2=Horn.getCompById("vc_product_id_edit").getValue();
//      //同步执行功能号字典重新加载
//    	$.ajax({
//    		type : "post",
//			url : "/am/am/system/tree/dicmanagelist.json?tableName=product&&l_function_no=1000407&&filterString="+s2,
//			data : "",
//			async : false,
//			dataType :"json",
//			success : function(result) {
//    		       Horn.getCompById("vc_product_id_edit").addItems(result,true);
//    		       Horn.getCompById("vc_product_id_edit").setValue(s2);
//			}
//		});
        $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+s+"&&vc_key=T0002&&l_level=1&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
						if (data !=null) {
							var u=Horn.getCompById("vc_province_no_edit").getValue();
							var u2=Horn.getCompById("vc_city_no_edit").getValue();
							Horn.getCompById("vc_province_no_edit").addItems(data,true);
							Horn.getCompById("vc_province_no_edit").setValue(u);
							change2(u2);
						} 
//						else {
//							Horn.Tip.warn(data);
//						}
	   }, "json"); 
    });  

	
	
	function doAdd() {
	    var result = Horn.getComp("addForm").isValid();
		if(result)
		{
			var values = Horn.getComp("addForm").getValues();
					$.post("/am/am/system/bankaccount/operation.json?l_function_no="+functionIds["bankaccount"]["zl"]+"&&business_type=yhzhxz", values, function(data) {
						if (data == "ok") {
						    Horn.getComp("addForm").clearValue();
						    Horn.getComp("addWin").hide();
							formQuery();
							Horn.Tip.success("操作成功");
						} 
//						else {
//							//Horn.Tip.warn("操作失败");
//							Horn.Tip.warn(data);
//						}
					}, "text");
	    }			
	}
	
   function  change(){
     var  val=Horn.getCompById("vc_province_no").getValue();
     if(val=='71'||val=='81'||val=='82'){
      	  Horn.getCompById("vc_city_no").setRequired(false);
        }else{
      	  Horn.getCompById("vc_city_no").setRequired(true);
        }
      $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
						if (data !=null) {
							 Horn.getCompById("vc_city_no").addItems(data,true);
							 Horn.getCompById("vc_city_no").selectFirst();
						}
//						else {
//							//Horn.Tip.warn("操作失败");
//							Horn.Tip.warn(data);
//						}
	 }, "json");
      
   }
   function  change2(s){
      var  val=Horn.getCompById("vc_province_no_edit").getValue();
      if(val=='71'||val=='81'||val=='82'){
    	  Horn.getCompById("vc_city_no_edit").setRequired(false);
      }else{
    	  Horn.getCompById("vc_city_no_edit").setRequired(true);
      }
      $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
						if (data !=null) {
							Horn.getCompById("vc_city_no_edit").addItems(data,true);
							Horn.getCompById("vc_city_no_edit").selectFirst();
							if(s!=0){
							   Horn.getCompById("vc_city_no_edit").setValue(s,true);
							}
						} 
//						else {
//							//Horn.Tip.warn("操作失败");
//							Horn.Tip.warn(data);
//						}
	 }, "json");
   }
   function  change3(s){
      var  val=Horn.getCompById("vc_province_no_look").getValue();
      if(val=='71'||val=='81'||val=='82'){
    	  Horn.getCompById("vc_city_no_look").setRequired(false);
      }else{
    	  Horn.getCompById("vc_city_no_look").setRequired(true);
      }
      $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
						if (data !=null) {
							Horn.getCompById("vc_city_no_look").addItems(data,true);
							Horn.getCompById("vc_city_no_look").selectFirst();
							if(s!=0){
							   Horn.getCompById("vc_city_no_look").setValue(s,true);
							}
						}
//						else {
//							//Horn.Tip.warn("操作失败");
//							Horn.Tip.warn(data);
//						}
	 }, "json");
   }
    function look(a,b){
        $.post("/am/am/system/bankaccount/look.json?vc_product_id="+a+"&&l_workgroup_id="+b, null, function(data) {
						if (data != null) {
						    Horn.getComp("lookWin").show();    
                            Horn.getComp("lookForm").setValues(data);
                            change3(data.vc_city_no);
						} 
//						else {
//							Horn.Tip.warn("查询信息失败");
//						}
		}, "json");                 
	}
    
	function addWinCancle() {
		Horn.getComp("addWin").hide();
	}
	function editWinCancle() {
		Horn.getComp("editWin").hide();
	}
	function edit(){
		if (Horn.getComp('bankaccountTable').getSelecteds().length==0){
	   		Horn.Tip.warn("请选择一条记录！");
	   		return;
	    }
		rowData = Horn.getComp('bankaccountTable').getSelecteds().length && (Horn.getComp('bankaccountTable').getSelecteds())[0];
		$.post("/am/am/system/bankaccount/look.json?vc_product_id="+rowData.vc_product_id+"&&l_workgroup_id="+rowData.l_workgroup_id, null, function(data) {
						if (data != null) {
						    Horn.getComp("editWin").show();    
					        Horn.getComp("editForm").setValues(data);
					        change2(data.vc_city_no);
						} 
//						else {
//							Horn.Tip.warn("查询信息失败");
//						}
		}, "json");        
		
	}

	function doEdit() {
	   var result = Horn.getComp("editForm").isValid();
		if(result)
		{
			var values = Horn.getComp("editForm").getValues();
			console.log(values);
			$.post("/am/am/system/bankaccount/operation.json?l_function_no="+functionIds["bankaccount"]["zl"]+"&&business_type=yhzhxg", values, function(data) {
				if (data == "ok") {
				    Horn.getComp("editWin").hide();
					formQuery();
					Horn.Tip.success("操作成功");
				} 
//				else {
//				     Horn.Tip.warn(data);
//				}
			}, "text");
		}
	}

	function addmaWinCancle() {
		Horn.getComp("addmaWin").hide();
	};
	function  changebank(type){
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
		     var  val=Horn.getCompById("vc_bank_id"+type2).getValue();
		    var s=$("#vc_bank_id"+type2).nextAll(".hc_checkboxdiv:eq(0)").find("ul > li[key="+val+"]").attr("title");
		     Horn.getCompById("vc_bank_name"+type2).setValue(s);
	   }
	
	function del(){
	    
		   if (Horn.getComp('bankaccountTable').getSelecteds().length==0){
		   		Horn.Tip.warn("请选择一条记录！");
		   		return;
		   }else{
		      TDialog.Msg.confirm("提示","您确定要删除银行账户吗",function(){
			      rowData = Horn.getComp('bankaccountTable').getSelecteds().length && (Horn.getComp('bankaccountTable').getSelecteds())[0];  
			      //alert(rowData.vc_product_id+" && "+rowData.l_workgroup_id); 
			      $.post("/am/am/system/bankaccount/operation.json?l_function_no="+functionIds["bankaccount"]["zl"]+"&&business_type=yhzhsc&&vc_product_id="+rowData.vc_product_id+"&&l_workgroup_id="+rowData.l_workgroup_id, null, function(data) {
						if (data == "ok") {
							formQuery();
							Horn.Tip.success("操作成功");
						} 
//						else {
//						    Horn.Tip.warn(data);
//							//Horn.Tip.warn("操作失败");
//						}
					}, "text");
				},function(){  
		          //canel  
		       });
		   }
		  
         
	};