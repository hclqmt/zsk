deleteByUserId
===
	delete from sys_user_dept where user_id = #userId#
queryOrgCodeList
=== 
    select d.ORG_CODE from sys_user_dept s left join sys_dept d on d.ID = s.dept_id where s.user_id  =#userId#

queryOrgCredItCodeList
=== 
    select d.ORG_CRED_IT_CODE from sys_user_dept s left join sys_dept d on d.ID = s.dept_id where s.user_id  =#userId#
