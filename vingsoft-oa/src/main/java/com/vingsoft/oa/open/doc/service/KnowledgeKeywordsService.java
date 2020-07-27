package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgeKeywordsDao;
import com.vingsoft.oa.open.doc.entity.KnowledgeKeywords;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
public class KnowledgeKeywordsService extends BaseService<KnowledgeKeywords> {

    @Autowired
    private KnowledgeKeywordsDao knowledgeKeywordsDao;

	public KnowledgeKeywords queryById(Integer id){
		return knowledgeKeywordsDao.queryById(id);
	}


	public LayuiResponse findPage(KnowledgeKeywords knowledgeKeywords) {
		PageQuery query = findPage("doc.knowledgeKeywords.findPage", knowledgeKeywords);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
	}

}
