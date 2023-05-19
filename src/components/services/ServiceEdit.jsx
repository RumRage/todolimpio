import { useContext, useEffect } from "react";
import ServiceContext from "../../Context/ServiceContext";
import { useParams } from "react-router-dom"; 

export const ServiceEdit = () => {
  const { formValues, onChange, errors, setErrors, service, getService, updateService, categories, setCategories } = useContext(ServiceContext);
  let { id } = useParams();
  useEffect(() => {
  getService(id);
  setErrors({});
  }, [])
  return (
    <div className="mt-12">
    <form onSubmit={updateService} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
      <div className="space-y-6">
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium">Nombre</label>
          <input name="name" value={formValues["name"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.name && <span className="text-sm text-red-400">{ errors.name[0]}</span>}
        </div>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Categoria</label>
            <select
              name="category_id"
              value={formValues.category_id}
              onChange={onChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            >
              <option value="">Seleccione una categoría</option>
              {categories.map(category => (
                <option
                  key={category.id}
                  value={category.id}
                  defaultValue={category.id === formValues.category_id ? "selected" : undefined} // Establece el atributo "defaultValue" si es la categoría seleccionada
                >
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category_id && <span className="text-sm text-red-400">{ errors.category_id[0]}</span>}
          </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block mb-2 text-sm font-medium">Precio</label>
          <input name="price" value={formValues["price"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
          {errors.price && <span className="text-sm text-red-400">{ errors.price[0]}</span>}
        </div>
      </div>
      <div className="my-4">
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Actualizar</button>
      </div>
    </form>
  </div>
  )
}
