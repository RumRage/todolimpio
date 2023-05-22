import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

   
  //PRODUCTS
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);

  const calculateTotalProduct = () => {
    const total = products.length;
    setTotalProduct(total);
  };

  const getProducts = async () => {
    const apiProducts = await axios.get("products");
    setProducts(apiProducts.data.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    calculateTotalProduct(); 
  }, [products]);

 

  
  return (
    <DashboardContext.Provider 
    value={{
      
      //Products
      products,
      getProducts,
      totalProduct,
      calculateTotalProduct
    }}>{children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
