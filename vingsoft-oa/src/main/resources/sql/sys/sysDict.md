findListByType
===
	select * from sys_dict where type_code = #type# and enable = 1 order by sort asc
	
findCoreDict
===
	select * from sys_dict where type_code = #type# and value = #value# and enable = 1
	
findPage
===
	select
	@pageTag(){
		*
	@}
	from sys_dict
	where 1=1 
	@if(name!=""&&!isEmpty(name)){
		and instr(name,#name#) >0
	@}
	@if(typeName!=""&&!isEmpty(typeName)){
	    and instr(type_Name,#typeName#) >0
	@}
	@if(enable!=""&&!isEmpty(enable)){
		and enable = #enable#
	@}
	
cxByInsertOrUpdate
===
	select count(1) from sys_dict
	where 1=1
	@if(value!=""&&!isEmpty(value)){
		and value = #value#
	@}
	@if(typeCode!=""&&!isEmpty(typeCode)){
		and type_code = #typeCode#
	@}
	@if(id!=""&&!isEmpty(id)){
		and id != #id#
	@}


queryNameByValueAndTypeCode
===
    select name as evaluatingContent from sys_dict
    where type_code =#cpcpnr#  and value in(#join(asList)#)

