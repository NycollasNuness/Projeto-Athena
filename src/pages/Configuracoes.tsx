import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const Configuracoes = () => {
  const [subjects, setSubjects] = useState({
    matematica: true,
    portugues: true,
    quimica: false,
    biologia: true,
    historia: true,
    geografia: false,
    ingles: true,
    filosofia: false,
    sociologia: true,
    artes: true,
    espanhol: true,
    fisica: false
  })

  const [studyDays, setStudyDays] = useState({
    segunda: true,
    terca: true,
    quarta: true,
    quinta: true,
    sexta: true,
    sabado: true,
    domingo: true
  })

  const [dailyHours] = useState({
    segunda: 2,
    terca: 2, 
    quarta: 2,
    quinta: 2,
    sexta: 2,
    sabado: 2,
    domingo: 2
  })

  const toggleSubject = (subject: string) => {
    setSubjects(prev => ({
      ...prev,
      [subject]: !prev[subject as keyof typeof prev]
    }))
  }

  const subjectsList = [
    { key: 'matematica', label: 'Matemática' },
    { key: 'portugues', label: 'Português' },
    { key: 'quimica', label: 'Química' },
    { key: 'biologia', label: 'Biologia' },
    { key: 'historia', label: 'História' },
    { key: 'geografia', label: 'Geografia' },
    { key: 'ingles', label: 'Inglês' },
    { key: 'filosofia', label: 'Filosofia' },
    { key: 'sociologia', label: 'Sociologia' },
    { key: 'artes', label: 'Artes' },
    { key: 'espanhol', label: 'Espanhol' },
    { key: 'fisica', label: 'Física' }
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-study-peach px-8 py-4 rounded-2xl mb-6">
            <h1 className="text-2xl font-medium text-study-peach-foreground">
              Configurações
            </h1>
          </div>
        </div>

        {/* Subjects Section */}
        <div className="mb-8">
          <div className="bg-study-cyan px-6 py-3 rounded-t-2xl">
            <h2 className="text-lg font-medium text-study-cyan-foreground">
              Suas Matérias
            </h2>
          </div>
          
          <Card className="bg-white shadow-lg border-0 rounded-b-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjectsList.map((subject) => (
                  <div key={subject.key} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                    <span className="text-sm font-medium text-foreground">
                      {subject.label}
                    </span>
                    <Switch
                      checked={subjects[subject.key as keyof typeof subjects]}
                      onCheckedChange={() => toggleSubject(subject.key)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Planning Section */}
        <div>
          <div className="bg-study-cyan px-6 py-3 rounded-t-2xl">
            <h2 className="text-lg font-medium text-study-cyan-foreground">
              Planejamento
            </h2>
          </div>
          
          <Card className="bg-white shadow-lg border-0 rounded-b-2xl">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Study Days */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    Dias de estudo
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(studyDays).map(([day, enabled]) => (
                      <Button
                        key={day}
                        variant={enabled ? "default" : "outline"}
                        size="sm"
                        className="rounded-full text-xs"
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Daily Hours */}
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-4">
                    carga horária diária
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(dailyHours).map(([day, hours]) => (
                      <div key={day} className="text-center">
                        <div className="text-xs text-muted-foreground mb-1">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </div>
                        <div className="text-lg font-bold text-foreground">
                          {hours}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Configuracoes