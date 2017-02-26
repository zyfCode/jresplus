$(function() {
	common_style.disable_style();
	dialog = common_operate.getDialog();
});

// 业务合同管理
var stockcodesex2 = {
	operationUrl : "/am/am/business/stockcodesex/operation.json",
	formQuery : function(tableId, formId) {
		Horn.getCompById(tableId).setBaseParams(
				Horn.getCompById(formId).getValues());
		Horn.getCompById(tableId).load('', {
			"pageNo" : 1
		});
	},
	dataTablerowClick : function(rowData){
		if(rowData.c_stock_status != "待确认"){
			Horn.getComp("dataTable").hideButton("ctbutton2", false);
			Horn.getComp("dataTable").hideButton("ctbutton3", false);
			Horn.getComp("dataTable").hideButton("ctbutton4", false);
			Horn.getComp("dataTable").hideButton("ctbutton5", false);
			Horn.getComp("dataTable").hideButton("ctbutton6", false);
			Horn.getComp("dataTable").hideButton("ctbutton7", false);
			Horn.getComp("dataTable").hideButton("ctbutton8", false);
			Horn.getComp("dataTable").hideButton("ctbutton9", false);
			Horn.getComp("dataTable").hideButton("ctbutton10", false);
		} else {
			Horn.getComp("dataTable").hideButton("ctbutton2", true);
			Horn.getComp("dataTable").hideButton("ctbutton3", true);
			Horn.getComp("dataTable").hideButton("ctbutton4", true);
			Horn.getComp("dataTable").hideButton("ctbutton5", true);
			Horn.getComp("dataTable").hideButton("ctbutton6", true);
			Horn.getComp("dataTable").hideButton("ctbutton7", true);
			Horn.getComp("dataTable").hideButton("ctbutton8", true);
			Horn.getComp("dataTable").hideButton("ctbutton9", true);
			Horn.getComp("dataTable").hideButton("ctbutton10", true);
		}
	},
	loadSuccess : function(){
		$("#data_dataTable").prepend("<ul class=\"tableoptli hor\"></ul>");
		var ul_show = $("#data_dataTable > ul");
		$("#body_dataTable > tr").each(function(){
			var $tr = $(this);
			$tr.find(".tableopt-btn").mouseover(function(){
				var top = $(this).position().top;
				var left = $(this).position().left;
				var ul_hide = $(this).find("ul").children("li");
				var _show_ul = ul_hide.clone(true);
				ul_show.children("li").remove();
				ul_show.css({"top":top + 30,"left":left + 10});
				ul_show.prepend(_show_ul);
				
				ul_show.show();
			});
			$tr.find(".tableopt-btn").mouseout(function(){
				ul_show.hide();
			});	
			
			ul_show.mouseover(function(){
				$(this).show();
			});
			
			ul_show.mouseout(function(){
				$(this).hide();
			});
		});
	},
	getButtonListHtml : function(data){
		var _html = "<div class=\"tableopt-btn\">操作" + "<ul class=\"tableopt-li\">";
		for(var i=0,j=targetButtonArr.length;i<j;i++){
			_html += "<li><a href=\"javascript:void(0)\" onclick=\"equity_investment.show_equity('" 
				+ targetButtonArr[i].buttonId + "','" + data.rowidx +"')\">" +targetButtonArr[i].buttonName + "</a></li>";
		}
		_html += "</ul></div>";
		stockcodesex2.button_html = _html;
	},	
	//操作按钮绑定事件
	showOperates : function(data){
		
		if(!stockcodesex2.button_html) {
			stockcodesex2.getButtonListHtml(data);
		}
		return stockcodesex2.button_html;
	},
	//给查看绑定的字段加上超链接
	showView : function(data){
		return "<a class='stock_view' href='javascript:void(0);' onclick='stockcodesex2.viewDetail(\""+data.val+"\")'>"+data.val+"</a>";
	},//查看
	viewDetail : function(params){ 	
		var show_type=Horn.getCompById("show_type").getValue(),
			tabid = constants.stockcode.menu_id[show_type],
			titbefore = constants.stockcode.preTitle[show_type],
			url = constants.stockcode.seller_url[show_type] + "?vc_stock_code=" + params;
//		if(show_type=="I"){
//		var url = "/am/am/business/interest/view.htm?vc_stock_code=" + params;
		//处理弹开界面已打开问题
//		var titbefore="物权投资-";
		var iframelength=$("iframe[tabid=" + tabid + "]", parent.parent.document).length;
		if(iframelength!=0){
			TDialog.Msg.warning("提示","明细信息界面已打开,请先关闭!",function(){//ok 
				window.parent.parent.Horn.Frame.openMenu(tabid, url, titbefore + "-明细信息", 'inbox');
			}); 
		}else{
			window.parent.parent.Horn.Frame.openMenu(tabid, url, titbefore+"-明细信息", 'inbox');
		}
			
//		}
//		else if(show_type=="5"){
//			var url = "/am/am/business/stockcodesex/view.htm?vc_stock_code=" + params;
//			//处理弹开界面已打开问题
//			var titbefore="股权投资-";
//			var iframelength=$('iframe[tabid=402015]', parent.parent.document).length;
//			if(iframelength!=0){
//				TDialog.Msg.error("提示","明细信息界面已打开,请先关闭!",function(){//ok 
//					window.parent.parent.Horn.Frame.openMenu('402015', url, titbefore+"明细信息", 'inbox');
//				}); 
//			}else{
//				window.parent.parent.Horn.Frame.openMenu('402015', url, titbefore+"明细信息", 'inbox');
//			}
//			
//		}else if(show_type=="D"){
//			var url = "/am/am/business/credit/view.htm?vc_stock_code=" + params;
//			//处理弹开界面已打开问题
//			var titbefore="债权投资-";
//			var iframelength=$('iframe[tabid=405015]', parent.parent.document).length;
//			if(iframelength!=0){
//				TDialog.Msg.error("提示","明细信息界面已打开,请先关闭!",function(){//ok 
//					window.parent.parent.Horn.Frame.openMenu('405015', url, titbefore+"明细信息", 'inbox');
//				}); 
//			}else{
//				window.parent.parent.Horn.Frame.openMenu('405015', url, titbefore+"明细信息", 'inbox');
//			}
//			
//		}else if(show_type=="4"){
//			var url = "/am/am/business/deposit/view.htm?vc_stock_code=" + params;
//			//处理弹开界面已打开问题
//			var titbefore="存款-";
//			var iframelength=$('iframe[tabid=406015]', parent.parent.document).length;
//			if(iframelength!=0){
//				TDialog.Msg.error("提示","明细信息界面已打开,请先关闭!",function(){//ok 
//					window.parent.parent.Horn.Frame.openMenu('406015', url, titbefore+"明细信息", 'inbox');
//				}); 
//			}else{
//				window.parent.parent.Horn.Frame.openMenu('406015', url, titbefore+"明细信息", 'inbox');
//			}
//			
//		}
		    
	},
	// 股权弹出新增窗口
	showTabWin : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="股权投资-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/stockcodesex/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('2012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/stockcodesex/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('2013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/stockcodesex/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('2014', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=402016]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('2016', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('2016', url, title, 'inbox');
							}
			        							
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 物权弹出新增窗口
	showTabWin2 : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="物权投资-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/interest/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('4012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/interest/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('4013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/interest/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('4014', url, title, 'inbox');
						}else if (type == 4) {	
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=4016]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('4016', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('4016', url, title, 'inbox');
							}
			        							
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 债权弹出新增窗口
	showTabWin3 : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="债权投资-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/credit/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('5012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/credit/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('5013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/credit/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('5014', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=5016]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('5016', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('5016', url, title, 'inbox');
							} 
			        							
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 存款弹出新增窗口
	showTabWin4 : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('2012');
	            	var titbefore="存款-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/deposit/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('6012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/deposit/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('6013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/deposit/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('6014', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=6016]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('6016', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('6016', url, title, 'inbox');
							}
					
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 金融产品弹出新增窗口
	showTabWin5 : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('2013');
	            	var titbefore="金融产品投资-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/financialinvest/add.htm";
	        		if (type == 1) {
	        			var c_invest_kind=Horn.getCompById("c_invest_kind_query").getValue();
	        			window.parent.parent.Horn.Frame.openMenu('3012', url+"?c_invest_kind="+c_invest_kind, title, 'inbox');
	        		}else{
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

	        			if (type == 2) {
	        				title = titbefore+"变更";
	        				url = "/am/am/sellerbusiness/financialinvest/edit.htm?vc_stock_code="
	        						+ grid[0].vc_stock_code + "&vc_product_id="
	        						+ grid[0].vc_product_id;
	        				window.parent.parent.Horn.Frame.openMenu('3013', url, title, 'inbox');
	        			} else if (type == 3) {
	        				title = titbefore+"撤销";
	        				url = "/am/am/sellerbusiness/financialinvest/revoke.htm?vc_stock_code="
	        						+ grid[0].vc_stock_code + "&vc_product_id="
	        						+ grid[0].vc_product_id;
	        				window.parent.parent.Horn.Frame.openMenu('3014', url, title, 'inbox');
	        			}else if (type == 4) {
							        title = titbefore+"还款计划";
        							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
        									+ grid[0].vc_stock_code+"&&l_rate_id=1";
        							//处理弹开界面已打开问题
        							var iframelength=$('iframe[tabid=3016]', parent.parent.document).length;
        							if(iframelength!=0){
        								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
        									window.parent.parent.Horn.Frame.openMenu('3016', url, title, 'inbox');
        								}); 
        							}else{
        								window.parent.parent.Horn.Frame.openMenu('3016', url, title, 'inbox');
        							}
						}

	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 股权收益权新增窗口
	showTabWin_6 : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('2012');
	            	var titbefore="股权收益权-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/stockrevenue/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('7012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/stockrevenue/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('7013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/stockrevenue/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('7014', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=7015]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('7015', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('7015', url, title, 'inbox');
							}
					
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 信用证福费廷增窗口
	showTabWin_H : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('2012');
	            	var titbefore="信用证/福费廷-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/letterofcredit/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('8012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/letterofcredit/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('8013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/letterofcredit/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('8014', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=8015]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('8015', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('8015', url, title, 'inbox');
							}
					
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 其他收益权弹出新增窗口
	showTabWin_7 : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="其他收益权-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/otherProfileRight/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('7901', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/otherProfileRight/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('7902', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/otherProfileRight/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('7903', url, title, 'inbox');
						}else if (type == 4) {	
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=7904]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('7904', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('7904', url, title, 'inbox');
							}
			        							
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	// 委托贷款弹出新增窗口
	showTabWin_c : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="委托贷款-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/entrustedloan/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('9012', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/entrustedloan/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('9013', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/entrustedloan/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('9014', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=9015]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('9015', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('9015', url, title, 'inbox');
							}
					
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	//信贷资产弹出新增窗口
	showTabWin_xdzc : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="信贷资产-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/creditasset/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('9112', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/creditasset/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('9113', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/creditasset/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('9114', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=9115]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('9115', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('9115', url, title, 'inbox');
							}
					
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	//票据资产弹出新增窗口
	showTabWin_pjzc : function(type) {
		//先判断是否初始化
		$.post("/am/am/init/list.json", null, function(data) {
			if (data!=null) {					
	            if(data.l_operate_flag==0){	        		
		            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
						});	       
	            }else{
	            	//window.parent.Horn.Frame.screen.close('402012');
	            	var titbefore="票据资产-";
	        		var title = titbefore+"新增";
	        		var url = "/am/am/sellerbusiness/noteasset/add.htm";
	        		if (type == 1) {
	        			window.parent.parent.Horn.Frame.openMenu('406188', url, title, 'inbox');
	        		} else {
	        			var grid = common_operate.checkSelectedLength();
	        			if (!grid) {
	        				return grid;
	        			}

						if (type == 2) {
							title = titbefore+"变更";
							url = "/am/am/sellerbusiness/noteasset/edit.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('406188', url, title, 'inbox');
						} else if (type == 3) {
							title = titbefore+"撤销";
							url = "/am/am/sellerbusiness/noteasset/revoke.htm?vc_stock_code="
									+ grid[0].vc_stock_code + "&vc_product_id="
									+ grid[0].vc_product_id;
							window.parent.parent.Horn.Frame.openMenu('406188', url, title, 'inbox');
						}else if (type == 4) {
							title = titbefore+"还款计划";
							url = "/am/am/sellerbusiness/stockcodesex/repayplanlist.htm?vc_stock_code="
									+ grid[0].vc_stock_code+"&&l_rate_id=1";
							//处理弹开界面已打开问题
							var iframelength=$('iframe[tabid=406184]', parent.parent.document).length;
							if(iframelength!=0){
								TDialog.Msg.error("提示","还款计划操作界面已打开,请先完成操作!",function(){//ok 
									window.parent.parent.Horn.Frame.openMenu('406188', url, title, 'inbox');
								}); 
							}else{
								window.parent.parent.Horn.Frame.openMenu('406188', url, title, 'inbox');
							}
					
						}
	        		}
	        		
	            } 
			}
       }, "json");
	},
	/**
	 * 新增
	 * @param urlType:用以区分不同业务请求
	 */
	doAdd : function(urlType,committype) {
		var form = Horn.getComp("addForm");
		var url = "/am/am/sellerbusiness/stockcodesex/" + urlType +"doAdd/operation.json?l_function_no="
				+ functionIds.stockcodesex.add + "&workflow_step="
				+ workflowStep.launch + "&business_type=htxz&c_business_class=2";
		if (form.isValid()) {
			TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				var submitParams = form.getValues();
				query_operate.doPost(url, submitParams, function(result) {
					common_operate.endProgress();
					//股权和物权不加下一步利率维护（若后续要加开关配置可以在这个判断条件里加）
					if(urlType=="gqtz"||urlType=="wqtz"){
						//合同新增成功
						//分割错误信息用于获取返回的合同代码
						var s=result.split('|');
						if(s[0]=="OK"){
							TDialog.Msg.alert("提示", "操作成功！", function() {
								//直接关闭当前页面，刷新grid
								if(committype!=null&&committype!=''){
									common_operate.refreshUrl(committype);
								}else{
									common_operate.refreshUrl("ht");
								}
								window.parent.parent.Horn.Frame.screen.closeCurrent();
							});
						}else{
							TDialog.Msg.warning("提示",result + "!");
						}	
					}else{
						if (result == "ok") {
							TDialog.Msg.alert("提示", "操作成功！", function() {
								//直接关闭当前页面，刷新grid
								if(committype!=null&&committype!=''){
									common_operate.refreshUrl(committype);
								}else{
									common_operate.refreshUrl("ht");
								}
								window.parent.parent.Horn.Frame.screen.closeCurrent();
							});
						} else {
							//合同新增成功
							//分割错误信息用于获取返回的合同代码
							var s=result.split('|');
							if(s[0]=="OK"){
								Horn.getCompById("vc_stock_code").setValue(s[1]);
								submitParams = form.getValues();
								var nextmessage="利率新增";
								//金融产品为权益类的不需要添加利率
								if(urlType=="jctz"){
									var _url = "/am/am/business/investproduct/queryInvestProduct.json";
									var _data = "vc_stock_code=" + s[1];
									query_operate.doPost(_url, _data, function(result){
										var flag=false;
										if(result &&result.query&&result.query.c_profit_type){
											if(result.query.c_profit_type == "2"){
												flag=true;
										   }
										}
										if(flag){
											TDialog.Msg.alert("提示", "操作成功！", function() {
												//直接关闭当前页面，刷新grid
												if(committype!=null&&committype!=''){
													common_operate.refreshUrl(committype);
												}else{
													common_operate.refreshUrl("ht");
												}
												window.parent.parent.Horn.Frame.screen.closeCurrent();
											});
										}else{
											TDialog.Msg.confirmyorn("提示", "操作成功！投资明细代码为:"+s[1]+",是否继续下一步"+nextmessage+"？", function() {
												var u_div="#addli";
										       	   $("div[showdiv='true']").attr("class","me");
										       	   $("div[showdiv='true']").attr("showdiv","false");
										       	   $(u_div).attr("class","sh");
										       	   $(u_div).attr("showdiv","true");
										       	Horn.getCompById("rateTable").setBaseParams(submitParams);
								        		Horn.getCompById("rateTable").load();			        		
											}, function() {
												//直接关闭当前页面，刷新grid
												if(committype!=null&&committype!=''){
													common_operate.refreshUrl(committype);
												}else{
													common_operate.refreshUrl("ht");
												}
											    window.parent.parent.Horn.Frame.screen.closeCurrent();
											});
										}
									}, ajaxDataType.JSON);
								}else{
									TDialog.Msg.confirmyorn("提示", "操作成功！投资明细代码为:"+s[1]+",是否继续下一步"+nextmessage+"？", function() {
										var u_div="#addli";
								       	   $("div[showdiv='true']").attr("class","me");
								       	   $("div[showdiv='true']").attr("showdiv","false");
								       	   $(u_div).attr("class","sh");
								       	   $(u_div).attr("showdiv","true");
								       	Horn.getCompById("rateTable").setBaseParams(submitParams);
						        		Horn.getCompById("rateTable").load();			        		
									}, function() {
										//直接关闭当前页面，刷新grid
										if(committype!=null&&committype!=''){
											common_operate.refreshUrl(committype);
										}else{
											common_operate.refreshUrl("ht");
										}
									    window.parent.parent.Horn.Frame.screen.closeCurrent();
									});
								}
							}else{
								TDialog.Msg.warning("提示",result + "!");
							}	
						}
					}

				});
			}, function() {
			});
		}
	},
	// 查询对手方
	query_l_rival_obj : function(element) {
		var value = Horn.getCompById(element).getValue();
		var url = "/am/am/business/loanrival/getLrival.json";
		var data = "vc_input_name1=l_rival_id&" + "vc_input_value1=" + value
				+ "&vc_input_table=loanrival" + "&vc_output_name1=l_rival_id"
				+ "&vc_output_name2=vc_name";
		query_operate.doPost(url, data, function(result) {
			if (result && result.query) {
				var obj = {};
				obj.label = result.query.l_rival_id;
				obj.value = result.query.vc_all_name;
				Horn.getCompById(element).addItems([ obj ], true);
				Horn.getCompById(element).selectFirst();
				// Horn.getCompById(element).addItems(result, true);
			} else {
				// Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},
	
	// 查询付款帐户
	query_l_account_id : function(grid, id) {
		var url = "/am/am/business/stockcodesex/queryAccount.json";
		var data = "vc_input_name1=vc_product_id&vc_input_value1="
				+ grid[0].vc_product_id + "&vc_input_table=bankaccountinfo"
				+ "&vc_output_name1=l_serial_no"
				+ "&vc_output_name2=vc_bank_name"
				+ "&vc_output_name3=vc_user_name"
				+ "&vc_output_name4=vc_bank_account";
		query_operate.doPost(url, data, function(result) {
			if (result) {
				Horn.getCompById(id).addItems(result, true);
				Horn.getCompById(id).selectFirst();
			} else {
				Horn.Tip.warn("操作失败！");
			}
		}, ajaxDataType.JSON);
	},
	// 股权类-提交
	equity_Add : function(type) {
		var form = Horn.getComp(type + "Form");
		var url = "/am/am/sellerbusiness/stockcodesex/operation_quity.json?l_function_no="
				+ functionIds.stockcodesex[type];
		if (form.isValid()) {
			dialog.dialog("open");
			var values = form.getValues();
			query_operate.doPost(url, values, function(result) {
				common_operate.endProgress();
				if (result == "ok") {
					Horn.getComp(type + "Win").hide();
					Horn.Tip.success("操作成功！");
				} 
				else {
					Horn.Tip.warn(result + "!");
				}
			});
		}
	},
	// 根据产品代码查询合同相关信息
	cpdmChange : function(type,bussintype) {
		        if (type == 1) {
					type = "";
				} else if (type == 2) {
					type = "_edit";
					Horn.getComp("vc_product_id").setReadonly(true);
				}
				var vc_product_id = Horn.getCompById("vc_product_id" + type).getValue();
				var url = "/am/am/business/stockcodesex/query_cp_detail.json";
				var data = "l_function_no=" + functionIds.stockcodesex.query_cp_detail
						+ "&vc_product_id=" + vc_product_id;
				query_operate.doPost(url, data, function(result) {
					if (result && result.product) {
						Horn.getComp("vc_branch_caption").setValue(result.product.vc_branch_name);
						Horn.getComp("l_product_begin_date").setValue(result.product.l_begin_date);
						Horn.getComp("l_product_end_date").setValue(result.product.l_end_date);
					} else {
						Horn.getComp("vc_branch_caption").clearValue();
						Horn.getComp("l_product_begin_date").clearValue();
						Horn.getComp("l_product_end_date").clearValue();
					}
				}, ajaxDataType.JSON);
				if(bussintype==1){
					common_operate.queryCollecterals("vc_collateral_no" + type, type);
				}	
	},//查询产品代码  项目代码
	//签约日期等于开始日期
	qydate : function(){
		var en_contract_rate = Horn.getCompById("l_effective_date").getValue();
		Horn.getComp("l_begin_date").setValue(en_contract_rate);
	},
	queryCpdm : function(type){
	        Horn.getCompById("vc_branch_caption" + type).clearValue();
			Horn.getCompById("l_product_begin_date" + type).clearValue();
			Horn.getCompById("l_product_end_date" + type).clearValue();
	        var oldvc_product_id=Horn.getCompById("vc_product_id" + type).getValue();
			var url = "/am/am/business/stockcodesex/queryCpdm.json?l_function_no=" + functionIds.stockcodesex.query_cpdm_q;
			//用来区分查询新增合同还是其他的查询
			if(type==""){
				url =url+"&&l_busin_flag=22216";
			}else{
				url=url+"&&l_busin_flag=22204";
			}
			query_operate.ajax(url, "", function(result) {
				if (result) {
					Horn.getCompById("vc_product_id" + type).addItems(result,true);
					if(type!=1){
						Horn.getCompById("vc_product_id" + type).setValue("");
						Horn.getCompById("vc_product_id" + type).setValue(oldvc_product_id,true);
					}
				} else {
					//Horn.Tip.warn("操作失败！");
				}
			}, ajaxDataType.JSON);
		
	},
	// 股权投资合同初始化
	updateInit : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		stockcodesex2.gqxzChange();
		//stockcodesex2.tzxzChange();		
		if (type == "_edit") {
			stockcodesex2.sclb(2);
			common_operate.geteditlist("l_invested_enterprise"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			stockcodesex2.contract_typeChange(2);
			Horn.getComp("vc_product_id").setReadonly(true);
//			common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} else {
			stockcodesex2.sclb(1);
			stockcodesex2.queryCpdm(type);
		}

	},
	// 物权投资合同初始化
	updateInit2 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
//			common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} else {
			stockcodesex2.queryCpdm(type);
		}

	},
	// 债权投资合同初始化
	updateInit3 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.contract_typeChange(2);
//			common_operate.queryCollecterals("vc_collateral_no" + type, type);
		} else {
			stockcodesex2.queryCpdm(type);
		}

	},
	// 存款合同初始化
	updateInit4 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			//common_operate.queryCollecterals("vc_collateral_no" + type, type);
			stockcodesex2.ck_typeChange(2);
			stockcodesex2.ck_iounoauto(2);
		} else {
			stockcodesex2.queryCpdm(type);
			stockcodesex2.ck_typeChange(1);
			stockcodesex2.ck_iounoauto(1);
		}

	},
	// 金融产品新增初始化
	updateInit5 : function(type) {
		//common_operate.queryStockcodes("#vc_relative_code" + type+ " > input[name=vc_relative_code]");
		common_stockcodesex.checkCpdmDiv();

		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		/****理财计划隐藏投向行业****/
		var c_invest_kind_deal=Horn.getCompById("c_invest_kind" + type).getValue();
		if(c_invest_kind_deal=="5"){
    		//银行理财计划
    		Horn.getCompById("c_invest_industry" + type).hide();
    		Horn.getCompById("c_invest_industry" + type).setDisabled(true);
    		stockcodesex2.deposittermshow(type,1);
//    		//投资期限联动
//    		if(type == "_edit"){
//    			stockcodesex2.deposittermChange(2);
//    		}
    	}else{
    		stockcodesex2.deposittermshow(type,0);
    	}
    	
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			stockcodesex2.changefinancialinvest(2);
			stockcodesex2.contract_typeChange(2);
		} else {
			stockcodesex2.queryCpdm(type);
			stockcodesex2.changefinancialinvest(1);
			
		}

	},
	// 委托贷款合同初始化
	updateInit_c : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			//common_operate.queryCollecterals("vc_collateral_no" + type, type);
