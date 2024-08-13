"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface dataProps {
  data: dataElements[];
}

interface dataElements {
  name: string; 
  value: number;
}

const COLORS = ['#cc3333', '#ffc000', '#33cc33', '#0088FE', '#FF6699']; 

const DashPieChartPriority = ({ data }: dataProps) => {
  return (
    <Card className="col-span-4 hover:opacity-80">
      <CardHeader>
        <CardTitle>Ticket Counts by Priority</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashPieChartPriority;
