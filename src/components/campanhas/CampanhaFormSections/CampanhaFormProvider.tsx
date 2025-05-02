
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CampaignChannel, WhatsAppMessageType, IncentiveType } from "@/types/campaign";

// Form schema
export const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome da campanha deve ter pelo menos 3 caracteres.",
  }),
  channel: z.enum(["whatsapp", "email", "sms"] as const),
  whatsappType: z.enum(["utility", "marketing"] as const).optional(),
  segmentId: z.string({
    required_error: "Por favor selecione um segmento de clientes.",
  }),
  content: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  incentiveType: z.enum(["none", "coupon", "loyalty"] as const),
  couponId: z.string().optional(),
  couponCode: z.string().optional(),
  imageUrl: z.string().optional(),
  scheduleDate: z.date().optional(),
  scheduleTime: z.string().optional(),
  saveAsTemplate: z.boolean().default(false),
  contactSource: z.enum(["segment", "file", "manual"]).default("segment"),
  contactFile: z.string().optional(),
  manualContacts: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

interface CampanhaFormProviderProps {
  children: React.ReactNode;
  defaultValues?: Partial<FormValues>;
  onSubmit: (data: FormValues) => void;
}

const CampanhaFormProvider = ({ 
  children, 
  defaultValues,
  onSubmit 
}: CampanhaFormProviderProps) => {
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      channel: "whatsapp",
      whatsappType: "marketing",
      segmentId: "",
      content: "",
      incentiveType: "none",
      couponId: undefined,
      couponCode: "",
      imageUrl: "",
      saveAsTemplate: false,
      contactSource: "segment",
      ...defaultValues
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
        {children}
      </form>
    </Form>
  );
};

export default CampanhaFormProvider;
