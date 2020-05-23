<template>
  <div id="app" class="bg-gray-700">
    <navbar/>
    <div class="container mx-auto px-5">
      <router-view/>
    </div>
    <my-footer/>
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
