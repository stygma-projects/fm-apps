import typescriptEslint from 'typescript-eslint'
import fmToolkitEslint from '@fm-monorepo/toolkit/eslint'

export default typescriptEslint.config(...fmToolkitEslint, {
  ignores: ['generated'],
})
