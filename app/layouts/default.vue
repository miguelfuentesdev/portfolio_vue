<script setup lang="ts">
const { initializeTheme } = useTheme();

initializeTheme();
</script>

<template>
  <div>
    <AppHeader />
    <main class="app-container">
      <slot />
    </main>
  </div>
</template>
