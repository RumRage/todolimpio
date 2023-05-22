import { useContext, useEffect } from "react";
import CategoryContext from "../../Context/CategoryContext";
import { useParams } from "react-router-dom";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";


export const CategoryEdit = () => {
  const { formValues, onChange, errors, setErrors, getCategory, updateCategory} = useContext(CategoryContext);
  let { id } = useParams();

  useEffect(() => {
    getCategory(id);
    setErrors({});
    }, [])

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
  return (
    <Box m="20px">
    <Header title="EDITAR CATEGORIA" subtitle="Editar una categoria existente" />

    <form onSubmit={updateCategory} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
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
