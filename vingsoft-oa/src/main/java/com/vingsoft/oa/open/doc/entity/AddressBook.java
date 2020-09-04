package com.vingsoft.oa.open.doc.entity;

import com.vingsoft.oa.common.base.BaseEntity;
import lombok.Data;
import org.beetl.sql.core.annotatoin.Table;

import java.io.Serializable;

/**
 * @Author hcl
 * @Date 2020/9/3 10:35
 */
@Data
@Table(name = "zsk_address_book")
public class AddressBook extends BaseEntity implements Serializable {
    private Integer id;
    /**
     * 姓名
     */
    private String name;
    //地址
    private String address;
    //电话
    private String phone;
    //备注
    private String remark;
    //职位
    private String position;
}
