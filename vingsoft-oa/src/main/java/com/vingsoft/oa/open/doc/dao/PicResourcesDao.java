package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.PicResources;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

@SqlResource("doc.picResources")
public interface PicResourcesDao extends BaseMapper<PicResources> {
    /**
     * 根据uuid查询
     * @param uuid
     * @return
     */
    PicResources findByUuid(@Param("uuid") Long uuid);

    List<PicResources> findByParentUuid(@Param("parentUuid") String parentUuid);
}
