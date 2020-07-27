/**  

* <p>Title: CacheRemove.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年12月11日  

* @version 1.0  

*/  
package com.vingsoft.common.config.cache;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**  

* <p>Title: CacheRemove</p>  

* <p>Description: 需要清除的当前类型--当前类</p>  

* @author MrTang

* @date 2018年12月11日  

*/
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CacheRemove {

	/**
     * 需要清除的大类 例如 autocms 所有缓存
     *
     * @return
     */
    String value() default "";
 
 
    /**
     * 需要清除的具体的额类型
     *
     * @return
     */
    String[] key() default {};
    
    /**
     * 
    
     * <p>Title: prefix</p>  
    
     * <p>Description: 前缀</p>  
    
     * @return
     */
    String prefix() default "";
}
