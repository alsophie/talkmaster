import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { InfinityIcon } from "lucide-react"
import { courses } from "@prisma/client"

type Props = {
    activeCourse: courses 
    hearts: number
    points: number
}

export const UserProgress = ({activeCourse, points, hearts}:Props) => {
    return (
        <div className="flex items-center justify-between \
        gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image 
                        src={activeCourse.imageSrc}
                        alt={activeCourse.name}
                        className="rounded-md boarder" width={32} height={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="/points.png" height={28} width={28} alt="Points" className="mr-2" />
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="/heart.png" height={22} width={22} alt="Hearts" className="mr-2" />
                    {hearts}
                </Button>
            </Link>
        </div>
    )
}