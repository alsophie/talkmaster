import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    {params}: {params: {courseId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const courseId = parseInt(params.courseId, 10) 
        if (isNaN(courseId)) throw new Error("Некорректный course ID")

        const data = await db.courses.findFirst({
            where: {
                id: courseId
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
    {params}: {params: {courseId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})

    try {
        const body = await req.json()
        const courseId = parseInt(params.courseId, 10) 
        if (isNaN(courseId)) throw new Error("Некорректный course ID")

        const data = await db.courses.update({
            where: {
                id: courseId
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
    {params}: {params: {courseId: string}}
) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    try {
        const courseId = parseInt(params.courseId, 10) 
        if (isNaN(courseId)) throw new Error("Некорректный course ID")

        const data = await db.courses.delete({
            where: {
                id: courseId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при удалении записи", { status: 500 })
    }    
}