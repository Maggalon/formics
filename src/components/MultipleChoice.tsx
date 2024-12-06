import { cn } from "../utils/cn"
import { useState } from "react"

interface Choice {
  id: string
  content: string
}

interface MultipleChoiceProps {
  choices: Choice[]
  multiSelect?: boolean
  onChange: (selected: string[]) => void
  className?: string
}

export default function MultipleChoice({
  choices,
  multiSelect = false,
  onChange,
  className,
}: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string[]>([])

  const handleSelect = (choiceId: string) => {
    if (multiSelect) {
      setSelected((prev) => {
        const isSelected = prev.includes(choiceId)
        const newSelection = isSelected
          ? prev.filter((id) => id !== choiceId)
          : [...prev, choiceId]
        onChange(newSelection)
        return newSelection
      })
    } else {
      setSelected([choiceId])
      onChange([choiceId])
    }
  }

  return (
    <div className={cn("flex flex-col space-y-2", className)}>
      {choices.map((choice) => (
        <div
          key={choice.id}
          className={cn(
            "p-2 flex items-center bg-white/30 rounded-lg",
            selected.includes(choice.id) &&
              "bg-white/70"
          )}
          onClick={() => handleSelect(choice.id)}
          aria-pressed={selected.includes(choice.id)}
        >
          <span className={cn("mr-4 flex-none text-md border-2 h-8 w-8 flex justify-center items-center rounded-lg",
            selected.includes(choice.id) && "border-[#0083B0] bg-[#0083B0] text-white"
          )}>{choice.id}</span>
          <span className="text-lg flex-1">{choice.content}</span>
        </div>
      ))}
    </div>
  )
}