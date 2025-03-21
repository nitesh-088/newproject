import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const ApiContext = createContext();

// Provider Component
export const ApiProvider = ({ children }) => {
  const [data, setData] = useState(null); // API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch API Data
    const fetchData = async () => {
      try {
        const response = await fetch("https://64facetscrm.com/theme/thim_Display");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched API data:", result);

        
        setData(result); // Store the fetched data
      } catch (err) {
        setError(err.message); // Handle fetch errors
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false); // Stop the loading state
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={{ data, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom Hook to Use Context
export const useApi = () => useContext(ApiContext);
