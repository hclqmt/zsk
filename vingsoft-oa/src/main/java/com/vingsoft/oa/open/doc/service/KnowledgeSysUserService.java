package com.vingsoft.oa.open.doc.service;

import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgeSysUserDao;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.KnowledgeSysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class KnowledgeSysUserService extends BaseService<KnowledgeSysUser> {

    @Autowired
    private KnowledgeSysUserDao knowledgeSysUserDao;

    public int findCount(Long knowledgeUuid,Long userId,int type){
        return knowledgeSysUserDao.findCount(knowledgeUuid,userId,type);
    }
    public KnowledgeSysUser findByOther(Long knowledgeUuid,Long userId,int type){
        return knowledgeSysUserDao.findByOther(knowledgeUuid,userId,type);
    }
    public void updataBatchGoodList(List<KnowledgeSysUser> list){
        sqlManager.insertBatch(KnowledgeSysUser.class, list);
    }

    public void updataBatchBadList(List<KnowledgeSysUser> list){
        sqlManager.insertBatch(KnowledgeSysUser.class, list);
    }

    public int deleteByType(KnowledgeSysUser knowledgeSysUser){
        return sqlManager.deleteObject(knowledgeSysUser);
    }
}
