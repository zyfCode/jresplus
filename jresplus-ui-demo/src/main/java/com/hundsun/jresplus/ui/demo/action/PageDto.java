package com.hundsun.jresplus.ui.demo.action;

import java.util.ArrayList;
import java.util.List;

public class PageDto {
	
	private Integer total;
	private List<User> rows = new ArrayList<User>();
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public List<User> getRows() {
		return rows;
	}
	public void setRows(List<User> rows) {
		this.rows = rows;
	}
	

}
