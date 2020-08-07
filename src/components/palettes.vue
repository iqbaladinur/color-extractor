<template>
  <div class="flex justify-center my-6 bg-gray-100 p-2 rounded-xl">
    <Palette
      v-for="(color, key) in colorsHex"
      :key="key"
      :color="color"
    />
  </div>
</template>

<script>
import Palette from '@/components/palette.vue';

export default {
  name: 'Paletes',
  components: {
    Palette,
  },
  props: {
    colorsHex: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style>

</style>
