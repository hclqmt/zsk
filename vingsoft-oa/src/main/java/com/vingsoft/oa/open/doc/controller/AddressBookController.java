package com.vingsoft.oa.open.doc.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.core.response.SimpleResponse;
import com.vingsoft.oa.common.LoginUser;
import com.vingsoft.oa.common.base.BaseController;
import com.vingsoft.oa.open.doc.entity.AddressBook;
import com.vingsoft.oa.open.doc.entity.LeaveMessage;
import com.vingsoft.oa.open.doc.entity.SysUser;
import com.vingsoft.oa.open.doc.service.AddressBookService;
import com.vingsoft.oa.open.doc.service.LeaveMessageService;
import com.vingsoft.oa.open.doc.service.SysUserService;
import com.vingsoft.utils.ObjectKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

/**
 * @Author hcl
 * @Date 2020/9/3 10:45
 */
@RestController
@RequestMapping("/doc/addressBook")
@Transactional
public class AddressBookController extends BaseController {

    private String PREFIX="/open/doc/addressBook/";

    @Autowired
    private AddressBookService addressBookService;

    @Autowired
    private SysUserService sysUserService;

    @Autowired
    private LeaveMessageService leaveMessageService;

    @GetMapping("/addressBookList")
    public ModelAndView list(HttpSession session) {
        mav.setViewName(PREFIX+"addressBookList");
        return mav;
    }

    @GetMapping("/queryAddressBookList")
    public void queryList(AddressBook addressBook){
        LayuiResponse layuiResponse = addressBookService.findPage(addressBook);
        returnJson(layuiResponse);
    }

    @GetMapping("/excelAddressBookList")
    @ResponseBody
    public SimpleResponse excelList(){
        SimpleResponse response = new SimpleResponse();
        List<AddressBook> addressBookList = addressBookService.findAddressBookList();
        response.setCode(0);
        response.setMsg("导出成功");
        response.setCount(addressBookList.size());
        String s = JSON.toJSONString(addressBookList);
        String s1 = JSONArray.toJSONString(addressBookList);
        response.setData(s);
        return response;
    }
    @DeleteMapping("/delete")
    public SimpleResponse delete(@RequestBody List<Long> roleId) {
        SimpleResponse response = null;
        if(addressBookService.forceDelete(roleId)) {
            response = new SimpleResponse(1, "删除成功");
        }else {
            response = new SimpleResponse("删除失败");
        }
        return response;
    }

    @PostMapping("/save")
    public SimpleResponse save(AddressBook addressBook) {
        SimpleResponse response = null;
        try {
            if (addressBook.getId()!=null&&addressBook.getId()>0){
                addressBookService.updateTemplate(addressBook);
                response = new SimpleResponse(1,"修改成功",200);
            }else{
                addressBookService.save(addressBook);
                response = new SimpleResponse(1,"添加成功",200);
            }
            return response;

        }catch (Exception e){
            response = new SimpleResponse(0,"操作失败",500);
            return response;
        }

    }

    @PostMapping("/addLeave")
    public SimpleResponse addLeave(String receiverName,String senderContent) {
        SysUser sysUserNow = LoginUser.getInstance();
        SimpleResponse response = null;
        try {
            SysUser sysUser = sysUserService.findUserByUsername(receiverName);
            if (ObjectKit.isNotNull(sysUser)){
                Integer id = sysUser.getId();
                LeaveMessage leaveMessage = new LeaveMessage();
                leaveMessage.setSysUserId(id);
                leaveMessage.setCreateDate(new Date());
                leaveMessage.setUserId(sysUserNow.getId());
                leaveMessage.setNickname(sysUserNow.getNickname());
                leaveMessage.setContent(senderContent);
                leaveMessage.setPraiseNum(0);
                leaveMessage.setOppositionNum(0);
                if (receiverName.equals(sysUserNow.getNickname())){
                    response = new SimpleResponse(0,"自己不需要给自己留言哦",500);
                }else if (leaveMessageService.save(leaveMessage)){
                    response = new SimpleResponse(1,"留言成功",200);
                }else{
                    response = new SimpleResponse(0,"留言失败",500);
                }

            }else{
                response = new SimpleResponse(0,"没有该用户",500);
            }
            return response;

        }catch (Exception e){
            response = new SimpleResponse(0,"留言失败",500);
            return response;
        }

    }
}
