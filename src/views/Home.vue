<template>
  <div class="screen-off lg:py-16 lg:relative w-full px-3 lg:mb-0 mb-10">
    <p class="text-left font-bold text-gray-600 py-4">
      Display Here
    </p>
    <div class="flex flex-wrap">
      <div class="bg-gray-500 bg-opacity-25 rounded-lg shadow w-full lg:mb-10 mb-2 relative lg:h-custom2 h-auto lg:p-10 p-2">
        <ImgDisplay />
      </div>
      <div class="bg-gray-500 bg-opacity-25 rounded-lg shadow w-full">
        <Colors class="w-full p-4" />
      </div>
    </div>
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
  min-height: calc(100vh - 164px);
}
.border-custom{
  @apply border-2;
  @apply border-gray-300;
  @apply rounded;
}
</style>
