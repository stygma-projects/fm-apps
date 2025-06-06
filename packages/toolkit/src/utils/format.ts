export const formatHour = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export const formatDateTime = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleTimeString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}