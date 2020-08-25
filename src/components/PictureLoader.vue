<template>
  <div class="mt-10 lg:block lg:p-0 p-8 lg:relative fixed z-10 w-full bottom-0 visible bg-white lg:bg-transparent" :class="mobileViewExpanded ? 'h-auto':'h-0'">
    <button class="h-5 w-5 absolute top-0 right-0 m-2 text-gray-600 focus:outline-none lg:hidden" @click="mobileViewExpanded = !mobileViewExpanded">
      {{ mobileViewExpanded ? '&#9660;' : '&#9650;' }}
    </button>
    <div class="flex lg:px-4 py-2">
      <input type="text" class="rounded-full w-full py-2 px-4 m-auto bg-gray-300 focus:outline-none focus:bg-white placeholder-gray-700 text-gray-700" placeholder="Paste image url here." v-model="url">
    </div>
    <div class="flex lg:px-4 py-2">
      <input type="number" class="rounded-full w-full py-2 px-4 m-auto bg-gray-300 focus:bg-white focus:outline-none placeholder-gray-700 text-gray-700" placeholder="Number of top colors" v-model="quantity">
    </div>
    <div class="flex flex-wrap lg:relative w-full lg:p-0">
      <div class="w-full lg:px-4 py-2">
        <input id="mergedOption" type="checkbox" v-model="mergedOption" class="h-3 w-3">
        <label class="pl-2 text-sm" for="mergedOption" title="Merged some pixel and use the avg value">Merge Pixel</label>
      </div>
      <div class="w-full lg:px-4 py-2">
        <label for="inputPicture" class="rounded-lg block bg-indigo-400 text-white px-4 py-2 cursor-pointer w-full text-center">
          Select Image
        </label>
        <input class="hidden" id="inputPicture" type="file" ref="imgSrc" @change="readImage()">
      </div>
      <div class="w-full lg:px-4 py-2">
          <button class="rounded-lg bg-gray-900 text-white px-4 py-2 w-full" @click="getDataImage" :disabled="pictureAvaibility" :class="{ 'opacity-50 cursor-not-allowed' : pictureAvaibility }">
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
      mobileViewExpanded: true,
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
        fetch(`${url}`)
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
        const imgData = this.canvas.getContext('2d').getImageData(0, 0, this.canvas.width, this.canvas.height);
        this.$store.dispatch('toggleExtraction');
        this.mobileViewExpanded = false;
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
      if (this.imageObject.width >= 3000 || this.imageObject.height >= 3000) {
        scaleDown = 0.05;
      } else if (this.imageObject.width > 500 || this.imageObject.height > 500) {
        scaleDown = 0.1;
      }
      this.canvas.width = this.imageObject.width * scaleDown;
      this.canvas.height = this.imageObject.height * scaleDown;
      this.canvas.getContext('2d').drawImage(this.$store.getters.getImgDomObject, 0, 0, this.canvas.width, this.canvas.height);
    },
  },
};
</script>
