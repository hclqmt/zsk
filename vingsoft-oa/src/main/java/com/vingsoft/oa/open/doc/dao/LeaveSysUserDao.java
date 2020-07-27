package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.LeaveSysUser;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

@SqlResource("doc.leaveSysUser")
public interface LeaveSysUserDao extends BaseMapper<LeaveSysUser> {

    int findCount(@Param("leaveMessageId") Long leaveMessageId,@Param("userId") Long userId,@Param("type") int type);

    LeaveSysUser findByOther(@Param("leaveMessageId") Long leaveMessageId,@Param("userId") Long userId,@Param("type") int type);

}
