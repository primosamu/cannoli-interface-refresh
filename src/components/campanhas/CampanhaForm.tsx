
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MessageSquare, Mail, Phone, Send, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Drawer,
  DrawerContent, 
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { 
  Form,
  FormControl, 
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { CampaignChannel, CampaignIncentive, CustomerSegment, Coupon, IncentiveType } from "@/types/campaign";
import CampanhaPreview from "./CampanhaPreview";

// Validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  segment: z.string({ required_error: "Por favor selecione um segmento" }),
  incentiveType: z.enum(["none", "coupon", "loyalty"], { required_error: "Por favor selecione um tipo de incentivo" }),
  couponId: z.string().optional(),
  loyaltyPoints: z.number().optional(),
  channel: z.enum(["sms", "whatsapp", "email"], { required_error: "Por favor selecione um canal" }),
  content: z.string().min(5, { message: "Conteúdo deve ter pelo menos 5 caracteres" }),
  imageUrl: z.string().optional(),
});

// Mock data
const mockSegments: CustomerSegment[] = [
  { id: "all", name: "Todos os Clientes", description: "Todos os clientes cadastrados", customerCount: 1250 },
  { id: "first-purchase", name: "1ª Compra", description: "Clientes que fizeram a primeira compra", customerCount: 320 },
  { id: "inactive-30", name: "Inativos 30 dias", description: "Clientes sem compras nos últimos 30 dias", customerCount: 450 },
  { id: "inactive-60", name: "Inativos 60+ dias", description: "Clientes sem compras há mais de 60 dias", customerCount: 280 },
  { id: "high-ticket", name: "Alto Ticket", description: "Clientes com compras acima de R$200", customerCount: 180 },
];

const mockCoupons: Coupon[] = [
  { id: "coup1", code: "VOLTA10", discount: 10, discountType: "percentage", expiresAt: "2025-06-30" },
  { id: "coup2", code: "FRETE-GRATIS", discount: 0, discountType: "fixed", expiresAt: "2025-07-15" },
  { id: "coup3", code: "DESCONTO20", discount: 20, discountType: "percentage", expiresAt: "2025-05-25" }
];

const predefinedTemplates = {
  "sentimos-sua-falta": {
    name: "Sentimos sua falta",
    segment: "inactive-30",
    incentiveType: "coupon" as IncentiveType,
    couponId: "coup1",
    channel: "whatsapp" as CampaignChannel,
    content: "Olá! Sentimos sua falta! Faz um tempo que não vemos você por aqui. Que tal voltar com esse cupom especial? Use o código VOLTA10 e ganhe 10% de desconto na sua próxima compra!",
    imageUrl: "",
  },
  "volte-para-nos": {
    name: "Volte para nós",
    segment: "inactive-60",
    incentiveType: "coupon" as IncentiveType,
    couponId: "coup3",
    channel: "email" as CampaignChannel,
    content: "<h2>Estamos com saudades!</h2><p>Olá! Sentimos muito sua falta em nossa loja.</p><p>Para celebrar seu retorno, preparamos um desconto especial de 20% na sua próxima compra.</p><p>Basta usar o código <strong>DESCONTO20</strong> no checkout.</p><p>Esperamos ver você em breve!</p>",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  },
  "cliente-vip": {
    name: "Cliente VIP",
    segment: "high-ticket",
    incentiveType: "loyalty" as IncentiveType,
    loyaltyPoints: 100,
    channel: "email" as CampaignChannel,
    content: "<h2>Parabéns! Você é um cliente VIP!</h2><p>Como reconhecimento pela sua fidelidade e pelo seu histórico de compras, estamos oferecendo 100 pontos extras no nosso programa de fidelidade!</p><p>Você pode usar esses pontos na sua próxima compra para obter descontos exclusivos.</p><p>Obrigado por escolher nossa loja!</p>",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
  },
  "primeiro-pedido": {
    name: "Obrigado pelo primeiro pedido",
    segment: "first-purchase",
    incentiveType: "loyalty" as IncentiveType,
    loyaltyPoints: 50,
    channel: "whatsapp" as CampaignChannel,
    content: "Olá! Muito obrigado pelo seu primeiro pedido conosco. Como forma de agradecimento, adicionamos 50 pontos de fidelidade na sua conta! Continue comprando e ganhe ainda mais benefícios exclusivos.",
    imageUrl: "",
  }
};

interface CampanhaFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  predefinedCampaignId?: string;
}

