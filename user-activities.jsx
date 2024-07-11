import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DatePicker } from "@/components/ui/date-picker";
import { addDays, format } from "date-fns";

const UsageStatistics = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -7));
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    const formattedStartDate = format(startDate, "yyyy-MM-dd");
    const formattedEndDate = format(endDate, "yyyy-MM-dd");
    const url = `https://bulk-delete-chatgpt-worker.qcrao.com/get-events-summary?start_date=${formattedStartDate}&end_date=${formattedEndDate}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        const processedData = processData(result.data);
        setData(processedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processData = (rawData) => {
    // 数据处理逻辑，将原始数据转换为图表所需的格式
    // 这里需要根据实际数据结构进行调整
    return rawData.map((item) => ({
      date: `${item.date} ${item.hour}:00`,
      deletedConversations: item.total_count,
      uniqueUsers: item.unique_users,
    }));
  };

  return (
    <div className="bg-white bg-opacity-10 rounded-xl p-8 shadow-xl max-w-6xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-center mb-8 gradient-text">
        Usage Statistics
      </h2>

      <div className="flex justify-center space-x-4 mb-8">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={addDays(endDate, -1)}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={addDays(startDate, 1)}
          maxDate={new Date()}
        />
      </div>

      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Deleted Conversations per Hour
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="deletedConversations"
                stroke="#8884d8"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Unique Users per Hour</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="uniqueUsers" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UsageStatistics;
