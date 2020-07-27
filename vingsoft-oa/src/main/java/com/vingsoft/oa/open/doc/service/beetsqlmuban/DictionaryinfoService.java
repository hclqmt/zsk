package com.vingsoft.oa.open.doc.service.beetsqlmuban;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.beetsqlmuban.DictionaryinfoDao;
import com.vingsoft.oa.open.doc.entity.beetsqlmuban.Dictionaryinfo;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@SuppressWarnings({"rawtypes","unchecked"})
public class DictionaryinfoService extends BaseService<Dictionaryinfo>{

	@Autowired
	private DictionaryinfoDao dictionaryinfoDao;
	
	/**
     * 根据类型获取字典集合
     * @param type 字典类型，
     * @return List
     */
	
    //添加缓存
    public List<Dictionaryinfo> findAllByType(String type) {
        return dictionaryinfoDao.findListByType(type);
    }
    
    /**
     * 查询代码项，分页
     * @param dictionaryinfo
     * @return
     */
	public LayuiResponse findPage(Dictionaryinfo dictionaryinfo) {
		PageQuery query = findPage("basic.dictionaryinfo.findPage", dictionaryinfo);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
	}
	
	public Dictionaryinfo findByGuid(String guid){
		return dictionaryinfoDao.findByGuid(guid);
	}
	
}
