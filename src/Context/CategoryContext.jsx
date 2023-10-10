import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "https://ngstuc3e4tr87w5b:r923wwand6upl39d@g84t6zfpijzwx08q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/is1h61bcl9xwf1ij";

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
      
      
    //Breadcrumbs
    function handleClick(event) {
      event.preventDefault();
      console.info("You clicked a breadcrumb.");
    }

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
    
    const refreshIndex = () => {
        window.location.reload();
      };
    
      const [openSnackbar, setOpenSnackbar] = useState(false);
    
      const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };

    const storeCategory = async (e) => {
        e.preventDefault();
            try{
                await axios.post("categories", formValues);
                setFormValues(initialForm);
                refreshIndex();
                localStorage.setItem("categoryCreated", "true"); // Categoria creada exitosamente
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
    
    const updateCategory = async (e) => {
        e.preventDefault();
            try{
                await axios.put("categories/" + category.id, formValues);
                setFormValues(initialForm);
                navigate("/categories");
                setUpdatedSnackbar(true); // Categoria actualizada exitosamente
            } catch(e){
                setErrors(e.response.data.errors);
                if(e.response.status === 422){
            }
        }
    }

    const [deletedSnackbar, setDeletedSnackbar] = useState(false);

    const deleteCategory = async (id) => {
        await axios.delete("categories/" + id);
        getCategories();
    }

    
    return (
        <CategoryContext.Provider value={{category, categories, getCategory, getCategories, onChange, formValues, storeCategory, errors, updateCategory, deleteCategory, setErrors, handleSnackbarClose, openSnackbar, setOpenSnackbar, deletedSnackbar, setDeletedSnackbar, updatedSnackbar, setUpdatedSnackbar, handleUpdatedSnackbarClose, handleClick}}>{children}</CategoryContext.Provider>
    )
}

export default CategoryContext;
