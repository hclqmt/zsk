package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.LeaveMessageDao;
import com.vingsoft.oa.open.doc.entity.LeaveMessage;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LeaveMessageService extends BaseService<LeaveMessage> {

    @Autowired
    private LeaveMessageDao leaveMessageDao;

    /**
     * 查询区划，分页
     * @param leaveMessage
     * @return
     */
    public LayuiResponse findPage(LeaveMessage leaveMessage) {
        PageQuery query = findPage("doc.leaveMessage.findPage", leaveMessage);
        //封装成layui返回数据格式
        LayuiResponse response = new LayuiResponse();
        response.setCount(query.getTotalRow());
        response.setTotalPage(query.getTotalPage());
        response.setData(query.getList());
        return response;
    }

    public LeaveMessage findByLeaveId(Integer id){
        return leaveMessageDao.findByLeaveId(id);
    }

    public int findCountBySysUserId(Integer sysUserId){
        return leaveMessageDao.findCountBySysUserId(sysUserId);
    }
}
