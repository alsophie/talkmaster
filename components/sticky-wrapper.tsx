type Props = {
    children: React.ReactNode
}

export const StickyWrapper = ({children}: Props) => {
    return (
        <div className="w-[368px] sticky self-end bottom-6">
            <div className="max-h-[20px] lg:min-h-[calc(100vh-48px)] sticky lg:top-6 flex flex-col gap-y-4">
                {children}
            </div>
        </div>
    )
}