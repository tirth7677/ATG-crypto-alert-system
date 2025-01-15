import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

const CompletedAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalAlerts, setTotalAlerts] = useState(0);

  const fetchCompletedAlerts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8080/api/v1/alerts/completed');
      setAlerts(response.data.data.alerts);
      setTotalAlerts(response.data.data.total);
    } catch (err) {
      setError('Failed to fetch completed alerts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedAlerts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6 ml-64">
        <h1 className="text-3xl font-bold text-center mb-6">Completed Alerts</h1>
        {loading ? (
          <div className="text-center text-lg font-medium">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium">{error}</div>
        ) : (
          <>
            <div className="text-center mb-4 text-lg font-medium">
              Total Completed Alerts: <span className="font-bold">{totalAlerts}</span>
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Symbol</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Condition</th>
                    <th className="border border-gray-300 px-4 py-2">User Email</th>
                    <th className="border border-gray-300 px-4 py-2">Informed</th>
                    <th className="border border-gray-300 px-4 py-2">Created At</th>
                    <th className="border border-gray-300 px-4 py-2">Completed At</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-center">{alert.symbol}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">${alert.price.toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{alert.condition}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{alert.userEmail}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {alert.alreadyInformed ? 'Yes' : 'No'}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(alert.createdAt).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {new Date(alert.completedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompletedAlerts;