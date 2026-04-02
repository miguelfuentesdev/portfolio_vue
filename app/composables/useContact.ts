import type { ContactRequest } from "~/types/ContactRequest";
import type { ContactResponse } from "~/types/ContactResponse";
import RegexUtilities from '~/utils/regex';

export function useContact() {
  const form = reactive<ContactRequest>({
    sender_email:'',
    message: ''
  });

  const isSubmitting = ref(false);
  const isSubmitted = ref(false);

  const isValidForm = computed(() => {
    return (
      form.sender_email.trim().length > 0 &&
      form.message.trim().length > 0 &&
      RegexUtilities.isValidEmail(form.sender_email)
    );
  });

  function resetForm() {
    form.sender_email = "";
    form.message = "";
  }

  async function submit() {
    if (!isValidForm || !isSubmitted) {
      return; 
    }

    isSubmitting.value = true;

    try {
      const response = await $fetch<ContactResponse>('/api/contact', {
        method: 'POST',
        body: {
          sender_email: form.sender_email,
          message: form.message
        }
      });

      if (!response.error) {
        resetForm();
        isSubmitted.value = true;
      }
    } catch (e) {
      // Do nothing
    } finally {
      isSubmitting.value = false;
    }
  }

  return {
    form,
    isSubmitting,
    isSubmitted,
    isValidForm,
    submit
  };
}