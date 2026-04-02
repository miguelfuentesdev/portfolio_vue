<script setup lang="ts">
import type { ExperienceSection as ExperienceSectionEntity } from "~/domain/entities/home-page";
import type { TimelineEntry } from "~/types/TimelineEntry";
import { formatMonthYear } from "~/utils/date";

const props = defineProps<{
  experienceSection: ExperienceSectionEntity;
}>();

const { timelineRef, progress, lineTop, lineHeight } = useTimelineProgress();
const timelineItems = computed<TimelineEntry[]>(() =>
  props.experienceSection.items.map((experience) => ({
    title: experience.role,
    subtitle: experience.company,
    period: `${formatMonthYear(experience.startDate)} - ${formatMonthYear(experience.endDate) ?? "Presente"}`,
    meta: experience.modality,
    bullets: experience.paragraphs,
  })),
);

const { targetRef, inView } = useInView();
</script>

<template>
  <section id="experience" ref="targetRef" class="reveal reveal-up" :class="{ 'reveal-visible': inView }">
    <SectionTitle :title="experienceSection.title" />
    <div ref="timelineRef" class="relative">
      <div class="absolute left-2 w-1 bg-border" :style="{
        top: `${lineTop}px`,
        height: `${lineHeight}px`,
      }" />

      <div class="absolute left-2 w-1 bg-primary transition-[height] duration-150 ease-out" :style="{
        top: `${lineTop}px`,
        height: `${lineHeight * progress}px`,
      }" />

      <div class="relative z-10 flex flex-col">
        <TimelineItem v-for="(item, index) in timelineItems" :key="`${item.subtitle}-${item.period}`" :item="item"
          :is-last="index === timelineItems.length - 1" />
      </div>
    </div>
  </section>
</template>
