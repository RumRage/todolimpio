import { useContext, useEffect } from "react";
import ProductContext from "../../Context/ProductContext";
import { useParams } from "react-router-dom"; 

export const ProductEdit = () => {
  const { formValues, onChange, errors, setErrors, product, getProduct, updateProduct} = useContext(ProductContext);
  let { id } = useParams();
  useEffect(() => {
  getProduct(id);
  setErrors({});
  }, [])
  return (
    <div className="mt-12">
    <form onSubmit={updateProduct} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
      <div className="space-y-6">
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium">Nombre</label>
          <input name="name" value={formValues["name"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.name && <span className="text-sm text-red-400">{ errors.name[0]}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block mb-2 text-sm font-medium">Descripción</label>
          <input name="description" value={formValues["description"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.description && <span className="text-sm text-red-400">{ errors.description[0]}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block mb-2 text-sm font-medium">Precio</label>
          <input name="price" value={formValues["price"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.price && <span className="text-sm text-red-400">{ errors.price[0]}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="proveedor" className="block mb-2 text-sm font-medium">Proveedor</label>
          <input name="supplier" value={formValues["supplier"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.supplier && <span className="text-sm text-red-400">{ errors.supplier[0]}</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="block mb-2 text-sm font-medium">Stock</label>
          <input name="stock" value={formValues["stock"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.stock && <span className="text-sm text-red-400">{ errors.stock[0]}</span>}
        </div>
      </div>
      <div className="my-4">
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Actualizar</button>
      </div>
    </form>
  </div>
  )
}
