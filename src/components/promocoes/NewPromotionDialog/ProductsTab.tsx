
import React from "react";
import ProductGroupSelector from "../ProductGroupSelector";

const ProductsTab: React.FC = () => {
  const handleProductSelection = (selection: {
    type: 'group' | 'manual';
    data: string[] | string;
  }) => {
    console.log("Seleção de produtos:", selection);
    // Aqui você pode implementar a lógica para usar a seleção
  };

  return (
    <div className="space-y-4">
      <ProductGroupSelector onSelectionChange={handleProductSelection} />
    </div>
  );
};

export default ProductsTab;
