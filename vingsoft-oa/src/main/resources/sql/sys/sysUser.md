
findOneByUserName
===
	select * from Sys_User where username = #username#

	
findOneByTelephone
===
	select * from Sys_User where telephone = #telephone#
	
	
findPage
===
	select
	@pageTag(){
		U.ID,U.nickname,U.USER_PASS_WORD,U.telephone,U.mail,U.USER_CLASS,U.user_type,A.AREANAME 
		USER_AREA_CODE,U.DEPT_ID,U.USER_IS_SMS,U.status,u.username
	@}
	FROM Sys_User u 
	LEFT JOIN sys_area a ON u.USER_AREA_CODE = a.areacode 
	WHERE
	@if(loginUserType=="0"){
	     1=1 
	@}
	@else if(loginUserType=="1"){
	    u.USER_AREA_CODE = #loginAreaCode#
	@}
	@else if(loginUserType=="3"){
	    u.dept_id in (select dept_id from sys_user_dept where user_id = #loginUserId#)
	@}
	@else{
	    1<>1
	@}
	@if(nickname!=""&&!isEmpty(nickname)){
		and instr(U.nickname , #nickname#) >0
	@}
	@if(username!=""&&!isEmpty(username)){
		and instr(U.username,#username#) >0
	@}
	@if(status!=""&&!isEmpty(status)){
		and U.status = #status#
	@}
	@if(deptId!=""&&!isEmpty(deptId)){
		and U.dept_Id = #deptId#
	@}
	@if(userAreaCode!=""&&!isEmpty(userAreaCode)){
		and U.user_Area_Code = #userAreaCode#
	@}
	@if(telephone!=""&&!isEmpty(telephone)){
		and  instr(u.telephone,#telephone#)>0
	@}
	@if(userClass!=""&&!isEmpty(userClass)){
		and U.USER_CLASS = #userClass#
	@}
	order by u.sort 

findAdminPage
===
	select
	@pageTag(){
		*
	@}
	from Sys_User
	where 1=1 and USER_TYPE in ('0','1')
	@if(nickname!=""&&!isEmpty(nickname)){
		and nickname = #nickname#
	@}
	@if(username!=""&&!isEmpty(username)){
		and username = #username#
	@}
	@if(status!=""&&!isEmpty(status)){
		and status = #status#
	@}
	@if(deptId!=""&&!isEmpty(deptId)){
		and dept_Id = #deptId#
	@}
	
userTree
===
	SELECT CONCAT(id,'dept') id,CASE parent_id WHEN '0' THEN '0' ELSE CONCAT(parent_id,'dept') END parentId,sort,
	NAME title FROM sys_dept 
	UNION ALL 
	SELECT  id,CONCAT(dept_id,'dept') parentId,sort,nickname title FROM sys_user
	order by sort
	
	
complaintQueryUser
===
	SELECT u.id,u.nickname,u.telephone,u.USER_AREA_CODE
	FROM sys_user u 
	LEFT JOIN sys_role_user ru ON ru.user_id = u.id
	WHERE u.dept_id = #deptId# AND ru.role_id = #roleId# AND u.status = '1' and ifnull(u.telephone,'') != '' 
	AND LENGTH(u.telephone) = 11 and u.USER_IS_SMS = '1'
	
delayQueryUser
===
	SELECT u.nickname,u.telephone,u.USER_AREA_CODE
	FROM sys_user u 
	LEFT JOIN sys_role_user ru ON ru.user_id = u.id
	WHERE u.USER_AREA_CODE = #areacode# AND ru.role_id = #roleId# AND u.status = '1' and ifnull(u.telephone,'') != '' 
	and u.USER_IS_SMS = '1' AND LENGTH(u.telephone) = 11

getSmsUserListByRoleId
===
	select u.* from sys_role_user ru left join sys_user u on u.id = ru.user_id 
	where u.telephone is not null and  ru.role_id  = #roleId#
	
querySystemRoleByUserId
===
*查询当前用户是否分配了管理员角色

    SELECT COUNT(r.id)
     FROM SYS_ROLE R 
     WHERE R.TYPE = 2 and R.ID IN (SELECT ROLE_ID FROM sys_role_user where user_id = #userId#)