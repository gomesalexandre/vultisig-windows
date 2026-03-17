import { Button } from '@lib/ui/buttons/Button'
import { VStack } from '@lib/ui/layout/Stack'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useCoreNavigate } from '../../../navigation/hooks/useCoreNavigate'
import {
  FastVaultPasswordModal,
  FastVaultPasswordModalResult,
} from '../../fast/FastVaultPasswordModal'
import { StartKeysignPromptProps } from './StartKeysignPromptProps'

export const FastVaultStartKeysignPrompt = (props: StartKeysignPromptProps) => {
  const { t } = useTranslation()
  const navigate = useCoreNavigate()
  const [showModal, setShowModal] = useState(false)

  const keysignPayload =
    'keysignPayload' in props ? props.keysignPayload : undefined

  const onGetPassword = useCallback(
    ({ password }: FastVaultPasswordModalResult) => {
      navigate({
        id: 'keysign',
        state: {
          ...props,
          keysignPayload: shouldBePresent(keysignPayload),
          securityType: 'fast',
          password,
        },
      })
    },
    [props, keysignPayload, navigate]
  )

  const buttonProps = useMemo(() => {
    if (!keysignPayload) {
      return {
        disabled: 'disabledMessage' in props ? props.disabledMessage : true,
      }
    }

    return {
      onClick: () => setShowModal(true),
    }
  }, [keysignPayload, props])

  return (
    <VStack gap={12}>
      <Button {...buttonProps}>{t('fast_sign')}</Button>
      <FastVaultPasswordModal
        showModal={showModal}
        onBack={() => setShowModal(false)}
        onFinish={onGetPassword}
        description={t('fast_vault_password_start_keysign_description')}
        withPasswordCache
      />
    </VStack>
  )
}
