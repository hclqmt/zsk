package com.vingsoft.oa.open.doc.service;

import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.KnowledgeAttentionSysUserDao;
import com.vingsoft.oa.open.doc.entity.KnowledgeAttentionSysUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class KnowledgeAttentionSysUserService extends BaseService<KnowledgeAttentionSysUser> {

    @Autowired
    private KnowledgeAttentionSysUserDao knowledgeAttentionSysUserDao;

    public int findCount(Long knowledgeUuid,Long userId){
        return knowledgeAttentionSysUserDao.findCount(knowledgeUuid,userId);
    }
    public KnowledgeAttentionSysUser findByOther(Long knowledgeUuid,Long userId){
        return knowledgeAttentionSysUserDao.findByOther(knowledgeUuid,userId);
    }
}
