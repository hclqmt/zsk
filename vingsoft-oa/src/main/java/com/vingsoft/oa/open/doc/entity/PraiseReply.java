package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.util.Date;

/**
 * @Auther: hcl
 * @Date: 2020/6/14 11:24
 * @Description:
 */
@Data
@Table(name = "zsk_praise_reply")
public class PraiseReply extends BaseEntity {

    private Long id;

    private Integer senderId;

    private String senderName;

    private Long receiverId;

    private String receiverName;

    private String senderContent;

    private Date createDate;

    private Long praiseId;

    private String icon;

    private Integer status;
}
