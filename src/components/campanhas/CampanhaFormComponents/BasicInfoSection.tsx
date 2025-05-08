
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerSegment } from "@/types/campaign";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare, Mail, Phone } from "lucide-react";

interface BasicInfoSectionProps {
  customerSegments: CustomerSegment[];
}

const BasicInfoSection = ({ customerSegments }: BasicInfoSectionProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da Campanha</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome da campanha" {...field} />
            </FormControl>
            <FormDescription>
              Dê um nome descritivo para sua campanha
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="segmentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Segmento de Clientes</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um segmento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {customerSegments.map((segment) => (
                  <SelectItem key={segment.id} value={segment.id}>
                    <div className="flex flex-col">
                      <span>{segment.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {segment.description} ({segment.customerCount} clientes)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Escolha o segmento de clientes que receberá esta campanha
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="channels"
        render={() => (
          <FormItem>
            <FormLabel>Canais de Envio</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="channelWhatsapp"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value as CheckedState}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-green-600" /> WhatsApp
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="channelEmail"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value as CheckedState}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-1">
                        <Mail className="h-4 w-4 text-blue-600" /> Email
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="channelSms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value as CheckedState}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-purple-600" /> SMS
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormDescription>
              Selecione um ou mais canais para enviar sua campanha
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {form.watch("channelWhatsapp") && (
        <FormField
          control={form.control}
          name="whatsappType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de mensagem WhatsApp</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="utility">Utilitária (Serviço)</SelectItem>
                  <SelectItem value="marketing">Marketing (Promoções)</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Mensagens de marketing exigem template aprovado pelo WhatsApp
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default BasicInfoSection;
