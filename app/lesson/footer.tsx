import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    onCheck: () => void
    status: "correct" | "wrong" | "none" | "completed"
    disabled?: boolean
    lessonId?: number
}

export const Foooter = ({onCheck, status,
disabled, lessonId}: Props) => {
    
    return (
        <footer className={cn(
            "lg:-h[140px] h-[100px] border-t-2",
            status === "correct" && "border-transparent bg-green-100",
            status === "wrong" && "border-transparent bg-red-100"
        )}>
            <div className="max-w-[1140px] h-full mx-auto flex items-center \
            justify-between px-6 lg:px-10">
                {status === "correct" && (
                    <div className="text-green-500 font-bold text-base \
                    lg:text-2xl flex items-center">
                        <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Хорошая работа! 
                    </div>
                )}
                {status === "wrong" && (
                    <div className="text-red-500 font-bold text-base \
                    lg:text-2xl flex items-center">
                        <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                        Упс... Попробуйте ещё раз!
                    </div>
                )}
                {status === "completed" && (
                    <Button variant="default"
                    onClick={() =>  window.location.href = `/lesson/${lessonId}`}>
                        Пройти ещё раз
                    </Button>
                )}
                <Button disabled={disabled} className="ml-auto"
                onClick={onCheck} variant={status === "wrong" ? "danger" : (status === "none" ? "primary" : "secondary")}
                >
                    {status === "none" && "Проверить"}
                    {status === "correct" && "Дальше"}
                    {status === "wrong" && "Попробовать снова"}
                    {status === "completed" && "Продолжить"}
                </Button>
            </div>
        </footer>
    )
}
