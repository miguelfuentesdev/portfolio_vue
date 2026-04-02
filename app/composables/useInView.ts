import type { UseInViewOptions } from "~/types/UseInViewOptions";

export function useInView(options: UseInViewOptions = {}) {
  const { once = true, threshold = 0.2, rootMargin = '0px' } = options;
  // Ref to the target element
  const targetRef = ref<HTMLElement | null>(null);
  // Ref to the inView state
  const inView = ref(false);

  let observer: IntersectionObserver | null = null;

  // Start observing the target element when component is mounted
  onMounted(() => {
    if (!import.meta.client) return;

    // Ref to the observer
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inView.value = true;
          if (once) {
            observer?.disconnect();
          }
        } else if (!once) {
          inView.value = false;
        }
      });
    }, { threshold, rootMargin });

    if (targetRef.value) {
      observer.observe(targetRef.value);
    }
  });

  // Cleanup on component unmount
  onUnmounted(() => {
    if (!import.meta.client) return;
    observer?.disconnect();
    targetRef.value = null;
  });

  return {
    targetRef,
    inView
  }
}