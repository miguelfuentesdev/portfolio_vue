<script setup lang="ts">
const { data: homePage, pending, error } = useHomePage();
</script>

<template>
  <div>
    <div v-if="pending">Cargando...</div>
    <div v-else-if="error">Ocurrió un error al cargar la página.</div>

    <template v-else-if="homePage">
      <HomeHeroSection :about="homePage.about" />
      <SkillsSection :skills-section="homePage.skills" />
      <ExperienceSection :experience-section="homePage.experience" />
      <ProjectsSection :projects-section="homePage.projects" />
      <EducationSection :education-section="homePage.education" />
    </template>
  </div>
</template>
