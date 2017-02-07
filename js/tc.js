
var routeSize = 0;


var calcMethod = mHarmony;

function mTimeFirst(time, cost){
    return parseInt(Math.pow(time, 0.8)) * cost;
}

function mHarmony(time, cost){
    return parseInt(time) * cost;
}

function mCostFirst(time, cost){
    return time * parseInt(Math.pow(cost, 0.8));
}

function setMethod(num){
    if(num == 0){
        calcMethod = mTimeFirst;
    }
    else if(num == 2){
        calcMethod = mCostFirst;
    }
    else{
        calcMethod = mHarmony;
    }
    onScoreArgumentChanged();
}

function onScoreArgumentChanged(){
    console.log("calculating...");
    var a = $(".panel-wrapper");
    a.each(function(){
        var element = $(this);
        var sum = 0;
        var inputt = element.find("input[name=time]");
        var inputc = element.find("input[name=cost]");
        for(var i = 0; i < inputt.length; i++){
            sum += calcMethod(inputt.eq(i).val(), inputc.eq(i).val())
        }
        $(element).find(".score").text(sum + "점");
    });
}

function onDestinationChanged(){

}

function onStartChanged(){

}

function addPanelHolder(){
    var template = '<div class="panel panel-wrapper">' +
        '   <div class="ticketbox"><span class="x-wrapper clickable">X</span></div>' + 
        '       <div class="row">' +
        '       <div class="course-container col-md-10">' + 
        '           <div class="course-add-panel course clickable">+경유지 추가</div>' +
        '       </div>' +
        '       <div class="score col-md-2">0점</div>' +
        '   </div>'
        '</div>';
    //$("#panel-holder").append(template);
    var newdiv = $(template).attr("id", "panel" + routeSize);
    makeRoute(newdiv);
    newdiv.find(".course-add-panel").click(function(){
        makeRoute(newdiv);
    });
    newdiv.find(".x-wrapper").click(function(){
        newdiv.remove();
    })
    newdiv.appendTo("#panel-holder");
    routeSize += 1;
}

function makeRoute(caller){
    var trans_type_template = 
        "<select></select>";
    var start_end_template =
        "출발<input name=\"start\" />" +
        "도착<input name=\"end\" />";
    var cost_and_time_template = 
        "비용<input type=\"number\" name=\"cost\" value=\"0\">원&nbsp;" +
        "시간<input type=\"time\" name=\"time\" value=\"0\">분";
    var trans_types = [
            "KTX", "SRT", "버스", "지하철", "택시", "다리", "기타"
    ]
    var newdiv = $("<div>").addClass("row course");
    $("<div>").addClass("w-100").appendTo(newdiv);
    $("<div>").html(trans_type_template).addClass("col-md-2").appendTo(newdiv);
    $("<div>").html(start_end_template).addClass("col-md-5").appendTo(newdiv);
    $("<div>").html(cost_and_time_template).change({id: caller.id}, onScoreArgumentChanged)
        .addClass("col-md-5").appendTo(newdiv);
    trans_types.forEach(function(entry){
        $("<option>").val(entry).text(entry).appendTo(newdiv.find("select"));
    }, this);
    newdiv.prependTo(caller.find(".course-container"));
}


//script when document loaded
$(function(){
    $.support.cors = true;
    $(".btn-group > .btn").on("click", function(){
        $(this).addClass('active').siblings().removeClass("active");
        onScoreArgumentChanged
    });
})