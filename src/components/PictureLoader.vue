<template>
  <div>
    <div class="lg:w-1/2 w-full border-dashed border-2 border-white mx-auto mb-10 rounded relative" style="height: 400px">
      <img :src="image" ref="display" :class="isFetchingImage ? 'animate' : '' " class="w-full h-full object-cover m-auto" crossorigin="Anonymous">
      <Colors class="absolute bottom-0 w-full py-4 bg-white bg-opacity-50" />
    </div>
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
  </div>
</template>

<script>
import Colors from '@/components/Colors.vue';
import readPictureAsBase64 from '@/helper/FileReader';
import quantifyColor from '@/modules/QuantityImageData';


export default {
  name: 'PictureLoader',
  components: {
    Colors,
  },
  data() {
    return {
      image: null,
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
  },
  watch: {
    url(newValue) {
      this.readImage(newValue);
    },
  },
  methods: {
    readImage(url = null) {
      if (url) {
        this.isFetchingImage = true;
        this.image = null;
        fetch(`https://yacdn.org/serve/${url}`)
          .then((result) => result.blob())
          .then((image) => {
            readPictureAsBase64(image)
              .then((res) => {
                const base64Image = res.target.result;
                this.image = base64Image;
                this.imageObject.src = base64Image;
                this.pictureAvaibility = false;
                this.isFetchingImage = false;
              })
              .catch((error) => {
                this.isFetchingImage = false;
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
            this.image = base64Image;
            this.imageObject.src = base64Image;
            this.pictureAvaibility = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
        scaleDown = 0.25;
      }
      this.canvas.width = this.imageObject.width * scaleDown;
      this.canvas.height = this.imageObject.height * scaleDown;
      this.canvas.getContext('2d').drawImage(this.$refs.display, 0, 0, this.canvas.width, this.canvas.height);
    },
  },
};
</script>
