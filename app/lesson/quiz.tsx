"use client"

import { challenge_options, challenges } from "@prisma/client"
import { useEffect, useState, useTransition } from "react"
import { Header } from "./header"
import { QuestionBubble } from "./question-bubble"
import { Challenge } from "./challenge"
import { Foooter } from "./footer"
import { upsertChallengeProgress } from "@/actions/challenge-progress"
import { toast } from "sonner"
import { reduceHearts } from "@/actions/user-progress"
import Image from "next/image"
import { ResultCard } from "./result-card"
import { useRouter } from "next/navigation"
import Confetti from "react-confetti"
import { useHeartsModal } from "@/store/use-hearts-modal.ts"

type Props = {
    initialPercentage: number
    initialHearts: number
    initialLessonId: number
    initialLessonChallenges: (challenges & {
        completed: boolean
        challengeOptions: challenge_options[]
    })[]
    userSubscription: any
}

export const Quiz = ({initialPercentage,
initialHearts, initialLessonId, initialLessonChallenges,
userSubscription}: Props) => {

    const {open: openHeartsModal} = useHeartsModal()

    const router = useRouter()
    const [pending, startTransition] = useTransition()

    const[lessonId] = useState(initialLessonId)
    const [hearts, setHearts] = useState(initialHearts)
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage
    })
    const [challenges] = useState(initialLessonChallenges)
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex(challenge => !challenge.completed)
        return uncompletedIndex === -1 ? 0 : uncompletedIndex
    })

    const [selectedOption, setSelectedOption] = useState<number>()
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none")

    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0
    });
    
    useEffect(() => {
    if (typeof window !== 'undefined') {
        const handleResize = () => {
        setWindowDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }
    }, []);

    const challenge = challenges[activeIndex]
    const options = challenge?.challengeOptions ?? []

    const onNext = () => {
        setActiveIndex(current => current + 1)
    }

    const onSelect = (id: number) => {
        if (status !== "none") return

        setSelectedOption(id)
    }

    const onContinue = () => {
        if(!selectedOption) return

        if(status === "wrong") {
            setStatus("none")
            setSelectedOption(undefined)
            return
        }

        if(status === "correct") {
            onNext()
            setStatus("none")
            setSelectedOption(undefined)
            return
        }

        const correctOption = options.find(option => option.correct)

        if (!correctOption) return

        if(correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then(res => {
                    if (res?.response === "hearts") {
                        openHeartsModal()
                        return
                    }

                    setStatus("correct")
                    setPercentage(prev => prev + 100 / challenges.length)

                    if (initialPercentage === 100) {
                        setHearts(prev => Math.min(prev + 1, 5))
                    }
                }).catch(() => toast.error("Что-то пошло не так. Попробуйте снова"))
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id).then(res => {
                    if(res?.response === "hearts") {
                        openHeartsModal()
                        return
                    }

                    setStatus("wrong")

                    if(!res?.response){
                        setHearts(prev => Math.max(prev - 1, 0))
                    }
                }).catch(() => toast.error("Что-то пошло не так. Попробуйте ещё раз"))
            })
        }
    }

    if (!challenge) {
        return (
            <>
                <Confetti 
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                    width={windowDimensions.width}
                    height={windowDimensions.height}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto \
                text-center items-center justify-center h-full">
                    <Image
                        src="/finish-line.png"
                        alt="finish"
                        className="hidden lg:block"
                        height={180}
                        width={180}
                    />
                    <Image
                        src="/finish-line.png"
                        alt="finish"
                        className="block lg:hidden"
                        height={120}
                        width={120}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-600">
                        Прекрасная работа! <br />
                        Вы закончили урок
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Foooter 
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        )
    }

    const title = challenge.question

    return (
        <>
            <Header 
                hearts={hearts}
                percantage={percentage}
                hasAcriveSubscription={!!userSubscription?.isActive}
            />

            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 \
                    lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center \
                        lg:text-start font-bold text-neutral-700" >
                            Выберите правильный вариант ответа
                        </h1>
                        <div>
                            <QuestionBubble question={title} /> 
                            <Challenge
                                options={options}
                                onSelect={onSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={pending}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Foooter 
                onCheck={onContinue}
                disabled={pending || !selectedOption}
                status={status}
            />
        </>
    )
}