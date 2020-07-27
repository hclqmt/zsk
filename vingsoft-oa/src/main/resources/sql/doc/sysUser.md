
findOneByUserName
===
	select * from zsk_sys_user where username = #username#

	
findOneByTelephone
===
	select * from zsk_sys_user where iphone = #iphone#
	
findDocCount
===
    select *, CONCAT(IFNULL(TRUNCATE(a.sumGoodDoc/IFNULL(a.sumCount,0)*100,2),0),'%')  goodBadLv from( 
    SELECT count(1) sumCount,
    IFNULL(sum(good_count),0) sumGoodCount,
    IFNULL(sum(bad_count),0) sumBadCount,
    IFNULL(sum(read_count),0)  sumReadCount,
    count(case  when  good_count BETWEEN 1 and 10 and bad_count <=10 then good_count else null end) sumGoodDoc,
    count(case  when  bad_count>10 then bad_count end) sumBadDoc,
    (select create_date from zsk_doc_knowledge where create_by_id=#id# order by create_date asc limit 1) firstDate,
    (select create_date from zsk_doc_knowledge where create_by_id=#id# order by create_date desc limit 1) lastDate
    FROM `zsk_doc_knowledge` where create_by_id=#id#) a
    
findMyInfoCount
===
    SELECT IFNULL(sum(a),0) count from (
    
    SELECT count(1) a, user_id as receiver_id from zsk_knowledge_praise GROUP BY receiver_id
    UNION ALL
    SELECT count(1) a,receiver_id  from zsk_praise_reply GROUP BY receiver_id
    UNION ALL
    SELECT count(1) a ,user_id as receiver_id from zsk_leave_message GROUP BY receiver_id
    UNION ALL
    SELECT count(1) a, receiver_id from zsk_leave_message_reply GROUP BY receiver_id) a
    
    where receiver_id=#receiverId#
    
findPage
===
	select
	@pageTag(){
	 k.uuid,k.knowledge_name knowledgeName,k.knowledge_content knowledgeContent,k.label,k.doc_associate_id docAssociateId,
	 k.doc_type docType,k.doc_classify docClassify,k.is_release_group isReleaseGroup,c.classify_name classifyName,
	 k.edit_permissions editPermissions,k.read_permissions readPermissions,k.doc_pic_url docPicUrl,k.create_by
	 createBy,k.review_id reviewId,k.likes, k.create_by_id createById,k.create_date createDate,k.update_date updateDate
	 ,doc_pic_url_ids docPicUrlIds,read_count readCount,
	 (SELECT count(1) from zsk_knowledge_praise z where z.knowledge_uuid=k.uuid) praiseNum
	 @}
	from zsk_doc_knowledge k left join zsk_knowledge_classify c on k.doc_classify = c.uuid  
	left join zsk_knowledge_sys_user s on s.knowledge_uuid=k.uuid
	where 1=1 
	@if(keyWords!="" && !isEmpty(keyWords)){
		or k.knowledge_name like #'%'+keyWords+'%'#
	@}
    @if(keyWords!="" && !isEmpty(keyWords)){
        or k.knowledge_content like #'%'+keyWords+'%'#
    @}
    @if(keyWords!="" && !isEmpty(keyWords)){
        or k.create_by like #'%'+keyWords+'%'#
    @}
	order by k.create_date desc
    