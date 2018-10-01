const ROOT_URL = 'https://ecocentric-tshirt-designer.herokuapp.com/api/'
// const ROOT_URL = 'http://localhost:8000/api/'


function fetchStyles(callback) {
  jQuery.get(ROOT_URL + 'styles', function(data) {
    callback(data);
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

function getQuote(style, quantities, inks, addons, comments, email, callback) {
  let url = `${ROOT_URL}calculate-price?style=${style}&quantities=${quantities}&inks=${inks}&addons=${addons}&comments=${comments}&email=${email}`;
  jQuery.get(url, function(data) {
    callback(data);
  })
}
