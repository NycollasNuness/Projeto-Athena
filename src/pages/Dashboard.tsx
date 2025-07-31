import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play } from "lucide-react"

const Dashboard = () => {
  const decks = [
    {
      id: 1,
      name: "English deck",
      color: "bg-study-cyan",
      colorForeground: "text-study-cyan-foreground"
    },
    {
      id: 2,
      name: "Revolução deck", 
      color: "bg-study-peach",
      colorForeground: "text-study-peach-foreground"
    },
    {
      id: 3,
      name: "Células deck",
      color: "bg-study-green", 
      colorForeground: "text-study-green-foreground"
    }
  ]

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
                  </div>
                  <Button 
                    variant="secondary" 
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-6"
                  >
                    iniciar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard