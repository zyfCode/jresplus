var lib = {
	// 登陆错误次数
	errorCount : 0,
	login : function() {
		var a = $('#vc_op_code').val(), p = $('#vc_op_password').val();

		var b = lib.isEmpty($.trim(a), $.trim(p));
		if (b) {
			$("#login").val("登录中...");
			$("#login").attr("disabled","disabled");
			$("#login").css("background","#DCDCDC");
			$("#login").css("cursor","default");
			lib.ajaxCheck({
				vc_op_code : a,
				vc_op_password : p
			});
		}
	},
	isEmpty : function(a, p) {
		var b = true, isBy = $.idcode.validateCode();

		if (a == '') {
			$('#atips').html('用户名不能为空！');
			b = false;
		} else {
			$('#atips').html('');
		}

		if (p == '') {
			$('#ptips').html('密码不能为空！');
			b = false;
		} else {
			$('#ptips').html('');
		}

		if(lib.errorCount !==0){
			// 验证码
			if (!isBy) {
				$('#ctips').html('请输入正确的验证码！');
				b = false;
			} else {
				$('#ctips').html('');
			}
		}		

		return b;
	},
	ajaxCheck : function(o) {
		$.post('/am/check.json', o, function(d) {
			lib.result(d);
		}, "text");
	},
	result : function(d) {
		switch (d) {
		case 'vc_op_passwordreset':
			$('#atips, #ptips').html('');
			window.location.href = '/am/passWordReset.htm';
			break;
		case 'Pass':
			$('#atips, #ptips').html('');
			window.location.href = '/am/index.htm';
			break;
		case 'timeoutvc_op_passwordreset':
			$('#atips, #ptips').html('');
			break;
		default:
			lib.errorCount++;
			$("#div_idcode").show();
			$('#atips').html(d);
			lib.resetButton();
			$.idcode.setCode();
			break;
		}
	},
	resetButton : function() {
		$("#login").val("登录");
		$("#login").removeAttr("disabled");
		$("#login").css("background","#4169E1");
		$("#login").css("cursor","pointer");
	}
};

function saveLoginAccount() { // 记录登入帐号,踢人时用
	var vc_op_code = $("#vc_op_code").val();
	writeCookie("vc_op_code", vc_op_code, 1);
}

function writeCookie(name, value, days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expires;
}

$(function() {
	$.idcode.setCode();
	$.cookie("locked","false");

	$('#login').click(function() {
		lib.login();
	});

	// 处理回车事件
	$('#vc_op_code').keydown(function(e) {
		if (e.keyCode == 13) {
			$("#vc_op_password").focus();
		}
	});

	$('#vc_op_password').keydown(function(e) {
		if (e.keyCode == 13) {
			if (lib.errorCount == 0) {
				lib.login();
			} else {
				$("#txtidcode").focus();
			}
		}
	});

	$('#txtidcode').keydown(function(e) {
		if (e.keyCode == 13) {
			lib.login();
		}
	});
});
