
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

const SaveAsTemplateSection = () => {
  const form = useFormContext();
  
  return (
    <div className="border rounded-md p-4">
      <div className="flex items-center space-x-2">
        <Save className="h-4 w-4 text-primary" />
        <h3 className="text-lg font-medium">Salvar como modelo</h3>
      </div>
      
      <FormField
        control={form.control}
        name="saveAsTemplate"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 mt-2">
            <div className="space-y-0.5">
              <FormDescription>
                Salvar esta campanha como modelo para uso futuro
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default SaveAsTemplateSection;
