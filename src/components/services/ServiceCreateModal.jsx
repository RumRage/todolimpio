import React, { useContext, useEffect, useState } from "react";
import ServiceContext from "../../Context/ServiceContext";
import { Box, useTheme, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, }from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';


export default function ServiceCreateModal() {
  const { formValues, onChange, storeService, errors, setErrors, categories, setCategories } = useContext(ServiceContext);

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
          (F10) Nuevo servicio
          <AddOutlinedIcon sx={{ ml: "10px" }} />
    </Button>  
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={storeService} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <DialogTitle>
          <Header title="NUEVO SERVICIO" subtitle="Crear un nuevo servicio para los precios" />
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
          type="number"
          label="Precio"
          name="price"
          value={formValues["price"]}
          onChange={onChange}
          sx={{ gridColumn: "span 4" }}
          error={errors.price !== undefined}
          helperText={errors.price && errors.price[0]}
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
            Crear nuevo servicio
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
