var systemInit={
		formQuery:function(){
				$("#btn_init").attr("disabled","true");
				$("#btn_init").css("background-color","gray");
				$("#btn_init").text("正在初始化...");
				$.post("/am/am/init/operation.json", null, function(data) {
								if (data =='ok') {
								    $("#init").hide();
									Horn.Tip.success("初始化成功");
								} 
								else {
									$("#btn_init").removeAttr("disabled");
									$("#btn_init").removeClass("background-color");
									$("#btn_init").text("系统初始化");
								}
			    }, "text");
			}
}