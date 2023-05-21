import React, { useEffect, useContext } from "react"
import ScheduleContext from "../../Context/ScheduleContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Breadcrumbs, Typography, Chip, Alert, Snackbar } from "@mui/material";
import LinkBreadcrumb from "@mui/material/Link";
import Header from "../../components/Header";
import AlertDialog from "../../components/AlertDialog";

export const ScheduleCanceled = () => {
    const { schedules, getSchedules, deleteSchedule, paymentOptions, handleClick, deletedSnackbar, setDeletedSnackbar } = useContext(ScheduleContext);
    useEffect(() => {
    getSchedules();
    }, [])

    const pendingSchedules = schedules.filter(schedule => schedule.status !== "Pendiente" && schedule.status !== "Hecho");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleDelete = (id) => {
      deleteSchedule(id); 
      setDeletedSnackbar(true);
    };

    useEffect(() => {
      let timeoutId;
      if (deletedSnackbar) {
        timeoutId = setTimeout(() => {
          setDeletedSnackbar(false);
        }, 5000); // Cambia a la duración deseada, en milisegundos
      }
      return () => {
        clearTimeout(timeoutId);
      };
    }, [deletedSnackbar]);
    

      const columns = [
        { field: "id", headerName: "Id", flex: 0.5 },
        { field: "name", headerName: "Nombre", flex: 1 },
        { field: "tel", headerName: "Telefono", flex: 1 },
        { field: "address", headerName: "Direccion", flex: 1 },
        { field: "date_time", headerName: "Fecha", flex: 1 },
        {
            field: "combo_id",
            headerName: "Servicio",
            flex: 1,
            valueGetter: (params) => {
              const schedule = params.row;
              return schedule.combos.map((combo) => combo.name).join(", ");
            },
          },
        {
            field: "price",
            headerName: "Precio",
            flex: 1,
            renderCell: (params) => {
              const { price, discount, total_price } = params.row;
              return (
                <div>
                  <div>Precio: {price}</div>
                  <div>Descuento: {discount}</div>
                  <div>Precio total: {total_price}</div>
                </div>
              );
            },
          }, 
          {
            field: "payments",
            headerName: "Metodo de pago",
            flex: 1,
            valueGetter: (params) => {
              const { payments } = params.row;
              return paymentOptions[payments];
            },
          },
          {
            field: "status",
            headerName: "Estado",
            flex: 1,
            renderCell: (params) => {
              const { status } = params.row;
              return (
                <Chip
                  label={status}
                  color={status === "Cancelado" ? "error" : "default"}
                />
              );
            }
          },
          {
            field: "actions",
            headerName: "Opciones",
            flex: 1.5,
            renderCell: (params) => (
              <>
  
                <AlertDialog onDelete={() => handleDelete(params.row.id)} />
              </>
            ),
          },
    ];
    
    
    return (
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header
                title="CANCELADOS"
                subtitle="Historial de servicios cancelados de Todolimpio MDQ"
            />
        </Box>
        <Box m="10px 0 0 0">
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <LinkBreadcrumb underline="hover" color="inherit" href="/" onClick={handleClick}>
                  Calendario
                </LinkBreadcrumb>
                <Typography color="text.primary">Cancelados</Typography>
              </Breadcrumbs>
          </Box>
        <Box
            m="20px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#d598a3",
                color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                borderBottom: "none",
                fontSize: "16px", 
                fontWeight: "bold", 
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#d598a3",
                color: `theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100] !important`,
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
            >
            <DataGrid
                rows={pendingSchedules}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                pageSize={5}
                disableSelectionOnClick
            />
             <Snackbar
                  open={deletedSnackbar}
                  autoHideDuration={null} // Configura null para desactivar el tiempo de ocultamiento automático
                  onClose={() => setDeletedSnackbar(false)}
                  sx={{
                    "& .MuiAlert-filledSuccess": {
                      fontSize: "20px",
                    },
                  }}
                >
                  <Alert onClose={() => setDeletedSnackbar(false)} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Servicio eliminado exitosamente de los cancelados
                  </Alert>
                </Snackbar>
            
            </Box>
        </Box>
       
        )
    }

    