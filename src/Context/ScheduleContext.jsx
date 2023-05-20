import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
    const initialForm = {
        name: "",
        tel: "",
        address: "",
        date_time: "",
        combo_id: [],
        price: "",
        discount: "",
        total_price: "",
        payments: 1, 
      };

  const [formValues, setFormValues] = useState(initialForm);
  const [schedules, setSchedules] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [combos, setCombos] = useState([]);
  const [payments, setPayments] = useState('');
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

  const getSchedules = async () => {
    const response = await axios.get("schedules?with=combos"); // Eager Loading
    setSchedules(response.data.data);
  };

  const calculateTotalPrice = (selectedComboIds) => {
    const totalPrice = selectedComboIds.reduce((sum, comboId) => {
      const combo = combos.find(combo => combo.id === comboId);
      return sum + (combo ? Number(combo.price) : 0);
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
    if (formValues.combo_id.length > 0) {
      const selectedPrices = formValues.combo_id.map(comboId => {
        const combo = combos.find(combo => combo.id === comboId);
        return combo ? parseFloat(combo.price) : 0;
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
  
  useEffect(() => {
    calculateDiscountedPrice();
  }, [formValues.combo_id, formValues.discount]);
  

  const onChange = (event) => {
    const { name, value } = event.target;
    setPayments(event.target.value);
    if (name === 'combo_id') {
      const selectedComboIds = Array.isArray(value) ? value.map(comboId => Number(comboId)) : [];
      setFormValues(prevValues => ({
        ...prevValues,
        [name]: selectedComboIds,
      }));
      calculateTotalPrice(selectedComboIds); // Calcular el precio total con los combo_id seleccionados
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

  const getSchedule = async (id) => {
    const response = await axios.get("schedules/" + id);
    const apiSchedule = response.data.data;

    // Obtener todos los combo_id del schedule actual
    const selectedComboIds = apiSchedule.combos.map(combo => combo.id);

    setSchedule(apiSchedule);
    setFormValues((prevValues) => ({
      ...prevValues,
      name: apiSchedule.name,
      tel: apiSchedule.tel,
      address: apiSchedule.address,
      date_time: apiSchedule.date_time,
      combo_id: selectedComboIds, 
      price: apiSchedule.price,
      discount: apiSchedule.discount,
      total_price: apiSchedule.total_price,
      payments: apiSchedule.payments,
    }));
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

  const storeSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post("schedules", {
        name: formValues.name,
        tel: formValues.tel,
        address: formValues.address,
        date_time: formValues.date_time,
        combo_id: formValues.combo_id,
        price: formValues.price,
        discount: formValues.discount,
        total_price: formValues.total_price,
        payments: parseInt(formValues.payments), // Agrega el campo de pagos
      });
      setFormValues(initialForm);
      navigate("/schedules");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const updateSchedule = async (e) => {
    e.preventDefault();
    try {
      await axios.put("schedules/" + schedule.id, formValues);
      setFormValues(initialForm);
      navigate("/schedules");
    } catch (e) {
      setErrors(e.response.data.errors);
        if (e.response.status === 422) {
        setErrors(e.response.data.errors);
      }
    }
  };

  const deleteSchedule = async (id) => {
    if (!window.confirm("Estás seguro?")) {
      return;
    }
    await axios.delete("schedules/" + id);
    getSchedules();
  };

  return (
    <ScheduleContext.Provider 
    value={{ 
      schedule, 
      schedules, 
      getSchedule, 
      getSchedules, 
      onChange, 
      formValues, 
      storeSchedule, 
      errors, 
      updateSchedule, 
      deleteSchedule, 
      setErrors, 
      combos, 
      setCombos,
      MenuProps,
      payments,
    }}>{children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
