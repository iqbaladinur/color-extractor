<template>
  <div @click="copy" class="absolute h-full w-full top-0">
    <div
      class="animate-down h-full w-full absolute top-0 rounded-lg shadow"
      :class="show ? `flex` : `hidden`"
      :style="`background-color: ${bg.slice(0, 7)}`"
    >
      <p class="m-auto font-bold" :class="text" style="font-size: 0.5rem">
        Copied
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Copied',
  props: {
    bg: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    copy() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
.animate-down{
  transition: all 2s;
}
</style>
