<script setup lang="ts">
const { initializeTheme } = useTheme();

onMounted(() => {
  initializeTheme();
});
</script>

<template>
  <div>
    <AppHeader />
    <main class="app-container">
      <slot />
    </main>
  </div>
</template>
