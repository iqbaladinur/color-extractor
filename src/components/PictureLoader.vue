<template>
  <div class="mt-10">
    <div class="flex px-4 py-2">
      <input type="text" class="w-full py-2 px-4 m-auto rounded bg-gray-300 focus:bg-white placeholder-gray-700 text-gray-700" placeholder="Paste image url here." v-model="url">
    </div>
    <div class="flex px-4 py-2">
      <input type="number" class="w-full py-2 px-4 m-auto rounded bg-gray-300 focus:bg-white placeholder-gray-700 text-gray-700" placeholder="Number of top colors" v-model="quantity">
    </div>
    <div class="flex flex-wrap lg:relative fixed w-full left-0 bottom-0 lg:p-0 px-3 py-4">
      <div class="w-full px-4 py-2">
        <input id="mergedOption" type="checkbox" v-model="mergedOption" class="h-3 w-3">
        <label class="pl-2 text-sm" for="mergedOption" title="Merged some pixel and use the avg value">Merge Pixel</label>
      </div>
      <div class="w-full px-4 py-2">
        <label for="inputPicture" class="block bg-purple-900 text-white lg:py-2 px-4 py-4 lg:rounded cursor-pointer w-full px-4 py-2 text-center rounded-tl-full rounded-bl-full shadow">
          Select Image
        </label>
        <input class="hidden" id="inputPicture" type="file" ref="imgSrc" @change="readImage()">
      </div>
      <div class="w-full px-4 py-2">
          <button class="bg-gray-900 text-white lg:py-2 px-4 py-4 lg:rounded w-full rounded-tr-full rounded-br-full shadow" @click="getDataImage" :disabled="pictureAvaibility" :class="{ 'opacity-50 cursor-not-allowed' : pictureAvaibility }">
            {{
              extracting ? 'Extracting...' : 'Extract Color'
            }}
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import readPictureAsBase64 from '@/helper/FileReader';
import quantifyColor from '@/modules/QuantityImageData';


export default {
  name: 'PictureLoader',
  data() {
    return {
      quantity: 10,
      mergedOption: false,
      imageObject: new Image(),
      canvas: document.createElement('canvas'),
      extracting: false,
      url: '',
      imageLoaded: false,
      pictureAvaibility: true,
      isFetchingImage: false,
    };
  },
  mounted() {
    this.imageObject.crossOrigin = 'Anonymous';
    this.canvas.style.imageRendering = 'pixelated';
  },
  watch: {
    url(newValue) {
      this.readImage(newValue);
    },
    mergedOption() {
      if (this.$store.getters.getImgSource) {
        this.pictureAvaibility = false;
      }
    },
    quantity() {
      if (this.$store.getters.getImgSource) {
        this.pictureAvaibility = false;
      }
    },
  },
  methods: {
    readImage(url = null) {
      if (url) {
        this.$store.dispatch('toggleIsFetchingImg');
        this.$store.dispatch('setImageSource', null);
        fetch(`https://yacdn.org/serve/${url}`)
          .then((result) => result.blob())
          .then((image) => {
            readPictureAsBase64(image)
              .then((res) => {
                const base64Image = res.target.result;
                this.$store.dispatch('setImageSource', base64Image);
                this.imageObject.src = base64Image;
                this.pictureAvaibility = false;
                this.$store.dispatch('toggleIsFetchingImg');
              })
              .catch((error) => {
                this.$store.dispatch('toggleIsFetchingImg');
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const file = this.$refs.imgSrc;
        readPictureAsBase64(file.files[0])
          .then((res) => {
            const base64Image = res.target.result;
            this.$store.dispatch('setImageSource', base64Image);
            this.imageObject.src = base64Image;
            this.pictureAvaibility = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getDataImage() {
      if (this.$store.getters.getImgSource) {
        this.extracting = true;
        this.$store.dispatch('setTopColors', []);
        this.drawImage();
        const imgData = this.canvas.getContext('2d').getImageData(0, 0, this.imageObject.width, this.imageObject.height);
        this.$store.dispatch('toggleExtraction');
        quantifyColor({ imgArray: imgData.data, merge: this.mergedOption, quantity: this.quantity })
          .then((res) => {
            this.extracting = false;
            this.$store.dispatch('toggleExtraction');
            this.$store.dispatch('setTopColors', res.data);
            this.pictureAvaibility = true;
          })
          .catch((error) => {
            this.extracting = false;
            this.$store.dispatch('toggleExtraction');
            console.log(error);
            this.pictureAvaibility = true;
          });
      }
    },
    drawImage() {
      let scaleDown = 1;
      this.imageObject.crossOrigin = 'Anonymous';
      this.canvas.getContext('2d').width = this.imageObject.width;
      this.canvas.getContext('2d').height = this.imageObject.height;
      if (this.imageObject.width > 500 || this.imageObject.height > 500) {
        scaleDown = 0.1;
      }
      this.canvas.width = this.imageObject.width * scaleDown;
      this.canvas.height = this.imageObject.height * scaleDown;
      this.canvas.getContext('2d').drawImage(this.$store.getters.getImgDomObject, 0, 0, this.canvas.width, this.canvas.height);
    },
  },
};
</script>
