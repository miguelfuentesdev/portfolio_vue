import type { ContactRequest } from '~/types/ContactRequest';
import type { ContactResponse } from '~/types/ContactResponse';
import RegexUtilities from '~/utils/regex';

export default defineEventHandler(async (event) => {
  try {
    const { sender_email, message } = (await readBody(event)) as ContactRequest;
    const { supabaseAnonKey, supabaseContactUrl } = useRuntimeConfig(event);

    if (
      !sender_email.trim() ||
      !message.trim() ||
      RegexUtilities.isValidEmail(sender_email)
    ) {
      setResponseStatus(event, 400, 'Bad Request');
    }

    if (!supabaseAnonKey || !supabaseContactUrl) {
      setResponseStatus(event, 401, 'Not authorized');
    }

    const response = await $fetch<ContactResponse>(
      `${supabaseContactUrl}/functions/v1/send-contact-email`,
      {
        method: 'post',
        body: JSON.stringify({
          sender_email,
          message
        }),
        headers: {
          Authorization: `Bearer ${supabaseAnonKey}`
        }
      }
    );

    if (response.error) {
      setResponseStatus(event, 400, response.error);
    }

    setResponseStatus(event, 200, response.message ?? '');

    return response;
  } catch (e: any) {
    setResponseStatus(event, 400, e.message);
  }
});
