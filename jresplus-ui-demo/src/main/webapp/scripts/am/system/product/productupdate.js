 $(document).ready(function(){ 
	 var u=Horn.getCompById("l_busin_flag").getValue();
	 //后缀
	 var s2;
	 //部门编号值
	 var s3;
	 //排除产品到期和管理人员任命，否则js会报错  产品成立
	 if(u!='22340'&&u!='22402'&&u!='22401'){
	  var u2=Horn.getComp("en_deduct_ratio").getValue();
	   Horn.getComp("en_deduct_ratio").setValue(accMul(u2,100));
	    if(u=='22389'||u=='22390'){
			 s2="edit";
			//默认值去零处理
			 product.updatezero(2,2);
			 product.updatezero(2,1);  
		 }else if(u=='22391'){
			 s2="5";
		 }else{
			 s2=""; 
		 }
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
	 }else if(u=='22401'){
		  var s=Horn.getCompById("l_begin_date_4").getValue();
		  Horn.getCompById("l_begin_date2_4").setValue(s); 
		  s2="4";
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
	 }else if(u=='22402'){
//		 var s10=Horn.getCompById("vc_trust_manager_8").getValue();
//		 var s11=Horn.getCompById("vc_executive_manager_8").getValue();
//		 var s12=Horn.getCompById("vc_executive_manager_b_8").getValue();
//		 var s13=Horn.getCompById("vc_trust_accountant_8").getValue();
		//异步执行功能号字典重新加载
//     	$.ajax({
//     		type : "post",
//				url : "/am/am/system/tree/dicmanagelist.json?tableName=operator&&l_function_no=1000408",
//				data : "",
//				async : false,
//				dataType :"json",
//				success : function(result) {
//     		       Horn.getCompById("vc_trust_manager_8").addItems(result,true);
//     		      Horn.getCompById("vc_trust_manager_8").setValue(s10);
//     		       Horn.getCompById("vc_executive_manager_8").addItems(result,true);
//     		      Horn.getCompById("vc_executive_manager_8").setValue(s11);
//     		       Horn.getCompById("vc_executive_manager_b_8").addItems(result,true);
//     		      Horn.getCompById("vc_executive_manager_b_8").setValue(s12);
//     		       Horn.getCompById("vc_trust_accountant_8").addItems(result,true);
//     		      Horn.getCompById("vc_trust_accountant_8").setValue(s13);
//                    
//				}
//			});
	 }
   }); 

 var product={
			//账户序号，资产单元序号  排除0判断    参数1：idtype区分是1新增2修改3查看   type区分（1：账户序号 ；2：资产单元序号）
			 updatezero:function(idtype,type){
				        if(idtype==1){
				        	idtype="";
				        }else if(idtype==2){
				        	idtype="_edit";
				        }else{
				        	idtype="_look";
				        }
				        if(type==1){
			        		var a=Horn.getCompById("fund_id"+idtype).getValue();
			        		if(a==0){
			        			Horn.getCompById("fund_id"+idtype).setValue("");	
			        		}
			        	}else{
			        		var a=Horn.getCompById("asset_id"+idtype).getValue();
			        		if(a==0){
			        			Horn.getCompById("asset_id"+idtype).setValue("");	
			        		}
			        	} 
				        	 	 
			 },
			  //公用   根据开始日期  期限计算结束日期
			      change:function(type2){
				 var type=constants.suffix[type2];
			     var  l_begin_date=Horn.getCompById("l_begin_date"+type).getValue();
			     var  vc_duration=Horn.getCompById("c_period_unit"+type).getValue(false,true);
			     var  c_period_unit=Horn.getCompById("c_period_unit"+type).getValue();
			     if(l_begin_date!=''){
				     $.post("/am/am/system/product/getenddate.json?l_begin_date="+l_begin_date+"&&vc_duration="+vc_duration+"&&c_period_unit="+c_period_unit, null, function(data) {
										if (data!=null) {
										     Horn.getCompById("l_end_date"+type).setValue(data.l_end_date);
										} 
										else {
											Horn.Tip.warn(data);
										}
					 }, "json");
			      }
			   }
};