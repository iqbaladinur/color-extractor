<template>
  <nav class="p-3">
    <div class="container mx-auto flex items-center justify-between flex-wrap">
      <div>
        <span class="color-grad logo text-2xl">
          <b>Color</b> Bianco
        </span>
      </div>
      <div class="flex-grow flex flex-row-reverse lg:items-center w-auto">
        <div>
          <a href="https://github.com/iqbaladinur/color-extractor"
             class="inline-block text-sm p-2 leading-none  rounded text-white hover:border-transparent hover:text-white hover:bg-gray-900"
          >
            <img src="@/assets/github.svg" width="20" height="20" class="inline text-white" style="filter: invert()">
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
