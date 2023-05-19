import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

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

  const onChange = (e) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    }

  const [disposables, setDisposables] = useState([]);
  const [disposable, setDisposable] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
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

  const storeDisposable = async (e) => {
    e.preventDefault();
    try{
      await axios.post("disposables", formValues);
      setFormValues(initialForm);
      navigate("/disposables");
    } catch(e){
      if(e.response.status === 422){
      setErrors(e.response.data.errors);
      }
    }
  }

  const updateDisposable = async (e) => {
    e.preventDefault();
        try{
            await axios.put("disposables/" + disposable.id, formValues);
            setFormValues(initialForm);
            navigate("/disposables");
        } catch(e){
            setErrors(e.response.data.errors);
            if(e.response.status === 422){
        }
    }
}

  const deleteDisposable = async (id) => {
    if(!window.confirm("Estas seguro?")){
      return;
    }
    await axios.delete("disposables/" + id);
    getDisposables();
    }
  

  return <DisposableContext.Provider value={{ disposable, disposables, getDisposable, getDisposables, onChange, formValues, storeDisposable, errors, updateDisposable, deleteDisposable, setErrors }}>{children}</DisposableContext.Provider>
}

export default DisposableContext;
