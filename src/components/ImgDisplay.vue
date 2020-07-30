<template>
  <img :src="getImgSource" ref="display" :class="getFetchingImgStatus ? 'animate' : '' " class="w-auto h-full m-auto" crossorigin="Anonymous">
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
