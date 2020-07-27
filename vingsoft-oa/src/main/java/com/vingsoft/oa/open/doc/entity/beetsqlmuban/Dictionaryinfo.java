package com.vingsoft.oa.open.doc.entity.beetsqlmuban;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Getter;
import lombok.Setter;
import org.beetl.sql.core.annotatoin.AssignID;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**

* 代码项管理实体类

* @author sunjf

* @date 2020年3月5日

**/
@Getter
@Setter
public class Dictionaryinfo extends BaseEntity {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 主键
	 */
	@AssignID("uuid2")
	private String guid;
	
	/**
	 * 代码项名称
	 */
	 @NotNull(message = "代码项名称不能为空")
	 private String dictName;
	 
	 /**
	  * 名称简拼缩写
	  */
	 private String dictJanespell;
	 
	 /**
	  * 代码项编号
	  */
	 @NotNull(message = "代码项编号不能为空")
	 private String dictCode;
	 
	 /**
	  * 代码项简称
	  */
	 private String dictShortName;
	 
	 /**
	  * 代码项类型
	  */
	 @NotNull(message = "代码项类型不能为空")
	 private String dictType;
	 
	 /**
	  * 代码项类型简拼
	  */
	 private String dictTypeJanespell;
	 
	 /**
	  * 父类
	  */
	 private String dictGuid;
	 
	 /**
	  * 备注
	  */
	 private String dictDesc;
	 
	 /**
	  * 添加时间
	  */
	 @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	 @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
	 private Date createDate;
	 
	 /**
	  * 修改时间
	  */
	 @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	 @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
	 private Date updateDate;
	 
}
