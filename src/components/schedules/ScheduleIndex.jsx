import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ScheduleContext from "../../Context/ScheduleContext";

export const ScheduleIndex = () => {
    const { schedules, getSchedules, deleteSchedule } = useContext(ScheduleContext);
    useEffect(() => {
    getSchedules();
    }, [])

    const paymentOptions = {
        1: 'A confirmar',
        2: 'Efectivo',
        3: 'Transferencia',
      };
    
    
    return (
        <div className="mt-12">
           <div className="flex justify-end m-2 p-2">
                <Link to="/schedules/create" className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Agendar servicio</Link>
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
                                Teléfono
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Dirección
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Combo
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
                            <th scope="col" className="px-6 py-3">
                                Pago
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Estado
                            </th>
                            <th scope="col" className="px-6 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => {
                        return (
                            <tr key={schedule.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{schedule.id}</td>
                                <td className="px-6 py-4">{schedule.name}</td>
                                <td className="px-6 py-4">{schedule.tel}</td>
                                <td className="px-6 py-4">{schedule.address}</td>
                                <td className="px-6 py-4">{schedule.date_time}</td>
                                <td>
                                    <table>
                                      <thead>
                                        <tr>
                                          <th>Nombre</th>
                                          <th>Precio</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {schedule.combos.map((combo) => (
                                          <tr key={combo.id}>
                                            <td>{combo.name}</td>
                                            <td>{combo.price}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </td>
                                <td className="px-6 py-4">{schedule.price}</td>
                                <td className="px-6 py-4">{schedule.discount}</td>
                                <td className="px-6 py-4">{schedule.total_price}</td>
                                <td className="px-6 py-4">{paymentOptions[schedule.payments]}</td>
                                <td className="px-6 py-4">{schedule.status}</td>
                                <td className="px-6 py-4 space-x-2">
                                 <Link to={`/schedules/${schedule.id}/edit`} className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md">Editar</Link>
                                 <button onClick={() => deleteSchedule(schedule.id)} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-md">Borrar</button>
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

