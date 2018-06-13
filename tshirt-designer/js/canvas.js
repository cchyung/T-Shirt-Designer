var frontCanvas;
var backCanvas;
var frontShowing; // tracks which side is visible currently
var selectedCanvas;
var canvasHeight;
var canvasWidth;

$(document).ready( function(){
  setupCanvas();
});

function setupCanvas(){
  setupUploadImage();

  frontCanvas = new fabric.Canvas('front');
  backCanvas = new fabric.Canvas('back');
  frontShowing = true;
  selectedCanvas = frontCanvas;

  var canvasContainer = $('.canvas-container');
  canvasWidth = canvasContainer.width();
  canvasHeight = canvasContainer.height();

  frontCanvas.setWidth(canvasWidth);
  frontCanvas.setHeight(canvasHeight);

  backCanvas.setWidth(canvasWidth);
  backCanvas.setHeight(canvasHeight);

  // temp: load default images
  var frontImage = fabric.Image.fromURL(
    'temp-assets/temp-front.jpg',
    function(oImg){
      oImg.scaleToWidth(canvasWidth);
      oImg.scaleToHeight(canvasHeight);
      oImg.selectable = false; // not selectable
      frontCanvas.add(oImg);
  });

  // temp: load default images
  var backImage = fabric.Image.fromURL(
    'temp-assets/temp-back.jpg',
    function(oImg){
      oImg.scaleToWidth(canvasWidth);
      oImg.scaleToHeight(canvasHeight);
      oImg.selectable = false; // not selectable
      backCanvas.add(oImg);
  });

  setupSwitchCanvas();
  setupAddText();
  setupDeleteButton();
}

function setupSwitchCanvas(){
  let btn = $('#switch');
  $('.canvas-back').hide(); // hide back canvas

  btn.click(switchCanvas);
}

function switchCanvas(){
  let frontCanvasContainer = $('.canvas-front');
  let backCanvasContainer = $('.canvas-back');

  let status = $('.current-side');
  let btn = $('.btn-switch');

  if(frontShowing){
    frontCanvasContainer.hide();
    backCanvasContainer.show();
    status.text('Back');
    btn.text('Switch to Front');
    frontShowing = false;
    selectedCanvas = backCanvas;
  } else {
    frontCanvasContainer.show();
    backCanvasContainer.hide();
    status.text('Front');
    btn.text('Switch to Back');
    frontShowing = true;
    selectedCanvas = frontCanvas;
  }
}

function setupUploadImage(){
  let fileUpload = $('#image-upload');

  fileUpload.change(
    function handleImage(e){
      let reader = new FileReader();
      reader.onload = function(event){

        let imageObject = new Image();
        imageObject.src = event.target.result;

        imageObject.onload = function(){
          console.log("image uploaded!");
          // create fabric image from imageObject
          let image = new fabric.Image(imageObject);

          // prescale image
          if(image.height > 200 || image.width > 200){
            let ratio = Math.min(200 / image.height, 200 / image.width);
            image.scaleToWidth(image.width * ratio);
            image.scaleToHeight(image.height * ratio);
          }

          // position image
          image.set({
                    left: 10,
                    top: 10,
                });

          selectedCanvas.add(image);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
  });
}

function setupAddText(){
  let textButton = $('#text-art-btn');
  let fontSelect = $('#text-art-font-select');
  let colorSelect = $('#text-art-color-select');

  textButton.click(function(){

    console.log(colorSelect.jscolor)

    let textArt = new fabric.IText("Text", {
      fontFamily: $('#text-art-font-select option:selected').text(),
      fill: colorSelect.css('background-color')
    });

    textArt.set({
      left: 10,
      top:10
    });

    selectedCanvas.add(textArt);
  });
}

function setupDeleteButton(){
  let deleteButton = $('#delete-element-btn');

  deleteButton.hide();

  frontCanvas.on('selection:created', function(options) {
    deleteButton.show();
  })

  backCanvas.on('selection:created', function(options) {
    deleteButton.show();
  })

  frontCanvas.on('selection:cleared', function(options) {
    deleteButton.hide();
  })

  backCanvas.on('selection:cleared', function(options) {
    deleteButton.hide();
  })

  deleteButton.click(function() {
    selectedCanvas.remove(selectedCanvas.getActiveObject());
  });
}
