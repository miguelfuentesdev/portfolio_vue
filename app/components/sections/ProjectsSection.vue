<script setup lang="ts">
import type { ProjectsSection as ProjectsSectionEntity } from '~/domain/entities/home-page';

defineProps<{
  projectsSection: ProjectsSectionEntity;
}>();
</script>

<template>
  <section id="projects">
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
