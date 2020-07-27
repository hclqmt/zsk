/**  

* <p>Title: SysDeptService.java</p>  

* <p>Description: </p>    

* <p>Company: www.vingsoft.com</p>  

* @author MrTang

* @date 2018年11月24日  

* @version 1.0  

*/  
package com.vingsoft.oa.open.doc.service;

import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.common.node.otree.Data;
import com.vingsoft.core.response.LayuiResponse;
import com.vingsoft.oa.common.base.BaseService;
import com.vingsoft.oa.open.doc.dao.SysDeptDao;
import com.vingsoft.oa.open.doc.entity.SysDept;
import org.beetl.sql.core.engine.PageQuery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**  

* <p>Title: SysDeptService</p>  

* <p>Description: </p>  

* @author MrTang

* @date 2018年11月24日  

*/
@Service
@Transactional
@SuppressWarnings({"rawtypes","unchecked"})
public class SysDeptService extends BaseService<SysDept> {

	@Resource
	private SysDeptDao deptDao;
	
	/**
	 * 
	
	 * <p>Title: queryList</p>  
	
	 * <p>Description: 部门列表查询</p>  
	
	 * @return
	 */
	public List<SysDept> queryList(){
		return deptDao.all();
	}
	
	/**
	 * 
	
	 * <p>Title: queryByPid</p>  
	
	 * <p>Description: 查询子级部门</p>  
	
	 * @param pId
	 * @return
	 */
	public List<SysDept> queryByPid(Long pId){
		return deptDao.queryByPid(pId);
	}
	
	/**
	 * 
	
	 * <p>Title: validNameExist</p>  
	
	 * <p>Description: 验证部门名称是否存在</p>  
	
	 * @param deptname
	 * @return
	 */
	public int validNameExist(String deptname) {
		return deptDao.validNameExist(deptname);
	}
	
	
	/**
	 * 
	 * <p>Title: getDepeTree</p>  
	 * <p>Description: 获取部门树</p>  
	 *
	 * @return  
	 *
	 */
	public List<DTreeNode> getDepeTree(){
		return deptDao.getDepeTree();
	}

	/**
	 *
	 * <p>Title: getAuthDeptTree</p>
	 * <p>Description: 获取权限部门树</p>
	 *
	 * @return
	 *
	 */
	public List<DTreeNode> getAuthDeptTree(Integer userId,String areaCode){
		return deptDao.getAuthDeptTree(userId,areaCode);
	}
	
	/**
	 * 
	 * <p>Title: getDepeTree</p>  
	 * <p>Description: 获取投受理部门树</p>  
	 *
	 * @return  
	 *
	 */
	public List<DTreeNode> getReceiveDeptTree(String areaCode,Integer userId){
		return deptDao.getReceiveDeptTree(areaCode,userId);
	}
	
	
	/**获取用户部门权限树
	 *
	 * @param userId 获取权限用户id
	 * @param loginUserAreaCode 当前登录人区划编码
	 * @param grade 当前登录人区划级别
	 * @return
	 */
	public List<DTreeNode> findUserDept(Integer userId,String loginUserAreaCode,String grade,String loginUserType,Integer loginUserId){
		return deptDao.findUserDept(userId,loginUserAreaCode,grade,loginUserType,loginUserId);
	}
	/**
	 * 部门树（旧系统）
	 */
	public List<Data> deptTree(){
		return deptDao.deptTree();
	}
	
	
	
	/**  
	
	 * <p>Title: findPage</p>  
	
	 * <p>Description: 分页查询</p>  
	
	 * @param user
	 * @return  
	
	 */  
	public LayuiResponse findPage(SysDept user) {
		PageQuery query = findPage("sys.sysDept.findPage", user);
		//封装成layui返回数据格式
    	LayuiResponse response = new LayuiResponse();
    	response.setCount(query.getTotalRow());
    	response.setData(query.getList());
    	return response;
	}
    
	/**
	 * 通过部门编号获取部门
	 * @param orgCode
	 * @return
	 */
	public SysDept queryByOrgCode(String orgCode){
		return deptDao.queryByOrgCode(orgCode);
	}
	
	/**
	 * 根据部门ID获取部门信息联查区划名称
	 * @param deptId
	 * @return
	 */
	public SysDept getUserDeptById( Long deptId) {
		return deptDao.getUserDeptById(deptId);
	}
	
	public List<SysDept> getDeptByAreaCode(String areaCode){
		return deptDao.getDeptByAreaCode(areaCode);
	}

	/**
	 * 通过区划编码查询区划下政务中心单位信息
	 * @param areacode
	 * @return
	 */
	public SysDept queryZxdeptByAreaCode(String areacode){
		return deptDao.queryZxdeptByAreaCode(areacode);
	}

}
