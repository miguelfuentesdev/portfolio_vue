<script setup lang="ts">
const { t, tm } = useI18n();
</script>

<template>
  <nav class="hidden md:flex flex-row items-center gap-4">
    <NavLink
      v-for="(_, index) in tm('sections')"
      :key="index"
      :href="`#${t(`sections[${index}].id`)}`"
      :label="t(`sections[${index}].title`)"
    />
  </nav>
</template>
