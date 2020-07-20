import createWebWorker from '@/modules/CreateWebWorker';

const getTopImageData = createWebWorker((payload) => {
  const quantifyImageData = (arrayOfImage) => {
    const convertRGBAtoHex = (...rgba) => {
      const convertedToHex = rgba.map((v) => {
        const hex = v.toString(16);
        return hex.length < 2 ? `0${hex}` : hex;
      });
      return `#${convertedToHex.join('')}`;
    };
    // eslint-disable-next-line prefer-const
    let quantifiedColor = {};
    for (let index = 0; index < arrayOfImage.length; index += 4) {
      if (arrayOfImage[index + 3] === 255) {
        const hexColor = convertRGBAtoHex(arrayOfImage[index], arrayOfImage[index + 1], arrayOfImage[index + 2], arrayOfImage[index + 3]);
        if (quantifiedColor[hexColor]) {
          quantifiedColor[hexColor] += 1;
        } else {
          quantifiedColor[hexColor] = 1;
        }
      }
    }
    const unSortedArray = Object.entries(quantifiedColor).map((array) => ({ colorHex: array[0], freq: array[1] }));
    const sortColor = (a, b) => (a.freq > b.freq ? -1 : 1);
    return unSortedArray.sort(sortColor).slice(0, 5);
  };
  const result = quantifyImageData(payload.data);
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
