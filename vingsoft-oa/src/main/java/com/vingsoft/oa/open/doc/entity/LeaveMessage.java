package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.io.Serializable;
import java.util.Date;
import java.util.List;


/* 
* 
* gen by beetlsql 2020-06-22
*/
@Data
@Table(name="zsk_task.zsk_leave_message")
public class LeaveMessage extends BaseEntity implements Serializable {
	/*
	主键
	*/
	private Integer id ;
	/*
	反对数
	*/
	private Integer oppositionNum ;
	/*
	父留言id
	*/
	private Integer parentId ;
	/*
	点赞数
	*/
	private Integer praiseNum ;
	/*
	是否阅读：0：已阅读，1：未阅读
	*/
	private Integer status ;
	/*
	用户id
	*/
	private Integer sysUserId ;
	/*
	用户id
	*/
	private Integer userId ;
	/*
	留言内容
	*/
	private String content ;
	/*
	用户名称
	*/
	private String nickname ;
	/*
	创建时间
	*/
	private Date createDate ;

	private List<LeaveMessageReply> leaveMessageReplyList;
	

}
