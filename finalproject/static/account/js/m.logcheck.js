function check(){
if ($.cookie("Category") =="3"){
	window.location.assign("m.franchiseepoint.html");
}
if ($.cookie("Category") =="2"){
	window.location.assign("tradeagencyshop.html");
}
}
function loginnow(){
	if ($.cookie("ID") ==null){
		window.location.assign("index.html");
	}
}
