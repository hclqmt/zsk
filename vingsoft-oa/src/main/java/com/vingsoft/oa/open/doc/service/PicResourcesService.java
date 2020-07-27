package com.vingsoft.oa.open.doc.service;


import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.PicResourcesDao;
import com.vingsoft.oa.open.doc.entity.PicResources;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PicResourcesService extends BaseService<PicResources> {
    @Autowired
    private PicResourcesDao picResourcesDao;

    public PicResources findByUuid(Long uuid){
        return picResourcesDao.findByUuid(uuid);
    }

    public List<PicResources> findByParentUuid(String parentUuid){
        return picResourcesDao.findByParentUuid(parentUuid);
    }
    /**
     * 查询区划，分页
     * @param picResources
     * @return
     */
    public LayuiResponse findPage(PicResources picResources) {
        PageQuery query = findPage("doc.picResources.findPage", picResources);
        //封装成layui返回数据格式
        LayuiResponse response = new LayuiResponse();
        response.setCount(query.getTotalRow());
        response.setData(query.getList());
        return response;
    }
}
