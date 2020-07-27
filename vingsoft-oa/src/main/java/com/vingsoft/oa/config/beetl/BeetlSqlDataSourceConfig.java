/**
 * <p>
 * Title: BeetlSqlDataSourceConfig.java
 * </p>
 * <p>
 * Description:
 * </p>
 * <p>
 * Company: www.vingsoft.com
 * </p>
 *
 * @author mrtang
 * @date Mar 5, 2019
 * @version 1.0
 *
 */
/*
 * package com.vingsoft.oa.config.beetl;
 * 
 * import java.sql.SQLException;
 * 
 * import javax.sql.DataSource;
 * 
 * import org.beetl.sql.core.ClasspathLoader; import
 * org.beetl.sql.core.Interceptor; import org.beetl.sql.core.SQLLoader; import
 * org.beetl.sql.core.SQLManager; import
 * org.beetl.sql.core.UnderlinedNameConversion; import
 * org.beetl.sql.ext.DebugInterceptor; import
 * org.beetl.sql.ext.spring4.BeetlSqlDataSource; import org.slf4j.Logger; import
 * org.slf4j.LoggerFactory; import
 * org.springframework.beans.factory.annotation.Qualifier; import
 * org.springframework.context.annotation.Bean; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.core.env.Environment; import
 * org.springframework.jdbc.datasource.DataSourceTransactionManager;
 * 
 * import com.alibaba.druid.pool.DruidDataSource; import
 * com.ibeetl.starter.BeetlSqlMutipleSourceCustomize; import
 * com.vingsoft.common.config.idAutoGens.Uuid2AutoGen;
 * 
 *//**
	 * <p>
	 * Title: BeetlSqlDataSourceConfig
	 * </p>
	 * <p>
	 * Description: 多数据源配置
	 * </p>
	 *
	 * @author mrtang
	 * @date Mar 5, 2019
	 *
	 */
/*
 * @Configuration public class BeetlSqlDataSourceConfig {
 * 
 * private static Logger logger =
 * LoggerFactory.getLogger(BeetlSqlDataSourceConfig.class);
 * 
 *//**
	 * 
	 * <p>
	 * Title: getDataSource
	 * </p>
	 * <p>
	 * Description: 第一个数据源
	 * </p>
	 *
	 * @param env
	 * @return
	 *
	 */
