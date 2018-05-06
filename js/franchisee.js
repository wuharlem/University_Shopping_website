var ID = $.cookie("ID");
var FId = $.cookie("FId");
var Pwd = $.cookie("Pwd");
//判斷登入狀態
var LoginInput = {
LId: ID, Pwd: Pwd,
};
console.log(FId);
$.ajax({
		url: "https://airuapipython.azurewebsites.net/api/weblogin",
		type: 'POST',
		dataType: 'json',
		data: JSON.stringify(LoginInput),
		contentType: "application/json;charset=utf-8",
		success: function(response)
		{		
			console.log(response.message)
			if (response.result == "1"){
				$.cookie("ID", ID, { expires : 1 });
				$.cookie("Pwd", Pwd, { expires : 1 })
				$.cookie("FId", response.FId, { expires : 1 });
				$.cookie("Securitycode", response.message, { expires : 1 });
                $(".user").html(response.Name);
			}
			else{
			    $.removeCookie("ID");
			    $.removeCookie("FId");
			    $.removeCookie("Securitycode");
			    window.location.assign("index.html");
			}
		},
		error: function()
		{
			alert("error");				
		}
	});
if (ID == undefined) {
    window.location.assign("index.html");
}

console.log(ID);
function logout() {
    $.removeCookie("ID");
    $.removeCookie("FId");
    $.removeCookie("Securitycode");
    $.removeCookie("Pwd");
    $.removeCookie("Category");
    window.location.assign("index.html");
}

function announcement(){
    $.ajax({
        type: 'POST',
        url: "https://airuapipython.azurewebsites.net/api/AllAnnouncement",
        data:JSON.stringify({
            Brand: "Web",
        }),
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response.message);
            var result = response.result;
            var table = "<thead><tr><th>标题</th><th>时间</th></thead><tbody>";
            var news = "";
            for(var i=0;i<result.length;i++){
                var date = result[i].AnnouncementPostDate.split(" ");
                news += '<div style="display:none;"><div id="'+result[i].AnnouncementTitle+'"><h3>'+result[i].AnnouncementTitle+'</h3>';
                for(var j=0;j<result[i].AnnouncementArticle.length;j++){
                    if(result[i].AnnouncementArticle[j].ArticleImage !=null){
                        news += '<pre>'+result[i].AnnouncementArticle[j].ArticleText+'</pre><img src="data:image/*;base64,'+result[i].AnnouncementArticle[j].ArticleImage+'"></img>';
                    }
                    else{
                        news+= '<pre>'+result[i].AnnouncementArticle[j].ArticleText+'</pre>';
                    }
                }
                news+= '</div></div>';
                table += '<tr></tr><tr><td><a class="various" data-fancybox-type="inline" href="#'+result[i].AnnouncementTitle+'">'+result[i].AnnouncementTitle+'</td>'+'<td>'+date[0]+'</td></tr>';
            }
            table += '</tbody>';
            $("#announcement").html(table);
            $("#news").html(news);

        },
        error: function(response) {
            console.log(response.message)
            console.log("error");
        }
    });
}

function totalreport(){
    $.ajax({
        url: "https://airuapipython.azurewebsites.net/api/franchiseereport",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            LId: ID,
            Pwd: Pwd
        }),
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response);
            var total = response.total;
            var str = '<tr id="TotalLId"><td><div>您的客户人数</div></td><td><div>'+total[0].LId+'</div></td></tr><tr id="AvgUsedDays"><td><div>平均近十天上线率</div></td>'+
            '<td><div>'+total[0].UsedDays+'</div></td></tr><tr id="AvgUsedMaxtime"><td><div>平均连续未上线天数</div></td><td><div>'+total[0].UsedMaxTime+'</div></td>'+
            '</tr><tr id="TotalConsume"><td><div>总消费额</div></td><td><div>'+total[0].TotalConsume+'</div></td></tr><tr id="TotalWeekConsume"><td><div>本期消费额</div></td>'+
            '<td><div>'+total[0].WeekConsume+'</div></td></tr><tr id="TotalWeekCommission"><td><div>本期奖金</div></td><td><div>'+total[0].WeekCommission+'</div></td></tr>';



            result= response.result;
            table = "<thead><tr><th>品牌</th><th>手机<br>号码</th><th>注册日</th><th>受邀日</th><th>首次<br>消费日</th><th>最新<br>消费日</th><th>到期日</th><th>近十天<br>上线率</th><th>连续<br>未上线</th><th>总消<br>費額</th><th>本期<br>消费额</th><th>分润<br>奖金</th></tr></thead><tbody>"
            if(result.length>0){
                for(var i=0;i<result.length;i++){
                table += '<tr><td>'+result[i].Brand+'</td>'+'<td>'+result[i].Phone+'</td>'+'<td>'+result[i].RegisteredDate+'</td>'+
                '<td>'+result[i].SN2Date+'</td>'+'<td>'+result[i].SN4MinUsedDate+'</td>'+'<td>'+result[i].SN4Date+'</td>'+
                '<td>'+result[i].MaturityDate+'</td>'+'<td>'+result[i].UsedDays+'</td>'+'<td>'+result[i].UsedMaxTime+'日</td>'+
                '<td>'+result[i].TotalConsume+'</td>'+'<td>'+result[i].WeekConsume+'</td>'+'<td>'+result[i].WeekCommission+'</td></tr>';
            }
            }
            
            table += '</tbody>';


            today = new Date();
            day = today.getDay();
            date = today.getDate();
            if( day!== 6 ){
                date -= (day+1);
                today.setDate(date);
            }
            day1 = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            today.setDate(today.getDate()+6);
            day2 = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            today.setDate(today.getDate()+6);
            day3 = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            dater = '本期期间: '+day1+'~'+day2+'<br>本期关帐日: '+day2+'<br>本期应付款日: '+day3+'<br>';
            
            
            $("#customer").html(table);
            $("#ac_dater").html(dater);
            $("#ac_outline").html(str);
            $("#customer").DataTable({
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
                "order": [[ 3, "desc" ]]
            }
            });
        },error: function(response) {
            console.log(response.message)
            console.log("error");
        }
    });
}

