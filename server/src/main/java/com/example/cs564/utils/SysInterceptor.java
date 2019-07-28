package com.example.cs564.utils;

import com.example.cs564.entity.CheckResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SysInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(SysInterceptor.class);

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if (handler instanceof HandlerMethod) {
            String authHeader = request.getHeader("token");
            if (StringUtils.isEmpty(authHeader)) {
                logger.info("Token does not exist.");
                return false;
            } else {
                CheckResult checkResult = JwtUtils.validateJWT(authHeader);
                if (checkResult.isSuccess()) {
                    return true;
                }
                switch (checkResult.getErrCode()) {
                    case SystemConstant.JWT_ERRCODE_FAIL:
                        logger.info("JWT validation failed.");
                        break;
                    case SystemConstant.JWT_ERRCODE_EXPIRE:
                        logger.info("JWT validation expired");
                    default:
                        break;
                }
                return false;
            }
        }
        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        if(response.getStatus()==500){
            modelAndView.setViewName("/error/500");
        }else if(response.getStatus()==404){
            modelAndView.setViewName("/error/404");
        }
    }
}