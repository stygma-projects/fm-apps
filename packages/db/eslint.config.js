import typescriptEslint from 'typescript-eslint'
import fmToolkitEslint from '@fm-apps/toolkit/eslint'

export default typescriptEslint.config(...fmToolkitEslint, {
  ignores: ['generated'],
})
