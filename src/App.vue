<template>
  <div id="app">
    <div class="flex">
      <div class="w-1/6 bg-white">
        <navbar/>
      </div>
      <div class="w-5/6">
        <div class="container px-5">
          <router-view/>
        </div>
        <my-footer class="lg:block hidden"/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import MyFooter from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    MyFooter,
  },
};
</script>
<style>
body {
  @apply bg-gray-800;
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
