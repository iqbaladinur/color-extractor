<template>
  <div>
    <input type="text" class="rounded-full w-full py-2 px-4 m-auto bg-gray-100 focus:outline-none placeholder-gray-400 text-gray-700 mb-5" placeholder="Search with words here">
    <Palletes
      v-for="(palletes, key) in arrayOfColors"
      :key="key"
      :colorsHex="palletes"
    />
  </div>
</template>

<script>
import Palletes from '@/components/palletes.vue';

export default {
  name: 'ColorRecomendation',
  components: {
    Palletes,
  },
  data() {
    return {
      arrayOfColors: [
        ['#bffb32ff', '#8cdc52ff', '#5dc378ff', '#9de748ff', '#b7f738ff'],
      ],
    };
  },
};
</script>
