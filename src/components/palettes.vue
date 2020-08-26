<template>
  <transition name="bounce" mode="in-out" appear>
    <div class="flex justify-center my-6 bg-gray-100 p-2 rounded-xl">
      <Palette
        v-for="(color, key) in colorsHex"
        :key="key"
        :color="color"
      />
    </div>
  </transition>
</template>

<script>
import Palette from '@/components/palette.vue';

export default {
  name: 'Palettes',
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

<style scoped>
.bounce-enter{
  transform: scale(0);
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .4s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(0.2);
  }
  50% {
    transform: scale(0.5);
  }
  70% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
