
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

const MessageComposerSection = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Conteúdo da Mensagem</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Digite sua mensagem aqui..." 
              className="min-h-[200px]" 
              {...field} 
            />
          </FormControl>
          <FormDescription>
            Use {'{{'} nome {'}}' } para inserir o nome do cliente
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MessageComposerSection;
