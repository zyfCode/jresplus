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
public class CountryDictStore implements DictStore ,InitializingBean{
	private static final String COUNTRY = "country";
	private String[] countries = { "中国", "美国", "英国", "日本" };
	LinkedHashMap<String,SimpleDictEntry> map=new LinkedHashMap<String,SimpleDictEntry>();

	public String getDictName() {
		return COUNTRY;
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
		for (int i = 0; i < countries.length; i++) {
			map.put("" + i, new SimpleDictEntry(""+i,countries[i]));
		}
	}

}
