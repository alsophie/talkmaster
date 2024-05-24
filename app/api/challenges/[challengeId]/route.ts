import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    {params}: {params: {challengeId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})
    try {
        const challengeId = parseInt(params.challengeId, 10) 
        if (isNaN(challengeId)) throw new Error("Некорректный course ID")

        const data = await db.challenges.findFirst({
            where: {
                id: challengeId
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
    {params}: {params: {challengeId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})

    try {
        const body = await req.json()
        const challengeId = parseInt(params.challengeId, 10) 
        if (isNaN(challengeId)) throw new Error("Некорректный course ID")

        const data = await db.challenges.update({
            where: {
                id: challengeId
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
    {params}: {params: {challengeId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})
    try {
        const challengeId = parseInt(params.challengeId, 10) 
        if (isNaN(challengeId)) throw new Error("Некорректный course ID")

        const data = await db.challenges.delete({
            where: {
                id: challengeId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при удалении записи", { status: 500 })
    }    
}