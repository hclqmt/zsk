package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;

import java.util.Date;

@Data
public class MyInfoEntity extends BaseEntity {
    private Integer id;

    private Date createDate;

    private Integer status;

    private Integer receiverId;

    private Integer type;

    private String title;
}
