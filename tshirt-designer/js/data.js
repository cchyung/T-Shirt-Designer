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

let tempInkColors = [
  {
      "color": "White",
      "hex": "FFFFFF"
  },
  {
      "color": "Ice Grey",
      "hex": "d1d9d2"
  },
  {
      "color": "Light Grey",
      "hex": "d3d3d3"
  },
  {
      "color": "Black",
      "hex": "000000"
  },
  {
      "color": "Slate",
      "hex": "778899"
  },
  {
      "color": "Navy",
      "hex": "000080"
  },
  {
      "color": "Dark Cyan",
      "hex": "008B8B"
  },
  {
      "color": "Cyan",
      "hex": "00FFFF"
  }
]

let frontImageUrl = 'temp-assets/temp-front.jpg';
let backImageUrl = 'temp-assets/temp-back.jpg';


function fetchStyles(callback) {
  callback(tempStyles)
}

function fetchStyleColors(styleID, callback) {
  callback(tempStyleColors)
}

function fetchInkColors(callback){
  callback(tempInkColors)
}

// function fetchImages(styleID, color, callback){
//   callback({
//     front: frontImageUrl,
//     back: backImageUrl
//   })
// }
