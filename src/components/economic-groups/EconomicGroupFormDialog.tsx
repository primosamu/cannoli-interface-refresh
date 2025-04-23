
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X } from "lucide-react";
import { EconomicGroup } from "@/types/economic-group";
import {
  Dialog,
  DialogClose,
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
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  taxId: z.string().min(14, "CNPJ deve estar no formato 00.000.000/0001-00"),
  legalName: z.string().optional(),
  headquartersAddress: z.string().optional(),
  mainPhone: z.string().optional(),
  corporateEmail: z.string().email("E-mail inválido").optional().or(z.string().length(0)),
  website: z.string().optional(),
  status: z.enum(["Ativo", "Inativo", "Em Auditoria"]),
});

type FormValues = z.infer<typeof formSchema>;

interface EconomicGroupFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (economicGroup: Partial<EconomicGroup>) => void;
  economicGroup?: EconomicGroup;
}

export function EconomicGroupFormDialog({
  open,
  onOpenChange,
  onSubmit,
  economicGroup,
}: EconomicGroupFormDialogProps) {
  const isEditing = !!economicGroup;
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: economicGroup?.name || "",
      taxId: economicGroup?.taxId || "",
      legalName: economicGroup?.legalName || "",
      headquartersAddress: economicGroup?.headquartersAddress || "",
      mainPhone: economicGroup?.mainPhone || "",
      corporateEmail: economicGroup?.corporateEmail || "",
      website: economicGroup?.website || "",
      status: economicGroup?.status || "Ativo",
    },
  });

  useEffect(() => {
    if (economicGroup) {
      form.reset({
        name: economicGroup.name || "",
        taxId: economicGroup.taxId || "",
        legalName: economicGroup?.legalName || "",
        headquartersAddress: economicGroup?.headquartersAddress || "",
        mainPhone: economicGroup?.mainPhone || "",
        corporateEmail: economicGroup?.corporateEmail || "",
        website: economicGroup?.website || "",
        status: economicGroup.status || "Ativo",
      });
    } else {
      form.reset({
        name: "",
        taxId: "",
        legalName: "",
        headquartersAddress: "",
        mainPhone: "",
        corporateEmail: "",
        website: "",
        status: "Ativo",
      });
    }
  }, [economicGroup, form]);

  function handleSubmit(values: FormValues) {
    try {
      onSubmit({
        ...values,
        id: economicGroup?.id,
      });
      
      toast.success(`Grupo econômico ${isEditing ? "atualizado" : "cadastrado"} com sucesso!`);
      onOpenChange(false);
    } catch (error) {
      toast.error("Erro ao salvar grupo econômico.");
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Grupo Econômico" : "Novo Grupo Econômico"}
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4">
            <X className="h-4 w-4" />
            <span className="sr-only">Fechar</span>
          </DialogClose>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do grupo econômico" {...field} />
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
              name="legalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Razão Social" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="headquartersAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço da Sede</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="mainPhone"
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
                name="corporateEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail Corporativo</FormLabel>
                    <FormControl>
                      <Input placeholder="email@empresa.com.br" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.empresa.com.br" {...field} />
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
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                      <option value="Em Auditoria">Em Auditoria</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {isEditing ? "Salvar alterações" : "Cadastrar grupo"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
