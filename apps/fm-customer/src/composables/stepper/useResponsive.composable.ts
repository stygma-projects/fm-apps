export const useResponsive = () => {
  const isMobile = ref(false)

  const handleResize = () => {
    isMobile.value = window.innerWidth < 1024
  }

  onMounted(() => {
    window.addEventListener('resize', handleResize)
    handleResize()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    isMobile,
    handleResize,
  }
}
