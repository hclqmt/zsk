package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.KnowledgeSysUser;
import com.vingsoft.oa.open.doc.entity.PraiseSysUser;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

@SqlResource("doc.praisesysuser")
public interface PraiseSysUserDao extends BaseMapper<PraiseSysUser> {

    int findCount(@Param("knowledgeUuid") Long knowledgeUuid,@Param("userId") Long userId);

    PraiseSysUser findByOther(@Param("knowledgeUuid") Long knowledgeUuid,@Param("userId") Long userId);
}
