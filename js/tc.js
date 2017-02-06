
function makePanel(){
    var start_end_template =
        "출발<input name=\"start\"></input>" +
        "도착<input name=\"end\"></input>";
    var newdiv = $("<div>").addClass("panel row");
    $("<div>").html(start_end_template).addClass("col-4").appendTo(newdiv);
    newdiv.appendTo("#panel-holder");
}