 // Ensure Recharts is loaded before using it
 if (typeof Recharts === "undefined") {
  console.error("Recharts is not loaded. Please check the script tag.");
} else {
  const {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } = Recharts;

  const DateRangeSelector = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
  }) => {
    const handleStartDateChange = (e) => {
      const newStartDate = e.target.value;
      if (new Date(newStartDate) <= new Date(endDate)) {
        onStartDateChange(newStartDate);
      } else {
        alert("Start date must be before or equal to end date");
      }
    };

    const handleEndDateChange = (e) => {
      const newEndDate = e.target.value;
      if (
        new Date(newEndDate) >= new Date(startDate) &&
        (new Date(newEndDate) - new Date(startDate)) /
          (1000 * 60 * 60 * 24) <=
          7
      ) {
        onEndDateChange(newEndDate);
      } else {
        alert(
          "End date must be after or equal to start date and within 7 days of start date"
        );
      }
    };

    return (
      <div className="flex justify-center space-x-8 mb-12">
        <div>
          <label
            htmlFor="start-date"
            className="block text-xl font-medium text-white mb-3">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black text-xl p-3"
          />
        </div>
        <div>
          <label
            htmlFor="end-date"
            className="block text-xl font-medium text-white mb-3">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black text-xl p-3"
          />
        </div>
      </div>
    );
  };

  const UsageStatsDashboardTest = () => {
    return <div>Dashboard is loading...</div>;
  };

  const UsageStatsDashboard = () => {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const getTodayDate = () => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    };

    const getOneWeekAgo = () => {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return oneWeekAgo.toISOString().split("T")[0];
    };

    const [endDate, setEndDate] = React.useState(getTodayDate());
    const [startDate, setStartDate] = React.useState(getOneWeekAgo());

    React.useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://bulk-delete-chatgpt-worker.qcrao.com/get-events-summary?start_date=${startDate}&end_date=${endDate}`
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
    }, [startDate, endDate]);

    const formatData = (data) => {
      return data.map((item) => ({
        ...item,
        dateTime: `${item.date} ${item.hour}:00`,
      }));
    };

    if (loading)
      return (
        <div className="text-center text-white text-2xl">Loading...</div>
      );
    if (error)
      return (
        <div className="text-center text-red-500 text-2xl">{error}</div>
      );

    const formattedData = formatData(data);

    return (
      <div className="space-y-16 p-8 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg">
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
        <div>
          <h3 className="text-3xl font-semibold mb-8 text-white text-center">
            Hourly Deletion Count
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateTime" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="total_count"
                fill="#8884d8"
                name="Deletions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-8 text-white text-center">
            Unique Users per Hour
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateTime" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="unique_users"
                stroke="#82ca9d"
                name="Unique Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-3xl font-semibold mb-8 text-white text-center">
            Hourly Page Views (PV)
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dateTime" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total_count"
                stroke="#8884d8"
                name="Page Views"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  ReactDOM.render(
    <UsageStatsDashboard />,
    document.getElementById("usage-stats-dashboard")
  );
}