export function useTimelineProgress() {
  const timelineRef = ref<HTMLElement | null>(null);
  const progress = ref(0);
  const lineTop = ref(0);
  const lineHeight = ref(0);

  function updateProgress() {
    if (!timelineRef.value || !import.meta.client) {
      return;
    }

    const rect = timelineRef.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const nodes = timelineRef.value.querySelectorAll('.timeline-node');
    const firstNode = nodes[0] as HTMLElement | undefined;
    const lastNode = nodes[nodes.length - 1] as HTMLElement | undefined;

    if (!firstNode || !lastNode) {
      return;
    }

    const firstRect = firstNode.getBoundingClientRect();
    const lastRect = lastNode.getBoundingClientRect();
    const firstCenter = firstRect.top - rect.top + firstRect.height / 2;
    const lastCenter = lastRect.top - rect.top + lastRect.height / 2;

    lineTop.value = firstCenter;
    lineHeight.value = Math.max(lastCenter - firstCenter, 0);

    const startOffset = viewportHeight;
    const totalDistance = lineHeight.value + startOffset;
    const traveled = startOffset - rect.top;
    const rawProgress = traveled / totalDistance;

    progress.value = Math.min(Math.max(rawProgress, 0), 1);
  }

  onMounted(() => {
    if (!import.meta.client) {
      return;
    }

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
  });

  onUnmounted(() => {
    if (!import.meta.client) {
      return;
    }

    window.removeEventListener('scroll', updateProgress);
    window.removeEventListener('resize', updateProgress);
  });

  return {
    timelineRef,
    progress,
    lineTop,
    lineHeight,
  };

}