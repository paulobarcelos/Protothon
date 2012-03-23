var body = document.getElementsByTagName('body')[0];

var video = document.createElement('video');
body.appendChild (video);
video.width = 320;
video.height = 240;
video.autoplay = true;

var hasUserMedia = navigator.webkitGetUserMedia ? true : false;
navigator.webkitGetUserMedia('video', function(stream){
    video.src   = webkitURL.createObjectURL(stream);
}, function(error){
    console.log("Failed to get a stream due to", error);
});

var stats = new Stats();
stats.getDomElement().style.position = 'absolute';
stats.getDomElement().style.right = '0px';
stats.getDomElement().style.top = '0px';
document.body.appendChild( stats.getDomElement() );

var canvas = document.createElement('canvas');
canvas.width = video.width;
canvas.height = video.height;
var context = canvas.getContext('2d');

var rCanvas = document.createElement('canvas');
body.appendChild (rCanvas);
rCanvas.width = video.width;
rCanvas.height = video.height;
var rContext = rCanvas.getContext('2d');

var gCanvas = document.createElement('canvas');
body.appendChild (gCanvas);
gCanvas.width = video.width;
gCanvas.height = video.height;
var gContext = gCanvas.getContext('2d');

var bCanvas = document.createElement('canvas');
body.appendChild (bCanvas);
bCanvas.width = video.width;
bCanvas.height = video.height;
var bContext = bCanvas.getContext('2d');


var totalFrames = 30,
halfFrames = Math.round(totalFrames / 2),
endFrame = totalFrames - 1,
frameIndex = 0,
start, middle, end,
ready = false;
frames = new Array(totalFrames);

(function render(){
	requestAnimationFrame(render);

	context.drawImage(video, 0, 0, video.width, video.height);
	frames[frameIndex] = context.getImageData(0, 0, video.width, video.height);;

	if(ready){
		rContext.putImageData(frames[start], 0, 0);
		gContext.putImageData(frames[middle], 0, 0);
		bContext.putImageData(frames[end], 0, 0);
	}

	frameIndex++;
	if(frameIndex > endFrame){
		if(!ready) ready = true;
		frameIndex = 0;
	}

	start = frameIndex + 1;
	middle = start + halfFrames;
	end = frameIndex;
	if(start > endFrame) start -= totalFrames;
	if(middle > endFrame) middle -= totalFrames;

	stats.update();
})();
