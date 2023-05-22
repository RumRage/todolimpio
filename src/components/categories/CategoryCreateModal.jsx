import React, { useContext, useEffect, useState } from "react";
import CategoryContext from "../../Context/CategoryContext";
import { Box, useTheme, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }from '@mui/material';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';


export default function CategoryCreateModal() {
    const { formValues, onChange, storeCategory, errors, setErrors} = useContext(CategoryContext);

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
          (F10) Nueva categoria
          <UnarchiveOutlinedIcon sx={{ ml: "10px" }} />
    </Button>  
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={storeCategory} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-sm">
        <DialogTitle>
          <Header title="NUEVA CATEGORIA" subtitle="Crear una nueva categoria para los servicios" />
        </DialogTitle>
        <DialogContent>
        
          <DialogContentText>
            Crear una nueva categoria
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
            Crear nueva categoria
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
