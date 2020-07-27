package com.vingsoft.oa.open.doc.entity;


import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.util.Date;

@Data
@Table(name = "zsk_sys_user")
public class SysUser extends BaseEntity {
    private Integer id;
    private String nickname;
    private Date createDate;
    private Date updateDate;
    private Integer status;
    private String password;
    private String username;
    private String sex;
    private String idCard;
    private Date birthday;
    private Date workingDate;
    private String isMarry;
    private String remark;
    private String email;
    private String iphone;
    private String qq;
    private String selfEvaluation;
    private String careerGoal;
    private String education;
    private String professionalTitle;
    private Date studyTime;
    private String isUnification;
    private String icon;

}
