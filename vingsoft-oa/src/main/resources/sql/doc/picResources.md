findByUuid
===
	select 
		uuid,parent_uuid parentUuid,create_date createDate,size,extension_name extensionName,doc_original_name,resource_url
		resourceUrl,doc_original_name docOriginalName,doc_real_name docRealName,unique_code uniqueCode,create_by createBy
	 		from  zsk_pic_resources where UUID = #uuid#

findByParentUuid
===
	select 
		uuid,parent_uuid parentUuid,create_date createDate,size,extension_name extensionName,doc_original_name
		docOriginalName,doc_real_name docRealName,unique_code uniqueCode,resource_url resourceUrl,create_by createBy
	 		from  zsk_pic_resources where parent_uuid = #parentUuid#

findPage
===
	select
	@pageTag(){
		*
	@}
	from zsk_pic_resources
	where 1=1 
	@if(parentUuid!=""&&!isEmpty(parentUuid)){
		and parent_uuid = #parentUuid#
	@}
findCount
===
    select count(1) from zsk_pic_resources where parent_uuid=#parentUuid# limit 1;