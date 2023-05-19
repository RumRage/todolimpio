import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import DisposableContext from "../../Context/DisposableContext";

export const DisposableIndex = () => {
    const { disposables, getDisposables, deleteDisposable } = useContext(DisposableContext);
    useEffect(() => {
    getDisposables();
    }, [])
    
    return (
        <div className="mt-12">
           <div className="flex justify-end m-2 p-2">
                <Link to="/disposables/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Nuevo descartable</Link>
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
                                Descripción
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Proveedor
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {disposables.map((disposable) => {
                        return (
                            <tr key={disposable.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{disposable.id}</td>
                                <td className="px-6 py-4">{disposable.name}</td>
                                <td className="px-6 py-4">{disposable.description}</td>
                                <td className="px-6 py-4">{disposable.price}</td>
                                <td className="px-6 py-4">{disposable.supplier}</td>
                                <td className="px-6 py-4">{disposable.stock}</td>
                                <td className="px-6 py-4 space-x-2">
                                 <Link to={`/disposables/${disposable.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Editar</Link>
                                 <button onClick={() => deleteDisposable(disposable.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md">Borrar</button>
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

