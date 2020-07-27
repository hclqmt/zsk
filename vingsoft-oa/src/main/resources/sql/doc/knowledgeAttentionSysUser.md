findCount
===
 select count(1) from zsk_knowledge_attention_sys_user where knowledge_uuid=#knowledgeUuid# and user_id=#userId#;

findByOther
===
 select * from zsk_knowledge_attention_sys_user where knowledge_uuid=#knowledgeUuid# and user_id=#userId#;