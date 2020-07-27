package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.common.node.content.ColumnTreeNode;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.KnowledgeClassify;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

@SqlResource("doc.knowledge")
public interface DocKnowledgeDao extends BaseMapper<DocKnowledge>{
	
	/**
	 * 根据uuid查询
	 * @param uuid
	 * @return
	 */
	DocKnowledge findByUuid(@Param("uuid") Long uuid);
	
	/**
	 * 
	 * <p>Title: findColumnMenu</p>  
	 * <p>Description: 查询栏目菜单</p>
	 * @param uuid
	 * @return  
	 *
	 */
	List<DTreeNode> getKnowledgeClassifyTree(@Param("uuid") Long uuid);

	List<ColumnTreeNode> findXtColumn();
	
	int findSubsetColumn(@Param("uuid") Long uuid);

	List<KnowledgeClassify> getKnowledgeClassifySecondList(@Param("uuid") Long uuid);

	KnowledgeClassify getKnowledgeClassify(@Param("uuid") Long uuid);

	int getCountByClassifyParentId(@Param("uuid") Long uuid);

	String getLocationByDocClassify(@Param("docClassify") String docClassify);

	List<DocKnowledge> findByDocClassify(@Param("docClassify") String docClassify,@Param("uuid") Long uuid);

	List<DocKnowledge> findByDocValue(@Param("uuid") Long uuid);

	List<DocKnowledge> findKnowledgeList();

	DocKnowledge findKnowledgeByPicIds(@Param("docPicUrlIds") String docPicUrlIds);
}

