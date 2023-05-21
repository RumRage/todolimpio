import React, { useContext, useEffect, useState } from "react";
import DisposableContext from "../../Context/DisposableContext";
import { Box, useTheme, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';


export default function DisposableCreateModal() {
  const { formValues, onChange, storeDisposable, errors, setErrors} = useContext(DisposableContext);

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
          (F10) Nuevo descartable
          <UnarchiveOutlinedIcon sx={{ ml: "10px" }} />
    </Button>  
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={storeDisposable} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <DialogTitle>
          <Header title="NUEVO DESCARTABLE" subtitle="Crear un nuevo descartable para el inventario" />
        </DialogTitle>
        <DialogContent>
        
          <DialogContentText>
            Crear un nuevo descartable
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
            Crear nuevo descartable
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
