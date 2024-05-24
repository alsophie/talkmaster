"use client"
import { Dialog, DialogContent,
DialogDescription, DialogFooter,
DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useExitModal } from "@/store/use-exit-modal"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const ExitModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const {isOpen, close} = useExitModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return null
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/green-ninja.png" alt="Ninja" height={80} width={80} />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl text-green-700">
                        Стоп, не уходите!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base text-s">
                        Вы сейчас покинете урок. Уверены?
                    </DialogDescription>
                    <DialogFooter>
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button variant="secondary" className="w-full mt-5" size="lg" onClick={close}>
                                Продолжить урок
                            </Button>
                            <Button variant="dangerOutline" className="w-full mt-[-10px]" size="lg" onClick={() => {
                                close()
                                router.push("/learn")
                            }}>
                                Покинуть урок
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}