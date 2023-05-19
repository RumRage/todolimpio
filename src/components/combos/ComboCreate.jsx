import React, { useContext, useEffect, useState } from "react";
import ComboContext from "../../Context/ComboContext";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


export const ComboCreate = () => {
const { formValues, onChange, storeCombo, errors, setErrors, services, setServices, MenuProps } = useContext(ComboContext);

useEffect(() => {
  setErrors({});
}, []);



return (
<div className="mt-12">
<form onSubmit={storeCombo} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
<div className="space-y-6">
<div className="mb-4">
<label htmlFor="nombre" className="block mb-2 text-sm font-medium">Nombre</label>
<input name="name" value={formValues["name"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.name && <span className="text-sm text-red-400">{ errors.name[0]}</span>}
</div>

<div className="mb-4">
<FormControl sx={{ m: 1, width: 300 }}>
<InputLabel id="demo-multiple-checkbox-label">Servicios</InputLabel>
<Select
labelId="demo-multiple-checkbox-label"
id="demo-multiple-checkbox"
name="service_id"
multiple
value={formValues.service_id}
onChange={onChange}
input={<OutlinedInput label="Servicios" />}
renderValue={(selected) =>
selected.map((value) => {
const service = services.find((service) => service.id === value);
return service ? service.name : "";
}).join(", ")
}
MenuProps={MenuProps}
>
<MenuItem value="">
<em>Selecciona un servicio</em>
</MenuItem>
{services.map((service) => (
<MenuItem key={service.id} value={service.id}>
<Checkbox checked={formValues.service_id.includes(service.id)} />
<ListItemText primary={service.name} />
</MenuItem>
))}
</Select>
{errors.service_id && <span className="text-sm text-red-400">{errors.service_id[0]}</span>}
</FormControl>
</div>
<div className="mb-4">
<label htmlFor="precio" className="block mb-2 text-sm font-medium">Precio</label>
<input name="price" value={formValues["price"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.price && <span className="text-sm text-red-400">{ errors.price[0]}</span>}
</div>
<div className="mb-4">
<label htmlFor="descuento" className="block mb-2 text-sm font-medium">Descuento</label>
<input name="discount" value={formValues["discount"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.discount && <span className="text-sm text-red-400">{ errors.discount[0]}</span>}
</div>
<div className="mb-4">
<label htmlFor="total" className="block mb-2 text-sm font-medium">Total</label>
<input name="total_price" value={formValues["total_price"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.total_price && <span className="text-sm text-red-400">{ errors.total_price[0]}</span>}
</div>
</div>
<div className="my-4">
<button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Guardar</button>
</div>
</form>
</div>
)
}
