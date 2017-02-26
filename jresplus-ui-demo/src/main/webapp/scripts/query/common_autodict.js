$(function(){
	dialog = common_operate.getDialog();
});

//自动化弹出复核等界面
var  autodicwin={
		toautodic:function(vc_node_id, type, l_action_in, workflow_type) {
			var oper_flag = 1;
			// 同步获取初始化参数 （异步调用出错 未知原因）
			$.ajax({
				type : "post",
				url : "/am/am/init/list.json",
				data : data,
				async : false,
				dataType : ajaxDataType.JSON,
				success : function(result) {
					if (result != null) {
						oper_flag = result.l_operate_flag;
					}
				}
			});
			if (oper_flag == 0) {
				TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {
				});
			} else {
					var grid = common_operate.checkSelectedLength();
					if (!grid) {
						return grid;
					}
					var l_serial_no = grid[0].l_serial_no;
					var l_busin_flag = grid[0].l_busin_flag;
					var h_l_busin_flag = "";
					var dictType = "";
					var title = grid[0].vc_busin_caption + constants.bussinessMap[type];

					// 指令调整、作废
					if (l_busin_flag == "22310" || l_busin_flag == "22311") {
						//保留原来的业务标识，用于与O32接口对接
						h_l_busin_flag = l_busin_flag;
						var url = "/am/am/business/dictate/query_l_busin_flag.json";
						var data = "l_serial_no=" + l_serial_no;
						query_operate.ajax(url, data, function(result) {
							if (l_busin_flag == "22310") {
								dictType = "zltz";
							} else if (l_busin_flag == "22311") {
								dictType = "zlzf";
							}
							l_busin_flag = result.query.l_busin_flag;
						});
						title = grid[0].vc_busin_caption + "—" + grid[0].c_business_type + constants.bussinessMap[type];
					}
					//判断复核界面是否是grid
					var flag = constants.undoauto_fun[l_busin_flag];
					if (flag) {
					   flag=1;
					}else{
					   flag=0;
					}
//					if (!flag) {
						if (!workflow_type) {
							workflow_type = "";
						}

						var workflow_step = workflowStep.review;
						var buttonId = type;
						var l_function_no = functionIds.l_busin_flags[l_busin_flag];
						var h_node_status = grid[0].h_node_status;//当前节点状态

						var wf_instance_id = grid[0].wf_instance_id;
						var wf_node_id = grid[0].wf_node_id;
						var l_occur_date = "";
						var en_occur_balance = "";
						var vc_summary = grid[0].vc_summary;
						var htype = constants.formObj[l_busin_flag];
						// 可传参数与auto_fun[l_busin_flag]
						var c_business_type = grid[0].c_business_type; // 合同类型
						var c_business_class=grid[0].c_business_class;//买卖方标识
						var s = constants.businflag_fun[l_busin_flag]; // 生成界面分类
						if (s == 'contract') {
							if (c_business_type == 'F'||c_business_type == '金融产品投资') {
								s = "financialinvest";
							}else if(c_business_type == 'I'||c_business_type == '物权投资') {
								s = "interest";
							}else if(c_business_type == 'D'||c_business_type == '债权投资') {
								s = "credit";
							}else if(c_business_type == '4'||c_business_type == '存款'){
                                s="deposit";
							}else if(c_business_type == '6'||c_business_type == '股权收益权'){
                                s="stockrevenue";
							}else if(c_business_type == '7'||c_business_type == '其他收益权'){
                                s="otherprofileright";
							}else if(c_business_type == 'H'||c_business_type == '信用证/福费廷'){
                                s="letterofcredit";
							}else if(c_business_type == 'C'||c_business_type == '委托贷款'){
                                s="entrustedloan";
							}else if(c_business_type == '2'||c_business_type == '信贷资产'){
                                s="creditasset";
							}else if(c_business_type == '3'||c_business_type == '票据资产'){
                                s="noteasse";
							}
							if(c_business_class=='2'){
								s="seller"+s;
							}
						}
						var vcfun = "1";
						if (buttonId == 'zlxg' || buttonId == 'zlcx'
								|| buttonId == 'zltz' || buttonId == 'zlzf' || buttonId == 'zlqr' || ("999" == vc_node_id && buttonId == "zlck")) {
							vcfun = "2";
						}
						
						var h_exec_status = grid[0].h_exec_status; // 指令状态,指令自动生成时作为判断条件
						
						$.post("/am/am/business/dictateinfoex/getparam.json?vc_key_id="
								+ s + "&vc_funtype=" + vcfun, null, function(data) {
							if (data != null) {
								var vc_kind_name = data.vc_kind_name;
								var c_field_kind = data.c_field_kind;
								var l_group_id = data.vc_group_id;
								var l_busin_flag2 = data.vc_busin_flag;
								var type = data.vc_type;
								var idtype = data.vc_idtype;
								var autojs = data.vc_js;
								var vc_addvm = data.vc_addvm;
								var autotype = data.vc_autotype; // 自动生成类型
								// 1表示通过vc_kind_name生成
								// 2表示通过l_busin_flag生成
								var winwidth = data.l_winwidth;
								var winheigh = data.l_winheigh;
								var vc_cols= data.vc_cols;
								/***附件tab页传参开始**/
								//用于判断是否为附件tab页展示   1表示展示  0表示不展示
								var attach_flag = constants.o32_process[l_busin_flag];
								if(attach_flag){
									attach_flag="1";
								}else{
									attach_flag="0";
								}
								if(data.c_business_class!=null&&data.c_business_class!=''){
									c_business_class=data.c_business_class;
								}
								$("#rightMain").contents().find("#attach_flag").val(attach_flag);
								$("#rightMain").contents().find("#vc_busin_caption").val(grid[0].vc_busin_caption);
								/***附件tab页传参结束**/
								$("#rightMain").contents().find("#vc_summary").val(vc_summary);
								$("#rightMain").contents().find("#workflow_step").val(workflow_step);
								$("#rightMain").contents().find("#buttonId").val(buttonId);
								$("#rightMain").contents().find("#l_function_no").val(l_function_no);
								$("#rightMain").contents().find("#l_serial_no").val(l_serial_no);
								$("#rightMain").contents().find("#wf_instance_id").val(wf_instance_id);
								$("#rightMain").contents().find("#wf_node_id").val(wf_node_id);
								$("#rightMain").contents().find("#l_busin_flag").val(l_busin_flag);
								$("#rightMain").contents().find("#h_l_busin_flag").val(h_l_busin_flag);
								$("#rightMain").contents().find("#l_action_in").val(l_action_in);
								$("#rightMain").contents().find("#workflow_type").val(workflow_type);
								$("#rightMain").contents().find("#l_occur_date").val(l_occur_date);
								$("#rightMain").contents().find("#en_occur_balance").val(en_occur_balance);
								$("#rightMain").contents().find("#vc_kind_name").val(vc_kind_name);
								$("#rightMain").contents().find("#c_field_kind").val(c_field_kind);
								$("#rightMain").contents().find("#l_group_id").val(l_group_id);
								$("#rightMain").contents().find("#l_busin_flag2").val(l_busin_flag2);
								$("#rightMain").contents().find("#type").val(type);
								$("#rightMain").contents().find("#idtype").val(idtype);
								$("#rightMain").contents().find("#autojs").val(autojs);
								$("#rightMain").contents().find("#autotype").val(autotype);
								$("#rightMain").contents().find("#vc_node_id").val(vc_node_id);
								$("#rightMain").contents().find("#h_exec_status").val(h_exec_status);
								$("#rightMain").contents().find("#h_node_status").val(h_node_status);
                                $("#rightMain").contents().find("#vc_addvm").val(vc_addvm);
								$("#rightMain").contents().find("#htype").val(htype);
								$("#rightMain").contents().find("#dictType").val(dictType);
								$("#rightMain").contents().find("#c_business_class").val(c_business_class);
								$("#rightMain").contents().find("#l_winwidth").val(winwidth);
								$("#rightMain").contents().find("#l_winheigh").val(winheigh);
								$("#rightMain").contents().find("#win_title").val(title);
								$("#rightMain").contents().find("#vc_cols").val(vc_cols);
								$("#rightMain").contents().find("#is_grid").val(flag);
								$("#uesWin").show();
								$("#rightMain").contents().find("#addForm").submit();
							}else{
								TDialog.Msg.alert("提示", "信息配置指令界面参数未配置生成key为:"+s, function() {
								});
							} 
						}, "json");
//					} else {
//						Horn.getCompById("dbstepType").setValue(type);
//						Horn.getCompById("flagType").setValue(flag);
//						Horn.getCompById("vc_node_id").setValue(vc_node_id);
//						
//						var obj = {};
//						obj.l_serial_no = grid[0].l_serial_no;
//						obj.l_busin_flag = grid[0].l_busin_flag;
//						//还款计划调用
//						if(flag=="repayplan"){
//							Horn.getCompById("repayplanl_dictate_serial_no").setValue(grid[0].l_serial_no);
//						    Horn.getCompById("repayplanvc_stock_code").setValue(grid[0].vc_stock_code);
//						    equity_ivestment_repayplan.del('');
//							equity_ivestment_repayplan.formQuery(flag + "Table");
//						}else{
//						  Horn.getCompById(flag + "Table").setBaseParams(obj);
//						  Horn.getCompById(flag + "Table").load();
//					    }
//						
//						Horn.getCompById(flag + "Win").setTitle(title);
//						Horn.getCompById(flag + "Win").show();
//						
//						//清空批注
//						var form = Horn.getComp(flag + "Form");
//						form.reset();
//						
//						if(type == "fhdb" || type == "spdb"){//待办处理的指令需要动态生成按钮
//							autodicwin.createButtons(flag);
//						}
//						
//						autodicwin.renderVcsummary(flag);
//						//指令撤销
//						if(type == "zlcx" || type == "zlck"){
//							$("div[name=" + flag + "Table").find(".hc-datagrid-toolbar").hide();
//						} else {
//							$("div[name=" + flag + "Table").find(".hc-datagrid-toolbar").show();
//						}
//						
//						if(type == "zlck"){
//							$("div[name=" + flag +"Btn]").hide();	
//						}else{
//							$("div[name=" + flag +"Btn]").show();
//						}
//					}
			}
		},
