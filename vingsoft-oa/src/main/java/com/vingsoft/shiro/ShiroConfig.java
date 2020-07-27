package com.vingsoft.shiro;

import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.ehcache.EhCacheManager;
import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;

import javax.servlet.Filter;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * shiro框架配置
 */
@Configuration
public class ShiroConfig {

    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean shiroFilter(@Qualifier("securityManager") SecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
        shiroFilter.setSecurityManager(securityManager);
        // 登录配置
        shiroFilter.setLoginUrl("/openIndex");
        shiroFilter.setSuccessUrl("/openIndex");
        shiroFilter.setUnauthorizedUrl("/error?code=403");//无权限跳转url
        // 自定义过滤器
        Map<String, Filter> filtersMap = new LinkedHashMap<>();
        filtersMap.put("mlfc", jwtFilter());
        shiroFilter.setFilters(filtersMap);
        // 拦截配置
        Map<String, String> filterChainDefinitions = new LinkedHashMap<>();
        filterChainDefinitions.put("/doc/sysUser/open/**", "anon");
        filterChainDefinitions.put("/*.html","anon");
        filterChainDefinitions.put("/assets/**","anon");
        filterChainDefinitions.put("/js/**","anon");
        filterChainDefinitions.put("/fonts/**","anon");
        filterChainDefinitions.put("/layui/**","anon");
        filterChainDefinitions.put("/bootstrap/**","anon");
        filterChainDefinitions.put("/css/**","anon");
        filterChainDefinitions.put("/modular/**","anon");
        filterChainDefinitions.put("/plugins/**","anon");
        filterChainDefinitions.put("/images/*","anon");
        filterChainDefinitions.put("/favicon.ico","anon");
        filterChainDefinitions.put("/openIndex/**", "anon");
        filterChainDefinitions.put("/open/doc/**", "anon");
        filterChainDefinitions.put("/login", "anon");
        filterChainDefinitions.put("/loginInfo", "anon");
        filterChainDefinitions.put("/register", "anon");
        filterChainDefinitions.put("/redisterInfo", "anon");
        filterChainDefinitions.put("/logout", "logout");
        filterChainDefinitions.put("/doc/knowledge/**", "anon");
        filterChainDefinitions.put("/doc/praise/**", "anon");
        filterChainDefinitions.put("/doc/sysUser/**", "anon");
        filterChainDefinitions.put("/**", "mlfc,authc");

        shiroFilter.setFilterChainDefinitionMap(filterChainDefinitions);
        return shiroFilter;
    }
    @Bean
    public JWTFilter jwtFilter(){
        return new JWTFilter();
    }

    @Bean(name = "userRealm")
    public UserRealm userRealm() {
        UserRealm userRealm = new UserRealm();
        userRealm.setCredentialsMatcher(credentialsMatcher());
        return userRealm;
    }

    @Bean(name = "cacheManager")
    public EhCacheManager cacheManager() {
        EhCacheManager cacheManager = new EhCacheManager();
        cacheManager.setCacheManagerConfigFile("classpath:shiro/ehcache-shiro.xml");
        return cacheManager;
    }
//    @Bean(name = "securityManager")
//    public SecurityManager securityManager(@Qualifier("userRealm") UserRealm userRealm) {
//        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
//        securityManager.setRealm(userRealm);
//        securityManager.setCacheManager(cacheManager());
//        return securityManager;
//    }
    @Bean("securityManager")
    public DefaultWebSecurityManager getManager() {
        return new DefaultWebSecurityManager();
    }
    @EventListener
    public void handleContextRefresh(ContextRefreshedEvent event) {
        ApplicationContext context = event.getApplicationContext();
        DefaultWebSecurityManager manager = (DefaultWebSecurityManager) context.getBean("securityManager");
        UserRealm userRealm = (UserRealm) context.getBean("userRealm");
//        EhCacheManager cacheManager=(EhCacheManager)context.getBean("cacheManager");
//        manager.setAuthorizer(authorizer());
        manager.setRealm(userRealm);
//        manager.setCacheManager(cacheManager);
    }



    @Bean(name = "credentialsMatcher")
    public HashedCredentialsMatcher credentialsMatcher() {
        HashedCredentialsMatcher credentialsMatcher = new HashedCredentialsMatcher();
        credentialsMatcher.setHashAlgorithmName("md5");  // 散列算法
        credentialsMatcher.setHashIterations(3);  // 散列次数
        //credentialsMatcher.setHashSalted(true);
        return credentialsMatcher;
    }

    @Bean(name = "lifecycleBeanPostProcessor")
    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        LifecycleBeanPostProcessor lifecycleBeanPostProcessor = new LifecycleBeanPostProcessor();
        return lifecycleBeanPostProcessor;
    }

    @Bean(name = "defaultAdvisorAutoProxyCreator")
    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
        DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator = new DefaultAdvisorAutoProxyCreator();
        defaultAdvisorAutoProxyCreator.setProxyTargetClass(true);
        return defaultAdvisorAutoProxyCreator;
    }

    @Bean(name = "authorizationAttributeSourceAdvisor")
    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(@Qualifier("securityManager") SecurityManager securityManager) {
        AuthorizationAttributeSourceAdvisor sourceAdvisor = new AuthorizationAttributeSourceAdvisor();
        sourceAdvisor.setSecurityManager(securityManager);
        return sourceAdvisor;
    }



}
