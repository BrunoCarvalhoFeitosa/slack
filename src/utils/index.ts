import { format, isToday, isYesterday } from "date-fns"
import { ptBR } from "date-fns/locale"

export const TIME_THRESHOLD = 5

export const getDate = () => {
  const now = new Date()

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return formatter.format(now)
}

export const formatDateLabel = (dateStr: string) => {
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day)

  if (isToday(date)) return "Hoje"
  if (isYesterday(date)) return "Ontem"

  return format(date, "EEEE, d 'de' MMMM", { locale: ptBR })
}
