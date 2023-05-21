import React, { useContext, useEffect } from "react";
import ScheduleContext from "../../Context/ScheduleContext";
import { useParams } from "react-router-dom";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox, useTheme, OutlinedInput } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ScheduleEdit = () => {
const { formValues, onChange, errors, setErrors, getSchedule, updateSchedule, combos, MenuProps, payments, paymentOptions } = useContext(ScheduleContext);
const selectedComboIds = formValues.combo_id || []; // Inicializar como un arreglo vacío si es undefined

let { id } = useParams();
useEffect(() => {
  const fetchSchedule = async () => {
    await getSchedule(id);
    setErrors({});
  };

  fetchSchedule();
}, [id]);

const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Box m="20px">
  <Header title="EDITAR SERVICIO AGENDA" subtitle="Editar un servicio agendado existente" />

    <form onSubmit={updateSchedule} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
      <Box 
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Nombre"
          name="name"
          value={formValues["name"]}
          onChange={onChange}
          sx={{ gridColumn: "span 2" }}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name[0]}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Telefono"
          name="tel"
          value={formValues["tel"]}
          onChange={onChange}
          sx={{ gridColumn: "span 2" }}
          error={errors.tel !== undefined}
          helperText={errors.tel && errors.tel[0]}
        />
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Direccion"
          name="address"
          value={formValues["address"]}
          onChange={onChange}
          sx={{ gridColumn: "span 2" }}
          error={errors.address !== undefined}
          helperText={errors.address && errors.address[0]}
        />
        
      <FormControl fullWidth sx={{ gridColumn: "span 2" }} variant="filled">
          <DateTimePicker
            id="fecha-hora"
            value={formValues.date_time}
            onChange={(date) => onChange({ target: { name: 'date_time', value: date.format('YYYY/MM/DD HH:mm:ss') } })}
            renderInput={(params) => <TextField {...params} />}
            label="Fecha y Hora"
            ampm={false}
            inputFormat="yyyy/MM/dd HH:mm:ss"
          />
          {errors.date_time && <span className="text-sm text-red-400">{errors.date_time[0]}</span>}
        </FormControl>
       <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
        <InputLabel>Combos</InputLabel>
          <Select
            name="combo_id"
            multiple
            value={formValues.combo_id}
            onChange={onChange}
            label="Combos"
            renderValue={(selected) =>
              selected
                .map((value) => {
                  const combo = combos.find((combo) => combo.id === value);
                  return combo ? combo.name : "";
                })
                .join(", ")
            }
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
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Precio"
          name="price"
          value={formValues["price"]}
          onChange={onChange}
          sx={{ gridColumn: "span 1" }}
          error={errors.price !== undefined}
          helperText={errors.price && errors.price[0]}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Descuento"
          name="discount"
          value={formValues["discount"]}
          onChange={onChange}
          sx={{ gridColumn: "span 1" }}
          error={errors.discount !== undefined}
          helperText={errors.discount && errors.discount[0]}
        />
        <TextField
          fullWidth
          variant="filled"
          type="number"
          label="Precio total"
          name="total_price"
          value={formValues["total_price"]}
          onChange={onChange}
          sx={{ gridColumn: "span 1" }}
          error={errors.total_price !== undefined}
          helperText={errors.total_price && errors.total_price[0]}
        />
        <FormControl fullWidth sx={{ gridColumn: "span 2" }} variant="filled">
          <InputLabel id="payments-label">Metodo de pago</InputLabel>
          <Select
            labelId="payments-label"
            id="payments"
            value={formValues.payments}
            onChange={onChange}
            name="payments"
            error={errors.payments ? true : false}
          >
            {Object.entries(paymentOptions).map(([value, label]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
          {errors.payments && <span className="error">{errors.payments[0]}</span>}
        </FormControl>
    </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Actualizar
        </Button>
      </Box>
    </form>
  </Box>
  </LocalizationProvider>
);
};
