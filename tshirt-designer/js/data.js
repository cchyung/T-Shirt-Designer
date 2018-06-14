// Methods for accessing data through API calls

let tempStyles = [
  {
    "style": "T Shirt",
    "style_id": 4504,
  },
  {
    "style": "Tank Top",
    "style_id": 4404,
  },
  {
    "style": "Hoodie",
    "style_id": 1004,
  },
  {
    "style": "Polo Shirt",
    "style_id": 1032,
  },
]

let tempStyleColors = [
  {
    "color": "Carbon",
    "hex": "625D5D"
  },
  {
    "color": "Green",
    "hex": "00FF00"
  },
  {
    "color": "Blue",
    "hex": "0000FF"
  },
  {
    "color": "Red",
    "hex": "FF0000"
  },
  {
    "color": "Black",
    "hex": "000000"
  }
]

let tempAddons = [
  {
    "addon_id": 1,
    "name": "Sleeve Printing",
    "cost": 2.00
  },
  {
    "addon_id": 2,
    "name": "Addon 2",
    "cost": 1.50
  },
  {
    "addon_id": 3,
    "name": "Addon 3",
    "cost": 3.50
  },
  {
    "addon_id": 4,
    "name": "Addon 4",
    "cost": 4.50
  },
  {
    "addon_id": 5,
    "name": "Addon 5",
    "cost": .50
  },
  {
    "addon_id": 6,
    "name": "Addon 6",
    "cost": 1.00
  },
]

let frontImageUrl = 'temp-assets/temp-front.jpg';
let backImageUrl = 'temp-assets/temp-back.jpg';


function fetchStyles(callback) {
  callback(tempStyles)
}

function fetchStyleColors(styleID, callback) {
  callback(tempStyleColors)
}

function fetchAddons(callback){
  callback(tempAddons)
}

// function fetchImages(styleID, color, callback){
//   callback({
//     front: frontImageUrl,
//     back: backImageUrl
//   })
// }
