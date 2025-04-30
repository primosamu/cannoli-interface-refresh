
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { FormDescription } from "@/components/ui/form";
import { CampaignChannel, CustomerSegment } from "@/types/campaign";
import CouponSelection from "./CouponSelection";

interface BasicInfoSectionProps {
  customerSegments: CustomerSegment[];
  handleChannelChange: (value: string) => void;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  customerSegments,
  handleChannelChange,
}) => {
  const form = useFormContext();
  const incentiveType = form.watch("incentiveType");
  
  return (
    <div className="space-y-6">
      {/* Campaign Name */}
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da Campanha</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Promoção de Fim de Semana" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Channel Selection */}
      <FormField
        control={form.control}
        name="channel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Canal de Envio</FormLabel>
            <FormControl>
              <Tabs 
                value={field.value} 
                onValueChange={handleChannelChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="whatsapp" className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" /> WhatsApp
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> E-mail
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> SMS
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* WhatsApp Type (only if WhatsApp is selected) */}
      {form.watch("channel") === "whatsapp" && (
        <FormField
          control={form.control}
          name="whatsappType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Mensagem WhatsApp</FormLabel>
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de mensagem" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="utility">Serviço/Utilidade</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Mensagens de serviço são para informações úteis como confirmações e lembretes.
                Mensagens de marketing são para promoções e divulgações.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      {/* Customer Segment */}
      <FormField
        control={form.control}
        name="segmentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Segmento de Clientes</FormLabel>
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um segmento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {customerSegments.map(segment => (
                  <SelectItem key={segment.id} value={segment.id}>
                    {segment.name} ({segment.customerCount} clientes)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Incentive Type */}
      <FormField
        control={form.control}
        name="incentiveType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Incentivo</FormLabel>
            <Select 
              value={field.value} 
              onValueChange={(value) => {
                field.onChange(value);
                // Reset couponId when incentive type changes
                if (value !== "coupon") {
                  form.setValue("couponId", undefined);
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo de incentivo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="none">Sem incentivo</SelectItem>
                <SelectItem value="coupon">Cupom de desconto</SelectItem>
                <SelectItem value="loyalty">Pontos de fidelidade</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Coupon Selection (only when coupon is selected) */}
      {incentiveType === "coupon" && (
        <FormField
          control={form.control}
          name="couponId"
          render={() => (
            <CouponSelection />
          )}
        />
      )}
    </div>
  );
};

export default BasicInfoSection;
