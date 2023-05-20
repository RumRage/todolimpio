import { useEffect, useContext } from "react"
import { Link } from "react-router-dom";
import ScheduleContext from "../../Context/ScheduleContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { Box, Button } from "@mui/material";
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
              startIcon={<ModeEditOutlineOutlinedIcon />}
              >
            
              Editar
            </Button>
              <Button 
                variant="contained"
                onClick={() => deleteSchedule(params.row.id)}
                startIcon={<DeleteIcon />}>
                Eliminar
              </Button>
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
                <Button
                    component={Link}
                    to="/schedules/create"
                    sx={{
                      backgroundColor: colors.blueAccent[700],
                      color: colors.grey[100],
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      textDecoration: "none",
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
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
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

