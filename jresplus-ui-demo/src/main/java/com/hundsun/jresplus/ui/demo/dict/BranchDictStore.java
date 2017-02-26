package com.hundsun.jresplus.ui.demo.dict;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import com.hundsun.jresplus.base.dict.DictEntry;
import com.hundsun.jresplus.base.dict.DictStore;
import com.hundsun.jresplus.base.dict.SimpleDictEntry;

@Component
public class BranchDictStore implements DictStore ,InitializingBean {
	
	private static final String BRANCH = "branch";
	private String[] branchs = { "杭州", "宁波", "金华", "台州"};
	LinkedHashMap<String,SimpleDictEntry> map = new LinkedHashMap<String,SimpleDictEntry>();

	public void afterPropertiesSet() throws Exception {
		for (int i = 0; i < branchs.length; i++) {
			map.put("" + i, new SimpleDictEntry("" + i, branchs[i]));
		}
		
	}

	public String getDictName() {
		return BRANCH;
	}

	public List<DictEntry> getAllDictData() {
		List<DictEntry> list=new ArrayList<DictEntry>();
		list.addAll(map.values());
		return list;
	}

	public DictEntry getDictData(String label) {
		return map.get(label);
	}

}
