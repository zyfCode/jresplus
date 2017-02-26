$(function(){  
        var s="";
        $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+s+"&&vc_key=T0002&&l_level=1&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
						if (data !=null) {
							var u=Horn.getCompById("vc_province_no_edit").getValue();
							var u2=Horn.getCompById("vc_city_no_edit").getValue();
							Horn.getCompById("vc_province_no_edit").addItems(data,true);
							Horn.getCompById("vc_province_no_edit").setValue(u);
							rivalbankaccount.change(2,u2);
						} 

	   }, "json"); 
    });  
var rivalbankaccount={
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
		 change:function(type,s){
			 var type2=rivalbankaccount.typechange(type);
		     var  val=Horn.getCompById("vc_province_no"+type2).getValue();
		   //处理特别行政区为非必填
		     if(val=='71'||val=='81'||val=='82'){
		      	  Horn.getCompById("vc_city_no"+type2).setRequired(false);
		      }else{
		      	  Horn.getCompById("vc_city_no"+type2).setRequired(true);
		      }
		      $.post("/am/am/system/bankaccount/comboxlist.json?vc_parent_code="+val+"&&vc_key=T0002&&l_level=2&&l_function_no="+functionIds["bankaccount"]["dct"], null, function(data) {
								if (data !=null) {
									 Horn.getCompById("vc_city_no"+type2).addItems(data,true);
									 if(s!=0){
										   Horn.getCompById("vc_city_no"+type2).setValue(s,true);
										}
								} 
			 }, "json");
		      
		   },
		  //根据选择的银行自动填充银行名称
	     changebank:function(type){
		 	   var type2=rivalbankaccount.typechange(type);
		 	     var  val=Horn.getCompById("vc_bank_no"+type2).getValue();
		 	    var s=$("#vc_bank_no"+type2).nextAll(".hc_checkboxdiv:eq(0)").find("ul > li[key="+val+"]").attr("title");
		        Horn.getCompById("vc_bank_name"+type2).setValue(s);
		    }
};