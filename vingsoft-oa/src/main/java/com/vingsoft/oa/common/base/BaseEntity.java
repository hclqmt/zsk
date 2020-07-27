package com.vingsoft.oa.common.base;

import java.util.Map;

import org.beetl.sql.core.TailBean;
import org.beetl.sql.core.annotatoin.InsertIgnore;
import org.beetl.sql.core.annotatoin.UpdateIgnore;

import com.fasterxml.jackson.annotation.JsonAnyGetter;

/**
 * 

* <p>Title: BaseEntity</p>  

* <p>Description: 用于辅助序列化beetlsql 的TailBean</p>  

* @author MrTang

* @date 2018年12月20日
 */

public class BaseEntity extends TailBean implements java.io.Serializable {

	/** serialVersionUID*/
	private static final long serialVersionUID = -8450120947530935501L;
	protected final static String ORACLE_CORE_SEQ_NAME="core_seq";
	protected final static String ORACLE_AUDIT_SEQ_NAME="audit_seq";
	protected final static String ORACLE_FILE_SEQ_NAME="core_seq";
	
	@JsonAnyGetter
    public Map<String, Object> getTails(){
    	return super.getTails();
    }
	
	@InsertIgnore
	@UpdateIgnore
	protected long page;		//页数
	@InsertIgnore
	@UpdateIgnore
	protected long limit;		//每页记录数
	@InsertIgnore
	@UpdateIgnore
	protected String orderBy ;	//排序

	
	public long getPage() {
		return page;
	}
	public void setPage(long page) {
		this.page = page;
	}
	public long getLimit() {
		return limit;
	}
	public void setLimit(long limit) {
		this.limit = limit;
	}
	public String getOrderBy() {
		return orderBy;
	}
	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}
}
