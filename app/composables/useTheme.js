export function useTheme() {
  const hour = new Date().getHours()

  const themes = [
    { name: 'dawn', start: 5, end: 7 },
    { name: 'morning', start: 7, end: 12 },
    { name: 'afternoon', start: 12, end: 18 },
    { name: 'sunset', start: 18, end: 20 },
    { name: 'evening', start: 20, end: 22 },
    { name: 'night', start: 22, end: 4 },
  ]

  const currentTheme = themes.find(t => (hour >= t.start && hour < t.end))
  const currentBackgroundTheme = currentTheme ? currentTheme.name : 'night'

  return {
    currentBackgroundTheme
  }
}
