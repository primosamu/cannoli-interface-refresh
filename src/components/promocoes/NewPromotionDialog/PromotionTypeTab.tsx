
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag, 
  Clock, 
  Gift, 
  Users, 
  Ticket, 
  Package,
  Truck,
  DollarSign 
} from "lucide-react";
import { PromotionFormValues } from "../NewPromotionDialog";

interface PromotionTypeTabProps {
  form: UseFormReturn<PromotionFormValues>;
}

const PromotionTypeTab: React.FC<PromotionTypeTabProps> = ({ form }) => {
  const selectedType = form.watch("type");

  const promotionTypes = [
    {
      category: "Desconto Simples",
      description: "Promoções básicas para atrair clientes",
      types: [
        {
          id: "product_discount",
          name: "Desconto em Produtos",
          description: "Ex: 20% OFF em pizzas, R$ 5 OFF em hambúrgueres",
          icon: <ShoppingBag className="h-6 w-6" />,
          examples: ["20% OFF em todas as pizzas", "R$ 5 OFF no combo do dia"],
          difficulty: "Fácil"
        },
        {
          id: "minimum_order",
          name: "Desconto por Valor Mínimo",
          description: "Ex: 10% OFF em pedidos acima de R$ 50",
          icon: <DollarSign className="h-6 w-6" />,
          examples: ["10% OFF acima de R$ 50", "R$ 10 OFF acima de R$ 80"],
          difficulty: "Fácil"
        },
        {
          id: "free_delivery",
          name: "Frete Grátis",
          description: "Ex: Frete grátis em pedidos acima de R$ 40",
          icon: <Truck className="h-6 w-6" />,
          examples: ["Frete grátis acima de R$ 40", "Delivery gratuito no fim de semana"],
          difficulty: "Fácil"
        }
      ]
    },
    {
      category: "Combos e Ofertas",
      description: "Incentive vendas com combinações especiais",
      types: [
        {
          id: "combo_promotion",
          name: "Combo Especial",
          description: "Ex: Pizza + Refrigerante por R$ 35",
          icon: <Package className="h-6 w-6" />,
          examples: ["Pizza + Refri por R$ 35", "Hambúrguer + Batata + Refri por R$ 25"],
          difficulty: "Médio"
        },
        {
          id: "buy_x_get_y",
          name: "Compre X Ganhe Y",
          description: "Ex: Compre 2 cervejas, ganhe 1 grátis",
          icon: <Gift className="h-6 w-6" />,
          examples: ["Compre 2 cervejas, ganhe 1", "Na compra de 3 pastéis, leve 4"],
          difficulty: "Médio"
        }
      ]
    },
    {
      category: "Horários Especiais",
      description: "Promoções por período do dia ou semana",
      types: [
        {
          id: "happy_hour",
          name: "Happy Hour / Horário Especial",
          description: "Ex: 30% OFF das 17h às 19h",
          icon: <Clock className="h-6 w-6" />,
          examples: ["30% OFF das 17h às 19h", "Terça-feira é dia de pizza em dobro"],
          difficulty: "Médio"
        }
      ]
    },
    {
      category: "Fidelidade e Cupons",
      description: "Recompense clientes fiéis e atraia novos",
      types: [
        {
          id: "loyalty_reward",
          name: "Programa de Fidelidade",
          description: "Ex: A cada 10 pedidos, ganhe 1 grátis",
          icon: <Users className="h-6 w-6" />,
          examples: ["10º pedido grátis", "Cashback de 5% para clientes VIP"],
          difficulty: "Avançado"
        },
        {
          id: "coupon_discount",
          name: "Cupom de Desconto",
          description: "Ex: Código BEMVINDO para 15% OFF",
          icon: <Ticket className="h-6 w-6" />,
          examples: ["BEMVINDO15 para novos clientes", "VOLTA10 para quem não pede há 30 dias"],
          difficulty: "Fácil"
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Médio": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Que tipo de promoção você quer criar?</h3>
        <p className="text-muted-foreground">
          Escolha o tipo que melhor atende ao seu objetivo de vendas
        </p>
      </div>

      {promotionTypes.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-3">
          <div>
            <h4 className="font-medium text-sm text-primary">{category.category}</h4>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.types.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedType === type.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => form.setValue("type", type.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        selectedType === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        {type.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{type.name}</CardTitle>
                        <Badge className={getDifficultyColor(type.difficulty)} variant="secondary">
                          {type.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Exemplos:</p>
                    {type.examples.map((example, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground">• {example}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromotionTypeTab;
