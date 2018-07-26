// Get canvas, height and width setting
var canvas = document.getElementById('js-canvas');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var context = canvas.getContext('2d');
var imageObj = new Image();
imageObj.src = "img/marvelLogo.png";


// Scroll and resize event listeners
window.addEventListener('scroll', scrollOnCanvas, false);
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('fullscreenchange', resizeCanvas, false);

// Resize canvas width
function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    drawStuff();
    setTimeout(function (){
        var width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        drawStuff();
    }, 100);
}

// Redraw canvas on scroll
function scrollOnCanvas() {
        drawStuff();
}

// clear canvas
function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw image
function drawStuff(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.7;
    context.drawImage(imageObj, 50, height / 3 , width - 100 , (width - 100) /4.474 );
}

// Draw image first time
imageObj.onload = function(){
    drawStuff();
};