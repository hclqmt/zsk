package com.vingsoft.common.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


/**
 * 

* <p>Title: Dept</p>  

* <p>Description: 用来标注部门字段，可以根据部门id查询出部门名称</p>  

* @author MrTang

* @date 2018年12月21日
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Dept {

    /**
     * 类型
     *
     * @return
     */
    public String type() default "";

    /**
     * 默认值
     *
     * @return
     */
    public String defaultDisplay() default "";

    /**
     * 部门名称的后缀
     *
     * @return
     */
    public String suffix() default "_Name";
}
