<template>
  <div>
    <input
      class="rounded-full w-full py-2 px-4 m-auto bg-gray-100 focus:outline-none placeholder-gray-400 text-gray-700 mb-5"
      v-model="keyword"
      type="text"
      placeholder="Search a word here, ex: love"
      @keyup="searchData()"
    >
    <div v-if="arrayOfColors.length > 0">
      <Palettes
        v-for="(palettes, key) in arrayOfColors"
        :key="key"
        :colorsHex="palettes"
      />
    </div>
    <div v-else>
      <div v-if="isFetching" class="text-xs p-1 text-center">
        Looking palettes for <b>{{ keyword }}</b> ...
      </div>
      <div v-else-if="keyword">
        <p class="text-xs text-center p-1">
          We are sorry, currently no data for <b>{{ keyword }}</b>, but you can add it if you want.
        </p>
        <div class="text-center mt-2">
          <a href="https://github.com/iqbaladinur/color-extractor/tree/master/colors_data" class="text-xs px-2 py-2 bg-indigo-400 text-white rounded-lg">
            Contribute Palettes
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Palettes from '@/components/palettes.vue';
import { debounce } from '@/helper/CommonHelper';

export default {
  name: 'ColorRecomendation',
  components: {
    Palettes,
  },
  data() {
    return {
      keyword: null,
      arrayOfColors: [
        ['#bffb32ff', '#b7f738ff', '#9de748ff', '#8cdc52ff', '#5dc378ff'],
      ],
      isFetching: false,
    };
  },
  methods: {
    // eslint-disable-next-line func-names
    searchData: debounce(function () {
      if (this.keyword) {
        const url = `https://raw.githubusercontent.com/iqbaladinur/color-extractor/master/colors_data/${this.keyword.toLowerCase()}.json`;
        this.isFetching = true;
        this.arrayOfColors = [];
        fetch(url)
          .then((result) => {
            this.isFetching = false;
            if (result.ok) {
              return result.json();
            }
            return false;
          })
          .then((data) => {
            if (data) {
              this.arrayOfColors = data;
            } else {
              this.arrayOfColors = [];
            }
          })
          .catch((error) => {
            this.isFetching = false;
            console.log('error: ', error);
          });
      }
    }, 850),
  },
};
</script>
