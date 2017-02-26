package com.hundsun.jresplus.ui.demo.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
public class AppAction {
	
	@RequestMapping(value = "/demo/query_table/getTableData.htm")
	public @ResponseBody
	List getTableData(int position_str, int request_num, boolean hasPage,String branchNo,
			HttpServletResponse response) throws IOException {
		return toPage(position_str, request_num, hasPage, branchNo);
	}
	@RequestMapping(value = "/demo/page/pageTest.json")
	public @ResponseBody PageDto pageTest() {
		PageDto  page = new PageDto();
		List<User> list = new ArrayList<User>();
		User user = new User();
		user.setUserId(110);
		user.setUserName("张三");
		list.add(user);
		page.setRows(list);
		page.setTotal(1);
		return page;
	}
	@RequestMapping(value = "/demo/query_table/getTableData.json")
	public @ResponseBody
	Map  getTableData2(Integer pageNo) throws IOException {
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map> resultData = new ArrayList<Map>();
			// 不分页
			for (int i = 0; i < 10; i++) {
				Map map = new HashMap();
				map.put("initDate", "20130101");
				map.put("branchNo", i % 4 + "");
				map.put("clientId", "CI" + (i+pageNo*10));
				map.put("clientName", "CN" + (i+pageNo*10));
				map.put("taskStatus", "通过");
				map.put("taskFlag", "1");
				map.put("position_str", i + "");
				map.put("scanType",i+"");
				if(i>5){
					map.put("desc","JRES UI是一套velocity语法编写的宏UI组件，应用在JRESPLUS-MVC的视图开发中，提供通用基础的UI组件和UI扩展体系. ");
				}else{
					
					map.put("desc","JRES UI是一套velocity语法编写的宏UI组件");
				}
				resultData.add(map);
		}
			
		result.put("rows", resultData);
//		Map page = new HashMap();
		result.put("pageSize",10);
		result.put("pages",2);
		result.put("pageNo", 1);
		result.put("total", 20);
//		result.put("pageConfig",page);
		return result;
	}
	
	@RequestMapping(value = "/demo/query_table/myData.json")
	public @ResponseBody
	Map  myData(String url,HttpServletRequest req) throws IOException {
		String name = req.getParameter("name");
		String value = req.getParameter("value");
		Map<String,Object> result = new HashMap<String,Object>();
		Map<String,List<String>> map =new HashMap<String, List<String>>();
		List<String> valueList = new ArrayList<String>();
		valueList.add("20110315");
		valueList.add("20110304");
		valueList.add("20110324");
		valueList.add("20110327");
		valueList.add("20110604");
		valueList.add("20110706");
		valueList.add("20110804");
		valueList.add("20110930");
		map.put(name, valueList);
		
		List<TsysKind> finalResult = new ArrayList<TsysKind>();
		for(int i=0;i<valueList.size();i++){
			String val = valueList.get(i);
			if(val.contains(value)){
				TsysKind tk = new TsysKind();
				tk.setField4(val);
				finalResult.add(tk);
			}
		}
		result.put("rows", finalResult);
		return result;
	}

	
	@RequestMapping(value = "/deployment/server/getServerData.json")
	public @ResponseBody
	Map  getServer() throws IOException {
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map> resultData = new ArrayList<Map>();
		Map map = new HashMap();
		map.put("serverName", "server1");
		map.put("ip", "192.168.94.12");
		map.put("type", "测试环境");
		resultData.add(map);
		map = new HashMap();
		map.put("serverName", "server2");
		map.put("ip", "192.168.94.101");
		map.put("type", "生产环境");
		resultData.add(map);
		result.put("rows", resultData);
//		Map page = new HashMap();
		result.put("pageSize",10);
		result.put("pages",2);
		result.put("pageNo", 1);
		result.put("total", 20);
//		result.put("pageConfig",page);
		return result;
	}
	
