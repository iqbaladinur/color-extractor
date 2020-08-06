<template>
  <div class="w-12 h-12 rounded-lg m-2 flex cursor-pointer" :style="`background: ${color}; box-shadow: 0 10px 15px -3px ${color.slice(0, 7)}b4, 0 4px 6px -2px ${color.slice(0, 7)}b4;`" @click="copy()">
    <span v-if="copied" class="text-xs m-auto">✔️</span>
  </div>
</template>

<script>
import { copyToClipboard } from '@/helper/CommonHelper';

export default {
  name: 'Palete',
  props: {
    color: {
      type: String,
      required: true,
      default: '#ffffffff',
    },
  },
  data() {
    return {
      copied: false,
    };
  },
  methods: {
    copy() {
      copyToClipboard(this.color);
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 500);
    },
  },
};
</script>

<style>

</style>
