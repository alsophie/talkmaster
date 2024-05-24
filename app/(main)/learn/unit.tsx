import { lessons, units } from "@prisma/client"
import { UnitBanner } from "./unit-banner"
import { LessonButton } from "./lesson-button";

interface LessonWithCompletion extends lessons {
    completed: boolean;
}

interface LessonWithUnits extends lessons {
    unit: units | null
}


type Props = {
    id: number
    order: number
    title: string
    description: string
    lessons: LessonWithCompletion[]
    activeLesson: LessonWithUnits | undefined
    activeLessonPresentage: number
}

export const Unit = ({id, order, title, description,
lessons, activeLesson, activeLessonPresentage}: Props) => {
    return (
       <>
            <UnitBanner title={title} description={description} />
            <div className="flex items-center flex-col relative">
                {lessons.map((lesson, index) => {
                    const isCurrent = lesson.id === activeLesson?.id
                    const isLocked = !lesson.completed && !isCurrent

                    return (
                        <LessonButton 
                            key={lesson.id}
                            id={lesson.id}
                            index={index}
                            totalCount={lessons.length-1}
                            current={isCurrent}
                            locked={isLocked}
                            percentage={activeLessonPresentage}
                        />
                    )
                })}
            </div>
       </> 
    )
}