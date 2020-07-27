package com.vingsoft.oa.config.cache;

/**
 * 

* <p>Title: CacheKey</p>  

* <p>Description: 缓存的key集合</p>  

* @author MrTang

* @date 2018年12月11日
 */
public interface CacheKey {

    /**
     * 字典缓存
     */
    String DICTS_TYPE = "dicts_type_";	//缓存某一类字典

    String SINGLE_DICT = "single_dict_";	//缓存单一字典(类型和字典值确定唯一字典项)

}
