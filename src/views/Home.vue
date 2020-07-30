<template>
  <div class="screen-off lg:py-16 lg:relative fixed w-full left-0 px-3">
    <div class="w-1/2 border-2 border-white lg:mb-10 mb-2 rounded relative lg:h-custom2 h-custom">
      <ImgDisplay />
    </div>
    <Colors class="w-full py-4" />
  </div>
</template>

<script>
import Colors from '@/components/Colors.vue';
import ImgDisplay from '@/components/ImgDisplay.vue';

export default {
  name: 'Home',
  components: {
    Colors,
    ImgDisplay,
  },
};
</script>

<style scoped>
.screen-off{
  min-height: calc(100vh - 84px);
}
</style>
