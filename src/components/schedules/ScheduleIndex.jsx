import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ScheduleContext from "../../Context/ScheduleContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Button, Modal, Typography } from "@mui/material";
import Header from "../../components/Header";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


export const ScheduleIndex = () => {
    const { schedules, getSchedules, deleteSchedule, paymentOptions } = useContext(ScheduleContext);
    useEffect(() => {
    getSchedules();
    }, [])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
        { field: "status", headerName: "Estado", flex: 0.5 },
        {
          field: "actions",
          headerName: "Opciones",
          flex: 1.5,
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
             <BasicModal />

              <Button
                variant="contained"
                onClick={() => deleteSchedule(params.row.id)}
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
            </>
          ),
        },
    ];
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const BasicModal = () => {
      const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
  
      return (
        <div>
           <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>
        </div>
      );
    };
    
    
    return (
        <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header
                title="AGENDA"
                subtitle="Agenda de servicios de Todolimpio MDQ"
            />
            <Box>
                <Button
                    component={Link}
                    to="/schedules/create"
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
                      Agendar servicio
                      <AddOutlinedIcon sx={{ ml: "10px" }} />
                </Button>
            </Box>
        </Box>
        <Box
            m="40px 0 0 0"
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
                rows={schedules}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                pageSize={5}
                disableSelectionOnClick
            />
            </Box>
        </Box>
       
        )
    }

    