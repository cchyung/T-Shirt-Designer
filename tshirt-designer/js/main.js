var frontCanvas;
var backCanvas;
var frontShowing; // tracks which side is visible currently
var selectedCanvas;
var canvasHeight;
var canvasWidth;

$(document).ready( function(){
  console.log("Ready!");
  setupCanvas();
  setupOptions();
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

// sets up options for quotes and t shirt designer
function setupOptions(){
  fetchStyles(setupStyles)
  fetchInkColors(setupInkColors)
  setupQuantities()
}



let selectedStyleID = null; // tracks ID of selected style
let selectedStyleColor = null;
let selectedInkColors = []; // initialize to empty array
let totalQuantity = 0;

// generates array of styles to choose from
function setupStyles(styles){
  stylesContainer = $('.style-container');

  for(var i = 0; i < styles.length; i++){
    stylesContainer.append(`<div class='style' data-style-id='${ styles[i]["style_id"] }'> ${ styles[i]["style"] }</div>`);
  }

  $('.style').click(function(event){
    selectStyle(event.target)
  });
}

// toggles selection of styles
function selectStyle(target){
  let styleElement = $(target);
  selectedStyle = $(target).data('style-id'); // set selected style
  $('.style').removeClass('selected');
  styleElement.addClass('selected');

  fetchStyleColors(selectedStyle, setupStyleColors) // fetch style colors from API and setup colors
}

// Given a styleID populate colors form
function setupStyleColors(styleColors){
  selectedStyleColor = null; // clear selections

  let styleColorsContainer = $('.style-colors-container');
  styleColorsContainer.empty();

  for(var i = 0; i < styleColors.length; i++){
    styleColorsContainer.append(
      `<div
        class='style-color color'
        data-style-color='${ styleColors[i]["color"] }'
        style="background-color: #${ styleColors[i]["hex"] }"
      ></div>`
    );
  }

  $('.style-color').click(function(event){
    selectColor(event.target)
  });
}

function selectColor(target){
  console.log("Selected color!")
  let styleColorElement = $(target);
  selectedStyleColor = $(target).data('style-color');
  $('.style-color').removeClass('selected');
  styleColorElement.addClass('selected');
}

function setupInkColors(inkColors) {
  selectedInkColors = []; // clear to null

  let inkColorsContainer = $('.ink-colors-container');
  inkColorsContainer.empty();

  for(var i = 0; i < inkColors.length; i++){
    inkColorsContainer.append(
      `<div
        class='ink-color color'
        data-ink-color='${ inkColors[i]["color"] }'
        style="background-color: #${ inkColors[i]["hex"] }"
      ></div>`
    )
  }

  $('.ink-color').click(function(event){
    selectInkColor(event.target)
  });
}

function selectInkColor(target){
  let targetColor = $(target)
  let color = targetColor.data('ink-color');

  if(targetColor.hasClass('selected')){
    targetColor.removeClass('selected');
    let index = $.inArray(
      color, selectedInkColors
    )
    selectedInkColors.splice(index, 1);
  } else {
    targetColor.addClass('selected');
    selectedInkColors.push(color)
  }
}

function setupQuantities(){
  totalQuantity = 0; // reset total quanitity
  let inputs = $('.quantity-input');

  inputs.change(function() {
    totalQuantity = 0; // reset total quanitity here too
    inputs.each(function(){
      totalQuantity += Number($(this).val());
    })

    $('#total-quantity').html(totalQuantity);
  })
}
