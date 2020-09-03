package com.vingsoft.oa.config.quartz;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.KnowledgeSysUser;
import com.vingsoft.oa.open.doc.service.DocKnowledgeService;
import com.vingsoft.oa.open.doc.service.KnowledgeSysUserService;
import com.vingsoft.utils.RedisUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

@Component
@EnableScheduling
/**
 * @author hcl
 */
public class KnowledgeCrtTask {
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private DocKnowledgeService docKnowledgeService;

    @Autowired
    private KnowledgeSysUserService knowledgeSysUserService;

    @Autowired
    private RedisUtils redisUtils;
    //定时任务
    public void crtTask() {
        Map<Object, Object> crt = redisUtils.hmget("crt");
        if(crt!=null&&crt.size()>0){
            crt.entrySet().forEach((e)->{
                Long uuid = Long.valueOf(e.getKey().toString().split("::")[0]);
                DocKnowledge docKnowledge = docKnowledgeService.findByUuid(uuid);
                docKnowledge.setCrt((int)e.getValue());
                docKnowledgeService.updateTemplate(docKnowledge);
                redisUtils.del("crt");
                redisUtils.del(docKnowledge.getUuid()+"::crtNum");
                System.out.println(docKnowledge);
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
        if (lists == null || lists.size() == 0) {
            return null;
        }
        List<KnowledgeSysUser> list = new ArrayList<>();
        KnowledgeSysUser knowledgeSysUser = new KnowledgeSysUser();
        Map<String,Object>[] maps;
        lists.forEach((g)->{
            Map<String,Object> goodPraiseMap = JSONObject.parseObject(JSON.toJSONString(g));
            goodPraiseMap.entrySet().forEach((e)->{
                String key = e.getKey();
                String[] split = key.split("::");
                System.out.println(Arrays.toString(split));
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
        if (lists == null || lists.size() == 0) {
            return null;
        }
        List<String> list = new ArrayList<>();
        lists.forEach((g)->{
            Map<String,Object> goodPraiseMap = JSONObject.parseObject(JSON.toJSONString(g));
            goodPraiseMap.entrySet().forEach((e)->{
                String key = e.getKey();
                String[] split = key.split("::");
                System.out.println(split);
                list.add(split[0]);
            });

        });
        return list;
    }
    protected List<DocKnowledge> getResult(List<Object> lists){
        List<DocKnowledge> docKnowledgeList = new ArrayList<>();
        if (lists == null || lists.size() == 0) {
            return docKnowledgeList;
        }
        getCount(getList(lists)).forEach((e1,e2)->{
            DocKnowledge docKnowledge = new DocKnowledge();
            docKnowledge.setUuid(Long.valueOf(e1));
            docKnowledge.setCrt(e2);
            docKnowledgeList.add(docKnowledge);
        });
        return docKnowledgeList;
    }
}
