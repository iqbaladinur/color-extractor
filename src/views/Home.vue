<template>
  <div class="screen-off lg:py-20 py-10">
    <colors />
    <pic-loader />
  </div>
</template>

<script>
import PicLoader from '@/components/PictureLoader.vue';
import Colors from '@/components/Colors.vue';

export default {
  name: 'Home',
  components: {
    PicLoader,
    Colors,
  },
};
</script>

<style scoped>
.screen-off{
  min-height: calc(100vh - 177px);
}
</style>
