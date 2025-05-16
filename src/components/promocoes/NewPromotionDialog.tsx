
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Promotion, PromotionType } from "@/types/promotion";

// Form schema for new promotion
const promotionFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  description: z.string().optional(),
  type: z.string(),
  discountValue: z.coerce.number().min(0),
  discountType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  isAccumulative: z.boolean().default(false),
  customerGroups: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  paymentMethods: z.array(z.string()).optional(),
  minOrderValue: z.coerce.number().optional(),
  maxOrderValue: z.coerce.number().optional(),
  buyQuantity: z.coerce.number().optional(),
  getQuantity: z.coerce.number().optional(),
});

export type PromotionFormValues = z.infer<typeof promotionFormSchema>;

interface NewPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePromotion: (data: PromotionFormValues) => void;
  mockProducts: Array<{ id: string; name: string }>;
  mockCategories: Array<{ id: string; name: string }>;
  mockCustomerGroups: Array<{ id: string; name: string }>;
  mockPaymentMethods: Array<{ id: string; name: string }>;
}

const NewPromotionDialog: React.FC<NewPromotionDialogProps> = ({
  open,
  onOpenChange,
  onCreatePromotion,
  mockProducts,
  mockCategories,
  mockCustomerGroups,
  mockPaymentMethods
}) => {
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(promotionFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "product_discount",
      discountValue: 0,
      discountType: "percentage",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isAccumulative: false,
      customerGroups: [],
      products: [],
      categories: [],
      paymentMethods: [],
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nova Promoção</DialogTitle>
          <DialogDescription>
            Crie uma nova promoção para atrair mais clientes e aumentar suas vendas.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreatePromotion)} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="name" className="text-right">
                  Nome
                </FormLabel>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input {...field} id="name" placeholder="Nome da promoção" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="description" className="text-right">
                  Descrição
                </FormLabel>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <FormControl>
                        <Input {...field} id="description" placeholder="Descrição breve" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="promo-type" className="text-right">
                  Tipo
                </FormLabel>
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger id="promo-type">
                            <SelectValue placeholder="Selecione o tipo de promoção" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="product_discount">Desconto em produtos</SelectItem>
                          <SelectItem value="time_limited">Tempo limitado</SelectItem>
                          <SelectItem value="order_value_discount">Desconto por valor de compra</SelectItem>
                          <SelectItem value="combo_discount">Desconto em combos</SelectItem>
                          <SelectItem value="buy_x_get_y">Compre X Ganhe Y</SelectItem>
                          <SelectItem value="coupon">Cupom de desconto</SelectItem>
                          <SelectItem value="loyalty_points">Pontos de fidelidade</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              {form.watch("type") === "buy_x_get_y" ? (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    Configuração
                  </FormLabel>
                  <div className="col-span-3 grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="buyQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Compre (quantidade)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} min={1} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="getQuantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ganhe (quantidade)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} min={1} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel htmlFor="discount-value" className="text-right">
                    Desconto
                  </FormLabel>
                  <div className="col-span-3 flex gap-2 items-center">
                    <FormField
                      control={form.control}
                      name="discountValue"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input 
                              id="discount-value" 
                              type="number"
                              placeholder="Valor do desconto" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Tipo de desconto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">Porcentagem</SelectItem>
                              <SelectItem value="fixed">Valor fixo</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="start-date" className="text-right">
                  Período
                </FormLabel>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input id="start-date" type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input id="end-date" type="date" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {(form.watch("type") === "order_value_discount") && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="text-right">
                    Valor do Pedido
                  </FormLabel>
                  <div className="col-span-3 grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minOrderValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor mínimo (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} min={0} step="0.01" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="maxOrderValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor máximo (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} min={0} step="0.01" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Produtos
                </FormLabel>
                <div className="col-span-3 grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="products"
                    render={({ field }) => (
                      <FormItem>
                        <Select 
                          onValueChange={(value) => field.onChange([...field.value || [], value])}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione produtos" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockProducts.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(field.value || []).map(productId => {
                            const product = mockProducts.find(p => p.id === productId);
                            return product ? (
                              <Badge key={productId} variant="secondary" className="gap-1">
                                {product.name}
                                <X 
                                  className="h-3 w-3 cursor-pointer" 
                                  onClick={() => field.onChange(field.value?.filter(id => id !== productId))}
                                />
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Categorias
                </FormLabel>
                <div className="col-span-3 grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <Select 
                          onValueChange={(value) => field.onChange([...field.value || [], value])}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione categorias" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockCategories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(field.value || []).map(categoryId => {
                            const category = mockCategories.find(c => c.id === categoryId);
                            return category ? (
                              <Badge key={categoryId} variant="secondary" className="gap-1">
                                {category.name}
                                <X 
                                  className="h-3 w-3 cursor-pointer" 
                                  onClick={() => field.onChange(field.value?.filter(id => id !== categoryId))}
                                />
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Grupos de Clientes
                </FormLabel>
                <div className="col-span-3 grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="customerGroups"
                    render={({ field }) => (
                      <FormItem>
                        <Select 
                          onValueChange={(value) => field.onChange([...field.value || [], value])}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione grupos de clientes" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockCustomerGroups.map(group => (
                              <SelectItem key={group.id} value={group.id}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(field.value || []).map(groupId => {
                            const group = mockCustomerGroups.find(g => g.id === groupId);
                            return group ? (
                              <Badge key={groupId} variant="secondary" className="gap-1">
                                {group.name}
                                <X 
                                  className="h-3 w-3 cursor-pointer" 
                                  onClick={() => field.onChange(field.value?.filter(id => id !== groupId))}
                                />
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel className="text-right">
                  Formas de Pagamento
                </FormLabel>
                <div className="col-span-3 grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="paymentMethods"
                    render={({ field }) => (
                      <FormItem>
                        <Select 
                          onValueChange={(value) => field.onChange([...field.value || [], value])}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione formas de pagamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {mockPaymentMethods.map(method => (
                              <SelectItem key={method.id} value={method.id}>
                                {method.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(field.value || []).map(methodId => {
                            const method = mockPaymentMethods.find(m => m.id === methodId);
                            return method ? (
                              <Badge key={methodId} variant="secondary" className="gap-1">
                                {method.name}
                                <X 
                                  className="h-3 w-3 cursor-pointer" 
                                  onClick={() => field.onChange(field.value?.filter(id => id !== methodId))}
                                />
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-right">
                  <FormLabel>Configurações</FormLabel>
                </div>
                <div className="col-span-3 space-y-2">
                  <FormField
                    control={form.control}
                    name="isAccumulative"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Permitir acumular com outras promoções
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)} type="button">
                Cancelar
              </Button>
              <Button type="submit">
                Salvar promoção
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPromotionDialog;
