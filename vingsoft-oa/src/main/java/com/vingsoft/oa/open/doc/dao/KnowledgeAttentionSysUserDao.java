package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.KnowledgeAttentionSysUser;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

@SqlResource("doc.knowledgeAttentionSysUser")
public interface KnowledgeAttentionSysUserDao extends BaseMapper<KnowledgeAttentionSysUser> {

    int findCount(@Param("knowledgeUuid") Long knowledgeUuid,@Param("userId") Long userId);

    KnowledgeAttentionSysUser findByOther(@Param("knowledgeUuid") Long knowledgeUuid,@Param("userId") Long userId);
}
