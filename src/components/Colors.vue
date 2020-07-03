<template>
  <div class="mb-10">
    <div v-if="getTopColors.length < 1" class="flex mb-4">
      <div class="w-1/5 bg-gray-500 lg:h-40 h-20 m-2 rounded-lg shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="w-1/5 bg-gray-400 lg:h-40 h-20 m-2 rounded-lg shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="w-1/5 bg-gray-300 lg:h-40 h-20 m-2 rounded-lg shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="w-1/5 bg-gray-200 lg:h-40 h-20 m-2 rounded-lg shadow" :class="{ 'animate' : getExtractionStatus}"></div>
      <div class="w-1/5 bg-gray-100 lg:h-40 h-20 m-2 rounded-lg shadow" :class="{ 'animate' : getExtractionStatus}"></div>
    </div>
    <div v-else class="flex mb-4 flex-wrap">
      <div
        v-for="(colors, key) in getTopColors"
        :key="key"
        class="lg:w-1/5 w-full"
      >
        <div class="lg:h-40 h-20 flex m-2 rounded-lg shadow" :style="`background-color: ${colors.colorHex}`">
          <div class="m-auto p-2 rounded opacity-50 cursor-pointer relative" @click="copyToClipboard(colors.colorHex.toUpperCase())">
            <copied :text="contrastingText(colors.colorHex)" :bg="colors.colorHex" />
            <p class="text-center text-xs font-bold hover:font-black tippy" :class="contrastingText(colors.colorHex)">
              {{ colors.colorHex.toUpperCase() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import copied from '@/components/copy.vue';

export default {
  name: 'Colors',
  components: {
    copied,
  },
  computed: {
    ...mapGetters(['getTopColors', 'getExtractionStatus']),
  },
  methods: {
    copyToClipboard(text) {
      const Input = document.createElement('input');
      Input.setAttribute('type', 'text');
      Input.value = text;
      Input.style.position = 'absolute';
      Input.style.top = 0;
      Input.style.marginTop = '-100px';
      const app = document.getElementById('app');
      app.appendChild(Input);
      Input.select();
      Input.setSelectionRange(0, 99999);
      document.execCommand('copy');
      Input.remove();
    },
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
<style scoped>
.animate {
  animation : shimmer 2s infinite linear;
  background: linear-gradient(90deg, #eff1f3 4%, #e9e8e8 25%, #eff1f3 36%);
  background-size: 1000px 100%;
}
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>
