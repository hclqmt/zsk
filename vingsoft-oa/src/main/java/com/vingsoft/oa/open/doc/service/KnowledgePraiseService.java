package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgePraiseDao;
import com.vingsoft.oa.open.doc.entity.KnowledgePraise;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class KnowledgePraiseService  extends BaseService<KnowledgePraise> {

    @Autowired
    private KnowledgePraiseDao knowledgePraiseDao;

    /**
     * 查询区划，分页
     * @param knowledgePraise
     * @return
     */
    public LayuiResponse findPage(KnowledgePraise knowledgePraise) {
        PageQuery query = findPage("doc.knowledgePraise.findPage", knowledgePraise);
        //封装成layui返回数据格式
        int countByValue = knowledgePraiseDao.findCountByValue(Long.valueOf(knowledgePraise.getKnowledgeUuid()), knowledgePraise.getLastId());
        LayuiResponse response = new LayuiResponse();
//        LambdaQuery<KnowledgePraise> lambdaQuery = knowledgePraiseDao.createLambdaQuery();
//        String ids = knowledgePraise.getPraiseIds();
        //去除第一次加入的评论，防止加载时重复
//        if (ObjectKit.isNotNull(ids)&&ids.length()>0){
//            String[] split = knowledgePraise.getPraiseIds().split(",");
//            query.setTotalRow(lambdaQuery.andEq("knowledge_uuid", knowledgePraise.getKnowledgeUuid()).andNotIn("id", Arrays.asList(split)).count());
//            PageQuery<KnowledgePraise> page = lambdaQuery.andEq("knowledge_uuid", knowledgePraise.getKnowledgeUuid())
//                    .andEq("user_id", LoginUser.getInstance().getId())
//                    .andNotIn("id", Arrays.asList(split)).orderBy("create_date desc")
//                    .page(knowledgePraise.getPage(), knowledgePraise.getLimit());
//            query.setList(page.getList());
//        }
        response.setCount(query.getTotalRow());
        response.setTotalPage(query.getTotalPage());
        response.setData(query.getList());
        return response;
    }

    /**
     * 查询区划，分页
     * @param knowledgePraise
     * @return
     */
    public LayuiResponse findPageMyPraise(KnowledgePraise knowledgePraise) {
        PageQuery query = findPage("doc.knowledgePraise.findPage", knowledgePraise);
        //封装成layui返回数据格式
        LayuiResponse response = new LayuiResponse();
        response.setCount(query.getTotalRow());
        response.setData(query.getList());
        return response;
    }

    public KnowledgePraise findByPraiseId(Long id){
        return knowledgePraiseDao.findByPraiseId(id);
    }

    public int findCountByKnowledgeUuid(Long knowledgeUuid){
        return knowledgePraiseDao.findCountByKnowledgeUuid(knowledgeUuid);
    }
}
