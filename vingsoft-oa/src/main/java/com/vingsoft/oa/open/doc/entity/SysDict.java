package com.vingsoft.oa.open.doc.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import com.vingsoft.common.annotation.Dict;
import com.vingsoft.oa.common.base.BaseEntity;
import com.vingsoft.oa.open.doc.entity.validater.ValidateConfig;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 

* <p>Title: SysDict</p>  

* <p>Description: 字典信息</p>  

* @author MrTang

* @date 2018年11月28日
 */
@Data
public class SysDict extends BaseEntity {

	/** serialVersionUID*/
	private static final long serialVersionUID = 4035087000754798976L;

	public interface TypeListView{}
	
	private Long id;
	
	//字典名称
    @NotNull(message = "字典值名称不能为空")
    private String name;    
    
    //字典值
    @NotNull(message = "字典值不能为空", groups = ValidateConfig.ADD.class)
    private String value;   
    
    //类型代码
    @NotNull(message = "字典类型不能为空", groups = ValidateConfig.ADD.class)
    @JsonView(TypeListView.class)
    private String typeCode;    
    
    //类型描述
    @JsonView(TypeListView.class)
    @NotNull(message = "字典类型描述不能为空")
    private String typeName; 
    
    
    //启用 0禁用 1启用
    @Dict(type = "enable")
    private Integer enable;
    //创建时间
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    //排序
    private Integer sort;    
    //备注
    private String remark;
    
}
