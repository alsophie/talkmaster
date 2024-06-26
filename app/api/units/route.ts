import {NextResponse} from "next/server"

import { db } from "@/lib/db"
import { getIsAdmin } from "@/lib/admin"

export const GET = async () => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})
    
    try {
        const data = await db.units.findMany()

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при получении записей", { status: 500 })
    }
    
}

export const POST = async (req: Request) => {
    if (!await getIsAdmin()) return new NextResponse("Не авторизован или нет необходимых прав", {status: 401})

    try {
        const body = await req.json()

        const data = await db.units.create({
            data: {
                ...body,
            },
        })

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при создании записи", { status: 500 })
    }
}