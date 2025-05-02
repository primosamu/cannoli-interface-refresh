
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { FormItem } from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";

const TemplateManagement = () => {
  const form = useFormContext();
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const saveAsTemplate = form.watch("saveAsTemplate");

  const handleSaveTemplate = async () => {
    // Get current form values
    const formData = form.getValues();
    
    try {
      setSaving(true);
      
      const templateData = {
        name: formData.name,
        channel: formData.channel,
        whatsapp_type: formData.whatsappType,
        content: formData.content,
        image_url: formData.imageUrl,
        incentive_type: formData.incentiveType,
        type: "template", // Marking this as a template
        user_id: "system", // This will be replaced with the actual user ID when auth is implemented
      };
      
      const { error } = await supabase
        .from('campaign_templates')
        .insert(templateData);
        
      if (error) throw error;
      
      // Invalidate campaigns query to refresh data
      queryClient.invalidateQueries({ queryKey: ['campaign_templates'] });
      
      toast({
        title: "Template salvo",
        description: "Seu modelo de campanha foi salvo com sucesso.",
      });
    } catch (error) {
      console.error("Error saving template:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar o modelo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormItem className="space-y-3">
      <div className="flex flex-row items-center justify-between space-x-2">
        <Label htmlFor="saveAsTemplate">Salvar como modelo para uso futuro</Label>
        <Switch
          id="saveAsTemplate"
          checked={saveAsTemplate}
          onCheckedChange={(checked) => form.setValue("saveAsTemplate", checked)}
        />
      </div>
      
      {saveAsTemplate && (
        <Button 
          type="button"
          variant="outline"
          onClick={handleSaveTemplate}
          disabled={saving}
          className="w-full mt-2"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Salvar Modelo
            </>
          )}
        </Button>
      )}
    </FormItem>
  );
};

export default TemplateManagement;
