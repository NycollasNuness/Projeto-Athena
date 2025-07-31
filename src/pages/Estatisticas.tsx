import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

const Estatisticas = () => {
  const stats = [
    { label: "atividades realizadas", value: 0 },
    { label: "horas de estudo", value: 0 },
    { label: "flashcards resolvidos", value: 0 }
  ]

  const chartData = [
    { name: "acertos", value: 85, fill: "hsl(var(--study-green))" },
    { name: "erros", value: 45, fill: "hsl(var(--error))" }
  ]

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-study-peach px-8 py-4 rounded-2xl mb-6">
            <h1 className="text-2xl font-medium text-study-peach-foreground">
              Estatísticas
            </h1>
          </div>
        </div>

        {/* Performance Section */}
        <div className="mb-8">
          <div className="bg-study-cyan px-6 py-3 rounded-t-2xl">
            <h2 className="text-lg font-medium text-study-cyan-foreground">
              Desempenho
            </h2>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-study-peach border-0 shadow-lg">
                <CardContent className="text-center p-6">
                  <div className="text-4xl font-bold text-study-peach-foreground mb-2">
                    {stat.value}
                  </div>
                  <p className="text-sm text-study-peach-foreground/80">
                    {stat.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl">
          <CardHeader className="text-center">
            <div className="bg-muted px-4 py-2 rounded-lg inline-block">
              <CardTitle className="text-lg text-muted-foreground">
                aproveitamento geral
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis hide />
                  <Bar 
                    dataKey="value" 
                    radius={[8, 8, 0, 0]}
                    maxBarSize={80}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* Chart Legend */}
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-study-green rounded"></div>
                <span className="text-sm text-muted-foreground">acertos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-error rounded"></div>
                <span className="text-sm text-muted-foreground">erros</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Estatisticas