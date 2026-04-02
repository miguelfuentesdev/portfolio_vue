<script setup lang="ts">
import type { ProjectsSection as ProjectsSectionEntity } from '~/domain/entities/home-page';
import { useInView } from '~/composables/useInView';
defineProps<{
  projectsSection: ProjectsSectionEntity;
}>();
const { targetRef, inView } = useInView();
</script>

<template>
  <section id="projects" ref="targetRef" class="reveal reveal-up" :class="{ 'reveal-visible': inView }">
    <SectionTitle :title="projectsSection.title" />
    <article
      class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start justify-center"
    >
      <ProjectCard
        v-for="project in projectsSection.items"
        :key="project.title"
        :project="project"
      />
    </article>
  </section>
</template>
