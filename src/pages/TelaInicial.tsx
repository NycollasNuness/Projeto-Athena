import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TelaInicial = () => {
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  // Sample schedule data - in a real app this would come from state/database
  const scheduleEvents = [
    { day: 2, startHour: 9, endHour: 11, type: 'study', subject: 'Matemática' },
    { day: 3, startHour: 10, endHour: 12, type: 'study', subject: 'Inglês' },
    { day: 5, startHour: 14, endHour: 15, type: 'review', subject: 'Revisão' }
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
        <Card className="bg-white shadow-lg border-0 rounded-3xl overflow-hidden">
          <CardContent className="p-6">
            <div className="grid grid-cols-8 gap-1">
              {/* Time column header */}
              <div className="p-3"></div>
              
              {/* Day headers */}
              {days.map((day) => (
                <div key={day} className="p-3 text-center">
                  <span className="text-sm font-medium text-muted-foreground">{day}</span>
                </div>
              ))}

              {/* Time slots and schedule grid */}
              {timeSlots.map((hour) => (
                <React.Fragment key={hour}>
                  {/* Time label */}
                  <div className="p-2 text-xs text-muted-foreground text-right border-r border-border">
                    {hour.toString().padStart(2, '0')}
                  </div>
                  
                  {/* Day columns */}
                  {days.map((_, dayIndex) => {
                    const event = getEventForSlot(dayIndex, hour)
                    const isEventStart = event && hour === event.startHour
                    
                    return (
                      <div 
                        key={`${dayIndex}-${hour}`} 
                        className="relative h-12 border-b border-border"
                      >
                        {isEventStart && (
                          <div
                            className={`absolute inset-x-0 top-0 rounded-lg ${
                              event.type === 'study' ? 'bg-study-green' : 'bg-study-cyan'
                            } opacity-80`}
                            style={{ height: getEventHeight(event) }}
                          >
                            <div className="p-2">
                              <span className="text-xs font-medium text-white">
                                {event.subject}
                              </span>
                            </div>
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
          <Button className="bg-study-cyan hover:bg-study-cyan/90 text-study-cyan-foreground px-8 py-3 rounded-2xl">
            Criar matéria
          </Button>
          <Button variant="secondary" className="bg-study-peach hover:bg-study-peach/90 text-study-peach-foreground px-8 py-3 rounded-2xl">
            editar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TelaInicial;