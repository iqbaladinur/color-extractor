<template>
  <div class="flex justify-center my-6 bg-gray-100 p-1 rounded-xl">
    <Pallete
      v-for="(color, key) in colorsHex"
      :key="key"
      :color="color"
    />
  </div>
</template>

<script>
import Pallete from '@/components/palete.vue';

export default {
  name: 'Paletes',
  components: {
    Pallete,
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
