import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const TelaInicial = () => {
  const navigate = useNavigate()
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  const timeSlots = Array.from({ length: 18 }, (_, i) => i + 6) // 6h às 23h

  // Sample schedule data - in a real app this would come from state/database
  const scheduleEvents = [
    { day: 2, startHour: 8, endHour: 10, type: 'study', subject: 'Matemática' },
    { day: 3, startHour: 8, endHour: 10, type: 'study', subject: 'Inglês' },
    { day: 5, startHour: 10, endHour: 11, type: 'study', subject: 'História' },
    { day: 5, startHour: 20, endHour: 21, type: 'review', subject: 'Revisão' }
  ]

  const getEventForSlot = (dayIndex: number, hour: number) => {
    return scheduleEvents.find(event => 
      event.day === dayIndex && hour >= event.startHour && hour < event.endHour
    )
  }

  const getEventHeight = (event: any) => {
    return `${(event.endHour - event.startHour) * 60}px`
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-study-peach px-6 py-3 rounded-2xl mb-6">
            <h1 className="text-xl font-medium text-study-peach-foreground">
              CRONOGRAMA
            </h1>
          </div>
        </div>

        {/* Calendar Grid */}
        <Card className="bg-white shadow-sm border border-border/50 rounded-2xl overflow-hidden">
          <CardContent className="p-4">
            <div className="grid grid-cols-8 gap-0 border border-border/30 rounded-lg overflow-hidden">
              {/* Time column header */}
              <div className="bg-muted/30 p-3 border-r border-border/30"></div>
              
              {/* Day headers */}
              {days.map((day) => (
                <div key={day} className="bg-muted/30 p-3 text-center border-r border-border/30 last:border-r-0">
                  <span className="text-sm font-medium text-foreground">{day}</span>
                </div>
              ))}

              {/* Time slots and schedule grid */}
              {timeSlots.map((hour) => (
                <React.Fragment key={hour}>
                  {/* Time label */}
                  <div className="bg-muted/20 p-3 text-sm font-medium text-muted-foreground text-center border-r border-b border-border/30">
                    {hour}
                  </div>
                  
                  {/* Day columns */}
                  {days.map((_, dayIndex) => {
                    const event = getEventForSlot(dayIndex, hour)
                    const isEventStart = event && hour === event.startHour
                    
                    return (
                      <div 
                        key={`${dayIndex}-${hour}`} 
                        className="relative h-16 border-r border-b border-border/30 last:border-r-0 bg-background"
                      >
                        {isEventStart && (
                          <div
                            className={`absolute inset-0 m-0.5 rounded-md flex items-center justify-center ${
                              event.type === 'study' ? 'bg-study-green' : 'bg-study-cyan'
                            }`}
                            style={{ height: `${(event.endHour - event.startHour) * 64 - 4}px` }}
                          >
                            <span className="text-xs font-medium text-white text-center px-1">
                              {event.subject}
                            </span>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button 
            onClick={() => navigate('/criar-flashcards')}
            className="bg-study-cyan hover:bg-study-cyan/90 text-study-cyan-foreground px-8 py-3 rounded-2xl"
          >
            Criar matéria
          </Button>
          <Button 
            onClick={() => navigate('/revisar')}
            variant="secondary" 
            className="bg-study-peach hover:bg-study-peach/90 text-study-peach-foreground px-8 py-3 rounded-2xl"
          >
            editar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TelaInicial;