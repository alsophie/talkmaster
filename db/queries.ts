import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { cache } from "react"


export const getCourses = async() => {
    const courses = await db.courses.findMany()
    return courses
}

export const getUserProgress = async () => {
    const {userId} = await auth()

    if (!userId) {
        return null
    }

    const data = await db.user_progress.findFirst({
        where: {
            id: userId,
            activeCourseId: {not: null}
        }
    })
    return data
}

export const getCourseBiId = async (courseId: number) => {
    const data = await db.courses.findFirst({
        where: {
            id: courseId
        }
    })

    return data
}

export const getUnits = async () => {
    const {userId} = await auth()
    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId) {
      return []
    }
  
    const units = await db.units.findMany({
      where: { courseId: userProgress.activeCourseId },
      orderBy: { order: 'asc' }
    })
  
    const unitData = await Promise.all(
      units.map(async (unit) => {
        const lessons = await db.lessons.findMany({
          where: { unitId: unit.id },
          orderBy: { order: 'asc' }
        })
  
        const lessonsWithChallenges = await Promise.all(
          lessons.map(async (lesson) => {
            const challenges = await db.challenges.findMany({
              where: { lessonId: lesson.id },
              orderBy: { order: 'asc' }
            })
  
            const challengesWithProgress = await Promise.all(
              challenges.map(async (challenge) => {
                const challengeProgress = await db.challenge_progress.findMany({
                  where: { challengeId: challenge.id }
                })
  
                return {
                  ...challenge,
                  challenge_progress: challengeProgress
                }
              })
            )
  
            const completed = challengesWithProgress.length > 0 ?
            challengesWithProgress.every(challenge => 
                challenge.challenge_progress.length > 0 &&
                challenge.challenge_progress.every(progress => progress.completed)
            ) :
            false

            return {
              ...lesson,
              challenges: challengesWithProgress,
              completed
            }
          })
        )
  
        return {
          ...unit,
          lessons: lessonsWithChallenges
        }
      })
    )
  
    return unitData;
  }

export const getCourseProgress = async () => {
    const { userId } = await auth()
    const userProgress = await getUserProgress()
  
    if (!userId || !userProgress?.activeCourseId) {
      return null
    }
  
    const units = await db.units.findMany({
      orderBy: { order: 'asc' },
      where: { courseId: userProgress.activeCourseId }
    })
  
    const unitsWithLessons = await Promise.all(
      units.map(async (unit) => {
        const lessons = await db.lessons.findMany({
          where: { unitId: unit.id },
          orderBy: { order: 'asc' }
        })
  
        const lessonsWithUnit = await Promise.all(
          lessons.map(async (lesson) => {
            const unit = lesson.unitId ? await db.units.findUnique({ where: { id: lesson.unitId } }) : null
  
            const challenges = await db.challenges.findMany({
              where: { lessonId: lesson.id }
            })
  
            const challengesWithProgress = await Promise.all(
              challenges.map(async (challenge) => {
                const challengeProgress = await db.challenge_progress.findMany({
                  where: { challengeId: challenge.id, userId }
                })
  
                return {
                  ...challenge,
                  challenge_progress: challengeProgress
                }
              })
            )
  
            return {
              ...lesson,
              unit,
              challenges: challengesWithProgress
            }
          })
        )
  
        return {
          ...unit,
          lessons: lessonsWithUnit
        }
      })
    )
  
    const firstUncompletedLesson = unitsWithLessons
      .flatMap((unit) => unit.lessons)
      .find((lesson) => {
        return lesson.challenges.some(
          (challenge) => !challenge.challenge_progress || challenge.challenge_progress.length === 0 ||
          challenge.challenge_progress.some(progress => progress.completed === 0)
        )
      })
  
    return {
      activeLesson: firstUncompletedLesson,
      activeLessonId: firstUncompletedLesson?.id
    }
  }

export const getLesson = async (id?: number) => {
    const { userId } = await auth()
    if (!userId) {
      return null
    }
  
    const courseProgress = await getCourseProgress()
    const lessonId = id || courseProgress?.activeLessonId
    if (!lessonId) {
      return null
    }

    const typedLessonId = typeof lessonId === 'string' ? parseInt(lessonId, 10) : lessonId
  
    const lesson = await db.lessons.findUnique({
      where: { id: typedLessonId }
    })
  
    if (!lesson) {
      return null
    }

    const unit = lesson.unitId
    ? await db.units.findUnique({ where: { id: lesson.unitId } })
    : null
  
    const challenges = await db.challenges.findMany({
      where: { lessonId: lesson.id },
      orderBy: { order: 'asc' }
    })
  
    const challengesWithOptions = await Promise.all(
      challenges.map(async (challenge) => {
        const challengeOptions = await db.challenge_options.findMany({
          where: { challengeId: challenge.id }
        })
  
        return {
          ...challenge,
          challengeOptions
        }
      })
    )
  
    const challengesWithProgress = await Promise.all(
      challengesWithOptions.map(async (challenge) => {
        const challengeProgress = await db.challenge_progress.findMany({
          where: { challengeId: challenge.id, userId }
        })
  
        const completed =
          challengeProgress.length > 0 &&
          challengeProgress.every((progress) => progress.completed)
  
        return {
          ...challenge,
          challengeProgress,
          completed
        }
      })
    )
  
    return {
      ...lesson,
      unit,
      challenges: challengesWithProgress
    }
  }

  export const getLessonPercentage = async () => {
    const courseProgress = await getCourseProgress()

    if(!courseProgress?.activeLessonId) {
        return 0
    }

    const lesson = await getLesson(courseProgress.activeLessonId)

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.challenges
    .filter(challenge => challenge.completed)
    const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100)

    return percentage
  }
