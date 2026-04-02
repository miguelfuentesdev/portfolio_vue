<script setup lang="ts">
defineProps<{
  text: string;
  onClick?: () => void;
  isLoading: boolean;
}>();
</script>

<template>
  <button type="submit"
    class="bg-primary w-min py-2 px-4 rounded text-text transition-all duration-200 ease-out hover:opacity-75 disabled:opacity-50 disabled:translate-x-0"
    :disabled="isLoading">

    <div class="flex flex-row gap-2 items-center">
      <p>{{ text }}</p>
      <svg v-show="isLoading" class="w-4 h-4 text-text animate-spin" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          fill="currentColor"></path>
      </svg>
    </div>
  </button>
</template>
