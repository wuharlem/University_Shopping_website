//$('#loginform').submit(function(){
//$("#login").click(function(e){e.preventDefault();WebLogin();});
function WebLogin(){
	var URLPATH = "https://airuapipython.azurewebsites.net/";
	var ID = $("#usr").val();
	var Pwd = $("#pwd").val();
	var LoginInput = {
	LId: ID, Pwd: Pwd,
	};
	//console.log(LoginInput)
	$.ajax({
		url: URLPATH + "api/weblogin",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(LoginInput),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{		
			//console.log(response)
			if (response.result == "1" && response.Category == "3"){
				$.cookie("ID", ID, { expires : 1 });
				$.cookie("Pwd", Pwd, { expires : 1 })
				$.cookie("Category", response.Category, { expires : 1 });
				$.cookie("FId", response.FId, { expires : 1 });
				$.cookie("Securitycode", response.message, { expires : 1 });
				window.location.assign("franchiseepoint.html");
			}
			if (response.result == "1" && response.Category == "2"){
				$.cookie("ID", ID, { expires : 1 });
				$.cookie("Pwd", Pwd, { expires : 1 })
				$.cookie("Category", response.Category, { expires : 1 });
				$.cookie("TAId", response.TAId, { expires : 1 });
				$.cookie("Securitycode", response.message, { expires : 1 });
				window.location.assign("tradeagencyshop.html");
			}
			else{
			console.log(response.message);
			alert(response.message);
			}
		},
		error: function()
		{
			console.log("error");
			alert(response.message);	
		}
	});
	return false;
}
