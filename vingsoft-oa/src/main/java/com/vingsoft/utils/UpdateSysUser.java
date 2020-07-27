package com.vingsoft.utils;

import com.vingsoft.oa.open.doc.entity.SysUser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.subject.Subject;

public class UpdateSysUser {
    /**
     * 切换身份，登录后，动态更改subject的用户属性
     * @param sysUser
     */
    public static void setUser(SysUser sysUser) {
        Subject subject = SecurityUtils.getSubject();
        PrincipalCollection principalCollection = subject.getPrincipals();
        String realmName = principalCollection.getRealmNames().iterator().next();
        PrincipalCollection newPrincipalCollection =
                new SimplePrincipalCollection(sysUser, realmName);
        subject.runAs(newPrincipalCollection);
    }
}
