import { useContext, useEffect } from "react";
import DisposableContext from "../../Context/DisposableContext";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
 
export const DisposableEdit = () => {
  const { formValues, onChange, errors, setErrors, disposable, getDisposable, updateDisposable} = useContext(DisposableContext);
  let { id } = useParams();
  useEffect(() => {
  getDisposable(id);
  setErrors({});
  }, [])

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
    <Header title="EDITAR DESCARTABLE" subtitle="Editar un descartable existente" />

    <form onSubmit={updateDisposable} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
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
          Actualizar
        </Button>
      </Box>
    </form>
  </Box>
  )
}
