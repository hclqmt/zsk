/**  

* <p>Title: OaApplication.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月21日  

* @version 1.0  

*/
package com.vingsoft;

import com.vingsoft.fileManage.ossService.EnableOssService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 
 * <p>
 * Title: OaApplication
 * </p>
 * 
 * <p>
 * Description: 項目啓動
 * </p>
 * 
 * @author MrTang
 * 
 * @date 2018年11月21日
 * 
 */
@EnableOssService
@SpringBootApplication
@EnableScheduling
public class OaApplication  extends SpringBootServletInitializer {

	protected final static Logger logger = LoggerFactory.getLogger(OaApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(OaApplication.class, args);
		logger.info("Oa Application is sussess!");
	}
	
	@Override  
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {  
        return builder.sources(OaApplication.class);  
    }
	@Bean
	public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {

		PropertySourcesPlaceholderConfigurer c = new PropertySourcesPlaceholderConfigurer();

		c.setIgnoreUnresolvablePlaceholders(true);

		return c;
	}

}
