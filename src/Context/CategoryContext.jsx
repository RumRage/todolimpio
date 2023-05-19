import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {

    const initialForm = {
        name: ""
    };

    const [formValues, setFormValues] = useState(initialForm)
    
    const onChange = (e) => {
      const { name, value} = e.target;
      setFormValues({...formValues, [name]: value});
      }

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
      

    const getCategories = async () => {
      const apiCategories = await axios.get("categories");
      setCategories(apiCategories.data.data);
      };

    const getCategory = async (id) => {
      const response = await axios.get("categories/" + id);
      const apiCategory = response.data.data
      setCategory(apiCategory);
      setFormValues({
      name: apiCategory.name
      });
    };
      
    const storeCategory = async (e) => {
        e.preventDefault();
            try{
                await axios.post("categories", formValues);
                setFormValues(initialForm);
                navigate("/categories");
            } catch(e){
                if(e.response.status === 422){
                setErrors(e.response.data.errors);
            }
        }
    }

    const updateCategory = async (e) => {
        e.preventDefault();
            try{
                await axios.put("categories/" + category.id, formValues);
                setFormValues(initialForm);
                navigate("/categories");
            } catch(e){
                setErrors(e.response.data.errors);
                if(e.response.status === 422){
            }
        }
    }

    const deleteCategory = async (id) => {
        if(!window.confirm("Estás seguro?")){
            return;
        }
        await axios.delete("categories/" + id);
        getCategories();
    }

    
    return (
        <CategoryContext.Provider value={{category, categories, getCategory, getCategories, onChange, formValues, storeCategory, errors, updateCategory, deleteCategory, setErrors}}>{children}</CategoryContext.Provider>
    )
}

export default CategoryContext;