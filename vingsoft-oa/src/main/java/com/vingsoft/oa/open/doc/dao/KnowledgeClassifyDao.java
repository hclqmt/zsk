package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.oa.open.doc.entity.KnowledgeClassify;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;



@SqlResource("doc.knowledgeClassify")
public interface KnowledgeClassifyDao extends BaseMapper<KnowledgeClassify> {


	List<KnowledgeClassify> queryByPid(@Param("classifyParentUuid") String classifyParentUuid);

	List<DTreeNode> getClassifyTree();

	KnowledgeClassify getRoot(@Param("classifyParentUuid") String classifyParentUuid);
    
}
