import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ComboContext from "../../Context/ComboContext";

export const ComboIndex = () => {
    const { combos, getCombos, deleteCombo } = useContext(ComboContext);
    useEffect(() => {
    getCombos();
    }, [])
    
    return (
        <div className="mt-12">
           <div className="flex justify-end m-2 p-2">
                <Link to="/combos/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Nuevo combo</Link>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Servicio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Descuento
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combos.map((combo) => {
                        return (
                            <tr key={combo.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{combo.id}</td>
                                <td className="px-6 py-4">{combo.name}</td>
                                <td>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Nombre</th>
                                          <th>Precio</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {combo.services.map((service) => (
                                          <tr key={service.id}>
                                            <td>{service.name}</td>
                                            <td>{service.price}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </td>
                                <td className="px-6 py-4">{combo.price}</td>
                                <td className="px-6 py-4">{combo.discount}</td>
                                <td className="px-6 py-4">{combo.total_price}</td>
                                <td className="px-6 py-4 space-x-2">
                                 <Link to={`/combos/${combo.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Editar</Link>
                                 <button onClick={() => deleteCombo(combo.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md">Borrar</button>
                                </td>
                               
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }

