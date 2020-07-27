package com.vingsoft.oa;

import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.utils.RedisUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.assertj.core.util.Lists;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;
import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.File;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest
public class LuceneTest {
    @Autowired
    private RedisUtils redisUtils;

    // 创建索引
    public static void testCreate() throws Exception{
        //1 创建文档对象
        Document document = new Document();
        // 创建并添加字段信息。参数：字段的名称、字段的值、是否存储，这里选Store.YES代表存储到文档列表。Store.NO代表不存储
        document.add(new StringField("id", "1", Field.Store.YES));
        // 这里我们title字段需要用TextField，即创建索引又会被分词。StringField会创建索引，但是不会被分词
        document.add(new TextField("title", "java是一个好语言从到2015年12月1日它已经有20年的历史了", Field.Store.YES));

        //2 索引目录类,指定索引在硬盘中的位置
//        File file  = new File("e:\\indexDir");
        Directory directory = FSDirectory.open(new File("e:\\indexDir").toPath());
        //3 创建分词器对象
//        Analyzer analyzer = new StandardAnalyzer();

        Analyzer analyzer = new IKAnalyzer();
        //4 索引写出工具的配置对象
        IndexWriterConfig conf = new IndexWriterConfig(analyzer);
        conf.setOpenMode(IndexWriterConfig.OpenMode.CREATE);//清空原来的索引
//        conf.setOpenMode(IndexWriterConfig.OpenMode.APPEND);//追加新的索引/
        //5 创建索引的写出工具类。参数：索引的目录和配置信息
        IndexWriter indexWriter = new IndexWriter(directory, conf);

        //6 把文档交给IndexWriter
        indexWriter.addDocument(document);
        //7 提交
        indexWriter.commit();
        //8 关闭
        indexWriter.close();
    }

    public static void main(String[] args) throws Exception{
//        LuceneTest.testCreate();
//        LuceneTest.testSearch();
        String str="2012年欧洲杯四强赛黄成留";
        System.out.println(iKSegmenterToList(str));
    }

    @Test
    public  void testSearch() throws Exception {
        // 索引目录对象
        Directory directory = FSDirectory.open(new File("e:\\indexDir").toPath());
        // 索引读取工具
        IndexReader reader = DirectoryReader.open(directory);
        // 索引搜索工具
        IndexSearcher searcher = new IndexSearcher(reader);

        // 创建查询解析器,两个参数：默认要查询的字段的名称，分词器
        QueryParser parser = new QueryParser("knowledgeName", new IKAnalyzer());
        // 创建查询对象
        Query query = parser.parse("分词器");

        // 搜索数据,两个参数：查询条件对象要查询的最大结果条数
        // 返回的结果是 按照匹配度排名得分前N名的文档信息（包含查询到的总条数信息、所有符合条件的文档的编号信息）。
        TopDocs topDocs = searcher.search(query, 10);
        // 获取总条数
        System.out.println("本次搜索共找到" + topDocs.totalHits + "条数据");
        // 获取得分文档对象（ScoreDoc）数组.SocreDoc中包含：文档的编号、文档的得分
        ScoreDoc[] scoreDocs = topDocs.scoreDocs;
        for (ScoreDoc scoreDoc : scoreDocs) {
            // 取出文档编号
            int docID = scoreDoc.doc;
            // 根据编号去找文档
            Document doc = reader.document(docID);
            System.out.println("knowledgeName: " + doc.get("knowledgeName"));
            System.out.println("knowledgeContent: " + doc.get("knowledgeContent"));
            // 取出文档得分
            System.out.println("得分： " + scoreDoc.score);
        }
    }

    public static List<String> iKSegmenterToList(String target) throws Exception {
        if (StringUtils.isEmpty(target)){
            return Lists.newArrayList();
        }
        List<String> result = new ArrayList<>();
        StringReader sr = new StringReader(target);
        // 关闭智能分词 (对分词的精度影响较大)
//        Analyzer analyzer = new IKAnalyzer(false);
        IKSegmenter ik = new IKSegmenter(sr, false);
        Lexeme lex;
        while((lex=ik.next())!=null) {
            String lexemeText = lex.getLexemeText();
            result.add(lexemeText);
        }

        //LOGGER.info("company:{}, iKSegmenterToList:{}", target, JSON.toJSON(result));
        return result;
    }

    @Test
    public void test(){
    }
    @Test
    public  void init(){
        Map<Object, Object> crt = redisUtils.hmget("crt");
//        if (crt == null || crt.size() == 0) return null;
        if(crt!=null&&crt.size()>0){
            crt.entrySet().forEach((e)->{
                DocKnowledge docKnowledge = new DocKnowledge();
                docKnowledge.setUuid(Long.valueOf(e.getKey().toString().split("::")[0]));
                docKnowledge.setCrt((int)e.getValue());
                System.out.println(docKnowledge);
            });
        }


    }

}
