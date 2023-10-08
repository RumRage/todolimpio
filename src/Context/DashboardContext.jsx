import { createContext, useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "mysql://egxmzwrpk0ntvwkm:zzd908u4ae743bnv@eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ovp73xk5ickx2wo1

";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

  useEffect(() => {
    getProducts();
    getDisposables();
    getCategories();
    getSchedules();
    getServices();
    getCombos();
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

    const [services, setServices] = useState([]);
    const [totalService, setTotalService] = useState(0);

    const calculateTotalService = () => {
        const total = services.length;
        setTotalService(total);
    };

    const getServices = async () => {
      const apiServices = await axios.get("services");
      setServices(apiServices.data.data);
      };

      useEffect(() => {
        calculateTotalService(); 
      }, [services]);

    //Combos
    
    const [combos, setCombos] = useState([]);
    const [totalCombo, setTotalCombo] = useState(0);

    const calculateTotalCombo = () => {
      const total = combos.length;
      setTotalCombo(total);
    };

    const getCombos = async () => {
      const response = await axios.get("combos?with=services"); // Eager Loading
      setCombos(response.data.data);
    };


    useEffect(() => {
      calculateTotalCombo(); 
    }, [combos]);
  
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
      getSchedules,
      //Services
      services,
      getServices,
      totalService,
      calculateTotalService,
      setServices,
       //Combos
       combos,
       getCombos,
       totalCombo,
       calculateTotalCombo,
       setCombos
    }}>{children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;
