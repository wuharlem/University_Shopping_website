var dayindex = ["01","02","03","04","05","06","07","08","09","10","11","12"];
console.log($.cookie('TAId'));
console.log($.cookie('Name'));

$.ajax({
    type: 'POST',
    url: "https://airuapipython.azurewebsites.net/api/getTAinf",
    dataType: 'json',
    data: JSON.stringify({
        TAId: $.cookie('TAId'),
        Pwd: $.cookie('Pwd')
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
function Sentbankinfo(){
	var URLPATH = "https://airuapipython.azurewebsites.net/";
	var ID = $.cookie("TAId");
	var day = $("#date").val();
	var day_s = new Date(day.replace(/-/g,"/"));
	var day_n = new Date(day.replace(/-/g,"/"));
	day_s.setDate(day_s.getDate()-7);
	day_n.setDate(day_n.getDate()-1);
	var day1 = day_s.getFullYear()+'-'+(day_s.getMonth()+1)+'-'+day_s.getDate();
	var day2 = day_n.getFullYear()+'-'+(day_n.getMonth()+1)+'-'+day_n.getDate();
	var Input = {
		TAId: ID,
		SettlementStart: day1,
		SettlementEnd: day2,
		RemittanceMoney: $("#cash").val(),
		RemittanceName: $("#name").val(),
		RemittanceAccount: $("#account").val(),
		RemittanceBankName: $("#bankname").val(),
		RemittanceWay: $("#way").val(),
		Pwd: $.cookie('Pwd')
	};

	console.log(Input)
	$.ajax({
		url: URLPATH + "api/AddTARemittance",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(Input),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{	
			alert(response.message);
		},
		error: function(response)
		{
			alert(response.message);
		}
	});
}
function getAgencyBill(){
	$(".billlist").html('<table class="list"><table>');
	var URLPATH = "https://airuapipython.azurewebsites.net/";
	var ID = $.cookie("TAId");
	var price = 0;
	var Input = {
		TAId: ID,
		Pwd: $.cookie('Pwd')
	};

	//console.log(LoginInput)
	$.ajax({
		url: URLPATH + "api/agencyAllBill",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(Input),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{	
			var t_status = $("#status").val();
			d_price = 0;
			var result = response.result;
			if (t_status == 1){
				var dates = $('#date_n').val();
				str = '<thead><th>订单代号</th><th>产品名称</th><th>产品代号</th><th>产品原价</th><th>折扣价</th><th>购买日期</th><th>应付款日</th></thead><tbody>';
				for(i=0;i<response.result.length;i++){
					if(result[i].ReceiveDate === dates){
						
						if(result[i].AccountDate === "None"){
							
							str += '<tr><td>'+result[i].OId+'</td><td>'+result[i].ProductName+
							'</td><td>'+result[i].PId+'</td><td>'+result[i].ProductPrice+
							'</td><td>'+result[i].DiscountPrice+'</td><td>'+result[i].OrderDate+'</td><td>'+result[i].ReceiveDate+'</td></tr>'
							d_price += result[i].DiscountPrice;
							
						}
						
					}
				}
				$("#done").css('display','none');
				$("#nodone").css('display','');
				str +='</tbody>';
				$(".d_price").html((Math.round(d_price*100)/100)+'&nbspRMB');
				$(".list").html(str);

			}
			if(t_status == 2){
				var dates = $('#date_d').val();
				str = '<thead><th>订单代号</th><th>产品名称</th><th>产品代号</th><th>产品原价</th><th>折扣价</th><th>购买日期</th><th>应付款日</th><th>实际付款日</th></thead><tbody>';
				for(i=0;i<response.result.length;i++){
					if(result[i].ReceiveDate === dates){
						if(result[i].AccountDate !== "None"){
							
							str += '<tr><td>'+result[i].OId+'</td><td>'+result[i].ProductName+
							'</td><td>'+result[i].PId+'</td><td>'+result[i].ProductPrice+
							'</td><td>'+result[i].DiscountPrice+'</td><td>'+result[i].OrderDate+'</td><td>'+result[i].ReceiveDate+'</td><td>'+result[i].AccountDate+'</td></tr>';
							
						}
						
					}
				}
				str +='</tbody>';
				$(".list").html(str);
				$("#done").css('display','');
				$("#nodone").css('display','none');	
			}
			$(".list").DataTable({
                "sPaginationType" : "full_numbers",
                "oLanguage" : {
                    "sLengthMenu": "每页显示 _MENU_ 条记录",
                    "sZeroRecords": "抱歉， 没有找到",
                    "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
                    "sInfoEmpty": "没有数据",
                    "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
                    "sZeroRecords": "没有检索到数据",
                     "sSearch": "名称:",
                    "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "前一页",
                    "sNext": "后一页",
                    "sLast": "尾页"
                },
                "order": [[ 5,'dsec' ]]
            }
            });
			
			
		},
		error: function()
		{
			console.log("error");		
		}
	});
	return false;
}

function getAgencydate(){
	$(".done").css('display','none');
	$(".nodone").css('display','none');
	var URLPATH = "https://airuapipython.azurewebsites.net/";
	var ID = $.cookie("TAId");
	var price = 0;
	var Input = {
		TAId: ID,
		Pwd: $.cookie('Pwd')
	};
				
	$.ajax({
		url: URLPATH + "api/agencyAllBill",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(Input),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{	
			
			console.log(response);
			option = '';
			var dates = [];
			var result = response.result;
			var d_status = $("#status").val();
			if(parseInt(d_status) == 1){
				for(x=0;x<result.length;x++){
					if(result[x].AccountDate === "None"){
						price += result[x].DiscountPrice;
						var a = finder(dates,result[x].ReceiveDate);
						if(!a){
							dates.push(new Date(result[x].ReceiveDate));
						}
					}
					
				}
				dates.sort(function(a,b) { 
	    			return a.getTime() - b.getTime();
				});
				dates.reverse();
				
				for(y=0;y<dates.length;y++){

					
					var date = new Date(dates[y]);
					if(date.getDate()<10){
						var date_c1 = '0'+date.getDate();
					}
					else{
						var date_c1 = date.getDate();
					}
					var day = date.getFullYear()+'-'+dayindex[(date.getMonth())]+'-'+date_c1;
					var dayOfMonth = date.getDate();
					date.setDate(dayOfMonth-1);
					if(date.getDate()<10){
						var date_c2 = '0'+date.getDate();
					}
					else{
						var date_c2 = date.getDate();
					}
					var day2 = date.getFullYear()+'/'+dayindex[(date.getMonth())]+'/'+date_c2;
					dayOfMonth = date.getDate();
					date.setDate(dayOfMonth-6);
					if(date.getDate()<10){
						var date_c3 = '0'+date.getDate();
					}
					else{
						var date_c3 = date.getDate();
					}
					var day1 = date.getFullYear()+'/'+dayindex[(date.getMonth())]+'/'+date_c3;
					option +='<option value="'+day+'">'+day1+'~'+day2+'</option>';
				}
				
				$(".price").html((Math.round(price*100)/100)+'&nbspRMB');
				$("#date_n").html(option);
				$("#date").html(option);
				if(dates.length>0){
					getAgencyBill(dates[0].getFullYear()+'-'+dayindex[(dates[0].getMonth())]+'-'+(dates[0].getDate()));
				}
				else{
					alert('查无纪录');
					$(".billlist").html('<table class="list"></table>');
				}
				$(".done").css('display','none');
				$(".nodone").css('display','');
			}
			if (parseInt(d_status) == 2){
				console.log(2);
				for(x=0;x<result.length;x++){
					if(result[x].AccountDate !== "None"){
						price += result[x].DiscountPrice;
						var a = finder(dates,result[x].ReceiveDate);
						if(!a){
							dates.push(new Date(result[x].ReceiveDate));
						}
					}
				}
				dates.sort(function(a,b) { 
	    			return a.getTime() - b.getTime();
				});
				dates.reverse();
				
				for(y=0;y<dates.length;y++){

					
					var date = new Date(dates[y]);
					if(date.getDate()<10){
						var date_c1 = '0'+date.getDate();
					}
					else{
						var date_c1 = date.getDate();
					}
					var day = date.getFullYear()+'-'+dayindex[(date.getMonth())]+'-'+date_c1;
					var dayOfMonth = date.getDate();
					date.setDate(dayOfMonth-1);
					if(date.getDate()<10){
						var date_c2 = '0'+date.getDate();
					}
					else{
						var date_c2 = date.getDate();
					}
					var day2 = date.getFullYear()+'/'+dayindex[(date.getMonth())]+'/'+date_c2;
					dayOfMonth = date.getDate();
					date.setDate(dayOfMonth-6);
					if(date.getDate()<10){
						var date_c3 = '0'+date.getDate();
					}
					else{
						var date_c3 = date.getDate();
					}
					var day1 = date.getFullYear()+'/'+dayindex[(date.getMonth())]+'/'+date_c3;
					option +='<option value="'+day+'">'+day1+'~'+day2+'</option>';
				}
				$(".price").html((Math.round(price*100)/100)+'&nbspRMB');
				$("#date_d").html(option);
				if(dates.length>0){
					getAgencyBill(dates[0].getFullYear()+'-'+dayindex[(dates[0].getMonth())]+'-'+(dates[0].getDate()));
				}
				else{
					alert('查无纪录');
					$(".billlist").html('<table class="list"></table>');
				}
				$(".done").css('display','');
				$(".nodone").css('display','none');			
			}
			
			
			
		},
		error: function()
		{
			console.log("error");		
		}
	});
	return false;
}

function finder(arr,ele){
	for(j=0;j<arr.length;j++){
		if(arr[j].getDate()<10){
			var day = '0'+arr[j].getDate();
		}
		else{
			var day = arr[j].getDate();
		}
		var daytmp = arr[j].getFullYear()+'-'+dayindex[(arr[j].getMonth())]+'-'+day;
		if(daytmp === ele){
			return true;
		}
	}
	return false;
}
function webpassword() {
    var Input = {
        LId: $.cookie('ID'),
        OldPassword: $('#Oldpwd').val(),
        NewPassword: $('#newpwd2').val()
    }
    console.log(Input);
    $.ajax({
        type: 'POST',
        url: "https://airuapipython.azurewebsites.net/api/webpassword",
        dataType: 'json',
        data: JSON.stringify(Input),
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response.message);
            alert(response.message);
            alert('请使用新密码重新登入');
            logout();
        },
        error: function(response) {
            alert(response.message);
            console.log(response.message);
            console.log("error");
        }
    });

}