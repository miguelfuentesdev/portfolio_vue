<script setup lang="ts">
import type { About } from '~/domain/entities/about';
import { useInView } from '~/composables/useInView';

defineProps<{
  about: About;
}>();
const { targetRef: pfpRef, inView: pfpInView } = useInView();
const { targetRef: textRef, inView: textInView } = useInView();
</script>

<template>
  <section id="about">
    <div class="flex flex-col items-center justify-between w-full lg:flex-row gap-6">
      <div class="w-1/2 md:mr-0 m-auto rounded-full shadow-2xl lg:inline-block reveal reveal-left"
        :class="{ 'reveal-visible': pfpInView }" ref="pfpRef">
        <img fetchpriority="high" :src="about.profileImage.url" :alt="about.profileImage.alt"
          class="object-contain size-[200px] md:size-[300px] lg:size-[600px] rounded-full" />
      </div>
      <div class="w-full flex flex-col lg:w-1/2 text-center lg:text-left gap-3 reveal reveal-right"
        :class="{ 'reveal-visible': textInView }" ref="textRef">
        <div>
          <h1 class="text-4xl font-bold mb-4">{{ about.greeting }}</h1>
          <h2 class="text-2xl font-bold mb-4">{{ about.title }}</h2>
          <p v-for="paragraph in about.paragraphs" :key="paragraph" class="text-md text-muted">
            {{ paragraph }}
          </p>
        </div>
        <SocialLinks :links="about.socialLinks" />
      </div>
    </div>
  </section>
</template>
