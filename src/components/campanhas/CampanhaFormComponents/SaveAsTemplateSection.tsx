
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const SaveAsTemplateSection = () => {
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="saveAsTemplate"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Salvar como modelo</FormLabel>
            <FormDescription>
              Salve esta campanha como modelo para uso futuro
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SaveAsTemplateSection;
