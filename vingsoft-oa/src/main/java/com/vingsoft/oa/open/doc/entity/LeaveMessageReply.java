package com.vingsoft.oa.open.doc.entity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.util.Date;


/* 
* 
* gen by beetlsql 2020-06-22
*/
@Data
@Table(name="zsk_leave_message_reply")
public class LeaveMessageReply {
	
	/*
	主键
	*/
	private Integer id ;
	/*
	接收人id
	*/
	private Integer receiverId ;
	/*
	发送人id
	*/
	private Integer senderId ;
	/*
	是否阅读：0：已阅读，1：未阅读
	*/
	private Integer status ;
	/*
	关联留言id
	*/
	private Integer leaveMessageId ;
	/*
	接收人姓名
	*/
	private String receiverName ;
	/*
	发送的内容
	*/
	private String senderContent ;
	/*
	发送人姓名
	*/
	private String senderName ;
	/*
	发送时间
	*/
	private Date createDate ;

    private String icon;
	
}
