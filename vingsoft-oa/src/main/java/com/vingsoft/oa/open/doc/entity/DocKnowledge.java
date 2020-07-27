package com.vingsoft.oa.open.doc.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;
import org.json.JSONArray;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Table(name = "zsk_doc_knowledge")
public class DocKnowledge extends BaseEntity implements Serializable {
    private Long uuid;

    private String knowledgeName;

    private String knowledgeContent;

    private String label;

    private List<SysDict> labelList;

    private String docAssociateId;

    private String docType;

    private String docClassify;

    private String classifyName;

    private String  isReleaseGroup;

    private String editPermissions;

    private String  readPermissions;

    private String docPicUrl;

    private String docPicUrlIds;

    private String createBy;

    private String reviewId;

    private Integer createById;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm")
    private Date createDate;

    private Date startCreateDate;

    private Date endCreateDate;

    private Date updateDate;

    private int likes;

    private JSONArray picResourceArr;

    private int  readCount;

    private int goodCount;

    private int badCount;

    private int praiseNum;

    private String type;//关联表zsk_knowledge_sys_user 字段type类型

    private Integer userId;//关联表zsk_knowledge_sys_user 字段user_id

    private Integer isWordResource;

    private String createDateStr;//首页搜索展示时间

    private int Crt;

    private Integer countLucene;



}
