// set to the event when the user pressed the mouse button down
var mouseDown;
// only allow one crop. turn it off after that
var disabled = false;
var rectangle = new fabric.Rect({
   fill: 'transparent',
   stroke: '#cccc',
   strokeDashArray: [4, 4],
   visible: false
});
// console.log(rectangle);
var container = document.getElementById('canvas').getBoundingClientRect();
var canvas = new fabric.Canvas('canvas');
canvas.add(rectangle);
var image;
fabric.util.loadImage("https://ucarecdn.com/85b5644f-e692-4855-9db0-8c5a83096e25/", function(img) {
   image = new fabric.Image(img);
   image.selectable = false;
   canvas.setWidth(image.getWidth());
   canvas.setHeight(image.getHeight());
   canvas.add(image);
   canvas.centerObject(image);
   canvas.renderAll();
},null,{crossOrigin:"Anonymous"});
// capture the event when the user clicks the mouse button down
canvas.on("mouse:down", function(event) {
   if(!disabled) {
       rectangle.width = 2;
       rectangle.height = 2;
       rectangle.left = event.e.pageX - container.left;
       rectangle.top = event.e.pageY - container.top;
       rectangle.visible = true;
       mouseDown = event.e;
       canvas.bringToFront(rectangle);
   }
});
// draw the rectangle as the mouse is moved after a down click
canvas.on("mouse:move", function(event) {
   if(mouseDown && !disabled) {
       rectangle.width = event.e.pageX - mouseDown.pageX;
       rectangle.height = event.e.pageY - mouseDown.pageY;
       canvas.renderAll();
   }
});
// when mouse click is released, end cropping mode
canvas.on("mouse:up", function() {
   mouseDown = null;
});
// $('#cropB').on('click', function() {
//    image.clipTo = function(ctx) {
//        // origin is the center of the image
//        var x = rectangle.left - image.getWidth() / 2;
//        var y = rectangle.top - image.getHeight() / 2;
//        ctx.rect(x, y, rectangle.width, rectangle.height);
//    };
//    image.selectable = true;
//    disabled = true;
//    rectangle.visible = false;
//    canvas.renderAll();
// });

function geturl(){
// var canvas = document.getElementById('canvas');
image.clipTo = function(ctx) {
       // origin is the center of the image
       var x = rectangle.left - image.getWidth()/2;
       var y = rectangle.top - image.getHeight()/2;
       ctx.rect(x, y, rectangle.width, rectangle.height);
   };
   image.selectable = false;
   disabled = true;
   rectangle.visible = false;
   // canvas.renderAll();
   var dataURL = image.toDataURL();
   // alert(dataURL)
   console.log(dataURL);
   // window.open(dataURL);
}

$('#open_image').on('click', function(){
  geturl();
});
