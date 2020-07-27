package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.SysDict;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;


/**
 * 字典DAO接口
 */
@SqlResource("sys.sysDict")
public interface SysDictDao extends BaseMapper<SysDict> {

    /**
     * 查询某个类型下的字典集合
     * @param type 字典类型
     * @return
     */
    List<SysDict> findListByType(@Param("type") String type);

	/**

	 * <p>Title: findCoreDict</p>

	 * <p>Description: 根据字典类型代码与字典值，查询字典对象</p>

	 * @param type
	 * @param value
	 * @return

	 */
	SysDict findCoreDict(@Param("type") String type, @Param("value") String value);
	/**
	 * 查重验证
	 * @param sysDict
	 * @return
	 */
	int cxByInsertOrUpdate(SysDict sysDict);

}
