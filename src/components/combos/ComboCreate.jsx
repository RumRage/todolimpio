import React, { useContext, useEffect, useState } from "react";
import ComboContext from "../../Context/ComboContext";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox, useTheme, OutlinedInput } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";



export const ComboCreate = () => {
const { formValues, onChange, storeCombo, errors, setErrors, services, setServices, MenuProps } = useContext(ComboContext);

useEffect(() => {
  setErrors({});
}, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

return (
  <Box m="20px">
    <Header title="NUEVO COMBO" subtitle="Crear un nuevo combo" />

    <form onSubmit={storeCombo} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
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
          sx={{ gridColumn: "span 4" }}
          error={errors.name !== undefined}
          helperText={errors.name && errors.name[0]}
        />
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
          type="text"
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
          type="text"
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
          type="text"
          label="Precio total"
          name="total_price"
          value={formValues["total_price"]}
          onChange={onChange}
          sx={{ gridColumn: "span 1" }}
          error={errors.total_price !== undefined}
          helperText={errors.total_price && errors.total_price[0]}
        />
        
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Crear nuevo combo
        </Button>
      </Box>
    </form>
  </Box>     
)
}
