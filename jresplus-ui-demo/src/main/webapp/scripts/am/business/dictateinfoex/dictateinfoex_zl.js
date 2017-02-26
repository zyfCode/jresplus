$(function() {
	common_style.disable_style();
	common_operate.getBusAuthority("dataTable","zl");
});
/**
 * 业务流程管理
 */
var dictateinfoex_zl = {
	// 显示金额修改窗口
	showMonenyWin : function() {
		var obj = {};
		var type = Horn.getCompById("htype").getValue();
		var grid = Horn.getComp("dataTable").getSelecteds();
		obj = Horn.getComp(type + "Form").getValues();
		obj.l_dictate_serial_no = grid[0].l_serial_no;
		Horn.getCompById("detailTable").setBaseParams(obj);
		Horn.getCompById("detailTable").load();
		delete obj.l_dictate_serial_no;
		Horn.getComp("detailWin").show();
	},
	// 行单击事件
	rowClick : function(rowdata) {
		var grid = Horn.getComp("dataTable").getSelecteds();
		//固定按钮放在最后
		var buttqueryhtml="<li><a name=\"zlck\" href=\"JavaScript:void(0)\" class=\"hc-datagrid-a hc_datagrid-alink\" onclick=\"autodicwin.toautodic('','zlck')\"><i class=\"fa fa-eye\"></i>指令查看</a></li>";
		buttqueryhtml+="<li><a name=\"ctbutton5\" href=\"JavaScript:void(0)\" class=\"hc-datagrid-a hc_datagrid-alink\" onclick=\"low()\"><i class=\"fa fa-wrench\"></i>自定义列</a></li>";
		if (grid.length !== 1) {
			return;
		} else {//删除toolbar上存在的按钮
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").html('');
		}
		var c_process_type = common_operate.queryBusFlag(grid),
			c_business_class = grid[0].c_business_class,
			url = "/am/am/business/dictateinfoex/getButtons.json?l_function_no=" + functionIds.dicta.getDatagridButtons,
			data = "c_exec_status=" + rowdata.h_exec_status + "&c_node_status=" + rowdata.h_node_status + "&c_process_type=" + c_process_type + "&vc_dictate_type=zl";
		
		if($.trim(c_business_class)){//如果c_business_class不为空，则拼作为参数
			data += "&c_business_class=" + c_business_class;
		}
		
		if($.trim(rowdata.c_deliver_status) == "交收失败"){
			data = "vc_btn_name=zlzz";
		} else if($.trim(rowdata.c_deliver_status) == "交收中"){
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").append(buttqueryhtml);
			return ;
		} else if($.trim(rowdata.vc_busin_caption) == "指令调整") {//指令调整生成的指令，不能进行操作
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").append(buttqueryhtml);
			return;
		}
		//对已办结的指令，要根据业务标识查询调整业务流程配置：只有资金流程的才能进行调整、作废
		if ($.trim(rowdata.c_exec_status) == "已办结") {
			var show_button_flag = dictateinfoex_zl.queryAdjustType(rowdata);
			if(!show_button_flag){
				$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").append(buttqueryhtml);
				return;
			}
		} 
		query_operate.ajax(url, data, function(result){
			var btn_html = "";
			for(var i=0,j=result.length;i<j;i++){
				var btn = result[i],
				_html = "<li><a name=\"" + btn.vc_btn_name + "\" href=\"JavaScript:void(0)\" class=\"hc-datagrid-a hc_datagrid-alink\" onclick=\"" + btn.vc_btn_event + "\">" 
					+ "<i class=\"fa " +btn.vc_btn_class + "\">" 
					+ "</i>" + btn.vc_node_name + "</a></li>";
				btn_html += _html;
			}	
			//添加toolbar上的按钮
			$("#wrap_dataTable > div.u-datagrid-toolbar").find("ul").append(btn_html+buttqueryhtml);
		});
		//20160420 add yexp14058 返本类指令暂时隐藏指令调整的按钮
		if ($.trim(rowdata.c_exec_status) == "已办结") {
			var vc_ext_type = "",
			url = "/am/am/business/getSpecityObject.json", data = "vc_input_name1=l_busin_flag&vc_input_value1="
			+ grid[0].l_busin_flag + "&vc_input_table=businflagconfig";
			query_operate.ajax(url, data, function(result) {
			if (result instanceof Object && result.query) {
				vc_ext_type = result.query.vc_ext_type;
				if (vc_ext_type == '2' || vc_ext_type == '3')
				{
					Horn.getComp("dataTable").hideButton("zltz", true);
				}
			}
			}, ajaxDataType.JSON);
			common_operate.getBusAuthority("dataTable","zl");
		}	
		$("#rightMain").attr("src", "main.htm");
		common_operate.getZlXGBusAuthority("dataTable");
	},// 根据业务标识查询调整业务流程配置
	queryAdjustType : function(rowdata) {
		var show_button_flag = false;
		var url = "/am/am/business/dictate/queryAdjustType.json";
		var data = "l_busin_flag=" + rowdata.l_busin_flag + "&c_business_class=" + rowdata.c_business_class;
		query_operate.ajax(url, data, function(result) {
			if (result && result.businflagconfig) {
				if (!result.businflagconfig.c_process_adjust_type) {
				} else {
					show_button_flag = true;
				}
			} 
//			else {
//				Horn.Tip.warn(result.errorMsg);
//			}
		});
		return show_button_flag;
	}
};
