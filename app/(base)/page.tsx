import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignUpButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[988x] mx-auto flex-1 w-full flex \
    flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/bigninja.png" fill alt="Ninja" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center" >
        Изучайте, практикуйтесь и осваивайте новые языки с TalkMaster
        </h1>
        <div>
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton mode="modal" forceRedirectUrl="/learn" signInForceRedirectUrl="/learn">
                <Button size="lg" variant="primary" className="w-full">
                  Начать
                </Button>
              </SignUpButton>
              <SignInButton mode="modal" forceRedirectUrl="/learn" signUpForceRedirectUrl="/learn">
                <Button size="lg" variant="primaryOutline" className="w-full">
                  У меня уже есть аккаунт
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button className="w-full" size="lg" variant="primary" >
                <Link href="/learn">
                  Продолжить обучение
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
