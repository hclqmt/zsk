package com.vingsoft.oa.config.quartz;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.KnowledgeSysUser;
import com.vingsoft.oa.open.doc.service.DocKnowledgeService;
import com.vingsoft.oa.open.doc.service.KnowledgeSysUserService;
import com.vingsoft.utils.RedisUtils;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class KnowledgeTask extends QuartzJobBean {
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private DocKnowledgeService docKnowledgeService;

    @Autowired
    private KnowledgeSysUserService knowledgeSysUserService;
    
    @Autowired
    private RedisUtils redisUtils;


    @Override
    protected void executeInternal(JobExecutionContext jobExecutionContext) throws JobExecutionException {
//        List<Object> goodPraise = redisUtils.lGet(RedisKeyUtils.PERSON_GOOD_PRAISE_COUNT, 0, -1);
//        List<Object> badPraise = redisUtils.lGet(RedisKeyUtils.PERSON_BAD_PRAISE_COUNT, 0, -1);
//        if(goodPraise!=null&&goodPraise.size()>0){
//            docKnowledgeService.updataBatchGoodList(getResult(goodPraise));
//            knowledgeSysUserService.updataBatchGoodList(getIdAndUuidList(goodPraise));
//            redisUtils.del(RedisKeyUtils.PERSON_GOOD_PRAISE_COUNT);
//        }
//        if (badPraise!=null&&badPraise.size()>0){
//            docKnowledgeService.updataBatchBadList(getResult(badPraise));
//            knowledgeSysUserService.updataBatchGoodList(getIdAndUuidList(badPraise));
//            redisUtils.del(RedisKeyUtils.PERSON_BAD_PRAISE_COUNT);
//        }
//        LuceneIKUtil luceneProcess = new LuceneIKUtil("E:/indexDir");
//        try {
//            luceneProcess.createIndex(docKnowledgeService);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        List<Object> crt = redisUtils.lGet("crt", 0, -1);
        List<DocKnowledge> list = getResult(crt);
        if (list!=null&&list.size()>0){
            list.forEach((knowledge)->{
                DocKnowledge byUuid = docKnowledgeService.findByUuid(knowledge.getUuid());
                byUuid.setCrt(knowledge.getCrt());
                System.out.println(byUuid.getCrt());
                docKnowledgeService.updateTemplate(byUuid);
                redisUtils.del(knowledge.getUuid()+"::crtNum");
                redisUtils.lPop("crt");
            });
        }
    }
    protected Map<String,Integer> getCount(List<String> list){
        if (list == null || list.size() == 0) return null;
        Map<String,Integer> map = new HashMap<>();
        list.forEach((l)->{
            Integer count = map.get(l);
            map.put(l,count==null?1:count+1);
        });
        return map;

    }

    //获得所以知识的集合
    protected List<KnowledgeSysUser> getIdAndUuidList(List<Object> lists){
        if (lists == null || lists.size() == 0) return null;
        List<KnowledgeSysUser> list = new ArrayList<>();
        KnowledgeSysUser knowledgeSysUser = new KnowledgeSysUser();
        Map<String,Object>[] maps;
        lists.forEach((g)->{
            Map<String,Object> goodPraiseMap = JSONObject.parseObject(JSON.toJSONString(g));
            goodPraiseMap.entrySet().forEach((e)->{
                String key = e.getKey();
                String[] split = key.split("::");
                System.out.println(split);
                knowledgeSysUser.setUserId(Long.valueOf(split[0]));
                knowledgeSysUser.setKnowledgeUuid(Long.valueOf(split[1]));
                if("badCount".equals(split[2])){
                    knowledgeSysUser.setType(2);
                }else if("goodCount".equals(split[2])){
                    knowledgeSysUser.setType(1);
                }
                list.add(knowledgeSysUser);
            });

        });
        return list;
    }
    //获得所有用户id和知识id的集合
    protected List<String> getList(List<Object> lists){
        if (lists == null || lists.size() == 0) return null;
        List<String> list = new ArrayList<>();
        lists.forEach((g)->{
            Map<String,Object> goodPraiseMap = JSONObject.parseObject(JSON.toJSONString(g));
            goodPraiseMap.entrySet().forEach((e)->{
                String key = e.getKey();
                String[] split = key.split("::");
                System.out.println(split);
                list.add(split[1]);
            });

        });
        return list;
    }
    protected List<DocKnowledge> getResult(List<Object> lists){
        List<DocKnowledge> docKnowledgeList = new ArrayList<>();
        if (lists == null || lists.size() == 0) return docKnowledgeList;
        getCount(getList(lists)).forEach((e1,e2)->{
            DocKnowledge docKnowledge = new DocKnowledge();
            docKnowledge.setUuid(Long.valueOf(e1));
            docKnowledge.setGoodCount(e2);
            docKnowledgeList.add(docKnowledge);
        });
        return docKnowledgeList;
    }

}
