<template>
  <!-- Desktop version -->
  <div class="hidden lg:block">
    <PrimeDialog  
      v-model:visible="stepperState.dialogVisible" 
      modal 
      :header="currentCategoryName"
      :style="{ width: '90vw', maxWidth: '1100px' }"
    >
      <div class="p-4">
        <PrimeStepper v-model:value="stepperState.currentStep" :linear="true">
          <PrimeStepList>
            <PrimeStep 
              v-for="(_, index) in steps" 
              :key="index" 
              :value="String(index + 1)"
            />
          </PrimeStepList>
          
          <PrimeStepPanels>
            <PrimeStepPanel v-if="mandatoryCount === 0" value="1">
              <div class="p-4">
                <h2 class="text-2xl font-bold mb-4">TOTO</h2>
                <div class="flex justify-between items-center">
                  <PrimeButton 
                    severity="secondary" 
                    @click="emitComplete"
                    :label="$t('stepper.cancel')"
                  />
                  <PrimeButton 
                    severity="success" 
                    @click="emitComplete"
                    :label="$t('stepper.validate')"
                  />
                </div>
              </div>
            </PrimeStepPanel>
            
            <template v-else>
              <PrimeStepPanel 
                v-for="(mandatory, index) in steps" 
                :key="index"
                :value="String(index + 1)"
              >
                <slot 
                  :name="`mandatory-${index + 1}`" 
                  :item="item" 
                  :mandatory-index="index"
                >
                  <StepContent 
                    :item="item" 
                    :mandatory-index="index" 
                    :is-last="index === steps.length - 1" 
                    :selections="currentStepSelections"
                    @update-selection="handleSelectionUpdate"
                  />
                </slot>
                
                <div class="flex justify-between mt-4">
                  <PrimeButton 
                    v-if="index === 0"
                    severity="secondary" 
                    @click="emitComplete"
                    :label="$t('stepper.cancel')"
                  />
                  <PrimeButton 
                    v-if="index > 0"
                    severity="secondary" 
                    @click="stepperState.currentStep = String(index)"
                    :label="$t('stepper.back')"
                  />
                  <slot 
                    :name="`mandatory-${index + 1}-actions`" 
                    :is-last="index === steps.length - 1"
                  >
                    <PrimeButton 
                      v-if="index === steps.length - 1" 
                      severity="success" 
                      :disabled="!hasAllMandatorySelections"
                      @click="emitComplete"
                      :label="$t('stepper.validate')"
                    />
                    <PrimeButton 
                      v-else
                      :disabled="!canProceed"
                      @click="stepperState.currentStep = String(index + 2)"
                      :label="$t('stepper.next')"
                    />
                  </slot>
                </div>
              </PrimeStepPanel>
            </template>
          </PrimeStepPanels>
        </PrimeStepper>
      </div>
    </PrimeDialog>
  </div>
  
  <!-- Mobile format -->
  <div 
    v-if="stepperState.mobileVisible" 
    class="lg:hidden fixed inset-0 z-50 bg-white overflow-auto"
    style="min-height: 100vh; min-height: -webkit-fill-available;"
  >
    <div class="flex flex-col h-screen">
      <!-- Header -->
      <div class="py-4 px-4 border-b border-gray-200 flex items-center">
        <button 
          class="text-gray-500 hover:text-gray-800" 
          @click="closeMobileView"
        >
        </button>
        <h2 class="ml-4 text-xl font-bold flex-grow text-center pr-6">
          {{ currentCategoryName }}
        </h2>
      </div>
      
      <!-- Body -->
      <div class="flex-grow overflow-auto">
        <div v-if="mandatoryCount === 0" class="p-6">
          <p>TOTO</p>
        </div>
        
        <div 
          v-else 
          v-for="(_, index) in mandatoryCount" 
          :key="index" 
          class="p-6"
          v-show="stepperState.activeTabIndex === index"
        >
          <slot :name="`mandatory-${index + 1}`" :item="item" :mandatory-index="index">
            <StepContent 
              :item="item" 
              :mandatory-index="index" 
              :is-last="index === mandatoryCount - 1" 
              :selections="currentStepSelections"
              @update-selection="handleSelectionUpdate"
            />
          </slot>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="py-4 px-6 border-t">
        <div v-if="mandatoryCount === 0" class="flex justify-center">
          <slot name="no-mandatory-actions">
            <PrimeButton 
              severity="secondary" 
              class="w-1/3"
              @click="emitComplete"
              :label="$t('stepper.cancel')"
            />
          
          <div class="w-1/3 flex justify-center items-center">
            {{ stepperState.activeTabIndex }} / {{ mandatoryCount }}
          </div>
            <PrimeButton 
              severity="success" 
              class="w-1/3"
              @click="emitComplete"
              :label="$t('stepper.validate')"
            />
          </slot>
        </div>
        
        <div v-else class="flex justify-between">
          <PrimeButton 
               v-if="stepperState.activeTabIndex === 0"
              severity="secondary" 
              class="w-1/3"
              @click="emitComplete"
              :label="$t('stepper.cancel')"
            />
          <PrimeButton 
            v-if="stepperState.activeTabIndex > 0"
            severity="secondary" 
            @click="stepperState.activeTabIndex--"
            class="w-1/3"
            :label="$t('stepper.back')"
          />
          
          <div class="w-1/3 flex justify-center items-center">
            {{ stepperState.activeTabIndex + 1 }} / {{ mandatoryCount }}
          </div>
          
          <slot :name="`mandatory-${stepperState.activeTabIndex + 1}-actions`" :is-last="stepperState.activeTabIndex === mandatoryCount - 1">
            <PrimeButton 
              v-if="stepperState.activeTabIndex === mandatoryCount - 1" 
              severity="success" 
              :disabled="!hasAllMandatorySelections"
              @click="emitComplete"
              class="w-1/3"
              :label="$t('stepper.validate')"
            />
            <PrimeButton 
              v-else
              :disabled="!canProceed"
              @click="stepperState.activeTabIndex++"
              class="w-1/3"
              :label="$t('stepper.next')"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, reactive, toRefs } from 'vue';
