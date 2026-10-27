import type { ContactRequest } from '~/types/ContactRequest';
import type { ContactResponse } from '~/types/ContactResponse';
import RegexUtilities from '~/utils/regex';

export default defineEventHandler(async (event): Promise<ContactResponse> => {
  const body = await readBody<Partial<ContactRequest>>(event);
  const sender_email = typeof body?.sender_email === 'string' ? body.sender_email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!sender_email || !message || !RegexUtilities.isValidEmail(sender_email)) {
    setResponseStatus(event, 400);
    return { error: 'Email y mensaje son requeridos.' };
  }

  try {
    const response = await sendToContactLambda(event, { sender_email, message });
    const result = (await response.json()) as ContactResponse;

    setResponseStatus(event, response.status);
    return result;
  } catch (e) {
    console.error('Error enviando el mensaje de contacto', e);
    setResponseStatus(event, 500);
    return { error: 'No se pudo enviar el mensaje.' };
  }
});
