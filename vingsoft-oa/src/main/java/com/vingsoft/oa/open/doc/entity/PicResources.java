package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.util.Date;

@Data
@Table(name = "zsk_pic_resources")
public class PicResources extends BaseEntity {
    private Long uuid;

    private String parentUuid;

    private Date createDate;

    private String size;

    private String extensionName;

    private String docOriginalName;

    private String docRealName;

    private String uniqueCode;

    private String resourceUrl;

    private String createBy;

}
