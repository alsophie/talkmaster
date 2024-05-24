
import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/use-progress"
import { getCourseBiId, getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import { Unit } from "./unit"



const LearnPage = async () => {
    const userProgressData = await getUserProgress()

    const unitsData = getUnits()

    const courseProgressData = getCourseProgress()
    const lessonPercentageData = getLessonPercentage()

    const [userProgress, units, courseProgress, lessonPercentage] = await 
    Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData])

    if (!userProgress || !userProgress.activeCourseId) {
        redirect("/courses")
    }

    if (!courseProgress) {
        redirect("/courses")
    }

    if ((await unitsData).length == 0) {
        throw new Error ("Ошибка")
    }

    const course = await getCourseBiId(userProgress.activeCourseId)
    
    if (!course) {
        redirect("/courses")
    }

    return (
        <div className="flex mt-[-40px] lg:mt-0 gap-[48px] px-6 flex-col-reverse lg:flex-row"> 
            <FeedWrapper>
                <Header title={course.name} />
                {units.map((unit: any) => (
                    <div key={unit.id} className="mb-10">
                        <Unit 
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPresentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress 
                    activeCourse={course}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                />
            </StickyWrapper>
            <div>

            </div>
        </div>
    )
}

export default LearnPage