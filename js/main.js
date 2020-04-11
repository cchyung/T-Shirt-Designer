$(document).ready( function(){
  setupOptions();
});

// sets up options for quotes and t shirt designer
function setupOptions(){
  fetchStyles(setupStyles);
  setupQuantities();
  fetchAddons(setupAddons);
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

  // select first style and color initially
  initializeFirstStyle(styles[0]);
}

function initializeFirstStyle(style) {
  selectedStyleID = style['style_id'];
  selectedStyleColor = style['colors'][0]['slug'];
  $('.style').first().addClass('selected');
  fetchStyleImage(selectedStyleID, selectedStyleColor, changeCanvasImage);
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
  totalQuantity = 0; // reset total quantity
  let inputs = $('.quantity-input');

  inputs.each(function() {
      $(this).val(0);
  });

  inputs.change(function() {
    totalQuantity = 0; // reset total quantity here too
    inputs.each(function(){
      totalQuantity += Number($(this).val());
    });

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

function verifyForm() {
    // check for quantity > 0, style selected, color selected
    let errorMessages = [];
    let errorContainer = $('.form-errors');
    errorContainer.empty();

    if(totalQuantity < 1) {
        errorMessages.push('Quantity must be greater than 0.')
    }

    // display error messages, if empty will display nothing
    for(let i = 0; i < errorMessages.length; i++) {
        errorContainer.append(`<p class="form-error-msg">${ errorMessages[i] }</p>`)
    }
    return errorMessages.length === 0;
}

function showDesignToolModal() {
    let modal = $('.final-modal');
    let modalBackground = $('.modal-background');
    modal.addClass('show');
    modalBackground.addClass('show');
}

function closeDesignToolModal() {
    let modal = $('.final-modal');
    let modalBackground = $('.modal-background');
    modal.removeClass('show');
    modalBackground.removeClass('show');

    $('.email-input').show(500);
    $('.price-display').hide(500);
    $('.error-display').hide(500);
}

function submitForm() {
    // verify correctness of form
    if(verifyForm()) {
        // show email modal
        showDesignToolModal();
    }
}

function submitEmail() {
    let emailInput = $('#email');
    let email = emailInput.val();
    let nameInput = $('#name');
    let name = nameInput.val();
    let errorContainer = $('.email-input-errors');

    // clear error container
    errorContainer.empty();

    if(email && name) {
        retrieveQuote(email, name);
    } else {
        errorContainer.append(`<p class="form-error-msg">Email and or name must not be empty.</p>`);
    }
}

function retrieveQuote(email, name) {
    // hide email, show spinner
    hideEmailShowSpinner();

    // collect necessary data
    let style = selectedStyleID;

    // create quantities string
    let quantityInputs = $('.quantity-input');
    let quantityString = '';

    quantityInputs.each(function (idx) {
        quantityString += `${ Number($(this).val()) }`;

        if ( idx !== quantityInputs.length-1 ) {
            quantityString += ',';
        }
    });

    // create addon string
    let addonInputs = $('.addon-input');
    let addonString = '';

    addonInputs.each(function(idx) {
        let element = $(this);
        if( element.is(':checked') ) { // if checked add to addon string
            addonString += `${ element.data('addon-id') }`;
            addonString += ',';
        }
    });

    // chop off last comma
    addonString = addonString.substring(0, addonString.length - 1);

    let inks = $('#ink-color-number-select').val();
    let comments = $('#additional-comments-text').text();


    // get images from canvas
    let images = exportImages();

    // make a request to the price endpoint
    getQuote(style, quantityString, inks, addonString, comments, email, name, images, showQuote, showError);
}

function showQuote(data) {
    // called by callback of getPrice
    let price = data["price"];

    // hide spinner
    hideSpinnerShowPrice(price);
}

function showError() {
    hideSpinnerShowError();
}

function hideEmailShowSpinner() {
    $('.email-input').fadeOut(100, function() {
        $('.spinner').fadeIn(100);
    });
}

function hideSpinnerShowPrice(price) {
    $('.spinner').fadeOut(100, function() {
        $('.final-cost').html(`$${price}`);
        $('.total-quantity').html(totalQuantity);
        $('.price-display').fadeIn(100);
    })
}

function hideSpinnerShowError() {
    $('.spinner').fadeOut(100, function() {
        $('.error-display').fadeIn(100);
    })
}

function startOver() {
    // hide modals
    closeDesignToolModal();
}
