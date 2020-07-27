package com.vingsoft.oa.open.doc.service;

import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgeSysUserDao;
import com.vingsoft.oa.open.doc.dao.PraiseSysUserDao;
import com.vingsoft.oa.open.doc.entity.KnowledgeSysUser;
import com.vingsoft.oa.open.doc.entity.PraiseSysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PraiseSysUserService extends BaseService<PraiseSysUser> {

    @Autowired
    private PraiseSysUserDao praiseSysUserDao;

    public int findCount(Long knowledgeUuid,Long userId){
        return praiseSysUserDao.findCount(knowledgeUuid,userId);
    }
    public PraiseSysUser findByOther(Long knowledgeUuid,Long userId){
        return praiseSysUserDao.findByOther(knowledgeUuid,userId);
    }
}
