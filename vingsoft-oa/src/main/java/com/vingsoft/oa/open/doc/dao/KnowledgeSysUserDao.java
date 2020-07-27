package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.KnowledgeSysUser;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

@SqlResource("doc.knowledgesysuser")
public interface KnowledgeSysUserDao extends BaseMapper<KnowledgeSysUser> {

    int findCount(@Param("knowledgeUuid") Long knowledgeUuid,@Param("userId") Long userId,@Param("type") int type);

    KnowledgeSysUser findByOther(@Param("knowledgeUuid") Long knowledgeUuid,@Param("userId") Long userId,@Param("type") int type);

}
