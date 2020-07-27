/**  

* <p>Title: BeetlTagName.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月29日  

* @version 1.0  

*/  
package com.vingsoft.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**  

* <p>Title: BeetlTagName</p>  

* <p>Description: Beetl自定义标签命名</p>  

* @author MrTang

* @date 2018年11月29日  

*/
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface BeetlTagName {

	/**
     * 标签名称
     */
    String value() default "";
}
