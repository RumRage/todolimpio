import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "mysql://egxmzwrpk0ntvwkm:zzd908u4ae743bnv@eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ovp73xk5ickx2wo1"

";

const ComboContext = createContext();

export const ComboProvider = ({ children }) => {
  const initialForm = {
  name: "",
  service_id: [],
  price: "",
  discount: "",
  total_price: ""
  };

  const [formValues, setFormValues] = useState(initialForm);
  const [combos, setCombos] = useState([]);
  const [combo, setCombo] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      },
    },
  };

  //Breadcrumbs
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const getCombos = async () => {
    const response = await axios.get("combos?with=services"); // Eager Loading
    setCombos(response.data.data);
  };

  const calculateTotalPrice = (selectedServiceIds) => {
    const totalPrice = selectedServiceIds.reduce((sum, serviceId) => {
      const service = services.find(service => service.id === serviceId);
      return sum + (service ? Number(service.price) : 0);
    }, 0);
  
    const discount = Number(formValues.discount);
    const discountedPrice = totalPrice - discount;
  
    setFormValues(prevValues => ({
      ...prevValues,
      price: totalPrice.toFixed(2), // Mostrar el precio sin descuento con 2 decimales
      total_price: discountedPrice.toFixed(2), // Mostrar el precio con descuento con 2 decimales
    }));
  };
  const calculateDiscountedPrice = () => {
    if (formValues.service_id.length > 0) {
      const selectedPrices = formValues.service_id.map(serviceId => {
        const service = services.find(service => service.id === serviceId);
        return service ? parseFloat(service.price) : 0;
      });
      const totalPrice = selectedPrices.reduce((acc, curr) => acc + curr);
      const discount = parseFloat(formValues.discount || 0);
      const discountedPrice = totalPrice * (1 - discount / 100);
    
      setFormValues(prevValues => ({
        ...prevValues,
        price: totalPrice.toFixed(2), // Mostrar el precio sin descuento con 2 decimales
        total_price: discountedPrice.toFixed(2), // Mostrar el precio con descuento con 2 decimales
      }));
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        price: "0.00",
        total_price: "0.00",
      }));
    }
  };
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        const fetchedServices = response.data.data;
        // Combinar los nuevos servicios con los existentes
        const mergedServices = [...services, ...fetchedServices];
        setServices(mergedServices);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchServices();
  }, []);
  
  useEffect(() => {
    calculateDiscountedPrice();
  }, [formValues.service_id, formValues.discount]);
  

  const onChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'service_id') {
      const selectedServiceIds = Array.isArray(value) ? value.map(serviceId => Number(serviceId)) : [];
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: selectedServiceIds,
      }));
      calculateTotalPrice(selectedServiceIds); // Calcular el precio total con los service_id seleccionados
    } else if (name === 'discount') {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
      calculateDiscountedPrice(); // Calcular el precio total con descuento
    } else {
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const getCombo = async (id) => {
    const response = await axios.get("combos/" + id);
    const apiCombo = response.data.data;

    // Obtener todos los service_id del combo actual
    const selectedServiceIds = apiCombo.services.map(service => service.id);

    setCombo(apiCombo);
    setFormValues((prevValues) => ({
      ...prevValues,
      name: apiCombo.name,
      service_id: selectedServiceIds, 
      price: apiCombo.price,
      discount: apiCombo.discount,
      total_price: apiCombo.total_price,
    }));
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        const fetchedServices = response.data.data;
        // Combinar los nuevos servicios con los existentes
        const mergedServices = [...services, ...fetchedServices];
        setServices(mergedServices);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

  const refreshIndex = () => {
    window.location.reload();
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const storeCombo = async (e) => {
    e.preventDefault();
      try {
        await axios.post("combos", {
          name: formValues.name,
          price: formValues.price,
          discount: formValues.discount,
          total_price: formValues.total_price,
          service_id: formValues.service_id 
        });
      setFormValues(initialForm);
      refreshIndex();
      localStorage.setItem("comboCreated", "true"); // Combo creado exitosamente
      } catch (e) {
        if (e.response.status === 422) {
         setErrors(e.response.data.errors);
      }
    }
  };

  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);

  const handleUpdatedSnackbarClose = () => {
    setUpdatedSnackbar(false);
  };

  const updateCombo = async (e) => {
    e.preventDefault();
    try {
      await axios.put("combos/" + combo.id, formValues);
      setFormValues(initialForm);
      navigate("/combos");
      setUpdatedSnackbar(true); // Combo actualizado exitosamente
    } catch (e) {
      setErrors(e.response.data.errors);
        if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const [deletedSnackbar, setDeletedSnackbar] = useState(false);

  const deleteCombo = async (id) => {
    await axios.delete("combos/" + id);
    getCombos();
  };

  return (
    <ComboContext.Provider 
    value={{ 
      combo, 
      combos, 
      getCombo, 
      getCombos, 
      onChange, 
      formValues, 
      storeCombo, 
      errors, 
      updateCombo, 
      deleteCombo, 
      setErrors, 
      services, 
      setServices,
      MenuProps,
      handleSnackbarClose, 
      openSnackbar, 
      setOpenSnackbar, 
      deletedSnackbar, 
      setDeletedSnackbar, 
      updatedSnackbar, 
      setUpdatedSnackbar, 
      handleUpdatedSnackbarClose, 
      handleClick
    }}>{children}
    </ComboContext.Provider>
  );
};

export default ComboContext;
