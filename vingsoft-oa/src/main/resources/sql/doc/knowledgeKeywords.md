
findPage
===
	select
	@pageTag(){
		*
	@}
	from zsk_knowledge_keywords
	where 1=1 
	@if(name!=""&&!isEmpty(name)){
		and name like CONCAT('%',#name#,'%')
	@}
	order by sort desc
queryById
===
	select * from zsk_knowledge_keywords where id = #id#
	