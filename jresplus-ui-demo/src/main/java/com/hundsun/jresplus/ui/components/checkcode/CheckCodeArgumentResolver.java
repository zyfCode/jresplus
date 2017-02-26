package com.hundsun.jresplus.ui.components.checkcode;

import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.RequestAttributes;

@Component
public class CheckCodeArgumentResolver implements WebArgumentResolver {

	public Object resolveArgument(MethodParameter methodParameter,
			NativeWebRequest nativeWebRequest) throws Exception {
		if (methodParameter.getParameterType().equals(CheckCodeAgent.class)) {
			return new CheckCodeAgent((String) nativeWebRequest.getAttribute(
					CheckCodeAgent.Check_Code_Agent,
					RequestAttributes.SCOPE_SESSION));
		}
		return UNRESOLVED;
	}

}
