import { useToast as PrimeVueToast } from 'primevue/usetoast'
import { Severity } from '../types/primevue.type'

export const useToast = () => {
  const toast = PrimeVueToast()

  const showToast = (severity: Severity, summary: string, detail: string, life = 3000) => {
    toast.add({
      severity,
      summary,
      detail,
      life,
    })
  }

  const infoToast = (summary: string, detail: string, life = 3000) => {
    showToast(Severity.INFO, summary, detail, life)
  }

  const successToast = (summary: string, detail: string, life = 3000) => {
    showToast(Severity.SUCCESS, summary, detail, life)
  }

  const warningToast = (summary: string, detail: string, life = 3000) => {
    showToast(Severity.WARNING, summary, detail, life)
  }

  const errorToast = (summary: string, detail: string, life = 3000) => {
    showToast(Severity.ERROR, summary, detail, life)
  }

  return {
    toast,
    showToast,
    infoToast,
    warningToast,
    errorToast,
    successToast,
  }
}

