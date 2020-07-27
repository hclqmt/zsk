package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

@Data
@Table(name = "zsk_knowledge_keywords")
public class KnowledgeKeywords  extends BaseEntity {

    private Integer id;

    private String name;

    private String remark;

    private Integer sort;
}
