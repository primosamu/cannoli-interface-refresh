
import { Check, Palette, Image } from "lucide-react";

interface GenerationOptionsProps {
  useRestaurantLogo: boolean;
  setUseRestaurantLogo: (value: boolean) => void;
  useRestaurantColors: boolean; 
  setUseRestaurantColors: (value: boolean) => void;
  style: string;
  setStyle: (value: string) => void;
}

const styles = [
  { id: "realistic", name: "Realista", description: "Imagens com aparência realista e natural" },
  { id: "illustrated", name: "Ilustrado", description: "Estilo de desenho ou ilustração artística" },
  { id: "3d", name: "3D", description: "Renderização tridimensional com profundidade" },
  { id: "minimalist", name: "Minimalista", description: "Design simples e limpo com poucos elementos" },
  { id: "vibrant", name: "Vibrante", description: "Cores vivas e chamativas com alto contraste" }
];

const GenerationOptions = ({
  useRestaurantLogo,
  setUseRestaurantLogo,
  useRestaurantColors,
  setUseRestaurantColors,
  style,
  setStyle
}: GenerationOptionsProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Opções de Geração</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="use-logo"
            checked={useRestaurantLogo}
            onChange={() => setUseRestaurantLogo(!useRestaurantLogo)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="use-logo" className="text-sm font-medium">
            Incorporar logo do restaurante
          </label>
        </div>
        
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="use-colors"
            checked={useRestaurantColors}
            onChange={() => setUseRestaurantColors(!useRestaurantColors)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="use-colors" className="text-sm font-medium">
            Usar cores da identidade visual
          </label>
        </div>
      </div>
      
      <div className="space-y-3">
        <label className="text-sm font-medium">Estilo Visual</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {styles.map((styleOption) => (
            <div
              key={styleOption.id}
              className={`border rounded-md p-3 cursor-pointer relative ${
                style === styleOption.id ? "border-primary bg-primary/5" : "hover:border-gray-300"
              }`}
              onClick={() => setStyle(styleOption.id)}
            >
              {style === styleOption.id && (
                <div className="absolute top-2 right-2 text-primary">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="flex items-center gap-2">
                {styleOption.id === "realistic" && <Image className="h-4 w-4 text-gray-500" />}
                {styleOption.id === "illustrated" && <Palette className="h-4 w-4 text-gray-500" />}
                {styleOption.id === "3d" && <div className="h-4 w-4 text-gray-500">3D</div>}
                {styleOption.id === "minimalist" && <div className="h-4 w-4 text-gray-500">M</div>}
                {styleOption.id === "vibrant" && <div className="h-4 w-4 text-gray-500">V</div>}
                <span className="font-medium text-sm">{styleOption.name}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{styleOption.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerationOptions;
