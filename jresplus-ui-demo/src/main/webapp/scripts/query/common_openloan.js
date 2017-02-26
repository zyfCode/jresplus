//点击手之后的对手方显示界面，对手方弹出添加相关对手方js 
function addwinloan(){
	$.post("/am/am/init/list.json", null, function(data) {
		if (data!=null) {					
            if(data.l_operate_flag==0){	        		
	            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
					});	       
            }else{
            	var s=$("#buttonId").val();
            	if(s){
            		window.parent.addwinloan2();
            	}else{
                	window.parent.parent.Horn.Frame.openMenu('404109','/am/am/business/loanrival/loanrivaladd.htm','对手方信息添加','inbox');

            	}
            	
            } 
		}
   }, "json");
	
}

//弹出添加相关对手方账户js 
function addwinloanaccount(){
	$.post("/am/am/init/list.json", null, function(data) {
		if (data!=null) {					
            if(data.l_operate_flag==0){	        		
	            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
					});	       
            }else{
            	var s=$("#buttonId").val();
            	if(s){
            		window.parent.addwinloanaccount();
            	}else{
            		common_reg.Formreset("queryrivalaccForm");
            		Horn.getCompById("queryrivalaccWin").show();
            		var u=Horn.getCompById("l_rival_id_ra").getValue();
            		//同步执行功能号字典重新加载
	            	$.ajax({
	            		type : "post",
						url : "/am/am/system/tree/dicmanagelist.json?tableName=loanrival&&l_function_no=1000184",
						data : "",
						async : false,
						dataType :"json",
						success : function(result) {
	            		       Horn.getCompById("queryrivall_rival_id").addItems(result,true);
	            		       Horn.getCompById("queryrivall_rival_id").setValue(u);
						}
					});
            		var s="";
            		$.ajax({
	            		type : "post",
						url : "/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+s+"&&vc_key=T0002&&l_level=1&&l_function_no="+functionIds["bankaccount"]["dct"],
						data : "",
						async : false,
						dataType :"json",
						success : function(data) {
							if (data !=null) {
    							Horn.getCompById("queryrivalvc_province_no").addItems(data,true);
    						} else {
    							Horn.Tip.warn(data);
    						}
						}
					});
        
            	}
            	
            } 
		}
   }, "json");
}

//对手方账户城市选择
function  rivalprovincechange(){
    var  val=Horn.getCompById("queryrivalvc_province_no").getValue();
  //处理特别行政区为非必填
    if(val=='71'||val=='81'||val=='82'){
     	  Horn.getCompById("queryrivalvc_city_no").setRequired(false);
     }else{
     	  Horn.getCompById("queryrivalvc_city_no").setRequired(true);
     }
     $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
						if (data !=null) {
							 Horn.getCompById("queryrivalvc_city_no").addItems(data,true);
							// Horn.getCompById("vc_city_no").selectFirst();
						} else {
							Horn.Tip.warn(data);
						}
    }, "json");
}
//对手方账户银行选择
function  rivalbankchange(){
	     var  val=Horn.getCompById("queryrivalvc_bank_id").getValue();
	    var s=$("#queryrivalvc_bank_id").nextAll(".hc_checkboxdiv:eq(0)").find("ul > li[key="+val+"]").attr("title");
     Horn.getCompById("queryrivalvc_branch_name").setValue(s);
 }
//对手方账户添加
function doqueryrivalaccAdd(){
	var result = Horn.getComp("queryrivalaccForm").isValid();
	if(result)
	{
		var values = Horn.getComp("queryrivalaccForm").getValues();
		 dialog.dialog("open");
				$.post("/am/am/business/rivalbankaccount/operation.json?l_function_no="+functionIds["rivalbankaccount"]["zl"]+"&&business_type=dszhxz", values, function(data) {
					common_operate.endProgress();
				     if (data == "ok") {
						Horn.getComp("queryrivalaccWin").hide();
						Horn.Tip.success("操作成功");
					} else {
						//Horn.Tip.warn("操作失败");
						Horn.Tip.warn(data);
					}
				}, "text");
    }			
}
function addqueryrivalaccWinCancle(){
	common_reg.Formreset("queryrivalaccForm");
}

//function  changebank(type){
//	   var type2;
//		if(type==1){
//			type2="";
//		}else if(type==2){
//			type2="_edit";
//		}else if(type==3){
//			type2="_look";
//		}else{
//			type2="_"+type+"";
//		}
//	     var  val=Horn.getCompById("vc_bank_id"+type2).getValue();
//	    var s=$("#vc_bank_id"+type2).nextAll(".hc_checkboxdiv:eq(0)").find("ul > li[key="+val+"]").attr("title");
//     Horn.getCompById("vc_branch_name"+type2).setValue(s);
// }
//function  change(){
//    var  val=Horn.getCompById("vc_province_no").getValue();
//     $.post("${appServer}/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
//						if (data !=null) {
//							 Horn.getCompById("vc_city_no").addItems(data,true);
//							// Horn.getCompById("vc_city_no").selectFirst();
//						} else {
//							Horn.Tip.warn(data);
//						}
//	 }, "json");
//     
//  }
////添加相关js 
//function add(){
//	$.post("/am/am/init/list.json", null, function(data) {
//		if (data!=null) {					
//            if(data.l_operate_flag==0){	        		
//	            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
//					});	       
//            }else{
//                Horn.getComp("addForm").clearValue();
//            	Horn.getComp("addWin").show();
//            	//同步执行功能号字典重新加载
//            	$.ajax({
//            		type : "post",
//					url : "/am/am/system/tree/dicmanagelist.json?tableName=loanrival&&l_function_no=1000184",
//					data : "",
//					async : false,
//					dataType :"json",
//					success : function(result) {
//            		       Horn.getCompById("l_rival_id").addItems(result,true);
//					}
//				});
//            } 
//		}
//   }, "json");
//	
//};
//function doAdd() {
//    var result = Horn.getComp("addForm").isValid();
//	if(result)
//	{
//		var values = Horn.getComp("addForm").getValues();
//		 dialog.dialog("open");
//				$.post("${appServer}/am/business/rivalbankaccount/operation.json?l_function_no="+functionIds["rivalbankaccount"]["zl"]+"&&business_type=dszhxz", values, function(data) {
//					dialog.dialog("close");
//				     if (data == "ok") {
//						 Horn.getComp("addForm").clearValue();
//						Horn.getComp("addWin").hide();
//						formQuery();
//						Horn.Tip.success("操作成功");
//					} else {
//						//Horn.Tip.warn("操作失败");
//						Horn.Tip.warn(data);
//					}
//				}, "text");
//    }			
//}
//function addWinCancle() {
//	Horn.getComp("addWin").hide();
//}