package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

@Data
@Table(name = "zsk_knowledge_attention_sys_user")
public class KnowledgeAttentionSysUser extends BaseEntity {
    private Long id;

    private Long knowledgeUuid;

    private Long userId;

    private Long type;
}
