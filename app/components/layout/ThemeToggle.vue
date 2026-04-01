<script setup lang="ts">
import sunIcon from "~/assets/images/icons/sun.svg";
import moonIcon from "~/assets/images/icons/moon.svg";

const { theme, toggleTheme } = useTheme();

const isDark = computed(() => theme.value === 'dark');
</script>
<template>
  <button
    type="button"
    :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    class="..."
    @click="toggleTheme()"
  >
    <img
      :src="isDark ? moonIcon : sunIcon"
      :alt="isDark ? 'Modo oscuro' : 'Modo claro'"
      class="w-6"
      :class="isDark ? 'invert' : ''"
    >
  </button>
</template>