function pointreport(){
    $.ajax({
        url: "https://airuapipython.azurewebsites.net/api/franchiseeinf",
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify({
            FId: FId,
            Pwd: Pwd
        }),
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response);
            today = new Date();
            day = today.getDay();
            date = today.getDate();
            if( day!== 6 ){
                date -= (day+1);
                today.setDate(date);
            }
            day1 = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            today.setDate(today.getDate()+6);
            day2 = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            today.setDate(today.getDate()+6);
            day3 = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
            dater = '本期期间: '+day1+'~'+day2+'<br>';
            score = '<tr><td>总積分</td><td>'+response.Point+'</td></tr><tr></tr><tr><td >总分享人数</td><td>'+response.Population+
                '</td></tr><tr></tr><tr><td>本期分享人数</td><td>'+response.SN2UsedDateOnWeek+'</td></tr><tr></tr><tr><td>总付费人数</td><td>'+
                response.PaiedPopulation+'</td></tr><tr></tr><tr id="TotalCommission"><td>累积总收入</td><td>'+response.Cash+'</td></tr><tr></tr>';
            $("#ac_dater").html(dater);
            $("#ac_outline").html(score);
        },error: function(response) {
            console.log(response.message);
            console.log("error");
        }
    });
}
function remittancecount(){
    $.ajax({
        url: "https://airuapipython.azurewebsites.net/api/remittance",
        type: 'POST',
        dataType: 'json',
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response.message);
        },
        error: function(response){
            console.log(response.message);
        }
    });
    return false;
}
function remittance(){
    $.ajax({
        url: "https://airuapipython.azurewebsites.net/api/remittancelist",
        type: 'POST',
        dataType:'json',
        data: JSON.stringify({
            LId: ID,
            Pwd: Pwd
        }),
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response.message)
            result = response.result.result.sort(function(a, b){return b['Week']-a['Week']});
            table = "<thead><tr><th>周数</th><th>结帐期间</th><th>金额</th><th>预计支付时间</th><th>明细</th></tr></thead><tbody>"
            
            for(var i=0;i<result.length;i++){
                day_s = result[i].SettlementStart.split(" ");
                day_e = result[i].SettlementEnd.split(" ");
                day_r = result[i].RemittanceDate.split(" ");
                table += '<tr><td>'+result[i].Week+'</td><td>'+day_s[0]+'~'+day_e[0]+'</td><td>'+result[i].Commission+'</td>'+
                '<td>'+day_r[0]+'</td><td><a class="various" data-fancybox-type="inline" href="#HistoryDetailGrid" ><button class="btn btn-info" onclick="incomedetail(' + ID + "," + result[i].Week + ')">明細</button></a></td></tr>';
            }
            table += '</tbody>';
            $("#HistoryIncome").html(table);
            $("#HistoryIncome").DataTable({
                "order": [[ 0, "desc" ]],
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
                }
            });
        

        },
        error: function(response) {
            console.log(response.message)
            console.log("error");
        }
    });
    return false;
}

