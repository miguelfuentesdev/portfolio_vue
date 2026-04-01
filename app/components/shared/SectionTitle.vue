<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="mb-4 text-center">
    <h2 class="text-3xl font-bold">{{ title }}</h2>
  </div>
</template>
