<template>
  <div>
    <img :src="image" ref="display">
    <input type="file" ref="imgSrc" @change="readImage()">
    <button @click="getDataImage" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      generate
    </button>
  </div>
</template>

<script>
import readPictureAsBase64 from '@/helper/FileReader';
import quantifyColor from '@/modules/QuantityImageData';

export default {
  name: 'PictureLoader',
  data() {
    return {
      image: null,
      imageObject: new Image(),
      canvas: document.createElement('canvas'),
    };
  },
  methods: {
    readImage() {
      const file = this.$refs.imgSrc;
      readPictureAsBase64(file.files[0])
        .then((res) => {
          const base64Image = res.target.result;
          this.image = base64Image;
          this.imageObject.src = base64Image;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDataImage() {
      this.drawImage();
      const imgData = this.canvas.getContext('2d').getImageData(0, 0, this.imageObject.width, this.imageObject.height);
      quantifyColor(imgData.data)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    drawImage() {
      this.canvas.getContext('2d').width = this.imageObject.width;
      this.canvas.getContext('2d').height = this.imageObject.height;
      this.canvas.width = this.imageObject.width;
      this.canvas.height = this.imageObject.height;
      this.canvas.getContext('2d').drawImage(this.$refs.display, 0, 0);
    },
  },
};
</script>
