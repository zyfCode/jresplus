package com.hundsun.jresplus.ui.components.checkcode;

import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class CheckCodeImageProducer {

	private static Random random = new Random();

	@RequestMapping("/horn/checkCode/get.htm")
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response,
			@RequestParam(value = "width", defaultValue = "100") int width,
			@RequestParam(value = "height", defaultValue = "30") int height)
			throws Exception {
		response.setContentType("image/jpeg");
		String randomString = String.valueOf(random.nextInt(9000) + 1000);
		request.getSession(true).setAttribute(CheckCodeAgent.Check_Code_Agent,
				randomString);
		preventCaching(response);
		ImageBuilder.buildImage(response.getOutputStream(), width, height,
				randomString);
		return null;
	}

	private void preventCaching(HttpServletResponse response) {
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
	}
}
