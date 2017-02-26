package com.hundsun.jresplus.ui.demo.dict;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import com.hundsun.jresplus.base.dict.DictEntry;
import com.hundsun.jresplus.base.dict.DictStore;
import com.hundsun.jresplus.base.dict.SimpleDictEntry;



@Component
public class ProvinceDictStore implements DictStore,InitializingBean {
	private static final String PROVINCE = "province";
	private static final Logger logger=LoggerFactory.getLogger(ProvinceDictStore.class);
	LinkedHashMap<String,SimpleDictEntry> map=new LinkedHashMap<String,SimpleDictEntry>();
	private String[] provinces = { "北京", "上海", "天津", "重庆", "黑龙江省", "吉林省",
			"辽宁省", "江苏省", "山东省", "安徽省", "河北省", "河南省", "湖北省", "湖南省", "江西省",
			"陕西省", "山西省", "四川省", "青海省", "海南省", "广东省", "贵州省", "浙江省", "福建省",
			"台湾省", "甘肃省", "云南省", "内蒙古自治区", "宁夏回族自治区", "新疆维吾尔自治区", "西藏自治区",
			"广西壮族自治区", "香港特别行政区", "澳门特别行政" };
	public String getDictName() {
		return PROVINCE;
	}

	public  List<DictEntry> getAllDictData() {
		
		List<DictEntry> list=new ArrayList<DictEntry>();
		list.addAll(map.values());
		return list;
	}

	public DictEntry getDictData(String label) {
		return map.get(label);
	}


	public void afterPropertiesSet() throws Exception {
		for (int i = 0; i < provinces.length; i++) {
			map.put("" + i, new SimpleDictEntry(""+i,provinces[i]));
		}
	}

}
