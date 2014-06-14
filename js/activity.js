/**
 * Created by USUARIO on 14/06/2014.
 */

//Database handling
var activity_js = function(x, y, w, h){

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.paint = function(){

        canvas = document.getElementById('workAreaCanvas');
        var context = canvas.getContext("2d");
        context.strokeStyle = 'black';
        context.lineWidth = 3;
        context.strokeRect(x, y, w, h);
        context.moveTo(x+w-17, y);
        context.lineTo(x+w-17, y + h);
        context.stroke();

    }
}
