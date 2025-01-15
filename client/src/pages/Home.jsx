import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/Sidebar';

const Home = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Adjust this as necessary

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/prices/page?page=${page}`);
      setCryptoData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cryptocurrency data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-6 ml-64">
        <h1 className="text-3xl font-bold text-center mb-6">Cryptocurrency Prices</h1>

        {loading ? (
          <div className="text-center text-lg font-medium">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Symbol</th>
                  <th className="border border-gray-300 px-4 py-2">Current Price (USD)</th>
                  <th className="border border-gray-300 px-4 py-2">Market Cap</th>
                  <th className="border border-gray-300 px-4 py-2">24h High</th>
                  <th className="border border-gray-300 px-4 py-2">24h Low</th>
                  <th className="border border-gray-300 px-4 py-2">Price Change (24h)</th>
                  <th className="border border-gray-300 px-4 py-2">Price Change % (24h)</th>
                  <th className="border border-gray-300 px-4 py-2">Total Volume</th>
                  <th className="border border-gray-300 px-4 py-2">ATH</th>
                  <th className="border border-gray-300 px-4 py-2">ATH Change %</th>
                  <th className="border border-gray-300 px-4 py-2">ATH Date</th>
                  <th className="border border-gray-300 px-4 py-2">ATL</th>
                  <th className="border border-gray-300 px-4 py-2">ATL Change %</th>
                  <th className="border border-gray-300 px-4 py-2">ATL Date</th>
                  <th className="border border-gray-300 px-4 py-2">Circulating Supply</th>
                  <th className="border border-gray-300 px-4 py-2">Total Supply</th>
                  <th className="border border-gray-300 px-4 py-2">Max Supply</th>
                  <th className="border border-gray-300 px-4 py-2">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {cryptoData.map((crypto) => (
                  <tr key={crypto.id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mx-auto" />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{crypto.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{crypto.symbol.toUpperCase()}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.current_price.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.market_cap.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.high_24h.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.low_24h.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.price_change_24h.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {crypto.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.total_volume.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.ath.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {crypto.ath_change_percentage.toFixed(2)}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {new Date(crypto.ath_date).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      ${crypto.atl.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {crypto.atl_change_percentage.toFixed(2)}%
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {new Date(crypto.atl_date).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {crypto.circulating_supply.toLocaleString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {crypto.total_supply ? crypto.total_supply.toLocaleString() : 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {crypto.max_supply ? crypto.max_supply.toLocaleString() : 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {new Date(crypto.last_updated).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white font-medium rounded ${
              currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Previous
          </button>
          <span className="font-medium text-lg">Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white font-medium rounded ${
              currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
