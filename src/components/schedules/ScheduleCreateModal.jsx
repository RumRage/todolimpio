import React, { useContext, useEffect, useState } from "react";
import ScheduleContext from "../../Context/ScheduleContext";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox, useTheme }from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function ScheduleCreateModal() {
  const { formValues, onChange, storeSchedule, errors, setErrors, combos, setCombos, MenuProps, payments, paymentOptions } = useContext(ScheduleContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setErrors({});
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 121) {
        // Presionar "F10" para abrir la ventana modal
        handleClickOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div>
      <Button 
        variant="outlined" 
        onClick={handleClickOpen}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
          color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
          fontSize: "14px",
          fontWeight: "bold",
          padding: "10px 20px",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
        },
      }}
      >
          (F10) Agendar servicio
          <AddOutlinedIcon sx={{ ml: "10px" }} />
    </Button>  
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={storeSchedule} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <DialogTitle>
          <Header title="NUEVO SERVICIO AGENDA" subtitle="Crear un nuevo servicio para la agenda" />
        </DialogTitle>
        <DialogContent>
        
          <DialogContentText>
            Crear un nuevo servicio
          </DialogContentText>
          <Box 
           display="grid"
           gap="30px"
           gridTemplateColumns="repeat(4, minmax(0, 1fr))"
           sx={{
             "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
           }}
        >
        <TextField
          autoFocus
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
        <InputLabel >Combos</InputLabel>
          <Select
            name="combo_id"
            multiple
            value={formValues.combo_id}
            onChange={onChange}
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
              <em>Selecciona un servicio</em>
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
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? colors.primary[200] : colors.primary[800],
              "&:hover": {
                backgroundColor: theme.palette.mode === 'dark' ? colors.primary[100] : colors.primary[900], 
            },
            }}
          >Cancelar</Button>
          <Button type="submit" color="secondary" variant="contained">
            Agendar nuevo servicio
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>

    </LocalizationProvider>
  );
}
