<script setup lang="ts">
const {
  form,
  isSubmitted,
  isSubmitting,
  submit
} = useContact();
const { t } = useI18n();
</script>

<template>
  <form @submit.prevent="submit" class="w-full flex flex-col gap-4 items-center md:items-start">
    <div class="w-full">
      <label for="sender_email" class="block mb-2.5 text-sm font-medium">{{ t('form.email') }}</label>
      <input type="email" id="sender_email" v-model="form.sender_email"
        class="bg-transparent border border-text rounded text-sm focus:outline-none focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs"
        :placeholder="t('form.email_placeholder')" required />
    </div>
    <div class="w-full">
      <label for="message" class="block mb-2.5 text-sm font-medium">{{ t('form.message') }}</label>
      <textarea type="text" id="message" rows="6" v-model="form.message"
        class="bg-transparent border border-text rounded text-sm focus:outline-none focus:ring-primary focus:border-primary block w-full px-3 py-2.5 shadow-xs"
        :placeholder="t('form.message_placeholder')" required />
    </div>
    <LoadingButton v-show="!isSubmitted" :text="t('form.submit')" :is-loading="isSubmitting" />
    <p v-show="isSubmitted" class="text-primary font-semibold text-md">
      {{ t('form.success') }}
    </p>
  </form>
</template>