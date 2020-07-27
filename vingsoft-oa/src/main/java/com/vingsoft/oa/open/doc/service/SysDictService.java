package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.SysDictDao;
import com.vingsoft.oa.open.doc.entity.SysDict;
import org.beetl.sql.core.engine.PageQuery;
import org.beetl.sql.core.query.LambdaQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;


/**
 *

* <p>Title: SysDictService</p>

* <p>Description: 字典服务</p>

* @author MrTang

* @date 2018年12月12日
 */

@Service
@Transactional
@SuppressWarnings({"rawtypes","unchecked"})
public class SysDictService extends BaseService<SysDict> {

//    private static Logger logger = LoggerFactory.getLogger(SysDictService.class);

    @Autowired
    private SysDictDao dictDao;


    /* (non-Javadoc)

     * <p>Title: save</p>

     * <p>Description: </p>

     * @param model
     * @return

     * @see com.vingsoft.oa.common.service.BaseService#save(java.lang.Object)

     */
    @Override
    public boolean save(SysDict model) {
    	return super.save(model);
    }

    /* (non-Javadoc)

     * <p>Title: updateTemplate</p>

     * <p>Description: </p>

     * @param model
     * @return

     * @see com.vingsoft.oa.common.service.BaseService#updateTemplate(java.lang.Object)

     */
    @Override
    //更新缓存
//    @CachePut(value = Cache.DICT, key = "'" + CacheKey.SINGLE_DICT + "'+#model.typeCode+'_'+#model.value")
    //删除缓存
//    @CacheEvict(value = Cache.DICT, key = "'" + CacheKey.DICTS_TYPE + "'+#model.typeCode")
    public boolean updateTemplate(SysDict model) {
    	return super.updateTemplate(model);
    }

    /* (non-Javadoc)

     * <p>Title: forceDelete</p>

     * <p>Description: </p>

     * @param ids
     * @return

     * @see com.vingsoft.oa.common.service.BaseService#forceDelete(java.util.List)

     */
    @Override
//    @CacheEvict(value = Cache.DICT, allEntries=true)
//    @CacheRemove(value = Cache.DICT)
    public boolean forceDelete(List<Long> ids) {
    	return super.forceDelete(ids);
    }

    /**
     * 根据类型获取字典集合
     * @param type 字典类型，
     * @return List
     */
    //添加缓存
//    @Cacheable(value = Cache.DICT, key = "'" + CacheKey.DICTS_TYPE + "'+#type")
    public List<SysDict> findAllByType(String type) {
        return dictDao.findListByType(type);
    }

    /**
     *

     * <p>Title: findCoreDict</p>

     * <p>Description: 根据字典类型和字典值查询字典</p>

     * @param type
     * @param value
     * @return
     */
    //添加缓存
//    @Cacheable(value = Cache.DICT, key = "'" + CacheKey.SINGLE_DICT + "'+#type+'_'+#value")
    public SysDict findCoreDict(String type,String value) {
    	return dictDao.findCoreDict(type,value);
    }

    /**
     *

     * <p>Title: findPage</p>

     * <p>Description: 分页查询</p>

     * @param dict
     * @return
     */
	public LayuiResponse findPage(SysDict dict) {
		PageQuery query = findPage("sys.sysDict.findPage", dict);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
    }

	/**
	 * 添加修改数据查重
	 * @param sysDict
	 * @return
	 */
	public int cxByInsertOrUpdate(SysDict sysDict){
		return dictDao.cxByInsertOrUpdate(sysDict);
	}

	public List<SysDict> getNameByValue(String value,String typeCode){
        LambdaQuery<SysDict> lambdaQuery = dictDao.createLambdaQuery();
        return lambdaQuery.andEq("type_code", typeCode).andIn("value", Arrays.asList(value.split(","))).select();

    }

}
