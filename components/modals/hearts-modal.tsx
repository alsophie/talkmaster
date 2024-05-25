"use client"
import { Dialog, DialogContent,
DialogDescription, DialogFooter,
DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useHeartsModal } from "@/store/use-hearts-modal.ts"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const HeartsModal = () => {
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)
    const {isOpen, close} = useHeartsModal()

    useEffect(() => setIsClient(true), [])

    if (!isClient) {
        return null
    }

    return(
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/ninja-hearts.png" alt="Ninja" height={80} width={80} />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl text-red-500">
                        У вас закончились жизни!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base text-s text-red-900">
                        Купите их в магазине.
                    </DialogDescription>
                    <DialogFooter>
                        <div className="flex flex-col gap-y-4 w-full">
                            <Button variant="secondary" className="w-full mt-5" size="lg" onClick={() => {
                                close()
                                router.push("/shop")
                            }}>
                                Преобрести жизни
                            </Button>
                            <Button variant="primaryOutline" className="w-full mt-[-10px]" size="lg" onClick={close}>
                                Нет, спасибо
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}