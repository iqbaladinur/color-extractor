<template>
  <div class="fixed p-5 z-30" :class="positionClass()">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Notifier',
  props: {
    position: {
      type: String,
      default: 'bl',
      required: false,
    },
  },
  methods: {
    positionClass() {
      let position = 'bottom-0 left-0';
      switch (this.position) {
        case 'br':
          position = 'bottom-0 right-0';
          break;
        case 'bl':
          position = 'bottom-0 left-0';
          break;
        case 'tl':
          position = 'top-0 left-0';
          break;
        case 'tr':
          position = 'top-0 right-0';
          break;
        default:
          break;
      }
      return position;
    },
  },
};
</script>
