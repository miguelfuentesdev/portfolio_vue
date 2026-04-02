<script setup lang="ts">
import type { EducationSection as EducationSectionEntity } from "~/domain/entities/home-page";
import type { TimelineEntry } from "~/types/TimelineEntry";
import { formatMonthYear } from "~/utils/date";
import { useInView } from '~/composables/useInView';
const props = defineProps<{
  educationSection: EducationSectionEntity;
}>();

const { timelineRef, progress, lineTop, lineHeight } = useTimelineProgress();
const timelineItems = computed<TimelineEntry[]>(() =>
  props.educationSection.items.map((education) => ({
    title: education.degree,
    subtitle: education.institution,
    period: `${formatMonthYear(education.startDate)} - ${formatMonthYear(education.endDate) ?? "Presente"}`,
    bullets: education.paragraphs,
  })),
);
const { targetRef, inView } = useInView();
</script>

<template>
  <section id="education" ref="targetRef" class="reveal reveal-up" :class="{ 'reveal-visible': inView }">
    <SectionTitle :title="educationSection.title" />
    <div ref="timelineRef" class="relative">
      <div
        class="absolute left-6 w-1 bg-border"
        :style="{
          top: `${lineTop}px`,
          height: `${lineHeight}px`,
        }"
      />

      <div
        class="absolute left-6 w-1 bg-secondary transition-[height] duration-150 ease-out"
        :style="{
          top: `${lineTop}px`,
          height: `${lineHeight * progress}px`,
        }"
      />

      <div class="relative z-10 flex flex-col">
        <TimelineItem
          v-for="(item, index) in timelineItems"
          :key="`${item.subtitle}-${item.period}`"
          :item="item"
          :is-last="index === timelineItems.length - 1"
        />
      </div>
    </div>
  </section>
</template>
