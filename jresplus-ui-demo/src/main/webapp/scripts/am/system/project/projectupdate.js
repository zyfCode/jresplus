 $(document).ready(function(){ 
	 var u=Horn.getCompById("l_busin_flag").getValue();
	 var s2;//后缀
	 var s3;//部门编号值    经理
//	 var s4;//其他人员
	    if(u=='22413'||u=='22414'||u=='22415'){
			 s2="edit";
			 project.lockmoneydx(2);
			 s3=Horn.getCompById("vc_branch_id_"+s2).getValue();
				//同步执行功能号字典重新加载
				 	$.ajax({
				 		type : "post",
							url : "/am/am/system/tree/dicmanagelist.json?tableName=brach&&l_function_no=1000043&&filterString="+s3,
							data : "",
							async : false,
							dataType :"json",
							success : function(result) {
				 		       Horn.getCompById("vc_branch_id_"+s2).addItems(result,true);
				 		       Horn.getCompById("vc_branch_id_"+s2).setValue(s3);
							}
			 });
			project.editmoneydxsetvalue(2);	 	
		 }else if(u=='22416'){
			 s2="4";  
//			 s4=$("#vc_operators_4 > input:eq(1)").val();
//			 common_operate.queryOperatorbybranch("vc_operators_"+s2,s4);
//			 Horn.getCompById("vc_operators_"+s2).setValue(s4);
             common_operate.geteditlist("vc_project_manager_"+s2,"operator","1001429");
		 }else{
			 s2=""; 
		 }
	   
	 
   }); 
// var  project={
//			//项目总金额大写绑定
//			lockmoneydx : function(type) {
//				//字段后缀
//				var type2;
//				if(type==1){
//					type2="";
//				}else if(type==2){
//					type2="_edit";
//				}else if(type==3){
//					type2="_look";
//				}else{
//					type2="_"+type+"";
//				}
//				common_operate.dealCapital("en_project_money_x" + type2,"en_project_money"+ type2);
//			},//项目总金额大写赋值
//			editmoneydxsetvalue : function(type) {
//				//字段后缀
//				var type2;
//				if(type==1){
//					type2="";
//				}else if(type==2){
//					type2="_edit";
//				}else if(type==3){
//					type2="_look";
//				}else{
//					type2="_"+type+"";
//				}
//				Horn.getCompById("en_project_money_x" + type2).setValue($("#en_project_money"+ type2 + " > .u-typefield-capital").text());
//			}
//			
//	};
