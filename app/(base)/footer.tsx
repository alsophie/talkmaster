import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full \
        border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/uk.png" alt="France" height={32} width={40} className="mr-4 rounded-md" />
                    English
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/france.png" alt="France" height={32} width={40} className="mr-4 rounded-md" />
                    French
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/south-korea.png" alt="France" height={32} width={40} className="mr-4 rounded-md" />
                    Korean
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/spain.png" alt="France" height={32} width={40} className="mr-4 rounded-md" />
                    Spanish
                </Button>
            </div>
        </footer>
    )
}