package com.hundsun.jresplus.ui.demo.action;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/** 
 * <p></p>
 * @author: hanyin
 * @since: 10 Mar 2014  15:33:49
 * @history:
 ************************************************
 * @file: FormTestAction.java
 * @Copyright: 2013 恒生电子股份有限公司.
 * All right reserved.
 ************************************************/
@Controller
@RequestMapping("/test/form")
public class FormTestAction {
	private String[] keys = { "key1", "key2", "key3", "key4", "key5", "key6",
			"key7", "key8", "key9", "key10", "key11", "key12", "key13",
			"key14", "key15" };
	// 后台绑定值
	private String[] bindValues = { "绑定值-textfield", "绑定值-hidden",
			"绑定值-password", "绑定值-passwordgroup", "绑定值-label", "绑定值-textarea",
			"20140503", "19861205", "19861206", "2", "6", "", "1,3", "B", "1" };

	@RequestMapping(value = "bind_data1.htm", method = RequestMethod.GET)
	public void get_testcase000(Model model) {
	}

	@RequestMapping(value = "bind_server_data1.htm", method = RequestMethod.GET)
	public void get_testcase001(Model model) {
		for (int i = 0; i < keys.length; i++) {
			model.addAttribute(keys[i], bindValues[i]);
		}
	}

	@RequestMapping(value = "submit.htm", method = RequestMethod.POST)
	public String testcase001_submit(Map<String, String> map,HttpServletRequest req, Model model) {
		model.addAttribute("keys", map);
		return "forward:/test/form/view.htm";
	}

	@RequestMapping(value = "submitForm.htm", method = RequestMethod.POST)
	public String formSubmit(FormData form) {
		if ("1".equals(form.getKey1())) {
			return "redirect:/other.htm";
		}
		return "redirect:/success.htm";
	}

	@RequestMapping(value = "submitForm.json", method = RequestMethod.POST)
	public @ResponseBody
	Map<String, String> formAjaxSubmit(FormData form) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("success", "true");
		return map;
	}
}
