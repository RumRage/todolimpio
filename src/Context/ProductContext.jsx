import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


axios.defaults.baseURL = "https://ngstuc3e4tr87w5b:r923wwand6upl39d@g84t6zfpijzwx08q.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/is1h61bcl9xwf1ij";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
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


  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  //Breadcrumbs
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  
  const getProducts = async () => {
    const apiProducts = await axios.get("products");
    setProducts(apiProducts.data.data);
    };

  const getProduct = async (id) => {
    const response = await axios.get("products/" + id);
    const apiProduct = response.data.data
    setProduct(apiProduct);
    setFormValues({
    name: apiProduct.name,
    description: apiProduct.description,
    price: apiProduct.price,
    supplier: apiProduct.supplier,
    stock: apiProduct.stock
    });
  };

  const refreshIndex = () => {
    window.location.reload();
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const storeProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("products", formValues);
      setFormValues(initialForm);
      refreshIndex();
      localStorage.setItem("productCreated", "true"); // Producto creado exitosamente
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

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put("products/" + product.id, formValues);
      setFormValues(initialForm);
      navigate("/products");
      setUpdatedSnackbar(true); // Producto actualizado exitosamente
    } catch (e) {
      setErrors(e.response.data.errors);
      if (e.response.status === 422) {
        // Manejar errores de validación si es necesario
      }
    }
  };

  const [deletedSnackbar, setDeletedSnackbar] = useState(false);

  const deleteProduct = async (id) => {
    await axios.delete("products/" + id);
    getProducts();
    }
  

  return <ProductContext.Provider value={{ product, products, getProduct, getProducts, onChange, formValues, storeProduct, errors, updateProduct, deleteProduct, setErrors, handleSnackbarClose, openSnackbar, setOpenSnackbar, deletedSnackbar, setDeletedSnackbar, updatedSnackbar, setUpdatedSnackbar, handleUpdatedSnackbarClose, handleClick }}>{children}</ProductContext.Provider>
}

export default ProductContext;
