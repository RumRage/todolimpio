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

  //Disposable

  const [disposables, setDisposables] = useState([]);
  const [totalDisposable, setTotalDisposable] = useState(0);

  const calculateTotalDisposable = () => {
    const total = disposables.length;
    setTotalDisposable(total);
  };

  const getDisposables = async () => {
    const apiDisposables = await axios.get("disposables");
    setDisposables(apiDisposables.data.data);
    };

    useEffect(() => {
        getDisposables();
      }, []);
    
      useEffect(() => {
        calculateTotalDisposable(); 
      }, [disposables]);
    
    //Categories

    const [categories, setCategories] = useState([]);
    const [totalCategory, setTotalCategory] = useState(0);

    const calculateTotalCategory = () => {
        const total = categories.length;
        setTotalCategory(total);
    };

    const getCategories = async () => {
        const apiCategories = await axios.get("categories");
        setCategories(apiCategories.data.data);
    };

    useEffect(() => {
        getCategories();
      }, []);
    
      useEffect(() => {
        calculateTotalCategory(); 
      }, [categories]);


  
  return (
    <DashboardContext.Provider 
    value={{
      
      //Products
      products,
      getProducts,
      totalProduct,
      calculateTotalProduct,
      //Disposables
      disposables,
      getDisposables,
      totalDisposable,
      calculateTotalDisposable,
      //Categories
      categories,
      getCategories,
      totalCategory,
      calculateTotalCategory

    }}>{children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
