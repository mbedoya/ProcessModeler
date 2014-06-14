/**
 * Created by USUARIO on 14/06/2014.
 */

var lineStarted = false;
var mouseX;
var mouseY;

var activities = [];

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('Mi drop: ' + data);
}

function createActivity(x, y, width, height){

    var a = new activity_js(x, y, width, height);
    a.paint();
    activities.push(a);
}

function dropCanvas(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('dropCanvas: ' + data);
    console.log(ev);

    createActivity(ev.x - canvas.offsetLeft-70, ev.y- canvas.offsetTop-28, 147, 56);
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

    canvas = document.getElementById('workAreaCanvas');

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

    $('#workAreaCanvas').mousedown(function(e) {

        if(lineStarted){

            var context = canvas.getContext("2d");
            context.lineWidth = 1;
            context.strokeStyle = 'black';

            context.beginPath();
            context.moveTo(mouseX, mouseY);
            context.lineTo(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            context.stroke();
        }

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        lineStarted = !lineStarted;

    });



});