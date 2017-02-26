package com.hundsun.jresplus.ui.demo.servlet;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hundsun.jresplus.ui.components.checkcode.CheckCodeAgent;
 
 public class ImageServlet extends HttpServlet
 {
   private int width = 60;
 
   private int height = 20;
 
   private int codeCount = 4;
 
   private int lineCount = 10;
   private static final long serialVersionUID = 1L;
 
   protected void doGet(HttpServletRequest req, HttpServletResponse resp)
     throws ServletException, IOException
   {
     super.doGet(req, resp);
   }
 
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
   {
     doGet(req, resp);
   }
 
   protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
   {
     response.setContentType("image/jpeg");
     HttpSession session = request.getSession();
	  String checkcode = (String) session.getAttribute(CheckCodeAgent.Check_Code_Agent);
	 System.out.println(checkcode);
     session.setAttribute("randCode", "123456");
     
   }
 
   public void init()
     throws ServletException
   {
     super.init();
 
     String imageWidth = getInitParameter("imageWidth");
     this.width = Integer.parseInt((null == imageWidth) || ("".equals(imageWidth)) ? "60" : imageWidth);
 
     String imageHeight = getInitParameter("imageHeight");
     this.height = Integer.parseInt((null == imageHeight) || ("".equals(imageHeight)) ? "20" : imageHeight);
 
     String imageCodeCount = getInitParameter("codeCount");
     this.codeCount = Integer.parseInt((null == imageCodeCount) || ("".equals(imageCodeCount)) ? "4" : imageCodeCount);
 
     String imageLineCount = getInitParameter("lineCount");
     this.lineCount = Integer.parseInt((null == imageLineCount) || ("".equals(imageLineCount)) ? "10" : imageLineCount);
   }
 
   public void init(ServletConfig config)
     throws ServletException
   {
     super.init(config);
   }
 }

