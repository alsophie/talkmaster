import { challenge_options } from "@prisma/client"
import { Card } from "./card"

type Props = {
    options: challenge_options[]
    onSelect: (id: number) => void
    status: "correct" | "wrong" | "none"
    selectedOption?: number
    disabled?: boolean
}

export const Challenge = ({options, onSelect,
status, selectedOption, disabled}: Props) => {
    return (
        <div className="grid gap-2 grid-cols-2 \
        lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
            {options.map((option, i) => (
                <Card 
                    key={option.id}
                    id={option.id}
                    text={option.text}
                    selected={selectedOption === option.id}
                    onClick={() => onSelect(option.id)}
                    status={status}
                    disabled={disabled}
                />
            ))}
        </div>
    )
}