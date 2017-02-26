package com.hundsun.jresplus.ui.demo.theme;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.hundsun.jresplus.web.nosession.cookie.AttributeCookieStore;
import com.hundsun.jresplus.web.nosession.cookie.CookiesManager;
import com.hundsun.jresplus.web.nosession.cookie.Encode;
@Component
public class ThemeCookieStore implements AttributeCookieStore {
	@Value("${session.max.inacterval}")
	private int maxInactiveInterval = -1;
	private static Set<String> attributeNames = new HashSet<String>();

	static {
		attributeNames.add("theme");
	}
	public int getOrder() {
		return 10;
	}
	@Autowired
	private Encode cookiesEncode;

	@Autowired
	private CookiesManager cookiesManager;
	public Set<String> getAttributeNames() {
		return attributeNames;
	}

	public String getCookieName() {
		return "_tm_";
	}

	public String getDomain() {
		return null;
	}

	public Encode getEncode() {
		return cookiesEncode;
	}

	public int getMaxInactiveInterval() {
		return maxInactiveInterval;
	}

	public String getPath() {
		return "/";
	}

	public boolean isMatch(String arg0) {
		return attributeNames.contains(arg0);
	}

}
