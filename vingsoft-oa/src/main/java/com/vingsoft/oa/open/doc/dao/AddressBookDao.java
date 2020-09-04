package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.oa.open.doc.entity.AddressBook;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

@SqlResource("doc.addressBook")
public interface AddressBookDao extends BaseMapper<AddressBook> {

    /**
     * 根据id查询
     * @param id
     * @return
     */
    AddressBook findAddressBookById(@Param("id") Integer id);

    /**
     * 根据name查询
     * @param name
     * @return
     */
    AddressBook findAddressBookByName(@Param("name") String name);

    /**
     * 导出所有
     * @return
     */
    List<AddressBook> findAddressBookList();

}
