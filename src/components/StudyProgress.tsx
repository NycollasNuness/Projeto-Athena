import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface StudyProgressProps {
  current: number
  total: number
  deckName: string
}

export const StudyProgress = ({ current, total, deckName }: StudyProgressProps) => {
  const progress = (current / total) * 100

  return (
    <Card className="bg-white/50 backdrop-blur border-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-foreground">{deckName}</h2>
          <span className="text-sm text-muted-foreground">
            {current} de {total}
          </span>
        </div>
        <Progress 
          value={progress} 
          className="h-2"
        />
      </CardContent>
    </Card>
  )
}