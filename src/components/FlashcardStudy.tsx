import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Flashcard } from "@/hooks/useDecks"

interface FlashcardStudyProps {
  flashcard: Flashcard
  onNext: () => void
  onPrevious: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  className?: string
}

export const FlashcardStudy = ({
  flashcard,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  className
}: FlashcardStudyProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleFlip = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setIsFlipped(!isFlipped)
      setIsAnimating(false)
    }, 150)
  }

  const handleNext = () => {
    setIsFlipped(false)
    onNext()
  }

  const handlePrevious = () => {
    setIsFlipped(false)
    onPrevious()
  }

  return (
    <div className={cn("flex flex-col items-center gap-6", className)}>
      {/* Flashcard */}
      <div className="perspective-1000 w-full max-w-md">
        <Card
          className={cn(
            "h-80 cursor-pointer transition-all duration-300 transform-style-preserve-3d hover:shadow-xl",
            isAnimating && "scale-95",
            isFlipped && "rotate-y-180"
          )}
          onClick={handleFlip}
        >
          <CardContent className="p-0 h-full relative">
            {/* Front side */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-6 bg-gradient-to-br from-study-cyan to-study-cyan/80 rounded-lg",
                isFlipped && "rotate-y-180"
              )}
            >
              <div className="text-center">
                <p className="text-study-cyan-foreground text-lg font-medium leading-relaxed">
                  {flashcard.front}
                </p>
                <div className="mt-4 text-study-cyan-foreground/70 text-sm">
                  Clique para ver a resposta
                </div>
              </div>
            </div>

            {/* Back side */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full backface-hidden flex items-center justify-center p-6 bg-gradient-to-br from-study-peach to-study-peach/80 rounded-lg rotate-y-180",
                isFlipped && "rotate-y-0"
              )}
            >
              <div className="text-center">
                <p className="text-study-peach-foreground text-lg font-medium leading-relaxed">
                  {flashcard.back}
                </p>
                <div className="mt-4 text-study-peach-foreground/70 text-sm">
                  Clique para voltar à pergunta
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          className="px-6"
        >
          Anterior
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsFlipped(false)}
          className="rounded-full"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className="bg-study-green hover:bg-study-green/90 text-study-green-foreground px-6"
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}