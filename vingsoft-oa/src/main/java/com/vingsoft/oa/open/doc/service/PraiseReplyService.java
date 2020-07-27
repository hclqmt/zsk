package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgePraiseDao;
import com.vingsoft.oa.open.doc.dao.PraiseReplyDao;
import com.vingsoft.oa.open.doc.entity.KnowledgePraise;
import com.vingsoft.oa.open.doc.entity.PraiseReply;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class PraiseReplyService extends BaseService<PraiseReply> {

    @Autowired
    private PraiseReplyDao praiseReplyDao;

    /**
     * 查询区划，分页
     * @param praiseReply
     * @return
     */
    public LayuiResponse findPage(PraiseReply praiseReply) {
        PageQuery query = findPage("doc.praiseReply.findPage", praiseReply);
        //封装成layui返回数据格式
        LayuiResponse response = new LayuiResponse();
        response.setCount(query.getTotalRow());
        response.setTotalPage(query.getTotalPage());
        response.setData(query.getList());
        return response;
    }

    public PraiseReply findByPraiseId(Long id){
        return praiseReplyDao.findByPraiseId(id);
    }

    public int findCountByPraiseId(Long praiseId){
        return praiseReplyDao.findCountByPraiseId(praiseId);
    }

    public List<PraiseReply> findList(Long praiseId){
        return praiseReplyDao.findList(praiseId);
    }
}
