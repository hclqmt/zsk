package com.vingsoft.oa.open.doc.service;

import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgeClassifyDao;
import com.vingsoft.oa.open.doc.entity.KnowledgeClassify;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


/**
 * 
 * <p>Title: SysMenuService</p>  
 * <p>Description: 菜单服务</p>  
 * @author MrTang
 * @date 2018年12月12日
 */

@Service
@Transactional
@SuppressWarnings({"rawtypes","unchecked"})
public class KnowledgeClassifyService extends BaseService<KnowledgeClassify> {

    @Autowired
    private KnowledgeClassifyDao knowledgeClassifyDao;

	public List<KnowledgeClassify> queryByPid(String classifyParentUuid){
		return knowledgeClassifyDao.queryByPid(classifyParentUuid);
	}
	public KnowledgeClassify getRoot(String classifyParentUuid){
		return knowledgeClassifyDao.getRoot(classifyParentUuid);
	}

	public List<DTreeNode> getClassifyTree(){
		return knowledgeClassifyDao.getClassifyTree();
	}
	

	public LayuiResponse findPage(KnowledgeClassify knowledgeClassify) {
		PageQuery query = findPage("doc.knowledgeClassify.findPage", knowledgeClassify);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
	}

}
