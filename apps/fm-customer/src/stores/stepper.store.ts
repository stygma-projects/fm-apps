import type { StepperState } from '~/types/stepper.type'

export const useStepperStore = defineStore('stepper', () => {
  const state = reactive<StepperState>({
    currentStep: '1',
    activeTabIndex: 0,
    dialogVisible: false,
    mobileVisible: false,
    selections: {},
  })

  const updateSelections = (key: string, selections: any[]) => {
    state.selections = { ...state.selections, [key]: selections }
  }

  const resetState = () => {
    Object.assign(state, {
      currentStep: '1',
      activeTabIndex: 0,
      dialogVisible: false,
      mobileVisible: false,
      selections: {},
    })
  }

  const setVisibility = (visible: boolean, isMobile: boolean) => {
    if (isMobile) {
      state.mobileVisible = visible
      state.dialogVisible = false
    } else {
      state.dialogVisible = visible
      state.mobileVisible = false
    }
  }

  const setStep = (step: string) => {
    state.currentStep = step
    state.activeTabIndex = parseInt(step) - 1
  }

  const setTabIndex = (index: number) => {
    state.activeTabIndex = index
    state.currentStep = String(index + 1)
  }

  const setSelections = (selections: Record<string, any[]>) => {
    state.selections = { ...selections }
  }

  return {
    state,
    updateSelections,
    resetState,
    setVisibility,
    setStep,
    setTabIndex,
    setSelections,
  }
})
