findCount
===
 select count(1) from zsk_leave_sys_user where leave_message_id=#leaveMessageId# and user_id=#userId# and type=#type#;
 
findByOther
===
 select * from zsk_leave_sys_user where leave_message_id=#leaveMessageId# and user_id=#userId# and type=#type#;
 
goodBatchList
===
update zsk_leave_sys_user set leave_message_id=#leaveMessageId# and user_id=#userId# and type=1;

badBatchList
===
update zsk_leave_sys_user set leave_message_id=#leaveMessageId# and user_id=#userId# and type=2;

deleteByType
===
delete * from zsk_leave_sys_user where leave_message_id=#leaveMessageId# and user_id=#userId# and type=#type#;