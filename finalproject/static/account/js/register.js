$('#registerform').submit(function(){
    fileFlag = true;
    $("input[name='uploadfile']").each(function(){
        if($(this).val()=="") {
            fileFlag = false;
            return false;
        }
    });
    if(!fileFlag){
        alert('图片上传尚有空缺');
        return false;
    }
    else{
        if (window.confirm("请确认您的资料无误，再按送出"))
        {
        
        $(function() {
            $( "#dialog-message" ).dialog({
                width:800,
                height: 200,
              modal: true,
            });
        });
        document.getElementById('sendregister').disabled=true
        var name = $('input[id="name"]').val();
        var phone = $('input[id="phone"]').val();
        var email = $('input[id="email"]').val();
        var wechat = $('input[id="wechat"]').val();
        var adress = $('input[id="adress"]').val();
        var birthdate = $('input[id="birthdate"]').val();
        var alipay = $('input[id="alipay"]').val();
        var identity = $('input[id="identity"]').val();
        var IDCopy = $('input[id="IDCopy"]').val();
        var FacewithHandheldIDcard = $('input[id="FacewithHandheldIDcard"]').val();
        var WechatQRcode = $('input[id="WechatQRcode"]').val(); 
        var AlipayQRcode = $('input[id="AlipayQRcode"]').val();
        var BankAccount = $('#BankAccount').val();
        var BankName = $('#BankName').val();
        var BankBranch = $('#BankBranch').val();
        var BankPlace = $('#BankPlace').val();


        var canvas1  = document.getElementById("canvas1");
        var ctx1 = canvas1.getContext("2d");
        var img1 = document.getElementById("blah1");
        var show1 = document.getElementById("show1");
        canvas1.width = 500;
        canvas1.height = (img1.height*500)/img1.width;
        ctx1.drawImage(img1, 0, 0, img1.width, img1.height, 0, 0, canvas1.width, canvas1.height);
        var dataURL1 = canvas1.toDataURL('image/jpg');
        var blob1 = dataURL1.split(",")[1];

        var canvas2  = document.getElementById("canvas2");
        var ctx2 = canvas2.getContext("2d");
        var img2 = document.getElementById("blah2");
        var show2 = document.getElementById("show2");
        canvas2.width = 500;
        canvas2.height = (img2.height*500)/img2.width;
        ctx2.drawImage(img2, 0, 0, img2.width, img2.height, 0, 0, canvas2.width, canvas2.height);
        var dataURL2 = canvas2.toDataURL('image/jpg');
        var blob2=dataURL2.split(",")[1];

        var canvas3  = document.getElementById("canvas3");
        var ctx3 = canvas3.getContext("2d");
        var img3 = document.getElementById("blah3");
        var show3 = document.getElementById("show3");
        canvas3.width = 500;
        canvas3.height = (img3.height*500)/img3.width;
        ctx3.drawImage(img3, 0, 0, img3.width, img3.height, 0, 0, canvas3.width, canvas3.height);
        var dataURL3 = canvas3.toDataURL('image/jpg');
        var blob3=dataURL3.split(",")[1];

        console.log($("input[name='uploadfile_except']").val())
        var blob4=""
        if($("input[name='uploadfile_except']").val()!=''){
        var canvas4  = document.getElementById("canvas4");
        var ctx4 = canvas4.getContext("2d");
        var img4 = document.getElementById("blah4");
        var show4 = document.getElementById("show4");
        canvas4.width = 500;
        canvas4.height = (img4.height*500)/img4.width;
        ctx4.drawImage(img4, 0, 0, img4.width, img4.height, 0, 0, canvas4.width, canvas4.height);
        var dataURL4 = canvas4.toDataURL('image/jpg');
        var blob4=dataURL4.split(",")[1];
        }
        var Input={
            Brand:"Ark Show", 
            Name:name, 
            Birth:birthdate, 
            Identity:identity, 
            Address:adress, 
            Phone:phone, 
            Email:email, 
            WeChat:wechat, 
            AliPay:alipay, 
            IDCopy:blob1,
            FacewithHandheldIDcard:blob2, 
            WechatQRcode:blob3, 
            AlipayQRcode:blob4,
            BankAccount:BankAccount,
            BankName:BankName,
            BankBranch:BankBranch,
            BankPlace:BankPlace

        };
        $.ajax({
            type: 'POST',
            url: "https://airuapipython.azurewebsites.net/api/certification", 
            dataType: 'json',
            data: JSON.stringify(Input),
            contentType: "application/json;charset=utf-8",
            success: function(response) {  
                console.log(response)  ;
                if (response.message=="上傳成功"){
                    alert("申请完成 我们将于近期安排专人与您联络");
                    $('#registerform').find(":text,textarea,input").each(function() {
                        $(this).val("");
                    window.location.assign('start_your_business.html')
                    });
                }
            },
             error: function(response) {         
				alert("上传失败 请重新整理再试一次");
                console.log(response.message);
                console.log("error");
            }
        }); 
        
        }
        else{
            return false;
        }
    }
    return false;
    
    
});