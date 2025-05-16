
import React, { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { X, ChevronRight } from "lucide-react";
import { Promotion, PromotionType } from "@/types/promotion";

// Form schema for new promotion
const promotionFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  description: z.string().optional(),
  type: z.string(),
  discountValue: z.coerce.number().min(0),
  discountType: z.string(),
  startDate: z.string(),
  startTime: z.string().default("00:00"),
  endDate: z.string(),
  endTime: z.string().default("23:59"),
  isAccumulative: z.boolean().default(false),
  customerGroups: z.array(z.string()).optional(),
  products: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  paymentMethods: z.array(z.string()).optional(),
  minOrderValue: z.coerce.number().optional(),
  maxOrderValue: z.coerce.number().optional(),
  buyQuantity: z.coerce.number().optional(),
  getQuantity: z.coerce.number().optional(),
  selectedCategory1: z.string().optional(),
  selectedCategory2: z.string().optional(),
  selectedCategory3: z.string().optional(),
  selectedCategory4: z.string().optional(),
  selectedCategory5: z.string().optional(),
  includeProducts: z.array(z.string()).default([]),
  excludeProducts: z.array(z.string()).default([]),
});

export type PromotionFormValues = z.infer<typeof promotionFormSchema>;

interface NewPromotionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePromotion: (data: PromotionFormValues) => void;
  mockProducts: Array<{ id: string; name: string; category?: string }>;
  mockCategories: Array<{ id: string; name: string; parentId?: string }>;
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
      startTime: "00:00",
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      endTime: "23:59",
      isAccumulative: false,
      customerGroups: [],
      products: [],
      categories: [],
      paymentMethods: [],
      includeProducts: [],
      excludeProducts: [],
    }
  });

  // States for category level filtering
  const [level1Categories, setLevel1Categories] = useState(mockCategories.filter(cat => !cat.parentId));
  const [level2Categories, setLevel2Categories] = useState<typeof mockCategories>([]);
  const [level3Categories, setLevel3Categories] = useState<typeof mockCategories>([]);
  const [level4Categories, setLevel4Categories] = useState<typeof mockCategories>([]);
  const [level5Categories, setLevel5Categories] = useState<typeof mockCategories>([]);
  const [filteredProducts, setFilteredProducts] = useState<typeof mockProducts>([]);

  // Handle category selection changes
  const handleCategoryChange = (level: number, categoryId: string) => {
    // Reset all levels below the changed level
    if (level === 1) {
      form.setValue("selectedCategory2", undefined);
      form.setValue("selectedCategory3", undefined);
      form.setValue("selectedCategory4", undefined);
      form.setValue("selectedCategory5", undefined);
      form.setValue("includeProducts", []);
      form.setValue("excludeProducts", []);
      
      // Update level 2 categories
      const newLevel2 = mockCategories.filter(cat => cat.parentId === categoryId);
      setLevel2Categories(newLevel2);
      setLevel3Categories([]);
      setLevel4Categories([]);
      setLevel5Categories([]);
      setFilteredProducts([]);
    } else if (level === 2) {
      form.setValue("selectedCategory3", undefined);
      form.setValue("selectedCategory4", undefined);
      form.setValue("selectedCategory5", undefined);
      form.setValue("includeProducts", []);
      form.setValue("excludeProducts", []);
      
      // Update level 3 categories
      const newLevel3 = mockCategories.filter(cat => cat.parentId === categoryId);
      setLevel3Categories(newLevel3);
      setLevel4Categories([]);
      setLevel5Categories([]);
      setFilteredProducts([]);
    } else if (level === 3) {
      form.setValue("selectedCategory4", undefined);
      form.setValue("selectedCategory5", undefined);
      form.setValue("includeProducts", []);
      form.setValue("excludeProducts", []);
      
      // Update level 4 categories
      const newLevel4 = mockCategories.filter(cat => cat.parentId === categoryId);
      setLevel4Categories(newLevel4);
      setLevel5Categories([]);
      setFilteredProducts([]);
    } else if (level === 4) {
      form.setValue("selectedCategory5", undefined);
      form.setValue("includeProducts", []);
      form.setValue("excludeProducts", []);
      
      // Update level 5 categories
      const newLevel5 = mockCategories.filter(cat => cat.parentId === categoryId);
      setLevel5Categories(newLevel5);
      setFilteredProducts([]);
    } else if (level === 5) {
      form.setValue("includeProducts", []);
      form.setValue("excludeProducts", []);
      
      // Show products from this category
      setFilteredProducts(mockProducts.filter(product => product.category === categoryId));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Promoção</DialogTitle>
          <DialogDescription>
            Crie uma nova promoção para atrair mais clientes e aumentar suas vendas.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onCreatePromotion)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                <TabsTrigger value="items">Produtos e Categorias</TabsTrigger>
                <TabsTrigger value="conditions">Condições e Regras</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                {/* Informações Básicas */}
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nome da promoção" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Descrição breve da promoção" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  {form.watch("type") === "buy_x_get_y" ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="discountValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Valor do Desconto</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} min={0} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discountType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de Desconto</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
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
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Data e Hora de Início</FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div>
                    <FormLabel>Data e Hora de Término</FormLabel>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {form.watch("type") === "order_value_discount" && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minOrderValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor mínimo do pedido (R$)</FormLabel>
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
                          <FormLabel>Valor máximo do pedido (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} min={0} step="0.01" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="items" className="space-y-4">
                {/* Categorias com 5 níveis */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Selecione por hierarquia de categorias</h3>
                  
                  <div className="space-y-3">
                    {/* Nível 1 */}
                    <FormField
                      control={form.control}
                      name="selectedCategory1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria Nível 1</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCategoryChange(1, value);
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione uma categoria" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {level1Categories.map(category => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    {/* Nível 2 - mostrado apenas quando nível 1 estiver selecionado */}
                    {form.watch("selectedCategory1") && level2Categories.length > 0 && (
                      <div className="pl-4 border-l-2 border-gray-200">
                        <FormField
                          control={form.control}
                          name="selectedCategory2"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2 mb-1">
                                <ChevronRight className="h-4 w-4" />
                                <FormLabel>Categoria Nível 2</FormLabel>
                              </div>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleCategoryChange(2, value);
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {level2Categories.map(category => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Nível 3 - mostrado apenas quando nível 2 estiver selecionado */}
                    {form.watch("selectedCategory2") && level3Categories.length > 0 && (
                      <div className="pl-8 border-l-2 border-gray-200">
                        <FormField
                          control={form.control}
                          name="selectedCategory3"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2 mb-1">
                                <ChevronRight className="h-4 w-4" />
                                <FormLabel>Categoria Nível 3</FormLabel>
                              </div>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleCategoryChange(3, value);
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {level3Categories.map(category => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Nível 4 - mostrado apenas quando nível 3 estiver selecionado */}
                    {form.watch("selectedCategory3") && level4Categories.length > 0 && (
                      <div className="pl-12 border-l-2 border-gray-200">
                        <FormField
                          control={form.control}
                          name="selectedCategory4"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2 mb-1">
                                <ChevronRight className="h-4 w-4" />
                                <FormLabel>Categoria Nível 4</FormLabel>
                              </div>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleCategoryChange(4, value);
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {level4Categories.map(category => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                    
                    {/* Nível 5 - mostrado apenas quando nível 4 estiver selecionado */}
                    {form.watch("selectedCategory4") && level5Categories.length > 0 && (
                      <div className="pl-16 border-l-2 border-gray-200">
                        <FormField
                          control={form.control}
                          name="selectedCategory5"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2 mb-1">
                                <ChevronRight className="h-4 w-4" />
                                <FormLabel>Categoria Nível 5</FormLabel>
                              </div>
                              <Select 
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleCategoryChange(5, value);
                                }}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma subcategoria" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {level5Categories.map(category => (
                                    <SelectItem key={category.id} value={category.id}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Filtrar produtos específicos da última categoria selecionada */}
                {filteredProducts.length > 0 && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-medium mb-2">Filtros de Produtos</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="includeProducts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Incluir Produtos</FormLabel>
                              <Select 
                                onValueChange={(value) => {
                                  const currentValues = [...field.value || []];
                                  if (!currentValues.includes(value)) {
                                    field.onChange([...currentValues, value]);
                                  }
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar produtos para incluir" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {filteredProducts
                                    .filter(product => !(field.value || []).includes(product.id))
                                    .map(product => (
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
                        
                        <FormField
                          control={form.control}
                          name="excludeProducts"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Excluir Produtos</FormLabel>
                              <Select 
                                onValueChange={(value) => {
                                  const currentValues = [...field.value || []];
                                  if (!currentValues.includes(value)) {
                                    field.onChange([...currentValues, value]);
                                  }
                                }}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecionar produtos para excluir" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {filteredProducts
                                    .filter(product => !(field.value || []).includes(product.id))
                                    .map(product => (
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
                  </>
                )}
                
                {/* Original product and category selectors - mantido para compatibilidade */}
                <FormField
                  control={form.control}
                  name="products"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Produtos (seleção direta)</FormLabel>
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
                
                <FormField
                  control={form.control}
                  name="categories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorias (seleção direta)</FormLabel>
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
              </TabsContent>
              
              <TabsContent value="conditions" className="space-y-4">
                {/* Condições e Regras */}
                <FormField
                  control={form.control}
                  name="customerGroups"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grupos de Clientes</FormLabel>
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

                <FormField
                  control={form.control}
                  name="paymentMethods"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Formas de Pagamento</FormLabel>
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
              </TabsContent>
            </Tabs>
            
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
