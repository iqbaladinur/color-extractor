<template>
  <div class="flex justify-center my-6 bg-gray-100 p-2 rounded-xl">
    <Pallete
      v-for="(color, key) in colorsHex"
      :key="key"
      :color="color"
    />
  </div>
</template>

<script>
import Pallete from '@/components/pallete.vue';

export default {
  name: 'Palletes',
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
