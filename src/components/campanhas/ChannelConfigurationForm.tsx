
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Mail, Phone } from "lucide-react";

const formSchema = z.object({
  whatsappPhone: z.string().min(10, {
    message: "O número de telefone deve ter pelo menos 10 dígitos.",
  }),
  smsPhone: z.string().min(10, {
    message: "O número de telefone deve ter pelo menos 10 dígitos.",
  }),
  emailSender: z.string().email({
    message: "Por favor, insira um email válido.",
  }),
  emailName: z.string().min(2, {
    message: "O nome do remetente deve ter pelo menos 2 caracteres.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ChannelConfigurationForm = () => {
  const { toast } = useToast();
  
  // Mock initial values - in a real implementation these would come from an API
  const defaultValues: FormValues = {
    whatsappPhone: "+5511999999999",
    smsPhone: "+5511988888888",
    emailSender: "contato@seurestaurante.com.br",
    emailName: "Seu Restaurante",
  };
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  const onSubmit = (data: FormValues) => {
    // In a real implementation, this would save the channel configuration to an API
    toast({
      title: "Configurações salvas",
      description: "As configurações dos canais foram salvas com sucesso.",
    });
    console.log("Channel configuration data:", data);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Configuração de Canais</CardTitle>
        <CardDescription>
          Configure os canais de comunicação utilizados para envio de campanhas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* WhatsApp Configuration */}
            <div className="p-4 border rounded-md space-y-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-medium">WhatsApp</h3>
              </div>
              
              <FormField
                control={form.control}
                name="whatsappPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de telefone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+5511999999999" />
                    </FormControl>
                    <FormDescription>
                      Número de telefone que será utilizado para envio das mensagens via WhatsApp
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-muted-foreground">
                Status: <span className="text-green-600 font-medium">Conectado</span>
              </div>
            </div>
            
            {/* SMS Configuration */}
            <div className="p-4 border rounded-md space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-medium">SMS</h3>
              </div>
              
              <FormField
                control={form.control}
                name="smsPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número de telefone</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+5511988888888" />
                    </FormControl>
                    <FormDescription>
                      Número de telefone que será utilizado como remetente para envio de SMS
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-sm text-muted-foreground">
                Status: <span className="text-yellow-600 font-medium">Pendente verificação</span>
              </div>
            </div>
            
            {/* Email Configuration */}
            <div className="p-4 border rounded-md space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-medium">Email</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emailSender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email de envio</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="contato@seurestaurante.com.br" />
                      </FormControl>
                      <FormDescription>
                        Email utilizado para enviar as campanhas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emailName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do remetente</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Seu Restaurante" />
                      </FormControl>
                      <FormDescription>
                        Nome que aparecerá como remetente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="text-sm text-muted-foreground">
                Status: <span className="text-red-600 font-medium">Não verificado</span> - 
                <Button variant="link" className="p-0 h-auto text-sm">Verificar domínio</Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full sm:w-auto">
              Salvar configurações
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ChannelConfigurationForm;
