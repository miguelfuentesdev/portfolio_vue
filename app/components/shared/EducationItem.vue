<script setup lang="ts">
import type { Education } from "~/domain/entities/education";

defineProps<{
  education: Education;
}>();
</script>

<template>
  <article>
    <h3>{{ education.degree }}</h3>
    <p>{{ education.institution }}</p>
  </article>
</template>
