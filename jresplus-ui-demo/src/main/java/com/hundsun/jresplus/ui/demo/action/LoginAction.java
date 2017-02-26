package com.hundsun.jresplus.ui.demo.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hundsun.jresplus.common.util.StringUtil;
import com.hundsun.jresplus.ui.components.checkcode.CheckCodeAgent;

@Controller
public class LoginAction {
	@RequestMapping(value="/login.htm")
	public void login(ModelMap model,HttpSession session,HttpServletRequest request){
		model.put("userName", "admin");
		model.put("password", "123456");
		
	}
	@RequestMapping(value="/submitLogin.htm")
	public String submitLogin(String user_name,String password,String checkCode,String theme,ModelMap model,HttpSession session){
		String errorInfo = "";
		boolean flag = true;
		String code = (String) session.getAttribute(CheckCodeAgent.Check_Code_Agent);
		if(StringUtil.isBlank(user_name)){
			errorInfo = "用户名不能为空";
			flag = false;
		}else if(StringUtil.isBlank(password)){
			errorInfo = "登录密码不能为空";
			flag = false;
		}else if(!StringUtil.equals(code, checkCode)){
			//errorInfo = "验证码不正确";
			//flag = false;
		}else{
			errorInfo = "";
			flag = true;
		}
		
		
		if(!flag){
			model.put("errorInfo", errorInfo);
			return "forward:/login.htm";
		}else{
			model.put("theme", theme);
			return "redirect:/home.htm";
		}
	}
}