function incomedetail(LId, Week) {
    $("#HistoryDetail").html('<table id="HistoryDetailGrid" class="table table-hover tablesorter"></table>');
    $.ajax({
        type: 'POST',
        url: "https://airuapipython.azurewebsites.net/api/incomedetail",
        dataType: 'json',
        data: JSON.stringify({
            LId: LId,
            Week: Week,
            Pwd: Pwd
        }),
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response.result);
            result = response.result;
            table = "<thead><tr><th>帐号</th><th>到期日</th><th>消费日</th><th>产品名称</th><th>价格</th></tr></thead><tbody>"
            
            for(var i=0;i<result.length;i++){
                day_m = result[i].MaturityDate.split(" ");
                day_u = result[i].UsedDate.split(" ");
                table += '<tr><td>'+result[i].LId+'</td>'+'<td>'+day_m[0]+'</td>'+'<td>'+day_u[0]+'</td>'+
                '<td>'+result[i].Name+"</td><td>"+result[i].Price+"</td></tr>";
            }
            table += '</tbody>';
            $("#HistoryDetailGrid").html(table);
            $("#HistoryDetailGrid").dataTable({
            
                "order": [[ 0, "desc" ]],
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
                }
            });
        
        },
        error: function(response) {
            console.log(response.message)
            console.log("error");
        }
    });
}
/*
$.ajax({
    type: 'POST',
    url: "https://airuapipython.azurewebsites.net/api/getfranchiseeowner",
    dataType: 'json',
    data: JSON.stringify({
        LId: ID,
        Pwd: Pwd
    }),
    //data:{Id: "123", Pwd: "AAA",DeviceId:"12",LId:"AA"},
    contentType: "application/json;charset=utf-8",
    success: function(response) {
        $(".user").html(response.result[0].Name);
        console.log(response);
    },
    error: function(response) {
        console.log(response.message)
        console.log("error");
    }
});
*/


function webpassword() {
    var Input = {
        LId: ID,
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
            alert(response.message)
            console.log(response.message)
            console.log("error");
        }
    });

}

function service() {
    var Input = {
        Email: $('#ContactEmail').val(),
        phone: $('#Contactphone').val(),
        Context: $('#ContactContext').val(),
        Type: $('#QuestionType').val()
    }

    $.ajax({
        type: 'POST',
        url: "https://airuapipython.azurewebsites.net/api/service",
        dataType: 'json',
        data: JSON.stringify(Input),
        contentType: "application/json;charset=utf-8",
        success: function(response) {
            console.log(response.message)
            alert("已成功送出，感谢您的来信，我们会尽快回覆")
        },
        error: function(response) {
            console.log(response.message)
            console.log("error");
        }
    });
}

function checkcall(){
    var q1 = $("#ContactEmail").val();//获取电子邮箱
    var q2 = $("#Contactphone").val();//获取手机号码
    var q3 = $("#ContactContext").val();
    if(q1==""){
        alert("请输入电子邮箱！");
        $("#ContactEmail").focus();//焦点框
    return false;//退出检测函数
    }
    else if(q2==""){
        alert("请输入手机号码！");
        $("#Contactphone").focus();//焦点框
        return false;//退出检测函数
    }
    else if(q3==""){
        alert("请输入內容！");
        $("#ContactContext").focus();//焦点框
        return false;//退出检测函数
    }
    else{
        service();
    }
}

