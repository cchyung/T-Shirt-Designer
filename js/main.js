$(document).ready( function(){
  setupOptions();
});

// sets up options for quotes and t shirt designer
function setupOptions(){
  fetchStyles(setupStyles)
  setupQuantities()
  fetchAddons(setupAddons)
}

let selectedStyleID = null;
let selectedStyleColor = null;
let totalQuantity = 0;

// generates array of styles to choose from
function setupStyles(styles){
  stylesContainer = $('.style-container');

  // create style tiles and detail overlays
  for(var i = 0; i < styles.length; i++){
    // make div for style colors
    let styleColorContainer = `<div class='style-colors'>`;
    for(var j = 0; j < styles[i]["colors"].length; j++) {
      styleColorContainer +=
      `
        <div
          class='style-color'
          style='background-color:#${ styles[i]["colors"][j]["hex"] }'
          data-color='${ styles[i]["colors"][j]["slug"] }'
        ></div>
      `
    };
    styleColorContainer += '</div>'

    let styleID = styles[i]["style_id"];
    let styleName = styles[i]["name"];

    let backgroundImage = null;

    if(styles[i]["images"]) {
        backgroundImage = styles[i]["images"]["front"];
    }

    let css = ``;
    let noImage = ``;

    // if there is no image, just show a white background with text
    if(backgroundImage) {
      css = `background-image: url(${ backgroundImage })`
    } else {
      noImage = `<p class='no-image'>No Image</p>`
      css = `background-color: white;`
    }

    let styleHTML = `
      <div class='style' data-style-id='${ styleID }' style="${ css }">
        ${ styleColorContainer }
        ${ noImage }
        <div class='style-detail'>
          <p class='style-name'>${ styleName }</p>
        </div>
      </div>
    `
    stylesContainer.append(styleHTML);
  }

  $('.style').click(function(event){
    selectStyle($(event.target).parent())
  });
}

// toggles selection of styles
function selectStyle(target){
  let styleElement = $(target);

  // hide all current showing style colors
  $('.style-colors').removeClass('show');

  let styleColors = styleElement.find('.style-colors');
  styleColors.addClass('show'); // show style colors menu


  // remove earlier click event assignments to avoid multiple calls
  $('.style-color').off('click');

  // setup clicks for style colors
  styleElement.find('.style-color').on('click', (event) => {
    $('.style').removeClass('selected');  // reset selected styles
    styleElement.addClass('selected');    // set as selected
    styleColors.removeClass('show');      // hide style colors menu
    selectedStyleColor = $(event.target).data('color'); // set selected color
    selectedStyleID = styleElement.data('style-id'); // set selected style id

    // get images from API to update canvases
    fetchStyleImage(selectedStyleID, selectedStyleColor, changeCanvasImage);
  });
}

// updates image in canvases
function changeCanvasImage(images) {
  let frontURL = images["front"];
  let backURL = images["back"];
  changeImage(frontURL, backURL);
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

function setupAddons(addons) {
  let addonContainer = $('.addon-container');
  for(let i = 0; i < addons.length; i++) {
    let name = addons[i]["name"];
    let id = addons[i]["id"];
    let addon =
    `
      <tr class='addon'>
        <td>${ name }</td>
        <td>
        <input
          class='addon-input'
          data-addon-id=${ id }
          type='checkbox'
          name='addon-${ id }'>
        </td>
      </tr>
    `;
    addonContainer.append(addon);
  }
}
