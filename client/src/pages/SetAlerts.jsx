import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

const SetAlerts = () => {
  const [formData, setFormData] = useState({
    symbol: '',
    price: '',
    condition: 'above',
    userEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/v1/alerts', formData);
      setSuccess(response.data.message);
      setFormData({ symbol: '', price: '', condition: 'above', userEmail: '' });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to set price alert. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6 ml-64">
        <h1 className="text-3xl font-bold text-center mb-6">Set Price Alerts</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="mb-4">
            <label htmlFor="symbol" className="block text-gray-700 font-bold mb-2">
              Symbol
            </label>
            <input
              type="text"
              id="symbol"
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              required
              placeholder="Enter cryptocurrency symbol (e.g., BTC)"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="Enter target price (e.g., 50000)"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="condition" className="block text-gray-700 font-bold mb-2">
              Condition
            </label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="above">Above</option>
              <option value="below">Below</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="userEmail" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 font-bold text-white rounded ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Setting Alert...' : 'Set Alert'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetAlerts;
