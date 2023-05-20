import * as React from 'react';
import { tokens } from "../../theme";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, Stack, Typography, Divider, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AlertDialog({ onDelete }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <div>
      <Button 
        variant="contained" 
        onClick={handleClickOpen}
        sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
          color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
          "&:hover": {
            backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
          },
        }} 
      >
        <DeleteIcon style={{ marginLeft: "auto", marginRight: "auto" }} /> 
      </Button>  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Confirmación
      </Typography>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant="outlined" severity="error">
              ¡Precaución! ¡Esto no tiene marcha atrás!
            </Alert>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de querer eliminar esto?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button 
            onClick={handleDelete} 
            autoFocus
            sx={{ 
              backgroundColor: theme.palette.mode === 'dark' ? colors.danger[500] : colors.danger[400],
              color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
              "&:hover": {
                backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
              },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