function webChartController(){
    
    console.log("loading");

        var URLPATH = "https://airuapipython.azurewebsites.net/";
            $.ajax({
                url: URLPATH + "api/fraPointCash",
                type: 'GET',
                dataType: 'json',
                contentType: "application/jsonp;charset=utf-8",
                success: function(response)
                {   
                    

                    source=[];
                    personal=[];
                    for(var i=0;i<response.result.length;i++){
                      if(response.result[i].FranchiseeFId==FId){
                        data = {
                          customParam:response.result[i].FranchiseeFId,
                          x:response.result[i].FranchiseeCash,
                          y:response.result[i].FranchiseePoint,
                          z:Math.round((response.result[i].FranchiseeCash/10)*(response.result[i].FranchiseeCash/10)/100),
                          
                        };
                        personal.push(data);
                      }
                      else{
                        data = {
                          customParam:response.result[i].FranchiseeFId,
                          x:response.result[i].FranchiseeCash,
                          y:response.result[i].FranchiseePoint,
                          z:Math.round((response.result[i].FranchiseeCash/10)*(response.result[i].FranchiseeCash/10)/100),
                          
                        };
                        source.push(data);
                      }

                    }

                    $(function () {
                        $('#container-pic').highcharts({

                            chart: {
                                type: 'bubble',
                                plotBorderWidth: 1,
                                zoomType: 'xy'
                              },

                              title: {
                                text: '奖金与积分'
                              },

                              xAxis: {
                                title:{
                                  text:'累计现金(RMB)',
                                },
                                gridLineWidth: 1
                              },

                              yAxis: {
                                title:{
                                  text:'累计积分(分)',
                                },
                                startOnTick: false,
                                endOnTick: false
                              },
                              tooltip: {
                                formatter: function () {
                                    return '奖金:'+this.x + '<br/>积分:' + this.y + '<br/>FId: '+this.point.options.customParam;
                                }
                                },

                              series: [{
                                name:'其他加盟商',
                                data: source,
                                marker: {
                                    fillColor: {
                                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                                        stops: [
                                            [0, 'rgba(255,255,255,0.5)'],
                                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.5).get('rgba')]
                                        ]
                                    }
                                }
                            }, {
                                name:'您的业​​绩',
                                data:personal,
                                marker: {
                                    fillColor: {
                                        radialGradient: { cx: 0.4, cy: 0.3, r: 0.7 },
                                        stops: [
                                            [0, 'rgba(255,255,255,0.5)'],
                                            [1, Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.5).get('rgba')]
                                        ]
                                    }
                                }
                            }]
                            

                        });
                    });
                },
                error: function()
                {
                    alert("error");
                                    
                },
            });

    /**
     * Dark theme for Highcharts JS
     * @author Torstein Honsi
     */

    // Load the fonts
    Highcharts.createElement('link', {
       href: 'https://fonts.googleapis.com/css?family=Unica+One',
       rel: 'stylesheet',
       type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);

    Highcharts.theme = {
       colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
          "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
       chart: {
          backgroundColor: 'rgba(255,255,255,0.7)',
          style: {
             fontFamily: "'Microsoft JhengHei','Unica One', sans-serif"
          },
          plotBorderColor: '#606063'
       },
       title: {
          style: {
             color: '#535353',
             textTransform: 'uppercase',
             fontSize: '20px'

          }
       },
       subtitle: {
          style: {
             color: '#535353',
             textTransform: 'uppercase'
          }
       },
       xAxis: {
          gridLineColor: '#535353',
          labels: {
             style: {
                color: '#535353'
             }
          },
          lineColor: '#535353',
          minorGridLineColor: '#535353',
          tickColor: '#535353',
          title: {
             style: {
                color: '#535353'
             }
          }
       },
       yAxis: {
          gridLineColor: '#535353',
          labels: {
             style: {
                color: '#535353'
             }
          },
          lineColor: '#535353',
          minorGridLineColor: '#535353',
          tickColor: '#535353',
          tickWidth: 1,
          title: {
             style: {
                color: '#535353'
             }
          }
       },
       tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          style: {
             color: '#F0F0F0'
          }
       },
       plotOptions: {
          series: {
             dataLabels: {
                color: '#535353'
             },
             marker: {
                lineColor: '#333'
             }
          },
          boxplot: {
             fillColor: '#505053'
          },
          candlestick: {
             lineColor: 'white'
          },
          errorbar: {
             color: 'white'
          }
       },
       legend: {
          itemStyle: {
             color: '#535353'
          },
          itemHoverStyle: {
             color: '#FFF'
          },
          itemHiddenStyle: {
             color: '#606063'
          }
       },
       credits: {
          style: {
             color: '#666'
          }
       },
       labels: {
          style: {
             color: '#707073'
          }
       },

       drilldown: {
          activeAxisLabelStyle: {
             color: '#F0F0F3'
          },
          activeDataLabelStyle: {
             color: '#F0F0F3'
          }
       },

       navigation: {
          buttonOptions: {
             symbolStroke: '#DDDDDD',
             theme: {
                fill: '#505053'
             }
          }
       },

       // scroll charts
       rangeSelector: {
          buttonTheme: {
             fill: '#505053',
             stroke: '#000000',
             style: {
                color: '#CCC'
             },
             states: {
                hover: {
                   fill: '#707073',
                   stroke: '#000000',
                   style: {
                      color: 'white'
                   }
                },
                select: {
                   fill: '#000003',
                   stroke: '#000000',
                   style: {
                      color: 'white'
                   }
                }
             }
          },
          inputBoxBorderColor: '#505053',
          inputStyle: {
             backgroundColor: '#333',
             color: 'silver'
          },
          labelStyle: {
             color: 'silver'
          }
       },

       navigator: {
          handles: {
             backgroundColor: '#666',
             borderColor: '#AAA'
          },
          outlineColor: '#CCC',
          maskFill: 'rgba(255,255,255,0.1)',
          series: {
             color: '#7798BF',
             lineColor: '#A6C7ED'
          },
          xAxis: {
             gridLineColor: '#505053'
          }
       },

       scrollbar: {
          barBackgroundColor: '#808083',
          barBorderColor: '#808083',
          buttonArrowColor: '#CCC',
          buttonBackgroundColor: '#606063',
          buttonBorderColor: '#606063',
          rifleColor: '#FFF',
          trackBackgroundColor: '#404043',
          trackBorderColor: '#404043'
       },

       // special colors for some of the
       legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
       background2: '#505053',
       dataLabelsColor: '#B0B0B3',
       textColor: '#C0C0C0',
       contrastTextColor: '#F0F0F3',
       maskColor: 'rgba(255,255,255,0.3)'
    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);
  
}