cols
===
	m.id,m.praise_num,m.create_date,m.opposition_num,m.user_id,m.parent_id,
    	 m.content,m.sys_user_id,m.nickname,m.status
findPage
===
	select
	@pageTag(){
	 #use("cols")#
	 @}
	from zsk_leave_message m
	where 1=1 
	@if(sysUserId!="" && !isEmpty(sysUserId)){
        and m.sys_user_id =#sysUserId#
    @}
    @if(leaveMessageId!="" && !isEmpty(leaveMessageId)){
        and m.id < (#leaveMessageId#)
    @}
	order by m.create_date desc

findByLeaveId
===
	select
	#use("cols")#
		from  zsk_leave_message m where m.id = #id#
		
findCountBySysUserId
===
select count(1) from zsk_leave_message where sys_user_id=#sysUserId#;