/*
 * @Bean(name = "one") public DataSource getDataSourceForOne(Environment env) {
 * String url = env.getProperty("beetlsql.ds.one.url"); String userName =
 * env.getProperty("beetlsql.ds.one.username"); String password =
 * env.getProperty("beetlsql.ds.one.password"); String driverClass =
 * env.getProperty("beetlsql.ds.one.driver-class-name"); DruidDataSource
 * dataSource = new DruidDataSource(); dataSource.setName("one");
 * dataSource.setUrl(url); dataSource.setUsername(userName);
 * dataSource.setPassword(password); dataSource.setDriverClassName(driverClass);
 * 
 * //druidDataSource配置
 * dataSource.setMaxActive(env.getProperty("spring.datasource.maxActive",Integer
 * .class));
 * dataSource.setInitialSize(env.getProperty("spring.datasource.initialSize",
 * Integer.class));
 * dataSource.setMaxWait(env.getProperty("spring.datasource.maxWaitMillis",Long.
 * class));
 * dataSource.setMinIdle(env.getProperty("spring.datasource.minIdle",Integer.
 * class)); dataSource.setTimeBetweenEvictionRunsMillis(env.getProperty(
 * "spring.datasource.timeBetweenEvictionRunsMillis",Long.class));
 * dataSource.setMinEvictableIdleTimeMillis(env.getProperty(
 * "spring.datasource.minEvictableIdleTimeMillis",Long.class));
 * dataSource.setValidationQuery(env.getProperty(
 * "spring.datasource.validationQuery",String.class));
 * dataSource.setTestWhileIdle(env.getProperty("spring.datasource.testWhileIdle"
 * ,Boolean.class));
 * dataSource.setTestOnBorrow(env.getProperty("spring.datasource.testOnBorrow",
 * Boolean.class));
 * dataSource.setTestOnReturn(env.getProperty("spring.datasource.testOnReturn",
 * Boolean.class)); try {
 * dataSource.setFilters(env.getProperty("spring.datasource.filters")); } catch
 * (SQLException e) { logger.error("druid configuration initialization filter",
 * e); } return dataSource; }
 * 
 *//**
	 * 
	 * <p>
	 * Title: getDataSourceWorkFlow
	 * </p>
	 * <p>
	 * Description: 第二个数据源
	 * </p>
	 *
	 * @param env
	 * @return
	 *
	 *//*
		 * 
		 * @Bean(name = "two") public DataSource getDataSourceForTwo(Environment env) {
		 * String url = env.getProperty("beetlsql.ds.two.url"); String userName =
		 * env.getProperty("beetlsql.ds.two.username"); String password =
		 * env.getProperty("beetlsql.ds.two.password"); String driverClass =
		 * env.getProperty("beetlsql.ds.two.driver-class-name"); DruidDataSource
		 * dataSource = new DruidDataSource(); dataSource.setName("two");
		 * dataSource.setUrl(url); dataSource.setUsername(userName);
		 * dataSource.setPassword(password); dataSource.setDriverClassName(driverClass);
		 * 
		 * //druidDataSource配置
		 * dataSource.setMaxActive(env.getProperty("spring.datasource.maxActive",Integer
		 * .class));
		 * dataSource.setInitialSize(env.getProperty("spring.datasource.initialSize",
		 * Integer.class));
		 * dataSource.setMaxWait(env.getProperty("spring.datasource.maxWaitMillis",Long.
		 * class));
		 * dataSource.setMinIdle(env.getProperty("spring.datasource.minIdle",Integer.
		 * class)); dataSource.setTimeBetweenEvictionRunsMillis(env.getProperty(
		 * "spring.datasource.timeBetweenEvictionRunsMillis",Long.class));
		 * dataSource.setMinEvictableIdleTimeMillis(env.getProperty(
		 * "spring.datasource.minEvictableIdleTimeMillis",Long.class));
		 * dataSource.setValidationQuery("SELECT 'x' from dual");
		 * dataSource.setTestWhileIdle(env.getProperty("spring.datasource.testWhileIdle"
		 * ,Boolean.class));
		 * dataSource.setTestOnBorrow(env.getProperty("spring.datasource.testOnBorrow",
		 * Boolean.class));
		 * dataSource.setTestOnReturn(env.getProperty("spring.datasource.testOnReturn",
		 * Boolean.class)); try {
		 * dataSource.setFilters(env.getProperty("spring.datasource.filters")); } catch
		 * (SQLException e) { logger.error("druid configuration initialization filter",
		 * e); } return dataSource; }
		 * 
		 * 
		 * //开启事务
		 * 
		 * @Bean(name = "transactionManagerForOne") public DataSourceTransactionManager
		 * getDataSourceTransactionManagerForOne(@Qualifier("one") DataSource one) {
		 * DataSourceTransactionManager dsm = new DataSourceTransactionManager();
		 * dsm.setDataSource(one); return dsm; }
		 * 
		 * //开启事务
		 * 
		 * @Bean(name = "transactionManagerForOne") public DataSourceTransactionManager
		 * getDataSourceTransactionManagerForTwo(@Qualifier("two") DataSource two) {
		 * DataSourceTransactionManager dsm = new DataSourceTransactionManager();
		 * dsm.setDataSource(two); return dsm; }
		 * 
		 * //转为BeetlSql数据源
		 * 
		 * @Bean(name = "oneDs") public BeetlSqlDataSource
		 * mainDataSource(@Qualifier("one") DataSource one) { BeetlSqlDataSource source
		 * = new BeetlSqlDataSource(); source.setMasterSource(one);//主数据库
		 * //source.setSlaves(new DataSource[] {});//从数据库 return source; }
		 * 
		 * //转为BeetlSql数据源
		 * 
		 * @Bean(name = "twoDs") public BeetlSqlDataSource
		 * workflowDataSource(@Qualifier("two") DataSource two) { BeetlSqlDataSource
		 * source = new BeetlSqlDataSource(); source.setMasterSource(two); return
		 * source; }
		 * 
		 * //定制sqlManager
		 * 
		 * @Bean public BeetlSqlMutipleSourceCustomize beetlSqlCustomize(Environment
		 * env,
		 * 
		 * @Qualifier("oneDs") BeetlSqlDataSource oneDs,
		 * 
		 * @Qualifier("twoDs") BeetlSqlDataSource twoDs) { return new
		 * BeetlSqlMutipleSourceCustomize() {
		 * 
		 * @Override public void customize(String dataSource,SQLManager sqlManager) {
		 * //可以在这里添加各种扩展，指定主从等 //添加id生成规则 sqlManager.addIdAutonGen("uuid2", new
		 * Uuid2AutoGen()); //使用驼峰命名 sqlManager.setNc(new UnderlinedNameConversion());
		 * //控制台或者日志系统输出执行的sql语句 sqlManager.setInters(new Interceptor[]{new
		 * DebugInterceptor()}); //sql文件路径 SQLLoader loader = new ClasspathLoader();
		 * loader.setCharset("UTF-8"); sqlManager.setSqlLoader(loader);
		 * if("one".equals(dataSource)) { sqlManager.setDs(oneDs); } else
		 * if("two".equals(dataSource)) { sqlManager.setDs(twoDs); } } }; } }
		 */