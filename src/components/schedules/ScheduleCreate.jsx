import React, { useContext, useEffect, useState } from "react";
import ScheduleContext from "../../Context/ScheduleContext";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';


export const ScheduleCreate = () => {
const { formValues, onChange, storeSchedule, errors, setErrors, combos, setCombos, MenuProps, payments } = useContext(ScheduleContext);

useEffect(() => {
  setErrors({});
}, []);



return (
<div className="mt-12">
<form onSubmit={storeSchedule} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
<div className="space-y-6">
<div className="mb-4">
<label htmlFor="nombre" className="block mb-2 text-sm font-medium">Nombre</label>
<input name="name" value={formValues["name"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.name && <span className="text-sm text-red-400">{ errors.name[0]}</span>}
</div>
<div className="mb-4">
<label htmlFor="telefono" className="block mb-2 text-sm font-medium">Telefono</label>
<input name="tel" value={formValues["tel"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.tel && <span className="text-sm text-red-400">{ errors.tel[0]}</span>}
</div>
<div className="mb-4">
<label htmlFor="direccion" className="block mb-2 text-sm font-medium">Direccion</label>
<input name="address" value={formValues["address"]} onChange={onChange} className="border border-gray-300 text-gray-900 text-sm rounded-md block w-full p-2" />
{errors.address && <span className="text-sm text-red-400">{ errors.address[0]}</span>}
</div>
<div className="mb-4">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <label htmlFor="fecha-hora" className="block mb-2 text-sm font-medium">Fecha y Hora</label>
    <DateTimePicker
      value={formValues.date_time}
      onChange={(date) => onChange({ target: { name: 'date_time', value: date.format('YYYY/MM/DD HH:mm:ss') } })}
      textField={(props) => <TextField {...props} />}
      label="Fecha y Hora"
      ampm={false}
      inputFormat="yyyy/MM/dd HH:mm:ss"
    />
    {errors.date_time && <span className="text-sm text-red-400">{errors.date_time[0]}</span>}
  </LocalizationProvider>
</div>
<div className="mb-4">
<FormControl sx={{ m: 1, width: 300 }}>
<InputLabel id="demo-multiple-checkbox-label">Combos</InputLabel>
<Select
labelId="demo-multiple-checkbox-label"
id="demo-multiple-checkbox"
name="combo_id"
multiple
value={formValues.combo_id}
onChange={onChange}
input={<OutlinedInput label="Combos" />}
renderValue={(selected) =>
selected.map((value) => {
const combo = combos.find((combo) => combo.id === value);
return combo ? combo.name : "";
}).join(", ")
}
MenuProps={MenuProps}
>
<MenuItem value="">
<em>Selecciona un combo</em>
</MenuItem>
{combos.map((combo) => (
<MenuItem key={combo.id} value={combo.id}>
<Checkbox checked={formValues.combo_id.includes(combo.id)} />
<ListItemText primary={combo.name} />
</MenuItem>
))}
</Select>
{errors.combo_id && <span className="text-sm text-red-400">{errors.combo_id[0]}</span>}
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
<div className="mb-4">
<FormControl fullWidth>
  <InputLabel id="payments-label">Metodo de pago</InputLabel>
  <Select
    labelId="payments-label"
    id="payments"
    value={formValues.payments}
    onChange={onChange}
    name="payments"
    error={errors.payments ? true : false}
  >
    <MenuItem value={1}>A confirmar</MenuItem>
    <MenuItem value={2}>Efectivo</MenuItem>
    <MenuItem value={3}>Transferencia</MenuItem>
  </Select>
  {errors.payments && <span className="error">{errors.payments[0]}</span>}
</FormControl>
</div>
</div>
<div className="my-4">
<button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md">Guardar</button>
</div>
</form>
</div>
)
}
