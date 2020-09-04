package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.AddressBookDao;
import com.vingsoft.oa.open.doc.entity.AddressBook;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AddressBookService extends BaseService<AddressBook> {

    @Autowired
    private AddressBookDao addressBookDao;

    /**
     * 查询区划，分页
     * @param addressBook
     * @return
     */
    public LayuiResponse findPage(AddressBook addressBook) {
        PageQuery query = findPage("doc.addressBook.findPage", addressBook);
        //封装成layui返回数据格式
        LayuiResponse response = new LayuiResponse();
        response.setCount(query.getTotalRow());
        response.setData(query.getList());
        return response;
    }

    public AddressBook findAddressBookById(Integer id){
        return addressBookDao.findAddressBookById(id);
    }

    public AddressBook findAddressBookByName(String name){
        return addressBookDao.findAddressBookByName(name);

    }
    public List<AddressBook> findAddressBookList(){
        return addressBookDao.findAddressBookList();
    }
}
