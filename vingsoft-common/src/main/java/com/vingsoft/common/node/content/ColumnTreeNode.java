package com.vingsoft.common.node.content;

import java.util.List;
/**

*

* @author sunjf

* @date 2020年3月18日

**/
public class ColumnTreeNode {
	/**
	 * 栏目id
	 */
	private Long guid;
	
	/**
	 * 栏目名称
	 */
	private String columnName;
	
	private List<Content> contentNode;

	public String getColumnName() {
		return columnName;
	}

	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}

	public List<Content> getContentNode() {
		return contentNode;
	}

	public void setContentNode(List<Content> contentNode) {
		this.contentNode = contentNode;
	}

	public Long getGuid() {
		return guid;
	}

	public void setGuid(Long guid) {
		this.guid = guid;
	}
	
	
	
}
