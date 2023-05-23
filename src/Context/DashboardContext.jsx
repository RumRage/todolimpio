import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

  useEffect(() => {
    getProducts();
    getDisposables();
    getCategories();
    getSchedules(); // Agregar esta línea
  }, []);
   
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
        calculateTotalCategory(); 
      }, [categories]);
    
    //Schedules 

    const [schedules, setSchedules] = useState([]);
    const [combos, setCombos] = useState([]);

    const paymentOptions = {
      1: 'A confirmar',
      2: 'Efectivo',
      3: 'Transferencia',
    };
  
    const statusOptions = {
      1: 'Pendiente',
      2: 'Hecho',
      3: 'Cancelado',
    };

    const statusColors = {
      1: "warning",
      2: "success",
      3: "error",
    };

    const getSchedules = async () => {
      const response = await axios.get("schedules?with=combos"); // Eager Loading
      setSchedules(response.data.data);
    };

    useEffect(() => {
      const fetchCombos = async () => {
        try {
          const response = await axios.get('/combos');
          const fetchedCombos = response.data.data;
          // Combinar los nuevos servicios con los existentes
          const mergedCombos = [...combos, ...fetchedCombos];
          setCombos(mergedCombos);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchCombos();
    }, []);
      


    //Services

    //Combos

  
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
      calculateTotalCategory,
      //Schedules
      schedules, 
      setSchedules,
      combos, 
      setCombos,
      paymentOptions,
      statusOptions,
      statusColors,
      getSchedules
    }}>{children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
