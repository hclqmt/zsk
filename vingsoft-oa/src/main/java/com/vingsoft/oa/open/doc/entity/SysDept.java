package com.vingsoft.oa.open.doc.entity;



import com.fasterxml.jackson.annotation.JsonFormat;
import com.vingsoft.common.annotation.Dict;
import com.vingsoft.oa.common.base.BaseEntity;
import com.vingsoft.oa.open.doc.entity.validater.SysUserConstraint;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * 

* <p>Title: SysDept</p>  

* <p>Description: 部门信息</p>  

* @author MrTang

* @date 2018年11月20日
 */
@SysUserConstraint.List({
  @SysUserConstraint(first = "id", second = "orgCode", message = "组织机构代码已被占用"),
  @SysUserConstraint(first = "id", second = "orgCredItCode", message = "统一社会信用编码已被占用")
})
public class SysDept extends BaseEntity {
	
	/** serialVersionUID*/
	private static final long serialVersionUID = 1L;
	
	/**
	 * 部门id
	 */
    private Long id;
    /**
	 * 部门名称
	 */
    private String name;

    /**
	 * 上级部门id
	 */
    private Integer parentId;
	
	/**
	 * 上级部门名称
	 */
    private String parentName;

    /**
	 * 部门在当前层级下的顺序，由小到大
	 */
    private Integer sort;

    /**
	 * 备注
	 */
    private String remark;

    /**
	 * 操作者
	 */
    private String operator;

    /**
	 * 最后一次操作时间
	 */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date operateTime;
    /**
	 * 最后一次更新操作者的ip地址
	 */
    private String operateIp;
    
    /**
                   * 组织机构代码
     */
    private String orgCode;
    /**
     * 部门简称
     */
    private String orgShortName;
    /**
     * 统一社会信用编码
     */
    private String orgCredItCode;
    /**
     * 行政区划编码
     */
    private String orgAreaCode;
    /**
     * 数据来源
     */
    @Dict(type="baseDataSource")
    private String orgDataSource;
    /**
     * 行政区划编码
     */
    private String orgAreaName;
    
    /**
   	 * 添加时间
   	 */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
   	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createDate;
   

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }
    
    public String getParentName() {
		return parentName;
	}

	public void setParentName(String parentName) {
		this.parentName = parentName;
	}

	public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator == null ? null : operator.trim();
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
    }

    public String getOperateIp() {
        return operateIp;
    }

    public void setOperateIp(String operateIp) {
        this.operateIp = operateIp == null ? null : operateIp.trim();
    }


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOrgCode() {
		return orgCode;
	}

	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}

	public String getOrgShortName() {
		return orgShortName;
	}

	public void setOrgShortName(String orgShortName) {
		this.orgShortName = orgShortName;
	}

	public String getOrgCredItCode() {
		return orgCredItCode;
	}

	public void setOrgCredItCode(String orgCredItCode) {
		this.orgCredItCode = orgCredItCode;
	}

	public String getOrgAreaCode() {
		return orgAreaCode;
	}

	public void setOrgAreaCode(String orgAreaCode) {
		this.orgAreaCode = orgAreaCode;
	}

	public String getOrgDataSource() {
		return orgDataSource;
	}

	public void setOrgDataSource(String orgDataSource) {
		this.orgDataSource = orgDataSource;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getOrgAreaName() {
		return orgAreaName;
	}

	public void setOrgAreaName(String orgAreaName) {
		this.orgAreaName = orgAreaName;
	}
	
    
}