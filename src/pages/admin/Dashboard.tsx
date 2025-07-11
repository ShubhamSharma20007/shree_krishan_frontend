import React, { useEffect} from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { useFetch } from '@/hooks/useFetch';
import DashboardServiceInstance from "../../../service/dashboard.service"

const Dashboard = () => {

 const [dashboardData, setDashboardData] = React.useState<any>({
  totalBrands: 0,
  totalProducts: 0,
  totalParts: 0,
  totalUsers: 0,
  inventoryByMonth: []
});
 const { fn: getDashboardDataFN, data: getDashboardDataRes,loading } = useFetch(DashboardServiceInstance.getDashboardData);

 useEffect(() => {
  getDashboardDataFN();
}, []);

// This useEffect will update your state when data actually arrives
useEffect(() => {
  if (getDashboardDataRes?.data) {
    setDashboardData(getDashboardDataRes.data);
  }
}, [getDashboardDataRes]);

console.log(dashboardData,123)



const stats = [
  { title: 'Total Brands', value: dashboardData?.totalBrands },
  { title: 'Total Products', value: dashboardData?.totalProducts },
  { title: 'Total Parts', value: dashboardData?.totalParts },
  { title: 'Total Contacts', value: dashboardData?.totalUsers },
];

  const barData = dashboardData?.barData || [];

  const pieData = dashboardData?.pieData || [];

  const inventoryData = dashboardData?.inventoryByMonth || [];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF','#FF6699','#33CCFF','#FFCC00', '#66CC66', '#FF6666', '#9966FF', '#FF9933'];

  return (
    <div className="p-8 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome Back, Admin!</h1>
        <p className="text-lg text-gray-500 italic">“Success usually comes to those who are too busy to be looking for it.”</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="rounded-2xl shadow-md p-4">
            <CardContent className="text-center">
              <h2 className="text-lg font-medium mb-1">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Product Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="products" fill="#4F46E5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Brand Share</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8">
        <Card className="rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Inventory In & Out</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inventoryIn" stroke="#4F46E5" strokeWidth={2} name="Inventory In" />
              <Line type="monotone" dataKey="inventoryOut" stroke="#EC4899" strokeWidth={2} name="Inventory Out" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;
