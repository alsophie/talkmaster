import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    {params}: {params: {challengeOptionId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const challengeOptionId = parseInt(params.challengeOptionId, 10) 
        if (isNaN(challengeOptionId)) throw new Error("Некорректный course ID")

        const data = await db.challenge_options.findFirst({
            where: {
                id: challengeOptionId
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
    {params}: {params: {challengeOptionId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})

    try {
        const body = await req.json()
        const challengeOptionId = parseInt(params.challengeOptionId, 10) 
        if (isNaN(challengeOptionId)) throw new Error("Некорректный course ID")

        const data = await db.challenge_options.update({
            where: {
                id: challengeOptionId
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
    {params}: {params: {challengeOptionId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const challengeOptionId = parseInt(params.challengeOptionId, 10) 
        if (isNaN(challengeOptionId)) throw new Error("Некорректный course ID")

        const data = await db.challenge_options.delete({
            where: {
                id: challengeOptionId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при удалении записи", { status: 500 })
    }    
}