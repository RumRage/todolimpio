import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


axios.defaults.baseURL = "https://egxmzwrpk0ntvwkm:zzd908u4ae743bnv@eanl4i1omny740jw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/ovp73xk5ickx2wo1";

const DisposableContext = createContext();

export const DisposableProvider = ({ children }) => {
  const initialForm = {
    name: "",
    description: "",
    price: "",
    supplier: "",
    stock: ""
  };
  const [formValues, setFormValues] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const [disposables, setDisposables] = useState([]);
  const [disposable, setDisposable] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //Breadcrumbs
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  
  const getDisposables = async () => {
    const apiDisposables = await axios.get("disposables");
    setDisposables(apiDisposables.data.data);
    };

  const getDisposable = async (id) => {
    const response = await axios.get("disposables/" + id);
    const apiDisposable = response.data.data
    setDisposable(apiDisposable);
    setFormValues({
    name: apiDisposable.name,
    description: apiDisposable.description,
    price: apiDisposable.price,
    supplier: apiDisposable.supplier,
    stock: apiDisposable.stock
    });
  };

  const refreshIndex = () => {
    window.location.reload();
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const storeDisposable = async (e) => {
    e.preventDefault();
    try{
      await axios.post("disposables", formValues);
      setFormValues(initialForm);
      refreshIndex();
      localStorage.setItem("disposableCreated", "true"); // Descartable creado exitosamente
    } catch(e){
      if(e.response.status === 422){
      setErrors(e.response.data.errors);
      }
    }
  }

  const [updatedSnackbar, setUpdatedSnackbar] = useState(false);

  const handleUpdatedSnackbarClose = () => {
    setUpdatedSnackbar(false);
  };

  const updateDisposable = async (e) => {
    e.preventDefault();
        try{
            await axios.put("disposables/" + disposable.id, formValues);
            setFormValues(initialForm);
            navigate("/disposables");
            setUpdatedSnackbar(true); // Descartable actualizado exitosamente
        } catch(e){
            setErrors(e.response.data.errors);
            if(e.response.status === 422){
        }
    }
}
const [deletedSnackbar, setDeletedSnackbar] = useState(false);

const deleteDisposable = async (id) => {
  await axios.delete("disposables/" + id);
  getDisposables();
  }
  

  return <DisposableContext.Provider value={{ disposable, disposables, getDisposable, getDisposables, onChange, formValues, storeDisposable, errors, updateDisposable, deleteDisposable, setErrors, handleSnackbarClose, openSnackbar, setOpenSnackbar, deletedSnackbar, setDeletedSnackbar, updatedSnackbar, setUpdatedSnackbar, handleUpdatedSnackbarClose, handleClick }}>{children}</DisposableContext.Provider>
}

export default DisposableContext;
