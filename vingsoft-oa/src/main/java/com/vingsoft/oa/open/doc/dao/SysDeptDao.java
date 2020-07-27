package com.vingsoft.oa.open.doc.dao;

import com.vingsoft.common.node.DTreeNode;
import com.vingsoft.common.node.otree.Data;
import com.vingsoft.oa.open.doc.entity.SysDept;
import org.beetl.sql.core.annotatoin.Param;
import org.beetl.sql.core.annotatoin.SqlResource;
import org.beetl.sql.core.mapper.BaseMapper;

import java.util.List;

/**
 *

* <p>Title: SysDeptDao</p>

* <p>Description: 部门Dao</p>

* @author MrTang

* @date 2018年11月24日
 */

@SqlResource("sys.sysDept")
public interface SysDeptDao extends BaseMapper<SysDept> {

	/**
	 *

	 * <p>Title: validNameUnique</p>

	 * <p>Description: 验证部门名称是否存在</p>

	 * @param deptname
	 * @return
	 */
	int validNameExist(@Param("deptname") String deptname);


	/**
	 *
	 * <p>Title: getDepeTree</p>
	 * <p>Description: 获取部门树</p>
	 *
	 * @return
	 *
	 */
	List<DTreeNode> getDepeTree();

	/**
	 *
	 * <p>Title: getAuthDeptTree</p>
	 * <p>Description: 获取权限部门树</p>
	 *
	 * @return
	 *
	 */
	List<DTreeNode> getAuthDeptTree(@Param("userId") Integer userId, @Param("areaCode") String areaCode);

	/**
	 *
	 * <p>Title: getDepeTree</p>
	 * <p>Description: 获取投诉受理部门树</p>
	 *
	 * @return
	 *
	 */
	List<DTreeNode> getReceiveDeptTree(@Param("areacode") String areacode, @Param("userId") Integer userId);



	/**
	 *
	 * <p>Title: getDepeTree</p>
	 * <p>Description: 获取用户部门权限树</p>
	 *
	 * @return
	 *
	 */
	List<DTreeNode> findUserDept(@Param("userId") Integer userId, @Param("loginUserAreaCode") String loginUserAreaCode, @Param("grade") String grade,
                                 @Param("loginUserType") String loginUserType, @Param("loginUserId") Integer loginUserId
    );



	/**

	 * <p>Title: queryByPid</p>

	 * <p>Description: 根据上级部门id查询子部门</p>

	 * @param pId
	 * @return

	 */
	List<SysDept> queryByPid(@Param("pId") Long pId);

	/**
	 * 部门树，与新树不兼容
	 * @return
	 */
	List<Data> deptTree();
	/**
	 * 通过部门编号获取部门
	 * @param orgCode
	 * @return
	 */
	SysDept queryByOrgCode(@Param("orgCode") String orgCode);

	/**
	 * 通过部门统一信用编号获取部门
	 * @param orgCredItCode
	 * @return
	 */
	SysDept queryByOrgCredItCode(@Param("orgCredItCode") String orgCredItCode);


	/**
	 * 根据部门主键获取信息
	 */
	SysDept getUserDeptById(@Param("deptId") Long deptId);

	List<SysDept> getDeptByAreaCode(@Param("areaCode") String areaCode);

	/**
	 * 通过区划编码查询区划下政务中心单位信息
	 * @param areacode
	 * @return
	 */
	SysDept queryZxdeptByAreaCode(@Param("areacode") String areacode);

	/**
	 * 查询区划下所有部门名称
	 * @param areacode
	 * @return
	 */
	List<String> queryDeptNameByAreaCode(@Param("areacode") String areacode);
}
