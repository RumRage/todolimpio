import { useContext, useEffect } from "react";
import ProductContext from "../../Context/ProductContext";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
 
export const ProductCreate = () => {
  const { formValues, onChange, storeProduct, errors, setErrors} = useContext(ProductContext);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    setErrors({});
  }, []);

  return (
    <Box m="20px">
      <Header title="NUEVO PRODUCTO" subtitle="Crear un nuevo producto para el inventario" />

      <form onSubmit={storeProduct} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
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
            type="text"
            label="Descripción"
            name="description"
            value={formValues["description"]}
            onChange={onChange}
            sx={{ gridColumn: "span 2" }}
            error={errors.description !== undefined}
            helperText={errors.description && errors.description[0]}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Proveedor"
            name="supplier"
            value={formValues["supplier"]}
            onChange={onChange}
            sx={{ gridColumn: "span 2" }}
            error={errors.supplier !== undefined}
            helperText={errors.supplier && errors.supplier[0]}
          />
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
            label="Stock"
            name="stock"
            value={formValues["stock"]}
            onChange={onChange}
            sx={{ gridColumn: "span 1" }}
            error={errors.stock !== undefined}
            helperText={errors.stock && errors.stock[0]}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Crear nuevo producto
          </Button>
        </Box>
      </form>
    </Box>

  )
}
