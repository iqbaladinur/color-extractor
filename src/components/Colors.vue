<template>
  <div class="">
    <div v-if="getTopColors.length < 1" class="flex flex-wrap justify-center">
      <div class="lg:w-16 w-10 bg-gray-600 lg:h-16 h-10 m-2 rounded-full shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="lg:w-16 w-10 bg-gray-400 lg:h-16 h-10 m-2 rounded-full shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="lg:w-16 w-10 bg-gray-500 lg:h-16 h-10 m-2 rounded-full shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="lg:w-16 w-10 bg-gray-300 lg:h-16 h-10 m-2 rounded-full shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="lg:w-16 w-10 bg-gray-200 lg:h-16 h-10 m-2 rounded-full shadow" :class="{ 'animate' : getExtractionStatus}"></div>
    </div>
    <div v-else class="flex flex-wrap justify-center">
      <div
        v-for="(colors, key) in getTopColors"
        :key="key"
        class="lg:w-16 w-10 lg:h-16 h-10 flex m-2 rounded-full shadow relative"
        :style="`background-color: ${colors.colorHex};`"
        @click="copyToClipboard(colors.colorHex)"
      >
        <copied :text="contrastingText(colors.colorHex)" :bg="colors.colorHex" class="cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import copied from '@/components/copy.vue';
import { copyToClipboard } from '@/helper/CommonHelper';

export default {
  name: 'Colors',
  components: {
    copied,
  },
  computed: {
    ...mapGetters(['getTopColors', 'getExtractionStatus']),
  },
  methods: {
    copyToClipboard,
    contrastingText(colorHex) {
      let r = 0;
      let g = 0;
      let b = 0;
      if (colorHex.length === 5) {
        r = Number(`0x${colorHex[1]}${colorHex[1]}`);
        g = Number(`0x${colorHex[2]}${colorHex[2]}`);
        b = Number(`0x${colorHex[3]}${colorHex[3]}`);
      } else if (colorHex.length === 9) {
        r = Number(`0x${colorHex[1]}${colorHex[2]}`);
        g = Number(`0x${colorHex[3]}${colorHex[4]}`);
        b = Number(`0x${colorHex[5]}${colorHex[6]}`);
      }
      const average = (r + g + b) / 3;
      return average > 128 ? 'text-black' : 'text-white';
    },
  },
};
</script>
