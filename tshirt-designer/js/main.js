$(document).ready( function(){
  setupOptions();
});

// sets up options for quotes and t shirt designer
function setupOptions(){
  fetchStyles(setupStyles)
  setupQuantities()
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

    stylesContainer.append(
      `
        <div class='style' data-style-id='${ styles[i]["style_id"] }'>
          ${ styleColorContainer }
          <div class='style-detail'>
            <p class='style-name'>${ styles[i]["style"] }</p>
          </div>
        </div>
      `
    );
  }

  $('.style').click(function(event){
    selectStyle($(event.target).parent())
  });
}

// toggles selection of styles
function selectStyle(target){
  let styleElement = $(target);
  selectedStyleID = $(target).data('style-id'); // set selected style id

  let styleColors = styleElement.find('.style-colors');
  styleColors.addClass('show'); // show style colors menu

  // setup clicks for style colors
  styleElement.find('.style-color').on('click', (event) => {
    $('.style').removeClass('selected');  // reset selected styles
    styleElement.addClass('selected');    // set as selected
    styleColors.removeClass('show');      // hide style colors menu
    selectedStyleColor = $(event.target).data('color'); // set selected color
    // TODO: Fetch images for that style and color
  });
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
