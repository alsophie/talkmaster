import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2gXNjhRRgArMPEah9hXWSGsM6Ge"
]

export const getIsAdmin = async () => {
    const {userId} = await auth()

    if (!userId) return false

    return adminIds.indexOf(userId) !== -1
}