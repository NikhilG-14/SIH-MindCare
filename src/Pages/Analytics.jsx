import { useMemo } from "react";
import { Link } from "react-router-dom";
import { loadSessions, getLastSession } from "../utils/storage";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ComposedChart, Area, Legend } from "recharts";

function Analytics() {
  const sessions = useMemo(() => loadSessions(), []);
  const last = useMemo(() => getLastSession(), [sessions]);

  const chartData = sessions.map((s) => ({
    date: new Date(s.createdAt).toLocaleDateString(),
    score: s.analysis?.sentiment?.score ?? 0,
    risk: Math.round(((s.presession?.scoring?.depressionRisk ?? 0.5) * 100)) / 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-4 md:p-6">
        <h2 className="text-xl font-semibold text-blue-800 mb-4">Session Analytics</h2>

        {last ? (
          <div className="mb-6">
            <p className="text-blue-900">Last mood: <span className="font-semibold">{last.analysis?.sentiment?.label}</span> (score {last.analysis?.sentiment?.score})</p>
            <p className="text-sm text-blue-700">Date: {new Date(last.createdAt).toLocaleString()}</p>
            <div className="mt-2 text-sm text-blue-700">Convo length: {last.messages?.length ?? 0} messages</div>
          </div>
        ) : (
          <p className="text-blue-900">No sessions yet. Start one now.</p>
        )}

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" domain={[-5, 5]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="score" name="Sentiment Score" stroke="#2563eb" strokeWidth={2} dot={true} />
              <Area yAxisId="right" type="monotone" dataKey="risk" name="Depression Risk" stroke="#10b981" fill="#10b98122" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to="/therapy" className="px-4 py-2 rounded-lg bg-blue-600 text-white">New Session</Link>
          <Link to="/recommendations" className="px-4 py-2 rounded-lg bg-green-600 text-white">See Recommendations</Link>
        </div>
      </div>
    </div>
  );
}

export default Analytics;


