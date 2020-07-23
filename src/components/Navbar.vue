<template>
  <nav class="p-3">
    <div class="container mx-auto flex items-center justify-between flex-wrap">
      <div>
        <span class="color-grad logo text-2xl">
          <b>Color</b> Bianco
        </span>
      </div>
      <div class="flex-grow flex flex-row-reverse lg:items-center w-auto">
        <div class="bg-white bg-opacity-25 rounded">
          <a href="https://github.com/iqbaladinur/color-extractor"
             class="inline-block text-sm px-4 py-3 leading-none  rounded text-white hover:border-transparent hover:text-white hover:bg-gray-900"
          >
            Github
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      navbarExpanded: true,
    };
  },
};

</script>
