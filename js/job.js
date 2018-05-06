function HRJobController(){
    console.log("loading");
    var titleid = [];
    var date=[];
    var HRjob = $("#jobitem1");
    var html = '<tr><td>Job Title</td><td>Location/Worksite</td><td>Update Date</td></tr>';
    var URLPATH = "https://airuapipython.azurewebsites.net/";
        $.ajax({
            url: URLPATH + "api/HRjob",
            type: 'GET',
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(response)
            {
                console.log(response.message);
                for(i=0;i<response.result.length;i++){
                    var Today = new Date();
                    var day = Math.round(Math.random() * 10);
                    var dayOfMonth = Today.getDate();
                    Today.setDate(dayOfMonth-day);
　                  var dateupdate = Today.getFullYear() + "-" + (Today.getMonth()+1) + "-" + Today.getDate();
                    var title = response.result[i].JobimformationJobTitle//used to be <td>-id-
                    titleid.push(title.replace(" ",""))//used to be <td>-id-
                    date.push(dateupdate);
                    str = '<tr><td><a class="various" id="'+response.result[i].JobimformationJobId+'" data-fancybox-type="inline" href="#detail" JobId="'+response.result[i].JobimformationJobId+'">'+response.result[i].JobimformationJobTitle+'</a></td><td>'+response.result[i].JobimformationWorksite+'</td><td id="'+dateupdate+'">'+dateupdate+'</td></tr>';
                    html += str ;
                }
                HRjob.html(html);
                var sc = $(".sc");
                var tmp = "<script>";
                for(i=0;i<titleid.length;i++){
                    tmp += '$(document).on("click","#'+response.result[i].JobimformationJobId+'",function(){var id = $("#'+response.result[i].JobimformationJobId+'").attr("JobId");var date=$("#'+date[i]+'").attr("id");HRJobdetailController(id,date);});'
                }
                tmp += '</script>';
                sc.html(tmp)  
            },
            error: function()
            {
                alert("error");
                                
            },
        });

     

}
//




function HRJobdetailController(JobId,date){
    console.log("loading");
    console.log(JobId);
    $("#jobtitle").html('');
    $("#worksite").html(''); 
    $("#type").html(''); 
    $("#description").html(''); 
    $("#responsibility").html('');
    $("#skills").html('');
    var HRjob = $("#jobitem2");
    var URLPATH = "https://airuapipython.azurewebsites.net/";
        data = {
            JobId:JobId
        };
        $.ajax({
            url: URLPATH + "api/HRjobdetail",
            type: 'POST',
            data: JSON.stringify(data), 
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            success: function(response)
            {   
                console.log(response.message);
                for(i=0;i<response.result.length;i++){
                    rs = response.result[i];
                    Responsibilities = [];
                    skill= [];
                    title = '<p>&nbsp;&nbsp;&nbsp;&nbsp;'+rs.JobimformationJobTitle+'</p>';
                    worksite = '<p>&nbsp;&nbsp;&nbsp;&nbsp;'+rs.JobimformationWorksite+'</p>';
                    type = '<p>&nbsp;&nbsp;&nbsp;&nbsp;'+rs.JobimformationTypeofEmployment+'</p>';
                    description = '<p>&nbsp;&nbsp;&nbsp;&nbsp;'+rs.JobimformationDescription+'</p>';
                    respon = '';
                    ski = '';
                    Responsibilities.push(rs.JobimformationResponsibilities1);
                    Responsibilities.push(rs.JobimformationResponsibilities2);
                    Responsibilities.push(rs.JobimformationResponsibilities3);
                    Responsibilities.push(rs.JobimformationResponsibilities4);
                    Responsibilities.push(rs.JobimformationResponsibilities5);
                    Responsibilities.push(rs.JobimformationResponsibilities6);
                    skill.push(rs.JobimformationSkills1);
                    skill.push(rs.JobimformationSkills2);
                    skill.push(rs.JobimformationSkills3);
                    skill.push(rs.JobimformationSkills4);
                    skill.push(rs.JobimformationSkills5);
                    skill.push(rs.JobimformationSkills6);
                    for(j=0;j<6;j++){
                        if (Responsibilities[j] !=="None" && Responsibilities[j] !== null){
                            respon += '<p>&nbsp;&nbsp;&nbsp;&nbsp;- '+Responsibilities[j]+'</p>';
                        }
                        if (skill[j] !=="None" && skill[j] !== null){
                            ski += '<p>&nbsp;&nbsp;&nbsp;&nbsp;'+(j+1)+'. '+skill[j]+'</p>';
                        }
                    }
                }
                $("#jobtitle").html(title);
                $("#worksite").html(worksite); 
                $("#type").html(type); 
                $("#description").html(description); 
                $("#responsibility").html(respon);
                $("#skills").html(ski);
            },
            error: function()
            {
                alert("error");
                                
            },
        });
}