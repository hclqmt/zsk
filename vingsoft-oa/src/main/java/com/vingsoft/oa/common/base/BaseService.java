package com.vingsoft.oa.common.base;

import com.vingsoft.common.annotation.Dept;
import com.vingsoft.common.annotation.Dict;
import com.vingsoft.common.tool.DelFlagEnum;
import com.vingsoft.core.exception.PlatformException;
import com.vingsoft.oa.open.doc.entity.SysDept;
import com.vingsoft.oa.open.doc.entity.SysDict;
import com.vingsoft.oa.open.doc.service.SysDeptService;
import com.vingsoft.oa.open.doc.service.SysDictService;
import org.beetl.sql.core.SQLManager;
import org.beetl.sql.core.TailBean;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * @ClassName:  BaseService   
 * @Description:service基类
 * @author: mrtang
 * @date:   Apr 15, 2019 3:37:54 PM   
 *   
 * @param <T>  
 * @Copyright: 2019 www.vingsoft.com Inc. All rights reserved. 
 * 注意：本内容仅限于安徽胜利科技内部传阅，禁止外泄以及用于其他的商业目
 */
@SuppressWarnings({"unchecked","rawtypes","unused"})
public class BaseService<T> {

    @Autowired
    protected SysDictService dictUtil;
    @Autowired
    protected SysDeptService deptUtil;
    @Autowired
    protected SQLManager sqlManager;
    
    /**
     * 
    
     * <p>Title: select</p>  
    
     * <p>Description: 根据sqlId查询list集合</p>  
    
     * @param sqlId
     * @param clazz
     * @return
     */
    public List select(String sqlId,Class<T> clazz,Map<String,Object> paras) {
    	return sqlManager.select(sqlId, clazz, paras);
    }
    public List select(String sqlId,Map<String,Object> paras) {
    	return sqlManager.select(sqlId, Map.class, paras);
    }
    
    /**
     * 
    
     * <p>Title: findPage</p>  
    
     * <p>Description: 分页查询</p>  
    
     * @param sqlTemplate sys.sysDict.findPage
     * @param pageQuery
     * @return
     */
	public PageQuery<T> findPage(String sqlTemplate,T model) {
    	if(!(model instanceof BaseEntity)) {
    		throw new PlatformException("指定的pojo"+model.getClass()+" 不能获取数据字典，需要继承BaseEntity");
    	}
    	BaseEntity entity = (BaseEntity) model;
		PageQuery query = new PageQuery<>(entity.getPage(), entity.getLimit(), model);
    	sqlManager.pageQuery(sqlTemplate, getCurrentEntityClassz(),query);
    	queryListAfter(query.getList());
    	return query;
    }

    /**
     * 根据id查询对象，如果主键ID不存在
     * @param id
     * @return
     */
    public T queryById(Object id) {
        T t = sqlManager.single(getCurrentEntityClassz(), id);
        queryEntityAfter((Object) t);			
        return t;
    }

    /**
     * 根据id查询
     * @param classz 返回的对象类型
     * @param id     主键id
     * @return
     */
    public T queryById(Class<T> classz, Object id) {
        T t = sqlManager.unique(classz, id);
        queryEntityAfter((Object) t);
        return t;
    }

    /**
     * 新增一条数据
     * @param model 实体类
     * @return
     */
    public boolean save(T model) {
        return sqlManager.insert(model,true) > 0;
    }

   

    /**
     * 删除数据（一般为逻辑删除，更新del_flag字段为1）
     * @param ids
     * @return
     */
    public boolean deleteById(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new PlatformException("删除数据ID不能为空");
        }
        
        for (Long id : ids) {
          
        }

