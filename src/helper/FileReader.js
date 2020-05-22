const readPictureAsBase64 = (pictureSrc) => new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.onerror = (error) => {
    reject(error);
  };

  fileReader.onloadend = (res) => {
    resolve(res);
  };
  fileReader.readAsDataURL(pictureSrc);
});

export default readPictureAsBase64;
