const ROOT_URL = 'https://ecocentric-tshirt-designer.herokuapp.com/api/';
// const ROOT_URL = 'http://localhost:8000/api/';


function fetchStyles(callback) {
  // jQuery.get(ROOT_URL + 'styles', function(data) {
  //   callback(data);
  // })

    jQuery.ajax({
        url: ROOT_URL + 'styles',
        type: 'get',
        success: function(data) {
            callback(data);
        }
    })
}

function fetchStyleImage(styleID, color_slug, callback) {
  jQuery.get(
    ROOT_URL + 'styles/' + styleID + '/images/' + color_slug,
    function(data) {
      callback(data)
    }
  );
}

function fetchAddons(callback){
  jQuery.get(
    ROOT_URL + 'addons/', function(data){
      callback(data)
    }
  )
}

// TODO: Update command to upload images
function getQuote(style, quantities, inks, addons, comments, email, images, callback, error) {
    let url = `${ROOT_URL}calculate-price?style=${style}&quantities=${quantities}&inks=${inks}&addons=${addons}&comments=${comments}&email=${email}`;

    let data = new FormData();
    data.append('front', images['front']);
    data.append('back', images['back']);

    jQuery.ajax({
        url: url,
        type: 'post',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: data,
        crossDomain: true,
        success: function (data) {
            callback(data);
        },
        error: error
    });
}
