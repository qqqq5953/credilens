
import { useState, MouseEvent, KeyboardEvent, forwardRef } from 'react'
import { cn } from "@/lib/utils"

import { Check, X, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge";


export type OptionType = {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = forwardRef(({ options, selected, onChange, placeholder, className, ...props }, ref) => {
  const [open, setOpen] = useState(false)

  const handleUnselect = (e:
    MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <div
          role="combobox"
          tabIndex={0}
          aria-expanded={open}
          className={`flex items-center justify-between w-full border rounded-lg bg-white px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${selected.length > 1 ? "h-full py-2" : "h-10"}`}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setOpen(!open)
          }}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            {selected.length ? selected.map((item) => (
              <Badge
                variant="secondary"
                key={item}
              // onClick={(e) => handleUnselect(e, item)}
              >
                {item}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUnselect(e, item);
                  }}
                  onClick={(e) => handleUnselect(e, item)}
                // onMouseDown={(e) => {
                //   e.preventDefault();
                //   e.stopPropagation();
                // }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            )) :
              <div className='text-sm text-neutral-500'>{placeholder}</div>
            }
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className='max-h-64 overflow-auto'>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  )
                  setOpen(true)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selected.includes(option.value) ?
                      "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
})


export { MultiSelect }
