import { Check, ChevronsUpDown } from 'lucide-react'
import { noop } from 'lodash'
import { useState } from 'react'
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
} from 'ui'

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
  description,
}: {
  id: string
  isLoading: boolean
  disabled?: boolean
  description: string
  className?: string
}) {
  const [selectedHookType, setSelectedHookType] = useState('http')
  const [open, setOpen] = useState(false)
  const name = 'Hook Type'
  const options = [
    { displayName: 'HTTP Hook', value: 'http' },
    { displayName: 'Postgres Hook', value: 'postgres' },
  ]
  const onSelectOption = (opt) => setSelectedHookType(opt)

  const selectedOptionDisplayName = options.find(
    (option) => option.value === selectedOption
  )?.displayName

  return (
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
                    onSelectOption(selectedValue)
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
    /* {selectedSendEmailHookType === 'postgres' ? (

     *            <SchemaFunctionSelector
     *                id={id}
     *                descriptionText={descriptionText}
     *                values={values}
     *                setFieldValue={setFieldValue}
     *                disabled={!canUpdateConfig}
     *            />) : selectedSendEmailHookType === 'http' ?
     *  (
     *    <>
     *      <Input label={'HTTP Hook URL'} placeholder="https://app.supabase.co/functions/v1" value={'https://www.app.supabase.co/functions/v1/sms_sender'} />
     *  <Input
     *      readOnly
     *      disabled
     *      className="input-mono"
     *      copy={true}
     *      label={'HTTP Hook Secret'}
     *      reveal={true}
     *      value={'test'}
     *      onChange={() => {}}
     *  />
     *  </>): null
     * } */
  )
}

export default HookSelector
