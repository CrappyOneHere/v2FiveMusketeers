import React from "react";
import { useParams } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const fakeSalesData = [
  { date: "Mar 21", sales: 10 },
  { date: "Mar 25", sales: 15 },
  { date: "Mar 28", sales: 5 },
  { date: "Apr 1", sales: 20 },
  { date: "Apr 5", sales: 18 },
  { date: "Apr 10", sales: 22 },
  { date: "Apr 15", sales: 25 },
  { date: "Apr 20", sales: 30 },
];

const ProductStats = () => {
  const { productId } = useParams();
  const nav = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📊 Product Stats for ID: {productId}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={fakeSalesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: 'Sales', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="text-center mt-4">
        <Button variant="secondary" onClick={() => nav(-1)}>← Back</Button>
      </div>
    </div>
  );
};

export default ProductStats;
