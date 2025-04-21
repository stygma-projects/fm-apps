import typescriptEslint from 'typescript-eslint'
import nodeToolkit from '@vfourny/node-toolkit/eslint'

export default typescriptEslint.config(...nodeToolkit)
