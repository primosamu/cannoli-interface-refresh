
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MessageComposerSection = () => {
  const form = useFormContext();
  const { toast } = useToast();
  
  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="text-lg font-medium flex items-center gap-1">
        <MessageSquare className="h-4 w-4" /> Composição da Mensagem
      </h3>
      
      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Conteúdo da mensagem</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Digite o conteúdo da sua mensagem aqui... Use {{nome}} para personalizar com o nome do cliente."
                className="min-h-[150px] font-sans"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Use variáveis como {{nome}}, {{sobrenome}} para personalização.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

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
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </div>
            </FormControl>
            <FormDescription>
              Adicione uma imagem para sua campanha (apenas WhatsApp e E-mail)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MessageComposerSection;
