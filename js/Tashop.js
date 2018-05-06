$.ajax({
    type: 'POST',
    url: "https://airuapipython.azurewebsites.net/api/getTAinf",
    dataType: 'json',
    data: JSON.stringify({
        TAId:$.cookie('TAId')
    }),

    //data:{Id: "123", Pwd: "AAA",DeviceId:"12",LId:"AA"},
    contentType: "application/json;charset=utf-8",
    success: function(response) {
    	$.cookie("Name",response.Name);
    },
    error: function(response) {
        console.log(response.message)
        console.log("error");
	}
});
function displayProduct(){
	var URLPATH = "https://airuapipython.azurewebsites.net/";
	var ID = $.cookie("TAId");
	var scr="";
	var Input = {
		TAId: ID,
		Pwd: $.cookie('Pwd')
	};
	//console.log(LoginInput)
	$.ajax({
		url: URLPATH + "api/displayProduct",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(Input),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{	
			console.log(response.message);
			;
			str = '<tr><td>产品名称</td><td>产品代号</td><td>产品价格</td><td>折扣价格</td><td>购买键</td></tr><tr></tr>';
			for(i=0;i<response.result.length;i++){
				trueprice = Math.round(response.result[i].DiscountPrice*100)/100;
				str += '<tr><td>' + response.result[i].Name +'</td><td>'+response.result[i].PId+ '</td><td>'+ response.result[i].Price + '  RMB</td><td>' + trueprice + '  RMB</td><td><a class="various" data-fancybox-type="inline" href="#buycheck"><button class="buy" TP="'+ trueprice+'" PN="'+response.result[i].Name+'" PId="' + response.result[i].PId +'" id="' + response.result[i].PId +'">購買</button></td></tr>'
				str += '<tr></tr>'
				scr += '$("#' + response.result[i].PId + '").click(function(){var PId = $("#'+response.result[i].PId+'").attr("PId"); var PN = $("#'+response.result[i].PId+'").attr("PN");var TP = $("#'+response.result[i].PId+'").attr("TP");checkbuy(PN,TP,PId);});';
			}
			$(".list").html(str);
			$("#shopping").html(scr);
		},
		error: function()
		{
			console.log(response.message);		
		}
	});
	return false;
}

function buyProduct(PId){

	var URLPATH = "https://airuapipython.azurewebsites.net/";
	var ID = $.cookie("TAId");
	var Input = {
		TAId: ID,
		PId: PId,
		Pwd: $.cookie('Pwd')
	};
	//console.log(LoginInput)
	$.ajax({
		url: URLPATH + "api/buyProduct",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(Input),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{	
			console.log(response);
			alert(response.message);
		},
		error: function()
		{
			alert(response.message);	
		}
	});
	return false;
};

function checkbuy(PN,TP,PID){
	buy_str = '<p>产品名称:  '+PN+'</p><p>需付金额:  '+TP+'</p><button class="button" id="confirm" onclick="buyProduct('+"'"+PID+"'"+');">确定</button>'+'<button class="button" id="cancel" onclick="window.parent.$.fancybox.close()" >取消</button>';
	$('.buyinfo').html(buy_str);
}