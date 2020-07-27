/**  

* <p>Title: SysUserService.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月21日  

* @version 1.0  

*/  
package com.vingsoft.oa.open.doc.service;

import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.LoginUser;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.SysUserDao;
import com.vingsoft.oa.open.doc.entity.DocKnowledge;
import com.vingsoft.oa.open.doc.entity.MyInfoEntity;
import com.vingsoft.oa.open.doc.entity.SysUser;
import org.beetl.sql.core.engine.PageQuery;
import org.beetl.sql.core.query.LambdaQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**  

* <p>Title: SysUserService</p>  

* <p>Description: </p>  

* @author MrTang

* @date 2018年11月21日  

*/
@Service
@Transactional
@SuppressWarnings({"rawtypes","unchecked"})
public class SysUserService extends BaseService<SysUser> {

	@Resource
	private SysUserDao sysUserDao;
	

	public List<SysUser> findAll() {
		return sysUserDao.all();
	}
	
	/**
	 * 
	
	 * <p>Title: findUserByUsername</p>  
	
	 * <p>Description: 根据用户名查询用户</p>  
	
	 * @param username
	 * @return
	 */
	public SysUser findUserByUsername(String username) {
		return sysUserDao.findOneByUserName(username);
	}
	
	/**
	 * 
	
	 * <p>Title: findUserByTelePhone</p>  
	
	 * <p>Description: 根据用户手机号查询用户</p>  
	
	 * @param iphone
	 * @return
	 */
	public SysUser findUserByTelePhone(String iphone) {
		return sysUserDao.findOneByTelephone(iphone);
	}

	/**  
	
	 * <p>Title: findPage</p>  
	
	 * <p>Description: 分页查询</p>  
	
	 * @param user
	 * @return  
	
	 */  
	public LayuiResponse findPage(SysUser user) {
		PageQuery query = findPage("doc.sysUser.findPage", user);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
	}

	public List<DocKnowledge> getDocKnowledgeList(String keyWords,Long page,Long limit){
		LambdaQuery<DocKnowledge> query = sqlManager.lambdaQuery(DocKnowledge.class);
		List<DocKnowledge> searchList = query.orLike(DocKnowledge::getKnowledgeName, "%" + keyWords + "%").orLike(DocKnowledge::getCreateBy, "%" + keyWords + "%")
				.orLike(DocKnowledge::getKnowledgeContent, "%" + keyWords + "%").desc(DocKnowledge::getCreateDate).limit(page, limit).select();
		return searchList;
	}
	public Long getDocKnowledgeCount(String keyWords){
		LambdaQuery<DocKnowledge> query = sqlManager.lambdaQuery(DocKnowledge.class);
		long count = query.orLike(DocKnowledge::getKnowledgeName, "%" + keyWords + "%").orLike(DocKnowledge::getCreateBy, "%" + keyWords + "%")
				.orLike(DocKnowledge::getKnowledgeContent, "%" + keyWords + "%").count();
		return count;
	}

	public List<Map<String,String>> findDocCount(Integer id){
		return sysUserDao.findDocCount(id);
	}

	public List<MyInfoEntity> myInfoList(MyInfoEntity myInfoEntity ){
		Map<String,Object> map = new HashMap<>();
		map.put("receiverId",myInfoEntity.getReceiverId());
		map.put("page",myInfoEntity.getPage());
		map.put("limit",myInfoEntity.getLimit());

		String sql ="select * from (SELECT id,CREATE_DATE,`status`,receiver_id,'1'type,'一条知识评论回复' as title  FROM zsk_praise_reply\n" +
				"UNION ALL\n" +
				"SELECT id,CREATE_DATE,`status`,sys_user_id receiver_id,'2' type,'一条留言' as title from zsk_leave_message\n" +
				"UNION ALL\n" +
				"SELECT id,CREATE_DATE,`status`,receiver_id,'3' type ,'一条留言回复' as title FROM zsk_leave_message_reply " +
				"UNION all select id,CREATE_DATE,STATUS,knowledge_create_by_id receiver_id,'0' type,'一条知识评论' as title from \n" +
				"zsk_knowledge_praise where user_id<>"+ LoginUser.getInstance().getId() +" ) a " +
				" where a.receiver_id ="+myInfoEntity.getReceiverId()+" ORDER BY status,create_date desc limit "+myInfoEntity.getPage()+","+myInfoEntity.getLimit();

		List<MyInfoEntity> myInfoList = sqlManager.execute(sql, MyInfoEntity.class,myInfoEntity);
		return myInfoList;
	}

	public Integer findMyInfoCount(Integer receiverId){
		Integer myInfoCount = sysUserDao.findMyInfoCount(receiverId);
		return  myInfoCount;
	}

}
