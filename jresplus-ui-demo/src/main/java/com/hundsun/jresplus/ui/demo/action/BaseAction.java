package com.hundsun.jresplus.ui.demo.action;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;

public class BaseAction {
	@Autowired
	public HttpSession session;

	public void setSession(HttpSession session) {
		this.session = session;
	}
	
	
}
