package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.oa.open.doc.entity.KnowledgePraise;
import com.vingsoft.oa.open.doc.entity.PraiseReply;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

@SqlResource("doc.praiseReply")
public interface PraiseReplyDao extends BaseMapper<PraiseReply> {

    /**
     * 根据id查询
     * @param id
     * @return
     */
    PraiseReply findByPraiseId(@Param("id") Long id);

    int findCountByPraiseId(@Param("praiseId") Long praiseId);

    List<PraiseReply> findList(@Param("praiseId") Long praiseId);
}
