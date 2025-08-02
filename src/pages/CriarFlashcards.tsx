import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDecks, type Flashcard } from "@/hooks/useDecks"
import { useToast } from "@/hooks/use-toast"

const CriarFlashcards = () => {
  const navigate = useNavigate()
  const { addDeck } = useDecks()
  const { toast } = useToast()
  const [subjectName, setSubjectName] = useState("")
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: '1', front: '', back: '' }
  ])

  const addFlashcard = () => {
    const newId = (flashcards.length + 1).toString()
    setFlashcards([...flashcards, { id: newId, front: '', back: '' }])
  }

  const removeFlashcard = (id: string) => {
    if (flashcards.length > 1) {
      setFlashcards(flashcards.filter(card => card.id !== id))
    }
  }

  const updateFlashcard = (id: string, field: 'front' | 'back', value: string) => {
    setFlashcards(flashcards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ))
  }

  const handleSave = () => {
    if (!subjectName.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome da matéria.",
        variant: "destructive"
      })
      return
    }

    const validFlashcards = flashcards.filter(card => 
      card.front.trim() && card.back.trim()
    )

    if (validFlashcards.length === 0) {
      toast({
        title: "Erro", 
        description: "Adicione pelo menos um flashcard válido.",
        variant: "destructive"
      })
      return
    }

    addDeck(subjectName, validFlashcards)
    
    toast({
      title: "Sucesso!",
      description: `Matéria "${subjectName}" criada com ${validFlashcards.length} flashcard${validFlashcards.length > 1 ? 's' : ''}.`
    })
    
    navigate('/revisar')
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="rounded-full hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="inline-block bg-study-cyan px-6 py-3 rounded-2xl">
            <h1 className="text-xl font-medium text-study-cyan-foreground">
              CRIAR MATÉRIA
            </h1>
          </div>
        </div>

        {/* Subject Name */}
        <Card className="bg-white shadow-lg border-0 rounded-3xl mb-6">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Nome da Matéria</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Digite o nome da matéria..."
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="text-base"
            />
          </CardContent>
        </Card>

        {/* Flashcards */}
        <Card className="bg-white shadow-lg border-0 rounded-3xl mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg text-foreground">Flashcards</CardTitle>
            <Button
              onClick={addFlashcard}
              className="bg-study-green hover:bg-study-green/90 text-study-green-foreground rounded-xl"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {flashcards.map((card, index) => (
              <div key={card.id} className="space-y-4 p-4 border rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Flashcard {index + 1}
                  </span>
                  {flashcards.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFlashcard(card.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`front-${card.id}`} className="text-sm font-medium">
                      Frente
                    </Label>
                    <Textarea
                      id={`front-${card.id}`}
                      placeholder="Digite a pergunta ou termo..."
                      value={card.front}
                      onChange={(e) => updateFlashcard(card.id, 'front', e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`back-${card.id}`} className="text-sm font-medium">
                      Verso
                    </Label>
                    <Textarea
                      id={`back-${card.id}`}
                      placeholder="Digite a resposta ou definição..."
                      value={card.back}
                      onChange={(e) => updateFlashcard(card.id, 'back', e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="px-8 py-3 rounded-2xl"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-study-peach hover:bg-study-peach/90 text-study-peach-foreground px-8 py-3 rounded-2xl"
            disabled={!subjectName.trim() || flashcards.some(card => !card.front.trim() || !card.back.trim())}
          >
            Salvar Matéria
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CriarFlashcards