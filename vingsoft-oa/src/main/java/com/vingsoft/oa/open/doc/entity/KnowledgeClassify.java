package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.beetl.sql.core.annotatoin.Table;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Table(name = "zsk_knowledge_classify")
public class KnowledgeClassify extends BaseEntity {

    private String uuid;

    private String classifyName;

    private String classifyParentUuid;

    private String classifyParentName;

    private List<KnowledgeClassify> childrenClassify;

    private int count;

    private String location;

    private Date createDate;

    private String remark;

    private Integer status;

    private Integer sort;
}
