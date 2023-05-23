import React, { useContext, useEffect, useState } from "react";
import ComboContext from "../../Context/ComboContext";
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox, useTheme }from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function ComboCreateModal() {
    const { formValues, onChange, storeCombo, errors, setErrors, services, setServices, MenuProps } = useContext(ComboContext);

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
          (F10) Nuevo combo
          <AddOutlinedIcon sx={{ ml: "10px" }} />
    </Button>  
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={storeCombo} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <DialogTitle>
          <Header title="NUEVO COMBO" subtitle="Crear un nuevo combo para los precios" />
        </DialogTitle>
        <DialogContent>
        
          <DialogContentText>
            Crear un nuevo combo
          </DialogContentText>
          <Box 
           display="grid"
           gap="30px"
           gridTemplateColumns="repeat(5, minmax(0, 1fr))"
           sx={{
             "& > div": { gridColumn: isNonMobile ? undefined : "span 5" },
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
          sx={{ gridColumn: "span 5" }}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name[0]}
        />
       <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
        <InputLabel>Servicios</InputLabel>
          <Select
            name="service_id"
            multiple
            value={formValues.service_id}
            onChange={onChange}
            renderValue={(selected) =>
              selected
                .map((value) => {
                  const service = services.find((service) => service.id === value);
                  return service ? service.name : "";
                })
                .join(", ")
            }
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
            Crear nuevo combo
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
