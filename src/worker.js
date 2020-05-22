/* eslint-disable */ 
const blob = new Blob(["onmessage = (payload) => {"
  + "console.log('payload');"
  + "const quantifyImageData = (arrayOfImage) => {"
  + "const convertRGBAtoHex = (...rgba) => {"
    + "const convertedToHex = rgba.map((v) => {"
      + "const hex = v.toString(16);"
      +  "return hex.length < 2 ? `0${hex}` : hex;"
      + "});"
      + "return `#${convertedToHex.join('')}`;"
    + "};"
    + "let quantifiedColor = {};"
    + "for (let index = 0; index < arrayOfImage.length; index += 4) {"
      + "const hexColor = convertRGBAtoHex(arrayOfImage[index], arrayOfImage[index + 1], arrayOfImage[index + 2], arrayOfImage[index + 3]);"
      + "if (quantifiedColor[hexColor]) {"
        + "quantifiedColor[hexColor] += 1;"
      + "} else {"
        + "quantifiedColor[hexColor] = 1;"
      + "}"
    + "}"
    + "const unSortedArray = Object.entries(quantifiedColor).map((array) => ({ colorHex: array[0], freq: array[1] }));"
    + "const sortColor = (a, b) => (a.freq > b.freq ? -1 : 1);"
    + "return unSortedArray.sort(sortColor).slice(0, 5);"
  + "};"
  + "const result = quantifyImageData(payload.data);"
  + "console.log('done');"
  + "postMessage(result);"
+ "};",
]);

const blobURL = window.URL.createObjectURL(blob);

export default blobURL;
