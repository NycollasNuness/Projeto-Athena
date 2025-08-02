import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Conta = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Gerenciamento da conta
          </h1>
        </div>

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Conta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nome de usuário: </span>
                <span className="text-sm text-foreground">Ciclano</span>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Email: </span>
                <span className="text-sm text-foreground">Nameexample@gmail.com</span>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nascimento: </span>
                <span className="text-sm text-foreground">17/04/2000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
              onClick={() => {
                // Handle reset statistics
                console.log("Reset statistics clicked");
              }}
            >
              Resetar estatísticas
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Conta;