
validNameExist
===
	SELECT COUNT(1) FROM sys_dept D1
	left join sys_dept D2 on D1.parent_id = D2.parent_id
	WHERE D1.name = #deptname# AND D2.name = #deptname#
		
queryByPid
===
	select * from sys_dept where parent_id = #pId#
	
getDepeTree
===
	SELECT concat('area',areacode) id,areaname title
	,CASE WHEN pntareacode = '0' THEN 0 ELSE  CONCAT('area',pntareacode) END parentId
	,'0' checkArr ,id sort FROM sys_area
	UNION ALL
	SELECT concat('dept',id),NAME AS title, concat('area',org_area_code) AS parentId,'0' AS checkArr ,sort+999 FROM sys_dept ORDER BY sort

getAuthDeptTree
===
    SELECT concat('area',a.areacode) id,a.areaname title
    	,CASE WHEN a.pntareacode = '0' or a.areacode=#areaCode#  THEN 0 ELSE  CONCAT('area',a.pntareacode) END parentId
    	,'0' checkArr ,a.id sort 
    	FROM sys_area a
    	left join sys_dept dd on a.areacode = dd.ORG_AREA_CODE
    	left join sys_user_dept sud on sud.DEPT_ID = dd.id
    	where sud.USER_ID = #userId#
    	group by a.areacode,a.areaname,a.pntareacode,a.id
    	UNION ALL
    	SELECT concat('dept',d.id),d.NAME AS title,
    	concat('area',d.org_area_code) AS parentId,
    	'0' AS checkArr ,d.sort+999 
    	FROM sys_dept d
    	left join sys_user_dept ud on ud.DEPT_ID = d.id
    	where ud.USER_ID = #userId#
    	group by d.id,d.NAME,d.org_area_code,d.sort
    	ORDER BY sort
	
findPage
===
	select
	@pageTag(){
		*
	@}
	from Sys_Dept
	where 1=1 and org_code != ''
	@if(name!=""&&!isEmpty(name)){
		and name like CONCAT('%',#name#,'%')
	@}
	@if(parentId!=""&&!isEmpty(parentId)){
		and parent_Id = #parentId#
	@}
	@if(orgAreaCode!=""&&!isEmpty(orgAreaCode)){
		and ORG_AREA_CODE = #orgAreaCode#
	@}

findUserDept
===
	SELECT CONCAT('area',areacode) id,areaname title,CASE WHEN pntareacode = '0' or areacode=#loginUserAreaCode# THEN 0 ELSE  CONCAT('area',pntareacode) END parentId
	,'0' checkArr ,id sort FROM sys_area
	 where 
     @if("1"==loginUserType||"3"==loginUserType){
            areacode = #loginUserAreaCode#
     @}
     @else if("0"==loginUserType){
             1=1
     @}
     @else{
        1<>1
     @}
	 UNION ALL
	 SELECT CONCAT('dept',d.id),d.NAME AS title, CONCAT('area',d.org_area_code) AS parentId,CASE WHEN ud.status IS NULL THEN '0' ELSE '1' END AS 	checkArr
     ,sort+999 FROM sys_dept d
     LEFT JOIN (select concat(',',group_concat(dept_id),',') dept_id,'1' status from sys_user_dept ud where ud.user_id = #userId# group by user_id) ud ON instr(ud.dept_id,concat(',',d.id,','))>0 
    where
    @if("1"==loginUserType){
          d.org_area_code = #loginUserAreaCode#
    @}
     @else if("3"==loginUserType){
        d.org_area_code = #loginUserAreaCode# and d.id in (select dept_id from sys_user_dept where user_id = #loginUserId#)
    @}
    @else if("0"==loginUserType){
        1=1
    @}
    @else{
       1<>1
    @}
     ORDER BY sort ASC
	
deptTree
====
	SELECT id id,CASE parent_id WHEN '-1' THEN '0' ELSE parent_id END parentId,org_short_name title FROM sys_dept order by sort

queryByOrgCode
===
	select * from sys_dept where ORG_CODE = #orgCode#
getReceiveDeptTree	
===
		SELECT CONCAT('area',a.areacode) id,a.areaname title
    	,0 parentId
    	,'0' checkArr ,a.id sort FROM sys_area a 
    	left join sys_dept dd on a.areacode = dd.ORG_AREA_CODE
    	left join sys_user_dept sud on sud.DEPT_ID = dd.id	
    	WHERE a.areacode =  #areacode# and sud.USER_ID = #userId#
    	group by a.areacode,a.areaname,a.id
    	UNION ALL 
    	SELECT CONCAT('dept',d.id),d.NAME AS title, CONCAT('area',d.org_area_code) AS parentId,'0' AS checkArr ,d.sort+999 
    	FROM sys_dept d
    	left join sys_user_dept ud on ud.DEPT_ID = d.id
    	WHERE 	d.org_area_code =  #areacode#  and ud.USER_ID = #userId#
    	UNION ALL
    	SELECT CONCAT('dept',dz.dept_id),concat(dz.areaname,'(中心)') AS title,CONCAT('dept',dz.parent_dept_id) parentId,'0' checkArr ,dz.ordernum
    	FROM sys_dept_zwzx dz
    	left join sys_user_dept uud on uud.DEPT_ID = dz.dept_id
         WHERE dz.parent_id IN (SELECT id FROM sys_dept_zwzx WHERE areacode = #areacode#)	 and uud.USER_ID = #userId#
    	order by sort
    	
	
getUserDeptById
===
     SELECT A.AREANAME ORG_AREA_NAME,D.NAME,D.ORG_CRED_IT_CODE,D.ORG_AREA_CODE FROM SYS_DEPT D LEFT JOIN SYS_AREA A ON A.AREACODE = D.ORG_AREA_CODE
     WHERE D.ID = #deptId#
getDeptByAreaCode
===     
	select ORG_CODE,name from sys_dept where ORG_AREA_CODE=#areaCode#

queryByOrgCredItCode
===
	select * from sys_dept where ORG_CRED_IT_CODE = #orgCredItCode#
	
queryZxdeptByAreaCode
===
    select d.*
    from sys_dept d
    left join sys_dept_zwzx dz on dz.dept_id = d.id
    where dz.areacode = #areacode#

queryDeptNameByAreaCode
===
*通过区划编码查询该区划下所有部门名称

    select ORG_SHORT_NAME  from sys_dept where ORG_AREA_CODE = #areacode# order by org_code
    