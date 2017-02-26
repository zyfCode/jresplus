package com.hundsun.jresplus.ui.components.checkcode;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.hundsun.jresplus.web.nosession.cookie.AttributeCookieStore;
import com.hundsun.jresplus.web.nosession.cookie.CookiesManager;
import com.hundsun.jresplus.web.nosession.cookie.Encode;

@Component
public class CheckCodeAttributeStore implements AttributeCookieStore {

	@Value("${session.max.inacterval}")
	private int maxInactiveInterval = -1;

	private static Set<String> attributeNames = new HashSet<String>();

	static {
		attributeNames.add(CheckCodeAgent.Check_Code_Agent);
	}

	@Autowired
	private Encode cookiesEncode;

	@Autowired
	private CookiesManager cookiesManager;

	public Set<String> getAttributeNames() {
		return attributeNames;
	}

	public boolean isMatch(String key) {
		return attributeNames.contains(key);
	}

	public int getOrder() {
		return 100;
	}

	public String getCookieName() {
		return "_c";
	}

	public int getMaxInactiveInterval() {
		return maxInactiveInterval;
	}

	public String getPath() {
		return "/";
	}

	public Encode getEncode() {
		return cookiesEncode;
	}

	public String getDomain() {
		return null;
	}
}
