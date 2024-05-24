"use client"

import {courses, user_progress} from "@prisma/client"
import { Card } from "./card"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { upsertUserProgress } from "@/actions/user-progress"
import { toast } from "sonner"


type Props = {
    courses:  courses[]
    activeCourseId?: user_progress['activeCourseId']
}

export const List = ({courses, activeCourseId}: Props) => {
    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const onClick = (id: number) => {
        if (pending) return

        if (id === activeCourseId) {
            return router.push("/learn")
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => toast.error("Что-то опшло не так"))
        })
    }

    return (
        <div className="pt-6 grid grid-cols-2 \
        lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card 
                    key={course.id}
                    id={course.id}
                    name={course.name}
                    imageSrc={course.imageSrc}
                    onClick={onClick}
                    disabled={pending}
                    active={course.id === activeCourseId}
                />
            ))}
        </div>
    )
}
