package com.hundsun.jresplus.ui.demo.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hundsun.jresplus.common.util.DateUtil;
import com.hundsun.jresplus.ui.components.checkcode.CheckCodeAgent;

@Controller
@RequestMapping("/zhou")
public class TestAction {
	@RequestMapping(value="/test.htm")
	public void test(User user,ModelMap model,HttpServletRequest request){
		user =new User();
		user.setUserId(1111);
		model.put("user", user);
		HttpSession session = request.getSession();
		String checkcode = (String) session.getAttribute(CheckCodeAgent.Check_Code_Agent);
		System.out.println(checkcode);
	}
	@RequestMapping(value="/add.htm")
	public void add(Integer id,ModelMap model){
		System.out.println(id);
		model.put("id", id);
	}
	@RequestMapping(value="/getUser.json")
	public @ResponseBody Map getUser(Integer id,ModelMap model){
		Map map = new HashMap();
		map.put("userId", "111");
		map.put("userName", "张三");
		return map;
	}
	
	@RequestMapping(value="/upload.json")
	public @ResponseBody Map uplod(HttpServletRequest request, HttpServletResponse response,ModelMap model){
		   Map map = new HashMap();
	        DiskFileItemFactory factory = new DiskFileItemFactory();
	        String path = request.getRealPath("/file");
	        factory.setRepository(new File(path));
	        factory.setSizeThreshold(1024*1024) ;
	        ServletFileUpload upload = new ServletFileUpload(factory);
	        try {
	            //可以上传多个文件
	            List<FileItem> list = (List<FileItem>)upload.parseRequest(request);
	            for(FileItem item : list){
	                if(!item.isFormField()){
	                    String name = item.getName() ;
	                    String fileSuffix  = name.substring(name.lastIndexOf(".")+1,name.length());
	                    String oldName = name.replaceAll("." + fileSuffix,"");
	                    String fileName = DateUtil.getTimeNow(new Date());
	                    String newName = fileName + "." + fileSuffix;
	                    OutputStream out = new FileOutputStream(new File(path,newName));
	                    InputStream in = item.getInputStream() ;
	                    int length = 0 ;
	                    byte [] buf = new byte[1024] ;
	                    while( (length = in.read(buf) ) != -1){
	                        out.write(buf, 0, length);
	                    }
	                    in.close();
	                    out.close();
	                    /**将上传处理后的数据返回**/
	                    map.put("fileSuffix",fileSuffix);
	                    map.put("fileName",oldName);
	                    map.put("filePath",fileName);
	                    break;
	                }
	            }
	        }catch (Exception e) {
	            System.out.println("出错了：" + e.getMessage());
	        }
		
		return map;
	}
	@RequestMapping(value="/getUserList.json")
	public @ResponseBody PageDto getUserList(Integer id,ModelMap model){
		PageDto page = new PageDto();
		page.setTotal(1000);
		List<User> list = new ArrayList<User>();
		User user = new User();
		user.setUserId(1);
		user.setUserName("张三");
		list.add(user);
		page.setRows(list);
		return page;
	}
}
