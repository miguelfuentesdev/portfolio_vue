<script setup lang="ts">
import type { SkillsSection as SkillsSectionEntity } from "~/domain/entities/home-page";
import { useInView } from '~/composables/useInView';
defineProps<{
  skillsSection: SkillsSectionEntity;
}>();
const { targetRef, inView } = useInView();
</script>

<template>
  <section id="skills" ref="targetRef" class="reveal reveal-up" :class="{ 'reveal-visible': inView }">
    <SectionTitle :title="skillsSection.title" />
    <div class="flex flex-row flex-wrap justify-center gap-3">
      <SkillChip
        v-for="skill in skillsSection.items"
        :key="skill.name"
        :skill="skill"
        :show-name="true"
      />
    </div>
  </section>
</template>
