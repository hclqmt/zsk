package com.vingsoft.oa.open.doc.entity.validater;
 
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * 

* <p>Title: SysUserConstraint</p>  

* <p>Description: 用户注解</p>  

* <P>eg:@SysUserConstraint.List({<br>@SysUserConstraint(first = "id", second = "nickname", message = "昵称已被占用"),<br>@SysUserConstraint(first = "id", second = "username", message = "登录名已被占用")<br>})</p>

* @author MrTang

* @date 2018年12月27日
 */

@Target({TYPE, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = SysUserConstraintValidator.class)
@Documented
public @interface SysUserConstraint {
    String message() default "{constraints.fieldmatch}";
 
    Class<?>[] groups() default {};
 
    Class<? extends Payload>[] payload() default {};
 
    /**
     * @return The first field
     */
    String first();
 
    /**
     * @return The second field
     */
    String second();
 
    /**
     * Defines several <code>@SysUserConstraint</code> annotations on the same element
     *
     * @see SysUserConstraint
     */
    @Target({TYPE, ANNOTATION_TYPE})
    @Retention(RUNTIME)
    @Documented
            @interface List
    {
        SysUserConstraint[] value();
    }
}
