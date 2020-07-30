<template>
  <div class="screen-off lg:py-16 lg:relative fixed w-full left-0 px-3">
    <div class="flex flex-wrap">
      <div class="bg-white rounded-lg bg-opacity-25 w-full lg:mb-10 mb-2 relative lg:h-custom2 h-custom p-10">
        <ImgDisplay />
      </div>
      <div class="bg-white rounded-lg bg-opacity-25 w-full">
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
  min-height: calc(100vh - 84px);
}
.border-custom{
  @apply border-2;
  @apply border-gray-300;
  @apply rounded;
}
</style>