        List<Object> list = new ArrayList<>();
        for (Long id : ids) {
            Map map = new HashMap();
            // always id,delFlag for pojo
            map.put("id", id);
            map.put("delFlag", DelFlagEnum.DELETED.getValue());
          
            list.add(map);
        }
        int[] count = sqlManager.updateBatchTemplateById(getCurrentEntityClassz(), list);
        int successCount = 0;
        for (int successFlag : count) {
            successCount += successFlag;
        }
        return successCount == ids.size();
    }

    public boolean deleteById(Long id) {
       
            Map map = new HashMap();
            // always id,delFlag for pojo
            map.put("id", id);
            map.put("delFlag", DelFlagEnum.DELETED.getValue());
            int ret = sqlManager.updateTemplateById(getCurrentEntityClassz(), map);
            return ret==1;
    }
    
    /**
     * 根据id删除数据
     * @param id 主键值
     * @return
     */
    public boolean delete(String ids) {
    	if(ids.contains("\"")){//存在"进行替换
    		ids=ids.replaceAll("\"", "");
    	}
    	for (String id : ids.split(",")) {
    		sqlManager.deleteById(getCurrentEntityClassz(), id);
		}
        return true;
    }
    
    /**
     * 根据id删除数据
     * @param id 主键值
     * @return
     */
    public boolean forceDelete(List<Long> ids) {
    	int count = 0;
    	for (Long id : ids) {
    		count += sqlManager.deleteById(getCurrentEntityClassz(), id);
		}
        return count==ids.size();
    }
    
    /**
     * 根据id删除数据
     * @param id 主键值
     * @return
     */
    public int forceDelete(Long id) {
        return sqlManager.deleteById(getCurrentEntityClassz(), id);
    }

    /**
     * 根据id删除数据
     * @param id 主键值
     * @return
     */
    public int forceDelete(Class<T> classz, Long id) {
        return sqlManager.deleteById(classz, id);
    }

    /**
     * 更新，只更新不为空的字段
     * @param model
     * @return
     */
    public boolean updateTemplate(T model) {
        return sqlManager.updateTemplateById(model)>0;
    }

    /**
     * 更新所有字段
     * @param model
     * @return
     */
    public boolean update(T model) {
    		return sqlManager.updateById(model) > 0;
    }

  

    /**
     * 获取当前注入泛型T的类型
     * @return 具体类型
     */
    private Class<T> getCurrentEntityClassz() {
        return (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }


    public void queryListAfter(List list) {
        for (Object bean : list) {
            queryEntityAfter(bean);
        }
    }

    public void queryEntityAfter(Object  bean) {
        if (bean == null) {
            return;
        }
        
        if(!(bean instanceof TailBean)){
        	throw new PlatformException("指定的pojo"+bean.getClass()+" 不能获取数据字典，需要继承TailBean");
        }
        
        TailBean ext  = (TailBean)bean;
        Class c = ext.getClass();
        do {
            Field[] fields = c.getDeclaredFields();
            for (Field field : fields) {
                if (field.isAnnotationPresent(Dict.class)) {
                    field.setAccessible(true);
                    Dict dict = field.getAnnotation(Dict.class);
                    
                    try {
                        String display = "";
                        Object fieldValue = field.get(ext);
                        if (fieldValue != null) {
                        	String type = dict.type();
                            SysDict dbDict = dictUtil.findCoreDict(type,fieldValue.toString());
                            display = dbDict!=null?dbDict.getName():null;
                        }
                        ext.set(field.getName() + dict.suffix(), display);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
    
                }
                if (field.isAnnotationPresent(Dept.class)) {
                    field.setAccessible(true);
                    Dept dept = field.getAnnotation(Dept.class);
                    
                    try {
                        String display = "";
                        Object fieldValue = field.get(ext);
                        if (fieldValue != null) {
                        	String type = dept.type();
                            SysDept dbDept = deptUtil.queryById(fieldValue);
                            display = dbDept!=null?dbDept.getName():null;
                        }
                        ext.set(field.getName() + dept.suffix(), display);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
    
                }
            }
         c = c.getSuperclass();
        }while(c!=TailBean.class);
        
    }

}
