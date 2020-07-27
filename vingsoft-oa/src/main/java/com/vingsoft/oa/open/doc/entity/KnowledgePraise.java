package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Table(name = "zsk_knowledge_praise")
public class KnowledgePraise extends BaseEntity implements Serializable {
    private Long id;

    private int praiseNum;

    private int oppositionNum;

    private Date createDate;

    private Long userId;

    private Long parentId;

    private String content;

    private Long knowledgeUuid;

    private String knowledgeName;

    private String docClassify;

    private String docType;

    private String nickname;//用户名称

    private Long knowledgeCreateById;

    private String icon;//用户头像唯一下载码

    private List<PraiseReply> praiseReplyList;

    private String praiseIds;

    private Integer status;

    private Integer lastId;

}
