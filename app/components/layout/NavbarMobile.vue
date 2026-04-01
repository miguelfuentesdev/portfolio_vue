<script setup lang="ts">
import menuIcon from '~/assets/images/icons/menu.png';
const { toggleMenu, isOpen } = useMobileMenu();
const { t, tm } = useI18n();
const { theme } = useTheme();
const isDark = computed(() => theme.value === 'dark');
</script>

<template>
  <button
    type="button"
    class="inline-flex md:hidden"
    @click="toggleMenu()"
    aria-label="Abrir menú"
    :aria-expanded="isOpen"
  >
    <img :src="menuIcon" alt="Menú" class="w-6 h-6" :class="isDark && 'invert'" />
  </button>
  <div
    v-if="isOpen"
    class="gap-1 min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 dark:bg-slate-50/65 rounded-lg backdrop-blur-md py-24"
    style="opacity: 1; transform: translateX(-50%) translateY(-50%) scale(1) translateZ(0px);"
  >
    <NavLink
      v-for="(_, index) in tm('sections')"
      :key="index"
      :href="`#${t(`sections[${index}].id`)}`"
      :label="t(`sections[${index}].title`)"
      :class="'text-white dark:text-black'"
      @click="toggleMenu()"
    />
  </div>
</template>
