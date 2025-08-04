import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { useDecks } from "@/hooks/useDecks"
import { useToast } from "@/hooks/use-toast"
import { FlashcardStudy } from "@/components/FlashcardStudy"
import { StudyProgress } from "@/components/StudyProgress"

const Estudar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getDeckById } = useDecks()
  const { toast } = useToast()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [deck, setDeck] = useState(getDeckById(id || ''))

  useEffect(() => {
    if (!deck) {
      toast({
        title: "Erro",
        description: "Deck não encontrado.",
        variant: "destructive"
      })
      navigate('/revisar')
    }
  }, [deck, navigate, toast])

  if (!deck || deck.flashcards.length === 0) {
    return (
      <div className="p-8 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Este deck não possui flashcards.</p>
          <Button onClick={() => navigate('/revisar')}>
            Voltar
          </Button>
        </div>
      </div>
    )
  }

  const handleNext = () => {
    if (currentIndex < deck.flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // Fim do estudo
      toast({
        title: "Parabéns! 🎉",
        description: `Você concluiu o estudo do deck "${deck.name}"!`
      })
      navigate('/revisar')
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleFinish = () => {
    toast({
      title: "Estudo finalizado!",
      description: `Você estudou ${currentIndex + 1} de ${deck.flashcards.length} flashcards.`
    })
    navigate('/revisar')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/revisar')}
              className="rounded-full hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <StudyProgress
                current={currentIndex + 1}
                total={deck.flashcards.length}
                deckName={deck.name}
              />
            </div>
          </div>

          {/* Flashcard */}
          <div className="mb-8">
            <FlashcardStudy
              flashcard={deck.flashcards[currentIndex]}
              onNext={handleNext}
              onPrevious={handlePrevious}
              canGoNext={currentIndex < deck.flashcards.length - 1}
              canGoPrevious={currentIndex > 0}
            />
          </div>

          {/* Finish button */}
          {currentIndex === deck.flashcards.length - 1 && (
            <div className="flex justify-center">
              <Button
                onClick={handleFinish}
                className="bg-study-green hover:bg-study-green/90 text-study-green-foreground px-8 py-3 rounded-2xl"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Finalizar Estudo
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Estudar