	@RequestMapping(value = "/deployment/as/getAsData.json")
	public @ResponseBody
	Map  getAs(String type) throws IOException {
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map> resultData = new ArrayList<Map>();
		String nodeName = "as";
		if(StringUtils.equals(type, "ar")){
			nodeName = "ar";
		}
		if(StringUtils.equals(type, "client")){
			nodeName = "client";
		}
		Map map = new HashMap();
		map.put("nodeName", nodeName+"1");
		map.put("nodeNo", "0");
		map.put("ip", "192.168.53.12");
		map.put("port", "9150");
		resultData.add(map);
		map = new HashMap();
		map.put("nodeName", nodeName+"2");
		map.put("nodeNo", "0");
		map.put("ip", "192.168.53.63");
		map.put("port", "9151");
		resultData.add(map);
		result.put("rows", resultData);
//		Map page = new HashMap();
		result.put("pageSize",10);
		result.put("pages",2);
		result.put("pageNo", 1);
		result.put("total", 20);
//		result.put("pageConfig",page);
		return result;
	}
	@RequestMapping(value = "/demo/query_table/getTableData2.json")
	public @ResponseBody
	Map  getTableData3(int pageNo) throws IOException {
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map> resultData = new ArrayList<Map>();
			// 不分页
			for (int i = 0; i < 10; i++) {
				Map map = new HashMap();
				map.put("initDate", "20140101");
				map.put("branchNo", i % 4 + "");
				map.put("scanType", 1 + "");
				map.put("clientId", "CI" + (i+pageNo*10));
				map.put("clientName", "CN" + (i+pageNo*10));
				map.put("taskStatus", "通过");
				map.put("taskFlag", "1");
				map.put("position_str", i + "");
				map.put("desc","JRES UI是一套velocity语法编写的宏UI组件，应用在JRESPLUS-MVC的视图开发中，提供通用基础的UI组件和UI扩展体系. ");
				resultData.add(map);
		}
		result.put("rows", resultData);
//		Map page = new HashMap();
		result.put("pageSize",10);
		result.put("pages",2);
		result.put("pageNo", 1);
		result.put("total", 20);
//		result.put("pageConfig",page);
		return result;
	}

	private List<Map> toPage(int position_str, int request_num, boolean hasPage, String branchNo) {
		List<Map> result = new ArrayList<Map>();
		if (!hasPage) {
			// 不分页
			for (int i = 0; i < 18; i++) {
				Map map = new HashMap();
				map.put("initDate", "20130101");
				map.put("branchNo", i % 4 + "");
				map.put("scanType", 1 + "");
				map.put("clientId", "CI" + i);
				map.put("clientName", "CN" + i);
				map.put("taskStatus", "通过");
				map.put("taskFlag", "1");
				map.put("position_str", i + "");
				map.put("desc","JRES UI是一套velocity语法编写的宏UI组件，应用在JRESPLUS-MVC的视图开发中，提供通用基础的UI组件和UI扩展体系. ");
				result.add(map);
			}
		} else {
			if (position_str > 0) {
				position_str++;
			}
			for (int i = position_str; i < (position_str + request_num); i++) {
				Map item = new HashMap();
				item.put("initDate", "20130101");
				item.put("branchNo", i % 4 + "");
				item.put("scanType", 1 + "");
				item.put("clientId", "CI" + i);
				item.put("clientName", "CN" + i);
				item.put("taskStatus", "通过");
				item.put("taskFlag", "1");
				item.put("position_str", i + "");
				item.put("desc","JRES UI是一套velocity语法编写的宏UI组件，应用在JRESPLUS-MVC的视图开发中，提供通用基础的UI组件和UI扩展体系. ");
				if (branchNo == null || branchNo.equals("") || item.get("branchNo").equals(branchNo)) {
					result.add(item);
				}
			}
		}
		return result;
	}
	
	@RequestMapping("/demo/app/saveData.htm")
	public void saveData() {
		
	}
	
