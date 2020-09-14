<template>
  <div class="bg-indigo-200 bg-opacity-25 p-6 text-xs">
    <div class="text-gray-700">
      <ul>
        <li>Biancoir {{ year }}</li>
        <li>
          Made with ❤️ by <a href="https://github.com/iqbaladinur" class="footer-link">Iqbal Adi</a> |
          <a href="https://www.privacypolicygenerator.info/live.php?token=ipuHipcuvTXh4fCJtSXLkMPZrRJsT6ib" class="footer-link">Privacy Police</a> |
          <a href="https://www.termsofusegenerator.net/live.php?token=AnPvYI8rmFEQX8uG1lWqANrqpIzOw3hp" class="footer-link">Terms of Use</a> |
          Images sources from <a href="https://unsplash.com/" class="footer-link">unsplash.com</a>
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
<style lang="postcss" scoped>
.footer-link{
  @apply hover:text-blue-500;
}
</style>
