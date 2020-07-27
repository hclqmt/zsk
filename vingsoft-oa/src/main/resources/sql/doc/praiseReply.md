findPage
===
	select
	@pageTag(){
	 k.id,k.sender_id,k.sender_name,k.receiver_id,k.receiver_name
	 ,k.sender_content,k.create_date,k.praise_id,s.icon
	 @}
	from zsk_praise_reply k left join zsk_knowledge_praise p on p.id=k.praise_id
	left join sys_user s on s.id=k.sender_id
	where 1=1 
	@if(praiseId!="" && !isEmpty(praiseId)){
        and k.praise_id =#praiseId#
    @}
	order by k.create_date desc

findByPraiseId
===
	select
	 k.id,k.sender_id,k.sender_name,k.receiver_id,k.receiver_name
     	 ,k.sender_content,k.create_date,k.praise_id,s.icon
		from  zsk_praise_reply k left join sys_user s on s.id=k.sender_id
		where k.id = #id#
		
findCountByPraiseId
===
select count(1) from zsk_praise_reply where praise_id=#praiseId#;

findList
===
	select
	 k.id,k.sender_id,k.sender_name,k.receiver_id,k.receiver_name
	 ,k.sender_content,k.create_date,k.praise_id,s.icon
	from zsk_praise_reply k left join zsk_knowledge_praise p on p.id=k.praise_id
	left join sys_user s on s.id=k.sender_id
	where 1=1 
	@if(praiseId!="" && !isEmpty(praiseId)){
        and k.praise_id =#praiseId#
    @}
	order by k.create_date desc