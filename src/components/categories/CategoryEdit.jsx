import { useContext, useEffect } from "react";
import CategoryContext from "../../Context/CategoryContext";
import { useParams } from "react-router-dom";


export const CategoryEdit = () => {
  const { formValues, onChange, errors, setErrors, category, getCategory, updateCategory} = useContext(CategoryContext);
  let { id } = useParams();

  useEffect(() => {
    getCategory(id);
    setErrors({});
    }, [])
  
  return (
    <div className="mt-12">
      <form onSubmit={updateCategory} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <div className="space-y-6">
          <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium">Nombre</label>
            <input name="name" value={formValues["name"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
            {errors.name && <span className="text-sm text-red-400">{ errors.name[0]}</span>}
          </div>
        </div>
        <div className="my-4">
          <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Actualizar</button>
        </div>
      </form>
    </div>
  )
}
