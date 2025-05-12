import { useConfirm } from 'primevue'
import { useI18n } from 'vue-i18n'
import { Severity } from '../types/primevue.type'

interface ConfirmationProps {
  label: string
  severity: Severity
  outlined?: boolean
}
interface ConfirmationOptions {
  message: string
  header: string
  icon: string
  acceptProps?: ConfirmationProps
  rejectProps?: ConfirmationProps
  accept?: () => void
  reject?: () => void
}

export const useConfirmModal = () => {
  const { t } = useI18n()
  const confirm = useConfirm()

  const defaultOptions: Partial<ConfirmationOptions> = {
    icon: 'pi pi-info-circle',
    rejectProps: {
      label: t('common.actions.cancel'),
      severity: Severity.SECONDARY,
      outlined: true,
    },
    acceptProps: {
      label: t('common.actions.confirm'),
      severity: Severity.SUCCESS,
      outlined: false,
    },
    accept: (): void => {
      return undefined
    },
    reject: (): void => {
      return undefined
    },
  }

  const defaultConfirmation = (options?: Partial<ConfirmationOptions>) => {
    confirm.require({
      ...defaultOptions,
      ...options,
    })
  }

  const deleteConfirmation = (options?: Partial<ConfirmationOptions>) => {
    const deleteDefaultOptions: Partial<ConfirmationOptions> = {
      ...defaultOptions,
      header: t('common.confirmModal.delete.header'),
      message: t('common.confirmModal.delete.message'),
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        label: t('common.actions.cancel'),
        severity: Severity.SECONDARY,
        outlined: true,
      },
      acceptProps: {
        label: t('common.actions.confirm'),
        severity: Severity.DANGER,
        outlined: false,
      },
    }

    defaultConfirmation({
      ...deleteDefaultOptions,
      ...options,
    })
  }

  return {
    defaultConfirmation,
    deleteConfirmation,
  }
}
