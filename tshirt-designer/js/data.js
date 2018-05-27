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
      "hex": "000000"
  },
  {
      "color": "Ice Grey",
      "hex": "000000"
  },
  {
      "color": "Light Grey",
      "hex": "000000"
  },
  {
      "color": "Black",
      "hex": "000000"
  },
  {
      "color": "Slate",
      "hex": "000000"
  },
  {
      "color": "Navy",
      "hex": "000000"
  },
  {
      "color": "Dark Cyan",
      "hex": "000000"
  },
  {
      "color": "Cyan",
      "hex": "000000"
  }
]


function fetchStyles(callback) {
  callback(tempStyles)
}

function fetchStyleColors(styleID, callback) {
  callback(tempStyleColors)
}

function fetchInkColors(callback){
  callback(tempInkColors)
}
