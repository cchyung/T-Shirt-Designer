var canvas

$(document).ready( function(){
  console.log("Ready!");
  setupCanvas();
  setupOptions();
});

function setupCanvas(){
  canvas = new fabric.Canvas('c');

  var rect = new fabric.Rect({
    left: 100,
    top: 50,
    width: 100,
    height: 100,
    fill: 'green',
    angle: 20,
    padding: 10
  });

  canvas.add(rect);
  var canvasContainer = $('.canvas-container');

  canvas.setWidth(canvasContainer.width());
  canvas.setHeight(canvasContainer.height());
}

// sets up options for quotes and t shirt designer
function setupOptions(){
  setupStyles(tempstyles);
}

let tempstyles = [
  {
    "style": "T Shirt",
    "id": 4504,
  },
  {
    "style": "Tank Top",
    "id": 4404,
  },
  {
    "style": "Hoodie",
    "id": 1004,
  },
  {
    "style": "Polo Shirt",
    "id": 1032,
  },
]

// generates array of styles to choose from
function setupStyles(styles){
  stylesContainer = $('.style-container');

  for(var i = 0; i < styles.length; i++){
    stylesContainer.append(`<div class='style' > ${ styles[i]["style"] }</div>`);
  }

  $('.style').click(function(event){
    toggleStyle(event.target)
  });
}

// toggles selection of styles
function toggleStyle(target){
  let style = $(target);
  if(style.hasClass('selected')){
    style.removeClass('selected');
  } else {
    style.addClass('selected');
  }

  // update quantity, and color options
}
