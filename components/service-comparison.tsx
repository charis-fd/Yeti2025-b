import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceComparisonChart = () => {
  const preService = {
    period: 'Pre-Service (Oct)',
    consumption: 2.59,
    distance: 887,
    oilAdded: 2.3,
    dailyConsumption: (2300 / 887).toFixed(1),
    daysMonitored: 22,
    efficiency: (887 / 2.3).toFixed(0)
  };

  const postService = {
    period: 'Post-Service (Nov-Dec)',
    consumption: 1.37,
    distance: 2013,
    oilAdded: 2.75,
    dailyConsumption: (2750 / 2013).toFixed(1),
    daysMonitored: 45,
    efficiency: (2013 / 2.75).toFixed(0)
  };

  const data = [preService, postService];

  const comparisonData = [
    { metric: 'Oil Consumption', before: preService.consumption, after: postService.consumption, unit: 'L/1000km' },
    { metric: 'Efficiency', before: parseInt(preService.efficiency), after: parseInt(postService.efficiency), unit: 'km/L' },
    { metric: 'Daily Distance', 
      before: (preService.distance/preService.daysMonitored), 
      after: (postService.distance/postService.daysMonitored),
      unit: 'km/day'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Keep existing analysis cards */}
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Service Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {data.map((period) => (
              <div key={period.period} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">{period.period}</h3>
                <div className="space-y-2 text-sm">
                  <div>Monitoring Period: {period.daysMonitored} days</div>
                  <div>Distance Driven: {period.distance} km</div>
                  <div>Total Oil Added: {period.oilAdded}L</div>
                  <div>Daily Distance: {(period.distance/period.daysMonitored).toFixed(1)} km/day</div>
                  <div>Oil Consumption: {period.consumption} L/1000km</div>
                  <div className="font-semibold text-green-700">Efficiency: {period.efficiency} km/L</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Service Improvement</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm">Consumption Improvement</div>
                <div className="text-xl font-bold text-green-700">
                  {((preService.consumption - postService.consumption)/preService.consumption * 100).toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm">Efficiency Improvement</div>
                <div className="text-xl font-bold text-green-700">
                  {((postService.efficiency - preService.efficiency)/preService.efficiency * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* New mobile-friendly comparison chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={comparisonData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  type="category" 
                  dataKey="metric" 
                  width={100}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toFixed(1)} ${comparisonData.find(d => d.metric === name)?.unit || ''}`,
                    name
                  ]}
                />
                <Legend />
                <Bar dataKey="before" name="Pre-Service" fill="#ff7043" />
                <Bar dataKey="after" name="Post-Service" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Impact percentage visualization */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-4">Service Impact Timeline</h3>
            <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-green-500 flex items-center justify-end px-4 text-white font-bold"
                style={{ width: '89.6%' }}
              >
                89.6% Improved
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceComparisonChart;