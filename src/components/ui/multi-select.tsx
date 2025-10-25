import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

interface MultiSelectProps {
  options: { value: string; label: string }[]
  selected: string[]
  onSelectionChange: (selected: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function MultiSelect({
  options,
  selected,
  onSelectionChange,
  placeholder = "Select options...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [selectedOption, setSelectedOption] = React.useState("")

  const handleSelect = (value: string) => {
    if (!selected.includes(value)) {
      onSelectionChange([...selected, value])
    }
    setSelectedOption("")
  }

  const handleRemove = (valueToRemove: string) => {
    onSelectionChange(selected.filter((item) => item !== valueToRemove))
  }

  const availableOptions = options.filter(option => !selected.includes(option.value))

  return (
    <div className={cn("space-y-2", className)}>
      <Select
        value={selectedOption}
        onValueChange={handleSelect}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {availableOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map((value) => {
            const label = options.find((option) => option.value === value)?.label || value
            return (
              <Badge key={value} variant="secondary" className="flex items-center gap-1">
                {label}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleRemove(value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
} 