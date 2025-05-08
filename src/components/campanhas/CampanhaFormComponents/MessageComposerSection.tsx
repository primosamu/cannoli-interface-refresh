
import React, { useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Tag, Store, MapPin, Zap, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const MessageComposerSection = () => {
  const form = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  // Function to insert variable tags at cursor position
  const insertTag = (tag: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = form.getValues("content") || "";
    
    // Insert the tag at cursor position
    const newText = text.substring(0, start) + tag + text.substring(end);
    
    // Update form value
    form.setValue("content", newText, { shouldValidate: true, shouldDirty: true });
    
    // Focus back on the textarea and position cursor after the inserted tag
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length, start + tag.length);
    }, 0);
  };

  const optimizeWithAI = () => {
    // In a real implementation, this would call an AI service
    const currentContent = form.getValues("content");
    if (!currentContent || currentContent.trim() === "") {
      toast({
        title: "Conteúdo vazio",
        description: "Por favor, escreva algum conteúdo para otimizar.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Otimizando conteúdo",
      description: "Seu conteúdo está sendo otimizado pela IA...",
    });
    
    // Simulate AI processing delay
    setTimeout(() => {
      const optimizedContent = `${currentContent}\n\n[Conteúdo otimizado pela IA - Esta é uma simulação. Em uma implementação real, este texto seria realmente otimizado.]`;
      form.setValue("content", optimizedContent, { shouldValidate: true, shouldDirty: true });
      
      toast({
        title: "Conteúdo otimizado",
        description: "Seu conteúdo foi otimizado pela IA com sucesso.",
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conteúdo da Mensagem</FormLabel>
            <div className="flex gap-2 mb-2">
              <Button 
                type="button" 
                size="sm" 
                variant="outline"
                className="gap-1"
                onClick={optimizeWithAI}
              >
                <Zap className="h-3.5 w-3.5" /> Otimizar com IA
              </Button>
            </div>
            <FormControl>
              <Textarea 
                placeholder="Digite sua mensagem aqui..." 
                className="min-h-[150px]" 
                ref={textareaRef}
                {...field} 
              />
            </FormControl>
            <FormDescription className="text-xs">
              Use as variáveis abaixo para personalizar sua mensagem
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem (opcional)</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input placeholder="URL da imagem" {...field} />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        // In a real app, this would open a media library
                        toast({
                          title: "Biblioteca de mídia",
                          description: "A biblioteca de mídia seria aberta aqui.",
                        });
                      }}
                    >
                      <Image className="h-4 w-4" />
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Adicione uma imagem para sua campanha
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div>
          {form.watch("imageUrl") && (
            <div className="border rounded-md p-2 mt-6">
              <p className="text-xs font-medium mb-1">Pré-visualização da imagem:</p>
              <div className="bg-slate-100 rounded h-[120px] flex items-center justify-center">
                {form.watch("imageUrl") ? (
                  <img 
                    src={form.watch("imageUrl")} 
                    alt="Preview" 
                    className="max-h-[110px] max-w-full object-contain rounded"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=150";
                      toast({
                        title: "Erro ao carregar imagem",
                        description: "Verifique a URL da imagem fornecida.",
                        variant: "destructive"
                      });
                    }}
                  />
                ) : (
                  <span className="text-xs text-gray-500">Nenhuma imagem definida</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Variáveis disponíveis:</h4>
        <div className="flex flex-wrap gap-2">
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="h-8"
            onClick={() => insertTag("{{nome}}")}
          >
            <User className="h-3.5 w-3.5 mr-1" />
            Nome
          </Button>
          
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="h-8"
            onClick={() => insertTag("{{data}}")}
          >
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Data
          </Button>
          
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="h-8"
            onClick={() => insertTag("{{cupom}}")}
          >
            <Tag className="h-3.5 w-3.5 mr-1" />
            Cupom
          </Button>
          
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="h-8"
            onClick={() => insertTag("{{restaurante}}")}
          >
            <Store className="h-3.5 w-3.5 mr-1" />
            Restaurante
          </Button>
          
          <Button 
            type="button" 
            size="sm" 
            variant="outline" 
            className="h-8"
            onClick={() => insertTag("{{endereco}}")}
          >
            <MapPin className="h-3.5 w-3.5 mr-1" />
            Endereço
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p className="font-medium mb-1">Exemplos de uso:</p>
          <div className="space-y-1">
            <p>• "Olá <Badge variant="outline" className="text-xs">{"{{nome}}"}</Badge>, temos uma oferta especial para você!"</p>
            <p>• "Sua reserva está confirmada para <Badge variant="outline" className="text-xs">{"{{data}}"}</Badge>."</p>
            <p>• "Use o cupom <Badge variant="outline" className="text-xs">{"{{cupom}}"}</Badge> e ganhe 15% de desconto."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComposerSection;
