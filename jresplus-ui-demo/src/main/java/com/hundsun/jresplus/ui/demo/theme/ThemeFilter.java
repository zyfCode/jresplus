/*
 * 修改记录
 * 修改时间		修改人		修改记录
 * -------------------------------------------------------------------------------
 * 2014-3-25	XIE			取消运行期压缩合并静态资源的机制，变量上兼容
 */
package com.hundsun.jresplus.ui.demo.theme;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.hundsun.jresplus.common.util.StringUtil;

/**
 * 
 * @author Leo
 * 
 */
//@Component("themeFilter")
public class ThemeFilter extends OncePerRequestFilter implements Filter,
		InitializingBean {
	private final static Logger log = LoggerFactory.getLogger(ThemeFilter.class);
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String reqTheme=request.getParameter("theme");
		if(StringUtil.isNotBlank(reqTheme)){
			request.getSession().setAttribute("theme", reqTheme);
			log.info("theme changed to:"+reqTheme);
		}
		String seTheme=(String)request.getSession().getAttribute("theme");
		if(StringUtil.isNotBlank(seTheme)){
			request.setAttribute("theme", seTheme);
		}
		filterChain.doFilter(request, response);
	}


}
