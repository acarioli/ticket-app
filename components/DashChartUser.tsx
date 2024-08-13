"use client";

import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface dataProps {
  data: dataElements[];
}

interface dataElements {
  name: string;  
  total: number;
}

const DashChart = ({ data }: dataProps) => {
  return (
    <Card className="col-span-4 hover:opacity-80">
      <CardHeader>
        <CardTitle>Ticket Counts by User</CardTitle> 
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} layout="vertical"> 
            <XAxis
              type="number"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={150} 
            />
            <Bar dataKey="total" fill="#cc3333" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default DashChart;