//        //弹框关闭调用
//		 afteruseWinclose:function(){
//			 $("#rightMain").contents().find("#dodicForm").submit();
//		},
		//弹框关闭调用
		 afteruseWinclosenew:function(){
			 $("#uesWin").hide();
			 $("#rightMain").contents().find("#dodicForm").submit();
		},//操作成功调用
		 afteruseWincommit:function(){
			$("#uesWin").hide();
			$("#rightMain").contents().find("#dodicForm").submit();
			gridId = "dataTable";
			Horn.getCompById(gridId).load();
		},//查看指令批注
		showSummarys : function(){
			var grid = Horn.getComp("dataTable").getSelecteds()[0];
			Horn.getCompById("summaryTable").setBaseParams({l_serial_no:grid.l_serial_no});
			Horn.getCompById("summaryTable").load();
			Horn.getComp("summaryWin").show();			
		},
		getWindowTitle : function(windId){
			return $("#" + windId + " > div > span").text();
		},
		getSelectgriddata:function(){
			var grid = common_operate.checkSelectedLength();
			if (grid) {
				return grid[0];
			}
		}
}; 
 

// 自动生成
var comm_autodict = {
	operaflash : function(data) {
		if (data == ajaxCallBackCode.OK) {
			TDialog.Msg.alert("提示", "操作成功", function() {
				autodicwin.afteruseWinclosenew();
				formQuery();				
			});
		} 
	},
	autodictCallBack : function(url, values) {
		TDialog.Msg.showProgressBar();
		var grid = common_operate.checkSelectedLength();
		var _vc_dict_log = grid[0].vc_busin_caption + "—" + grid[0].c_node_status + constants.bussinessMap[values.buttonId];
		
		values.vc_dict_log = _vc_dict_log;
		$.post(url, values, function(data) {
			TDialog.Msg.hideProgressBar();
			comm_autodict.operaflash(data);
		}, ajaxDataType.TEXT);
	}
};




