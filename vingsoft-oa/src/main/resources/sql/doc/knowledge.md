findPage
===
	select
	@pageTag(){
	 k.uuid,k.knowledge_name knowledgeName,k.knowledge_content knowledgeContent,k.label,k.doc_associate_id docAssociateId,
	 k.doc_type docType,k.doc_classify docClassify,k.is_release_group isReleaseGroup,c.classify_name classifyName,
	 k.edit_permissions editPermissions,k.read_permissions readPermissions,k.doc_pic_url docPicUrl,k.create_by
	 createBy,k.review_id reviewId,k.likes,k.create_by_id createById,k.create_date createDate,k.update_date updateDate
	 ,doc_pic_url_ids docPicUrlIds,read_count readCount,crt,is_word_resource,
	 (SELECT count(1) from zsk_knowledge_praise z where z.knowledge_uuid=k.uuid) praiseNum
    @}
	from zsk_doc_knowledge k left join zsk_knowledge_classify c on k.doc_classify = c.uuid  
	where 1=1 
	@if(knowledgeName!="" && !isEmpty(knowledgeName)){
		and k.knowledge_name like #'%'+knowledgeName+'%'#
	@}
	@if(docClassify!="" && !isEmpty(docClassify)){
		and k.doc_classify = #docClassify#
	@}
	@if(docType!="" && !isEmpty(docType)){
        and k.doc_type = #docType#
    @}
    @if(createById!="" && !isEmpty(createById)){
        and k.create_by_id = #createById#
    @}
    @if(isReleaseGroup!="" && !isEmpty(isReleaseGroup)){
        and k.is_release_group = #isReleaseGroup#
    @}
    @if(startCreateDate!="" && !isEmpty(startCreateDate)){
        and k.create_date >= #startCreateDate#
    @}
    @if(endCreateDate!="" && !isEmpty(endCreateDate)){
        and k.create_date <= #endCreateDate#
    @}
	order by k.create_date desc
	
findPageByMe
===
	select
	@pageTag(){
	 k.uuid,k.knowledge_name knowledgeName,k.knowledge_content knowledgeContent,k.label,k.doc_associate_id docAssociateId,
	 k.doc_type docType,k.doc_classify docClassify,k.is_release_group isReleaseGroup,c.classify_name classifyName,
	 k.edit_permissions editPermissions,k.read_permissions readPermissions,k.doc_pic_url docPicUrl,k.create_by
	 createBy,k.review_id reviewId,k.likes,k.create_by_id createById,k.create_date createDate,k.update_date updateDate
	 ,doc_pic_url_ids docPicUrlIds,read_count readCount,crt,is_word_resource,
	 (SELECT count(1) from zsk_knowledge_praise z where z.knowledge_uuid=k.uuid) praiseNum
    @}
	from zsk_doc_knowledge k left join zsk_knowledge_classify c on k.doc_classify = c.uuid  
	left join zsk_knowledge_attention_sys_user a on a.knowledge_uuid=k.uuid
	where 1=1 
	@if(docType!="" && !isEmpty(docType)){
        and k.doc_type = #docType#
    @}
    @if(createById!="" && !isEmpty(createById)){
        and a.user_id = #createById#
    @}
   
	order by k.create_date desc

findByUuid
===
	select 
		k.uuid,k.knowledge_name,k.knowledge_content,k.label,k.doc_associate_id,k.doc_type,k.doc_classify,k.is_release_group,k.edit_permissions,
		c.classify_name classifyName,k.is_word_resource,
		k.read_permissions,k.doc_pic_url,k.create_by,k.create_by_id,k.review_id,k.likes,k.create_date,k.update_date,k.doc_pic_url_ids docPicUrlIds,
		k.read_count readCount,k.good_count goodCount,k.bad_count badCount,k.crt from  zsk_doc_knowledge k left join zsk_knowledge_classify c 
		on k.doc_classify = c.uuid  where k.UUID = #uuid#
getKnowledgeClassifySecondList
===
    select uuid,classify_name ,classify_parent_uuid  from zsk_knowledge_classify where classify_parent_uuid=#uuid#;
    
getKnowledgeClassify
===
   select uuid,classify_name ,classify_parent_uuid from zsk_knowledge_classify where uuid=#uuid#;
    
getKnowledgeClassifyTree
===
	SELECT uuid as id,classify_name as title,classify_parent_uuid as parentId,'0' as checkArr FROM zsk_knowledge_classify 
	where 1=1
	@if(uuid!="" && !isEmpty(uuid)){
		and uuid!=#uuid# and classify_parent_uuid!=#uuid#
	@}

getCountByClassifyParentId
===
    select functionTests(#uuid#) count from dual;

getLocationByDocClassify
===
    select  functionTest(#docClassify#) location from dual;

goodBatchList
===
    update zsk_doc_knowledge set good_count=#goodCount# where uuid=#uuid#;

badBatchList
===
    update zsk_doc_knowledge set bad_count=#goodCount# where uuid=#uuid#;

findByDocClassify
===
    select UNIX_TIMESTAMP(z.create_date) time ,z.* from zsk_doc_knowledge z  where z.doc_classify=#docClassify# and z.uuid<>#uuid# order by z.update_date
    desc limit 1,10;

findByDocValue
===
    select * from zsk_doc_knowledge where uuid<>#uuid# order by read_count,likes,good_count,bad_count desc limit 1,10;

findKnowledgeList
===
    select k.uuid,k.knowledge_name knowledgeName,k.knowledge_content knowledgeContent,k.create_date createDate,k.doc_type docType
     ,k.doc_classify docClassify from 
    zsk_doc_knowledge k;

findKnowledgeByPicIds
===
    select * from zsk_doc_knowledge where doc_pic_url_ids = #docPicUrlIds#;

	
	
	
	