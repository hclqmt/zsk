package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.oa.open.doc.entity.KnowledgeKeywords;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;


@SqlResource("doc.knowledgeKeywords")
public interface KnowledgeKeywordsDao extends BaseMapper<KnowledgeKeywords> {


	KnowledgeKeywords queryById(@Param("id") Integer id);

}
