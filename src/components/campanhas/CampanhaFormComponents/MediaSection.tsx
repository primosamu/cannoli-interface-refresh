
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MediaSection = () => {
  const form = useFormContext();
  const { toast } = useToast();
  
  return (
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
  );
};

export default MediaSection;
