import { kmeans } from 'clusterfck';
import createWebWorker from '@/modules/CreateWebWorker';
/**
 * const colors = [
 *  [20, 20, 80],
 *  [22, 22, 90],
 * ]
 */
const createArray = createWebWorker((imageArray) => {
  const colors = [];
  for (let i = 0; i < imageArray.data.length; i += 4) {
    colors.push([imageArray.data[i], imageArray.data[i + 1], imageArray.data[i + 2]]);
  }
  postMessage(colors);
});
const convertRGBAtoHex = (...rgba) => {
  const convertedToHex = rgba.map((v) => {
    const hex = v.toString(16);
    return hex.length < 2 ? `0${hex}` : hex;
  });
  return `#${convertedToHex.join('')}`;
};
const clusterColor = (arrayOfRGB, totalCluster) => new Promise((resolve, reject) => {
  createArray.postMessage(arrayOfRGB);
  createArray.onmessage = (res) => {
    const cluster = kmeans(res.data, totalCluster);
    const readyData = cluster.map((arrayOfCluster) => {
      const hexCode = convertRGBAtoHex(arrayOfCluster[0][0], arrayOfCluster[0][1], arrayOfCluster[0][2], 255);
      return {
        colorHex: hexCode,
        freq: arrayOfCluster.length,
      };
    });
    readyData.sort((a, b) => (a.freq > b.freq ? -1 : 1));
    resolve(readyData);
  };
  createArray.onerror = (error) => {
    reject(error);
  };
});
export default clusterColor;
