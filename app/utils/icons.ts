export function getIconInvertedClassIfNeeded(iconUrl: string, isDark: boolean) {
  const url = iconUrl.toLowerCase();
  return (url.includes('github') || url.includes('nextjs')) && isDark ? 'invert' : '';
}
