import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    {params}: {params: {lessonId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const lessonId = parseInt(params.lessonId, 10) 
        if (isNaN(lessonId)) throw new Error("Некорректный course ID")

        const data = await db.lessons.findFirst({
            where: {
                id: lessonId
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
    {params}: {params: {lessonId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})

    try {
        const body = await req.json()
        const lessonId = parseInt(params.lessonId, 10) 
        if (isNaN(lessonId)) throw new Error("Некорректный course ID")

        const data = await db.lessons.update({
            where: {
                id: lessonId
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
    {params}: {params: {lessonId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const lessonId = parseInt(params.lessonId, 10) 
        if (isNaN(lessonId)) throw new Error("Некорректный course ID")

        const data = await db.lessons.delete({
            where: {
                id: lessonId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при удалении записи", { status: 500 })
    }    
}