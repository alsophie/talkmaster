import { getIsAdmin } from "@/lib/admin"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = async (
    req: Request,
    {params}: {params: {unitId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})
    try {
        const unitId = parseInt(params.unitId, 10) 
        if (isNaN(unitId)) throw new Error("Некорректный course ID")

        const data = await db.units.findFirst({
            where: {
                id: unitId
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
    {params}: {params: {unitId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})

    try {
        const body = await req.json()
        const unitId = parseInt(params.unitId, 10) 
        if (isNaN(unitId)) throw new Error("Некорректный course ID")

        const data = await db.units.update({
            where: {
                id: unitId
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
    {params}: {params: {unitId: string}}
) => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})
    try {
        const unitId = parseInt(params.unitId, 10) 
        if (isNaN(unitId)) throw new Error("Некорректный course ID")

        const data = await db.units.delete({
            where: {
                id: unitId
            }
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при удалении записи", { status: 500 })
    }    
}