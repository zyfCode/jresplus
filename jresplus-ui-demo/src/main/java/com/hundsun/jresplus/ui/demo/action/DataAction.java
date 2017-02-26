package com.hundsun.jresplus.ui.demo.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
@Controller
public class DataAction {
	@RequestMapping(value="/datagrid/data.json")
	public @ResponseBody Map data() {
		Map data = new HashMap();
		List<Map> es = new ArrayList<Map>();
		for (int i = 0; i < 30; i++) {
			Map e = new HashMap();
			e.put("name1","ajax测试1列");
			e.put("name2","ajax测试2列");
			e.put("name3","ajax测试3列");
			e.put("name4","ajax测试4列");
			e.put("name5","ajax测试5列");
			es.add(e);
		}
		data.put("rows", es);
		data.put("total", 30);
		data.put("pageSize",10);
		data.put("pageNo",3);
		data.put("pages",3);
		return data;
	}
	
	@RequestMapping(value="/datagrid/data2.json")
	public @ResponseBody Map data2() {
		Map data2 = new HashMap();
		List<Map> es = new ArrayList<Map>();
		for (int i = 0; i < 10; i++) {
			Map e = new HashMap();
			e.put("operate_ype","");
			e.put("vc_stock_code","001"+i);
			e.put("vc_stock_name","2441");
			e.put("l_begin_date","NO"+i);
			e.put("dep","MSF");
			e.put("type","ajax测试333列");
			e.put("begin_date","2016-03-18");
			e.put("detl","备注信息");
			es.add(e);
		}
		data2.put("rows", es);
		data2.put("total", 24);
		data2.put("pageSize",10);
		data2.put("pageNo",3);
		data2.put("pages",3);
		return data2;
	}
}
