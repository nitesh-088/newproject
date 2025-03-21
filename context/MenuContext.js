
// Context बनाएं

// Provider Component
export const MenuProvider = ({ children }) => {
  

  const fetchMenu = async () => {
    try {
      const response = await fetch("https://64facetscrm.com/theme/menu_Display");
      const data = await response.json();

      if (data.status === "success") {
        setMenu(data.menu);
      }
    } catch (error) {
      console.error("Error fetching the menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ menu, loading }}>
      {children}
    </MenuContext.Provider>
  );
};

// Context उपयोग करने का Hook
export const useMenu = () => useContext(MenuContext);