// O32接口-操作对象
var o32Obj = {
	confirmUrl : "/am/am/business/dictate/getConfirm.json",
	updateDicteStatus : "/am/am/business/dictate/updateDicteStatus.json",
	applyUrl : "/am/am/business/dictate/getApply.json",
	riskUrl : "/am/am/business/dictate/risk.json",
	dictateUrl : "/am/am/business/dictate/queryDictate.json",
	tranferNodeUrl : "/am/am/business/dictate/getBusinflagconfig.json",
	doConfirm : function(buttonId, url, values) {
		TDialog.Msg.showProgressBar();
		//查询节点转换表
		o32Util.queryTransferNode("vc_node_id",values.vc_node_id,values.c_business_class);	
		//根据业务标识,查询业务配置信息表
		o32Util.queryFlagconfig(constants.type2BusFlg[values.htype],values.c_business_class);
		var grid = common_operate.checkSelectedLength(),
			h_deliver_status = grid[0].h_deliver_status;
		
		switch (buttonId) {
		case "fhtg":
			if (values.h_l_busin_flag == "22310" || values.h_l_busin_flag == "22311"){
				values.oper_type = constants.operType.tzzf;//操作类型
				o32Obj.dictateAdjust(url, values);
				break;
			}
			o32Obj.distributeRequest(url, values);
			break;
		case "zlcx":
			if(!$.trim(h_deliver_status)){
				comm_autodict.autodictCallBack(url, values);
				return ;
			} 
			values.en_occur_invest = 0;
			values.en_occur_balance = 0;
			values.oper_type = constants.operType.cx;//操作类型
			values.cancel_frozen = constants.c_deliver_status[h_deliver_status];
			values.c_deliver_status = "2";//交收状态：指令已撤销
			query_operate.doPost(o32Obj.confirmUrl, values, function(result) {
				TDialog.Msg.hideProgressBar();
				if (result && result.bean) {
					comm_autodict.autodictCallBack(url, values);
				} else {
					TDialog.Msg.warning("提示",result.errorMsg);
//					o32Obj.o32exception(values);
					o32Obj.terminDict();
				}
			},constants.ajaxDataType.JSON);	
			break;
		case "zlxg":
			// 待确认的指令，做指令修改，调用O32申请接口
			if (grid[0].c_exec_status == "待确认"){
				var is_o32_confirm = o32Util.tranferNode.is_o32_confirm;
				if (is_o32_confirm == "1"){
					// 数据修改，待确认的指令，做指令修改，不调用O32确认接口
					o32Util.tranferNode.is_o32_confirm = "";
				}
				values.c_deliver_status = "6";//交收状态：指令已申请
				o32Obj.o32Apply(url,values);
				// 数据恢复
//				o32Util.tranferNode.is_o32_confirm = is_o32_confirm;
			} else{
				if(!$.trim(h_deliver_status)){
					comm_autodict.autodictCallBack(url, values);
					return ;
				}
			
				var new_en_occur_invest = values.en_occur_invest;
				var new_en_occur_balance = values.en_preoccur_balance;
				values.en_occur_invest = 0;
				values.en_occur_balance = 0;
				values.oper_type = constants.operType.cx;//操作类型
				values.cancel_frozen = constants.c_deliver_status[h_deliver_status];
				query_operate.doPost(o32Obj.confirmUrl, values, function(result) {
					TDialog.Msg.hideProgressBar();
					o32Util.tranferNode.is_o32_confirm = "";
					if (result && result.bean) {
						values.en_occur_invest = new_en_occur_invest;
						values.en_occur_balance = new_en_occur_balance;
						//放款类:1:业务分类2并且业务细分1;2:主动支付
						if((o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "1") 
								|| values.htype == "zdzf"){					
							o32Util.tranferNode.is_o32_application = constants.c_deliver_status[h_deliver_status];
							o32Obj.o32Risk(url, values);//重新风控
						} else {
							o32Obj.o32Apply(url,values);//重新申请
						}
					} else {
						TDialog.Msg.warning("提示",result.errorMsg + "!");
//						o32Obj.o32exception(values);
						o32Obj.terminDict();
					}
				},constants.ajaxDataType.JSON);
			}
			break;
		case "zltz":
			var old_en_occur_balance = values.h_en_occur_balance,
				en_occur_balance = values.en_occur_balance;
			values.vc_relative_id = values.l_serial_no;
			values.l_serial_no = "";
			//放款类:业务分类2并且业务细分1；或者主动支付
			if(o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "1" || values.htype == "zdzf"){					
				if(parseFloat(en_occur_balance) > parseFloat(old_en_occur_balance)){
					//如果是调整后的实际发生金额>调整前的预发生金额
					values.en_preoccur_balance = en_occur_balance - old_en_occur_balance;
					o32Util.tranferNode.is_o32_application = constants.strConstan.YES;
					o32Util.tranferNode.is_o32_confirm = "";
					o32Obj.o32Risk(url,values);//重新发起o32申请接口（申请金额：调整后的实际发生金额-调整前的预发生金额），成功后重新生成一条调整指令，调整指令复核时调用o32确认接口
					return;
				}
			} 
			comm_autodict.autodictCallBack(url,values);		
			break;
		case "zlzf":
			values.vc_relative_id = values.l_serial_no;
			values.l_serial_no = "";
			comm_autodict.autodictCallBack(url, values);
			break;
		case "zlqr"://指令确认，调用O32申请接口
			values.c_deliver_status = "6";//交收状态：指令已申请
			o32Obj.o32Apply(url,values);
			break;
		case "fhbtg":
			if(values.h_l_busin_flag != "22310"){
				o32Obj.distributeRequest(url, values);
				break;
			}
			//放款类操作
			var	en_occur_balance = values.en_occur_balance,
				dicateObj = {};
			if(o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "1" 
				|| values.htype == "zdzf"){
				//根据指令流水号查询指令详情
				query_operate.ajax(o32Obj.dictateUrl, values, function(result) {					
					if (result && result.query) {
						dicateObj = result.query;
					} 
				});
				if(parseFloat(en_occur_balance) > parseFloat(dicateObj.en_occur_balance)){
					//如果是调整后的实际发生金额>调整前的预发生金额
					values.en_occur_invest = 0;
					values.en_occur_balance = 0;
					values.oper_type = constants.operType.cx;//操作类型
					values.cancel_frozen = constants.c_deliver_status[h_deliver_status];
					values.c_deliver_status = "2";//交收状态：指令已撤销
					o32Obj.dictateAdjust(url, values);
					break;
				}
			}		
		default:
			o32Obj.distributeRequest(url, values);
		}
		
	},
	// 指令调整、作废
	dictateAdjust : function(url, values) {
		var new_l_serial_no = values.l_serial_no,
		 	new_en_occur_invest = values.en_occur_invest,
		 	new_en_occur_balance = values.en_occur_balance,
		 	dicateObj = {};
		if (values.buttonId == "fhtg" && values.h_l_busin_flag == "22310" ) {//指令调整			
			//根据指令流水号查询指令详情
			query_operate.ajax(o32Obj.dictateUrl, values, function(result) {					
				if (result && result.query) {
					dicateObj = result.query;
				} 
			});
			var old_en_occur_invest = dicateObj.en_occur_invest,
				old_en_occur_balance = dicateObj.en_occur_balance;
			values.l_serial_no = dicateObj.vc_relative_id;
			values.oper_type = constants.operType.tzzf;//操作类型
			
			if(o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "1" 
				|| values.l_busin_flag == "22151"){
				if(parseFloat(new_en_occur_balance) - parseFloat(old_en_occur_balance) > 0){
					values.l_serial_no = new_l_serial_no;
					values.oper_type = constants.operType.qr;//操作类型
					values.c_deliver_status = constants.c_deliver_status.DELIVING;//交收状态：交收中
				}
				//放款（如股权投资，金融产品投资,债权投资,物权投资,存款、主动支付）:传入本金参数=指令调整前的实际发生金额-指令调整后的实际发生金额;
				//传入总金额参数=指令调整前的实际发生金额-指令调整后的实际发生金额
				values.en_occur_invest = common_operate.parseNaN(new_en_occur_balance  - old_en_occur_balance);
				values.en_occur_balance = common_operate.parseNaN(new_en_occur_balance  - old_en_occur_balance);
			} else if(o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "3" ){
				//收息（股权投资收益、股权分红送股、金融产品收益,债权投资,物权投资,存款收息）:传入本金参数=0;传入总金额参数= 指令调整后的实际发生金额-指令调整前的实际发生金额
				values.en_occur_invest = 0;
				values.en_occur_balance = common_operate.parseNaN(new_en_occur_balance - old_en_occur_balance);
			} else if(o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "2" ){
				//返本（股权回购、股权出让、金融产品到期、金融产品转出，还款方式为返还本金）:传入本金参数=指令调整后的实际发生金额-指令调整前的实际发生金额
				//传入总金额参数= 指令调整后的实际发生金额-指令调整前的实际发生金额
				if(values.c_repay_type == "3" || values.c_repay_type == "4"){
					values.en_occur_invest = common_operate.parseNaN(new_en_occur_invest - old_en_occur_invest);
					values.en_occur_balance = common_operate.parseNaN(new_en_occur_balance - old_en_occur_balance);
				} else if(values.c_repay_type == "5"){
					//返本又收息（股权回购、股权出让、金融产品到期、金融产品转出，还款方式为利随本清、返本结息）:传入本金参数=指令调整后的本金-指令调整前的本金
					//传入总金额参数=指令调整后的实际发生金额-指令调整前的实际发生金额
					values.en_occur_invest = common_operate.parseNaN(new_en_occur_balance - old_en_occur_balance);
					values.en_occur_balance = common_operate.parseNaN(new_en_occur_balance - old_en_occur_balance);
				}				
			}						
		} else if ( values.buttonId == "fhtg" && values.h_l_busin_flag == "22311") {//指令作废
			//根据指令流水号查询指令详情
			query_operate.ajax(o32Obj.dictateUrl, values, function(result) {					
				if (result && result.query) {
					dicateObj = result.query;
				} 
			});
			values.l_serial_no = dicateObj.vc_relative_id;
			values.oper_type = constants.operType.tzzf;//操作类型
			if(o32Util.businflagconfig.vc_dictate_type == "2" && o32Util.businflagconfig.vc_ext_type == "2"){				
				//返本又收息（股权回购、股权出让、金融产品到期、金融产品转出、物权到期、债权出售、债权回购,存款提取,到期转存，还款方式为利随本清、返本结息）
				if(values.c_repay_type == "3" || values.c_repay_type == "4"){
					//返本又收息（股权回购、股权出让、金融产品到期、金融产品转出，还款方式为利随本清、返本结息）:传入本金参数=-本金
					//传入总金额参数=指令调整后的实际发生金额-指令调整前的实际发生金额
					values.en_occur_invest = -new_en_occur_invest;
					values.en_occur_balance = -new_en_occur_balance;
				} else {
					values.en_occur_invest = -new_en_occur_balance;
					values.en_occur_balance = -new_en_occur_balance;
				}		
			} else {
				//作废都传负的实收金额new_en_occur_balance
				values.en_occur_invest = -new_en_occur_balance;
				values.en_occur_balance = -new_en_occur_balance;
			}			
		}
		query_operate.ajax(o32Obj.confirmUrl, values, function(result) {
			TDialog.Msg.hideProgressBar();
			if (result && result.bean) {
				if (values.buttonId == "fhtg" && (values.h_l_busin_flag == "22310" || values.h_l_busin_flag == "22311")) {
					values.l_serial_no = new_l_serial_no;
					//指令调整、指令作废要传对应的l_busin_flag:22310,22311
					values.l_busin_flag = values.h_l_busin_flag;
					values.en_occur_invest = new_en_occur_invest;
					values.en_occur_balance = new_en_occur_balance;
				} 
				comm_autodict.autodictCallBack(url, values);
			} else {
				TDialog.Msg.warning("提示",result.errorMsg + "!");
			}
		});
	},
	/**
	 * o32发起确认:根据节点转换关系表调用O32接口
	 * @param url
	 * @param values
	 */
	distributeRequest : function(url, values){
		if(o32Util.tranferNode.is_o32_risk == constants.strConstan.YES){
			o32Obj.o32Risk(url, values);//调用O32风控接口
		} else if(o32Util.tranferNode.is_o32_application == constants.strConstan.YES){
			o32Obj.o32Apply(url,values);//调用O32申请接口
		} else if(o32Util.tranferNode.is_o32_confirm == constants.strConstan.YES){
			//先调用非标后台
			values.c_deliver_status = constants.c_deliver_status.DELIVING;//交收状态：交收中
			query_operate.ajax(url, values, function(result){
				if(result == constants.ajaxCallBackCode.OK){
					values.oper_type = constants.operType.qr;//操作类型
					//后调用O32确认接口
					o32Obj.o32Confirm(values);
				}		
			}, constants.ajaxDataType.TEXT, function(){				
			});		
		} else {
			comm_autodict.autodictCallBack(url, values);
		}
	},
	//o32异常处理
	o32exception : function(values){
		values.business_type = values.htype;
		values.l_dictate_serial_no = values.l_serial_no;
		values.en_occur_balance = values.en_preoccur_balance;
		var url = "/am/am/business/dictate/o32exception.json";
		query_operate.doPost(url, values, function(){
			
		},ajaxDataType.TEXT);
	},
	//o32确认接口：撤销申请指令
	o32Cancel : function(){	
		//父页面调用子页面的方法：返回复核界面form的元素值对象
		var values = rightMain.window.getSubmitValues(),
			h_fk_type = $("#h_fk_type").val();
		if(h_fk_type == "102"){//禁止:不能下达指令，也不需要执行撤销
			Horn.getCompById("msgWin").hide();
			return false;
		}
		values.en_occur_invest = 0;
		values.en_occur_balance = 0;
		values.oper_type = constants.operType.cx;//操作类型
		values.cancel_frozen = constants.strConstan.NO;
		if(values.buttonId == constants.buttonIds.zlxg){
			o32Obj.terminDict();//终止指令
		} else if(values.buttonId == constants.buttonIds.zltz) {		
			values.l_serial_no = $("#h_l_serial_no").val();
		}		
		query_operate.ajax(o32Obj.confirmUrl, values, function(result) {
			Horn.getCompById("msgWin").hide();
			if (result && result.bean) {			
			} else {
//				Horn.Tip.warn(result.errorMsg);
				if(values.buttonId == constants.buttonIds.zltz){//指令调整
					o32Obj.o32exception(values);
				}
			}
		},ajaxDataType.JSON,function(){
			Horn.getCompById("msgWin").hide();
			if(values.buttonId == constants.buttonIds.zltz){//指令调整
				o32Obj.o32exception(values);
			}
		});
	},//o32关闭风控提示信息,并且非标系统指令继续
	o32Continue : function(){
		var values = rightMain.window.getSubmitValues(),
			h_fk_type = $("#h_fk_type").val();
		Horn.getCompById("msgWin").hide();

		if(h_fk_type == "102"){//禁止
			if(values.buttonId == constants.buttonIds.zlxg){
				o32Obj.terminDict();//指令修改：调用功能号将此笔指令终止掉				
			} else {
//				Horn.getCompById("msgWin").hide();
				return;
			}		
		} else {//预警，非标系统指令继续			
			var url = "/am/am/business/dictate/"+values.buttonId+"/operation.json",
				h_l_serial_no = $("#h_l_serial_no").val();
			if(values.buttonId == constants.buttonIds.zltz) {	
				var old_en_occur_balance = values.h_en_occur_balance,
					en_occur_balance = values.en_occur_balance;
				url = "/am/am/business/dictate/"+values.buttonId+"/lauchOperation.json";
				values.vc_relative_id = values.l_serial_no;
				values.en_preoccur_balance = en_occur_balance - old_en_occur_balance;
			} 
			values.l_serial_no = h_l_serial_no;
			values.c_deliver_status = constants.c_deliver_status.RISK;//交收状态：指令已申请
			
			if(o32Util.tranferNode.is_o32_application == constants.strConstan.YES){
				values.c_deliver_status = constants.c_deliver_status.APPLY;//交收状态：指令已申请
				o32Obj.o32Apply(url, values);
				return;
			}
			
			query_operate.doPost(url, values, function(reuslt) {
				if(reuslt == constants.ajaxCallBackCode.OK){
					values.oper_type = constants.operType.qr;//操作类型
					if(o32Util.tranferNode.is_o32_confirm == constants.strConstan.YES){//调用确认接口
						o32Obj.o32Confirm(values);
					} else {
						comm_autodict.operaflash(reuslt);
					}								
				} else {
					if(values.buttonId == constants.buttonIds.zlxg){
						o32Obj.terminDict();
					} else if(values.buttonId == constants.buttonIds.zltz){
						values.oper_type = constants.operType.cx;//操作类型
						o32Obj.o32exception(values);
					}
				}				
			}, ajaxDataType.TEXT, function(){
				if(values.buttonId == constants.buttonIds.zlxg){//指令复核
					o32Obj.terminDict();
				} else if(values.buttonId == constants.buttonIds.zltz){//指令调整
					values.oper_type = constants.operType.cx;//操作类型
					o32Obj.o32exception(values);
				}			
			});
//			Horn.getCompById("msgWin").hide();
		}
		
	},//根据指令流水号查询指令详情
	queryDicateInfo : function(values){
		query_operate.ajax(o32Obj.dictateUrl, values, function(result) {					
			if (result && result.query) {
				dicateObj = result.query;
			} 
		});
	},
	//改变指令状态-终止指令
	terminDict : function(){
		var grid = common_operate.checkSelectedLength();
		var l_serial_no = grid[0].l_serial_no;
		var c_exec_status = "a";
		var c_node_status = "";
		var submitParas = {};
		
		submitParas.l_serial_no = l_serial_no;
		submitParas.c_exec_status = c_exec_status;
		submitParas.c_node_status = c_node_status;
		var _url = o32Obj.updateDicteStatus+ "?l_function_no=" + functionIds.dicta.updateDictStatus;
		query_operate.ajax(_url, submitParas, function(_result) {
			if (_result == ajaxCallBackCode.OK) {
				TDialog.Msg.alert("提示","指令状态更新为已终止！");  
				Horn.getCompById("msgWin").hide();
				Horn.getCompById("uesWin").hide();
				Horn.getCompById("dataTable").setBaseParams(Horn.getCompById("bankaccountForm").getValues());
				Horn.getCompById("dataTable").load('',{"pageNo":1});
			} 
//			else {
//				Horn.Tip.warn(_result);
//			}
		},ajaxDataType.TEXT);
	},//交收失败时，调用回溯并将指令终止
	endDict : function(){
		TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
			var grid = common_operate.checkSelectedLength(),
			submitParas = {};
			
			submitParas.l_serial_no = grid[0].l_serial_no;
			submitParas.c_deliver_status = "3";
	
			var _url = o32Obj.updateDicteStatus + "?l_function_no=" + functionIds.dicta.endDict;
			query_operate.ajax(_url, submitParas, function(_result) {
				if (_result == ajaxCallBackCode.OK) {
					TDialog.Msg.alert("提示","指令状态更新为已终止！");  
					Horn.getCompById("msgWin").hide();
					Horn.getCompById("uesWin").hide();
					Horn.getCompById("dataTable").setBaseParams(Horn.getCompById("bankaccountForm").getValues());
					Horn.getCompById("dataTable").load('',{"pageNo":1});
				} 
			},ajaxDataType.TEXT);
		},function(){			
		});
		
	},
	//O32风控接口
	o32Risk : function(url,values){
		TDialog.Msg.showProgressBar();
		values.c_deliver_status = constants.c_deliver_status.RISK;//交收状态：指令已风控
		var _riskUrl = o32Obj.riskUrl + "?business_type=" + values.htype;
		query_operate.doPost(_riskUrl, values, function(result) {
			TDialog.Msg.hideProgressBar();
			if (result && result.bean) {
				$("#h_l_serial_no").val(result.bean.busin_no);
				if(result.bean.error_no !== 0){//正常
					o32Util.riskMsgShow(result);
					return;
				} 
				values.l_serial_no = result.bean.busin_no;
				if(o32Util.tranferNode.is_o32_application == constants.strConstan.YES){
					values.c_deliver_status = constants.c_deliver_status.APPLY;//交收状态：指令已申请
					//调用O32申请接口
					o32Obj.o32Apply(url, values);
					return;
				} 
				comm_autodict.autodictCallBack(url, values);
//				common_operate.exitButtonHiden("msgWin");
//				$("#h_fk_type").val(result.bean.error_no);
//				var data = {
//						"total" : result.total,
//						"rows" : result.rows
//					};
//				Horn.getCompById("msgTable").loadData(data);
//				Horn.getCompById("msgWin").show();
//				
//				if(result1.bean.error_no === 101){//预警
//					$(":button[name=o32cancel]").show();
//					$(":button[name=o32continue]").text("继续");
//				} else if(result1.bean.error_no === 102) {//禁止
//					$(":button[name=o32cancel]").hide();
//					$(":button[name=o32continue]").text("关闭");
//				}	
		} else {
			TDialog.Msg.warning("提示",result.errorMsg + "!");
			if(values.buttonId == constants.buttonIds.zlxg){
				o32Obj.terminDict();
			}
		}
		},constants.ajaxDataType.JSON);
	},
	//O32申请接口
	o32Apply : function(url,values){
		values.c_deliver_status = constants.c_deliver_status.APPLY;//交收状态：指令已申请
		var _applyUrl = o32Obj.applyUrl + "?business_type=" + values.htype;
		query_operate.doPost(_applyUrl, values, function(result) {
			TDialog.Msg.hideProgressBar();
			if (result && result.bean) {
				$("#h_l_serial_no").val(result.bean.busin_no);
				if(result.bean.error_no === 0){//正常
					values.l_serial_no = result.bean.busin_no;
					if(o32Util.tranferNode.is_o32_confirm == constants.strConstan.YES){
						values.c_deliver_status = constants.c_deliver_status.DELIVING;//交收状态：交收中
						query_operate.doPost(url, values, function(result){
							if (result == constants.ajaxCallBackCode.OK) {
								values.oper_type = constants.operType.qr;
								//调用O32确认接口
								o32Obj.o32Confirm(values);
							}
						});
						return;
					} 
					comm_autodict.autodictCallBack(url, values);															
				} 
			} else {//申请失败则撤销
				TDialog.Msg.warning("提示",result.errorMsg + "!",function(){
					values.cancel_frozen = constants.strConstan.NO;
					values.oper_type = constants.operType.cx;//操作类型
					o32Obj.o32Confirm(values);
				});
				if(values.buttonId == constants.buttonIds.zlxg){
					o32Obj.terminDict();
				}
			}
			},constants.ajaxDataType.JSON);
	},//O32确认接口
	o32Confirm : function(values){		
		TDialog.Msg.showProgressBar();
		//主动支付:放款时传入本金
		values.en_occur_invest = (values.l_busin_flag == constants.type2BusFlg.zdzf ? values.en_occur_balance : values.en_occur_invest);
		query_operate.doPost(o32Obj.confirmUrl, values, function(result) {
			TDialog.Msg.hideProgressBar();
			if (result && result.bean) {
				if(values.oper_type == constants.operType.qr){
					comm_autodict.operaflash(constants.ajaxCallBackCode.OK);
				}
			} else {
				TDialog.Msg.warning("提示",result.errorMsg + "!");
				//插入O32异常信息
				o32Obj.o32exception(values);
			}
		},ajaxDataType.JSON,function(){
			//插入O32异常信息
			o32Obj.o32exception(values);
		});
	}
};

//点击手之后的对手方显示界面，对手方弹出添加相关对手方js 
function addwinloan2(){
	$.post("/am/am/init/list.json", null, function(data) {
		if (data!=null) {					
            if(data.l_operate_flag==0){	        		
	            	TDialog.Msg.alert("提示", "系统未初始化,请联系管理员初始化！", function() {	
					});	       
            }else{
            	window.parent.Horn.Frame.openMenu('404109','/am/am/business/loanrival/loanrivaladd.htm','对手方信息添加','inbox');
            } 
		}
   }, "json");
	
}

//根据iframe内容body高度，重置iframe高度使得出现滚动条解决联动变化字段增多确定按钮隐藏的bug
function resizeuesWin(height){
	$("#rightMain").css("height",height);
}