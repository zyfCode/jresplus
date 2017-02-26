var bussinessConfig={
		//业务流程提交()
		bussinessCommit:function (){
			var c_business_class = $("#c_business_class").val();
			// 循环取数据，拼接成josn格式数据，传到后台转换成对象
			var arrAuth = [];
			$("tbody > tr").each(
					function() {
						var auth = "{'";
		
						var $this = $(this);
						var l_busin_flag = $this.find("td:eq(0)").text();
						var c_business_class = $this.find("td:eq(4)").text();						
						var c_process_type = $this.find("td:eq(2) > div").find("input:eq(0)").val();						
						var c_process_adjust_type = $this.find("td:eq(3) > div").find("input:eq(0)").val() || "";						
						
						auth = auth + "l_busin_flag':'" + l_busin_flag
								+ "','c_business_class':'"+ c_business_class 
								+ "','c_process_type':'"+ c_process_type //业务流程配置
								+ "','c_process_adjust_type':'"+ c_process_adjust_type //指令调整、作废业务流程配置
								+ "'}";
						arrAuth.push(auth);
					});
						// 提交
				var data = "l_function_no=" + functionIds.busCfgUpd + "&auths=" + arrAuth.join("|");
				var url = "/am/am/system/bussinessConfig/bussinessCommit.json?c_business_class=" + c_business_class;
				TDialog.Msg.confirm("确认", "请您确认是否提交？", function() {
				var dialog = common_operate.getDialog();
				dialog.dialog("open");
				$.post(url, data, function(result) {
					dialog.dialog("close");
					if (result == ajaxCallBackCode.OK) {
						TDialog.Msg.alert("提示", "提交成功", function() {
							common_operate.refreshUrl("bussinessConfig");
							//window.parent.Horn.Frame.screen.closeCurrent();
						}); 
					} 
				}, "text");
				}, function() {});
		}
};