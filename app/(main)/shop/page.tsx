import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { UserProgress } from "@/components/use-progress"
import { getUserProgress, getCourseBiId } from "@/db/queries"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Items } from "./items"

const ShopPage = async () => {
    const userProgressData = getUserProgress()
    const [userProgress] = await Promise.all([userProgressData])
    
    if (!userProgress || !userProgress.activeCourseId) {
        redirect("/courses")
    }

    const course = await getCourseBiId(userProgress.activeCourseId)

    if (!course) {
        redirect("/courses")
    }

    return (
        <div className="flex flex-col lg:flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={course}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-start lg:pt-10">
                    <Image
                        src="/shop.png"
                        alt="Shop"
                        height={90}
                        width={90}
                    />
                    <h1 className="font-bold text-neutral-700 text-2xl pt-3 pl-3">
                        Магазин
                    </h1>
                    <p className="text-muted-foreground text-lg mb-6 pt-2 pl-3">
                        Поменяйте свои очки на что-то полезное
                    </p>
                    <Items
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                    />
                </div>
            </FeedWrapper>
        </div>
    )
}

export default ShopPage