package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

@Data
@Table(name = "zsk_leave_sys_user")
public class LeaveSysUser extends BaseEntity {
    private Long id;

    private Long LeaveMessageId;

    private Long userId;

    private int type;
}
