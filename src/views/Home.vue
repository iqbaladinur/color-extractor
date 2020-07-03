<template>
  <div class="screen-off lg:py-20 py-10">
    <div class="flex lg:my-10">
      <div class="m-auto px-4 py-2">
        <span class="text-6xl color-grad logo">
          <b>Color</b> Bianco
        </span>
      </div>
    </div>
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
  min-height: calc(100vh - 145px);
}
</style>