const CampanhaForm = ({ open, onOpenChange, predefinedCampaignId }: CampanhaFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [previewChannel, setPreviewChannel] = useState<CampaignChannel>("whatsapp");
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      segment: "",
      incentiveType: "none",
      content: "",
    },
  });

  // Apply predefined template if provided
  React.useEffect(() => {
    if (predefinedCampaignId && open) {
      const template = predefinedTemplates[predefinedCampaignId as keyof typeof predefinedTemplates];
      if (template) {
        form.reset(template);
        setPreviewChannel(template.channel);
      }
    }
  }, [predefinedCampaignId, form, open]);

  const selectedChannel = form.watch("channel");
  const selectedIncentiveType = form.watch("incentiveType");

  // Update preview channel when channel selection changes
  const onChannelChange = (channel: CampaignChannel) => {
    setPreviewChannel(channel);
    
    // Set default content based on channel if no predefined content
    if (!form.getValues("content")) {
      let defaultContent = "";
      switch (channel) {
        case "whatsapp":
          defaultContent = "Olá! Temos uma oferta especial para você. Aproveite!";
          break;
        case "sms":
          defaultContent = "Oferta especial! Aproveite nossos produtos com desconto.";
          break;
        case "email":
          defaultContent = "<h1>Oferta Especial</h1><p>Olá! Temos promoções exclusivas para você.</p>";
          break;
      }

      form.setValue("content", defaultContent);
    }
  };

  const nextStep = () => {
    if (step === 1 && !form.getValues("name")) {
      form.setError("name", { message: "Nome da campanha é obrigatório" });
      return;
    }
    if (step === 2 && !form.getValues("segment")) {
      form.setError("segment", { message: "Segmento é obrigatório" });
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create campaign object
    const campaign = {
      id: `camp-${Date.now()}`,
      name: values.name,
      segment: mockSegments.find(seg => seg.id === values.segment) || mockSegments[0],
      incentive: {
        type: values.incentiveType,
        couponId: values.couponId,
        loyaltyPoints: values.loyaltyPoints,
      } as CampaignIncentive,
      channel: values.channel,
      content: values.content,
      imageUrl: values.imageUrl,
      status: "draft",
      createdAt: new Date().toISOString()
    };

    console.log("Campaign created:", campaign);
    
    toast({
      title: "Campanha criada com sucesso",
      description: `A campanha "${values.name}" foi salva como rascunho.`,
    });
    
    onOpenChange(false);
  };

  const handleExecuteCampaign = () => {
    if (!form.formState.isValid) {
      form.trigger();
      return;
    }

    const values = form.getValues();
    const segmentName = mockSegments.find(seg => seg.id === values.segment)?.name || "Desconhecido";

    toast({
      title: "Campanha executada",
      description: `A campanha "${values.name}" foi enviada para ${mockSegments.find(seg => seg.id === values.segment)?.customerCount || 0} clientes do segmento ${segmentName}.`,
    });
    
    onOpenChange(false);
  };

  const getSelectedSegmentCount = () => {
    const segmentId = form.getValues("segment");
    return mockSegments.find(seg => seg.id === segmentId)?.customerCount || 0;
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[90%] max-h-[90%]">
        <DrawerHeader className="border-b pb-4">
          <DrawerTitle className="text-xl">Nova Campanha Personalizada</DrawerTitle>
          <DrawerDescription>
            Crie sua campanha em poucos passos
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-6 overflow-y-auto h-[calc(100%-60px)]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                1
              </div>
              <div className="h-[2px] w-12 bg-muted" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                2
              </div>
              <div className="h-[2px] w-12 bg-muted" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                3
              </div>
              <div className="h-[2px] w-12 bg-muted" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                4
              </div>
            </div>
            <span className="text-sm text-muted-foreground">Passo {step} de 4</span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Informações da Campanha</h3>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Campanha</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Recuperação de Clientes Inativos" {...field} />
                        </FormControl>
                        <FormDescription>
                          Este nome é usado internamente para identificar sua campanha
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Segmentação de Público</h3>
                  <FormField
                    control={form.control}
                    name="segment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecione o segmento</FormLabel>
                        <FormControl>
                          <div className="border rounded-md divide-y">
                            {mockSegments.map((segment) => (
                              <div 
                                key={segment.id} 
                                className={`flex items-center space-x-3 p-3 hover:bg-muted/50 cursor-pointer ${field.value === segment.id ? 'bg-muted' : ''}`}
                                onClick={() => field.onChange(segment.id)}
                              >
                                <div className="flex-1">
                                  <div className="font-medium">{segment.name}</div>
                                  <div className="text-sm text-muted-foreground">{segment.description}</div>
                                </div>
                                <div className="text-blue-600 text-sm font-medium">
                                  {segment.customerCount} clientes
                                </div>
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    checked={field.value === segment.id}
                                    onChange={() => field.onChange(segment.id)}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormDescription>
                          {field.value && (
                            <span>
                              Selecionado: {getSelectedSegmentCount()} clientes
                            </span>
                          )}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Incentivos</h3>
                  <FormField
                    control={form.control}
                    name="incentiveType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Incentivo</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            className="grid grid-cols-1 gap-4 md:grid-cols-3"
                          >
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="none" id="incentive-none" />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor="incentive-none"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Sem incentivo
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  Apenas enviar mensagem
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="coupon" id="incentive-coupon" />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor="incentive-coupon"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Adicionar cupom
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  Incluir um cupom de desconto
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start space-x-2">
                              <RadioGroupItem value="loyalty" id="incentive-loyalty" />
                              <div className="grid gap-1.5 leading-none">
                                <label
                                  htmlFor="incentive-loyalty"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Adicionar pontos
                                </label>
                                <p className="text-sm text-muted-foreground">
                                  Conceder pontos de fidelidade
                                </p>
                              </div>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedIncentiveType === "coupon" && (
                    <FormField
                      control={form.control}
                      name="couponId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Selecione o cupom</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar cupom" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockCoupons.map((coupon) => (
                                <SelectItem key={coupon.id} value={coupon.id}>
                                  {coupon.code} - {coupon.discount}{coupon.discountType === "percentage" ? "%" : " (Fixo)"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Selecione o cupom que será enviado aos clientes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {selectedIncentiveType === "loyalty" && (
                    <FormField
                      control={form.control}
                      name="loyaltyPoints"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quantidade de pontos</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Ex: 100" 
                              onChange={e => field.onChange(parseInt(e.target.value))}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormDescription>
                            Quantos pontos de fidelidade serão concedidos
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="channel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Canal</FormLabel>
                        <FormControl>
                          <RadioGroup 
                            onValueChange={(value) => {
                              field.onChange(value);
                              onChannelChange(value as CampaignChannel);
                            }} 
                            defaultValue={field.value}
                            value={field.value || undefined}
                            className="grid grid-cols-1 gap-4 md:grid-cols-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="whatsapp" id="channel-whatsapp" />
                              <label
                                htmlFor="channel-whatsapp"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <MessageSquare className="h-4 w-4 text-green-600" />
                                WhatsApp
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sms" id="channel-sms" />
                              <label
                                htmlFor="channel-sms"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <Phone className="h-4 w-4 text-blue-600" />
                                SMS
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="channel-email" />
                              <label
                                htmlFor="channel-email"
                                className="text-sm font-medium flex items-center gap-2"
                              >
                                <Mail className="h-4 w-4 text-purple-600" />
                                Email
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Editor de Campanha</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Conteúdo da mensagem</FormLabel>
                            <FormControl>
                              {selectedChannel === "email" ? (
                                <textarea
                                  className="min-h-[200px] flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="Conteúdo do email (suporta HTML básico)"
                                  {...field}
                                />
                              ) : (
                                <textarea
                                  className="min-h-[150px] flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder={`Conteúdo da mensagem de ${selectedChannel === "whatsapp" ? "WhatsApp" : "SMS"}`}
                                  {...field}
                                />
                              )}
                            </FormControl>
                            <FormDescription>
                              {selectedChannel === "email" 
                                ? "Você pode usar HTML básico para formatar seu email" 
                                : selectedChannel === "sms" 
                                  ? "Limite de 160 caracteres para SMS" 
                                  : "Escreva sua mensagem de WhatsApp"}
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedChannel === "email" && (
                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem className="mt-4">
                              <FormLabel>Imagem do email</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="URL da imagem"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Adicione o link de uma imagem para o email (opcional)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className="border rounded-md p-4">
                      <h4 className="text-sm font-medium mb-3">Preview</h4>
                      <CampanhaPreview
                        channel={previewChannel}
                        content={form.watch("content")}
                        imageUrl={form.watch("imageUrl")}
                        incentiveType={form.watch("incentiveType") as IncentiveType}
                        coupon={form.watch("couponId") ? mockCoupons.find(c => c.id === form.watch("couponId")) : undefined}
                        loyaltyPoints={form.watch("loyaltyPoints")}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-6 border-t mt-6">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>Voltar</Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                )}
                
                <div className="space-x-2">
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep}>Continuar</Button>
                  ) : (
                    <>
                      <Button type="submit" variant="outline">
                        <Save className="mr-2 h-4 w-4" />
                        Salvar campanha
                      </Button>
                      <Button type="button" variant="default" onClick={handleExecuteCampaign}>
                        <Send className="mr-2 h-4 w-4" />
                        Executar campanha
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CampanhaForm;
