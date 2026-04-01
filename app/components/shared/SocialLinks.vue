<script setup lang="ts">
import type { SocialLink } from '~/domain/entities/social-link';

defineProps<{
  links: SocialLink[];
}>();
const { theme } = useTheme();
const isDark = computed(() => theme.value === 'dark');
</script>

<template>
  <div class="w-full flex flex-row gap-3 items-center justify-center md:justify-start">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.url"
      target="_blank"
      rel="noreferrer"
      class="w-8 h-8"
    >
      <img
        :src="link.icon.url"
        :alt="link.icon.alt"
        class="w-full h-full object-contain"
        :class="getIconInvertedClassIfNeeded(link.icon.url, isDark)"
      />
    </a>
  </div>
</template>
