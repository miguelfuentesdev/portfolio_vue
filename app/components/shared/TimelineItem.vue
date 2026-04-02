<script setup lang="ts">
import type { TimelineEntry } from '~/types/TimelineEntry';

defineProps<{
  item: TimelineEntry;
  isLast: boolean;
}>();
</script>

<template>
  <article class="grid grid-cols-[3rem_1fr]">
    <div class="flex flex-col items-start">
      <span class="timeline-node h-5 w-5 rounded-full border-4 border-text bg-primary" />
    </div>

    <div class="pb-12 flex flex-col gap-4" :class="isLast && '!pb-0'">
      <div class="flex flex-row justify-between items-center">
        <div class="flex flex-col gap-2">
          <h3 class="text-2xl font-bold text-text">
            {{ item.title }}
          </h3>
          <p class="text-md text-muted">
            {{ item.subtitle }}
          </p>
        </div>
        <div class="flex flex-col gap-2 text-end">
          <p class="text-md text-muted">
            {{ item.period }}
          </p>
          <p
            v-if="item.meta"
            class="text-md text-muted"
          >
            {{ item.meta }}
          </p>
        </div>
      </div>
      <ul>
        <li
          v-for="paragraph in item.bullets"
          :key="paragraph"
          class="text-muted flex gap-3 text-md leading-8"
        >
          <span class="mt-3 h-2 w-2 rounded-full bg-text" />
          <span class="flex-1">{{ paragraph }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>
