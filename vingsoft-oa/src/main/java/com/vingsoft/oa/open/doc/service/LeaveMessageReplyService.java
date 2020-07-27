package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.LeaveMessageReplyDao;
import com.vingsoft.oa.open.doc.entity.LeaveMessageReply;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LeaveMessageReplyService extends BaseService<LeaveMessageReply> {

    @Autowired
    private LeaveMessageReplyDao leaveMessageReplyDao;

    /**
     * 查询区划，分页
     * @param leaveMessageReply
     * @return
     */
    public LayuiResponse findPage(LeaveMessageReply leaveMessageReply) {
        PageQuery query = findPage("doc.leaveMessageReply.findPage", leaveMessageReply);
        //封装成layui返回数据格式
        LayuiResponse response = new LayuiResponse();
        response.setCount(query.getTotalRow());
        response.setTotalPage(query.getTotalPage());
        response.setData(query.getList());
        return response;
    }

    public LeaveMessageReply findByLeaveId(Integer id){
        return leaveMessageReplyDao.findByLeaveId(id);
    }

    public int findCountByLeaveMessageId(Integer leaveMessageId){
        return leaveMessageReplyDao.findCountByLeaveMessageId(leaveMessageId);
    }

    public List<LeaveMessageReply> findList(Integer leaveMessageId){
        return leaveMessageReplyDao.findList(leaveMessageId);
    }
}
