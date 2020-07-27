/**  

* <p>Title: BeetlConfiguration.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月29日  

* @version 1.0  

*/  
package com.vingsoft.oa.config.beetl;

import java.io.IOException;
import java.util.Map;

import org.beetl.core.TagFactory;
import org.beetl.core.resource.ClasspathResourceLoader;
import org.beetl.ext.spring.BeetlGroupUtilConfiguration;
import org.beetl.ext.spring.BeetlSpringViewResolver;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**  

* <p>Title: BeetlConfiguration</p>  

* <p>Description: </p>  

* @author MrTang

* @date 2018年11月29日  

*/
@Configuration
public class BeetlConfiguration {

	//=============以下是beetl配置=========================
    @Bean(initMethod = "init", name = "beetlConfig")
    public BeetlGroupUtilConfiguration getBeetlGroupUtilConfiguration(@Qualifier("tagFactorys") 
    																	Map<String, TagFactory> tagFactorys) throws IOException {
        
    	BeetlGroupUtilConfiguration beetlGroupUtilConfiguration = new BeetlGroupUtilConfiguration();
    	// classPathLoader 配置root路径是关键
        ClasspathResourceLoader classPathLoader= new ClasspathResourceLoader("view/");
        beetlGroupUtilConfiguration.setResourceLoader(classPathLoader);
        beetlGroupUtilConfiguration.setTagFactorys(tagFactorys);
        //读取配置文件信息
        return beetlGroupUtilConfiguration;
    }
    
    @Bean(name = "beetlViewResolver")
    public BeetlSpringViewResolver getBeetlSpringViewResolver(@Qualifier("beetlConfig") 
    															BeetlGroupUtilConfiguration beetlGroupUtilConfiguration) {
        BeetlSpringViewResolver beetlSpringViewResolver = new BeetlSpringViewResolver();
        beetlSpringViewResolver.setSuffix(".html");
        beetlSpringViewResolver.setContentType("text/html;charset=UTF-8");
        beetlSpringViewResolver.setOrder(0);
        beetlSpringViewResolver.setConfig(beetlGroupUtilConfiguration);
        return beetlSpringViewResolver;
    }
}
