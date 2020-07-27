findPage
===
	select
	@pageTag(){
	 k.id,k.praise_num,k.create_date,k.opposition_num,k.user_id,k.parent_id,k.content,
	 k.knowledge_uuid,k.nickname,c.knowledge_name,c.doc_classify,c.doc_type,k.knowledge_create_by_id
	 @}
	from zsk_knowledge_praise k left join zsk_doc_knowledge c on k.knowledge_uuid = c.uuid
	where 1=1 
	@if(knowledgeUuid!="" && !isEmpty(knowledgeUuid)){
        and k.knowledge_uuid =#knowledgeUuid#
    @}
    @if(userId!="" && !isEmpty(userId)){
        and k.user_id =#userId#
    @}
    @if(lastId!="" && !isEmpty(lastId)){
        and k.id <= #lastId#
    @}
	order by k.create_date desc

findByPraiseId
===
	select
	 k.id,k.praise_num,k.create_date,k.opposition_num,k.user_id,k.parent_id,k.content,k.knowledge_uuid,k.nickname
	 ,k.knowledge_create_by_id	from  zsk_knowledge_praise k where k.id = #id#
		
findCountByKnowledgeUuid
===
    select count(1) from zsk_knowledge_praise where knowledge_uuid=#knowledgeUuid#;

findCountByValue
===
    select count(1) from zsk_knowledge_praise where 1=1 and  knowledge_uuid=#knowledgeUuid#
        @if(lastId!="" && !isEmpty(lastId)){
           and id <= #lastId#
        @}

