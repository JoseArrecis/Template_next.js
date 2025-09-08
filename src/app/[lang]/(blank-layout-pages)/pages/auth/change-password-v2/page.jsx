import ChangePasswordV2 from '@/views/pages/auth/ChangePasswordV2'
import { getServerMode } from '@core/utils/serverHelpers'

const ChangePasswordV2Page = async () => {
  const mode = await getServerMode()
  return <ChangePasswordV2 mode={mode} />
}

export default ChangePasswordV2Page
