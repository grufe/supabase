import { Check, ChevronsUpDown } from 'lucide-react'
import { noop } from 'lodash'
import { useState } from 'react'
import { useCheckPermissions } from 'hooks'
import { PermissionAction } from '@supabase/shared-types/out/constants'
import {
  Button_Shadcn_ as Button,
  Popover_Shadcn_ as Popover,
  PopoverTrigger_Shadcn_ as PopoverTrigger,
  PopoverContent_Shadcn_ as PopoverContent,
  Command_Shadcn_ as Command,
  CommandInput_Shadcn_ as CommandInput,
  CommandEmpty_Shadcn_ as CommandEmpty,
  CommandItem_Shadcn_ as CommandItem,
  CommandGroup_Shadcn_ as CommandGroup,
  cn,
  ScrollArea,
  Toggle,
  Input,
} from 'ui'
import SchemaFunctionSelector from './SchemaFunctionSelector'

export interface ComboBoxOption {
  id: string
  value: string
  displayName: string
}

export function HookSelector<Opt extends ComboBoxOption>({
  isLoading,
  disabled,
  selectedOption,
  className,
  id,
  values,
  setFieldValue,
  descriptionText,
  hookType,
}: {
  id: string
  isLoading: boolean
  values: any
  selectedOption: string
  setFieldValue: (field: string, value: any) => void
  disabled?: boolean
  descriptionText: string
  hookType?: string
  className?: string
}) {
  const canUpdateConfig = useCheckPermissions(PermissionAction.UPDATE, 'custom_config_gotrue')
  const [selectedHookType, setSelectedHookType] = useState(hookType)
  const [HTTPHookURI, setHTTPHookURI] = useState('')
  const [open, setOpen] = useState(false)
  const name = 'Hook Type'
  const initialOptions = [
    { displayName: 'HTTP Hook', value: 'http' },
    { displayName: 'Postgres Hook', value: 'postgres' },
  ]
  const options =
    hookType === '' ? initialOptions : initialOptions.filter((option) => option.value == hookType)

  const selectedOptionDisplayName = options.find(
    (option) => option.value === selectedHookType
  )?.displayName

  return (
    <>
      {(values[`${id}_URI`] || selectedHookType === 'http') && (
        <Toggle
          id={`${id}_ENABLED`}
          size="medium"
          label="Enable hook"
          layout="flex"
          disabled={!canUpdateConfig}
        />
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            disabled={disabled}
            aria-expanded={open}
            className={cn(
              'overflow-hidden',
              'h-auto min-h-10',
              'flex justify-between',
              'border-none',
              'py-0 pl-0 pr-1 text-left',
              className
            )}
          >
            {isLoading
              ? 'Loading...'
              : options.length === 0
              ? `No ${name} found`
              : selectedOptionDisplayName ?? `Select a ${name}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="bottom">
          <Command>
            <CommandInput placeholder={`Search ${name}...`} className="border-none ring-0" />
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className={options.length > 10 ? 'h-[280px]' : ''}>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.value}
                    onSelect={(selectedValue: string) => {
                      setOpen(false)
                      setSelectedHookType(selectedValue)
                    }}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        selectedOption === option.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {option.displayName}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectedHookType === 'postgres' ? (
        <SchemaFunctionSelector
          id={`${id}_POSTGRES_FUNCTION_SELECTOR`}
          descriptionText={descriptionText}
          values={values}
          setFieldValue={setFieldValue}
          disabled={disabled}
        />
      ) : selectedHookType === 'http' ? (
        <>
          <Input
            id={`${id}_URI]`}
            label={'HTTP Hook URL'}
            placeholder="https://app.supabase.co/functions/v1/hello_world"
            value={HTTPHookURI}
            onChange={({ target: { value } }) => setHTTPHookURI(value)}
          />
          <Input
            id={`${id}_SECRETS]`}
            readOnly
            disabled
            className="input-mono"
            copy={true}
            label={'HTTP Hook Secret'}
            reveal={true}
            value={values[`${id}_SECRETS`]}
          />
        </>
      ) : null}
    </>
  )
}

export default HookSelector
