
findPage
===
	select
	@pageTag(){
		*
	@}
	from zsk_knowledge_classify
	where 1=1 
	@if(classifyName!=""&&!isEmpty(classifyName)){
		and classify_name like CONCAT('%',#classifyName#,'%')
	@}
	@if(status!=""&&!isEmpty(status)){
		and status = #status#
	@}
	@if(classifyParentUuid!=""&&!isEmpty(classifyParentUuid)){
        and classify_parent_uuid = #classifyParentUuid#
    @}
		
queryByPid
===
	select * from zsk_knowledge_classify where classify_parent_uuid = #classifyParentUuid#

	
getClassifyTree
===
	SELECT uuid id,classify_name as title,classify_parent_uuid as parentId,'0' as checkArr FROM zsk_knowledge_classify

getRoot
===
	select * from zsk_knowledge_classify where classify_parent_uuid = #classifyParentUuid#