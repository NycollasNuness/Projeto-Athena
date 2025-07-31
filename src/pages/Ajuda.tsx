import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useState } from "react"

const Ajuda = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestion, setSuggestion] = useState("")

  const handleSubmitSuggestion = () => {
    if (suggestion.trim()) {
      // In a real app, this would submit to a backend
      console.log("Sugestão enviada:", suggestion)
      setSuggestion("")
      // Show success toast here
    }
  }

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-study-peach px-8 py-4 rounded-2xl mb-6">
            <h1 className="text-2xl font-medium text-study-peach-foreground">
              Ajuda
            </h1>
          </div>
        </div>

        {/* Help Content */}
        <div className="space-y-8">
          {/* How can we help section */}
          <div className="text-center">
            <h2 className="text-xl font-medium text-foreground mb-6">
              Como podemos ajudar?
            </h2>
            
            {/* Search box */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Busque no site"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 rounded-2xl bg-muted border-0 text-center"
              />
            </div>
          </div>

          {/* Suggestion Form */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium text-foreground mb-4">
                Escreva a sua sugestão
              </h3>
              
              <Textarea
                placeholder="Como podemos melhorar?"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                className="min-h-32 mb-4 rounded-xl border-border resize-none"
              />
              
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitSuggestion}
                  className="bg-study-cyan hover:bg-study-cyan/90 text-study-cyan-foreground px-6 py-2 rounded-xl"
                >
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQ or Help Topics could go here */}
          <Card className="bg-muted/30 border-0 rounded-2xl">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-medium text-foreground mb-2">
                Precisa de mais ajuda?
              </h3>
              <p className="text-muted-foreground text-sm">
                Entre em contato conosco através do formulário acima ou consulte nossa documentação.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Ajuda