<template>
  <div>
    <div class="flex mb-10">
      <input type="text" class="lg:w-1/2 w-full py-2 px-4 m-auto rounded" placeholder="Paste image url here." v-model="url">
    </div>
    <div class="flex flex-wrap">
      <div class="lg:w-1/6 w-full ml-auto">
        <label for="inputPicture" class="block bg-gray-900 hover:bg-gray-900 text-white py-2 px-4 rounded cursor-pointer w-full text-center">
          Select Image
        </label>
        <input class="hidden" id="inputPicture" type="file" ref="imgSrc" @change="readImage()">
      </div>
      <div class="lg:w-1/6 w-full mt-4 lg:mt-0 lg:pl-2 mr-auto">
          <button class="bg-gray-900 text-white py-2 px-4 rounded w-full" @click="getDataImage" :disabled="pictureAvaibility" :class="{ 'opacity-50 cursor-not-allowed' : pictureAvaibility }">
            {{
              extracting ? 'Extracting...' : 'Extract Color'
            }}
          </button>
      </div>
    </div>
    <div class="mt-5">
    </div>
    <div class="my-10">
      <hr class="mb-5">
      <div class="flex mb-4 flex-wrap">
        <div class="lg:w-1/2 w-full flex">
          <img :src="image" ref="display" width="50%" class="m-auto" crossorigin="Anonymous">
        </div>
        <div class="lg:w-1/2 w-full">
          <p class="text-white py-2 lg:py-0 lg:pl-5">
            <b>Color Bianco</b> doesn't use server side as processing. Instead, it's use your machine to quantify 5 dominant color based on your selected image. It may be not optimized for photo, closed range color and very large resolution image.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import readPictureAsBase64 from '@/helper/FileReader';
import quantifyColor from '@/modules/QuantityImageData';

export default {
  name: 'PictureLoader',
  computed: {
    pictureAvaibility() {
      return this.image == null;
    },
  },
  data() {
    return {
      image: null,
      imageObject: new Image(),
      canvas: document.createElement('canvas'),
      extracting: false,
      url: '',
      imageLoaded: false,
    };
  },
  mounted() {
    this.imageObject.crossOrigin = 'Anonymous';
  },
  watch: {
    url(newValue) {
      this.image = newValue;
      this.imageObject.src = newValue;
    },
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
      if (this.image) {
        this.extracting = true;
        this.$store.dispatch('setTopColors', []);
        this.drawImage();
        const imgData = this.canvas.getContext('2d').getImageData(0, 0, this.imageObject.width, this.imageObject.height);
        this.$store.dispatch('toggleExtraction');
        quantifyColor(imgData.data)
          .then((res) => {
            this.extracting = false;
            this.$store.dispatch('toggleExtraction');
            this.$store.dispatch('setTopColors', res.data);
          })
          .catch((error) => {
            this.extracting = false;
            this.$store.dispatch('toggleExtraction');
            console.log(error);
          });
      }
    },
    drawImage() {
      this.imageObject.crossOrigin = 'Anonymous';
      this.canvas.getContext('2d').width = this.imageObject.width;
      this.canvas.getContext('2d').height = this.imageObject.height;
      this.canvas.width = this.imageObject.width;
      this.canvas.height = this.imageObject.height;
      this.canvas.getContext('2d').drawImage(this.$refs.display, 0, 0);
    },
  },
};
</script>
