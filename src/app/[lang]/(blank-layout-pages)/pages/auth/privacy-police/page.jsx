import PrivacyPolicy from '@/views/PrivacyPolicy'

import { getServerMode } from '@core/utils/serverHelpers'

const PrivacyPolicyPage = async () => {
  const mode = await getServerMode()

  return <PrivacyPolicy mode={mode} />
}

export default PrivacyPolicyPage
