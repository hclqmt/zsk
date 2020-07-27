package com.vingsoft.oa.open.doc.service;


import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.common.node.content.ColumnTreeNode;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.DocKnowledgeDao;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.KnowledgeClassify;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DocKnowledgeService extends BaseService<DocKnowledge>{

	@Autowired
	private DocKnowledgeDao docKnowledgeDao;
	


    
    /**
	 * 查询区划，分页
	 * @param docKnowledge
	 * @return
	 */
	public LayuiResponse findPage(DocKnowledge docKnowledge) {
		PageQuery query = findPage("doc.knowledge.findPage", docKnowledge);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
	}

	/**
	 * 查询分页 个人主页
	 * @param docKnowledge
	 * @return
	 */
	public LayuiResponse findPageByMe(DocKnowledge docKnowledge) {
		PageQuery query = findPage("doc.knowledge.findPageByMe", docKnowledge);
		//封装成layui返回数据格式
		LayuiResponse response = new LayuiResponse();
		response.setCount(query.getTotalRow());
		response.setData(query.getList());
		return response;
	}
	
	public DocKnowledge findByUuid(Long uuid){
		return docKnowledgeDao.findByUuid(uuid);
	}

	
	/**
	 * 
	 * <p>Title: findColumnMenu</p>  
	 * <p>Description: 查询栏目菜单</p>  
	 *
	 * @param uuid
	 * @return  
	 *
	 */
	public List<DTreeNode> getKnowledgeClassifyTree(Long uuid){
		return docKnowledgeDao.getKnowledgeClassifyTree(uuid);
	}
	
	/**
	 * 查询系统栏目
	 * @return
	 */
	public List<ColumnTreeNode> getXtColumn(){
		return docKnowledgeDao.findXtColumn();
	}
	
	/**
	 * 查询是否存在子菜单
	 * @param uuid
	 * @return
	 */
	public int getSubsetColumn(Long uuid){

		return docKnowledgeDao.findSubsetColumn(uuid);
	}

	public List<KnowledgeClassify> getKnowledgeClassifySecondList(Long uuid){

		return docKnowledgeDao.getKnowledgeClassifySecondList(uuid);
	}

	public KnowledgeClassify getKnowledgeClassify(Long uuid){
		return docKnowledgeDao.getKnowledgeClassify(uuid);
	}


	public int getCountByClassifyParentId(Long uuid){
		return docKnowledgeDao.getCountByClassifyParentId(uuid);

	}

	public String getLocationByDocClassify(String docClassify){
		return docKnowledgeDao.getLocationByDocClassify(docClassify);
	}
	public void updataBatchGoodList(List<DocKnowledge> list){
		 sqlManager.updateBatch("doc.knowledge.goodBatchList", list);
	}

	public void updataBatchBadList(List<DocKnowledge> list){
		sqlManager.updateBatch("doc.knowledge.badBatchList", list);
	}

	public List<DocKnowledge> findByDocClassify(String docClassify,Long uuid){
		return docKnowledgeDao.findByDocClassify(docClassify,uuid);
	}

	public List<DocKnowledge> findByDocValue(Long uuid){
		return docKnowledgeDao.findByDocValue(uuid);
	}
	public List<DocKnowledge> findKnowledgeList(){
		return docKnowledgeDao.findKnowledgeList();
	}

	public DocKnowledge findKnowledgeByPicIds(String docPicUrlIds){
		return docKnowledgeDao.findKnowledgeByPicIds(docPicUrlIds);
	}
}
