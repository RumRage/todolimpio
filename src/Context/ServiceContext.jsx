import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const initialForm = {
    name: "",
    category_id: "",
    price: "",
  };
  const [formValues, setFormValues] = useState(initialForm);

  const onChange = (e) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    }

  const [services, setServices] = useState([]);
  const [service, setService] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  const getServices = async () => {
    const apiServices = await axios.get("services");
    setServices(apiServices.data.data);
    };

  const getService = async (id) => {
    const response = await axios.get("services/" + id);
    const apiService = response.data.data;
  
    // Obtén el objeto de la categoría seleccionada por su nombre
    const selectedCategory = categories.find(category => category.name === apiService.category_name);
  
    setService(apiService);
    setFormValues({
      name: apiService.name,
      category_id: selectedCategory ? selectedCategory.id : "", // Asigna category_id en lugar de category_name
      price: apiService.price,
    });
  };
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCategories();
  }, []);

  const storeService = async (e) => {
    e.preventDefault();
    try{
      await axios.post("services", formValues);
      setFormValues(initialForm);
      navigate("/services");
    } catch(e){
      if(e.response.status === 422){
      setErrors(e.response.data.errors);
      }
    }
  }



  const updateService = async (e) => {
    e.preventDefault();
        try{
            await axios.put("services/" + service.id, formValues);
            setFormValues(initialForm);
            navigate("/services");
        } catch(e){
            setErrors(e.response.data.errors);
            if(e.response.status === 422){
        }
    }
}

  const deleteService = async (id) => {
    await axios.delete("services/" + id);
    getServices();
    }
  

  return <ServiceContext.Provider value={{ service, services, getService, getServices, onChange, formValues, storeService, errors, updateService, deleteService, setErrors, categories, setCategories }}>{children}</ServiceContext.Provider>
}

export default ServiceContext;
