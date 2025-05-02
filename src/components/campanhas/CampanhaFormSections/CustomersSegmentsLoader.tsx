
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { CustomerSegment } from "@/types/campaign";

interface CustomersSegmentsLoaderProps {
  children: (segments: CustomerSegment[], isLoading: boolean) => React.ReactNode;
}

const CustomersSegmentsLoader: React.FC<CustomersSegmentsLoaderProps> = ({ children }) => {
  // Fetch customer segments from Supabase
  const { data: customerSegments = [], isLoading: loadingSegments } = useQuery({
    queryKey: ['customer_segments'],
    queryFn: async () => {
      // Try to fetch from Supabase
      const { data: segmentsData, error } = await supabase
        .from('segments')
        .select('*');
        
      if (error) {
        console.error("Error loading segments:", error);
        return [];
      }
      
      if (!segmentsData || segmentsData.length === 0) {
        // Return mock data if no segments found
        return [
          {
            id: "seg-1",
            name: "Todos os clientes",
            description: "Todos os clientes cadastrados",
            customerCount: 2500
          },
          {
            id: "seg-2",
            name: "Clientes VIP",
            description: "Clientes com alto valor de compra",
            customerCount: 350
          },
          {
            id: "seg-3",
            name: "Clientes inativos",
            description: "Clientes sem compras nos últimos 30 dias",
            customerCount: 1200
          },
          {
            id: "seg-4",
            name: "Novos clientes",
            description: "Clientes que fizeram a primeira compra nos últimos 15 dias",
            customerCount: 180
          },
          {
            id: "seg-5",
            name: "Aniversariantes do mês",
            description: "Clientes que fazem aniversário este mês",
            customerCount: 75
          }
        ];
      }
      
      // Convert Supabase data to our CustomerSegment type
      return segmentsData.map(seg => ({
        id: seg.id,
        name: seg.name,
        description: seg.description || "",
        customerCount: seg.customer_count || 0
      }));
    },
    initialData: []
  });

  return <>{children(customerSegments, loadingSegments)}</>;
};

export default CustomersSegmentsLoader;