//			stockcodesex2.ck_typeChange(2);
//			stockcodesex2.ck_iounoauto(2);
		} else {
			stockcodesex2.queryCpdm(type);
//			stockcodesex2.ck_typeChange(1);
//			stockcodesex2.ck_iounoauto(1);
		}

	},
	//信贷资产合同初始化
	updateInit_xdzc : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			//common_operate.queryCollecterals("vc_collateral_no" + type, type);
//			stockcodesex2.ck_typeChange(2);
//			stockcodesex2.ck_iounoauto(2);
		} else {
			stockcodesex2.queryCpdm(type);
//			stockcodesex2.ck_typeChange(1);
//			stockcodesex2.ck_iounoauto(1);
		}

	},
	//票据资产合同初始化
	updateInit_pjzc : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,"en_contract_balance"+ type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id"+ type,"loanrival","1000185");
			//common_operate.geteditlist("l_org_cust_id"+ type,"loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance"+ type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			Horn.getComp("vc_product_id").setReadonly(true);
			//common_operate.queryCollecterals("vc_collateral_no" + type, type);
//			stockcodesex2.ck_typeChange(2);
//			stockcodesex2.ck_iounoauto(2);
		} else {
			stockcodesex2.queryCpdm(type);
//			stockcodesex2.ck_typeChange(1);
//			stockcodesex2.ck_iounoauto(1);
		}

	},
	// 股权收益权合同初始化
	updateInit6 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,
				"en_contract_balance" + type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id" + type, "loanrival","1000185");
			common_operate.geteditlist("l_original_rival_id" + type,"loanrival", "1000185");
			//common_operate.geteditlist("l_org_cust_id" + type, "loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance" + type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			stockcodesex2.contract_typeChange(2);
			Horn.getComp("vc_product_id").setReadonly(true);
			// common_operate.queryCollecterals("vc_collateral_no" + type,
			// type);
		} else {
			stockcodesex2.queryCpdm(type);
		}

	},
	// 信用证/福费廷合同初始化
	updateInit_H : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,
				"en_contract_balance" + type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id" + type, "loanrival","1000185");
			common_operate.geteditlist("l_service_id" + type, "loanrival","1000185");
			//common_operate.geteditlist("l_original_rival_id" + type,"loanrival", "1000185");
			//common_operate.geteditlist("l_org_cust_id" + type, "loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance" + type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			stockcodesex2.contract_typeChange(2);
			Horn.getComp("vc_product_id").setReadonly(true);
			// common_operate.queryCollecterals("vc_collateral_no" + type,
			// type);
		} else {
			stockcodesex2.queryCpdm(type);
		}

	},
	// 其他收益权合同初始化
	updateInit_7 : function(type) {
		common_stockcodesex.checkCpdmDiv();
		common_operate.dealCapital("en_contract_balance_x" + type,
				"en_contract_balance" + type);
		if (type == "_edit") {
			common_operate.geteditlist("l_rival_id" + type, "loanrival","1000185");
			common_operate.geteditlist("l_original_rival_id" + type,"loanrival", "1000185");
			//common_operate.geteditlist("l_org_cust_id" + type, "loanrival","1000185");
			Horn.getCompById("en_contract_balance_x" + type).setValue($("#en_contract_balance" + type + " > .u-typefield-capital").text());
			stockcodesex2.queryCpdm(type);
			stockcodesex2.contract_typeChange(2);
			Horn.getComp("vc_product_id").setReadonly(true);
			// common_operate.queryCollecterals("vc_collateral_no" + type,
			// type);
		} else {
			stockcodesex2.queryCpdm(type);
		}

	},

	
	// 变更
	doEdit : function(type, urlType) {
		var form = Horn.getComp("editForm");
		// 页面刷新映射
		var committype = "";
		if (urlType == "wqtz") {
			committype = "seller_wq";
		} else if (urlType == "zqtz") {
			committype = "seller_zq";
		} else if (urlType == "jrcp") {
			committype = "seller_jrcp";
		} else if (urlType == "ck") {
			committype = "seller_ck";
		}	else if (urlType == "gqsyq") {
			committype = "seller_gqsyq";
		}	else if (urlType == "xyz") {
			committype = "seller_xyz";
		}else if(urlType == "qtsyq"){
			committype = "seller_qtsyq";
		}else if(urlType == "gqtz"){
			committype = "seller_ht";
		}else if(urlType == "wtdk"){
			committype = "seller_wtdk";
		}else if(urlType == "xdzc"){
			committype = "seller_xdzc";
		}else if(urlType == "pjzc"){
			committype = "seller_pjzc";
		}else{
			committype = urlType;
		}
		var url = "/am/am/sellerbusiness/stockcodesex/" + type + urlType + "/operation.json?l_function_no="
				+ functionIds.stockcodesex.dictate + "&workflow_step="
				+ workflowStep.launch + "&business_type=" + type;

		if (form.isValid()) {		
			TDialog.Msg.confirmyorn("确认", "请您确认是否提交？", function() {
				dialog.dialog("open");
				var submitParams = form.getValues();
				query_operate.doPost(url, submitParams, function(result) {
					common_operate.endProgress();
					if (result == "ok") {
						TDialog.Msg.alert("提示", "操作成功！", function() {
							//直接关闭当前页面，刷新grid
							if(committype!=null&&committype!=''){
								common_operate.refreshUrl(committype);
							}else{
								common_operate.refreshUrl("ht");
							}
							window.parent.parent.Horn.Frame.screen.closeCurrent();
						});
					} else {
						TDialog.Msg.warning("提示",result);
					}
				});
			}, function() {
			});
		}
	},
	selectTab : function() {

	},
	// 弹出编辑窗口:到后台查询一条数据，塞入form
