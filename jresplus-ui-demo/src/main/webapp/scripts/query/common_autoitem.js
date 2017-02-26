$(function(){
	 /***********可移动列单击必须配置  开始******/
	   //单击列选择框全选
		$(".block__titleabove input[name=allcheck]").click(
		   function(){
		   	  if($(this).is(":checked")){ 
		   	  	$(this).parent().next("ul").find("li").each(function() {
			          $(this).find("input").attr("checked", "checked");
			          $(this).addClass("block__list-row-selected");
			      });
		   	  }else{
		   	  	$(this).parent().next("ul").find("li").each(function() {
			          $(this).find("input").removeAttr("checked");
			          $(this).removeClass("block__list-row-selected");
			      });
		   	  }  
			 }    
		);
		//单击行选中
		$(".block__titleabove").next("ul").on("click","li", function(event) {
			console.log(event.target.tagName);
			//处理子节点input单击事件向上冒泡做判断
			if(event.target.tagName!="INPUT"){
				if($(this).find("input").is(":checked")){ 
				     $(this).find("input").removeAttr("checked");
					 $(this).removeClass("block__list-row-selected");
			    }else{
			    	$(this).addClass("block__list-row-selected");
			        $(this).find("input").attr("checked", "checked");
			    }
			}
		 });
		 
		//单checkbox选中		
	    $(".block__titleabove").next("ul").on("click","li input",
		         function(event) {
	    	                   console.log(event.target.tagName);  	    	                
		         	           if($(this).is(":checked")){ 
		         	        	  $(this).attr("checked", "checked");
		         	        	   $(this).parent().addClass("block__list-row-selected"); 
							   }else{
								   $(this).parent().removeClass("block__list-row-selected");
								   $(this).removeAttr("checked");
							   }
		         	           //on在绑定统一元素之后可以用return false防止向上层冒泡            但是checkbox用该方法会取消选中
		         	          //return false; 
				}
		 ); 
		 //操作图标鼠标移入移出变化
		 $(".block_image").mouseover(
		  function(){
		  	   var name= $(this).attr("name"); 
		  	   $(this).attr("src","/am/images/sortable/"+name+"_on.png"); 
		 	}
		 );
	     $(".block_image").mouseout(
	      function(){
			  	   var name= $(this).attr("name");
			 	     $(this).attr("src","/am/images/sortable/"+name+".png");
			 	}
			 );
	     /***********可移动列单击必须配置  结束******/ 
	     
	     /***********自定义条件——可移动列单击特殊事件  开始******/
		  //新增选中值
		 $("#add").click(
		     function() {
		    	//增加时加条件数判断
		    	  if(Horn.getComp("querynum").getValue()!=null&&Horn.getComp("querynum").getValue()!=""){
	    	    	  var querynum=parseInt(Horn.getComp("querynum").getValue());
	    	      }else{
	    	    	  var querynum=1000;//无限制
	    	      }
	    	      var qnum=querynum;
	    	      var oldnum=$("#bar li").length;
		         	        var num=0;
					    	$("#foo").find("li").each(function(){
					    			var f=$(this).find("input").is(":checked");
					    			if(f){
					    				if(querynum!=1000){
							    			if(querynum!=0){
							    				var unum=querynum-oldnum;
							    				if(unum>0){
							    					$(this).find("input").removeAttr("checked");
								    				$(this).removeClass("block__list-row-selected");
								    				$(this).appendTo('#bar');
													querynum--;
													num=num+1;
							    				}else{
							    					num=num+1;
							    					TDialog.Msg.warning("提示","已选条件已达上限"+qnum+"个,请去掉其他条件之后再操作");
							    					return false; //跳出循环
							    				}
							    			}else{
							    				 num=num+1;
							    				 return false; //跳出循环
							    			}
							    		}else{
							    			$(this).find("input").removeAttr("checked");
						    				$(this).removeClass("block__list-row-selected");
						    				$(this).appendTo('#bar');
						    				num=num+1;
							    		} 
					    			}
					    	});
					    	if(num==0){	
					    		Horn.Tip.warn("请至少选中一条记录");
					    	}else{
					    		$(".block__titleabove input[name=allcheck]").removeAttr("checked");
					    	} 
					}
		 );
		 //新增全部
		  $("#addall").click(
		     function() {	
		    	     //增加时加条件数判断
		    	      if(Horn.getComp("querynum").getValue()!=null&&Horn.getComp("querynum").getValue()!=""){
		    	    	  var querynum=parseInt(Horn.getComp("querynum").getValue());
		    	      }else{
		    	    	  var querynum=1000;//无限制
		    	      }
		    	      var qnum=querynum;
		    	      var oldnum=$("#bar li").length;
				    	$("#foo").find("li").each(function(){
				    		if(querynum!=1000){
				    			if(querynum!=0){
				    				var unum=querynum-oldnum;
				    				if(unum>0){
				    					$(this).find("input").removeAttr("checked");
						    		    $(this).removeClass("block__list-row-selected");
										$(this).appendTo('#bar');
										querynum--;
				    				}else{
				    					TDialog.Msg.warning("提示","已选条件已达上限"+qnum+"个,请去掉其他条件之后再操作");
				    					return false; //跳出循环
				    				}
				    			}else{
				    				 return false; //跳出循环
				    			}
				    		}else{
				    			$(this).find("input").removeAttr("checked");
				    		    $(this).removeClass("block__list-row-selected");
								$(this).appendTo('#bar');
				    		}    
						});
				    	$(".block__titleabove input[name=allcheck]").removeAttr("checked");    	
		     }
		  );
		  //删除选终值
		  $("#del").click(
		     function() {
		         	  var num=0;
					    	$("#bar").find("li").each(function(){
					    			var f=$(this).find("input").is(":checked");
					    			if(f){
					    				$(this).find("input").removeAttr("checked");
					    				$(this).removeClass("block__list-row-selected");
					    				$(this).appendTo('#foo');
					    				num=num+1;
					    			}
					    	});
					    	if(num==0){	
					    		Horn.Tip.warn("请至少选中一条记录");
					    	}else{
					    		$(".block__titleabove input[name=allcheck]").removeAttr("checked");
					    	}  
					}
		 );
		 //删除全部
		  $("#delall").click(
		     function() {		    
				    	$("#bar").find("li").each(function(){
				    		    $(this).find("input").removeAttr("checked");
				    		    $(this).removeClass("block__list-row-selected");
								$(this).appendTo('#foo');
							});
				    	$(".block__titleabove input[name=allcheck]").removeAttr("checked");
				    	
		     }
		  );
		  /***********自定义条件——可移动列单击特殊事件  结束******/
		  
		  
		  /***********自定义显示列——可移动列单击特殊事件  开始******/
		  //新增选中值
		 $("#add_culumn").click(
		     function() {
		         	  var num=0;
					    	$("#foo_culumn").find("li").each(function(){
					    			var f=$(this).find("input").is(":checked");
					    			if(f){
					    				$(this).find("input").removeAttr("checked");
					    				$(this).removeClass("block__list-row-selected");
					    				$(this).appendTo('#bar_culumn');
					    				num=num+1;
					    			}
					    	});
					    	if(num==0){	
					    		Horn.Tip.warn("请至少选中一条记录");
					    	}else{
					    		$(".block__titleabove input[name=allcheck]").removeAttr("checked");
					    	}  
					}
		 );
		 //新增全部
		  $("#addall_culumn").click(
		     function() {		    
				    	$("#foo_culumn").find("li").each(function(){
				    		   $(this).find("input").removeAttr("checked");
				    		   $(this).removeClass("block__list-row-selected");
								$(this).appendTo('#bar_culumn');
							});
				    	   $(".block__titleabove input[name=allcheck]").removeAttr("checked");
				    	
		     }
		  );
		  //删除选终值
		  $("#del_culumn").click(
		     function() {
		         	  var num=0;
					    	$("#bar_culumn").find("li").each(function(){
					    			var f=$(this).find("input").is(":checked");
					    			if(f){
					    				$(this).find("input").removeAttr("checked");
					    				$(this).removeClass("block__list-row-selected");
					    				$(this).appendTo('#foo_culumn');
					    				num=num+1;
					    			}
					    	});
					    	if(num==0){	
					    		Horn.Tip.warn("请至少选中一条记录");
					    	}else{
					    		$(".block__titleabove input[name=allcheck]").removeAttr("checked");
					    	}  
					}
		 );
		 //删除全部
		  $("#delall_culumn").click(
		     function() {		    
				    	$("#bar_culumn").find("li").each(function(){
				    		    $(this).find("input").removeAttr("checked");
				    		    $(this).removeClass("block__list-row-selected");
								$(this).appendTo('#foo_culumn');
							});
				    	$(".block__titleabove input[name=allcheck]").removeAttr("checked");
		     }
		  );
		  /***********自定义显示列——可移动列单击特殊事件  结束******/
 });
  
