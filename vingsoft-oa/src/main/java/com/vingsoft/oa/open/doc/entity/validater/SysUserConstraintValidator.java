package com.vingsoft.oa.open.doc.entity.validater;
 

import com.vingsoft.oa.open.doc.entity.SysUser;
import com.vingsoft.oa.open.doc.service.SysUserService;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
 
/**
 * 

* <p>Title: SysUserConstraintValidator</p>  

* <p>Description: 用户校验器</p>  

* @author MrTang

* @date 2018年12月27日
 */
public class SysUserConstraintValidator implements ConstraintValidator<SysUserConstraint, Object> {

	@Autowired
	private SysUserService sysUserService;
	
    private String firstFieldName;
    private String secondFieldName;
 
    @Override
    public void initialize(final SysUserConstraint constraintAnnotation) {
        firstFieldName = constraintAnnotation.first();
        secondFieldName = constraintAnnotation.second();
    }
 
    @Override
    public boolean isValid(final Object value, final ConstraintValidatorContext context) {
        try {
            final Object firstObj = BeanUtils.getProperty(value, firstFieldName);
            final Object secondObj = BeanUtils.getProperty(value, secondFieldName);
            
            //第一个参数为空，表示新增
            SysUser user = sysUserService.findUserByUsername(secondObj.toString());
            if(firstObj==null&&user!=null) {
            	//user不等于空，表示已占用
            	return false;
            } else if(user!=null) {
            	//验证用户id是否是当前用户
            	int id = user.getId();
            	int newId = Integer.parseInt(firstObj.toString());
            	if(id!=newId) {
            		return false;
            	}
            }
        } catch (final Exception e) {
            e.printStackTrace();
        }
        return true;
    }
}
