<script setup lang="ts">
import { computed } from 'vue';
import type { Skill } from '~/domain/entities/skill';

const props = defineProps<{
  skill: Skill;
}>();

const { theme } = useTheme();
const isDark = computed(() => theme.value === 'dark');
const colorClasses = computed(() => {
  const variants = {
    blue: 'bg-blue-500/15 text-blue-300 ring-blue-400/30',
    purple: 'bg-purple-500/15 text-purple-300 ring-purple-400/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 ring-cyan-400/30',
    orange: 'bg-orange-500/15 text-orange-300 ring-orange-400/30',
    yellow: 'bg-yellow-500/15 text-yellow-300 ring-yellow-400/30',
    green: 'bg-green-500/15 text-green-300 ring-green-400/30',
    red: 'bg-red-500/15 text-red-300 ring-red-400/30',
    black: 'bg-gray-500/15 text-gray-300 ring-white/10',
    pink: 'bg-pink-500/15 text-pink-300 ring-pink-400/30'
  } satisfies Record<Skill['color'], string>;

  return variants[props.skill.color];
});
</script>

<template>
  <div
    class="rounded-full px-4 py-3 ring-1 transition-all duration-200 flex flex-row items-center gap-2"
    :class="colorClasses"
  >
    <img
      :src="skill.icon.url"
      :alt="skill.name"
      class="w-6 h-6"
      :class="getIconInvertedClassIfNeeded(skill.icon.url, isDark)"
    />
    <p class="text-md font-semibold" :class="!isDark && 'text-black'">{{ skill.name }}</p>
  </div>
</template>
