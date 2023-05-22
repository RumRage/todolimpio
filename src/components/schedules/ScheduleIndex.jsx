import React, { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom";
import ScheduleContext from "../../Context/ScheduleContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Button, Snackbar, Alert, Breadcrumbs, Typography, NavigateNextIcon, Chip } from "@mui/material";
import LinkBreadcrumb from "@mui/material/Link";
import Header from "../../components/Header";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import AlertDialog from "../../components/AlertDialog";
import ScheduleCreateModal from "./ScheduleCreateModal";
import { HotKeys } from "react-hotkeys";
import CustomizedMenu from "./CustomizedMenu";

export const ScheduleIndex = () => {
    const { schedules, getSchedules, deleteSchedule, paymentOptions, handleSnackbarClose, openSnackbar, setOpenSnackbar, deletedSnackbar, setDeletedSnackbar, updatedSnackbar, setUpdatedSnackbar, handleUpdatedSnackbarClose, handleClick } = useContext(ScheduleContext);
    useEffect(() => {
    getSchedules();
    }, []);

    const pendingSchedules = schedules.filter(schedule => schedule.status !== "Hecho" && schedule.status !== "Cancelado");

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleDelete = (id) => {
      deleteSchedule(id); 
      setDeletedSnackbar(true);
    };

    useEffect(() => {
      const scheduleCreated = localStorage.getItem("scheduleCreated");
      if (scheduleCreated) {
        setOpenSnackbar(true);
        localStorage.removeItem("scheduleCreated");
      }
    }, []);

    useEffect(() => {
      let timeoutId;
      if (openSnackbar) {
        timeoutId = setTimeout(() => {
          setOpenSnackbar(false);
        }, 7000); // Cambia a 10000 para que dure 10 segundos
      }
      return () => {
        clearTimeout(timeoutId);
      };
    }, [openSnackbar]);

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

    const handlers = {
      openModal: () => {
        // Abrir la ventana modal
        // ...
      },
    };
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.keyCode === 121) {
          // Presionar "F10" para abrir la ventana modal
          handlers.openModal();
        }
      };
  
      document.addEventListener("keydown", handleKeyDown);
  
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [handlers]);

    const columns = [
      { field: "id", headerName: "Id", flex: 0.5 },
      { field: "name", headerName: "Nombre", flex: 1 },
      { field: "tel", headerName: "Telefono", flex: 0.7 },
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
        flex: 0.8,
        renderCell: (params) => {
          const { status } = params.row;
          return (
            <Chip
              label={status}
              color={status === "Pendiente" ? "warning" : "default"}
            />
          );
        },
      },
      {
        field: "actions",
        headerName: "Opciones",
        flex: 1.7,
        renderCell: (params) => (
          <>
            <Button
              component={Link}
              to={`/schedules/${params.row.id}/edit`}
              variant="contained"
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? colors.blueAccent[700] : "#E6C7C2",
                color: theme.palette.mode === 'dark' ? colors.grey[700] : colors.primary[100],
                "&:hover": {
                  backgroundColor: theme.palette.mode === 'dark' ? "#A5917B" : "#AE5671", 
                },
              }}
            >
              <ModeEditOutlineOutlinedIcon style={{ marginLeft: "auto", marginRight: "auto" }} /> 
            </Button>
            
            <AlertDialog onDelete={() => handleDelete(params.row.id)} />
            <CustomizedMenu />
          </>
        ),
      },
    ];
    
    
    return (
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header
                title="AGENDA"
                subtitle="Agenda de servicios de Todolimpio MDQ"
            />
            <Box>
                <HotKeys handlers={handlers}>
                  {/* ... */}
                  <ScheduleCreateModal />
                </HotKeys>
            </Box>
        </Box>
        <Box m="10px 0 0 0">
              <Breadcrumbs separator="›" aria-label="breadcrumb">
                <LinkBreadcrumb underline="hover" color="inherit" href="/" onClick={handleClick}>
                  Calendario
                </LinkBreadcrumb>
                <Typography color="text.primary">Agenda</Typography>
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
                  open={openSnackbar}
                  autoHideDuration={null} // Configura null para desactivar el tiempo de ocultamiento automático
                  onClose={handleSnackbarClose}
                  sx={{
                    "& .MuiAlert-filledSuccess": {
                      fontSize: "20px", 
                    },
                  }}
                >
                  <Alert onClose={handleSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Servicio agendado exitosamente
                  </Alert>
                </Snackbar>
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
                    Servicio agendado eliminado exitosamente
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={updatedSnackbar}
                  autoHideDuration={null} // Configura null para desactivar el tiempo de ocultamiento automático
                  onClose={handleUpdatedSnackbarClose}
                  sx={{
                    "& .MuiAlert-filledSuccess": {
                      fontSize: "20px",
                    },
                  }}
                >
                  <Alert onClose={handleUpdatedSnackbarClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                    Servicio agendado actualizado exitosamente
                  </Alert>
                </Snackbar>
            </Box>
        </Box>
       
        )
    }

    