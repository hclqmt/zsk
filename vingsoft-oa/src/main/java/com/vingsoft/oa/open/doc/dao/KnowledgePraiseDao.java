package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.oa.open.doc.entity.KnowledgePraise;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

@SqlResource("doc.knowledgePraise")
public interface KnowledgePraiseDao extends BaseMapper<KnowledgePraise> {


    /**
     * 根据id查询
     * @param praiseId
     * @return
     */

    KnowledgePraise findByPraiseId(@Param("id") Long praiseId);

    int findCountByKnowledgeUuid(@Param("knowledgeUuid") Long knowledgeUuid);

    int findCountByValue(@Param("knowledgeUuid") Long knowledgeUuid,@Param("lastId") Integer lastId);
}
