<template>
  <div class="bg-indigo-200 bg-opacity-25 p-6 text-xs">
    <div class="text-gray-700">
      <ul>
        <li>Biancoir {{ year }}</li>
        <li>
          Made with ❤️ by <a href="https://github.com/iqbaladinur" class="hover:text-blue-500" title="Iqbal Adi">Iqbal Adi</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
