import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

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

  const onChange = (e) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    }

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
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

  const storeProduct = async (e) => {
    e.preventDefault();
    try{
      await axios.post("products", formValues);
      setFormValues(initialForm);
      navigate("/products");
    } catch(e){
      if(e.response.status === 422){
      setErrors(e.response.data.errors);
      }
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault();
        try{
            await axios.put("products/" + product.id, formValues);
            setFormValues(initialForm);
            navigate("/products");
        } catch(e){
            setErrors(e.response.data.errors);
            if(e.response.status === 422){
        }
    }
}

  const deleteProduct = async (id) => {
    if(!window.confirm("Are you sure?")){
      return;
    }
    await axios.delete("products/" + id);
    getProducts();
    }
  

  return <ProductContext.Provider value={{ product, products, getProduct, getProducts, onChange, formValues, storeProduct, errors, updateProduct, deleteProduct, setErrors }}>{children}</ProductContext.Provider>
}

export default ProductContext;
