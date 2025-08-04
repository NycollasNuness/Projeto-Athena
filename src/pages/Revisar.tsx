import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Edit } from "lucide-react"
import { useDecks } from "@/hooks/useDecks"
import { useNavigate } from "react-router-dom"

const Revisar = () => {
  const { decks } = useDecks()
  const navigate = useNavigate()

  const getCurrentDayName = () => {
    const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    return days[new Date().getDay()]
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header with current day */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-muted-foreground mb-2">
            {getCurrentDayName()}
          </h1>
        </div>

        {/* Deck cards */}
        <div className="space-y-6">
          {decks.map((deck) => (
            <Card 
              key={deck.id} 
              className={`${deck.color} border-0 shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className={`text-xl font-medium ${deck.colorForeground}`}>
                      {deck.name}
                    </h3>
                    <p className={`text-sm opacity-75 ${deck.colorForeground}`}>
                      {deck.flashcards.length} flashcard{deck.flashcards.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      onClick={() => navigate(`/editar-flashcards/${deck.id}`)}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="secondary" 
                      onClick={() => navigate(`/estudar/${deck.id}`)}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-6"
                    >
                      iniciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Revisar