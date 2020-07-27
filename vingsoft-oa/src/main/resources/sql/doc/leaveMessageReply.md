cols
===
	id,sender_id,sender_name,receiver_id,receiver_name,sender_content,create_date,sys_user_id,status

findPage
===
	select
	@pageTag(){
	 k.id,k.sender_id,k.sender_name,k.receiver_id,k.receiver_name
	 ,k.sender_content,k.create_date,k.leave_message_id,s.icon
	 @}
	from zsk_leave_message_reply k left join zsk_leave_message p on p.id=k.leave_message_id
	left join sys_user s on s.id=k.sender_id
	where 1=1 
	@if(leaveMessageId!="" && !isEmpty(leaveMessageId)){
        and k.leave_message_id =#leaveMessageId#
    @}
	order by k.create_date desc

findByLeaveId
===
	select
	 k.id,k.sender_id,k.sender_name,k.receiver_id,k.receiver_name
     	 ,k.sender_content,k.create_date,k.leave_message_id,s.icon
		from  zsk_leave_message_reply k left join sys_user s on s.id=k.sender_id
		where k.id = #id#
		
findCountByLeaveMessageId
===
select count(1) from zsk_leave_message_reply where leave_message_id=#leaveMessageId#;

findList
===
	select
	 k.id,k.sender_id,k.sender_name,k.receiver_id,k.receiver_name
	 ,k.sender_content,k.create_date,k.leave_message_id,s.icon,k.status
	from zsk_leave_message_reply k left join zsk_leave_message p on p.id=k.leave_message_id
	left join sys_user s on s.id=k.sender_id
	where 1=1 
	@if(leaveMessageId!="" && !isEmpty(leaveMessageId)){
        and k.leave_message_id =#leaveMessageId#
    @}
	order by k.create_date desc