//	showEditWinByQuery : function(fcode, gridId, url, textfieldId) {
//		Horn.getComp(textfieldId).setReadonly(true);
//		var grid = Horn.getComp(gridId).getSelecteds();
//		var checkedLength = grid.length;
//		if (checkedLength !== 1) {
//			Horn.Tip.warn("请选择一条记录！");
//			return;
//		}
//
//		url = url + "?l_function_no=" + functionIds[fcode]["view"]
//				+ "&vc_op_code=" + grid[0].vc_op_code
//				+ "&vc_organization_code=1001";
//		$.post(url, "", function(data) {
//			if (data && data.operate) {
//				Horn.getComp("editForm").setValues(data.operate);
//				Horn.getComp("editWin").show();
//			} else {
//				Horn.Tip.warn("编辑失败！");
//			}
//		}, "json");
//	},
	// 利率种类下拉框监听事件
	lvzl : function() {
		var value = Horn.getCompById("c_rate_type_lvbg").getValue();
		// 固定
		if (value == "0") {
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>年利率%");
			Horn.getCompById("c_currency_kind_lvbg").hide();
			Horn.getCompById("c_base_kind_lvbg").hide();
			Horn.getCompById("c_float_kind_lvbg").hide();
			Horn.getCompById("c_change_kind_lvbg").hide();
			Horn.getCompById("c_calc_kind_lvbg").hide();
			Horn.getCompById("en_high_rate_lvbg").hide();
			Horn.getCompById("en_low_rate_lvbg").hide();
			Horn.getCompById("vc_sections_lvbg").hide();
			Horn.getCompById("en_rate2_lvbg").hide();
			Horn.getCompById("en_rate_lvbg").show();

			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_base_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_float_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_change_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_calc_kind_lvbg").setDisabled(true);
			Horn.getCompById("en_high_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_low_rate_lvbg").setDisabled(true);
			Horn.getCompById("vc_sections_lvbg").setDisabled(true);
			Horn.getCompById("en_rate2_lvbg").setDisabled(true);
			Horn.getCompById("en_rate_lvbg").setDisabled(false);
		} else if (value == "1") {// 按基准利率浮动
			Horn.getCompById("c_currency_kind_lvbg").show();
			Horn.getCompById("c_base_kind_lvbg").show();
			Horn.getCompById("c_float_kind_lvbg").show();
			Horn.getCompById("c_change_kind_lvbg").show();
			Horn.getCompById("c_calc_kind_lvbg").show();
			Horn.getCompById("en_high_rate_lvbg").show();
			Horn.getCompById("en_low_rate_lvbg").show();
			Horn.getCompById("en_rate_lvbg").hide();
			Horn.getCompById("vc_sections_lvbg").hide();

			Horn.getCompById("c_currency_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_base_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_float_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_change_kind_lvbg").setDisabled(false);
			Horn.getCompById("c_calc_kind_lvbg").setDisabled(false);
			Horn.getCompById("en_high_rate_lvbg").setDisabled(false);
			Horn.getCompById("en_low_rate_lvbg").setDisabled(false);
			Horn.getCompById("en_rate_lvbg").setDisabled(true);
			Horn.getCompById("vc_sections_lvbg").setDisabled(true);
		} else {// 按日期区间浮动
			Horn.getCompById("c_currency_kind_lvbg").hide();
			Horn.getCompById("c_base_kind_lvbg").hide();
			Horn.getCompById("c_float_kind_lvbg").hide();
			Horn.getCompById("c_change_kind_lvbg").hide();
			Horn.getCompById("c_calc_kind_lvbg").hide();
			Horn.getCompById("en_high_rate_lvbg").hide();
			Horn.getCompById("en_low_rate_lvbg").hide();
			Horn.getCompById("en_rate_lvbg").hide();
			Horn.getCompById("en_rate2_lvbg").hide();
			Horn.getCompById("vc_sections_lvbg").show();

			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_base_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_float_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_change_kind_lvbg").setDisabled(true);
			Horn.getCompById("c_calc_kind_lvbg").setDisabled(true);
			Horn.getCompById("en_high_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_low_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_rate_lvbg").setDisabled(true);
			Horn.getCompById("en_rate2_lvbg").setDisabled(true);
			Horn.getCompById("vc_sections_lvbg").setDisabled(false);
		}
		stockcodesex2.fdsf();
	},// 计算类别下拉框监听事件
	lvlb : function() {
		var value = Horn.getCompById("c_rate_kind_lvbg").getValue();
		if (value == 1) {// 利率/溢价回购率
			//Horn.getCompById("c_settle_kind_lvbg").show();
			Horn.getCompById("en_pay_inteval_lvbg").show();
			Horn.getCompById("l_first_pay_date_lvbg").show();
			Horn.getCompById("l_rate_begin_date_lvbg").show();

			//Horn.getCompById("c_settle_kind_lvbg").setDisabled(false);
			Horn.getCompById("en_pay_inteval_lvbg").setDisabled(false);
			Horn.getCompById("l_first_pay_date_lvbg").setDisabled(false);
			Horn.getCompById("l_rate_begin_date_lvbg").setDisabled(false);
		} else {
			//Horn.getCompById("c_settle_kind_lvbg").hide();
			Horn.getCompById("en_pay_inteval_lvbg").hide();
			Horn.getCompById("l_first_pay_date_lvbg").hide();
			Horn.getCompById("l_rate_begin_date_lvbg").hide();
			
			//除了溢价回购率以外，其余默认结算周期都为"0"
			Horn.getCompById("en_pay_inteval_lvbg").setValue("");
			//Horn.getCompById("c_settle_kind_lvbg").setDisabled(true);
			Horn.getCompById("l_first_pay_date_lvbg").setDisabled(true);
			Horn.getCompById("l_rate_begin_date_lvbg").setDisabled(true);
		}
	},
	// 根据结算周期，计算首次结算日
	jszq : function(){
		var en_pay_inteval = Horn.getCompById("en_pay_inteval_lvbg").getValue();		
		var l_begin_date = Horn.getCompById("l_rate_begin_date_lvbg").getValue();
	
		if(!l_begin_date){
			return;
		}
		if(!en_pay_inteval){
			Horn.getCompById("l_first_pay_date_lvbg").clearValue();
        }else if(en_pay_inteval=='0'){
        	Horn.getCompById("l_first_pay_date_lvbg").setValue(l_begin_date);
        }else{
        	l_begin_date = l_begin_date.substring(0,4) + "/" + l_begin_date.substring(4,6) + "/" + l_begin_date.substring(6,8);
            var date_begin=new Date(l_begin_date);
            if(parseInt(l_begin_date.substring(8,10)) < 20){
            	en_pay_inteval = en_pay_inteval - 1;
            }
            date_begin.setMonth(date_begin.getMonth() + parseInt(en_pay_inteval));
            Horn.getCompById("l_first_pay_date_lvbg").setValue(FormatDate(date_begin,"yyyyMMdd"));
        }
	},
	// 计算公式下拉框监听事件
	jsgs : function() {
		var value = Horn.getCompById("c_calc_formula_lvbg").getValue();
		if (value == "0") {// 存续天数
			Horn.getCompById("c_calc_cycle_lvbg").show();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(false);

			Horn.getCompById("vc_calc_formula_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
		} else if (value == "1") {
			Horn.getCompById("c_calc_cycle_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);

			Horn.getCompById("vc_calc_formula_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);
		} else if (value == "2") {// 自定义公式
			Horn.getCompById("c_calc_cycle_lvbg").hide();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(true);

			Horn.getCompById("vc_calc_formula_lvbg").show();
			Horn.getCompById("c_currency_kind_lvbg").setDisabled(false);
		}
	},// 调整方式下拉框监听事件
	tzfs : function() {
		var value = Horn.getCompById("c_change_kind_lvbg").getValue();
		if (value == "3") {
			Horn.getCompById("c_deal_flag_lvbg").show();
			Horn.getCompById("c_deal_flag_lvbg").setDisabled(false);
			Horn.getCompById("l_change_date_lvbg").show();
			Horn.getCompById("l_change_date_lvbg").setDisabled(false);
		} else {
			Horn.getCompById("c_deal_flag_lvbg").hide();
			Horn.getCompById("c_deal_flag_lvbg").setDisabled(true);
			Horn.getCompById("l_change_date_lvbg").hide();
			Horn.getCompById("l_change_date_lvbg").setDisabled(true);
		}
	},// 浮动算法下拉框监听事件
	fdsf : function() {
		var value = Horn.getCompById("c_calc_kind_lvbg").getValue();
		var c_rate_type = Horn.getCompById("c_rate_type_lvbg").getValue();
		if (c_rate_type != "1") {
			return;
		}
		if (value == "1") {
			// if (c_rate_type == "1") {
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>等差浮动%");
			// }
			Horn.getCompById("en_rate_lvbg").show();
			Horn.getCompById("en_rate_lvbg").setDisabled(false);

			Horn.getCompById("en_rate2_lvbg").hide();
			Horn.getCompById("en_rate2_lvbg").setDisabled(true);
		} else if (value == "2") {
			Horn.getCompById("en_rate2_lvbg").show();
			Horn.getCompById("en_rate2_lvbg").setDisabled(false);

			Horn.getCompById("en_rate_lvbg").hide();
			Horn.getCompById("en_rate_lvbg").setDisabled(true);
		} else if (value == "4") {
			// if (c_rate_type == "1") {
			$("span[ref=en_rate" + "]").html("<b class=\"hc_red\">*</b>等差浮动%");
			// }
			Horn.getCompById("en_rate_lvbg").show();
			Horn.getCompById("en_rate_lvbg").setDisabled(false);
			Horn.getCompById("en_rate2_lvbg").show();
			Horn.getCompById("en_rate2_lvbg").setDisabled(false);
		}
	},
	
	// 获取所有的利率类别
	getListData : function(type) {
		var arr1;
		//用于存款利率判断
		if(type=="4"){
			arr1 = [{"key":1}];
		}else{
			arr1 = Horn.getCompById("c_rate_kind_lvbg").getListData().data;
		}
		var u=0;
		var arr2 = [];
		// var arr3 = [];
		$("#body_rateTable > tr").each(function() {
			var $tr = $(this);
			c_rate_kind = $tr.find("td:eq(27) > div").text();
			//当查询到的利率状态为作废时，我们对其不进行过滤，使其仍能添加
			c_rate_status = $tr.find("td:eq(2) > div").text();
			if(c_rate_status!="3"){
				for ( var i = 0, j = arr1.length; i < j; i++) {
					
					if (c_rate_kind == arr1[i].key) {
						arr2.push(c_rate_kind);
	                    u++;
					}
				}
			}
			
		});
		//config_id:7105,是否启用复利利率,0否1是   add by jinpan 2015.11.03
		common_operate.getConfigById("7105");
		if (str_config_value == "0"){
			arr2.push("7");
		}
		if(type=="4"){
			if(u==0){
				Horn.getCompById("c_rate_kind_lvbg").filter("1",true,false);
			}else{
				Horn.getCompById("c_rate_kind_lvbg").filter("",true,false);
			}	
		}else{
			Horn.getCompById("c_rate_kind_lvbg").filter(arr2, false, true);
		}
		
	},
	// 过滤的利率种类
	getRatetypeList : function(type) {
		//用于存款利率判断
		if(type=="4"){
             Horn.getCompById("c_rate_type_lvbg").filter("0",true,false);			
		}	
	},
	// 股权性质-下拉框联动
	gqxzChange : function() {
		var c_ex_type = Horn.getComp("c_ex_type").getValue();
		if (c_ex_type == "a" || c_ex_type == "b") {
			Horn.getComp("l_invested_enterprise").hide();
			Horn.getComp("l_invested_enterprise").setDisabled(true);

			Horn.getComp("c_relative_exchange").show();
			Horn.getComp("vc_relative_code").show();

			Horn.getComp("c_relative_exchange").setDisabled(false);
			Horn.getComp("vc_relative_code").setDisabled(false);

			//Horn.getComp("vc_relative_enterprise").setRequired(false);
		} else if (c_ex_type == "c" || c_ex_type == "d") {
			Horn.getComp("l_invested_enterprise").show();
			Horn.getComp("l_invested_enterprise").setDisabled(false);

			Horn.getComp("c_relative_exchange").hide();
			Horn.getComp("vc_relative_code").hide();

			Horn.getComp("c_relative_exchange").setDisabled(true);
			Horn.getComp("vc_relative_code").setDisabled(true);

			//Horn.getComp("vc_relative_enterprise").setRequired(true);
		}
	},//投资性质-下拉框联动
	tzxzChange : function(){
		var c_invest_property = Horn.getComp("c_invest_property").getValue();
		if(c_invest_property == "1"){//投资
			Horn.getComp("en_rivalcost_rate").setRequired(false);
		} else if(c_invest_property == "2"){
			Horn.getComp("en_rivalcost_rate").setRequired(true);
		}
	},
	//市场类别监听，过滤证券代码
	sclb : function(type){
		if (type == 1) {
			type = "";
		} else if (type == 2) {
			type = "_edit";
		}
		value = Horn.getComp("c_relative_exchange").getValue();
		common_operate.queryStockcodes("#vc_relative_code"+type+" > input[name=vc_relative_code]", value,"vc_relative_code");
	},

	// 用金额大写控件时，处理金额大写
	dealCapital : function(targetId, sourceId) {
		$("nobr > div").hide();
		$("#" + sourceId + " > input:eq(1)").keyup(function() {
			Horn.getCompById(targetId).setValue($("#" + sourceId + " > .u-typefield-capital")
					.text());
		});
	},
	// 根据公式计算收益
	sumProfit : function($this) {
		var en_occur_invest_add = Horn.getCompById("en_occur_invest_add")
				.getValue();
		var c_calc_way = Horn.getCompById("c_calc_way_add").getValue();
		var en_rate = $this.val() / 100;
		var l_period = Horn.getCompById("l_period_add").getValue();
		if (c_calc_way == 1) {// 公式1，本金*利率/期数
			Horn.getCompById("en_profit_add").setValue(
					en_occur_invest_add * en_rate / l_period);
		}
	},
	//存款期限，投资期限联动计算合同到期日期
	deposittermChange : function(type) {
        if (type == 1) {
			type = "";
		} else if (type == 2) {
			type = "_edit";
		}
        var l_begin_date=Horn.getCompById("l_begin_date"+type).getValue();
        var c_deposit_term=Horn.getCompById("c_deposit_term"+type).getValue();
       // var l_end_date=Horn.getComp("l_end_date"+type).getValue();
        if(c_deposit_term=="0"){
        	//jresui的bug日期控件调用setReadonly(false)方法之后会选中前一天 
        	//Horn.getCompById("l_end_date"+type).setReadonly(false);
        	if(l_begin_date==null||l_begin_date==""){
	        	Horn.getCompById("l_end_date"+type).clearValue();
	        }
        }else{
        	//Horn.getCompById("l_end_date"+type).setReadonly(true);
        	if(l_begin_date==null||l_begin_date==""){
	        	Horn.getCompById("l_end_date"+type).clearValue();
	        }else{
	            var  en_pay_inteval=0;
	            //月
	        	if(c_deposit_term=="1"){
	        		en_pay_inteval=3;
	        	}else if(c_deposit_term=="2"){
	        		en_pay_inteval=6;
	        	}else if(c_deposit_term=="3"){
	        		en_pay_inteval=12;
	        	}else if(c_deposit_term=="4"){
	        		en_pay_inteval=24;
	        	}else if(c_deposit_term=="5"){
	        		en_pay_inteval=36;
	        	}else if(c_deposit_term=="6"){
	        		en_pay_inteval=60;
	        	}
	        	l_begin_date=l_begin_date.substring(0,4)+"/"+l_begin_date.substring(4,6)+"/"+l_begin_date.substring(6,8);
 	            var date_begin=new Date(l_begin_date);		 	
 	            date_begin.setMonth(date_begin.getMonth() + en_pay_inteval);
 	            Horn.getCompById("l_end_date"+type).setValue(dataUtil.FormatDate(date_begin,"yyyyMMdd"));
	        }
        }
     },
	//存款类型联动
	ck_typeChange : function(type) {
		    if (type == 1) {
				type = "";
			} else if (type == 2) {
				type = "_edit";
			}
		    var c_ex_type=Horn.getCompById("c_ex_type"+type).getValue();
		    if(c_ex_type=="o"){
		    	Horn.getCompById("c_notice_term"+type).setDisabled(false);
		    	Horn.getCompById("c_notice_term"+type).show();
		    }else{
		    	Horn.getCompById("c_notice_term"+type).setDisabled(true);
		    	Horn.getCompById("c_notice_term"+type).hide();
		    }
	},
	//根据开关自动生成存单号
	ck_iounoauto : function(type) {
	    if (type == 1) {
			type = "";
		} else if (type == 2) {
			type = "_edit";
		}
	 // 同步执行功能号字典重新加载
    	$.ajax({
    		type : "post",
			url : "/am/am/business/deposit/getiouno.json",
			data : "",
			async : false,
			dataType :"json",
			success : function(result) {
				   if(result.query.vc_iou_no!=null&&result.query.vc_iou_no!=""){
					   if(type!= "_edit"){
						   Horn.getCompById("vc_iou_no"+type).setValue(result.query.vc_iou_no);
					   }
					   Horn.getCompById("vc_iou_no"+type).setReadonly(true);
				   }else{
					   Horn.getCompById("vc_iou_no"+type).setReadonly(false);
				   }
    		       
			}
		});
   },
 //投资性质联动
   contract_typeChange : function(type) {
		    if (type == 1) {
				type = "";
			} else if (type == 2) {
				type = "_edit";
			}
		    var c_contract_type=Horn.getCompById("c_contract_type"+type).getValue();
		    var c_business_type = Horn.getCompById("c_business_type"+type).getValue();
		    if(c_contract_type=="2"){
		    	$("#en_contract_balance"+type).parent().prev().html("<span class='m-verify-symbol'>*</span> 资产金额(元)");
		    }else{
		    	if(c_business_type=="2"){
		    		$("#en_contract_balance"+type).parent().prev().html("<span class='m-verify-symbol'>*</span>资产余额(元)");
		    	}else{
		    		$("#en_contract_balance"+type).parent().prev().html("<span class='m-verify-symbol'>*</span> 投资金额(元)");
		    	}
		    }
	},
	//修改金融产品类型获取对应标的物编号
	changefinancialinvest: function(type) {
		var c_invest_kind=Horn.getComp("c_invest_kind").getValue();
		$.ajax({
			type : "post",
			url : "/am/am/business/investproduct/comboxlist.json?c_product_type="+c_invest_kind+"&&l_function_no="+functionIds['investproduct']['ipl'],
			data : "",
			async : false,
			dataType : ajaxDataType.JSON,
			success : function(data) {
				if (data !=null) {
					if(type!=1){
						var s=Horn.getComp("vc_stock_code1").getValue();
						Horn.getComp("vc_stock_code1").addItems(data,true);
						Horn.getComp("vc_stock_code1").setValue(s);
					}else{
						Horn.getComp("vc_stock_code1").addItems(data,true);
					}
				} else {
					//Horn.Tip.warn("操作失败");
					Horn.Tip.warn(data);
				}
			}
		});
	},
	//根据标的物获取对应对手序号（发行方）
	changefinancialloan: function(type) {
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
		var vc_stock_code1=Horn.getComp("vc_stock_code1").getValue();
		$.post("/am/am/business/investproduct/look.json?vc_stock_code1="+vc_stock_code1, null, function(data) {
			if (data !=null) {
				Horn.getCompById("l_rival_id"+type2).setValue(data.l_publisher_id);
				Horn.getCompById("l_begin_date"+type2).setValue(data.l_begin_days);
				Horn.getCompById("l_end_date"+type2).setValue(data.l_end_days);
				if(Horn.getCompById("vc_stock_name"+type2).getValue()==""||Horn.getCompById("vc_stock_name"+type2).getValue()==null){
					Horn.getCompById("vc_stock_name"+type2).setValue(data.vc_stock_name1);
				}	
			} else {
				//Horn.Tip.warn("操作失败");
				Horn.Tip.warn(data);
			}
       }, "json");
	},
 	//理财产品显示投资期限
 	deposittermshow : function(type,operate) {
         //显示投资期限
         if(operate==1){
        	 Horn.getCompById("c_deposit_term"+type).show();
        	 Horn.getCompById("c_deposit_term"+type).setDisabled(false);
         }else{
        	 Horn.getCompById("c_deposit_term"+type).hide();
        	 Horn.getCompById("c_deposit_term"+type).setDisabled(true);
         }
      }
};

