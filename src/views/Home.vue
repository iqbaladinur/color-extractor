<template>
  <div class="min-h-screen py-20">
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
