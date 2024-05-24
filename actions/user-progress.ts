"use server"

import { getCourseBiId, getUserProgress } from "@/db/queries"
import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { PrefetchCacheEntryStatus } from "next/dist/client/components/router-reducer/router-reducer-types"
import { redirect } from "next/navigation"

const POINTS_TO_REFILL = 50

export const upsertUserProgress = async (courseId: number) => {
    const {userId} = await auth()
    const user = await currentUser()

    if (!userId || !user) {
        throw new Error("Не авторизован")
    }

    const course = await getCourseBiId(courseId)

    if (!course) {
        throw new Error("Курс не найден")
    }

    const existingUserProgress = await getUserProgress()

    if (existingUserProgress) {
        await db.user_progress.update({
            where: {
                id: userId
            },
            data: {
                activeCourseId: courseId,
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/user.png"
            }
        })

        revalidatePath("/courses")
        revalidatePath("/learn")

        redirect("/learn")
    }


    await db.user_progress.create({
        data: {
            id: userId,
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/user.png"
        }
    })

    await db.cos_uprog.create({
        data: {
            courseId: courseId,
            userProgressId: userId
        }
    })

    revalidatePath("/courses")
    revalidatePath("/learn")

    redirect("/learn")
}

export const reduceHearts = async (challengeId: number) => {
    const {userId} = await auth()

    if (!userId) {
        throw new Error("Не авторизован")
    }

    const challenge = await db.challenges.findFirst({
        where:{
            id: challengeId
        }
    })

    if(!challenge) {
        throw new Error ("Задание не найдено")
    }

    const lessonId = challenge.lessonId

    const currentUserProgress = await getUserProgress()

    const existingChallengeProgress = await db.challenge_progress.findFirst({
        where:{
            userId: userId,
            challengeId: challengeId
        }
    })

    const isPractice = !!existingChallengeProgress

    if (isPractice) {
        return {response: "practice"}
    }

    if (!PrefetchCacheEntryStatus) {
        throw new Error("Прогресс пользователя не найден")
    }

    if (currentUserProgress?.hearts === 0 || currentUserProgress?.hearts === undefined) {
        return {response: "hearts"}
    }

    await db.user_progress.update({
        where:{
            id: userId
        },
        data: {
            hearts: Math.max(currentUserProgress?.hearts - 1, 0)
        }
    })

    revalidatePath("/shop")
    revalidatePath("/learn")
    revalidatePath(`/lesson/${lessonId}`)
}

export const refillHearts = async() => {
    const currentUserProgress = await getUserProgress()

    if(!currentUserProgress) {
        throw new Error("Прогресс пользователя не найден")
    }

    if(currentUserProgress.hearts === 5) {
        throw new Error("Жизни уже заполнены")
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("Недостаточно очков")
    }

    await db.user_progress.update({
        where:{
            id: currentUserProgress.id
        },
        data: {
            hearts: 5,
            points: currentUserProgress.points - POINTS_TO_REFILL
        }
    })

    revalidatePath("/shop")
    revalidatePath("/learn")
}