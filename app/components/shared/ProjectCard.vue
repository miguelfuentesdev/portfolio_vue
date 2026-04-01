<script setup lang="ts">
import githubIcon from '~/assets/images/icons/github.png';
import type { Project } from '~/domain/entities/project';

defineProps<{
  project: Project;
}>();

const { theme } = useTheme();
const isDark = computed(() => theme.value === 'dark');
</script>

<template>
  <div class="relative h-full">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rounded-md bg-text"
    />

    <div
      class="relative z-10 border rounded-md border-text bg-background p-6 flex flex-col gap-4 text-start h-full"
    >
      <a
        target="_blank"
        :href="project.liveUrl"
        class="w-full cursor-pointer overflow-hidden"
      >
        <img
          loading="lazy"
          class="object-contain h-60"
          :width="project.thumbnail.width"
          :height="project.thumbnail.height"
          :src="project.thumbnail.url"
          :alt="project.thumbnail.alt"
        />
      </a>
      <div class="flex flex-col flex-1 justify-between gap-4">
        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-bold">
            {{ project.title }}
          </h3>
          <p
            v-for="paragraph in project.description"
            :key="paragraph"
            class="text-md text-muted"
          >
            {{ paragraph }}
          </p>
        </div>
        <div class="flex flex-row justify-between items-center">
          <div class="flex flex-row flex-wrap gap-2">
            <img
              v-for="tech in project.techStack"
              :key="tech.name"
              :src="tech.icon.url"
              :alt="tech.name"
              :class="getIconInvertedClassIfNeeded(tech.icon.url, isDark)"
              class="w-6 h-6 object-contain"
            />
          </div>
          <a v-if="project.repoUrl" :href="project.repoUrl" target="_blank">
            <img
              :src="githubIcon"
              alt="GitHub"
              class="w-6 h-6 object-contain"
              :class="isDark && 'invert'"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
