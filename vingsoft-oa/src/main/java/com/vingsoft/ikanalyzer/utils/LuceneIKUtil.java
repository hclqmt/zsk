package com.vingsoft.ikanalyzer.utils;

import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.service.DocKnowledgeService;
import com.vingsoft.utils.ObjectKit;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.document.*;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.Term;
import org.apache.lucene.queryparser.classic.MultiFieldQueryParser;
import org.apache.lucene.search.*;
import org.apache.lucene.search.highlight.Scorer;
import org.apache.lucene.search.highlight.*;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.apache.lucene.store.RAMDirectory;
import org.springframework.stereotype.Component;
import org.wltea.analyzer.lucene.IKAnalyzer;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
@Component
public class LuceneIKUtil {
    private Directory directory ;
    private Analyzer analyzer ;
    private Directory ramDirectory;
    private static byte[] synchronized_r = new byte[0];
    private static SearcherManager searcherManager = null;
//    //关键点一   静态初使化一个工具类，这样是为了在spring初使化之前
//    private static LuceneIKUtil  luceneIKUtil ;
//
//    public void setDocKnowledgeService(DocKnowledgeService  docKnowledgeService) {
//        this.docKnowledgeService = docKnowledgeService;
//    }
//
//    //关键点二   通过@PostConstruct 和 @PreDestroy 方法 实现初始化和销毁bean之前进行的操作
//    @PostConstruct
//    public void init() {
//        luceneIKUtil = this;
//        luceneIKUtil.docKnowledgeService = this.docKnowledgeService;   //
//    }
    /**
     * 带参数构造,参数用来指定索引文件目录
     * @param indexFilePath
     */
    public LuceneIKUtil(String indexFilePath){
        try {
            //文档添加到内存索引
            ramDirectory= new RAMDirectory();
            //添加内存索引到磁盘索引
            directory = FSDirectory.open(new File(indexFilePath).toPath());
            analyzer = new IKAnalyzer();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 默认构造,使用系统默认的路径作为索引
     */
    public LuceneIKUtil(){
        this("lucene-index");
    }
    /**
     * 创建索引 一次性添加所有的索引
     * Description：
     * @author dennisit@163.com Apr 3, 2013
     * @throws Exception
     */
    public void createIndex(DocKnowledgeService docKnowledgeService)throws Exception{
        IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
        indexWriterConfig.setUseCompoundFile(true);//采用多文件索引结构,默认为复合索引
        indexWriterConfig.setOpenMode(IndexWriterConfig.OpenMode.CREATE);//清空原来的索引
        IndexWriter indexWriter = new IndexWriter(directory,indexWriterConfig);
        indexWriter.commit();
        List<DocKnowledge> knowledgeList = docKnowledgeService.findKnowledgeList();
        try {
            knowledgeList.forEach((knowledge)->{
                Document document = addDocument(knowledge.getUuid().intValue(), knowledge.getKnowledgeName(), knowledge.getKnowledgeContent(),knowledge.getCreateDate(),knowledge.getDocClassify(),knowledge.getDocType());
                try {

                    indexWriter.addDocument(document);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
        }catch (Exception e){

        }finally {
            try {
                indexWriter.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
//        indexWriter.addIndexes(new Directory[]{ramDirectory});//添加内存索引到磁盘索引
    }

    /**
     * 添加索引
     * @param knowledge
     * @throws Exception
     */
    public void appendIndex(DocKnowledge knowledge)throws Exception{
        IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
        indexWriterConfig.setUseCompoundFile(true);//采用多文件索引结构,默认为复合索引
        indexWriterConfig.setOpenMode(IndexWriterConfig.OpenMode.APPEND);//清空原来的索引
        IndexWriter indexWriter = new IndexWriter(directory,indexWriterConfig);
        Document document = addDocument(knowledge.getUuid().intValue(), knowledge.getKnowledgeName(), knowledge.getKnowledgeContent(),knowledge.getCreateDate(),
                knowledge.getDocClassify(),knowledge.getDocType());
        indexWriter.addDocument(document);
        indexWriter.commit();
        indexWriter.close();
    }


    /**
     *
     * @param uuid
     * @param knowledgeName
     * @param knowledgeContent
     * @param createDate
     * @return
     */
    public Document addDocument(Integer uuid, String knowledgeName, String knowledgeContent, Date createDate,String docClassify,String docType){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        if(ObjectKit.isNull(createDate)){
            createDate = new Date();
        }
        String format = sdf.format(createDate);
        Document doc = new Document();
//        @Deprecated
//        public final class LegacyIntField extends Field
//        lucene6推荐使用的是IntPoint类用来存储整形Field，这个类在使用时有以下几点需要注意：
//        1.如果要存储，必须创建同名的StoredField类
//        2.如果要排序使用，必须同时创建同名的StoredField类与NumericDocValuesField类
        doc.add(new IntPoint("uuid",uuid));
        doc.add(new NumericDocValuesField("uuid",uuid));
        doc.add(new StoredField("uuid",uuid));

        if (ObjectKit.isNull(knowledgeContent)){
            knowledgeContent = "";
        }
        if (ObjectKit.isNull(knowledgeName)){
            knowledgeName = "";
        }
        if (ObjectKit.isNull(docType)){
            docType = "";
        }
        if (ObjectKit.isNull(docClassify)){
            docClassify = "";
        }
        doc.add(new TextField("knowledgeName",knowledgeName, Field.Store.YES));
        doc.add(new TextField("knowledgeContent",knowledgeContent, Field.Store.YES));
        doc.add(new TextField("createDate",format, Field.Store.YES));
        doc.add(new StringField("docType",docType, Field.Store.YES));
        doc.add(new StringField("docClassify",docClassify, Field.Store.YES));
        return doc;
    }

    /**
     *
     * Description： 更新索引
     */
    public void update(DocKnowledge docKnowledge){
        IndexWriter indexWriter = null;
        try {
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
            indexWriterConfig.setOpenMode(IndexWriterConfig.OpenMode.CREATE);
            indexWriter = new IndexWriter(directory,indexWriterConfig);
            Term term = new Term("uuid",String.valueOf(docKnowledge.getUuid()));
            Document document = addDocument(docKnowledge.getUuid().intValue(),docKnowledge.getKnowledgeName(),docKnowledge.getKnowledgeContent(),docKnowledge.getUpdateDate(),docKnowledge.getDocClassify(),docKnowledge.getDocType());
            indexWriter.updateDocument(term, document);
            indexWriter.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            if (ObjectKit.isNotNull(indexWriter)) {
                try {
                    indexWriter.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    /**
     * 检查一下索引文件
     */
    public void check() {
        DirectoryReader directoryReader = null;
        try {
            directoryReader = DirectoryReader.open(directory);
            // 通过reader可以有效的获取到文档的数量
            // 有效的索引文档
            System.out.println("有效的索引文档:" + directoryReader.numDocs());
            // 总共的索引文档
            System.out.println("总共的索引文档:" + directoryReader.maxDoc());
            // 删掉的索引文档，其实不恰当，应该是在回收站里的索引文档
            System.out.println("删掉的索引文档:" + directoryReader.numDeletedDocs());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (directoryReader != null) {
                    directoryReader.close();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     *
     * Description：按照ID进行索引
     * @param uuid
     */
    public void delete(Integer uuid){
        try {
            IndexWriterConfig indexWriterConfig = new IndexWriterConfig(analyzer);
            IndexWriter indexWriter = new IndexWriter(directory,indexWriterConfig);
            Term term = new Term("uuid",String.valueOf(uuid));
            indexWriter.deleteDocuments(term);
            indexWriter.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     *
     * Description：查询
     * @author dennisit@163.com Apr 3, 2013
     */
    public List<DocKnowledge> search(String[] fields,String keyword,Integer page,Integer limit){

        IndexSearcher indexSearcher = null;
        List<DocKnowledge> result = new ArrayList<>();
        try {
            indexSearcher = getIndexSearcher();
            MultiFieldQueryParser queryParser =new MultiFieldQueryParser(fields,analyzer);
            // 创建查询解析器,两个参数：默认要查询的字段的名称，分词器
            // QueryParser parser = new QueryParser(keyword, new IKAnalyzer());
            Query query = queryParser.parse(keyword);
            //返回前number条记录
            TopDocs topDocs = indexSearcher.search(query, 10);
            //获取上一页的最后一个元素
            ScoreDoc lastSd = getLastScoreDoc(page, limit, query, indexSearcher);
            //通过最后一个元素去搜索下一页的元素
            TopDocs tds = indexSearcher.searchAfter(lastSd,query, limit);
            //总数
            int totalCount = tds.totalHits;

            /**
             *  创建高亮器,使搜索的结果高亮显示
             *             SimpleHTMLFormatter：用来控制你要加亮的关键字的高亮方式
             *             此类有2个构造方法
             *             1：SimpleHTMLFormatter()默认的构造方法.加亮方式：<B>关键字</B>
             *             2：SimpleHTMLFormatter(String preTag, String postTag).加亮方式：preTag关键字postTag
             */
            Formatter formatter = new SimpleHTMLFormatter("<font color='red'>","</font>");
            /**
             * QueryScorer
             *                 QueryScorer 是内置的计分器。计分器的工作首先是将片段排序。QueryScorer使用的项是从用户输入的查询中得到的；
             *                 它会从原始输入的单词、词组和布尔查询中提取项，并且基于相应的加权因子（boost factor）给它们加权。
             *                 为了便于QueryScoere使用，还必须对查询的原始形式进行重写。
             *                 比如，带通配符查询、模糊查询、前缀查询以及范围查询 等，都被重写为BoolenaQuery中所使用的项。
             *                 在将Query实例传递到QueryScorer之前，可以调用Query.rewrite (IndexReader)方法来重写Query对象
             */
            Scorer fragmentScorer = new QueryScorer(query);
            Highlighter highlighter = new Highlighter(formatter,fragmentScorer);
            Fragmenter fragmenter = new SimpleFragmenter(100);
            /*
                Highlighter利用Fragmenter将原始文本分割成多个片段。
                      内置的SimpleFragmenter将原始文本分割成相同大小的片段，片段默认的大小为100个字符。这个大小是可控制的。
             */
            highlighter.setTextFragmenter(fragmenter);

//            ScoreDoc[] scoreDocs = topDocs.scoreDocs;

            for(ScoreDoc scDoc:tds.scoreDocs){
                Document  document = indexSearcher.doc(scDoc.doc);
                Integer uuid = Integer.parseInt(document.get("uuid"));
                String docType = document.get("docType");
                String docClassify = document.get("docClassify");
                String knowledgeName = document.get("knowledgeName");
                String knowledgeContent = document.get("knowledgeContent");
                String createDate = document.get("createDate");
                //float score = scDoc.score; //相似度

                String lighterKnowledgeName = highlighter.getBestFragment(analyzer, "knowledgeName", knowledgeName);
                if(null==lighterKnowledgeName){
                    lighterKnowledgeName = knowledgeName;
                }

                String lighterKnowledgeContent = highlighter.getBestFragment(analyzer, "knowledgeContent", knowledgeContent);
                if(null==lighterKnowledgeContent){
                    lighterKnowledgeContent = knowledgeContent;
                }

                String lighterCreateDate = highlighter.getBestFragment(analyzer, "createDate", createDate);
                if(null==lighterCreateDate){
                    lighterCreateDate = createDate;
                }

                DocKnowledge docKnowledge  = new DocKnowledge();
                docKnowledge.setUuid(Long.valueOf(uuid));
                docKnowledge.setDocClassify(docClassify);
                docKnowledge.setDocType(docType);
                docKnowledge.setKnowledgeName(lighterKnowledgeName);
                docKnowledge.setKnowledgeContent(lighterKnowledgeContent);
                docKnowledge.setCreateDateStr(lighterCreateDate);
//                docKnowledge.setCreateDate(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(lighterCreateDate));
                docKnowledge.setCountLucene(totalCount);
                result.add(docKnowledge);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            try {
                closeIndexSearcher(indexSearcher);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return result;
    }
    /*
     * 解决：实现实时搜索功能
     * 解决：在读取索引文件内容时，索引文件的打开操作IndexSearcher是个非常耗时耗资源的操作
     * */
    private  IndexSearcher getIndexSearcher() throws IOException {
        IndexSearcher indexSearcher = null;
        //保证在同一时刻最多只有一个线程执行该段代码
        synchronized (synchronized_r) {
            if(searcherManager == null) {
                searcherManager = new SearcherManager(DirectoryReader.open(directory), new SearcherFactory());
            }
            /*
             * 这个方法同DirectoryReader.openIfChanged(dirReader)效果一样，其实底层还是调用的该方法实现的
             * DirectoryReader.openIfChanged(dirReader)可以判断当前Reader对象的索引有没有被修改过
             * 如果索引文件被更新过则重新加载该索引目录
             * 但是这个时候的重新加载则比单纯的open(indexPath)要高效很多
             * 它只是重新加载被更新过的文档，而单纯的open则是加载全部的文档
             * */
            searcherManager.maybeRefresh();
            //借用一个IndexSearcher对象的引用，记住该对象用完之后要归还的，有借有还再借不难
            indexSearcher = searcherManager.acquire();
        }
        return indexSearcher;
    }

    private  void closeIndexSearcher(IndexSearcher indexSearcher) throws IOException {
        if(indexSearcher != null) {
            searcherManager.release(indexSearcher);//归还从SearcherManager处借来的IndexSearcher对象
        }
        indexSearcher = null;
    }

    /**
     * 根据页码和分页大小获取上一次的最后一个scoredocs
     * @param pageIndex
     * @param pageSize
     * @param query
     * @param searcher
     * @return
     * @throws IOException
     */
    private ScoreDoc getLastScoreDoc(int pageIndex,int pageSize,Query query,IndexSearcher searcher) throws IOException {
        if(pageIndex==1)return null;//如果是第一页就返回空
        int num = pageSize*(pageIndex-1);//获取上一页的最后数量
        TopDocs tds = searcher.search(query, num);
        return tds.scoreDocs[num-1];
    }
}
