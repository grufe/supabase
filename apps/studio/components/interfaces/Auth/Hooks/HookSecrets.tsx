import { useEffect } from 'react'
import { Input, Button } from 'ui'
import Panel from 'components/ui/Panel'

import {
  FormActions,
  FormHeader,
  FormPanel,
  FormSection,
  FormSectionContent,
  FormSectionLabel,
} from 'components/ui/Forms'

const HookSecrets = () => {
  return (
    <>
      <Panel
        title={
          <div className="space-y-3">
            <h5 className="text-base">Project API keys</h5>
            <p className="text-sm text-foreground-light">
              Your API is secured behind an API gateway which requires an API Key for every request.
              <br />
              You can use the keys below in the Supabase client libraries.
              <br />
            </p>
          </div>
        }
        disabled={true}
      >
        <Panel.Content>
          <Input
            readOnly
            disabled
            className="input-mono"
            copy={true}
            reveal={true}
            value={'test'}
            onChange={() => {}}
            descriptionText={'This is a key'}
          />
        </Panel.Content>
      </Panel>
    </>
  )
}
export default HookSecrets