import type { StepperEmits, StepperProps, StepperState } from '~/types/stepper.type';
import StepContent from './step-content.component.vue'

interface StepperHooks {
  isMobile: Ref<boolean>;
  handleResize: () => void;
}

const props = defineProps<StepperProps>();
const emit = defineEmits<StepperEmits>();
const { item } = toRefs(props);

const stepperState = reactive<StepperState & { selections: Record<string, any[]> }>({
  currentStep: '1',
  activeTabIndex: 0,
  dialogVisible: false,
  mobileVisible: false,
  selections: {} 
});

const currentCategoryName = computed(() => {
  if (!props.item?.mandatory || !props.item.mandatory[stepperState.activeTabIndex]) {
    return props.item?.label;
  }
  
  return props.item.mandatory[stepperState.activeTabIndex].category.label;
});

const steps = computed(() => {
  if (!props.item.mandatory) return [];
  
  const uniqueCategories = new Set();
  const filteredSteps = props.item.mandatory.filter((mandatory) => {
    const categoryId = mandatory.categoryId;
    if (!uniqueCategories.has(categoryId)) {
      uniqueCategories.add(categoryId);
      return true;
    }
    return false;
  });
  
  return filteredSteps;
});

const currentStepSelections = computed(() => {
  const key = stepperState.currentStep;
  return stepperState.selections[key] || [];
});

const updateStepSelections = (selections: any[]) => {
  const key = stepperState.currentStep;
  stepperState.selections = {
    ...stepperState.selections,
    [key]: selections
  };
};

const hasSelections = computed(() => {
  return currentStepSelections.value.length > 0;
});

const canProceed = computed(() => {
  if (mandatoryCount.value === 0) return true;
  
  return hasSelections.value;
});

const hasAllMandatorySelections = computed(() => {
  if (mandatoryCount.value === 0) return true;
  
  // Get all step IDs as strings
  const allSteps = Array.from({ length: mandatoryCount.value }, (_, i) => String(i + 1));
  
  // Check if all steps have at least one selection
  return allSteps.every(step => stepperState.selections[step]?.length > 0);
});

const useStepper = (props: StepperProps): StepperHooks => {
  const { visible } = toRefs(props);
  const isMobile = ref(false);

  const handleResize = () => {
    isMobile.value = window.innerWidth < 1024;
    
    if (isMobile.value) {
      stepperState.mobileVisible = visible.value;
      stepperState.dialogVisible = false;
    } else {
      stepperState.dialogVisible = visible.value;
      stepperState.mobileVisible = false;
    }
  };

  onMounted(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  });

  return {
    isMobile,
    handleResize
  };
};

const { isMobile } = useStepper(props);

const mandatoryCount = computed(() => {
  return props.item?.mandatory?.length || 0;
}) as ComputedRef<number>;

watch(() => props.visible, (newValue) => {
  if (isMobile.value) {
    stepperState.mobileVisible = newValue;
  } else {
    stepperState.dialogVisible = newValue;
  }
}, { immediate: true });

// Watch the desktop 
watch(() => stepperState.currentStep, (newStep) => {
  stepperState.activeTabIndex = parseInt(newStep) - 1;
  emit('step-change', newStep);
});

watch(() => stepperState.activeTabIndex, (newIndex) => {
  stepperState.currentStep = String(newIndex + 1);
  emit('step-change', stepperState.currentStep);
});

const closeMobileView = () => {
  emit('update:visible', false);
  stepperState.mobileVisible = false;
  stepperState.dialogVisible = false;
  
  // Reset steps but keep selections
  stepperState.currentStep = '1';
  stepperState.activeTabIndex = 0;
};

const emitComplete = () => {
  if(mandatoryCount.value > 0 || !stepperState.selections) stepperState.selections = {}

  emit('complete', {
    item: props.item,
    step: stepperState.currentStep,
    selections: stepperState.selections
  });

  console.log(stepperState.selections);
  
  stepperState.selections = {};
  closeMobileView();
};

const handleSelectionUpdate = (selection: any[]) => {
  updateStepSelections(selection);
};
</script>