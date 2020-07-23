<template>
  <div class="screen-off lg:py-20 py-10">
    <pic-loader />
  </div>
</template>

<script>
import PicLoader from '@/components/PictureLoader.vue';

export default {
  name: 'Home',
  components: {
    PicLoader,
  },
};
</script>

<style scoped>
.screen-off{
  min-height: calc(100vh - 145px);
}
</style>
