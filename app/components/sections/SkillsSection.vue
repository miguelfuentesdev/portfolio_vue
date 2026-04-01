<script setup lang="ts">
import type { SkillsSection as SkillsSectionEntity } from "~/domain/entities/home-page";

defineProps<{
  skillsSection: SkillsSectionEntity;
}>();
</script>

<template>
  <section id="skills">
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