/***********自定义条件  页面事件 开始******/
   //打开自定义条件界面 
    function  tjlow(){
        Horn.getCompById("tjzdWin").show(); 
        var url=Horn.getCompById("tjzd_url").getValue();
        $("#foo").html("");
        $("#bar").html("");
        $.post(url+"&&c_column_show=0", null, function(data) {
    		if (data.rows != null) {
    			var arr=data.rows;
    			var html="";
    			for(var i=0;i<arr.length;i++){
    				html=html+"<li><input type='checkbox' name='"+arr[i].vc_field_name+"'><span class='block__list_span'>"+arr[i].vc_field_caption+"</span></li>";
    			}
    			$("#foo").html(html);
    		}
    	});
        $.post(url+"&&c_column_show=1", null, function(data2) {
    		if (data2.rows != null) {
    			var arr=data2.rows;
    			var html="";
    			for(var i=0;i<arr.length;i++){
    				html=html+"<li><input type='checkbox' name='"+arr[i].vc_field_name+"'><span class='block__list_span'>"+arr[i].vc_field_caption+"</span></li>";
    			}
    			$("#bar").html(html); 
    		}
    	});
    }
  //关闭自定义条件界面 
    function  tjzdcloseWin(){
       Horn.getCompById("tjzdWin").hide(); 
    }
    //提交自定义条件修改 
    function  tjzdadd(queryform,roadurl){
    	var  idstring='';
	 	var  idstring2='';
    	$("#foo").find("li").each(function(){
    		var f=$(this).find("input").attr("name");
			if(f){
				if(idstring==''){
					idstring=idstring+f;
				}else{
					idstring=idstring+","+f;
				}
			}
		});
		$("#bar").find("li").each(function(){
			var f=$(this).find("input").attr("name");
			if(f){
				if(idstring2==''){
					idstring2=idstring2+f;
				}else{
						idstring2=idstring2+","+f;
				}
			}
		});
		var vc_kind_name=Horn.getCompById("vc_kind_nametjzd").getValue();
		var c_business_class="";
		if(Horn.getCompById("c_business_classtjzd").getValue()){
			c_business_class=Horn.getCompById("c_business_classtjzd").getValue();
		}else{
			c_business_class="";
		}
		/*
    	alert("隐藏属性vc_hide_column："+idstring);
    	alert("显示属性vc_show_column："+idstring2);
    	alert("vc_kind_name："+idstring2);
    	*/
		//查询条件输入框值保存
		//var queryvalue=Horn.getCompById(queryform).getValues();
			$.post("/am/am/business/financialinvest/operationzdl.json?vc_hide_column="+idstring+"&&vc_show_column="+idstring2+"&&vc_kind_name="+vc_kind_name+"&&c_business_class="+c_business_class, null, function(data) 
			{
				if (data == "ok") {
				  TDialog.Msg.alert("提示","操作成功",function(){
			             Horn.getCompById("tjzdWin").hide();			     
			             if(roadurl!=null&&roadurl!=''){
			            	 //window.location.href=roadurl;
			            	 $("#"+queryform).attr("action",roadurl);
			            	 startLoading();
			            	 $("#"+queryform).submit();
			            	
			             }else{
			            	 window.location.reload();
			             }  
			      }); 
				} else {
					//Horn.Tip.warn("操作失败");
					Horn.Tip.warn(data);
				}
			}, "text");
			
    }
    /***********自定义条件  页面事件  结束******/
    
 /***********自定义显示列  页面事件 开始******/  
  //打开自定义显示列界面 
    function  low(){
        Horn.getCompById("lzdWin").show(); 
        var url=Horn.getCompById("lzd_url").getValue();
        $("#foo_culumn").html("");
        $("#bar_culumn").html("");
        $.post(url+"&&c_column_show=0", null, function(data) {
    		if (data.rows != null) {
    			var arr=data.rows;
    			var html="";
    			for(var i=0;i<arr.length;i++){
    				html=html+"<li><input type='checkbox' name='"+arr[i].vc_field_name+"'><span class='block__list_span'>"+arr[i].vc_field_caption+"</span></li>";
    			}
    			$("#foo_culumn").html(html);
    		}
    	});
        $.post(url+"&&c_column_show=1", null, function(data2) {
    		if (data2.rows != null) {
    			var arr=data2.rows;
    			var html="";
    			for(var i=0;i<arr.length;i++){
    				html=html+"<li><input type='checkbox' name='"+arr[i].vc_field_name+"'><span class='block__list_span'>"+arr[i].vc_field_caption+"</span></li>";
    			}
    			$("#bar_culumn").html(html); 
    		}
    	});
    }
  //关闭自定义显示列界面 
    function  lzdcloseWin(){
       Horn.getCompById("lzdWin").hide(); 
    }
  //提交自定义显示列修改 
    function  lzdadd(queryform,roadurl){
    	var  idstring='';
	 	var  idstring2='';
	 	$("#foo_culumn").find("li").each(function(){
    		var f=$(this).find("input").attr("name");
			if(f){
				if(idstring==''){
					idstring=idstring+f;
				}else{
					idstring=idstring+","+f;
				}
			}
		});
		$("#bar_culumn").find("li").each(function(){
			var f=$(this).find("input").attr("name");
			if(f){
				if(idstring2==''){
					idstring2=idstring2+f;
				}else{
						idstring2=idstring2+","+f;
				}
			}
		});
		var vc_kind_name=Horn.getCompById("vc_kind_namelzd").getValue();
		var c_business_class="";
		if(Horn.getCompById("c_business_classlzd").getValue()){
			c_business_class=Horn.getCompById("c_business_classlzd").getValue();
		}else{
			c_business_class="";
		}
		
		var url="/am/am/business/financialinvest/operationzdl.json?vc_hide_column="+idstring+"&vc_show_column="+idstring2+"&vc_kind_name="+vc_kind_name+"&c_business_class="+c_business_class;
        /***合同类的进行合同子类区分**/
		if(vc_kind_name=="CONTRACT_GRID"){
        	var c_field_kind=Horn.getCompById("c_field_kindlzd").getValue();
        	url=url+"&c_field_kind="+c_field_kind;
        }
		   
    	/*
    	alert("隐藏属性vc_hide_column："+idstring);
    	alert("显示属性vc_show_column："+idstring2);
    	alert("vc_kind_name："+idstring2);
    	*/
		//查询条件输入框值保存
		//var queryvalue=Horn.getCompById(queryform).getValues();
			$.post(url, null, function(data) 
			{
				if (data == "ok") {
				  TDialog.Msg.alert("提示","操作成功",function(){
			             Horn.getCompById("lzdWin").hide();
			             if(roadurl!=null&&roadurl!=''){
			            	 //window.location.href=roadurl;
			            	 $("#"+queryform).attr("action",roadurl);
			            	 startLoading();
			            	 $("#"+queryform).submit();
			             }else{
			            	 window.location.reload();
			             }  
			      }); 
				} else {
					//Horn.Tip.warn("操作失败");
					Horn.Tip.warn(data);
				}
			}, "text");
			
    }