	@RequestMapping(value = "/demo/datagrid/getDatas.json")
	public @ResponseBody
	Map  getDatas(Integer pageNo) throws IOException {
		Map<String,Object> result = new HashMap<String,Object>();
		List<Map> resultData = new ArrayList<Map>();
			for (int i = 0; i < 10; i++) {
				Map map = new HashMap();
				map.put("operation","");
				String projectName = "测试项目";
				switch (i){ 
					case 0 : projectName = "SXM03"; break; 
					case 1 : projectName = "项目全称阿凡达范德萨范德萨发的撒范德萨范德萨范德萨范德萨发发顺丰005"; break; 
					case 2 : projectName = "测试项目0014"; break; 
					case 3 : projectName = "测试项目0014"; break; 
					case 4 : projectName = "测试项目002"; break; 
					case 5 : projectName = "测试项目名称0013"; break; 
					case 6 : projectName = "测试项目002"; break; 
					case 7 : projectName = "测试项目全称0010"; break; 
					case 8 : projectName = "项目全称001"; break; 
					case 9 : projectName = "测试项目二全称"; break; 
					default : projectName = "测试项目001"+i; break; 
				} 
				map.put("projectName", projectName);
				map.put("projectType", "债权(贷款)");
				String projTotalAmount = "9,999,999,999,999.0";
				if(i>2 && i%2==0){
					projTotalAmount = "999,999,999.00";	
				}else{
					projTotalAmount = "70,000,000.00";
				}
				map.put("projTotalAmount", projTotalAmount);
				map.put("beginDate", "2016050" + i);
				map.put("endDate", "2017120" + i);
				String investAmount = "1.00";
				switch (i){ 
					case 0 : investAmount = "1.00"; break; 
					case 1 : investAmount = "100,000,000.00"; break; 
					case 2 : investAmount = "1,000,000.00"; break; 
					case 3 : investAmount = "1,111.00"; break; 
					case 4 : investAmount = "600,000.00"; break; 
					case 5 : investAmount = "100,000,000.00"; break; 
					case 6 : investAmount = "500,000.00"; break; 
					case 7 : investAmount = "60,000,000.00"; break; 
					case 8 : investAmount = "5,600,000.00"; break; 
					case 9 : investAmount = "12,222,222.00"; break; 
					default : investAmount = "300"+i+".00"; break; 
				} 
				map.put("investAmount", investAmount);//投资金额
				String investDetailCode = "ZQD10011601J";
				switch (i){ 
					case 0 : investDetailCode = "ZQD10011601J"; break; 
					case 1 : investDetailCode = "ZQD10011601I"; break; 
					case 2 : investDetailCode = "ZQD10011601F"; break; 
					case 3 : investDetailCode = "ZQD10011601E"; break; 
					case 4 : investDetailCode = "ZQD10011601B"; break; 
					case 5 : investDetailCode = "ZQD10011601A"; break; 
					case 6 : investDetailCode = "ZQD100116016"; break; 
					case 7 : investDetailCode = "ZQD100116015"; break; 
					case 8 : investDetailCode = "ZQD100116013"; break; 
					case 9 : investDetailCode = "ZQD100116012"; break; 
					default : investDetailCode = "ZQD1001160"+i; break; 
				} 
				map.put("investDetailCode", investDetailCode);//投资明细代码
				String investProperty = "投资";
				if(i==1 || i==2){
					investProperty = "融资";	
				}
				map.put("investProperty",investProperty);//投资性质
				String counterpartyName = "";
				switch (i){ 
					case 0 : counterpartyName = "JJ370015_370015A1_370015组合A1"; break; 
					case 1 : counterpartyName = "中国人寿"; break; 
					case 11 : counterpartyName = "中信银行中国化学工程集团公司企业年金计划海富通组合"; break; 
					case 17 : counterpartyName = "中银日积月累-收益累进"; break; 
					case 18 : counterpartyName = "中银日积月累-收益累进"; break; 
					default : counterpartyName = ""; break; 
				} 
				map.put("counterpartyName",counterpartyName);//对手方名字
				String position = "0.00";
				switch (i){ 
					case 1 : position = "19,999,980.00"; break; 
					case 2 : position = "10,001.00"; break; 
					case 14 : position = "21,001.00"; break; 
					case 17 : position = "50,000.00"; break; 
					default : position = "0.00"; break; 
				} 
				map.put("position",position);//持仓
				String realizedGains = "0.00";
				switch (i){ 
					/*case 1 : realizedGains = "21,280.56"; break; 
					case 5 : realizedGains = "13,940,000.01"; break; */
					default : realizedGains = "0.00"; break; 
				} 
				map.put("realizedGains",realizedGains);//实现收益
				resultData.add(map);
		}
			
		result.put("rows", resultData);
		result.put("pageSize",10);
		result.put("pages",2);
		result.put("pageNo", 1);
		result.put("total", 20);
		return result;
	}
	
	@RequestMapping(value = "/demo/query_table/myData2.json")
	public @ResponseBody
	Map  myData2(String url,HttpServletRequest req) throws IOException {
		String name = req.getParameter("name");
		String value = req.getParameter("value");
		Map<String,Object> result = new HashMap<String,Object>();
		Map<String,List<String>> map =new HashMap<String, List<String>>();
		List<String> valueList = new ArrayList<String>();
		valueList.add("上海");
		valueList.add("北京");
		valueList.add("湖北");
		valueList.add("湖南");
		valueList.add("河南");
		valueList.add("杭州");
		valueList.add("广州");
		valueList.add("西北");
		valueList.add("东北");
		valueList.add("广东");
		valueList.add("河北");
		map.put(name, valueList);
		
		List<String> finalResult = new ArrayList<String>();
		for(int i=0;i<valueList.size();i++){
			String val = valueList.get(i);
			if(val.contains(value)){
				finalResult.add(val);
			}
		}
		result.put("rows", finalResult);
		return result;
	}

}
