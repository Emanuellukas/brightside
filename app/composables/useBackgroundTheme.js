export function useBackgroundTheme() {
  const hour = new Date().getHours()

  const themes = [
    { name: 'dawn', start: 4, end: 7 },
    { name: 'morning', start: 7, end: 12 },
    { name: 'afternoon', start: 12, end: 17 },
    { name: 'sunset', start: 17.5, end: 18.5 },
    { name: 'evening', start: 18.5, end: 21 },
    { name: 'night', start: 21, end: 4 },
  ]

  const currentTheme = themes.find(t => hour >= t.start && hour < t.end)
  return currentTheme ? currentTheme.name : 'night'
}
