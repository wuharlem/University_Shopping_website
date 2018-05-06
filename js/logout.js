function logout(){
    $.removeCookie("ID");
	$.removeCookie("Pwd");
    $.removeCookie("Category");
    $.removeCookie("TAId");
    $.removeCookie("Securitycode");
    window.location.assign("index.html");
}