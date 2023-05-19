import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ProductContext from "../../Context/ProductContext";

export const ProductIndex = () => {
    const { products, getProducts, deleteProduct } = useContext(ProductContext);
    useEffect(() => {
    getProducts();
    }, [])
    
    return (
        <div className="mt-12">
           <div className="flex justify-end m-2 p-2">
                <Link to="/products/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Nuevo producto</Link>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Descripción
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Precio
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Proveedor
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Stock
                            </th>
                            <th scope="col" class="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                        return (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{product.id}</td>
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4">{product.description}</td>
                                <td className="px-6 py-4">{product.price}</td>
                                <td className="px-6 py-4">{product.supplier}</td>
                                <td className="px-6 py-4">{product.stock}</td>
                                <td className="px-6 py-4 space-x-2">
                                 <Link to={`/products/${product.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Editar</Link>
                                 <button onClick={() => deleteProduct(product.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md">Borrar</button>
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

