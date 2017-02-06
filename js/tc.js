
var size = 0;

function onScoreArgumentChanged(event){
    var target = $("#panel" + event.data.id);
    var c = target.find("input[name=time]").val() * target.find("input[name=cost]").val();
    if(!isNaN(c)){
        target.find(".score").text("점수:" + c);
    }
}

function makePanel(){
    var trans_type_template = 
        "운송수단 타입<select></select>";
    var start_end_template =
        "출발<input name=\"start\"></input><br />" +
        "도착<input name=\"end\"></input>";
    var cost_and_time_template = 
        "비용<input type=\"number\" name=\"cost\"></input>&nbsp;" +
        "시간<input type=\"time\" name=\"time\"></input>";
    var newdiv = $("<div>").addClass("panel panelWrapper row").attr("id", "panel" + size);
    var trans_types = [
            "KTX", "SRT", "버스", "지하철", "택시", "다리", "기타"
    ]
    $("<div>").html(trans_type_template).addClass("col-md-2").appendTo(newdiv);
    $("<div>").html(start_end_template).addClass("col-md-3").appendTo(newdiv);
    $("<div>").html(cost_and_time_template).change({id: size}, onScoreArgumentChanged)
        .addClass("col-md-5").appendTo(newdiv);
    $("<div>").addClass("col-md-3 score").appendTo(newdiv);
    trans_types.forEach(function(entry){
        $("<option>").val(entry).text(entry).appendTo(newdiv.find("select"));
    }, this);
    newdiv.appendTo("#panel-holder");
    size += 1;
}

function findRoadByDaumMap(start, dest){
    var url = "http://map.daum.net/?sName=STARTNAMEHERE&eName=ENDNAMEHERE&transitOption=3"
    if(start == "" || start == null || dest == "" || dest == null)
        return;
    var destDiv = $("<div>");
    //destDiv.load(url.replace("STARTNAMEHERE", start).replace("ENDNAMEHERE", dest));
    $.ajax({
        url: url.replace("STARTNAMEHERE", start).replace("ENDNAMEHERE", dest),
        
        success: function(data) {
            alert("called");
            alert(data.length);
        }
    });
    //return destDiv;
    
}

//script when document loaded
$(function(){
    $.support.cors = true;
})