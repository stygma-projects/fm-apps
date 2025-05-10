import { useConfirm } from 'primevue'

interface ConfirmationOptions {
  message: string
  header: string
  icon: string
  acceptLabel: string
  rejectLabel: string
  acceptProps: any
  rejectProps: any
  accept: () => void
  reject: () => void
}

export const useConfirmModal = () => {
  const confirm = useConfirm()

  const defaultConfirmation = (options: ConfirmationOptions)=>{
    const {message, header, icon, acceptLabel, acceptProps, accept} = options
    confirm.require({
    message,
    header,
    icon,
    acceptLabel,
    acceptProps,
    accept,
  })
}

  return {
    defaultConfirmation,
  }
}