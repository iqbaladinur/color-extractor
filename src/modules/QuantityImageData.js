/* eslint-disable no-unused-vars */
import createWebWorker from '@/modules/CreateWebWorker';

const getTopImageData = createWebWorker((payload) => {
  const quantifyImageData = (arrayOfImage, merged = false, quantity = 10) => {
    const convertRGBAtoHex = (...rgba) => {
      const convertedToHex = rgba.map((v) => {
        const hex = v.toString(16);
        return hex.length < 2 ? `0${hex}` : hex;
      });
      return `#${convertedToHex.join('')}`;
    };
    const countAveragePerMergedPixel = (pixelDivider, arrayOfImageData) => {
      const totalPixel = pixelDivider / 4;
      let r = 0;
      let g = 0;
      let b = 0;
      let a = 0;
      for (let index = 0; index < arrayOfImageData.length; index += 4) {
        r += arrayOfImageData[index];
        g += arrayOfImageData[index + 1];
        b += arrayOfImageData[index + 2];
        a += arrayOfImageData[index + 3];
      }
      return {
        r: Math.round(r / totalPixel),
        g: Math.round(g / totalPixel),
        b: Math.round(b / totalPixel),
        a: Math.round(a / totalPixel),
      };
    };
    let pixelDivider = 4;
    if (merged) {
      if (arrayOfImage.length % 8 === 0) {
        pixelDivider *= 8;
      } else if (arrayOfImage.length % 6 === 0) {
        pixelDivider *= 6;
      } else if (arrayOfImage.length % 3) {
        pixelDivider *= 3;
      }
    }
    // eslint-disable-next-line prefer-const
    let quantifiedColor = {};
    for (let index = 0; index < arrayOfImage.length; index += pixelDivider) {
      const {
        r, g, b, a,
      } = countAveragePerMergedPixel(pixelDivider, arrayOfImage.slice(index, index + pixelDivider));
      if (arrayOfImage[index + 3] === 255) {
        const hexColor = convertRGBAtoHex(r, g, b, a);
        if (quantifiedColor[hexColor]) {
          quantifiedColor[hexColor] += 1;
        } else {
          quantifiedColor[hexColor] = 1;
        }
      }
    }
    const unSortedArray = Object.entries(quantifiedColor).map((array) => ({ colorHex: array[0], freq: array[1] }));
    const sortColor = (a, b) => (a.freq > b.freq ? -1 : 1);
    return unSortedArray.sort(sortColor).slice(0, quantity);
  };
  const result = quantifyImageData(payload.data.imgArray, payload.data.merge, payload.data.quantity);
  postMessage(result);
});

const quantifyColor = (payload) => new Promise((resolve, reject) => {
  getTopImageData.postMessage(payload);
  getTopImageData.onmessage = (res) => {
    resolve(res);
  };
  getTopImageData.onerror = (error) => {
    reject(error);
  };
});

export default quantifyColor;
