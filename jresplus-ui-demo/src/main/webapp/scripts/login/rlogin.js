/*******************************************************************************
 * 用户重新登陆：弹出登陆框
 */

$(function() {
	//$.idcode.setCode();
	// 登陆错误次数
	errorCount : 0,
	// 弹出登录
	$("#example").hover(function() {
		$(this).stop().animate({
			opacity : '1'
		}, 600);
	}, function() {
		$(this).stop().animate({
			opacity : '0.6'
		}, 1000);
	}).on('click', function() {
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#LoginBox").fadeIn("slow");
	});
	//
	// 按钮的透明度
	$("#loginbtn").hover(function() {
		$(this).stop().animate({
			opacity : '1'
		}, 600);
	}, function() {
		$(this).stop().animate({
			opacity : '0.8'
		}, 1000);
	});

	// 文本框不允许为空---按钮触发
	$("#loginbtn").on('click', function() {
		rlogin.login();
	});
	// 文本框不允许为空---单个文本触发
	$("#vc_op_code").on('blur', function() {
		var vc_op_code = $("#vc_op_code").val();
		if (!vc_op_code) {
			$("#warn").css({
				display : 'block'
			});
		} else {
			$("#warn").css({
				display : 'none'
			});
		}
	});
	$("#vc_op_code").on('focus', function() {
		$("#warn").css({
			display : 'none'
		});
	});
	//
	$("#vc_op_password").on('blur', function() {
		var vc_op_password = $("#vc_op_password").val();
		if (!vc_op_password) {
			$("#warn2").css({
				display : 'block'
			});
		} else {
			$("#warn2").css({
				display : 'none'
			});
		}
	});
	$("#vc_op_password").on('focus', function() {
		$("#warn2").css({
			display : 'none'
		});
	});
	
	// 处理回车事件
	$('#vc_op_code').keydown(function(e) {
		if (e.keyCode == 13) {
			$("#vc_op_password").focus();
		}
	});

	$('#vc_op_password').keydown(function(e) {
		if (e.keyCode == 13) {
//			if (lib.errorCount == 0) {
			rlogin.login();
//			} else {
//				$("#txtidcode").focus();
//			}
		}
	});


});
var rlogin = rlogin || {};

(function(rlogin) {
	rlogin.show = function() {
		$.cookie("locked","false");
		$("body").append("<div id='mask'></div>");
		$("#mask").addClass("mask").fadeIn("slow");
		$("#LoginBox").fadeIn("slow");
	};
	rlogin.login = function() {
		var op_code = $('#vc_op_code').val(), password = $('#vc_op_password')
				.val();

		var b = rlogin.isEmpty($.trim(op_code), $.trim(password));
		if (b) {
			$("#loginbtn").val("登录中...");
			$("#loginbtn").attr("disabled","true");
//			$("#loginbtn").css("background","grey");
			rlogin.ajaxCheck({
				vc_op_code : op_code,
				vc_op_password : password
			});
		}
	};

	rlogin.isEmpty = function(op_code, password) {
		// isBy = $.idcode.validateCode();
		if (!op_code) {
			$("#warn").css({
				display : 'block'
			});
			$('#stip').html("用户名不能为空！");
			return false;
		}
		if (!password) {
			$(".warn2").css({
				display : 'block'
			});
			$('#stip').html("密码不能为空！");
			return false;
		} 

		$('#stip').html("");
		return true;
	};
	
	rlogin.ajaxCheck = function(o) {
		$.post('/am/check.json', o, function(d) {
			rlogin.result(d);
		}, "text");
	};

	rlogin.result =  function(d) {
		switch (d) {
		case 'vc_op_passwordreset':
			window.location.href = '/am/passWordReset.htm';
			break;
		case 'Pass':
			window.location.href = '/am/index.htm';
			break;
		default:
			rlogin.errorCount++;
			//$("#div_idcode").show();
			$('#stip').html(d);
			rlogin.resetButton();
			//$.idcode.setCode();
			break;
		}
	};
	
	rlogin.resetButton = function() {
		$("#loginbtn").val("登录");
		$("#loginbtn").attr("disabled","false");
//		$("#loginbtn").css("background","#4490f7");
	};
})(rlogin);