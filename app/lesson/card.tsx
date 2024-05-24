import { cn } from "@/lib/utils"
import { useCallback } from "react"

type Props = {
    id: number
    text: string
    selected?: boolean
    onClick: () => void
    disabled?: boolean
    status?: "correct" | "wrong" | "none"
}

export const Card = ({id, text,
selected, onClick, disabled, status}: Props) => {

    const handleClick = useCallback(() => {
        if (disabled) return
        onClick()
    }, [disabled, onClick])

    return (
        <div onClick={handleClick}
        className={cn(
            "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 \
            p-4 lg:p-6 cursor-pointer active:border-b-2",
            selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
            selected && status === "correct"
            && "border-green-300 bg-green-100 hover:bg-green-100",
            selected && status === "wrong"
            && "border-red-300 bg-red-100 hover:bg-red-100",
            disabled && "pointer-events-none hover:bg-white"
        )}>
            <p className={cn(
                "text-neutral-600 text-sm lg:text-base",
                selected && "text-sky-500",
                selected && status === "correct"
                && "text-green-500",
                selected && status === "wrong"
                && "text-red-500"
            )}>
                {text}
            </p>
        </div>
    )
}