export const formatHour = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}
