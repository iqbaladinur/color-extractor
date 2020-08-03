<template>
  <div id="app">
    <div class="flex">
      <div class="lg:w-1/6 w-0 bg-gray-100 lg:visible invisible shadow-lg">
        <navbar />
        <pic-loader />
      </div>
      <div class="lg:w-5/6 w-full">
        <div class="container px-5 py-10 mx-auto">
          <router-view/>
        </div>
        <my-footer class="hidden lg:block"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import MyFooter from '@/components/Footer.vue';
import PicLoader from '@/components/PictureLoader.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    MyFooter,
    PicLoader,
  },
};
</script>
<style>
body {
  @apply bg-indigo-100;
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
