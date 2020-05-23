<template>
  <div class="mb-10">
    <div v-if="getTopColors.length < 1" class="flex mb-4">
      <div class="w-1/5 bg-gray-500 lg:h-40 h-20"></div>
      <div class="w-1/5 bg-gray-400 lg:h-40 h-20"></div>
      <div class="w-1/5 bg-gray-300 lg:h-40 h-20"></div>
      <div class="w-1/5 bg-gray-200 lg:h-40 h-20"></div>
      <div class="w-1/5 bg-gray-100 lg:h-40 h-20"></div>
    </div>
    <div v-else class="flex mb-4">
      <div
        v-for="(colors, key) in getTopColors"
        :key="key"
        class="w-1/5 lg:h-40 h-20"
        :style="`background-color: ${colors.colorHex}`"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Colors',
  computed: {
    ...mapGetters(['getTopColors']),
  },
};
</script>
