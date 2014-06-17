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

var ctrlPressed = false;

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

    return a;
}

function dropCanvas(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    console.log('dropCanvas: ' + data);
    console.log(ev);

    act = createActivity(ev.x - canvas.offsetLeft-70, ev.y- canvas.offsetTop-30, 145, 65);
    if(selectedActivity != null){
        selectedActivity.unselect();
    }
    selectedActivity = act;
    selectedActivity.select();

    $("#propiedades").css("visibility", "visible");
    $("#objectName").val("");
    $("#objectName").focus();
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

    $(document).on("keyup", function(e){

        var keyprocessed = false;

        if(selectedActivity != null){

            //Ctrl
            if(e.keyCode == 17){

                ctrlPressed = false;
                e.preventDefault();

            }else {

                if(e.keyCode == 38){
                    e.preventDefault();
                    selectedActivity.moveUp();
                    keyprocessed = true;
                }else{

                    if(e.keyCode == 40){
                        e.preventDefault();
                        selectedActivity.moveDown();
                        keyprocessed = true;
                    }else{

                        if(e.keyCode == 37){
                            e.preventDefault();
                            selectedActivity.moveLeft();
                            keyprocessed = true;
                        }else{
                            if(e.keyCode == 39){
                                e.preventDefault();
                                selectedActivity.moveRight();
                                keyprocessed = true;
                            }
                        }
                    }
                }

            }



        }

        if(keyprocessed){
            //e.preventDefault();
            console.log("default prevented");
        }
    });

    $(document).on("keydown", function(e){

        if(selectedActivity != null){

            //Ctrl
            if(e.keyCode == 17){

                ctrlPressed = true;
                e.preventDefault();

            }else{

                if(e.keyCode == 38){
                    e.preventDefault();
                    //selectedActivity.moveUp();
                    keyprocessed = true;
                }else{

                    if(e.keyCode == 40){
                        e.preventDefault();
                        //selectedActivity.moveDown();
                        keyprocessed = true;
                    }else{

                        if(e.keyCode == 37){
                            e.preventDefault();
                            //selectedActivity.moveLeft();
                            keyprocessed = true;
                        }else{
                            if(e.keyCode == 39){
                                e.preventDefault();
                                //selectedActivity.moveRight();
                                keyprocessed = true;
                            }
                        }
                    }
                }
            }


        }
    });

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

        if( Math.abs(mouseX- (e.pageX - this.offsetLeft)) >= 3 ||
            Math.abs(mouseY- (e.pageY - this.offsetTop)) >= 3){

            if(selectedActivity != null){
                selectedActivity.move(e.pageX - this.offsetLeft - 70, e.pageY - this.offsetTop - 30);
            }
        }
    });

    $('#workAreaCanvas').mousedown(function(e) {

        buttonPressed = true;
        var linked = false;

        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;

        var activity = processModel.getSelectedActivity(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        if(activity != null){

            $('#workAreaCanvas').css('cursor', 'move');

            if (selectedActivity == null){

                selectedActivity  = activity;
                selectedActivity.select();

            }else{

                if(selectedActivity != activity){

                    //Link Activities
                    if(ctrlPressed){

                        selectedActivity.linkTo(activity);
                        linked = true;

                    }else{

                        selectedActivity.unselect();
                        selectedActivity  = activity;
                        selectedActivity.select();
                    }

                }
            }

            if(!linked){

                $("#propiedades").css("visibility", "visible");
                $("#objectName").val(selectedActivity.getName());
            }


        }else{

            $('#workAreaCanvas').css('cursor', 'default');

            if(selectedActivity != null){
                selectedActivity.unselect();
                selectedActivity = null;
            }

            $("#propiedades").css("visibility", "hidden");
        }

    });



});