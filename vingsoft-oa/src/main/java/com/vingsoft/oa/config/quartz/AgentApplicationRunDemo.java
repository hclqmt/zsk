package com.vingsoft.oa.config.quartz;

import com.vingsoft.ikanalyzer.utils.LuceneIKUtil;
import com.vingsoft.ikanalyzer.utils.LuceneProperties;
import com.vingsoft.oa.open.doc.service.DocKnowledgeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * @Auther: hcl
 * @Date: 2020/7/5 10:47
 * @Description:
 */
@Component
@Order(value = 10)//多个接口实现其控制先后顺序
public class AgentApplicationRunDemo implements ApplicationRunner {
    @Autowired
    private DocKnowledgeService docKnowledgeService;

    @Autowired
    private LuceneProperties luceneProperties;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        new Thread(()->{
            System.out.println("项目启动执行Lucene索引存储进硬盘一次");
            LuceneIKUtil luceneProcess = new LuceneIKUtil(luceneProperties.getUrl());
            try {
                luceneProcess.createIndex(docKnowledgeService);
                luceneProcess.check();
            } catch (Exception e) {
                e.printStackTrace();
            }
        },"thread-1").start();

    }

//    SpringMvc
//    @Service
//    public class SearchReceive implements ApplicationListener<ContextRefreshedEvent> {
//        @Override
//        public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
//            if (contextRefreshedEvent.getApplicationContext().getParent() == null) {//保证只执行一次
//                //需要执行的方法
//            }
//        }
//    }
}
