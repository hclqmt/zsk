package com.vingsoft.oa.config.beetl;


import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.beetl.sql.core.ClasspathLoader;
import org.beetl.sql.core.IDAutoGen;
import org.beetl.sql.core.Interceptor;
import org.beetl.sql.core.SQLLoader;
import org.beetl.sql.core.UnderlinedNameConversion;
import org.beetl.sql.core.db.MySqlStyle;
import org.beetl.sql.core.db.OracleStyle;
import org.beetl.sql.ext.DebugInterceptor;
import org.beetl.sql.ext.SimpleCacheInterceptor;
import org.beetl.sql.ext.spring4.BeetlSqlDataSource;
import org.beetl.sql.ext.spring4.BeetlSqlScannerConfigurer;
import org.beetl.sql.ext.spring4.SqlManagerFactoryBean;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import com.alibaba.druid.pool.DruidDataSource;
import com.vingsoft.common.config.idAutoGens.Uuid2AutoGen;

@Configuration
public class BeetlSqlConfig {
	
	private static Logger logger = LoggerFactory.getLogger(BeetlSqlConfig.class);
	
	/**
     * 配置包扫描
     * @return
     */
    @Bean(name = "examSqlScannerConfigurer")
    public BeetlSqlScannerConfigurer getBeetlSqlScannerConfigurer() {
        BeetlSqlScannerConfigurer conf = new BeetlSqlScannerConfigurer();
        conf.setBasePackage("com.vingsoft.oa.modular.dao");
        conf.setDaoSuffix("Dao");
        conf.setSqlManagerFactoryBeanName("sqlManagerFactoryBean");
        return conf;
    }

    @Bean(name = "sqlManagerFactoryBean")
    @Primary
    public SqlManagerFactoryBean getSqlManagerFactoryBean(@Qualifier("dataSource") DataSource datasource) {
        SqlManagerFactoryBean factory = new SqlManagerFactoryBean();
        BeetlSqlDataSource source = new BeetlSqlDataSource();
        source.setMasterSource(datasource);
        factory.setCs(source);
        //设置方言
        factory.setDbStyle(new MySqlStyle());
        //开启缓存
        List<String> lcs = new ArrayList<String>();
        lcs.add("sys_user");
        SimpleCacheInterceptor cache =new SimpleCacheInterceptor(lcs);
        //控制台或者日志系统输出执行的sql语句
        factory.setInterceptors(new Interceptor[]{new DebugInterceptor(),cache});
        //开启驼峰
        factory.setNc(new UnderlinedNameConversion());
        //sql文件路径
        SQLLoader loader = new ClasspathLoader();
        loader.setCharset("UTF-8");
        factory.setSqlLoader(loader);
        //添加
        @SuppressWarnings("rawtypes")
		Map<String,IDAutoGen> idAutoGens = new HashMap<String,IDAutoGen>();
        idAutoGens.put("uuid2", new Uuid2AutoGen());
        factory.setIdAutoGens(idAutoGens);
        return factory;
    }
    
    //开启事务
    @Bean(name = "transactionManager")
    @Primary
    public DataSourceTransactionManager getDataSourceTransactionManager(@Qualifier("dataSource") DataSource datasource) {
        DataSourceTransactionManager dsm = new DataSourceTransactionManager();
        dsm.setDataSource(datasource);
        return dsm;
    }
    
    //主数据源
    @Bean(name = "dataSource")
    @Primary
    public DataSource getDataSource(Environment env) {
        String url = env.getProperty("spring.datasource.url");
        String userName = env.getProperty("spring.datasource.username");
        String password = env.getProperty("spring.datasource.password");
        String driverClass = env.getProperty("spring.datasource.driver-class-name");
        DruidDataSource druidDataSource = new DruidDataSource();
        druidDataSource.setName("dataSource");
        druidDataSource.setUrl(url);
        druidDataSource.setUsername(userName);
        druidDataSource.setPassword(password);
        druidDataSource.setDriverClassName(driverClass);
        
        //druidDataSource配置
        druidDataSource.setMaxActive(env.getProperty("spring.datasource.maxActive",Integer.class));
        druidDataSource.setInitialSize(env.getProperty("spring.datasource.initialSize",Integer.class));
        druidDataSource.setMaxWait(env.getProperty("spring.datasource.maxWaitMillis",Long.class));
        druidDataSource.setMinIdle(env.getProperty("spring.datasource.minIdle",Integer.class));
        druidDataSource.setTimeBetweenEvictionRunsMillis(env.getProperty("spring.datasource.timeBetweenEvictionRunsMillis",Long.class));
        druidDataSource.setMinEvictableIdleTimeMillis(env.getProperty("spring.datasource.minEvictableIdleTimeMillis",Long.class));
        druidDataSource.setValidationQuery(env.getProperty("spring.datasource.validationQuery",String.class));
        druidDataSource.setTestWhileIdle(env.getProperty("spring.datasource.testWhileIdle",Boolean.class));
        druidDataSource.setTestOnBorrow(env.getProperty("spring.datasource.testOnBorrow",Boolean.class));
        druidDataSource.setTestOnReturn(env.getProperty("spring.datasource.testOnReturn",Boolean.class));
        try {
        	druidDataSource.setFilters(env.getProperty("spring.datasource.filters"));
        } catch (SQLException e) {
        	logger.error("druid configuration initialization filter", e);
        }
        return druidDataSource;
    }
}