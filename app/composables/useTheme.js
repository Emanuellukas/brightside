export function useTheme() {
  const utcHour = new Date().getUTCHours()
  const saoPauloHour = (utcHour - 3 + 24) % 24 // São Paulo fica em UTC-3

  const themes = [
    { name: 'night', start: 0, end: 5 },
    { name: 'dawn', start: 5, end: 7 },
    { name: 'morning', start: 7, end: 12 },
    { name: 'afternoon', start: 12, end: 18 },
    { name: 'sunset', start: 18, end: 20 },
    { name: 'evening', start: 20, end: 22 },
    { name: 'night', start: 22, end: 24 },
  ]

  const currentTheme = themes.find(({ start, end }) => (saoPauloHour >= start && saoPauloHour < end))
  const currentBackgroundTheme = currentTheme ? currentTheme.name : 'night'

  return {
    currentBackgroundTheme
  }
}
