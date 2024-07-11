import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const UsageStatsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bulk-delete-chatgpt-worker.qcrao.com/get-events-summary?start_date=2024-06-20&end_date=2024-09-25"
        );
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatData = (data) => {
    return data.map((item) => ({
      ...item,
      dateTime: `${item.date} ${item.hour}:00`,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4">Hourly Deletion Count</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatData(data)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateTime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_count" fill="#8884d8" name="Deletions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Unique Users per Hour</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatData(data)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateTime" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="unique_users" fill="#82ca9d" name="Unique Users" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageStatsDashboard;
