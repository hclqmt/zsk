findCount
===
 select count(1) from zsk_knowledge_sys_user where knowledge_uuid=#knowledgeUuid# and user_id=#userId# and type=#type#;
 
findByOther
===
 select * from zsk_knowledge_sys_user where knowledge_uuid=#knowledgeUuid# and user_id=#userId# and type=#type#;
 
goodBatchList
===
update zsk_knowledge_sys_user set knowledge_uuid=#knowledgeUuid# and user_id=#userId# and type=1;

badBatchList
===
update zsk_knowledge_sys_user set knowledge_uuid=#knowledgeUuid# and user_id=#userId# and type=2;

deleteByType
===
delete * from zsk_knowledge_sys_user where knowledge_uuid=#knowledgeUuid# and user_id=#userId# and type=#type#;