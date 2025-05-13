
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Check, Tag, Plus, Ticket } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock coupon data - this will be replaced with API data later
const mockCoupons = [
  {
    id: "cpn-123",
    code: "DESCONTO10",
    discount: 10,
    discountType: "percentage",
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cpn-456",
    code: "VOLTA20",
    discount: 20,
    discountType: "percentage",
    expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cpn-789",
    code: "FIDELIDADE15",
    discount: 15,
    discountType: "percentage",
    expiresAt: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "cpn-321",
    code: "DESC5REAIS",
    discount: 5,
    discountType: "fixed",
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const CouponSelectionEnhanced = () => {
  const form = useFormContext();
  const incentiveType = form.watch("incentiveType");
  const selectedCouponId = form.watch("couponId");
  const [showManualDialog, setShowManualDialog] = useState(false);
  const [manualCouponCode, setManualCouponCode] = useState("");
  
  // Format expiry date to dd/mm/yyyy
  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  const handleAddManualCoupon = () => {
    if (!manualCouponCode) return;
    
    // Create custom ID for manual coupon
    const manualCouponId = `custom-${Date.now()}`;
    
    // Set the couponCode separately from couponId
    form.setValue("couponId", manualCouponId);
    form.setValue("couponCode", manualCouponCode);
    
    setShowManualDialog(false);
  };

  if (incentiveType !== "coupon") {
    return null;
  }

  return (
    <div className="space-y-4 border rounded-md p-4">
      <h3 className="text-lg font-medium flex items-center gap-1">
        <Ticket className="h-4 w-4" /> Cupom de Desconto
      </h3>
      
      <FormItem className="space-y-3">
        <FormLabel>Selecione um cupom</FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={(value) => {
              form.setValue("couponId", value);
              // Clear custom coupon code if selecting a predefined coupon
              if (value !== "manual-coupon") {
                form.setValue("couponCode", "");
              }
            }}
            value={selectedCouponId}
            className="space-y-2"
          >
            {mockCoupons.map((coupon) => (
              <div key={coupon.id} className="relative">
                <RadioGroupItem
                  value={coupon.id}
                  id={coupon.id}
                  className="peer sr-only"
                />
                <label
                  htmlFor={coupon.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between w-full p-4 cursor-pointer rounded-md border-2 bg-white peer-data-[state=checked]:border-primary transition-all hover:bg-slate-50"
                >
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">{coupon.code}</span>
                  </div>
                  <div className="mt-2 sm:mt-0 flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4">
                    <Badge variant="outline" className="bg-slate-100">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discount}% de desconto`
                        : `R$ ${coupon.discount.toFixed(2)} de desconto`}
                    </Badge>
                    <span className="text-xs text-slate-500">
                      Válido até {formatExpiryDate(coupon.expiresAt)}
                    </span>
                  </div>
                  <div className="absolute right-4 top-4 opacity-0 peer-data-[state=checked]:opacity-100 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                </label>
              </div>
            ))}
            
            {/* Manual coupon code option */}
            <div className="relative">
              <RadioGroupItem
                value="manual-coupon"
                id="manual-coupon"
                className="peer sr-only"
              />
              <label
                htmlFor="manual-coupon"
                onClick={() => setShowManualDialog(true)}
                className="flex flex-row items-center justify-between w-full p-4 cursor-pointer rounded-md border-2 border-dashed bg-white peer-data-[state=checked]:border-primary transition-all hover:bg-slate-50"
              >
                <div className="flex items-center space-x-2">
                  <Plus className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Inserir código de cupom manualmente</span>
                </div>
                <div className="flex items-center space-x-2">
                  {form.watch("couponCode") && (
                    <Badge variant="outline" className="bg-slate-100">
                      {form.watch("couponCode")}
                    </Badge>
                  )}
                </div>
                <div className="absolute right-4 top-4 opacity-0 peer-data-[state=checked]:opacity-100 text-primary">
                  <Check className="h-4 w-4" />
                </div>
              </label>
            </div>
          </RadioGroup>
        </FormControl>
        <FormMessage />

        {/* Dialog for manual coupon entry */}
        <Dialog open={showManualDialog} onOpenChange={setShowManualDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Inserir código de cupom</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <FormLabel>Código do cupom</FormLabel>
                <Input 
                  placeholder="Ex: DESCONTO10" 
                  value={manualCouponCode} 
                  onChange={(e) => setManualCouponCode(e.target.value)}
                />
              </div>
              <Button onClick={handleAddManualCoupon} className="w-full">
                Adicionar cupom
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </FormItem>
    </div>
  );
};

export default CouponSelectionEnhanced;
