export default function () {
  const toast = (options = {}) => useToast()[options.type]({
    timeout: 3000,
    position: 'topCenter',
    layout: 1,
    ...options,
  })

  return { toast }
}