
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Activity, CreditCard, PercentIcon, Tag, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockPromotions } from "@/components/promocoes/mockData";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
];

const promotionTypeData = [
  { name: "Desconto em Produtos", value: 5 },
  { name: "Tempo Limitado", value: 3 },
  { name: "Desconto por Valor", value: 4 },
  { name: "Compre X Ganhe Y", value: 2 }
];

const COLORS = ['#FF8042', '#FFBB28', '#0088FE', '#00C49F'];

const Index = () => {
  // Filtrar promoções ativas
  const activePromotions = mockPromotions.filter(promo => promo.status === 'active');
  
  // Calcular estatísticas de promoções
  const totalRevenue = mockPromotions.reduce((total, promo) => total + promo.statistics.revenue, 0);
  const totalDiscounts = mockPromotions.reduce((total, promo) => total + promo.statistics.discountTotal, 0);
  const totalUsage = mockPromotions.reduce((total, promo) => total + promo.statistics.usageCount, 0);
  const avgOrderValue = totalUsage > 0 ? totalRevenue / totalUsage : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Faturamento Total</CardTitle>
            <DollarSign className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-green-600">+20.1% no último mês</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clientes Ativos</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,234</div>
            <p className="text-xs text-green-600">+15% na última semana</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Valor Médio do Pedido</CardTitle>
            <Activity className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-green-600">+5% na última hora</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total de Transações</CardTitle>
            <CreditCard className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsage}</div>
            <p className="text-xs text-green-600">+12% desde ontem</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Visão Geral da Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#ff8a65"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tipos de Promoções</CardTitle>
            <PercentIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={promotionTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {promotionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Promoções Ativas</CardTitle>
          <Link to="/promocoes">
            <Button variant="outline" size="sm">Ver todas</Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activePromotions.slice(0, 3).map((promotion) => (
              <div key={promotion.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  {promotion.type === 'product_discount' && <Tag className="h-4 w-4 text-primary" />}
                  {promotion.type === 'time_limited' && <Calendar className="h-4 w-4 text-primary" />}
                  {promotion.type === 'order_value_discount' && <DollarSign className="h-4 w-4 text-primary" />}
                  {promotion.type === 'buy_x_get_y' && <PercentIcon className="h-4 w-4 text-primary" />}
                  <div>
                    <p className="font-medium">{promotion.name}</p>
                    <p className="text-xs text-muted-foreground">{promotion.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {promotion.discountType === 'percentage' ? `${promotion.discountValue}%` : `R$ ${promotion.discountValue.toFixed(2)}`}
                  </p>
                  <p className="text-xs text-muted-foreground">{promotion.statistics.usageCount} usos</p>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <Link to="/promocoes">
                <Button variant="ghost" size="sm">Ver todas as promoções</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
