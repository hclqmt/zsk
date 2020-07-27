package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.oa.open.doc.entity.LeaveMessageReply;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

@SqlResource("doc.leaveMessageReply")
public interface LeaveMessageReplyDao extends BaseMapper<LeaveMessageReply> {

    /**
     * 根据id查询
     * @param id
     * @return
     */
    LeaveMessageReply findByLeaveId(@Param("id") Integer id);

    int findCountByLeaveMessageId(@Param("leaveMessageId") Integer leaveMessageId);

    List<LeaveMessageReply> findList(@Param("leaveMessageId") Integer leaveMessageId);
}
