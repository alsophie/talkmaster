"use server"

import { getUserProgress } from "@/db/queries"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const upsertChallengeProgress = async (challengeId: number) => {
    const {userId} = await auth()

    if (!userId) {
        throw new Error("Не авторизован")
    }

    const currentUserProgress = await getUserProgress()
    
    if(!currentUserProgress) {
        throw new Error ("Прогресс пользователя не найден")
    }

    const challenge = await db.challenges.findFirst({
        where: {
            id: challengeId
        }
    })

    if(!challenge) {
        throw new Error ("Задание не найдено")
    }

    const lessonId = challenge.lessonId

    const existingChallengeProgress = await db.challenge_progress.findFirst({
        where:{
            userId: userId,
            challengeId: challengeId
        }
    })

    const isPractice = !!existingChallengeProgress

    if (currentUserProgress.hearts === 0 && !isPractice) {
        return {response: "hearts"}
    }

    if (isPractice) {
        await db.challenge_progress.update({
            where: {
                id: existingChallengeProgress.id
            },
            data:{
                completed: 1
            }
        })

        await db.user_progress.update({
            where:{
                id: userId
            },
            data: {
                hearts: Math.min(currentUserProgress.hearts + 1, 5),
                points: currentUserProgress.points + 10
            }
        })

        revalidatePath("/learn")
        revalidatePath("/lesson")
        revalidatePath(`/lesson/${lessonId}`)
        return
    }

    await db.challenge_progress.create({
        data:{
            challengeId,
            userId,
            completed: 1
        }
    })

    await db.user_progress.update({
        where:{
            id: userId
        },
        data: {
            points: currentUserProgress.points + 10
        }
    })

    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath(`/lesson/${lessonId}`)

}