import {NextResponse} from "next/server"

import { db } from "@/lib/db"
import { getIsAdmin } from "@/lib/admin"

export const GET = async () => {
    if (!getIsAdmin()) return new NextResponse("Не авторизован", {status: 401})
    
    try {
        const data = await db.challenge_progress.findMany()

        return NextResponse.json(data)
    } catch (error) {
        console.error(error)
        return new NextResponse("Ошибка при получении записей", { status: 500 })
    }
    
}