
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { HelpCircle, Sparkles } from "lucide-react";

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  productType?: string;
  campaignType?: string;
}

const PromptInput = ({ value, onChange, productType, campaignType }: PromptInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const promptSuggestions = [
    "Banner promocional para o prato especial da casa",
    "Propaganda para promoção de terça-feira",
    "Promoção de pizza para entrega",
    "Hambúrguer suculento e apetitoso",
    "Propaganda para restaurante aconchegante",
    "Banner para delivery",
    "Promoção especial de final de semana",
    "Cardápio novo para redes sociais",
    "Ambiente do restaurante com clientes felizes",
    "Sobremesa especial com visual atrativo"
  ];

  // Generate contextual suggestions based on product/campaign type
  const getContextualSuggestions = () => {
    if (productType === "pizza" && campaignType === "promotion") {
      return [
        "Promoção especial de pizza - metade do preço na terça-feira",
        "Pizza artesanal com ingredientes frescos",
        "Promoção de pizza 2 por 1 para levar"
      ];
    }
    
    if (productType === "burger" && campaignType === "special_event") {
      return [
        "Hambúrguer especial premium para datas comemorativas",
        "Evento gastronômico com os melhores hambúrgueres da cidade",
        "Lançamento do novo hambúrguer artesanal"
      ];
    }
    
    return promptSuggestions;
  };
  
  const suggestions = getContextualSuggestions();

  const handleClickSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <label htmlFor="prompt" className="text-sm font-medium">
          Descrição da Imagem
        </label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Descreva a imagem que você deseja gerar. Quanto mais detalhes, melhor será o resultado.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="relative">
        <textarea
          id="prompt"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Descreva a imagem que deseja gerar. Ex: Banner promocional para pizza margherita com oferta especial de terça-feira..."
          className="w-full px-3 py-2 border rounded-md min-h-[100px]"
        />
        
        <div className="flex justify-end mt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="flex items-center gap-1 text-xs"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            <Sparkles className="h-3 w-3" />
            Sugestões
          </Button>
        </div>
        
        {showSuggestions && (
          <div className="absolute z-10 bg-white border shadow-lg rounded-md p-2 mt-1 right-0 w-full md:max-w-md">
            <p className="text-xs text-muted-foreground mb-2">
              Clique em uma sugestão para usá-la como prompt:
            </p>
            <div className="max-h-[200px] overflow-y-auto space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="block w-full text-left px-2 py-1 rounded-sm text-sm hover:bg-primary/10 text-gray-800"
                  onClick={() => handleClickSuggestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptInput;
