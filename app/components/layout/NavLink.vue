<script setup lang="ts">
defineProps<{
  href: string;
  label: string;
}>();
</script>

<template>
  <a :href="href" class="text font-semibold group relative inline-block hover:text-primary">
    {{ label }}
    <span
      class="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
  </a>
</template>
