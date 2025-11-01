"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface DurationOption {
  value: string
  label: string
}

interface DurationFilterProps {
  options: DurationOption[]
  selectedDurations: string[]
  onDurationChange: (durations: string[]) => void
}

export default function DurationFilter({ options, selectedDurations, onDurationChange }: DurationFilterProps) {
  const handleToggle = (value: string) => {
    const updated = selectedDurations.includes(value)
      ? selectedDurations.filter((d) => d !== value)
      : [...selectedDurations, value]
    onDurationChange(updated)
  }

  return (
    <Card className="p-6 bg-card border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Duration</h3>

      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-3">
            <Checkbox
              id={option.value}
              checked={selectedDurations.includes(option.value)}
              onCheckedChange={() => handleToggle(option.value)}
              className="rounded border-primary"
            />
            <Label
              htmlFor={option.value}
              className="text-sm font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </div>

      {selectedDurations.length > 0 && (
        <button
          onClick={() => onDurationChange([])}
          className="mt-4 w-full text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Clear filters
        </button>
      )}
    </Card>
  )
}
