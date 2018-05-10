function readURL1(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#path1").val(input.files[0]['name']);
      $('#blah1').attr('src', e.target.result);
      $('#show1').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#IDCopy").change(function(){
  readURL1(this);
  if (document.getElementById("IDCopy")!=""){
    document.getElementById("show1").setAttribute("style", "");
    document.getElementById('path1').setAttribute("style","");
  }
  else {
    document.getElementById("show1").setAttribute("style", "display:none;");    
  }
});

function readURL2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#path2").val(input.files[0]['name']);
      $('#blah2').attr('src', e.target.result);
      $('#show2').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
$("#FacewithHandheldIDcard").change(function(){
  readURL2(this);
  if (document.getElementById("FacewithHandheldIDcard")!=""){
    document.getElementById("show2").setAttribute("style", "");
    document.getElementById('path2').setAttribute("style","");
  }
  else {
    document.getElementById("show2").setAttribute("style", "display:none;");    
  }
});

function readURL3(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#path3").val(input.files[0]['name']);
      $('#blah3').attr('src', e.target.result);
      $('#show3').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$("#WechatQRcode").change(function(){
  readURL3(this);
  if (document.getElementById("WechatQRcode")!=""){
    document.getElementById("show3").setAttribute("style", "");
    document.getElementById('path3').setAttribute("style","");
  }
  else {
    document.getElementById("show3").setAttribute("style", "display:none;");    
  }
});

function readURL4(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#path4").val(input.files[0]['name']);
      $('#blah4').attr('src', e.target.result);
      $('#show4').attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}

$("#AlipayQRcode").change(function(){
  readURL4(this);
  if (document.getElementById("AlipayQRcode")!=""){
    document.getElementById("show4").setAttribute("style", "");
    document.getElementById('path4').setAttribute("style","");
  }
  else {
    document.getElementById("show4").setAttribute("style", "display:none;");    
  }
});


