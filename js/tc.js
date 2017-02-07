
var routeSize = 0;


var calcMethod = mHarmony;

function mTimeFirst(time, cost){
    return Math.pow(time, 0.8) + cost;
}

function mHarmony(time, cost){
    return time + cost;
}

function mCostFirst(time, cost){
    return time + Math.pow(cost, 0.8);
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
}

function onScoreArgumentChanged(event){
    var target = $("#panel" + event.data.id);
    var c = target.find("input[name=time]").val() * target.find("input[name=cost]").val();
    if(!isNaN(c)){
        target.find(".score").text("점수:" + c);
    }
}

function addPanelHolder(){
    var newdiv = $("<div>").addClass("panel panel-wrapper row").attr("id", "panel" + routeSize);
    $("<div>").addClass("x-wrapper").append("<span>X</span>").appendTo(newdiv);
    makePanel(newdiv);
    $("<div>").addClass("col-md-10 clickable").text("경유 추가").click(function(){
        makePanel(newdiv);
    }).appendTo(newdiv);
    newdiv.appendTo("#panel-holder");
    routeSize += 1;
}

function makePanel(caller){
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
    var newdiv = caller;
    $("<div>").addClass("w-100").appendTo(newdiv);
    $("<div>").html(trans_type_template).addClass("col-md-2").appendTo(newdiv);
    $("<div>").html(start_end_template).addClass("col-md-3").appendTo(newdiv);
    $("<div>").html(cost_and_time_template).change({id: caller.id}, onScoreArgumentChanged)
        .addClass("col-md-5").appendTo(newdiv);
    $("<div>").addClass("col-md-3 score").appendTo(newdiv);
    trans_types.forEach(function(entry){
        $("<option>").val(entry).text(entry).appendTo(newdiv.find("select"));
    }, this);
}


//script when document loaded
$(function(){
    $.support.cors = true;
})