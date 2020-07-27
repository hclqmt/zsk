/**  

* <p>Title: BeetlTagFactoryManager.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月29日  

* @version 1.0  

*/  
package com.vingsoft.common.config.beetl;

import java.util.HashMap;
import java.util.Map;

import org.beetl.core.Tag;
import org.beetl.core.TagFactory;
import org.beetl.ext.spring.SpringBeanTagFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.vingsoft.common.annotation.BeetlTagName;


/**  

* <p>Title: BeetlTagFactoryManager</p>  

* <p>Description: 配置TagFactory管理类</p>  

* @author MrTang

* @date 2018年11月29日  

*/
@Component
public class BeetlTagFactoryManager implements ApplicationContextAware {
	
	private ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

	@Bean(name = "tagFactorys")
    public Map<String, TagFactory> tagFactorys() {
		Map<String, TagFactory> tags = new HashMap<>();
        Map<String, Tag> beans = applicationContext.getBeansOfType(Tag.class);
//        for (String beanName : beans.keySet()) {
//            tags.put(beanName, toSpringBeanTagFactory(beanName));
//        }
        for (String beanName : beans.keySet()) {
            // 读取自定义标签名
            BeetlTagName tagAnno = beans.get(beanName).getClass().getAnnotation(BeetlTagName.class);
            String tagName = tagAnno != null ? tagAnno.value() : beanName;
            tags.put(tagName, toSpringBeanTagFactory(beanName));
        }
        return tags;
    }
	
	private SpringBeanTagFactory toSpringBeanTagFactory(String beanName) {
        SpringBeanTagFactory springBeanTagFactory = new SpringBeanTagFactory();
        springBeanTagFactory.setApplicationContext(applicationContext);
        springBeanTagFactory.setName(beanName);
        return springBeanTagFactory;
    }
}
