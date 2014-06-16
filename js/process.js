/**
 * Created by USUARIO on 14/06/2014.
 */

var lineStarted = false;
var mouseX;
var mouseY;

var processModel;
var canvas;

var selectedActivity = null;
var buttonPressed = false;

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('Mi drop: ' + data);
}

function createActivity(x, y, width, height){

    var a = new activity_js(x, y, width, height);
    a.paint();
    processModel.addActivity(a);

}

function dropCanvas(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('dropCanvas: ' + data);
    console.log(ev);

    createActivity(ev.x - canvas.offsetLeft-70, ev.y- canvas.offsetTop-30, 145, 65);
}

function drag(ev) {
    ev.dataTransfer.setData("Text", ev.target.id);
    console.log('Mi drag');
}

function allowDrop(ev) {
    ev.preventDefault();
    console.log('Mi allowdrop');
}

$(document).ready(function(){

    processModel = new processModel_js();
    canvas = document.getElementById('workAreaCanvas');

    $("#propiedades").css("visibility", "hidden");

    var context = canvas.getContext("2d");
    context.lineWidth = 1;
    context.strokeStyle = '#CCC';

    /*context.beginPath();
    context.moveTo(120, 0);
    context.lineTo(120, 400);
    context.stroke();*/

    /*context.font = "11px Arial";
    context.strokeStyle = 'black';
    context.strokeRect(10, 10, 100, 50);
    context.fillText("Actividad", 30, 40);*/

    /*image = document.getElementById('imgActividad');
    context.drawImage(image, 5, 130);*/

    console.log(context.lineCap + " " + context.lineWidth + " " +context.lineJoin);

    $("#saveProperties").on("click", function(){
       selectedActivity.setName($("#objectName").val());
    });

    $('#workAreaCanvas').mousemove(function(e) {

        if(selectedActivity != null){

            if(selectedActivity.insideMe(e.pageX - this.offsetLeft, e.pageY - this.offsetTop) || buttonPressed){
                $('#workAreaCanvas').css('cursor', 'move');
            }else{
                $('#workAreaCanvas').css('cursor', 'default');
            }
        }

    });

    $('#workAreaCanvas').mouseup(function(e) {

        buttonPressed = false;

        console.log("mouseup");

        if( Math.abs(mouseX- (e.pageX - this.offsetLeft)) >= 3 ||
            Math.abs(mouseY- (e.pageY - this.offsetTop)) >= 3){

            if(selectedActivity != null){
                selectedActivity.move(e.pageX - this.offsetLeft - 70, e.pageY - this.offsetTop - 30);
            }
        }
    });

    $('#workAreaCanvas').mousedown(function(e) {

        buttonPressed = true;

        console.log("mousedown");

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        var activity = processModel.getSelectedActivity(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        if(activity != null){

            console.log("activity selected");

            $('#workAreaCanvas').css('cursor', 'move');

            if (selectedActivity == null){

                selectedActivity  = activity;
                selectedActivity.select();

            }else{

                if(selectedActivity != activity){
                    selectedActivity.unselect();
                    selectedActivity  = activity;
                    selectedActivity.select();
                }
            }

            $("#propiedades").css("visibility", "visible");
            $("#objectName").val(selectedActivity.getName());

        }else{

            $('#workAreaCanvas').css('cursor', 'default');

            if(selectedActivity != null){
                selectedActivity.unselect();
                selectedActivity = null;
            }

            $("#propiedades").css("visibility", "hidden");
        }

/*
        if (lineStarted) {

            var context = canvas.getContext("2d");
            context.lineWidth = 1;
            context.strokeStyle = 'black';

            context.beginPath();
            context.moveTo(mouseX, mouseY);
            context.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            context.stroke();
        }



        lineStarted = !lineStarted;*/

    });



});