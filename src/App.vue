<template>
  <div id="app">
    <div class="flex">
      <div class="lg:w-1/6 w-0 bg-gray-100 lg:visible invisible">
        <navbar />
        <pic-loader />
      </div>
      <div class="lg:w-4/6 w-full m-5 bg-indigo-100 rounded-xl">
        <div class="container px-5 py-10 mx-auto">
          <router-view/>
        </div>
        <my-footer class="hidden lg:block rounded-b-xl"/>
      </div>
      <div class="lg:w-1/5 lg:block lg:py-5 lg:pr-5 p-5" :class="colorRecomendation ? 'fixed z-20 w-full h-screen bg-indigo-100' : 'hidden'">
        <div class="rounded-xl bg-indigo-200 lg:bg-opacity-25 custom-right-sidebar p-5 overflow-y-scroll">
          <ColorRecomendation />
        </div>
      </div>
    </div>
    <div class="lg:hidden z-30" :class="colorRecomendation ? 'fixed w-full flex justify-center bottom-0' : 'fixed right-0 top-0 my-16'">
      <button
        class="h-10 w-10 bg-gray-100 focus:outline-none text-gray-700 font-bold text-center"
        :class="colorRecomendation ? 'rounded-full mb-3 shadow-xl' : 'shadow-xl rounded-l-lg'"
        @click="colorRecomendation = !colorRecomendation">
        {{ colorRecomendation ? '&#10005;':'&#9776;' }}
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import MyFooter from '@/components/Footer.vue';
import PicLoader from '@/components/PictureLoader.vue';
import ColorRecomendation from '@/components/ColorsRecomendation.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    MyFooter,
    PicLoader,
    ColorRecomendation,
  },
  data() {
    return {
      colorRecomendation: false,
    };
  },
};
</script>
<style>
body {
  @apply bg-gray-100;
  @apply text-gray-700;
}
.custom-right-sidebar{
  height: calc(100vh - 40px);
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.custom-right-sidebar::-webkit-scrollbar {
  display: none;
}
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
