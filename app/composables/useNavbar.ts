export function useMobileMenu() {
  const isOpen = useState('mobile-menu-open', () => false);

  function openMenu() {
    isOpen.value = true;
  }

  function closeMenu() {
    isOpen.value = false;
  }

  function toggleMenu() {
    isOpen.value = !isOpen.value;
  }

  watch(isOpen, (value) => {
    if (!import.meta.client) {
      return;
    }

    document.body.style.overflow = value ? 'hidden' : '';
  });

  onBeforeUnmount(() => {
    if (!import.meta.client) return;
    document.body.style.overflow = '';
  });

  return {
    isOpen,
    openMenu,
    closeMenu,
    toggleMenu
  }
}