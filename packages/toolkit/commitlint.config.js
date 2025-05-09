import { createCommitlintMonorepoConfig } from '@vfourny/node-toolkit/commitlint'

const scopes = [
  'fm-orders',
  'fm-panel',
  'fm-api',
  'db',
  'toolkit',
  'trpc',
  'fm-apps',
  'ui',
]

export default createCommitlintMonorepoConfig({
  scopes,
})
