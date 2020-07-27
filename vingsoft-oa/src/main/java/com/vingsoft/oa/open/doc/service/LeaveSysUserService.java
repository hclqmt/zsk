package com.vingsoft.oa.open.doc.service;

import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.LeaveSysUserDao;
import com.vingsoft.oa.open.doc.entity.LeaveSysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LeaveSysUserService extends BaseService<LeaveSysUser> {

    @Autowired
    private LeaveSysUserDao leaveSysUserDao;

    public int findCount(Long leaveMessageId,Long userId,int type){
        return leaveSysUserDao.findCount(leaveMessageId,userId,type);
    }
    public LeaveSysUser findByOther(Long leaveMessageId,Long userId,int type){
        return leaveSysUserDao.findByOther(leaveMessageId,userId,type);
    }
    public void updataBatchGoodList(List<LeaveSysUser> list){
        sqlManager.insertBatch(LeaveSysUser.class, list);
    }

    public void updataBatchBadList(List<LeaveSysUser> list){
        sqlManager.insertBatch(LeaveSysUser.class, list);
    }

    public int deleteByType(LeaveSysUser leaveSysUser){
        return sqlManager.deleteObject(leaveSysUser);
    }
}
