export function useLocale() {
  const { locale, locales, setLocale } = useI18n();

  async function switchLocale(code: 'en' | 'es') {
    if (code === locale.value) return;
    await setLocale(code);
  }

  const currentLocale = computed({
    get: () => locale.value,
    set: async (code: string) => {
      await switchLocale(code as 'en' | 'es');
    }
  });
  
  return {
    locale,
    locales,
    currentLocale,
    switchLocale,
  };
}
