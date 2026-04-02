<script setup lang="ts">
import type { ContactSection } from '~/domain/entities/home-page';

defineProps<{
  contactSection: ContactSection;
}>();
const { targetRef: formRef, inView: formInView } = useInView();
const { targetRef: imgRef, inView: imgInView } = useInView();
</script>

<template>
  <section id="contact">
    <SectionTitle :title="contactSection.title" :class="'text-center md:text-start mb-4'" />
    <div class="w-full grid md:grid-cols-2">
      <div
        ref="formRef"
        class="flex flex-col gap-2 reveal reveal-left"
        :class="{ 'reveal-visible': formInView }"
      >
        <p class="text-muted mb-2 text-center md:text-start">
          {{ contactSection.description }}
        </p>
        <ContactForm />
      </div>
      <div
        ref="imgRef"
        class="w-full reveal reveal-right"
        :class="{ 'reveal-visible': imgInView }"
      >
        <img src="" alt="">
      </div>
    </div>
  </section>
</template>
