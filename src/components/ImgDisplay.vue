<template>
  <div class="w-auto lg:h-full m-auto">
    <img
      v-show="getImgSource"
      :src="getImgSource" ref="display" :class="{ 'animate' : getFetchingImgStatus }" class="w-auto lg:h-full m-auto rounded-lg" crossorigin="Anonymous"
    >
    <div
      v-show="!getImgSource"
      class="w-100 lg:w-1/2 m-auto lg:h-full h-48 animate rounded-lg flex"
    >
      <p class="m-auto">
        Fetching...
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ImgDIsplay',
  computed: {
    ...mapGetters(['getImgSource', 'getFetchingImgStatus']),
  },
  mounted() {
    this.$store.dispatch('setImgDomObject', this.$refs.display);
  },
};
</script>
