import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    {params}: {params: {challengeProgressId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const challengeProgressId = parseInt(params.challengeProgressId, 10) 
        if (isNaN(challengeProgressId)) throw new Error("Некорректный course ID")

        const data = await db.challenge_progress.findFirst({
            where: {
                id: challengeProgressId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при получении записи", { status: 500 })
    }    
}

export const PUT = async (
    req: Request,
    {params}: {params: {challengeProgressId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})

    try {
        const body = await req.json()
        const challengeProgressId = parseInt(params.challengeProgressId, 10) 
        if (isNaN(challengeProgressId)) throw new Error("Некорректный course ID")

        const data = await db.challenge_progress.update({
            where: {
                id: challengeProgressId
            },
            data: {
                ...body,
            },
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при изменении записи", { status: 500 })
    }
}


export const DELETE = async (
    req: Request,
    {params}: {params: {challengeProgressId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const challengeProgressId = parseInt(params.challengeProgressId, 10) 
        if (isNaN(challengeProgressId)) throw new Error("Некорректный course ID")

        const data = await db.challenge_progress.delete({
            where: {
                id: challengeProgressId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при удалении записи", { status: 500 })
    }    
}