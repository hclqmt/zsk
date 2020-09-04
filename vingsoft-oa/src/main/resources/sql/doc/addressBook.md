cols
===
	m.id,m.name,m.phone,m.address,m.remark,m.position
findPage
===
	select
	@pageTag(){
	 #use("cols")#
	 @}
	from zsk_address_book m
	where 1=1 
	@if(name!="" && !isEmpty(name)){
        and m.name =#name#
    @}
	order by m.id

findAddressBookById
===
	select
	#use("cols")#
		from  zsk_address_book m where m.id = #id#
		
findAddressBookByName
===
	select
	#use("cols")#
		from  zsk_address_book m where m.name = #name#
findAddressBookList
===
    select m.name,m.phone,m.address,m.remark,m.position
     from  zsk_address_book m