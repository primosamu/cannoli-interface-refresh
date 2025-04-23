
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Store } from "@/types/store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  taxId: z.string().min(14, "CNPJ deve estar no formato 00.000.000/0001-00"),
  locations: z.string().min(5, "Endereço deve ser informado"),
  unitManager: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email("E-mail inválido").optional().or(z.string().length(0)),
  openingHours: z.string().optional(),
  notes: z.string().optional(),
  status: z.enum(["Ativa", "Inativa"]),
});

type FormValues = z.infer<typeof formSchema>;

interface StoreFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (store: Partial<Store>) => void;
  store?: Store;
}

export function StoreFormDialog({
  open,
  onOpenChange,
  onSubmit,
  store,
}: StoreFormDialogProps) {
  const isEditing = !!store;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store?.name || "",
      taxId: store?.taxId || "",
      locations: store?.locations || "",
      unitManager: store?.unitManager || "",
      contactPhone: store?.contactPhone || "",
      contactEmail: store?.contactEmail || "",
      openingHours: store?.openingHours || "",
      notes: store?.notes || "",
      status: store?.status || "Ativa",
    },
  });

  useEffect(() => {
    if (store) {
      form.reset({
        name: store.name || "",
        taxId: store.taxId || "",
        locations: store.locations || "",
        unitManager: store.unitManager || "",
        contactPhone: store.contactPhone || "",
        contactEmail: store.contactEmail || "",
        openingHours: store.openingHours || "",
        notes: store.notes || "",
        status: store.status || "Ativa",
      });
    } else {
      form.reset({
        name: "",
        taxId: "",
        locations: "",
        unitManager: "",
        contactPhone: "",
        contactEmail: "",
        openingHours: "",
        notes: "",
        status: "Ativa",
      });
    }
  }, [store, form]);

  function handleSubmit(values: FormValues) {
    try {
      onSubmit({
        ...values,
        id: store?.id,
        brandId: store?.brandId || "1", // Default value, ideally this would be selected
        economicGroupId: store?.economicGroupId || "1", // Default value, ideally this would be selected
      });
      
      toast.success(`Loja ${isEditing ? "atualizada" : "cadastrada"} com sucesso!`);
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao salvar loja.");
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar Loja" : "Nova Loja"}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ScrollArea className="h-[500px] pr-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da loja" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input placeholder="00.000.000/0001-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="locations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input placeholder="Endereço completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unitManager"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gerente da Unidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do gerente" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="email@loja.com.br" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="openingHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horário de Funcionamento</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Segunda a Sexta, 9h às 18h" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Informações adicionais sobre a loja" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <select
                            className="w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            {...field}
                          >
                            <option value="Ativa">Ativa</option>
                            <option value="Inativa">Inativa</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </ScrollArea>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isEditing ? "Salvar alterações" : "Cadastrar loja"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
