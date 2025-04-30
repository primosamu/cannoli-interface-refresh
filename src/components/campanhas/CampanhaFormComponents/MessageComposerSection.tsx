
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
import { User, Calendar, Tag, Store, MapPin } from "lucide-react";

const MessageComposerSection = () => {
  const form = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
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
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conteúdo da Mensagem</FormLabel>
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
