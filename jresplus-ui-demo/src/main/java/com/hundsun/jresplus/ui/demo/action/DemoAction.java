package com.hundsun.jresplus.ui.demo.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hundsun.jresplus.ui.page.Page;

@Controller
@RequestMapping("/demo")
public class DemoAction {
	@RequestMapping("/view/{type}/{id}")
	public String demoView(@PathVariable("type") String demoType,@PathVariable("id") String demoId,Page page, ModelMap model){
		model.put("demoType", demoType);
		model.put("demoId", demoId);
		if(demoType.equals("grid")){
			doGrid(page,model);
		}
		if(demoType.equals("datagrid")){
			doDataGrid(page,model);
		}
		return "/demo/view";
	}
	private void doDataGrid(Page page, ModelMap model) {
		List<Map> entities = new ArrayList<Map>();
		for (int i = 0; i < 30; i++) {
			Map e = new HashMap();
			e.put("name1","测试1列");
			e.put("name2","测试2列");
			e.put("name3","测试3列");
			e.put("name4","测试4列");
			e.put("name5","测试5列");
			entities.add(e);
		}
		model.addAttribute("data", entities);
	}
	public void doGrid(Page page, ModelMap mm) {
		List<Map> ls = new ArrayList<Map>();
		Page _page = page;
		int pageSize = _page.getPageSize();
		int count = 30;
		int pages = (count % pageSize == 0) ? (count / pageSize)
				: (count / pageSize) + 1;
		int pageNo = _page.getPageNo();
		if(pageNo>pages){
			pageNo = pages;
		}
		if(pageSize>count){
			pageSize = count;
		}
		if (!StringUtils.isNotBlank(pageNo + "")) {
			pageNo = 1;
			for (int i = 0; i < 10; i++) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("initDate", "01/20/2014");
				map.put("branchNo", "wwwwwww" + i);
				map.put("branchNo", "8888");
				map.put("scanType", "1111");
				map.put("clientId", "124455.985");
				map.put("clientName",
						"张三2014-2-8 11:07:04 org.apache.catalina.core.ApplicationContext log"
								+ "信息: Initializing Spring FrameworkServlet 'jresServlet'"
								+ "2014-2-8 11:07:08 org.apache.catalina.core.StandardContext addApplicationListener ");
				map.put("taskStatus", "1");
				ls.add(map);
			}

		} else {

			for (int i = pageNo; i < (pageNo + pageSize); i++) {
				Map<String, String> map = new HashMap<String, String>();
				map.put("initDate", "01/20/2014");
				map.put("scanType2", "wwwwwww" + i);
				map.put("branchNo", "8888");
				map.put("scanType", "1111");
				map.put("clientId", "124455.985");
				map.put("clientName",
						"张三2014-2-8 11:07:04 org.apache.catalina.core.ApplicationContext logasdasdafafasfafaffgggg");
				map.put("taskStatus", "1");
				ls.add(map);
			}

		}
		page.setPageNo(pageNo);
		page.setPages(pages);
		page.setPageSize(pageSize);
		page.setCount(30);
		mm.put("data", ls);
		mm.put("page", page);
	}
}
