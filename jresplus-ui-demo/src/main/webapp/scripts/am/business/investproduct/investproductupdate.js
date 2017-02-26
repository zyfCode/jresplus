//金融产品信息
var investproduct = {
		 //添加穿透资产类型
	     addtype:function(element2) {
	    	  alert("当前页面不支持穿透资产类型添加");
		},
	  	//小数转化百分比
	  	funratio:function(data){
	        return parseFloat(data.val)*100;
	    },
	  //主键转换
		 funlook:function(data){
	       return "<a href='javascript:void(0);' onclick='investproduct.look(\""+data.val+"\");' >"+data.val+"</a>";
	   },
	 //替换字符串  
	     Replace:function(str, from, to) {
	        return str.split(from).join(to);
	    },
	  //返回月份(两位数)  
	     GetFullMonth:function(date) {
	        var v = date.getMonth() + 1;
	        if (v > 9) return v.toString();
	        return "0" + v;
	    },
	    // 日期类型格式成指定的字符串
	     FormatDate:function(date, format) {
	        format = investproduct.Replace(format, "yyyy", date.getFullYear());
	        format = investproduct.Replace(format, "MM", investproduct.GetFullMonth(date));
	        format = investproduct.Replace(format, "dd", "20");
	        return format;
	    },
	  //计算首次结息日
		  caclenddate:function(type){
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
			var  l_begin_days=Horn.getCompById("l_begin_days"+type2).getValue();
			var  l_end_days=Horn.getCompById("l_end_days"+type2).getValue();
			if(Horn.getCompById("en_pay_inteval"+type2).getValue()!=null&&Horn.getCompById("en_pay_inteval"+type2).getValue()!=''&&Horn.getCompById("en_pay_inteval"+type2).getValue()!='0'){
				var  en_pay_inteval=parseInt(Horn.getCompById("en_pay_inteval"+type2).getValue());
			}else if(Horn.getCompById("en_pay_inteval"+type2).getValue()=='0'){
				var  en_pay_inteval="0";
			}else{
				var  en_pay_inteval="";
			}
			if(l_begin_days!=""){
				if(en_pay_inteval==""||en_pay_inteval==null){
					Horn.getCompById("l_first_pay_date"+type2).clearValue();
	 	        }else if(en_pay_inteval=='0'){
	 	        	Horn.getCompById("l_first_pay_date"+type2).setValue(l_end_days);
	 	        }else{
	 	        	l_begin_days=l_begin_days.substring(0,4)+"/"+l_begin_days.substring(4,6)+"/"+l_begin_days.substring(6,8);
	 	            var date_begin=new Date(l_begin_days);
	 	            if(parseInt(l_begin_days.substring(6,8))<20){
	 	            	en_pay_inteval=en_pay_inteval-1;
	 	            }
	 	            date_begin.setMonth(date_begin.getMonth() + en_pay_inteval);
	 	            Horn.getCompById("l_first_pay_date"+type2).setValue(investproduct.FormatDate(date_begin,"yyyyMMdd"));
	 	        }
	        }else{
	        	TDialog.Msg.error("提示","开始日期不能为空",function(){ 
	        		Horn.getCompById("en_pay_inteval"+type2).clearValue();
				});
	        } 
		},
		// 收益类别监听
		 cProfitTypeChange:function(type) {
			type = constants.suffix[type] || "";
			// var c_profit_type = $("#c_profit_type" + type + " >
			// input:eq(0)").val();
			var c_product_type = Horn.getCompById("c_product_type" + type).getValue();
			if (c_product_type == "3" || c_product_type == "4") {
				var c_profit_type = Horn.getCompById("c_profit_type" + type)
						.getValue();
				if (c_profit_type == "2") {// 隐藏利率
					Horn.getCompById("2").disable();
					Horn.getCompById("2").hide();
					$("div[title='2'][class='stockcodesex_title']").hide();
					Horn.getCompById("c_calc_cycle" + type).setDisabled(true);
					Horn.getCompById("en_pay_inteval" + type).setDisabled(true);
					Horn.getCompById("l_first_pay_date" + type).setDisabled(true);
					Horn.getCompById("en_rate" + type).setDisabled(true);

					Horn.getCompById("c_calc_cycle" + type).hide();
					Horn.getCompById("en_pay_inteval" + type).hide();
					Horn.getCompById("l_first_pay_date" + type).hide();
					Horn.getCompById("en_rate" + type).hide();
					Horn.getCompById("en_publisher_scale" + type).hide();
				} else {
					Horn.getCompById("2").enable();
					Horn.getCompById("2").show();
					$("div[title='2'][class='stockcodesex_title']").show();
					Horn.getCompById("c_calc_cycle" + type).setDisabled(false);
					Horn.getCompById("en_pay_inteval" + type).setDisabled(false);
					Horn.getCompById("l_first_pay_date" + type).setDisabled(false);
					Horn.getCompById("en_rate" + type).setDisabled(false);

					Horn.getCompById("c_calc_cycle" + type).show();
					Horn.getCompById("en_pay_inteval" + type).show();
					Horn.getCompById("l_first_pay_date" + type).show();
					Horn.getCompById("en_rate" + type).show();
					Horn.getCompById("en_publisher_scale" + type).show();				
				}
				//判断信托计划固定收益类必填评级
				if (c_product_type == "4"&&c_profit_type == "1") {
					Horn.getCompById("c_internal_rating" + type).setRequired(true);
					Horn.getCompById("c_external_rating" + type).setRequired(true);
				}else{
					Horn.getCompById("c_internal_rating" + type).setRequired(false);
					Horn.getCompById("c_external_rating" + type).setRequired(false);
				}
			} else {
				Horn.getCompById("2").enable();
				Horn.getCompById("2").show();
				$("div[title='2'][class='stockcodesex_title']").show();
				Horn.getCompById("c_calc_cycle" + type).setDisabled(false);
				Horn.getCompById("en_pay_inteval" + type).setDisabled(false);
				Horn.getCompById("l_first_pay_date" + type).setDisabled(false);
				Horn.getCompById("en_rate" + type).setDisabled(false);

				Horn.getCompById("c_calc_cycle" + type).show();
				Horn.getCompById("en_pay_inteval" + type).show();
				Horn.getCompById("l_first_pay_date" + type).show();
				Horn.getCompById("en_rate" + type).show();
				Horn.getCompById("en_publisher_scale" + type).show();
				//判断债权计划必填评级
				if (c_product_type == "1") {
					Horn.getCompById("c_internal_rating" + type).setRequired(true);
					Horn.getCompById("c_external_rating" + type).setRequired(true);
				}else{
					Horn.getCompById("c_internal_rating" + type).setRequired(false);
					Horn.getCompById("c_external_rating" + type).setRequired(false);
				}
			}
			//根据内容的高度去对应改动iframe高度调用滚动条
			window.parent.resizeuesWin($(document.body).height());
		},
		//产品种类改变事件
		 changeproduct:function(type2){
			 var type=constants.suffix[type2];
		     var  val=Horn.getCompById("c_product_type"+type).getValue();
		     var filter;
		     var filter2;
		     if(val==''||val==null){
		    	   Horn.getCompById("c_profit_type"+type).show(); 
		 	        Horn.getCompById("c_profit_type"+type).setDisabled(false);
		 	        Horn.getCompById("c_special_flag"+type).show(); 
		 	        Horn.getCompById("c_special_flag"+type).setDisabled(false);
		 	        Horn.getCompById("c_penetration_flag"+type).show(); 
		 	        Horn.getCompById("c_penetration_flag"+type).setDisabled(false);
		     }else{
		    	 if(val=='1'){
		 	        filter="1,2";
		 	        filter2="";
		 	     }else if(val=='2'){
		 	        filter="3,4,a";
		 	        filter2="";
		 	     }else if(val=='3'){
		 	        filter="5,6";
		 	        filter2="1,2,3,4,b,c";
		 	     }else if(val=='4'){
		 	        filter="7,8,9";
		 	        filter2="1,2";
		 	     }else if(val=='5'){
		 	        filter="A,B";
		 	        filter2="7,8,9,a";
		 	     }else{
		 	        filter="";
		 	        filter2="";
		 	     }
		 	     Horn.getCompById("c_product_ext_type"+type).filter(filter,true,false);
		 	     Horn.getCompById("c_profit_type"+type).filter(filter2,true,false);
		 	    if(val=='1'||val=='2'){
		 	        Horn.getCompById("c_profit_type"+type).hide(); 
		 	        Horn.getCompById("c_profit_type"+type).setDisabled(true);
		 	        Horn.getCompById("c_penetration_flag"+type).hide(); 
		 	        Horn.getCompById("c_penetration_flag"+type).setDisabled(true);
		 	     }else{
		 	        if(val=='3'||val=='4'){
		 	         Horn.getCompById("c_penetration_flag"+type).show(); 
		 	         Horn.getCompById("c_penetration_flag"+type).setDisabled(false);
		 	        }else{
		 	          Horn.getCompById("c_penetration_flag"+type).hide(); 
		 	          Horn.getCompById("c_penetration_flag"+type).setDisabled(true);
		 	        }
		 	        Horn.getCompById("c_profit_type"+type).show(); 
		 	        Horn.getCompById("c_profit_type"+type).setDisabled(false);
		 	     } 
		 		Horn.getCompById("c_special_flag"+type).hide(); 
		        Horn.getCompById("c_special_flag"+type).setDisabled(true);
		     }
		     investproduct.cProfitTypeChange(type2);
		},
		//产品细分改变事件
		 changedetail:function(type2){
			 var type=constants.suffix[type2];
		      var  val=Horn.getCompById("c_product_ext_type"+type).getValue();
		       if(val=='3'){
		         Horn.getCompById("c_special_flag"+type).show(); 
		         Horn.getCompById("c_special_flag"+type).setDisabled(false);
		         Horn.getCompById("c_penetration_flag"+type).hide(); 
		         Horn.getCompById("c_penetration_flag"+type).setDisabled(true);
		       }else{
		          if(val=='4'){
		            Horn.getCompById("c_penetration_flag"+type).show(); 
		            Horn.getCompById("c_penetration_flag"+type).setDisabled(false);
		          }
		         Horn.getCompById("c_special_flag"+type).hide(); 
		         Horn.getCompById("c_special_flag"+type).setDisabled(true);
		       }	 
		}
};


$(function(){  
	   var u=Horn.getCompById("l_busin_flag").getValue();
		if(u=='22403'||u=='22404'||u=='22405'){
		   var  s2=Horn.getCompById("c_product_ext_type_edit").getValue();
		   var  s3=Horn.getCompById("c_profit_type_edit").getValue();
		   investproduct.changeproduct(2);
		   investproduct.changedetail(2);
		   Horn.getCompById("c_product_ext_type_edit").setValue(s2,true); 
		   Horn.getCompById("c_profit_type_edit").setValue(s3,true); 
		   investproduct.cProfitTypeChange(2);
		   common_operate.geteditlist("l_rating_organ_edit","loanrival","1000185");
		   common_operate.geteditlist("l_publisher_id_edit","loanrival","1000185");
		   common_operate.geteditlist("l_capital_id_edit","loanrival","1000185");
		   common_operate.geteditlist("l_guarantor_edit","loanrival","1000185");
		}
//		else{
//			//var y=Horn.getCompById("en_invest_ratio_5").getValue();
//			//Horn.getCompById("en_invest_ratio_5").setValue(accMul(y,100));
//		}
    });  