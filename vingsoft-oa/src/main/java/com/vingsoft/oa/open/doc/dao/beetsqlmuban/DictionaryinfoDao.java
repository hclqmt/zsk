package com.vingsoft.oa.open.doc.dao.beetsqlmuban;


import com.vingsoft.oa.open.doc.entity.beetsqlmuban.Dictionaryinfo;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

@SqlResource("basic.dictionaryinfo")
public interface DictionaryinfoDao extends BaseMapper<Dictionaryinfo>{
	
	/**
	 * 根据guid查询
	 * @param guid
	 * @return
	 */
	Dictionaryinfo findByGuid(@Param("guid") String guid);
	
	/**
	 * 查询某个类型下的字典集合
	 * @param type 字典类型
	 * @return
	 */
	List<Dictionaryinfo> findListByType(@Param("type") String type);
	
	

}

