
import {
  BarChart3,
  LineChart,
  PieChart,
  Users,
  DollarSign,
  ShoppingCart,
  Package,
  BadgeDollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytics = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <Select defaultValue="last7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="last7days">Last 7 days</SelectItem>
            <SelectItem value="last30days">Last 30 days</SelectItem>
            <SelectItem value="thisMonth">This month</SelectItem>
            <SelectItem value="lastMonth">Last month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <Users className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-green-600">+15.7% from last period</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,234.23</div>
            <p className="text-xs text-green-600">+22.4% from last period</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Orders</CardTitle>
            <ShoppingCart className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-600">+8.2% from last period</p>
          </CardContent>
        </Card>
        <Card className="bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Products</CardTitle>
            <Package className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
            <p className="text-xs text-green-600">+5.3% from last period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-4 h-4" />
                  Revenue Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Revenue chart will go here */}
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  Revenue Chart Placeholder
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-4 h-4" />
                  Sales Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Sales distribution chart will go here */}
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  Sales Distribution Chart Placeholder
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Product Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Product performance chart will go here */}
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Product Performance Chart Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sales Details</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Sales details content */}
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Sales Details Content Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Inventory content */}
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Inventory Content Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Customer analytics content */}
              <div className="h-[400px] flex items-center justify-center text-gray-500">
                Customer Analytics Content Placeholder
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
