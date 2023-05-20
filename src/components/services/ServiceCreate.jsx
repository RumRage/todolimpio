import { useContext, useEffect } from "react";
import ServiceContext from "../../Context/ServiceContext";
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ServiceCreate = () => {
  const { formValues, onChange, storeService, errors, setErrors, categories, setCategories } = useContext(ServiceContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setErrors({});
  }, []);

  return (
    <Box m="20px">
    <Header title="NUEVO SERVICIO" subtitle="Crear un nuevo servicio" />

    <form onSubmit={storeService} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
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
        <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 4" }}>
          <InputLabel>Categoría</InputLabel>
            <Select
              name="category_id"
              value={formValues.category_id}
              onChange={onChange}
              error={errors.category_id !== undefined}
              label="Categoría"
            >
              <MenuItem value="">Seleccione una categoría</MenuItem>
              {categories.map(category => (
                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          {errors.category_id && <span className="text-sm text-red-400">{errors.category_id[0]}</span>}
        </FormControl>
        <TextField
          fullWidth
          variant="filled"
          type="text"
          label="Precio"
          name="price"
          value={formValues["price"]}
          onChange={onChange}
          sx={{ gridColumn: "span 4" }}
          error={errors.price !== undefined}
          helperText={errors.price && errors.price[0]}
        />
        
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained">
          Crear nuevo servicio
        </Button>
      </Box>
    </form>
  </Box>         
  )
}
