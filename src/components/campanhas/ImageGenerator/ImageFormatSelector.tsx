
import { useState } from "react";
import { Check, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageFormat {
  id: string;
  name: string;
  width: number;
  height: number;
  platform: string;
  selected: boolean;
}

interface ImageFormatSelectorProps {
  formats: ImageFormat[];
  onFormatToggle: (id: string) => void;
  onSelectAll: () => void;
  onUnselectAll: () => void;
}

const ImageFormatSelector = ({
  formats,
  onFormatToggle,
  onSelectAll,
  onUnselectAll,
}: ImageFormatSelectorProps) => {
  const platformGroups = formats.reduce((acc, format) => {
    if (!acc[format.platform]) {
      acc[format.platform] = [];
    }
    acc[format.platform].push(format);
    return acc;
  }, {} as Record<string, ImageFormat[]>);

  const selectedCount = formats.filter(f => f.selected).length;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Formatos de Imagem</h3>
        <div className="space-x-2">
          <button
            type="button"
            onClick={onSelectAll}
            className="px-3 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded-md"
          >
            Selecionar Todos
          </button>
          <button
            type="button"
            onClick={onUnselectAll}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
          >
            Limpar Seleção
          </button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        {selectedCount} formato(s) selecionado(s)
      </div>

      {Object.entries(platformGroups).map(([platform, platformFormats]) => (
        <div key={platform} className="space-y-2">
          <h4 className="font-medium text-sm">{platform}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {platformFormats.map((format) => (
              <div
                key={format.id}
                className={cn(
                  "border rounded-md p-2 cursor-pointer hover:border-primary/50 transition-all relative",
                  format.selected ? "border-primary bg-primary/5" : "border-gray-200"
                )}
                onClick={() => onFormatToggle(format.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{format.name}</span>
                  {format.selected && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="mt-1 flex items-center space-x-1 text-xs text-muted-foreground">
                  <ImageIcon className="h-3 w-3" />
                  <span>{format.width}x{format.height}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageFormatSelector;
