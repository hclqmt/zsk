package com.vingsoft.oa.open.doc.dao;


import com.vingsoft.oa.open.doc.entity.LeaveMessage;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

@SqlResource("doc.leaveMessage")
public interface LeaveMessageDao extends BaseMapper<LeaveMessage> {


    /**
     * 根据id查询
     * @param leaveId
     * @return
     */

    LeaveMessage findByLeaveId(@Param("id") Integer leaveId);

    int findCountBySysUserId(@Param("sysUserId") Integer sysUserId);

}
