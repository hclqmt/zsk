package com.vingsoft.oa.open.doc.controller;

import org.beetl.sql.core.*;
import org.beetl.sql.core.db.MySqlStyle;
import org.beetl.sql.ext.DebugInterceptor;
import org.beetl.sql.ext.gen.GenConfig;
import org.beetl.sql.ext.gen.GenFilter;
import org.beetl.sql.ext.gen.MapperCodeGen;


/**
 *  * @功能：beetl读取数据库，自动生成实体类、md文件、dao
 *  * @开发者： 大BUG
 *  * @编写时间： 2019/1/21 17:01
 *  
 */
public class BeetSql {
    private static String DRIVER_CLASS="com.mysql.jdbc.Driver";
    private static String URL="jdbc:mysql://101.132.106.182:3306/cs_appral?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC";
    private static String USER_NAME="root";
    private static String PASSWORD="123456";
    private static String MAPPER_TEMPLATE="package ${package};\n" +
            "import org.beetl.sql.core.annotatoin.*;\n" +
            "import org.beetl.sql.core.db.KeyHolder;\n" +
            "import org.beetl.sql.core.engine.PageQuery;\n" +
            "import org.beetl.sql.core.mapper.BaseMapper;\n" +
            "import org.springframework.stereotype.Repository;\n" +
            "${imports}\n" +
            "/*\n" +
            "* \n" +
            "* gen by beetlsql mapper ${date(),\"yyyy-MM-dd\"}\n" +
            "*/\n" +
            "@Repository\n" +
            "public interface ${className} extends BaseMapper<${entityClass}> {\n" +
            "\t\n" +
            "}\n";
    public static void main(String[] args) {
        try {
            sqlGenerator();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    public static void sqlGenerator() throws Exception {
        ConnectionSource source = ConnectionSourceHelper.getSimple(DRIVER_CLASS, URL, USER_NAME, PASSWORD);
        SQLLoader loader = new ClasspathLoader("/com");
        UnderlinedNameConversion nc = new UnderlinedNameConversion();
        SQLManager sqlManager = new SQLManager(new MySqlStyle(), loader, source, nc, new Interceptor[]{new DebugInterceptor()});
        GenConfig config = new GenConfig();
//        config.setDisplay(true);

        MapperCodeGen mapper = new MapperCodeGen("com.vingsoft.oa.dao");//此类有两个构造函数，请看源码
//        mapper.setMapperTemplate((new GenConfig()).getTemplate("/org/beetl/sql/ext/gen/mapper.btl"));//使用beetl默认mapper模板
        mapper.setMapperTemplate(MAPPER_TEMPLATE);//使用自己略微修改过的mapper模板
        config.codeGens.add(mapper);

        //生成所有的数据库pojo实体和sql文件
        sqlManager.genALL("com.vingsoft.oa.entity", config, new GenFilter() {
            @Override
            public boolean accept(String s) {
                if("comment".equals(s)){//此处comment为表名，如果不判断，直接返回true那么是生成所有表对应的类和sql文件
                    return true;
                }else {
                    return false;
                }


//                return true;//生成所有的代码
            }
        });
//
//
        sqlManager.genPojoCode("zsk_doc_knowledge","com.vingsoft.oa.open.doc.entity");//单独生成pojo实体类  注：article是数据库表名
        sqlManager.genSQLFile("zsk_doc_knowledge",config);//单独生成生成sql文件
    }
}

